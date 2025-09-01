import { useEffect, useRef, useState } from "react"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import '../css/main.css'

function Main() {
  const text01 = ['개발', '퍼블']
  const text02 = ['퍼블리셔', '개발자']
  const text03 = 'Scroll Down'
  const [text, setText] = useState('')
  const [index01, setIndex01] = useState(0)
  const [index02, setIndex02] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDelete, setIsDelete] = useState(false)
  const text01Ref = useRef(null)
  const text02Ref = useRef(null)

  useEffect( () => {
    const curTxt = text01[index01]
    let typingSpeed = 200

    if (isDelete) typingSpeed = 100
    if (!isDelete && charIndex === curTxt.length) typingSpeed = 1000
    if (isDelete && charIndex === 0) typingSpeed = 500 // 지우기 끝나면 대기

    const timer = setTimeout(() => {
      if (!isDelete) {
        // 타이핑 중
        setText(curTxt.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else {
        // 지우는 중
        setText(curTxt.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }

      // 문장 끝까지 타이핑했으면 지우기 모드로 변경
      if (!isDelete && charIndex === curTxt.length) {
        setIsDelete(true)
      }
      // 다 지웠으면 다음 문장으로 이동
      else if (isDelete && charIndex === 0) {
        setIsDelete(false)
        setIndex01((index01 + 1) % text01.length)
      }

      // text02 같이 맞춰서 변경
      if (index01 == 0 && charIndex == 0) {
        setIndex02(0)
      }
      else if (index01 == 1 && charIndex == 0) {
        setIndex02(1)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)

  }, [charIndex, isDelete, index01])

  gsap.registerPlugin(ScrollTrigger)
  
  useGSAP( () => {

    gsap.fromTo(text01Ref.current, {
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
    gsap.fromTo(text02Ref.current, {
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
        <h1 ref={text01Ref}><span>{text}</span>하는</h1>
        <h1 ref={text02Ref}><span>{text02[index02]}</span></h1>
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