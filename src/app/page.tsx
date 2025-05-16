"use client";

import { useState } from "react";

export default function Home() {
  const [discordUsername, setDiscordUsername] = useState("");
  const [telegramUserId, setTelegramUserId] = useState("");
  const [status, setStatus] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const [discordStatus, setDiscordStatus] = useState<null | "success" | "error">(null);
  const [telegramStatus, setTelegramStatus] = useState<null | "success" | "error">(null);

  const handleVerify = async () => {
    setLoading(true);
    setStatus(null);
    setDiscordStatus(null);
    setTelegramStatus(null);

    try {
      // Detect if Discord input is userId (all digits) or username
      const isUserId = /^\d+$/.test(discordUsername);
      const discordEndpoint = isUserId
        ? `https://nillion-discord-bot.up.railway.app/api/verify?userId=${encodeURIComponent(discordUsername)}&guildId=1222883717664604160`
        : `https://nillion-discord-bot.up.railway.app/api/verify?username=${encodeURIComponent(discordUsername)}&guildId=1222883717664604160`;

      // Detect if Telegram input is userId (all digits) or username
      const isTelegramUserId = /^\d+$/.test(telegramUserId.trim());
      const telegramEndpoint = isTelegramUserId
        ? `https://nillion-tg-bot.up.railway.app/api/verify?userId=${encodeURIComponent(telegramUserId.trim())}&groupId=-1002187563051`
        : `https://nillion-tg-bot.up.railway.app/api/verify?username=${encodeURIComponent(telegramUserId.trim())}&groupId=-1002187563051`;

      // Run both verifications in parallel
      const [discordRes, telegramRes] = await Promise.all([
        fetch(discordEndpoint),
        fetch(telegramEndpoint)
      ]);

      const discordData = await discordRes.json();
      const telegramData = await telegramRes.json();

      // Log API responses
      console.log('Discord API Response:', {
        endpoint: discordEndpoint,
        response: discordData,
        status: discordRes.status
      });
      
      console.log('Telegram API Response:', {
        endpoint: telegramEndpoint,
        response: telegramData,
        status: telegramRes.status
      });

      // Update individual statuses
      setDiscordStatus(discordData.exists ? "success" : "error");
      setTelegramStatus(telegramData.exists ? "success" : "error");

      // Update overall status
      if (discordData.exists && telegramData.exists) {
        setStatus("✅ The Nillion Cult welcomes you, chosen one. Your initiation begins...");
      } else {
        setStatus("❌ The ancient texts speak of your deceit. You must first join our sacred circles.");
      }
    } catch (error) {
      console.error('Verification Error:', error);
      setStatus("❌ The cosmic forces block our connection. The Nillion Cult's servers are in turmoil...");
    } finally {
      setLoading(false);
    }
  };

  const StatusIndicator = ({ status }: { status: null | "success" | "error" }) => {
    if (status === null) return null;
    return status === "success" ? "✅" : "❌";
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
          <div className="flex items-center gap-2">
            <input
              className="flex-1 px-3 py-2 border" style={{ borderColor: '#0021f5', background: 'rgba(0,1,31,0.8)'}}
              placeholder="Discord username or userID"
              value={discordUsername}
              onChange={e => setDiscordUsername(e.target.value)}
            />
            <span className="text-xl"><StatusIndicator status={discordStatus} /></span>
          </div>
          <div className="flex items-center gap-2 relative">
            <input
              className="flex-1 px-3 py-2 border" style={{ borderColor: '#0021f5', background: 'rgba(0,1,31,0.8)'}}
              placeholder="Telegram user ID or @username"
              value={telegramUserId}
              onChange={e => setTelegramUserId(e.target.value)}
            />
            <span className="text-xl"><StatusIndicator status={telegramStatus} /></span>
            <div className="relative group ml-2">
              <span className="cursor-pointer text-neonOrange text-lg" tabIndex={0}>
                ❓
              </span>
              <div className="absolute left-1/2 z-10 w-64 -translate-x-1/2 mt-2 px-3 py-2 rounded bg-dark text-white text-sm border border-neonOrange opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto" style={{background: '#1a1a2f', borderColor: '#ff640a'}}>
                <b>How to find your Telegram user ID?</b><br/>
                <ol className="list-decimal ml-4">
                  <li>Start a chat with our bot: <a href="https://t.me/nillion_cult_bot" target="_blank" rel="noopener noreferrer" className="underline text-neonOrange">@Nillion_Cult_Bot</a></li>
                  <li>Type <code>/userid</code> and send it.</li>
                  <li>The bot will reply with your user ID. Copy and paste it here.</li>
                </ol>
                <div className="mt-2 text-xs text-gray-300">If you get a 'User not found' error with your username, please try this method.</div>
              </div>
            </div>
          </div>
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
