# Generated by Django 3.0.8 on 2020-07-28 12:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0005_auto_20200728_1818'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stimulus',
            name='active',
        ),
    ]
