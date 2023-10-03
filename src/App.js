import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Boards from './Components/Boards';
import Cards from './Components/Cards';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'; 
import {app} from './config';
import {getDatabase, ref, set, get, onValue} from 'firebase/database';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const db = getDatabase(app);
  const [boardItem, setBoardItem] = useState();
  const [boardClone, setBoardClone] = useState();
  const [globalSearch, setGlobalSearch] = useState("");
  const [isSearch, setSearch] = useState(false);
 
  useEffect(() => {
    const cardData = ref(db, 'Boards/');
    onValue(cardData, async (snapshot) => {
    const data = await snapshot.val();
    setBoardItem(data);
    setBoardClone(data);

    });
  },[])
  const searchFunc = (searchData, search)=> {
    setBoardItem(searchData)
   setGlobalSearch(search); 
   setSearch(true);
}

  const appAlert = (msg) => {
    if (msg =="Task added!")
     toast.success(msg, {position: toast.POSITION.TOP_CENTER, theme: 'dark',  autoClose: 1000})
    else if (msg == "Task updated")
      toast.info(msg, {position: toast.POSITION.TOP_CENTER, theme: 'dark',  autoClose: 1000})
    else
    toast.error(msg, {position: toast.POSITION.TOP_CENTER, theme: 'dark', autoClose: 1000})
  }

 
  return (
    <>
     <div className="app">
      <ToastContainer />
        <Navbar data = {boardClone} searchFunc = {searchFunc}/>
          <div className="app_outer">   
              { boardItem == undefined ? 
                //if no cards in boards  
                <div className='app_boards'>                                  
                  <Boards appAlert= {appAlert} title = "To Do &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
                  <Boards appAlert= {appAlert} title = "In Progress "/>
                  <Boards appAlert= {appAlert} title = "Completed"/>
                </div>
                : globalSearch.length == 1 ?
                <div className="app_boards">
                  <Boards appAlert= {appAlert} boardData = {boardClone["To Do"]} title = " To Do &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
                  <Boards appAlert= {appAlert} boardData = {boardClone["In Progress"]} title = "In Progress"/>
                  <Boards appAlert= {appAlert} boardData ={boardClone["Completed"]} title = "Completed" />                 
                </div>
                :
                // if there are cards 
                <div className="app_boards">            
                  <Boards appAlert= {appAlert} boardData = {boardItem["To Do"]} title = " To Do &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
                  <Boards appAlert= {appAlert} boardData = {boardItem["In Progress"]} title = "In Progress"/>
                  <Boards appAlert= {appAlert} boardData ={boardItem["Completed"]} title = "Completed" />
                </div> 
              } 
          </div>
      </div>
    </>
  );
}

export default App;
