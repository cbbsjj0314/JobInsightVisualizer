from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from jobMarket.models import PostingByJobPosition
from .serializers import *

from datetime import timedelta
from django.utils.dateparse import parse_date


class PostingByJobPositionView(APIView):
    def get(self, request, *args, **kwargs):
        query_serializer = PostingByJobPositionQuerySerializer(data=request.GET)

        if not query_serializer.is_valid():
            return Response(query_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        end_date_str = query_serializer.validated_data["datetime"]
        job_type = query_serializer.validated_data["job_type"]

        end_date = parse_date(end_date_str)
        start_date = end_date - timedelta(days=6)

        data = PostingByJobPosition.objects.filter(
            collected_on__gte=start_date,
            collected_on__lte=end_date,
            job_sub_type_name=job_type,
        )

        serializer = PostingByJobPositionSerializer(data, many=True)

        return Response(serializer.data)
