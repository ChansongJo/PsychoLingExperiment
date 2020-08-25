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
    foreign_experience_duration = models.CharField(max_length=128, choices=(
        ('no', '없음'), ('2-', '2년 미만'), ('2+', '2년 이상'), ('3+', '3년 이상')
    ))
    foreign_experience_age = models.IntegerField()
    foreign_experience_country = models.CharField(max_length=128, blank=True)
    finished = models.BooleanField(default=False)
    group = models.CharField(max_length=10, default='F', choices=(
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('F', 'F'),
    ))
    corsi_span = models.IntegerField(blank=True, default=-1)

    def __str__(self):
        return f'{self.session_id} - {self.age} - {self.gender }'

    def to_representation(self):
        return [str(self.session_id), self.age, self.gender, self.academic_background, self.foreign_experience_duration, self.foreign_experience_age, self.corsi_span]

    def get_representation_columns(self):
        return ['id', 'age', 'gender',
                'academic_background', 'foriegn_experience_duration', 'foriegn_experience_age', 'corsi_span']


class Stimulus(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    sentence = models.CharField(max_length=128)
    is_grammatical = models.BooleanField()
    event = models.IntegerField(default=-1)
    group = models.CharField(max_length=10, choices=(
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('F', 'F'),
    ))
    type = models.CharField(max_length=10, choices=(
        ('filler', 'Filler'),
        ('direct', 'Direct'),
        ('indirect', "Indirect")
    ))

    def __str__(self):
        return self.sentence

    def to_representation(self):
        return [str(self.id), self.sentence, self.is_grammatical, self.type]

    def get_representation_columns(self):
        return ['id', 'sentence', 'is_grammatical', 'type']


class Trial(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['order', 'session_id'], name="experiment-order")
        ]

    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    judgement_result = models.BooleanField()
    judgement_reaction_time = models.FloatField()
    reaction_time = fields.ArrayField(models.FloatField())
    reaction_time_absolute = fields.ArrayField(models.FloatField())
    stimulus = models.ForeignKey(Stimulus, on_delete=models.PROTECT)
    session_id = models.ForeignKey(Subject, on_delete=models.PROTECT)
    order = models.IntegerField()
    exp_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Trial: {self.session_id} / {self.exp_date} - {self.order}"
