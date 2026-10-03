"use client";

import { useEffect, useState } from "react";
import "./discographie.css";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/musiques/`;

type Musique = {
  id: number;
  titre: string;
  artiste: string;
  album: string;
  lien_spotify: string | null;
  fichier_audio: string | null;
  pochette: string | null;
  date_publication: string;
};

export default function AdminDiscographiePage() {
  const [musiques, setMusiques] = useState<Musique[]>([]);
  const [loading, setLoading] = useState(true);

  const [titre, setTitre] = useState("");
  const [artiste, setArtiste] = useState("But Na Filet");
  const [album, setAlbum] = useState("");
  const [spotify, setSpotify] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function chargerMusiques() {
    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setMusiques(data);
    } catch (error) {
      console.error(error);
      setMessage("Impossible de charger les musiques.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    chargerMusiques();
  }, []);

  function reinitialiserFormulaire() {
    setTitre("");
    setArtiste("But Na Filet");
    setAlbum("");
    setSpotify("");
    setEditingId(null);
  }

  async function enregistrerMusique(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setMessage("");

    const donnees = {
      titre,
      artiste,
      album,
      lien_spotify: spotify || null,
    };

    try {
      const url = editingId
        ? `${API_URL}${editingId}/`
        : API_URL;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
      });

      if (!response.ok) {
        throw new Error();
      }

      setMessage(
        editingId
          ? "Musique modifiée avec succès."
          : "Musique ajoutée avec succès."
      );

      reinitialiserFormulaire();
      await chargerMusiques();
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue.");
    }
  }

  function modifierMusique(musique: Musique) {
    setEditingId(musique.id);
    setTitre(musique.titre);
    setArtiste(musique.artiste);
    setAlbum(musique.album);
    setSpotify(musique.lien_spotify || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function supprimerMusique(id: number) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette musique ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      setMessage("Musique supprimée avec succès.");

      await chargerMusiques();
    } catch (error) {
      console.error(error);
      setMessage("Impossible de supprimer cette musique.");
    }
  }

  return (
    <main className="admin-discographie">

      {/* EN-TÊTE */}
      <div className="discographie-header">
        <div>
          <p className="admin-small-title">
            ADMINISTRATION
          </p>

          <h1>DISCOGRAPHIE</h1>

          <p>
            Gérez les musiques de But Na Filet.
          </p>
        </div>

        <a href="/admin" className="back-button">
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
      <section className="music-form-card">

        <div className="section-title">
          <h2>
            {editingId
              ? "MODIFIER LA MUSIQUE"
              : "AJOUTER UNE MUSIQUE"}
          </h2>

          <span>
            {editingId ? "Modification" : "Nouvelle musique"}
          </span>
        </div>

        <form onSubmit={enregistrerMusique}>

          <div className="form-grid">

            <div className="form-group">
              <label>Titre de la musique</label>

              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="Ex : Mon choix"
                required
              />
            </div>

            <div className="form-group">
              <label>Artiste</label>

              <input
                type="text"
                value={artiste}
                onChange={(e) => setArtiste(e.target.value)}
                placeholder="But Na Filet"
                required
              />
            </div>

            <div className="form-group">
              <label>Album</label>

              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Nom de l'album"
              />
            </div>

            <div className="form-group">
              <label>Lien Spotify</label>

              <input
                type="url"
                value={spotify}
                onChange={(e) => setSpotify(e.target.value)}
                placeholder="https://open.spotify.com/..."
              />
            </div>

          </div>

          <div className="form-actions">

            <button
              type="submit"
              className="save-button"
            >
              {editingId
                ? "✓ ENREGISTRER LES MODIFICATIONS"
                : "+ AJOUTER LA MUSIQUE"}
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
      <section className="music-list-section">

        <div className="section-title">
          <div>
            <h2>MUSIQUES ENREGISTRÉES</h2>

            <p>
              {musiques.length} musique
              {musiques.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="empty-message">
            Chargement des musiques...
          </div>
        ) : musiques.length === 0 ? (
          <div className="empty-message">
            Aucune musique enregistrée pour le moment.
          </div>
        ) : (
          <div className="music-table-wrapper">

            <table className="music-table">

              <thead>
                <tr>
                  <th>TITRE</th>
                  <th>ARTISTE</th>
                  <th>ALBUM</th>
                  <th>SPOTIFY</th>
                  <th>DATE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>

                {musiques.map((musique) => (
                  <tr key={musique.id}>

                    <td>
                      <strong>
                        {musique.titre}
                      </strong>
                    </td>

                    <td>
                      {musique.artiste || "-"}
                    </td>

                    <td>
                      {musique.album || "-"}
                    </td>

                    <td>
                      {musique.lien_spotify ? (
                        <a
                          href={musique.lien_spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="spotify-link"
                        >
                          Spotify
                        </a>
                      ) : (
                        <span className="no-link">
                          Aucun lien
                        </span>
                      )}
                    </td>

                    <td>
                      {new Date(
                        musique.date_publication
                      ).toLocaleDateString("fr-FR")}
                    </td>

                    <td>
                      <div className="action-buttons">

                        <button
                          className="edit-button"
                          onClick={() =>
                            modifierMusique(musique)
                          }
                        >
                          Modifier
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            supprimerMusique(musique.id)
                          }
                        >
                          Supprimer
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>

    </main>
  );
}