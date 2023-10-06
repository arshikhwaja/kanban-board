import React, {useState, useEffect} from 'react';
import './Boards.css';
import Cards from './Cards';
import Modal from './Modal';
import { BsFillPlusCircleFill } from "react-icons/bs";
import config from '../config';
import {app} from '../config';
import {getDatabase, ref, set, push, get, onValue} from 'firebase/database';
import { isVisible } from '@testing-library/user-event/dist/utils';
import { Draggable, Droppable } from 'react-beautiful-dnd';


const Boards = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [cardID, setCardID] = useState(null);
  const [title, setTitle] = useState ();
  const [description, setDesc] = useState();
  const [showCards, setShowCards] = useState(false); //for rendering searched cards
  const [isSearch, setSearch] = useState(false); //for rendering search true or false
  const showEditModal = (id, title, description) => {
    setCardID(id)
    setTitle(title)
    setDesc(description)
    setIsEdit(true)
    setShowModal(true)
  }
  const boardAlert = (msg) => {
    props.appAlert(msg);
  }
 
  return ( 
    <Droppable droppableId={props.title.trim()}>
       {(provided) => (  
       <div  {...provided.droppableProps} ref={provided.innerRef}  className="container">
       <div className="boards"> 
         <div className="board_title">  
           {props.title} 
           <span>
               <iconbutton onClick={()=> {setShowModal(true); setIsEdit(false)}}><BsFillPlusCircleFill size='25px'/></iconbutton>          
               {showModal && <Modal modalAlert = {boardAlert} isEdit ={isEdit} showEditModal = {showEditModal} cardID = {cardID}  title = {isEdit ? title : ""} description =  {isEdit ? description : ""} type={props.title} onClose= {() =>setShowModal(false)} />}
           </span>
         </div>
         <div className = "board-content">
           {props.boardData != null && props.boardData.map((item, index) => {
               return (
                <Cards cardAlert = {boardAlert} showEditModal = {showEditModal} index = {index} boardData= {props.title} data = {item.id} title = {item.title} description = {item.description}/> 
              )
             })  
          
           }
         </div>    
       </div>
     </div>
      )}
    </Droppable>
  )
}

export default Boards
