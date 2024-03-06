import graphene
from graphene_django.debug import DjangoDebug

import post.schema


class Query(
    post.schema.Query,
    graphene.ObjectType,
):
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(query=Query)
