import './_global.css';
import './Header.css';
import lab_labeler_logo from '../assets/label_lab_logo.png';
import EntryMenu from '../components/EntryMenu';
import {
  Link,
  useRouteMatch
} from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';

function Header() {
  let { url } = useRouteMatch();
  // dispatch redux logout action
  const dispatch = useDispatch();
  const logout = () => {
        console.log("clearLoginInfo")
        dispatch({
            type: 'LOGOUT'
        });
    };

  const profileObj = useSelector(state => state.profileObj);
  return (
    <div id="Header" className="justify-around">
      <div className="justify-start header-logo-container">
        <img className="header-logo" src={lab_labeler_logo} alt="" />
        <EntryMenu />
      </div>
      <div className="justify-end header-router-container">
        <Link to={`${url}/Label`}><div className="header-router-button">標記</div></Link>
        <Link to={`${url}/Validation`}><div className="header-router-button">驗證</div></Link>
        <div className="header-router-button w-120"><span className="f-25 mb-5">Hi,</span> {profileObj.givenName}</div>
        <img className="user-image" src={profileObj.imageUrl} alt="" onClick={logout}/>
      </div>
    </div>
  )
}

export default Header;