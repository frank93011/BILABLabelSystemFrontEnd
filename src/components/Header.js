import './_global.css';
import './Header.css';
import lab_labeler_logo from '../assets/label_lab_logo.png';
import EntryMenu from '../components/EntryMenu';

function Header() {
  return (
    <div id="Header" className="justify-around">
      <div className="justify-start header-logo-container">
        <img className="header-logo" src={lab_labeler_logo} alt="" />
        <EntryMenu />
      </div>
      <div className="justify-end header-router-container">
        <div className="header-router-button">標記</div>
        <div className="header-router-button">驗證</div>
        <div className="header-router-button w-120"><span className="f-25 mb-5">Hi,</span> 詩筠</div>
      </div>
    </div>
  )
}

export default Header;