from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from backend.db.models import Trial, Subject, Stimulus


class TrialResource(resources.ModelResource):
    class Meta:
        model = Trial


class SubjectResource(resources.ModelResource):
    class Meta:
        model = Subject


class StimulusResource(resources.ModelResource):
    class Meta:
        model = Stimulus
        fields = ('sentence', 'is_grammatical', 'type')
        import_id_fields = []


@ admin.register(Trial)
class TrialAdmin(ImportExportModelAdmin):
    resource_class = TrialResource
    list_filter = ('subject', 'exp_date', 'stimulus')


@ admin.register(Subject)
class SubjectAdmin(ImportExportModelAdmin):
    resource_class = SubjectResource


@ admin.register(Stimulus)
class StimulusAdmin(ImportExportModelAdmin):
    resource_class = StimulusResource
    list_filter = ('is_grammatical', 'type')
