from rest_framework.viewsets import ModelViewSet
from backend.db.views.serializers import TrialSerailizer, SubjectSerailizer, StimulusSerailizer
import json


class GenericViewSet(ModelViewSet):
    def get_queryset(self):
        # cf. https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
        queryset = self.serializer_class.Meta.model.objects.all()
        query = self.request.query_params.get('query', None)
        if query:
            return queryset.filter(**json.loads(query))

        return queryset


class TrialViewSet(GenericViewSet):
    lookup_field = 'id'
    serializer_class = TrialSerailizer

    def get_queryset(self):
        # cf. https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
        queryset = self.serializer_class.Meta.model.objects.all()
        subject_id = self.request.query_params.get('subject', None)
        if subject_id:
            return queryset.filter(subject=subject_id)

        return queryset


class StimulusViewSet(GenericViewSet):
    lookup_field = 'id'
    serializer_class = StimulusSerailizer

    def get_queryset(self):
        return super().get_queryset()


class SubjectViewSet(GenericViewSet):
    lookup_field = 'session_id'
    serializer_class = SubjectSerailizer

    def get_queryset(self):
        return super().get_queryset()