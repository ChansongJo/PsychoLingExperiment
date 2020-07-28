from django.db import models
from django.contrib.postgres import fields
import uuid


class Subject(models.Model):
    name = models.CharField(max_length=32)
    age = models.IntegerField()
    birthdate = models.CharField(max_length=10)
    gender = models.CharField(max_length=1, choices=(
        ('m', 'male'), ('f', 'female'), ('o', 'other')))
    academic_background = models.CharField(max_length=128)
    email = models.EmailField()
    session_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    foreign_experience = models.CharField(max_length=128, choices=(
        ('no', '없음'), ('less_1year', '1년 미만'), ('more_1year', '1년 이상')
    ))
    foreign_experience_country = models.CharField(max_length=128, blank=True)

    def __str__(self):
        return f'{self.session_id} - {self.age} - {self.gender }'


class Stimulus(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    sentence = models.CharField(max_length=128)
    is_grammatical = models.BooleanField()
    type = models.CharField(max_length=10, choices=(
        ('filler', 'Filler'),
        ('direct', 'Direct'),
        ('indirect', "Indirect")
    ))

    def __str__(self):
        return self.sentence


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
    stimulus = models.ForeignKey(Stimulus, on_delete=models.PROTECT)
    subject = models.ForeignKey(Subject, on_delete=models.PROTECT)
    order = models.IntegerField()

    exp_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Trial: {self.id} / {self.subject} / {self.sentence}"
