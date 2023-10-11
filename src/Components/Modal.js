import React, { useState } from 'react';
import './Modal.css';
import {app} from '../config';
import {getDatabase, ref, push, update} from 'firebase/database';

const Modal = (props) => {
  const[inputText, setInputText] = useState(props.title);
  const handleTaskChange = (event) => {
    setInputText(event.target.value);
  }
  const[inputDesc, setInputDesc] = useState(props.description);
  const handleDescChange = (event) => {
    setInputDesc(event.target.value);
  }

 const db = getDatabase(app);
  const addData = () => {
    if(!inputText || !inputDesc){
      props.modalAlert("Please enter task :(");
      return;
    }
      if (props.isEdit === true) { //if edit is clicked
        const postData = {
          title: inputText,
          description: inputDesc       
        }
        const updates = {};
        updates[`Boards/${(props.type).trim()}/${(props.cardID)}`] = postData;
        updates[`Boards/${(props.type).trim()}/${(props.cardID)}`] = postData;
        update(ref(db),updates)
        props.onClose();
        props.modalAlert("Task updated")             
      }
      else{ //if add is clicked
          push(ref(db, `Boards/${(props.type).trim()}`),{
            title: inputText,
            description: inputDesc
          })
          props.onClose();
          props.modalAlert("Task added!");
      }
   
  }

  return ( 
  <>

    <div className='modal' onClick={()=> props.onClose ? props.onClose(): ""}>
        <div className='modal_content' onClick={(event)=>event.stopPropagation()}>
        <div className='modal_title'>
            <p>Task</p>   
            <button  style={{marginLeft: "250px", marginBottom: "30px"}}type="button" className="btn-close" aria-label="Close" onClick={()=> props.onClose ? props.onClose(): ""}></button>
            
        </div>
            
        <input placeholder='Enter task' size='30' onChange={handleTaskChange} value={inputText} /><br /><br />
         <p className="modal_text">Description</p>
        <textarea placeholder='Enter description' rows="3" cols="33" onChange={handleDescChange} value={inputDesc}  />
        <br /><br />
        <button type="button"  style={{marginLeft: "170px"}} href="#" className="btn btn-secondary" onClick={addData}>{props.isEdit ? "Edit" : "Add"} </button> 
        <button type="button" style={{marginLeft: "20px"}} href="#" className="btn btn-secondary" onClick={()=> props.onClose ? props.onClose(): ""} >Cancel</button>
    
        </div>
    </div>
  </>
  )
}

export default Modal;
