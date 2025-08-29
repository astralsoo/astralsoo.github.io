import Header from './components/header'
import Main from './pages/main'
import About from './pages/about'
import Portfolio from './pages/portfolio'
import Contact from './pages/contact'
import Footer from './components/footer'
import { useEffect, useRef } from 'react'

function App() {
  const mainRef = useRef(null)
  const aboutRef = useRef(null)
  const portRef = useRef(null)
  const contactRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect( () => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <Header
        onMainClick={() => window.scrollTo(0, 0)}
        onAboutClick={() => scrollToSection(aboutRef)}
        onPortClick={() => scrollToSection(portRef)}
        onContactClick={() => scrollToSection(contactRef)}
      ></Header>
      <main>
        <section className="page page01" ref={mainRef}>
          <Main />
        </section>
        <section className="page page02" ref={aboutRef}>
          <About />
        </section>
        <section className="page page03" ref={portRef}>
          <Portfolio />
        </section>
        <section className="page page04" ref={contactRef}>
          <Contact />
        </section>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
