# Generated by Django 3.0.8 on 2020-08-25 11:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0005_auto_20200825_2020'),
    ]

    operations = [
        migrations.RenameField(
            model_name='subject',
            old_name='foriegn_experience_age',
            new_name='foreign_experience_age',
        ),
    ]
