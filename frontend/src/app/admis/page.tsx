"use client";

import Link from "next/link";
import "./admin.css";

export default function AdminDashboard() {
  const modules = [
    {
      titre: "Biographie",
      description: "Gérer les contenus biographiques de l'artiste.",
      icon: "👤",
      lien: "/admis/biographie",
    },
    {
      titre: "Discographie",
      description: "Ajouter et modifier les musiques.",
      icon: "🎵",
      lien: "/admis/discographie",
    },
    {
      titre: "Vidéos",
      description: "Gérer les clips et vidéos.",
      icon: "🎬",
      lien: "/admis/videos",
    },
    {
      titre: "Galerie",
      description: "Gérer les photos de l'artiste.",
      icon: "🖼️",
      lien: "/admis/galerie",
    },
    {
      titre: "Concerts",
      description: "Gérer les événements et concerts.",
      icon: "📅",
      lien: "/admis/concerts",
    },
  ];

  return (
    <main className="admin-dashboard">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-logo">
          <h1>BUT NA FILET</h1>
          <span>ADMINISTRATION</span>
        </div>

        <nav className="admin-nav">

          <Link href="/admis" className="admin-nav-link active">
            <span>🏠</span>
            Tableau de bord
          </Link>

          <Link href="/admis/biographie" className="admin-nav-link">
            <span>👤</span>
            Biographie
          </Link>

          <Link href="/admis/discographie" className="admin-nav-link">
            <span>🎵</span>
            Discographie
          </Link>

          <Link href="/admis/videos" className="admin-nav-link">
            <span>🎬</span>
            Vidéos
          </Link>

          <Link href="/admis/galerie" className="admin-nav-link">
            <span>🖼️</span>
            Galerie
          </Link>

          <Link href="/admis/concerts" className="admin-nav-link">
            <span>📅</span>
            Concerts
          </Link>

        </nav>

        <div className="admin-sidebar-bottom">

          <Link href="/" className="admin-nav-link">
            <span>🌐</span>
            Voir le site
          </Link>

        </div>

      </aside>

      {/* CONTENU */}
      <section className="admin-content">

        <header className="admin-header">

          <div>
            <p className="admin-small-title">
              ESPACE D'ADMINISTRATION
            </p>

            <h2>Tableau de bord</h2>

            <p>
              Bienvenue dans l'espace de gestion du site de But Na Filet.
            </p>
          </div>

          <div className="admin-user">
            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Administrateur</strong>
              <span>Gestionnaire du site</span>
            </div>
          </div>

        </header>

        {/* MODULES */}
        <section className="admin-section">

          <div className="section-heading">
            <h3>Gestion du site</h3>

            <p>
              Sélectionnez une rubrique pour gérer son contenu.
            </p>
          </div>

          <div className="admin-cards">

            {modules.map((module) => (

              <Link
                href={module.lien}
                key={module.titre}
                className="admin-card"
              >

                <div className="admin-card-icon">
                  {module.icon}
                </div>

                <div className="admin-card-content">

                  <h4>{module.titre}</h4>

                  <p>{module.description}</p>

                  <span className="admin-card-link">
                    Gérer →
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* ACCÈS RAPIDES */}
        <section className="admin-section quick-section">

          <div className="section-heading">
            <h3>Accès rapides</h3>

            <p>
              Ajoutez rapidement du contenu au site.
            </p>
          </div>

          <div className="quick-actions">

            <Link href="/admis/discographie" className="quick-button">
              + Ajouter une musique
            </Link>

            <Link href="/admis/videos" className="quick-button">
              + Ajouter une vidéo
            </Link>

            <Link href="/admis/galerie" className="quick-button">
              + Ajouter une photo
            </Link>

            <Link href="/admis/concerts" className="quick-button">
              + Ajouter un concert
            </Link>

          </div>

        </section>

      </section>

    </main>
  );
}