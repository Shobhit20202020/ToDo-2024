'use client'
import React, { useState } from 'react';
import myImage from './image.png'; // Corrected import path

const App = () => {
  const [taskInput, updateTaskInput] = useState("");
  const [toDoList, updateToDoList] = useState([]);

  const inputKeyDown = (event) => {
    if (event.keyCode === 13) addNote(); // Assuming addNote is a placeholder function
  };

  const getTaskObject=(description,isComplete)=>{
    return{
      description,
      isComplete
    }
  }

  const addNote = () => {
   if(!taskInput || !taskInput.length)
   return;
  toDoList.push(getTaskObject(taskInput,false));
  updateToDoList(toDoList);
  updateTaskInput("");
  };

  const markComplete=(index)=>{
    const list=[...toDoList]
    list[index].isComplete=!list[index].isComplete
    updateToDoList(list);
  }

  const deleteTask=(index)=>{
    let splice=toDoList.filter((item,i)=>i!==index);
    updateToDoList(splice)
  }

  return (
    <div className='app-background'>
      <p className='heading-text'>React Todo App </p>
      <div className='Task-container'>
        <div className='row'>
          <input
            className='text-input'
            value={taskInput}
            onKeyDown={inputKeyDown}
            onChange={(event) => updateTaskInput(event.target.value)} 
          />
          <button className='add-button' onClick={addNote}>ADD</button>
        </div>
        {toDoList?.length ?
        toDoList.map((toDoObject,index)=>
        <ListItem key={index} itemData={toDoObject} markComplete={markComplete}
        index={index} deleteTask={deleteTask}/>):
        <p className='no-item-text'>No Task Added ! 📌</p>}
       
      </div>
    </div>
  );
};

function ListItem(props) {
  return (
    <div className="list-item row jc-space-between">
    <span className={props.itemData.isComplete ? 'task-complete' : ''}
          onClick={() => props.markComplete(props.index)}>{props.itemData.isComplete ? `✅ ` : ''}&nbsp;{props.itemData?.description}</span>
    <img className="delete-icon" src={myImage} alt="delete-task"
         onClick={() => props.deleteTask(props.index)}/>
</div>
  );
}

export default App;
