"use client";

import { useEffect, useState } from "react";
import "./galerie.css";

const API_URL = "http://127.0.0.1:8000/api/galerie/";
const BACKEND_URL = "http://127.0.0.1:8000";

type Galerie = {
  id: number;
  titre: string;
  image: string;
  date_publication: string;
};

export default function AdminGaleriePage() {
  const [galeries, setGaleries] = useState<Galerie[]>([]);
  const [loading, setLoading] = useState(true);

  const [titre, setTitre] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function chargerGalerie() {
    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setGaleries(data);
    } catch (error) {
      console.error(error);
      setMessage("Impossible de charger la galerie.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    chargerGalerie();
  }, []);

  function choisirImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const fichier = e.target.files?.[0];

    if (!fichier) {
      return;
    }

    setImage(fichier);

    const preview = URL.createObjectURL(fichier);
    setImagePreview(preview);
  }

  function reinitialiserFormulaire() {
    setTitre("");
    setImage(null);
    setImagePreview("");
    setEditingId(null);

    const input = document.getElementById(
      "image-input"
    ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  }

  async function enregistrerPhoto(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMessage("");

    if (!titre.trim()) {
      setMessage("Veuillez entrer un titre.");
      return;
    }

    if (!editingId && !image) {
      setMessage("Veuillez sélectionner une image.");
      return;
    }

    const formData = new FormData();

    formData.append("titre", titre);

    if (image) {
      formData.append("image", image);
    }

    try {
      const endpoint = editingId
        ? `${API_URL}${editingId}/`
        : API_URL;

      const response = await fetch(endpoint, {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(errorData);
        throw new Error();
      }

      setMessage(
        editingId
          ? "Photo modifiée avec succès."
          : "Photo ajoutée avec succès."
      );

      reinitialiserFormulaire();
      await chargerGalerie();
    } catch (error) {
      console.error(error);
      setMessage(
        "Une erreur est survenue lors de l'enregistrement."
      );
    }
  }

  function modifierPhoto(photo: Galerie) {
    setEditingId(photo.id);
    setTitre(photo.titre);
    setImage(null);

    const imageUrl = photo.image.startsWith("http")
      ? photo.image
      : `${BACKEND_URL}${photo.image}`;

    setImagePreview(imageUrl);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function supprimerPhoto(id: number) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette photo ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}${id}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setMessage("Photo supprimée avec succès.");

      await chargerGalerie();
    } catch (error) {
      console.error(error);
      setMessage(
        "Impossible de supprimer cette photo."
      );
    }
  }

  function obtenirUrlImage(image: string) {
    if (image.startsWith("http")) {
      return image;
    }

    return `${BACKEND_URL}${image}`;
  }

  return (
    <main className="admin-galerie">

      {/* HEADER */}

      <div className="galerie-header">

        <div>
          <p className="admin-small-title">
            ADMINISTRATION
          </p>

          <h1>GALERIE</h1>

          <p>
            Gérez les photos de But Na Filet.
          </p>
        </div>

        <a
          href="/admin"
          className="back-button"
        >
          ← RETOUR
        </a>

      </div>

      {/* MESSAGE */}

      {message && (
        <div className="admin-message">
          {message}
        </div>
      )}

      {/* FORMULAIRE */}

      <section className="gallery-form-card">

        <div className="section-title">

          <div>
            <h2>
              {editingId
                ? "MODIFIER LA PHOTO"
                : "AJOUTER UNE PHOTO"}
            </h2>

            <p>
              {editingId
                ? "Modifiez les informations de la photo."
                : "Ajoutez une nouvelle photo à la galerie."}
            </p>
          </div>

        </div>

        <form
          onSubmit={enregistrerPhoto}
          className="gallery-form"
        >

          <div className="form-group">

            <label>
              Titre de la photo
            </label>

            <input
              type="text"
              value={titre}
              onChange={(e) =>
                setTitre(e.target.value)
              }
              placeholder="Ex : Concert à Kinshasa"
              required
            />

          </div>

          <div className="form-group">

            <label>
              Image
            </label>

            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={choisirImage}
            />

          </div>

          {imagePreview && (
            <div className="preview-container">

              <p>Aperçu :</p>

              <img
                src={imagePreview}
                alt="Aperçu"
                className="image-preview"
              />

            </div>
          )}

          <div className="form-actions">

            <button
              type="submit"
              className="save-button"
            >
              {editingId
                ? "✓ ENREGISTRER LES MODIFICATIONS"
                : "+ AJOUTER LA PHOTO"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={reinitialiserFormulaire}
              >
                ANNULER
              </button>
            )}

          </div>

        </form>

      </section>

      {/* LISTE */}

      <section className="gallery-list-section">

        <div className="section-title">

          <div>

            <h2>
              PHOTOS ENREGISTRÉES
            </h2>

            <p>
              {galeries.length} photo
              {galeries.length > 1 ? "s" : ""}
            </p>

          </div>

        </div>

        {loading ? (

          <div className="empty-message">
            Chargement de la galerie...
          </div>

        ) : galeries.length === 0 ? (

          <div className="empty-message">
            Aucune photo enregistrée pour le moment.
          </div>

        ) : (

          <div className="gallery-grid">

            {galeries.map((photo) => (

              <article
                className="gallery-admin-card"
                key={photo.id}
              >

                <div className="gallery-image-container">

                  <img
                    src={obtenirUrlImage(photo.image)}
                    alt={photo.titre}
                  />

                </div>

                <div className="gallery-card-content">

                  <h3>
                    {photo.titre}
                  </h3>

                  <p>
                    {new Date(
                      photo.date_publication
                    ).toLocaleDateString("fr-FR")}
                  </p>

                  <div className="action-buttons">

                    <button
                      className="edit-button"
                      onClick={() =>
                        modifierPhoto(photo)
                      }
                    >
                      Modifier
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        supprimerPhoto(photo.id)
                      }
                    >
                      Supprimer
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}