from rest_framework import serializers

from .models import Foods


class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = "__all__"


class FoodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foods
        fields = ["id", "name", "content", "description", "create_time", "update_time"]
