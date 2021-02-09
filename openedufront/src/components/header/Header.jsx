import './header.css'
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../actions/auth";

function Header() {
  const dispatch = useDispatch()

  const handleLogout = () => {
	dispatch(logout())
  }

  return (
	  <>
		<nav className="main-header">
		  <div className="logo"><NavLink to={"/"}>OpenEdu</NavLink></div>
		  <ul className="nav-links-list">
			<li className="nav-link"><NavLink to={'/subject'}>Предмети</NavLink></li>
			<li className="nav-link"><NavLink to={'/schedule'}>Розклад</NavLink></li>
			<li className="nav-link"><NavLink to={'/'}>Новини</NavLink></li>
		  </ul>
		  <div className="wrapper-buttons">
			<div className="btn btn-who-logged"><NavLink to={'/profile'}>Student</NavLink></div>
			<div className="btn btn-logged-out"><NavLink to={'/login'} onClick={handleLogout}>logout</NavLink></div>
		  </div>
		</nav>
	  </>
  );
}

export default Header;