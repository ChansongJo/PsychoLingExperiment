from backend.db.models import Trial, Stimulus, Subject
from rest_framework.serializers import ModelSerializer


class TrialSerailizer(ModelSerializer):
    class Meta:
        model = Trial
        fields = '__all__'


class StimulusSerailizer(ModelSerializer):
    class Meta:
        model = Stimulus
        fields = '__all__'


class SubjectSerailizer(ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'
