import React from 'react'
import BotCard from './Botcard'

export default function YourBotArmy({ army, onRelease, onDischarge }){
  return (
    <aside className="your-army">
      <h2>⚔️ Your Bot Army</h2>
      {army.length > 0 && (
        <p className="muted small" style={{marginBottom: '15px', textAlign: 'center'}}>
          {army.length} bot{army.length !== 1 ? 's' : ''} enlisted • Click to release
        </p>
      )}
      <div className="grid">
        {army.map(bot => (
          <BotCard
            key={bot.id}
            bot={bot}
            onClick={() => onRelease(bot)}
            onDischarge={() => onDischarge(bot)}
          />
        ))}
      </div>
    </aside>
  )
}
