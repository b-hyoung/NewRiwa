# Generated by Django 4.0.4 on 2022-05-19 03:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_er_game_record_model_bestweapon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='er_user_info_model',
            name='matchingTeamMode',
            field=models.IntegerField(default=1),
        ),
    ]