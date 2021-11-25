import './navbar.css'
import Search from './SearchField/Search'

const NavBar = (props) => {

    return(
        <div className="navbar">
            <ul>
                <li>Home</li>
                <li>Friends</li>
                <li>About</li>
            </ul>
            <Search search={props.search}/>
        </div>
     )
}

export default NavBar