# Generated by Django 3.0.8 on 2020-08-25 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0007_stimulus_group'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stimulus',
            name='group',
            field=models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('F', 'F')], max_length=10),
        ),
    ]