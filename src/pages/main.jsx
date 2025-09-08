import { useEffect, useRef } from "react"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import '../css/main.css'

function Main() {
  const text01 = ['개발', '퍼블']
  const text02 = ['퍼블리셔', '개발자']
  const text03 = 'Scroll Down'
  const index01Ref = useRef(0)
  const charIndexRef = useRef(0)
  const isDeleteRef = useRef(false)
  const text01Ref = useRef(null)
  const text02Ref = useRef(null)
  const line01Ref = useRef(null)
  const line02Ref = useRef(null)

  useEffect(() => {
    const type = () => {
      const curTxt = text01[index01Ref.current]
      const el = text01Ref.current
      text02Ref.current.textContent = index01Ref.current === 0 ? text02[0] : text02[1]

      if (!isDeleteRef.current) {
        el.textContent = curTxt.substring(0, charIndexRef.current + 1)
        charIndexRef.current += 1
      } else {
        el.textContent = curTxt.substring(0, charIndexRef.current - 1)
        charIndexRef.current -= 1
      }

      // 문장 끝
      if (!isDeleteRef.current && charIndexRef.current === curTxt.length) {
        isDeleteRef.current = true
        setTimeout(type, 1000)
        return
      }
      // 다 지운 후
      if (isDeleteRef.current && charIndexRef.current === 0) {
        isDeleteRef.current = false
        index01Ref.current = (index01Ref.current + 1) % text01.length
        setTimeout(type, 500)
        return
      }

      setTimeout(type, isDeleteRef.current ? 100 : 200)
    }
    type()
  }, [])

  gsap.registerPlugin(ScrollTrigger)
  
  useGSAP( () => {

    ScrollTrigger.config({
      ignoreMobileResize: true,
    })

    gsap.fromTo(line01Ref.current, {
      backgroundSize: '100% 100%',
      '--w' : '4px',
    },
    {
      backgroundSize: '0% 100%',
      '--w' : '0',
      scrollTrigger: {
        trigger: '.main-wrap',
        start: 'top 100px', 
        end: 'bottom 70%',
        scrub: true,
        pin: '.page01',
        pinSpacing: true,
        // markers: {
        //   startColor: 'red',
        //   endColor: 'blue'
        // }
      },
    })
    gsap.fromTo(line02Ref.current, {
      backgroundSize: '100% 100%',
    },
    {
      backgroundSize: '0% 100%',
      scrollTrigger: {
        trigger: '.main-wrap',
        start: 'bottom 70%', 
        end: 'bottom 20%',
        scrub: true,
        pin: '.page01',
        pinSpacing: true,
        // markers: {
        //   startColor: 'red',
        //   endColor: 'blue'
        // }
      },
    })
    gsap.fromTo('.scroll-box', {
      opacity: '1',
    },
    {
      opacity: '0',
      scrollTrigger: {
        trigger: '.main-wrap',
        start: 'bottom 20%', 
        end: 'bottom top',
        scrub: true,
        pin: '.page01',
        pinSpacing: true,
        // markers: {
        //   startColor: 'red',
        //   endColor: 'blue'
        // }
      },
    })
  })

  return <>
    <div className="main-wrap">
      <div className="main-box txt-title">
        <h1 ref={line01Ref}><span ref={text01Ref}></span>하는</h1>
        <h1 ref={line02Ref}><span ref={text02Ref}></span></h1>
      </div>
      <div className="scroll-box txt-en">
        {text03.split('').map((char, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  </>
}

export default Main