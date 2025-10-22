import React, { useEffect, useState } from 'react'
import BotCollection from './components/BotCollection.jsx'
import YourBotArmy from './components/YourBotArmy.jsx'
import BotSpecs from './components/BotSpecs.jsx'

// Read API base from Vite env variable VITE_API (e.g. http://localhost:3001)
// Fallback to localhost:3001 which is our json-server
const API_BASE = import.meta.env.VITE_API || 'http://localhost:3001'
const API = `${API_BASE.replace(/\/$/, '')}/bots`

export default function App(){
  const [bots, setBots] = useState([])
  const [army, setArmy] = useState([])
  const [view, setView] = useState('collection') // 'collection' or 'specs'
  const [selectedBot, setSelectedBot] = useState(null)
  const [sortKey, setSortKey] = useState(null)
  const [activeFilters, setActiveFilters] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const classes = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"]

  useEffect(()=>{
    console.log('Fetching bots from:', API)
    setLoading(true)
    fetch(API)
      .then(r => {
        console.log('Response status:', r.status)
        if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`)
        return r.json()
      })
      .then(data => {
        console.log('Bots fetched:', data.length)
        setBots(data)
        setLoading(false)
      })
      .catch(e => {
        console.error('Fetch bots failed:', e)
        setError(e.message)
        setLoading(false)
      })
  },[])

  function showBotSpecs(bot){
    setSelectedBot(bot)
    setView('specs')
  }

  function backToCollection(){
    setSelectedBot(null)
    setView('collection')
  }

  function enlistBot(bot){
    // Check if already in army
    if(army.find(b=>b.id === bot.id)) return
    // Check if one per class
    if(army.find(b=>b.bot_class === bot.bot_class)) return
    // Remove from collection
    setBots(prev => prev.filter(b => b.id !== bot.id))
    setArmy(prev => [...prev, bot])
    backToCollection()
  }

  function releaseBot(bot){
    setArmy(prev => prev.filter(b => b.id !== bot.id))
    // Add back to collection
    setBots(prev => [...prev, bot])
  }

  async function dischargeBot(bot){
    const res = await fetch(`${API}/${bot.id}`, { method: 'DELETE' })
    if(res.ok){
      setBots(prev => prev.filter(b => b.id !== bot.id))
      setArmy(prev => prev.filter(b => b.id !== bot.id))
    } else {
      console.error('Failed to delete bot')
    }
  }

  function handleSortChange(key){
    setSortKey(key)
  }

  function toggleFilter(cls){
    setActiveFilters(prev => {
      const newSet = new Set(prev)
      if(newSet.has(cls)){
        newSet.delete(cls)
      } else {
        newSet.add(cls)
      }
      return newSet
    })
  }

  // Sort and filter bots
  let displayedBots = [...bots]
  if(activeFilters.size > 0){
    displayedBots = displayedBots.filter(b => activeFilters.has(b.bot_class))
  }
  if(sortKey){
    displayedBots.sort((a,b) => b[sortKey] - a[sortKey])
  }

  if (loading) {
    return (
      <div className="app">
        <header>
          <h1>🤖 Bot Battlr</h1>
          <p className="subtitle">Build your ultimate robot army and dominate the battlefield!</p>
        </header>
        <div style={{
          textAlign: 'center',
          padding: '100px 20px',
          color: 'var(--text)',
          fontSize: '1.5rem'
        }}>
          <div style={{fontSize: '4rem', marginBottom: '20px'}}>⚙️</div>
          <p>Loading bots...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <header>
          <h1>🤖 Bot Battlr</h1>
          <p className="subtitle">Build your ultimate robot army and dominate the battlefield!</p>
        </header>
        <div style={{
          textAlign: 'center',
          padding: '100px 20px',
          color: '#ef4444',
          fontSize: '1.2rem'
        }}>
          <div style={{fontSize: '4rem', marginBottom: '20px'}}>⚠️</div>
          <p>Error loading bots: {error}</p>
          <p style={{color: 'var(--text-muted)', marginTop: '20px'}}>
            Make sure the backend server is running (json-server). If your API is on a different port, set the Vite env variable <code>VITE_API</code> before running the dev server.
          </p>
          <button 
            className="btn" 
            style={{marginTop: '30px'}}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <header>
        <h1>🤖 Bot Battlr</h1>
        <p className="subtitle">Build your ultimate robot army and dominate the battlefield!</p>
      </header>

      <main>
        <YourBotArmy army={army} onRelease={releaseBot} onDischarge={dischargeBot} />
        {view === 'collection' ? (
          <BotCollection
            bots={displayedBots}
            onShowSpecs={showBotSpecs}
            sortKey={sortKey}
            onSortChange={handleSortChange}
            classes={classes}
            activeFilters={activeFilters}
            onToggleFilter={toggleFilter}
          />
        ) : (
          <BotSpecs
            bot={selectedBot}
            onBack={backToCollection}
            onEnlist={enlistBot}
          />
        )}
      </main>
    </div>
  )
}