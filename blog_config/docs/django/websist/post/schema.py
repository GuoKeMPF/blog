from graphene import Node
from graphene_django.filter import DjangoFilterConnectionField
from graphene_django.types import DjangoObjectType

from .models import Post


class PostNode(DjangoObjectType):
    class Meta:
        model = Post
        interfaces = (Node,)
        fields = "__all__"
        filter_fields = [
            "id",
            "title",
            "content",
            "description",
            "create_time",
            "update_time",
        ]


class Query:
    post = Node.Field(PostNode)
    all_posts = DjangoFilterConnectionField(PostNode)
