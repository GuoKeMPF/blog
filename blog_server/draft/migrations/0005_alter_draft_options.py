# Generated by Django 3.2.9 on 2022-06-26 12:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('draft', '0004_alter_draft_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='draft',
            options={'ordering': ['update_time'], 'verbose_name': 'draft', 'verbose_name_plural': 'draft'},
        ),
    ]
