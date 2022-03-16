# Generated by Django 3.2.9 on 2022-01-12 14:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Picture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('src', models.TextField(help_text='src', unique=True)),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='create time')),
            ],
            options={
                'verbose_name': 'picture',
                'verbose_name_plural': 'picture',
            },
        ),
    ]