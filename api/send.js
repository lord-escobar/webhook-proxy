export default async function handler(req, res) {
  // CORS ayarları
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { username, message, avatar } = req.body;

  const webhookUrl = "https://discord.com/api/webhooks/1375495039568052355/hensGjEM0nLKbUKOgURLtpjbvpZOVnvj2DlzFgyMIS9DUg2bd9iMQqhJ2ELrdivp_fzL";

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username || "Yeni Başvuru",
        content: message,
        avatar_url: avatar || undefined,
      }),
    });

    if (!response.ok) {
      return res.status(500).json({ message: "Webhook gönderilemedi" });
    }

    return res.status(200).json({ message: "Başarıyla gönderildi" });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu hatası" });
  }
}
