from rest_framework import serializers
from datetime import datetime
from .models import *

from .constants import JOB_SUB_TYPE_NAMES


class PostingByJobPositionQuerySerializer(serializers.Serializer):
    datetime = serializers.CharField(required=True)
    job_type = serializers.CharField(required=True)

    def validate_datetime(self, value: str) -> str:
        try:
            datetime.strptime(value, "%Y-%m-%d")
        except ValueError:
            raise serializers.ValidationError(
                "날짜는 YYYY-MM-DD 양식으로 입력해주세요."
            )

        return value

    def validate_job_type(self, value: str) -> str:
        if value not in JOB_SUB_TYPE_NAMES:
            raise serializers.ValidationError("정확한 세부 직무명을 입력해주세요.")

        return value


class PostingByJobPositionSerializer(serializers.ModelSerializer):
    datetime = serializers.DateTimeField(source="collected_on")
    job_type = serializers.CharField(source="job_sub_type_name")

    class Meta:
        model = PostingByJobPosition
        fields = ["datetime", "job_type", "count"]
