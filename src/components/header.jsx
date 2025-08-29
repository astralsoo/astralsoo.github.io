function Header({onMainClick, onAboutClick, onPortClick, onContactClick}) {
  return <>
  <header>
    <div className="header-wrap">
      <div className="header-box">
        <ul className="gnb txt-en">
          <li onClick={onMainClick}>Main</li>
          <li onClick={onAboutClick}>About</li>
          <li onClick={onPortClick}>Portfolio</li>
          <li onClick={onContactClick}>Contact</li>
        </ul>
      </div>
    </div>
  </header>
  </>
}

export default Header