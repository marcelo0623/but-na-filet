"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/biographies/`;

type Biographie = {
  id: number;
  titre: string;
  contenu: string;
  image?: string | null;
  publie: boolean;
  ordre: number;
};

export default function BiographieAdminPage() {
  const [biographies, setBiographies] = useState<Biographie[]>([]);
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [ordre, setOrdre] = useState(0);
  const [publie, setPublie] = useState(true);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function chargerBiographies() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Erreur lors du chargement");
      }

      const data = await response.json();
      setBiographies(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    chargerBiographies();
  }, []);

  async function ajouterBiographie(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!titre.trim() || !contenu.trim()) {
      setMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titre,
          contenu,
          ordre,
          publie,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout");
      }

      setTitre("");
      setContenu("");
      setOrdre(0);
      setPublie(true);

      setMessage("Biographie ajoutée avec succès.");

      chargerBiographies();
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  async function supprimerBiographie(id: number) {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette biographie ?"
    );

    if (!confirmation) return;

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      chargerBiographies();
    } catch (error) {
      console.error(error);
      setMessage("Impossible de supprimer la biographie.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#fff",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >

        {/* EN-TÊTE */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <p
              style={{
                color: "#d4af37",
                fontSize: "12px",
                letterSpacing: "2px",
                marginBottom: "8px",
              }}
            >
              ADMINISTRATION
            </p>

            <h1
              style={{
                fontSize: "32px",
                margin: 0,
              }}
            >
              Gestion de la biographie
            </h1>

            <p style={{ color: "#888" }}>
              Ajoutez et gérez les contenus biographiques de But Na Filet.
            </p>
          </div>

          <Link
            href="/admis"
            style={{
              color: "#fff",
              textDecoration: "none",
              border: "1px solid #333",
              padding: "12px 18px",
              borderRadius: "8px",
            }}
          >
            ← Tableau de bord
          </Link>
        </div>

        {/* FORMULAIRE */}

        <section
          style={{
            background: "#111",
            border: "1px solid #222",
            borderRadius: "12px",
            padding: "25px",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Ajouter une biographie
          </h2>

          <form onSubmit={ajouterBiographie}>

            <div style={{ marginBottom: "18px" }}>
              <label>Titre</label>

              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="Ex : Parcours de But Na Filet"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label>Contenu</label>

              <textarea
                value={contenu}
                onChange={(e) => setContenu(e.target.value)}
                placeholder="Écrivez le contenu de la biographie..."
                rows={8}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <div>
                <label>Ordre</label>

                <input
                  type="number"
                  value={ordre}
                  onChange={(e) =>
                    setOrdre(Number(e.target.value))
                  }
                  style={{
                    ...inputStyle,
                    width: "120px",
                  }}
                />
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "25px",
                }}
              >
                <input
                  type="checkbox"
                  checked={publie}
                  onChange={(e) =>
                    setPublie(e.target.checked)
                  }
                />

                Publier
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: "#d4af37",
                color: "#000",
                border: "none",
                padding: "13px 22px",
                borderRadius: "7px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              {loading ? "Ajout..." : "Ajouter la biographie"}
            </button>

          </form>

          {message && (
            <p
              style={{
                marginTop: "15px",
                color: "#d4af37",
              }}
            >
              {message}
            </p>
          )}
        </section>

        {/* LISTE */}

        <section>

          <h2>Biographies existantes</h2>

          {biographies.length === 0 ? (
            <p style={{ color: "#777" }}>
              Aucune biographie enregistrée.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gap: "15px",
              }}
            >
              {biographies.map((bio) => (
                <div
                  key={bio.id}
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: "10px",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                  }}
                >
                  <div>
                    <h3 style={{ marginTop: 0 }}>
                      {bio.titre}
                    </h3>

                    <p
                      style={{
                        color: "#888",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {bio.contenu}
                    </p>

                    <small style={{ color: "#d4af37" }}>
                      {bio.publie
                        ? "Publié"
                        : "Non publié"}
                    </small>
                  </div>

                  <button
                    onClick={() =>
                      supprimerBiographie(bio.id)
                    }
                    style={{
                      height: "40px",
                      background: "#222",
                      color: "#ff6b6b",
                      border: "1px solid #333",
                      borderRadius: "6px",
                      padding: "0 15px",
                      cursor: "pointer",
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  background: "#080808",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "6px",
  outline: "none",
};