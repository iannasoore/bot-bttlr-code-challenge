import React from "react";
import BotCard from "./BotCard.jsx";
import SortBar from "./SortBar.jsx";

export default function BotCollection({ bots, onShowSpecs, sortKey, onSortChange, classes, activeFilters, onToggleFilter }){
  return (
    <section className="bot-collection">
      <h2>🤖 Available Bots ({bots.length})</h2>
      <SortBar
        sortKey={sortKey}
        onSortChange={onSortChange}
        classes={classes}
        activeFilters={activeFilters}
        onToggleFilter={onToggleFilter}
      />
      {bots.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--text-muted)',
          fontSize: '1.2rem'
        }}>
          <div style={{fontSize: '4rem', marginBottom: '20px'}}>🤷‍♂️</div>
          <p>No bots available. Try adjusting your filters!</p>
        </div>
      ) : (
        <div className="grid">
          {bots.map(bot => (
            <BotCard
              key={bot.id}
              bot={bot}
              onClick={() => onShowSpecs(bot)}
            />
          ))}
        </div>
      )}
    </section>
  )
}