from rest_framework import serializers

from .models import (
    Biographie,
    Musique,
    Video,
    Actualite,
    Concert,
    Galerie,
    Message,
)


class BiographieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Biographie
        fields = [
            "id",
            "titre",
            "contenu",
            "image",
            "publie",
            "ordre",
            "date_creation",
            "date_modification",
        ]


class MusiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Musique
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"


class ActualiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actualite
        fields = "__all__"


class ConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        fields = "__all__"


class GalerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Galerie
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = "__all__"