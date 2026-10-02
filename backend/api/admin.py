from django.contrib import admin

from .models import (
    Biographie,
    Musique,
    Video,
    Actualite,
    Concert,
    Galerie,
    Message,
)


@admin.register(Biographie)
class BiographieAdmin(admin.ModelAdmin):
    list_display = (
        "titre",
        "publie",
        "ordre",
        "date_creation",
        "date_modification",
    )

    list_filter = ("publie",)

    search_fields = (
        "titre",
        "contenu",
    )

    ordering = (
        "ordre",
        "-date_creation",
    )


@admin.register(Musique)
class MusiqueAdmin(admin.ModelAdmin):
    list_display = (
        "titre",
        "artiste",
        "album",
        "date_publication",
    )

    search_fields = (
        "titre",
        "artiste",
        "album",
    )


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = (
        "titre",
        "date_publication",
    )

    search_fields = ("titre",)


@admin.register(Actualite)
class ActualiteAdmin(admin.ModelAdmin):
    list_display = (
        "titre",
        "date_publication",
    )

    search_fields = ("titre",)


@admin.register(Concert)
class ConcertAdmin(admin.ModelAdmin):
    list_display = (
        "titre",
        "date",
        "ville",
        "lieu",
        "statut",
    )

    list_filter = (
        "statut",
        "ville",
    )

    search_fields = (
        "titre",
        "ville",
        "lieu",
    )


@admin.register(Galerie)
class GalerieAdmin(admin.ModelAdmin):
    list_display = (
        "titre",
        "date_publication",
    )

    search_fields = ("titre",)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = (
        "nom",
        "email",
        "sujet",
        "date_envoi",
    )

    search_fields = (
        "nom",
        "email",
        "sujet",
    )