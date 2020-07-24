from django.db import models
from django.contrib.postgres import fields
import uuid


class Stimulus(models.Model):
    sentence = models.CharField(max_length=128)
    is_grammatical = models.BooleanField()
    sentence_type = models.CharField(max_length=2, choices=(
        ('FL', 'Filler'),
        ('RL', 'Real')
    ))
    id = id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)


class ExperimentResult(models.Model):
    session_id = models.CharField(max_length=128)
    random_seed = models.IntegerField()
    createdAt = models.DateTimeField(auto_now=True)
    updatedAt = models.DateTimeField(auto_now=True, auto_now_add=True)
    trial_results = fields.ArrayField(models.ForeignKey(TrialResult))


class TrialResult(models.Model):
    judgement_result = models.BooleanField()
    judgement_reaction_time = models.FloatField()
    reaction_time = fields.ArrayField(models.FloatField())
    reaction_time_absolute = fields.ArrayField(models.FloatField())
    stimulus = models.ForeignKey(Stimulus)
