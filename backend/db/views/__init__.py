from collections import Counter, defaultdict

from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from backend.db.views.serializers import TrialSerailizer, SubjectSerailizer, StimulusSerailizer
from backend.db.models import Subject
import random
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

    @action(['PUT', ], detail=False)
    def bulk_upload(self, request):
        data = request.data
        id = request.query_params.get('id')
        group = request.query_params.get('group')
        corsi_span = request.query_params.get('corsiSpan')
        Subject.objects.all().filter(session_id=id).update(
            finished=True, group=group, corsi_span=corsi_span)
        serializer = self.serializer_class(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=204)


class StimulusViewSet(GenericViewSet):
    lookup_field = 'id'
    serializer_class = StimulusSerailizer

    def get_queryset(self):
        # cf. https://www.django-rest-framework.org/api-guide/filtering/#filtering-against-query-parameters
        queryset = self.serializer_class.Meta.model.objects.all()
        return queryset

    @action(['GET', ], detail=False)
    def generate_stimulus_set(self, request):
        # get group
        # subjects 조회 후 가장 안 나온거 맞추기...
        temp = Subject.objects.all().filter(group__in="A B C D".split(' ')).values()
        temp = [w['group'] for w in temp]
        counter = Counter(temp)
        if len(counter) < 4:
            temp = {key: counter[key] for key in "ABCD"}
            counter = Counter(temp)
        group = counter.most_common()[-1][0]

        stimuli = list(self.get_queryset().filter(
            group__in=[group, 'F']).order_by('id').values())
        seed = hash(request.query_params.get('id', '1234')[-4:])
        random.Random(seed).shuffle(stimuli)
        return Response({'seed': seed, 'stimuli': stimuli, 'group': group, 'length': len(stimuli)})


class SubjectViewSet(GenericViewSet):
    lookup_field = 'session_id'
    serializer_class = SubjectSerailizer

    def get_queryset(self):
        return super().get_queryset()
