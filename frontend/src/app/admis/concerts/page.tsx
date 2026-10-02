"use client";

import { useEffect, useState } from "react";
import "./concerts.css";

const API_URL = "http://127.0.0.1:8000/api/concerts/";

type Concert = {
  id: number;
  titre: string;
  date: string;
  lieu: string;
  ville: string;
  description: string;
  statut: "a_venir" | "termine" | "annule";
};

export default function AdminConcertsPage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  const [titre, setTitre] = useState("");
  const [date, setDate] = useState("");
  const [lieu, setLieu] = useState("");
  const [ville, setVille] = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState<
    "a_venir" | "termine" | "annule"
  >("a_venir");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  async function chargerConcerts() {
    try {
      const response = await fetch(API_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      setConcerts(data);
    } catch (error) {
      console.error(error);
      setMessage("Impossible de charger les concerts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    chargerConcerts();
  }, []);

  function reinitialiserFormulaire() {
    setTitre("");
    setDate("");
    setLieu("");
    setVille("");
    setDescription("");
    setStatut("a_venir");
    setEditingId(null);
  }

  async function enregistrerConcert(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setMessage("");

    const donnees = {
      titre,
      date,
      lieu,
      ville,
      description,
      statut,
    };

    try {
      const endpoint = editingId
        ? `${API_URL}${editingId}/`
        : API_URL;

      const response = await fetch(endpoint, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(errorData);
        throw new Error();
      }

      setMessage(
        editingId
          ? "Concert modifié avec succès."
          : "Concert ajouté avec succès."
      );

      reinitialiserFormulaire();
      await chargerConcerts();
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue.");
    }
  }

  function modifierConcert(concert: Concert) {
    setEditingId(concert.id);
    setTitre(concert.titre);
    setDate(concert.date);
    setLieu(concert.lieu);
    setVille(concert.ville);
    setDescription(concert.description || "");
    setStatut(concert.statut);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function supprimerConcert(id: number) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce concert ?"
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

      setMessage("Concert supprimé avec succès.");

      await chargerConcerts();
    } catch (error) {
      console.error(error);
      setMessage(
        "Impossible de supprimer ce concert."
      );
    }
  }

  function afficherStatut(statut: Concert["statut"]) {
    if (statut === "a_venir") {
      return "À venir";
    }

    if (statut === "termine") {
      return "Terminé";
    }

    return "Annulé";
  }

  return (
    <main className="admin-concerts">

      {/* HEADER */}

      <div className="concerts-header">

        <div>
          <p className="admin-small-title">
            ADMINISTRATION
          </p>

          <h1>CONCERTS</h1>

          <p>
            Gérez les concerts et événements de But Na Filet.
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

      <section className="concert-form-card">

        <div className="section-title">

          <div>
            <h2>
              {editingId
                ? "MODIFIER LE CONCERT"
                : "AJOUTER UN CONCERT"}
            </h2>

            <p>
              {editingId
                ? "Modifiez les informations du concert."
                : "Ajoutez un nouveau concert."}
            </p>
          </div>

        </div>

        <form
          onSubmit={enregistrerConcert}
        >

          <div className="form-grid">

            <div className="form-group">
              <label>
                Nom du concert
              </label>

              <input
                type="text"
                value={titre}
                onChange={(e) =>
                  setTitre(e.target.value)
                }
                placeholder="Ex : Concert Live"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>
                Ville
              </label>

              <input
                type="text"
                value={ville}
                onChange={(e) =>
                  setVille(e.target.value)
                }
                placeholder="Ex : Kinshasa"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Lieu
              </label>

              <input
                type="text"
                value={lieu}
                onChange={(e) =>
                  setLieu(e.target.value)
                }
                placeholder="Ex : Centre culturel"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Statut
              </label>

              <select
                value={statut}
                onChange={(e) =>
                  setStatut(
                    e.target.value as Concert["statut"]
                  )
                }
              >
                <option value="a_venir">
                  À venir
                </option>

                <option value="termine">
                  Terminé
                </option>

                <option value="annule">
                  Annulé
                </option>
              </select>
            </div>

          </div>

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Description du concert..."
              rows={5}
            />

          </div>

          <div className="form-actions">

            <button
              type="submit"
              className="save-button"
            >
              {editingId
                ? "✓ ENREGISTRER LES MODIFICATIONS"
                : "+ AJOUTER LE CONCERT"}
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

      <section className="concert-list-section">

        <div className="section-title">

          <div>
            <h2>
              CONCERTS ENREGISTRÉS
            </h2>

            <p>
              {concerts.length} concert
              {concerts.length > 1 ? "s" : ""}
            </p>
          </div>

        </div>

        {loading ? (

          <div className="empty-message">
            Chargement des concerts...
          </div>

        ) : concerts.length === 0 ? (

          <div className="empty-message">
            Aucun concert enregistré pour le moment.
          </div>

        ) : (

          <div className="concert-list">

            {concerts.map((concert) => (

              <article
                className="concert-admin-card"
                key={concert.id}
              >

                <div className="concert-date">
                  <span>
                    {new Date(
                      concert.date + "T00:00:00"
                    ).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </span>
                </div>

                <div className="concert-info">

                  <h3>
                    {concert.titre}
                  </h3>

                  <p>
                    📍 {concert.lieu}, {concert.ville}
                  </p>

                  {concert.description && (
                    <p className="description">
                      {concert.description}
                    </p>
                  )}

                  <span
                    className={`status status-${concert.statut}`}
                  >
                    {afficherStatut(
                      concert.statut
                    )}
                  </span>

                </div>

                <div className="action-buttons">

                  <button
                    className="edit-button"
                    onClick={() =>
                      modifierConcert(concert)
                    }
                  >
                    Modifier
                  </button>

                  <button
                    className="delete-button"
                    onClick={() =>
                      supprimerConcert(concert.id)
                    }
                  >
                    Supprimer
                  </button>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}