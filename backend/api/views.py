from rest_framework import viewsets

from .models import (
    Biographie,
    Musique,
    Video,
    Actualite,
    Concert,
    Galerie,
    Message,
)

from .serializers import (
    BiographieSerializer,
    MusiqueSerializer,
    VideoSerializer,
    ActualiteSerializer,
    ConcertSerializer,
    GalerieSerializer,
    MessageSerializer,
)


class BiographieViewSet(viewsets.ModelViewSet):
    queryset = Biographie.objects.all()
    serializer_class = BiographieSerializer


class MusiqueViewSet(viewsets.ModelViewSet):
    queryset = Musique.objects.all()
    serializer_class = MusiqueSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class ActualiteViewSet(viewsets.ModelViewSet):
    queryset = Actualite.objects.all()
    serializer_class = ActualiteSerializer


class ConcertViewSet(viewsets.ModelViewSet):
    queryset = Concert.objects.all()
    serializer_class = ConcertSerializer


class GalerieViewSet(viewsets.ModelViewSet):
    queryset = Galerie.objects.all()
    serializer_class = GalerieSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer