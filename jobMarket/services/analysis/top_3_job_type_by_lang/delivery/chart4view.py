from jobMarket.models.shared import *
from jobMarket.models.chart4model import *
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET', 'POST'])
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

    # 왜 리스트로 반환대지
    result = [
        {
            "lang": lang[0],
            "jobs": [
                { "job": role[0], "percentage": percentage }
                for role, percentage in roles.items()
            ]
        }
        for lang, roles in reorganized.items()
    ]

    return Response(result)