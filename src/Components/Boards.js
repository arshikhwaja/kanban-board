import React, {useState, useEffect} from 'react';
import './Boards.css';
import Cards from './Cards';
import Modal from './Modal';
import { BsFillPlusCircleFill } from "react-icons/bs";
import config from '../config';
import {app} from '../config';
import {getDatabase, ref, set, push, get, onValue} from 'firebase/database';
import { isVisible } from '@testing-library/user-event/dist/utils';


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

  const cardDrop= () => {
    console.log("card drop")
  }

  
  return ( 
    <div className="container" onDragEnd={cardDrop}>
      <div className="boards"> 
        <div className="board_title">  
          {props.title} 
          <span>
              <iconbutton onClick={()=> {setShowModal(true); setIsEdit(false)}}><BsFillPlusCircleFill size='25px'/></iconbutton>          
              {showModal && <Modal modalAlert = {boardAlert} isEdit ={isEdit} showEditModal = {showEditModal} cardID = {cardID}  title = {isEdit ? title : ""} description =  {isEdit ? description : ""} type={props.title} onClose= {() =>setShowModal(false)} />}
          </span>
        </div>
        <div className = "board-content">
          {props.boardData != null && Object.keys(props.boardData).map((item) => {
              return (
              <Cards cardAlert = {boardAlert} showEditModal = {showEditModal} boardData= {props.title} data = {item} title = {props.boardData[item].title} description = {props.boardData[item].description}/> 
              )
            })  
         
          }
        </div>    
      </div>
    </div>
  )
}

export default Boards
