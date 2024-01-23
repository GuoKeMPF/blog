# Generated by Django 4.2.2 on 2024-01-23 06:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Foods',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='name', max_length=255, unique=True, verbose_name='名称')),
                ('content', models.TextField(help_text='content', max_length=255, verbose_name='成分')),
                ('description', models.CharField(blank=True, help_text='描述', max_length=255, null=True)),
                ('create_time', models.DateTimeField(auto_now_add=True, verbose_name='create time')),
                ('update_time', models.DateTimeField(auto_now=True, verbose_name='update at')),
            ],
            options={
                'verbose_name': '食物',
                'verbose_name_plural': '食物',
                'ordering': ['-create_time'],
            },
        ),
    ]