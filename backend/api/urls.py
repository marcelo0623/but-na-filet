from rest_framework.routers import DefaultRouter
from .views import (
    MusiqueViewSet,
    VideoViewSet,
    ActualiteViewSet,
    ConcertViewSet,
    GalerieViewSet,
    MessageViewSet,
    BiographieViewSet,
)

router = DefaultRouter()

router.register(r"musiques", MusiqueViewSet, basename="musiques")
router.register(r"videos", VideoViewSet, basename="videos")
router.register(r"actualites", ActualiteViewSet, basename="actualites")
router.register(r"concerts", ConcertViewSet, basename="concerts")
router.register(r"galerie", GalerieViewSet, basename="galerie")
router.register(r"messages", MessageViewSet, basename="messages")
router.register(
    r"biographies",
    BiographieViewSet,
    basename="biographies"
)

urlpatterns = router.urls