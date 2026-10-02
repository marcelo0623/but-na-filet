from django.db import models


class Musique(models.Model):
    titre = models.CharField(max_length=200)
    artiste = models.CharField(max_length=200, blank=True)
    album = models.CharField(max_length=200, blank=True)

    lien_spotify = models.URLField(
        blank=True,
        null=True
    )

    fichier_audio = models.FileField(
        upload_to="musiques/",
        blank=True,
        null=True
    )

    pochette = models.ImageField(
        upload_to="pochettes/",
        blank=True,
        null=True
    )

    date_publication = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_publication"]

    def __str__(self):
        return self.titre


class Video(models.Model):
    titre = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    url = models.URLField()
    miniature = models.ImageField(
        upload_to="videos/",
        blank=True,
        null=True
    )
    date_publication = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_publication"]

    def __str__(self):
        return self.titre


class Actualite(models.Model):
    titre = models.CharField(max_length=250)
    contenu = models.TextField()
    image = models.ImageField(
        upload_to="actualites/",
        blank=True,
        null=True
    )
    date_publication = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_publication"]

    def __str__(self):
        return self.titre


class Concert(models.Model):
    titre = models.CharField(max_length=200)
    date = models.DateField()
    lieu = models.CharField(max_length=200)
    ville = models.CharField(max_length=150)
    description = models.TextField(blank=True)

    STATUTS = [
        ("a_venir", "À venir"),
        ("termine", "Terminé"),
        ("annule", "Annulé"),
    ]

    statut = models.CharField(
        max_length=20,
        choices=STATUTS,
        default="a_venir"
    )

    def __str__(self):
        return f"{self.titre} - {self.ville}"


class Galerie(models.Model):
    titre = models.CharField(max_length=200)
    image = models.ImageField(upload_to="galerie/")
    date_publication = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_publication"]

    def __str__(self):
        return self.titre


class Message(models.Model):
    nom = models.CharField(max_length=150)
    email = models.EmailField()
    sujet = models.CharField(max_length=250)
    message = models.TextField()
    date_envoi = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date_envoi"]

    def __str__(self):
        return f"{self.nom} - {self.sujet}"


class Biographie(models.Model):
    titre = models.CharField(max_length=200)

    contenu = models.TextField()

    image = models.ImageField(
        upload_to="biographie/",
        blank=True,
        null=True
    )

    publie = models.BooleanField(default=True)

    ordre = models.PositiveIntegerField(default=0)

    date_creation = models.DateTimeField(auto_now_add=True)

    date_modification = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["ordre", "-date_creation"]

    def __str__(self):
        return self.titre