import React, { useState } from 'react';
import './Navbar.css';
import { Search} from 'react-feather';

function Navbar(props) {
  const [search, setSearch] = useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value.trim());
    props.searchFunc(search)
  }
  return (
    <div className="app_navbar">
      <nav className="navbar">
          <span className="navbar-brand"><h2>Kanban Board</h2></span>
            <div className="search-box">
              <input  className= "search-txt" type="text" placeholder="Search by title" onChange={handleSearchChange}  />
                <Search className='search-btn'/>
             </div>
      </nav>
    </div>
    
  )
}

export default Navbar