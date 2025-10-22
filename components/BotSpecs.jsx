import React from 'react'

export default function BotSpecs({ bot, onBack, onEnlist }){
  if(!bot) return null
  return (
    <section className="bot-specs">
      <button className="back" onClick={onBack}>← Back to Collection</button>
      <div className="specs-card">
        <img src={bot.avatar_url} alt={bot.name} />
        <div className="specs-info">
          <h2>{bot.name}</h2>
          <p className="muted">
            <strong>{bot.bot_class}</strong> • 💚 HP {bot.health} • ⚔️ DMG {bot.damage} • 🛡️ ARM {bot.armor}
          </p>
          <p className="catch">"{bot.catchphrase}"</p>
          <div className="specs-actions">
            <button className="btn" onClick={()=> onEnlist(bot)}>
              ⚔️ Enlist to Army
            </button>
            <button className="btn ghost" onClick={onBack}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
