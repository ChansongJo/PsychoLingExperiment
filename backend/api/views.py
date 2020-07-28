import pandas as pd
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FileUploadParser
from backend.db.views import StimulusSerailizer
from backend.db.models import Stimulus

# from rest_pandas import PandasSmipleView
# Create your views here.


@api_view(['PUT'])
@parser_classes([MultiPartParser, ])
def bulkUploadFromFile(request):
    file_obj = request.data['file']
    clean = request.query_params.get('clean')
    df = pd.read_excel(file_obj).rename(
        columns={'answer': 'is_grammatical'}).replace('O', True).replace('X', False)
    data = df.to_dict('record')
    if clean:
        StimulusSerailizer.Meta.model.objects.all().delete()
    serializer = StimulusSerailizer(data=data, many=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(status=301)
