from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from import_export import resources
from backend.db.models import Trial, Subject, Stimulus


class TrialResource(resources.ModelResource):
    class Meta:
        model = Trial

    def dehydrate_session_id(self, obj):
        return obj.session_id.to_representation()

    def dehydrate_stimulus(self, obj):
        return obj.stimulus.to_representation()

    def after_export(self, queryset, data, *args, **kwargs):
        stimulus = data['stimulus']
        del data['stimulus']
        subject = data['session_id']
        del data['session_id']
        # fast transpose zip(*arr)
        subject_columns = queryset[0].session_id.get_representation_columns()
        for col_name, col_data in zip(subject_columns, zip(*subject)):
            data.append_col(col_data, header='subject_' + col_name)

        stimulus_columns = queryset[0].stimulus.get_representation_columns()
        for col_name, col_data in zip(stimulus_columns, zip(*stimulus)):
            data.append_col(col_data, header='stimulus_' + col_name)


class SubjectResource(resources.ModelResource):
    class Meta:
        model = Subject


class StimulusResource(resources.ModelResource):
    class Meta:
        model = Stimulus
        fields = ('sentence', 'is_grammatical', 'type', 'group', 'event', 'id')
        import_id_fields = []


@admin.register(Trial)
class TrialAdmin(ImportExportModelAdmin):
    resource_class = TrialResource
    list_filter = ('session_id', 'exp_date')


@admin.register(Subject)
class SubjectAdmin(ImportExportModelAdmin):
    resource_class = SubjectResource


@admin.register(Stimulus)
class StimulusAdmin(ImportExportModelAdmin):
    resource_class = StimulusResource
    list_filter = ('is_grammatical', 'type', 'group', 'id')
