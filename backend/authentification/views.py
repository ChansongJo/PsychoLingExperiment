import json
from datetime import datetime

from rest_framework import permissions, status
from rest_framework.routers import DynamicRoute
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.views import ObtainJSONWebToken
from rest_framework_jwt.settings import api_settings
from rest_framework_mongoengine import viewsets, serializers

from django.contrib.admin.views.decorators import staff_member_required

from backend.authentification.forms import SignUpForm
from backend.authentification.models import User
from backend.authentification.serializers import UserSerializer
from django_mongoengine.mongo_auth.models import User as BaseUser

# JWT Authentication for Django Rest Framework and MongoDB
# https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a 참고


@api_view(['GET'])
def current_user(request):
    if isinstance(request.user, BaseUser):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    else:
        return Response({}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def signUp(request):
    form = SignUpForm(request.data)
    if form.is_valid():
        User.create_user(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
        )
        return Response({'username': form.data['username']}, status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)


class Login(ObtainJSONWebToken):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER(
                token, user, request)
            response = Response(response_data)
            if api_settings.JWT_AUTH_COOKIE:
                expiration = (datetime.utcnow() +
                              api_settings.JWT_EXPIRATION_DELTA)
                response.set_cookie(api_settings.JWT_AUTH_COOKIE,
                                    token,
                                    expires=expiration,
                                    httponly=True)
            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    serializer_class = UserSerializer

    @action(methods=['PATCH'], detail=False)
    def bulkUpdate(self, request):
        queryset = self.get_queryset()

        for _obj in request.data:
            serializer = self.get_serializer(
                queryset.get(username=_obj['username']), data=_obj, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

        return Response(request.data)

    def get_queryset(self, usernames=None):
        if usernames:
            return User.objects.get_queryset().filter(username__in=usernames)
        else:
            return User.objects.get_queryset()

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]
