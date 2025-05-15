"use client";

import { useState } from "react";

export default function Home() {
  const [discordUsername, setDiscordUsername] = useState("");
  const [telegramUserId, setTelegramUserId] = useState("");
  const [status, setStatus] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setStatus(null);

    try {
      // Detect if Discord input is userId (all digits) or username
      const isUserId = /^\d+$/.test(discordUsername);
      const discordEndpoint = isUserId
        ? `https://nillion-discord-bot.up.railway.app/api/verify?userId=${encodeURIComponent(discordUsername)}&guildId=1222883717664604160`
        : `https://nillion-discord-bot.up.railway.app/api/verify?username=${encodeURIComponent(discordUsername)}&guildId=1222883717664604160`;

      // 1. Verify Discord user
      const discordRes = await fetch(discordEndpoint);
      const discordData = await discordRes.json();

      // 2. Verify Telegram user
      const telegramRes = await fetch(
        `https://nillion-tg-bot.up.railway.app/api/verify?userId=${encodeURIComponent(telegramUserId)}&groupId=-1002187563051`
      );
      const telegramData = await telegramRes.json();

      if (discordData.exists && telegramData.exists) {
        setStatus("✅ The Nillion Cult welcomes you, chosen one. Your initiation begins...");
      } else {
        setStatus("❌ The ancient texts speak of your deceit. You must first join our sacred circles.");
      }
    } catch {
      setStatus("❌ The cosmic forces block our connection. The Nillion Cult's servers are in turmoil...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark text-white flex flex-col items-center justify-center">
      <h1 className="font-bungeeSpice text-4xl text-center mb-2 drop-shadow-lg">
        Welcome to the Ceremony of Initiation
      </h1>
      <h2 className="font-bungeeSpice text-lg text-center mb-6 font-bold">
        The Elders Await Your Presence
      </h2>
      <div className="bg-neonBlue rounded-xl shadow-2xl p-6 w-full max-w-md mb-6">
        <h1 className="font-bungeeShade text-2xl font-bold mb-4 text-center">Begin Your Sacred Journey</h1>
        <div className="mb-6 p-4 bg-dark/70 rounded-lg border-l-4 border-r-4" style={{ borderColor: '#ff640a' }}>
          <p className="font-underdog text-lg text-neonOrange mb-2 text-center uppercase">THE RITES OF PASSAGE</p>
          <p className="font-underdog text-white font-medium mb-1 text-center">
            Whisper your Discord essence, that the ancient servers may know your name.
          </p>
          <p className="font-underdog text-white font-medium text-center">
            Let your Telegram presence be revealed, so the hidden sanctuaries may open to you.
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <input
              className="w-full px-3 py-2 border" style={{ borderColor: '#0021f5', background: 'rgba(0,1,31,0.8)'}}
              placeholder="Discord username or userID"
              value={discordUsername}
              onChange={e => setDiscordUsername(e.target.value)}
            />
          </div>
          <input
            className="w-full px-3 py-2 border" style={{ borderColor: '#0021f5', background: 'rgba(0,1,31,0.8)'}}
            placeholder="Telegram user ID"
            value={telegramUserId}
            onChange={e => setTelegramUserId(e.target.value)}
          />
          <button
            className="font-underdog w-full py-2 px-4 font-bold rounded transition-colors duration-200 shadow-lg"
            style={{ background: '#0021f5', color: '#ff640a' }}
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Will you rise to be Omniscient ..." : "TAKE THE OATH"}
          </button>
        </div>
        {status && (
          <div className="mt-4 text-center text-lg">
            {status}
          </div>
        )}
      </div>
    </main>
  );
}
