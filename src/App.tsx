import { useState } from 'react'
import PWABadge from './PWABadge.tsx'
import { GradientBackground, ScreenNavbar, type TabName } from './design-system/components'
import { ExplorePage } from './pages/ExplorePage'
import './App.css'

function App() {
  const [tab, setTab] = useState<TabName>('Explore')

  return (
    <GradientBackground className="app-screen">
      <main className="app-content">
        {tab === 'Explore' ? (
          <ExplorePage />
        ) : (
          <section className="app-placeholder">
            <h1>{tab}</h1>
            <p>This screen is coming soon.</p>
          </section>
        )}
      </main>
      <div className="app-tabbar">
        <ScreenNavbar active={tab} onSelect={setTab} />
      </div>
      <PWABadge />
    </GradientBackground>
  )
}

export default App
