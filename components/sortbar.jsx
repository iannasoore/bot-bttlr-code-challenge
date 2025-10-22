
import React from 'react'

export default function SortBar({ sortKey, onSortChange, classes, activeFilters, onToggleFilter }){
  return (
    <div className="sortbar">
      <div className="sort-controls">
        <label>⚡ Sort by:</label>
        <select value={sortKey || ''} onChange={e=> onSortChange(e.target.value || null)}>
          <option value="">-- None --</option>
          <option value="health">💚 Health</option>
          <option value="damage">⚔️ Damage</option>
          <option value="armor">🛡️ Armor</option>
        </select>
      </div>

      <div className="filters">
        <label>🎯 Filter:</label>
        {classes.map(c=> (
          <button
            key={c}
            className={`chip ${activeFilters.has(c) ? 'active' : ''}`}
            onClick={()=> onToggleFilter(c)}
          >{c}</button>
        ))}
      </div>
    </div>
  )
}
