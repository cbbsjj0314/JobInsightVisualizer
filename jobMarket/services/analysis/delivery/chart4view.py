from jobMarket.models.shared import *
from jobMarket.models.chart4model import *
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view([])
def chartfour(request):
    """Non-browsible API for chart 4
    Parameters:
    request
    """
    records = ChartFour.objects.all()

    reorganized = {}
    for record in records:
        language = record.language,
        role = record.role,
        percentage = f'{record.percentage:.2f}%'
        
        if language not in reorganized:
            reorganized[language] = {}
        
        reorganized[language][role] = percentage

    result = [
        {
            "lang": lang,
            "jobs": [
                { "job": role, "percentage": percentage }
                for role, percentage in roles.items()
            ]
        }
        for lang, roles in reorganized.items()
    ]

    return Response(result)