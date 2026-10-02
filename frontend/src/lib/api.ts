export async function getBiographies() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/biographies/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer les biographies");
  }

  return response.json();
}

export async function getMusiques() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/musiques/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer les musiques");
  }

  return response.json();
}

export async function getVideos() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/videos/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer les vidéos");
  }

  return response.json();
}

export async function getConcerts() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/concerts/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer les concerts");
  }

  return response.json();
}

export async function getGalerie() {
  const response = await fetch(
    "http://127.0.0.1:8000/api/galerie/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer la galerie");
  }

  return response.json();
}

export async function envoyerMessage(data: {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/messages/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Impossible d'envoyer le message");
  }

  return response.json();
}