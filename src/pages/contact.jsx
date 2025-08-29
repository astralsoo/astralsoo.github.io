import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import '../css/contact.css'
import { useRef, useState } from 'react'

function Contact() {
  const contactRef = useRef(null)
  const underlineRef = useRef(null)
  const text = useState('')

  useGSAP( () => {
    gsap.fromTo(contactRef.current, {
      opacity: '0',
      y: 50
    },
    {
      opacity: '1',
      y: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.contact-wrap',
        start: 'top 40%', 
        toggleActions: "play none none reverse", 
      },
    })
    gsap.to(underlineRef.current, {
      animation: 'underlineAni 1s 1s both alternate',
      scrollTrigger: {
        trigger: '.contact-wrap',
        start: 'top 40%', 
        toggleActions: "play none none none",
      },
    })
  })

  return <>
    <div className="contact-wrap">
      <div className="contact-box" ref={contactRef}>
        <h2>궁금하신 점이나 업무 제안은 📬</h2>
        <a className="txt-en txt-underline" href="mailto:soomin-s@nate.com">soomin-s@nate.com<span className='line' ref={underlineRef}></span></a>
      </div>
    </div>
  </>
}

export default Contact