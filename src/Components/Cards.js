import React from 'react';
import './Cards.css';
import './Modal';
import {app} from '../config';
import {getDatabase, ref, update, remove} from 'firebase/database';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';

function Cards(props) {
  const db = getDatabase(app);
  const handleEdit = (id, title, description) => {
    props.showEditModal(id, title, description)
  }
    
  const handleDelete = () => {
  let text = "Are you sure you want to delete? ";
    if (window.confirm(text) === true) {
      remove(ref(db,`Boards/${(props.boardData).trim()}/${(props.data)}`))  
      props.cardAlert("Task deleted!");
    } 
  }

  return (
    <Draggable draggableId={props.data} key={props.data} index={props.index}>
    {(provided) => (  
    <div ref={provided.innerRef}  
    {...provided.draggableProps}  
    {...provided.dragHandleProps}  
    className="cards">
        <p className="card-title">{props.title}</p>
        <p className="card-text">{props.description}</p>
        <a href="#" className="btn btn-primary" onClick={handleEdit.bind(null, props.data , props.title , props.description)}>Edit</a> &nbsp;&nbsp;
        <a href="#" className="btn btn-danger" onClick={handleDelete}>Delete</a>
    </div>
    )}
    </Draggable>
  )
}

export default Cards
