# Generated by Django 2.2.5 on 2020-07-27 05:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='sex',
            new_name='gender',
        ),
        migrations.AddField(
            model_name='subject',
            name='birthdate',
            field=models.CharField(default=0, max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='subject',
            name='foreign_experience',
            field=models.CharField(choices=[('no', '없음'), ('less_1year', '1년 미만'), ('more_1year', '1년 이상')], default=0, max_length=128),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='subject',
            name='foreign_experience_country',
            field=models.CharField(blank=True, max_length=128),
        ),
    ]