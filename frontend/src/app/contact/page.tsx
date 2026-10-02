"use client";

import "../home.css";

import { useState } from "react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";

import { envoyerMessage } from "@/lib/api";

export default function ContactPage() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await envoyerMessage({
        nom,
        email,
        sujet,
        message,
      });

      setSuccess(
        "Votre message a été envoyé avec succès."
      );

      setNom("");
      setEmail("");
      setSujet("");
      setMessage("");

    } catch (err) {
      setError(
        "Une erreur est survenue lors de l'envoi du message."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="contact-page">

      {/* EN-TÊTE */}
      <section className="contact-header">
        <h1>CONTACT</h1>

        <p>
          Pour toute demande professionnelle, réservation ou collaboration.
        </p>
      </section>


      {/* CONTENU */}
      <section className="contact-content">

        <div className="contact-title">
          <h2>RESTONS EN CONTACT</h2>

          <p>
            Vous souhaitez contacter But Na Filet pour un concert,
            une collaboration, une interview ou toute autre demande ?
          </p>
        </div>


        <div className="contact-grid">

          {/* FORMULAIRE */}
          <div className="contact-card contact-form-card">

            <div className="contact-icon">✉</div>

            <h3>ENVOYER UN MESSAGE</h3>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >

              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="text"
                name="sujet"
                placeholder="Sujet"
                value={sujet}
                onChange={(e) => setSujet(e.target.value)}
                required
              />

              <textarea
                name="message"
                placeholder="Votre message..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <button
                type="submit"
                className="contact-button"
                disabled={loading}
              >
                {loading
                  ? "ENVOI EN COURS..."
                  : "ENVOYER LE MESSAGE"}
              </button>

              {success && (
                <p className="contact-success">
                  {success}
                </p>
              )}

              {error && (
                <p className="contact-error">
                  {error}
                </p>
              )}

            </form>

          </div>


          {/* TÉLÉPHONE */}
          <div className="contact-card">

            <div className="contact-icon">☎</div>

            <h3>TÉLÉPHONE</h3>

            <p>
              +243838818980
            </p>

            <a
              href="tel:+243838818980"
              className="contact-button"
            >
              APPELER
            </a>

          </div>


          {/* RÉSEAUX SOCIAUX */}
          <div className="contact-card social-card">

            <div className="contact-icon">◎</div>

            <h3>RÉSEAUX SOCIAUX</h3>

            <p>
              Suivez But Na Filet sur les réseaux sociaux.
            </p>

            <div className="social-links">

              <a
                href="https://www.instagram.com/TON_COMPTE"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button instagram"
              >
                <FaInstagram />
                <span>INSTAGRAM</span>
              </a>

              <a
                href="https://www.facebook.com/TON_COMPTE"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button facebook"
              >
                <FaFacebookF />
                <span>FACEBOOK</span>
              </a>

              <a
                href="https://www.youtube.com/channel/UCnJ4w7l8SZvz9aFGCLs1NWg"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button youtube"
              >
                <FaYoutube />
                <span>YOUTUBE</span>
              </a>

              <a
                href="https://www.tiktok.com/@butnafilet01"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button tiktok"
              >
                <FaTiktok />
                <span>TIKTOK</span>
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}