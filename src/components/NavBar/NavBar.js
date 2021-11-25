import './navbar.css'
import { Link } from 'react-router-dom'

const NavBar = () => {

    return(
        <div className="navbar">
            <nav>
                <Link to="/"><li>Home</li></Link>
                <Link to="/"><li>Friends</li></Link>
                <Link to="/"><li>About</li></Link>
            </nav>
        </div>
     )
}

export default NavBar