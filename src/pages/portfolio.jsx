import data from "../data.js"
import '../css/portfolio.css'
import { useMemo, useRef, useState } from "react"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose, faLink } from "@fortawesome/free-solid-svg-icons"
import { faCss3Alt, faHtml5, faReact, faSquareJs, faVuejs } from "@fortawesome/free-brands-svg-icons"
import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard, Pagination, Mousewheel, Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';

function ThumbList({data, index, style, scale, setSelectIdx, setClicked, modalRef}) {

  function fnOpenModal() {
    setClicked(true)
    setSelectIdx(index)
    setTimeout(() => {
      modalRef.current.classList.add('on')
    }, 300);
    document.documentElement.style.overflow = 'hidden'
  }
  return <>
    <li 
      style={{
        top: style.y,
        left: style.x,
        transform: `scale(${scale.scale})`
      }}
      onClick={fnOpenModal}
    >
      <div className="thumbnail">
        <img src={data.thumb} alt={data.title}></img>
      </div>
      <div className="layer">
        <h4 style={{
          transform: `scale(calc(1 / ${(scale.scale)}))`
        }}>{data.title}</h4>
      </div>
    </li>
  </>
}

function Portfolio() {
  const [selectIdx, setSelectIdx] = useState(null)
  const [clicked, setClicked] = useState(false)
  const modalRef = useRef(null)
  const dataArr = data
  const position = [
    {
      x: '0',
      y: '0'
    },
    {
      x: '21%',
      y: '225px'
    },
    {
      x: '48%',
      y: '100px'
    },
    {
      x: '80%',
      y: '20px'
    },
    {
      x: '5%',
      y: '320px'
    },
    {
      x: '34%',
      y: '450px'
    },
    {
      x: '60%',
      y: '380px'
    },
    {
      x: '82%',
      y: '500px'
    },
    {
      x: '-2%',
      y: '630px'
    },
    {
      x: '20%',
      y: '750px'
    },
    {
      x: '51%',
      y: '700px'
    },
    {
      x: '76%',
      y: '800px'
    },
    {
      x: '5%',
      y: '940px'
    },
    {
      x: '20%',
      y: '1150px'
    },
    {
      x: '37%',
      y: '1050px'
    },
    {
      x: '66%',
      y: '990px'
    },
  ]
  const randomScale = useMemo(() => {
    return dataArr.map(() => ({
      scale: 0.9 + Math.random() * 0.3
    }))
  }, [])
  const shuffledIndexes = useMemo(() => {
    const idxArr = position.map((_, i) => i)
    for (let i = idxArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxArr[i], idxArr[j]] = [idxArr[j], idxArr[i]]
    }
    return idxArr
  }, [])
  const thumbLi = dataArr.map((item, idx) => {
    const pos = position[shuffledIndexes[idx % position.length]]
    return <ThumbList 
            key={idx} 
            data={item}
            index={idx} 
            style={pos} 
            scale={randomScale[idx]} 
            setSelectIdx={setSelectIdx}
            setClicked={setClicked}
            modalRef={modalRef}
          ></ThumbList>
  })
  const swiperLi = dataArr[selectIdx]?.images.map((item, idx) => {
    return <SwiperSlide key={idx}><img src={item} alt={dataArr[selectIdx].title}></img></SwiperSlide>
  })

  useGSAP( () => {
    for (let i = 1; i < (data.length + 1) ; i++) {
      gsap.fromTo('.port-ul > li:nth-of-type('+ i +')', {
        opacity: 0,
        visibility: 'hidden',
        y: -500
      },
      {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        scrollTrigger: {
          trigger: '.port-ul > li:nth-of-type('+ i +')',
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      })
    }
  })

  function fnCloseModal() {
    modalRef.current.classList.remove('on')
    setTimeout(() => {
      setClicked(false)
    }, 300);
    document.documentElement.style.overflow = ''
  }
  return <>
    <div className="port-wrap">
      <div className="port-box">
        <ul className="port-ul">
          {thumbLi}
        </ul>
        {
          (clicked && (selectIdx >= 0)) &&
          <div className="port-modal">
            <div className="modal-box" ref={modalRef}>
              <div className="title-box">
                <h4>{data[selectIdx].title}</h4>
                { 
                  data[selectIdx].link && (
                    data[selectIdx].link?.split(':')[0] == 'http' || data[selectIdx].link?.split(':')[0] == 'https'
                    ? <a href={data[selectIdx].link} title="운영 사이트 바로가기" target="_blank"><FontAwesomeIcon icon={faLink}/></a>
                    : <span>{data[selectIdx].link}</span>
                  )
                }
              </div>
              <div className="content-box">
                <div className="img-box">
                  <Swiper
                    wrapperClass="port-swiper"
                    slidesPerView={"auto"}
                    spaceBetween={20}
                    navigation={true}
                    keyboard={{
                      enabled: true
                    }}
                    mousewheel={true}
                    modules={[Pagination, Navigation, Keyboard, Mousewheel]}
                  >
                    <SwiperSlide>
                      <img src={data[selectIdx].thumb} alt={data[selectIdx].title}></img>
                    </SwiperSlide>
                    {swiperLi}
                  </Swiper>
                </div>
                <div className="txt-box">
                  <div className="left-box">
                    <p className="desc">
                      {data[selectIdx].desc}
                    </p>
                  </div>
                  <div className="right-box">
                    <div className="work">
                      <h5>기여도</h5>
                      <p>
                        {
                          data[selectIdx].work?.map((item, idx) => {
                            return <span key={idx} className="txt-underline">{item}<span className="line" style={{animation: 'underlineAni .5s 1s both alternate'}}></span></span>
                          })
                        }
                      </p>
                    </div>
                    <div className="skills">
                      <h5>기술 스택</h5>
                      <p>
                        {
                          data[selectIdx].skill?.map((item, idx) => {
                            if (item == 'html') return <span key={idx} data-title="html"><FontAwesomeIcon icon={faHtml5}/></span>
                            else if (item == 'css') return <span key={idx} data-title="css"><FontAwesomeIcon icon={faCss3Alt}/></span>
                            else if (item == 'js') return <span key={idx} data-title="javascript"><FontAwesomeIcon icon={faSquareJs}/></span>
                            else if (item == 'jquery') return <span key={idx} data-title="jquery"><img src='/src/assets/ico-jquery.svg' alt='jquery'></img></span>
                            else if (item == 'react') return <span key={idx} data-title="react.js"><FontAwesomeIcon icon={faReact}/></span>
                            else if (item == 'vue') return <span key={idx} data-title="vue.js"><FontAwesomeIcon icon={faVuejs}/></span>
                            else if (item == 'django') return <span key={idx} data-title="django"><img src='/src/assets/ico-django.svg' alt='django'></img></span>
                          })
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button type="button" className="btn-close-modal" onClick={fnCloseModal}>
                <FontAwesomeIcon icon={faClose}/>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  </>
}

export default Portfolio