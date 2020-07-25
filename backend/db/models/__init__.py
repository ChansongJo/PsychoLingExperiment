from django.db import models
from django.contrib.postgres import fields
import uuid


class Subject(models.Model):
    name = models.CharField(max_length=32)
    age = models.IntegerField()
    sex = models.CharField(max_length=1, choices=(
        ('m', 'male'), ('f', 'female'), ('o', 'other')))
    academic_background = models.CharField(max_length=128)
    email = models.EmailField()
    session_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)


class Stimulus(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    sentence = models.CharField(max_length=128)
    is_grammatical = models.BooleanField()
    sentence_type = models.CharField(max_length=2, choices=(
        ('FL', 'Filler'),
        ('RL', 'Real')
    ))


class Trial(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['order', 'subject'], name="experiment-order")
        ]

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    judgement_result = models.BooleanField()
    judgement_reaction_time = models.FloatField()
    reaction_time = fields.ArrayField(models.FloatField())
    reaction_time_absolute = fields.ArrayField(models.FloatField())
    stimlus = models.ForeignKey(Stimulus, on_delete=models.DO_NOTHING)
    subject = models.ForeignKey(Subject, on_delete=models.DO_NOTHING)
    order = models.IntegerField()