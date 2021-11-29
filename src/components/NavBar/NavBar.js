import './navbar.css'
import Search from './SearchField/Search'
import { Link } from 'react-router-dom'

const NavBar = (props) => {

    return(
        <div className="navbar">
            
            
            <nav>
                <Link to="/"><li>Home</li></Link>
                <Link to="/"><li>Friends</li></Link>
                <Link to="/"><li>About</li></Link>
            </nav>
            <Search search={props.search}/>
        </div>
     )
}

export default NavBar;