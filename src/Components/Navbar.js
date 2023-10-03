import React, { useState } from 'react';
import './Navbar.css';
import { Search} from 'react-feather';

function Navbar(props) {
  const [search, setSearch] = useState("");
  const [searchShow, setSearchShow] = useState(false); 
  const handleSearchChange = (event) => {
    let toDo, progress, completed;
    setSearch(event.target.value.trim());
    if (props.data["To Do"] != undefined){
      toDo = Object.values(props.data["To Do"]).filter(x => {return search.toLowerCase()==='' ? props.data["To Do"] : x.title.toLowerCase().includes(search)})
    }
    if (props.data["In Progress"] != undefined){
      progress = Object.values(props.data["In Progress"]).filter(x => {return search.toLowerCase()==='' ? props.data["In Progress"] : x.title.toLowerCase().includes(search)})
    }

    if(props.data["Completed"] != undefined){
      completed = Object.values(props.data["Completed"]).filter(x => {return search.toLowerCase()==='' ? props.data["Completed"] : x.title.toLowerCase().includes(search)})
    }

    const finalData = {'To Do':toDo, 
      'In Progress': progress,
      'Completed': completed
   }
   props.searchFunc(finalData, search)
  }
  return (
    
    <div className="app_navbar">
      <nav className="navbar">
          <span className="navbar-brand"><h2>Kanban Board</h2></span>
            <div className="search-box">
              <input  className= "search-txt" type="text" placeholder="Search" onChange={handleSearchChange} disabled={props.data == null} />
                <Search className='search-btn'/>
             </div>
      </nav>
    </div>
    
  )
}

export default Navbar