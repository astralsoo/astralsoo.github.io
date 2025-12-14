import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3Alt, faGitAlt, faGithub, faHtml5, faNodeJs, faReact, faSquareFigma, faSquareJs, faVuejs } from '@fortawesome/free-brands-svg-icons'
import '../css/about.css'
import { useRef } from 'react'

function SkillList({icon, txt, classNm}) {
  return <>
    <li className={classNm ? classNm : ''}>
      <span className='ico'>{icon}</span>
      <span className='txt-en'>{txt}</span>
    </li>
  </>
}

function About() {
  const aboutRef = useRef(null)
  const underlineRef01 = useRef(null)
  const underlineRef02 = useRef(null)
  const underlineRef03 = useRef(null)

  useGSAP( () => {
    gsap.fromTo(aboutRef.current, {
      opacity: '0',
      y: 50
    },
    {
      opacity: '1',
      y: 0,
      // duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: '.about-wrap',
        start: 'top 70%', 
        toggleActions: "play none none reverse", 
        scrub: true
      },
    })
    gsap.to(underlineRef01.current, {
      animation: 'underlineAni 1s both alternate',
      scrollTrigger: {
        trigger: '.career',
        start: 'top 60%', 
        toggleActions: "play none none none",
      },
    })
    gsap.to(underlineRef02.current, {
      animation: 'underlineAni 1s 1s both alternate',
      scrollTrigger: {
        trigger: '.career',
        start: 'top 60%', 
        toggleActions: "play none none none",
      },
    })
    gsap.to(underlineRef03.current, {
      animation: 'underlineAni 2s 1s both alternate',
      scrollTrigger: {
        trigger: '.career',
        start: 'top 60%', 
        toggleActions: "play none none none",
      },
    })
    for (let i = 1; i < 13 ; i++) {
      gsap.to('.skill ul > li:nth-of-type('+ i +')', {
        opacity: 1,
        scrollTrigger: {
          trigger: '.skill ul > li:nth-of-type('+ i +')',
          start: "top 80%",
          end: "bottom 90%",
          scrub: 2,
        }
      })
    }
  })

  return <>
    <div className='about-wrap'>
      <div className='about-box' ref={aboutRef}>
        <div className='img-box'>
          <img src='/images/me.jpg' alt='me'></img>
        </div>
        <div className='txt-box'>
          <h2>
            5년차 퍼블리셔 && <br/>주니어 프론트엔드 개발자 <br/>임수민입니다😗
          </h2>
          <div className='career'>
            <h3>Career</h3>
            <ul>
              <li>
                <p>2021. 02 - 2023. 06</p>
                <p className='txt-underline'>(주)앤드와이즈 <span>지니웍스 사업부 유지보수팀 주임연구원</span><span className='line' ref={underlineRef01}></span></p>
              </li>
              <li>
                <p>2023. 08 ~ 2025. 10</p>
                <p className='txt-underline'>(주)리테일앤인사이트 <span>IT부서 STP팀 대리</span><span className='line' ref={underlineRef02}></span></p>
              </li>
              <li>
                <p>2025. 11 ~</p>
                <p className='txt-underline'>(주)토마토시스템 <span>UI/UX사업부 주임</span><span className='line' ref={underlineRef03}></span></p>
              </li>
            </ul>
          </div>
          <div className='skill'>
            <h3>Skills and Tools</h3>
            <ul>
              <SkillList classNm="nice" icon={<FontAwesomeIcon icon={faHtml5} />} txt={'HTML'}></SkillList>
              <SkillList classNm="nice" icon={<FontAwesomeIcon icon={faCss3Alt} />} txt={'CSS'}></SkillList>
              <SkillList classNm="nice" icon={<FontAwesomeIcon icon={faSquareJs} />} txt={'Javascript'}></SkillList>
              <SkillList classNm="nice" icon={<img src='/images/ico-jquery.svg' alt='jquery'></img>} txt={'Jquery'}></SkillList>
              <SkillList classNm="good" icon={<FontAwesomeIcon icon={faReact} />} txt={'React'}></SkillList>
              <SkillList classNm="soso" icon={<FontAwesomeIcon icon={faVuejs} />} txt={'Vue'}></SkillList>
              <SkillList classNm="good" icon={<img src='/images/ico-django.svg' alt='django'></img>} txt={'Django'}></SkillList>
              <SkillList classNm="soso" icon={<FontAwesomeIcon icon={faNodeJs} />} txt={'NodeJs'}></SkillList>
              <SkillList classNm="soso" icon={<img src='/images/ico-gsap.svg' alt='gsap'></img>} txt={'GSAP'}></SkillList>
              <SkillList classNm="good" icon={<FontAwesomeIcon icon={faSquareFigma} />} txt={'Figma'}></SkillList>      
              <SkillList classNm="good" icon={<FontAwesomeIcon icon={faGitAlt} />} txt={'Git'}></SkillList>
              <SkillList classNm="good" icon={<FontAwesomeIcon icon={faGithub} />} txt={'Github'}></SkillList>
              {/* <SkillList classNm="soso" icon={<img src='/images/ico-photoshop.svg' alt='photoshop'></img>} txt={'Photoshop'}></SkillList> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default About