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
  const isIOS = () => {
    const uaCheck = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const touchCheck = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
    const sizeCheck = window.innerWidth <= 1024
    return uaCheck || (touchCheck && sizeCheck)
  }

  useEffect(() => {
    if (isIOS()) {
      let index = 0
      const container1 = line01Ref.current
      const container2 = line02Ref.current

      const typeNext = () => {
        const word1 = text01[index] + ' ' + '하는'
        const word2 = text02[index]

        container1.innerHTML = ""
        container2.innerHTML = ""

        word1.split("").forEach((ch) => {
          const span = document.createElement("span")
          span.textContent = ch
          span.style.opacity = 0
          span.style.display = "inline-block"
          container1.appendChild(span)
        });

        const span = document.createElement("span")
        span.textContent = word2
        span.style.opacity = 0
        span.style.display = "inline-block"
        container2.appendChild(span)

        const spans1 = container1.querySelectorAll("span")
        const spans2 = container2.querySelector("span")

        gsap.to(spans1, {
          opacity: 1,
          stagger: 0.1,
          duration: 0.3,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(spans1, {
              opacity: 0,
              stagger: 0.05,
              duration: 0.2,
              delay: 0.8,
              onComplete: () => {
                index = (index + 1) % text01.length
                typeNext()
              },
            });
          },
        })
        gsap.to(spans2, {
          opacity: 1,
          stagger: 0.1,
          duration: 0.3,
          ease: "power1.out",
        })
      }
      typeNext()
    } 
    else {
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
    }
  }, [])

  gsap.registerPlugin(ScrollTrigger)
  
  useGSAP( () => {

    ScrollTrigger.config({
      ignoreMobileResize: true,
    })

    gsap.set([line01Ref.current, line02Ref.current], { '--wipe': '100%' })
    gsap.set(line01Ref.current, { '--w': '4px' })

    gsap.to(line01Ref.current, {
      // backgroundSize: '0% 100%',
      '--wipe': '0%',
      '--w' : '0',
      ease: 'none',
      scrollTrigger: {
        trigger: '.main-wrap',
        start: 'top 100px', 
        end: 'bottom 70%',
        scrub: true,
        pin: '.page01',
        pinSpacing: true,
      },
    })
    gsap.to(line02Ref.current, {
      // backgroundSize: '0% 100%',
      '--wipe': '0%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.main-wrap',
        start: 'bottom 70%', 
        end: 'bottom 20%',
        scrub: true,
        pin: '.page01',
        pinSpacing: true,
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