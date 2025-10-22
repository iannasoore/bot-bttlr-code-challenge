import React from 'react'

export default function BotCard({ bot, onClick, onDischarge }){
  return (
    <div className="bot-card" onClick={onClick}>
      {onDischarge && (
        <button
          className="discharge"
          onClick={(e)=>{ e.stopPropagation(); onDischarge()}}
          aria-label={`Discharge ${bot.name}`}
          title="Permanently delete this bot"
        >
          ✕
        </button>
      )}
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p className="class">{bot.bot_class}</p>
      <p className="stats">
        💚 {bot.health} &nbsp; • &nbsp; ⚔️ {bot.damage} &nbsp; • &nbsp; 🛡️ {bot.armor}
      </p>
      <p className="catch">"{bot.catchphrase}"</p>
    </div>
  )
}