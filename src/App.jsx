import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Terminal from './components/Terminal'
import Stats from './components/Stats'
import Features from './components/Features'
import Compression from './components/Compression'
import PersistentCache from './components/PersistentCache'
import Architecture from './components/Architecture'
import GetStarted from './components/GetStarted'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'
import CodePage from './components/CodePage'
import TeamCodePage from './components/TeamCodePage'

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-[1080px] mx-auto px-6 md:px-10">
        <Hero />
        <div className="glow-line my-10 sm:my-16 md:my-20" />
        <Terminal />
        <div className="glow-line my-10 sm:my-16 md:my-20" />
        <Stats />
        <div className="glow-line my-10 sm:my-16 md:my-20" />
        <Features />
        <div className="glow-line my-10 sm:my-16 md:my-20" />
        <Compression />
        <div className="glow-line my-10 sm:my-16 md:my-20" />
        <PersistentCache />
        <div className="glow-line my-10 sm:my-16 md:my-20" />
        <Architecture />
        <div className="glow-line my-10 sm:my-16 md:my-20" />
        <GetStarted />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    function onHashChange() { setHash(window.location.hash) }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  if (hash === '#code') return <CodePage />
  if (hash === '#teamcode') return <TeamCodePage />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/code" element={<CodePage />} />
        <Route path="/teamcode" element={<TeamCodePage />} />
        <Route path="/blog/161b-one-mac" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
