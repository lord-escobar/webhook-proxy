export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { username, message, avatar } = req.body;

  const webhookUrl = "https://discord.com/api/webhooks/WEBHOOK_URLİNİ_BURAYA_KOY";

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
