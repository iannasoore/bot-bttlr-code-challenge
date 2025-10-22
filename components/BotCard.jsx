import React from 'react'

export default function BotCard({ bot, onClick, onRelease, onDischarge }) {
  return (
    <div className="bot-card" onClick={() => onClick && onClick(bot)}>
      {onDischarge && (
        <button 
          className="discharge"
          onClick={(e) => {
            e.stopPropagation()
            onDischarge(bot)
          }}
          title="Discharge from service"
        >
          ×
        </button>
      )}
      <img src={bot.avatar_url} alt={bot.name} loading="lazy" />
      <h3>{bot.name}</h3>
      <div className="class">{bot.bot_class}</div>
      <div className="stats">
        <span>❤️ {bot.health}</span>
        <span>⚔️ {bot.damage}</span>
        <span>🛡️ {bot.armor}</span>
      </div>
      <div className="catch">{bot.catchphrase}</div>
      {onRelease && (
        <button 
          className="btn ghost"
          onClick={(e) => {
            e.stopPropagation()
            onRelease(bot)
          }}
        >
          Release
        </button>
      )}
    </div>
  )
}