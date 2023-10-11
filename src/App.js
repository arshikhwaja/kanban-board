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
import { toHaveDescription } from '@testing-library/jest-dom/matchers';

function App() {
  const db = getDatabase(app);
  const [boardItem, setBoardItem] = useState();
  const [boardClone, setBoardClone] = useState();
  const [globalSearch, setGlobalSearch] = useState("");
  const [isSearch, setSearch] = useState(false);
  const [arrboardItem, setarrBoardItem] = useState();
  const [arrboardClone, setarrBoardClone] = useState();

  useEffect(() => {
    const cardData = ref(db, 'Boards/');
    onValue(cardData, async (snapshot) => {
    const data = await snapshot.val();
  
    const toDo = Object.entries(data["To Do"]).map(([key, value]) => ({
       
        id: key,
        title : value.title,
        description : value.description        
      
     }))
     
     
     const progress = Object.entries(data["In Progress"]).map(([key, value]) => ({
        id: key,
        title : value.title,
        description : value.description
      
     }))

     const completed = Object.entries(data["Completed"]).map(([key, value]) => ({
        id: key,
        title : value.title,
        description : value.description
      
     }))

     const finalData = {'To Do':toDo, 
      'In Progress': progress,
      'Completed': completed
   }
    setBoardItem({...finalData});
    setBoardClone({...finalData});

    });
  },[])
  const searchFunc = (search)=> {
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

 const handleOnDragEnd = (res) => {
  const {source, destination, type} = res;
  if (!destination) 
    return
  if (destination.droppableId === source.droppableId && destination.index === source.index) 
    return

  if(destination.droppableId === source.droppableId && destination.index !== source.index) { 
      const boardID = destination.droppableId;
      const newItems = boardItem[boardID];
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);
      setBoardItem((previousBoardItem) => ({...previousBoardItem,  [boardID]: newItems}))
   }

  else { 
    const sourceItem = boardItem[source.droppableId][source.index];
    const destinatonBoard = boardItem[destination.droppableId];
    const sourceBoard = boardItem[source.droppableId]
    destinatonBoard.splice(destination.index, 0, sourceItem);
    sourceBoard.splice(source.index,1);
    setBoardItem((previousBoardItem) => ({...previousBoardItem, [destination.droppableId] : destinatonBoard}))
    setBoardItem((previousBoardItem) => ({...previousBoardItem, [source.droppableId] : sourceBoard}))
  }
 }
  return (
    <>
     <div className="app">
      <ToastContainer />
        <Navbar searchFunc = {searchFunc}/>
        <DragDropContext onDragEnd={handleOnDragEnd}>     
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
                  <Boards appAlert= {appAlert} boardData = {boardItem["To Do"]?.filter(x => x.title.toLowerCase().includes(globalSearch.toLowerCase()))} title = " To Do &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"/>
                  <Boards appAlert= {appAlert} boardData = {boardItem["In Progress"]?.filter(x => x.title.toLowerCase().includes(globalSearch.toLowerCase()))} title = "In Progress"/>
                  <Boards appAlert= {appAlert} boardData = {boardItem["Completed"]?.filter(x => x.title.toLowerCase().includes(globalSearch.toLowerCase()))} title = "Completed" />
                </div> 
              } 
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
