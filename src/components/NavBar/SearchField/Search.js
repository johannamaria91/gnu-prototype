import { mapToStyles } from '@popperjs/core/lib/modifiers/computeStyles'
import { useState, useEffect } from 'react'
import '../navbar.css'
// import SearchBar from './SearchField/SearchBar'
// import CreateNewTopicPage from '../Homepage/CreateTopicpage'
import { Link } from 'react-router-dom';


const Search = (props) => {

    function setSearch(e) {
        props.search(e)
    }

    return (
        <div className="search">
            
            <div className="search">
                <input type="text" placeholder="Search..." onChange={(e) => { 
                    setSearch(e.target.value)}} />
            </div>
            
            <div className="avatar">
                user avatar
            </div>
        </div>
    )
}

export default Search