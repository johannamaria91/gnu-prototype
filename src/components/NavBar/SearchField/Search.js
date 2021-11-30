import './search.css'




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