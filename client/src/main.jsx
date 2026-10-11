import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const apiUrl = import.meta.env.VITE_API_URL || '/api'

const events = [
  {
    date: 'SEP 28, 5-8 PM',
    type: '32-D8 (Linguistics lounge)',
    title: 'UnLiMITed Kickoff',
    detail: 'Meet fellow linguistics students at our first ever event! There will be boba and stuffed-crust pizza.',
    color: 'yellow',
  },
  {
    date: 'OCT 17',
    type: '32-D8 (Linguistics lounge)',
    title: 'NACLO night',
    detail: "We'll have puzzles and questions from the North American Computational Linguistics Olympiad to solve together for fun.",
    color: 'coral',
  },
  {
    date: 'NOV 07',
    type: '32-D8 (Linguistics lounge)',
    title: '15 minutes of your language',
    detail: 'Share about a favorite language that you know or study, and/or come to get a quick look into the other languages of the MIT linguistics community!',
    color: 'blue',
  },
]

function App() {
  const [health, setHealth] = useState({ state: 'checking', database: 'checking' })
  const page = window.location.pathname === '/events' ? 'events' : 'home'

  useEffect(() => {
    fetch(`${apiUrl}/health`)
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        return response.json()
      })
      .then((data) => setHealth({ state: data.ok ? 'online' : 'offline', database: data.database }))
      .catch(() => setHealth({ state: 'offline', database: 'unavailable' }))
  }, [])

  return (
    <main className="page-shell">
      <Topbar page={page} />
      {page === 'events' ? <EventsPage /> : <HomePage />}
      <SiteFooter health={health} />
    </main>
  )
}

function Topbar({ page }) {
  return (
    <nav className="topbar">
      <a className="brand" href="/" aria-label="UnLiMITed home">
        <img className="brand-mark" src="/component-1.png" alt="" />
        <span>UnLiMITed<span className="brand-dot">.</span></span>
      </a>
      <div className="nav-links">
        <a aria-current={page === 'events' ? 'page' : undefined} href="/events">Events</a>
        <a className="nav-join" href={page === 'home' ? '#board' : '/#board'}>Executive board <span aria-hidden="true">-&gt;</span></a>
      </div>
    </nav>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="home-trace-art" aria-hidden="true">
          <img src="/stata-trace-drawing.png" alt="" />
        </div>
        <div className="hero-copy">
          <h1><span className="title-line">Undergraduate</span><span className="title-line"><em>linguistics</em> at MIT</span></h1>
          <p className="lede">UnLiMITed is the center for undergraduate linguistics at MIT. We hope to give
            a home and community to the linguistics majors, minors, and concentrators here, while welcoming
            any student with an interest in linguistics! We're dedicated to fostering engagement and interest
            in linguistics among the undergraduate community at MIT!</p>
          <div className="hero-actions">
            <a className="primary-button" href="/events">See our events! <span aria-hidden="true">-&gt;</span></a>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>    <span>✦</span> phonetics <span>✦</span> syntax <span>✦</span> phonology <span>✦</span> semantics <span>✦</span> morphology <span>✦</span> pragmatics <span>✦</span> language <span>✦</span> theoretical <span>✦</span> computational <span>✦</span> cognitive <span>✦</span></div>
      </div>

      <section className="board-section" id="board">
        <div>
          <p className="eyebrow">The Team</p>
          {/*<h2>The team of <em>UnLiMITed.</em></h2>*/}
          <h2><em>Executive board</em></h2>
          <p className="board-intro">More officer details are coming soon. For now, this section is ready for two board member profiles.</p>
        </div>
        <div className="board-grid">
          <BoardMember name="Board member" role="Co-President" detail="Name and photo coming soon." />
          <BoardMember name="Board member" role="Co-President" detail="Name and photo coming soon." />
        </div>
      </section>
    </>
  )
}

function EventsPage() {
  return (
    <section className="events-section events-page" id="events">
      <div className="section-heading">
        <div>
          <p className="eyebrow">On the calendar</p>
          <h2>Event calendar</h2>
        </div>
        <a className="text-link" href="/#board">Meet the board <span aria-hidden="true">-&gt;</span></a>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <EventItem key={event.title} {...event} />
        ))}
      </div>
    </section>
  )
}

function SiteFooter({ health }) {
  return (
    <footer className="footer">
      <span>UnLiMITed | Undergraduate Linguistics at MIT</span>
      <span className="footer-health"><span className={`health-dot ${health.state === 'offline' ? 'is-offline' : ''}`} /> chapter status: {health.state === 'online' ? 'online' : 'gathering'}</span>
    </footer>
  )
}

function BoardMember({ name, role, detail }) {
  return (
    <article className="board-card">
      <div className="board-photo" aria-hidden="true">U</div>
      <p className="event-type">{role}</p>
      <h3>{name}</h3>
      <p>{detail}</p>
    </article>
  )
}

function EventItem({ date, type, title, detail, color }) {
  return (
    <article className={`event-item event-${color}`}>
      <div className="event-date">{date}</div>
      <div>
        <p className="event-type">{type}</p>
        <h3>{title}</h3>
        <p className="event-detail">{detail}</p>
      </div>
      <span className="event-arrow" aria-hidden="true">↗</span>
    </article>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
