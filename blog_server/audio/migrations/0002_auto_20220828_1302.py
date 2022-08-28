# Generated by Django 3.2.9 on 2022-08-28 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('audio', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='audio',
            options={'ordering': ['-update_time'], 'verbose_name': 'audio', 'verbose_name_plural': 'audio'},
        ),
        migrations.AddField(
            model_name='audio',
            name='update_time',
            field=models.DateTimeField(auto_now=True, verbose_name='update at'),
        ),
    ]
