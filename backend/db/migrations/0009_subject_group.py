# Generated by Django 3.0.8 on 2020-08-25 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0008_auto_20200825_2038'),
    ]

    operations = [
        migrations.AddField(
            model_name='subject',
            name='group',
            field=models.CharField(choices=[('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'), ('F', 'F')], default='F', max_length=10),
        ),
    ]
