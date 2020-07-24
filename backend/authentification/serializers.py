from rest_framework_mongoengine import serializers
from rest_framework_jwt.settings import api_settings
from backend.authentification.models import User


class UserSerializer(serializers.DocumentSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'is_superuser',
                  'is_active', 'is_staff', 'date_joined')


# 현재 미사용중... confilct 발생해서 주석처리 합니다
'''
class UserSerializerWithToken(serializers.DocumentSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        # modified for mongo handling...
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')
'''
