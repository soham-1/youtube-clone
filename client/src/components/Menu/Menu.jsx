import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Menu.css';

function Menu() {
  const username = useSelector(state => state.user.userInfo.username);

  return (
    <div className='menu col-lg-2 d-flex-column p-2'>
      <div className="menu-link p-3" >
        <Link to="/" className="d-flex align-items-center h-100" style={{ textDecoration: 'none' }} >
          <div className="d-flex align-items-center"></div>
          <div className="d-flex fs-5 text-white align-items-center p-2">Home</div>
        </Link>
      </div>

      <div className="menu-link p-3" >
        <Link to="/explore" className="d-flex align-items-center h-100" style={{ textDecoration: 'none' }} >
          <div className="d-flex align-items-center"></div>
          <div className="d-flex fs-5 text-white align-items-center p-2">Explore</div>
        </Link>
      </div>

      <div className="menu-link p-3" >
        <Link to="/subscriptions" className="d-flex align-items-center h-100" style={{ textDecoration: 'none' }} >
          <div className="d-flex align-items-center"></div>
          <div className="d-flex fs-5 text-white align-items-center p-2">Subscriptions</div>
        </Link>
      </div>

      <div className="menu-link p-3" >
        <Link to="/signin" className="d-flex align-items-center h-100" style={{ textDecoration: 'none' }} >
          <div className="d-flex align-items-center"></div>
          <div className="d-flex fs-5 text-white align-items-center p-2">Sign In</div>
        </Link>
      </div>
      {
        username === "" ?
          <></> :
          <div className="menu-link p-3" >
            <Link to="/logout" className="d-flex align-items-center h-100" style={{ textDecoration: 'none' }} >
              <div className="d-flex align-items-center"></div>
              <div className="d-flex fs-5 text-white align-items-center p-2">Logout</div>
            </Link>
          </div>
      }
    </div>
  )
}

export default Menu;