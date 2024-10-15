# Generated by Django 5.1.2 on 2024-10-15 16:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50, verbose_name='Company name')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='JobSuperType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, verbose_name='상위 직군 이름')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Platform',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, verbose_name='데이터 수집 플랫폼 이름')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='RawFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('filename', models.CharField(max_length=100, verbose_name='File name')),
                ('collected_on', models.DateTimeField(null=True, verbose_name='Record scraped date')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Skill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, verbose_name='기술의 이름')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='SkillCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, verbose_name='기술 카테고리 이름')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='JobPosting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('link', models.CharField(max_length=200, verbose_name='Job posting link')),
                ('title', models.CharField(max_length=100, verbose_name='Posting title')),
                ('experience_level', models.CharField(max_length=20, verbose_name='Job experience')),
                ('is_new', models.BooleanField(default=True, verbose_name='Is this the revised one?')),
                ('deadline', models.DateTimeField(verbose_name='Application deadline')),
                ('collected_on', models.DateTimeField(null=True, verbose_name='Record scraped date')),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.company')),
                ('platform', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.platform')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='JobSubType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=100, verbose_name='하위 직군 이름')),
                ('super_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.jobsupertype', verbose_name='상위 직군의 ID')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50, verbose_name='Workplace location')),
                ('job_posting', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.jobposting')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50, verbose_name='Job position role')),
                ('job_posting', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.jobposting')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Requirement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('job_posting', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.jobposting')),
                ('skill', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.skill')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='skill',
            name='skill_cat',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.skillcategory', verbose_name='연관된 기술 카테고리 ID, skill_category 테이블과 참조됨'),
        ),
        migrations.CreateModel(
            name='JobSuperSubAssociation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('last_edit', models.DateTimeField(auto_now=True)),
                ('job_posting', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.jobposting', verbose_name='채용 공고 ID')),
                ('sub_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.jobsubtype', verbose_name='하위 직군의 ID')),
                ('super_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='jobMarket.jobsupertype', verbose_name='상위 직군의 ID')),
            ],
            options={
                'constraints': [models.UniqueConstraint(fields=('job_posting', 'sub_type'), name='unique_job_super_sub_association')],
            },
        ),
    ]
