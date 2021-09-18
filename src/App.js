import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Todo from './components/Todo';
import Form from './components/Form';
import Filter from './components/Filter';

let taskData = [];
let taskList = [];

let active = false;
let completed = false;

function App(props) {

  console.log('Component : App');

  const [ tasks, setTasks ] = useState([]);

  function addTask(name) {
    console.log('add task');
    const newTask = {'id' : 'todo' + nanoid(),  'name' : name, 'completed': false};
    taskData.push(newTask);
    setTasks([...tasks, newTask]);
  }

  function removeTask(taskId) {
    let otherTasks = tasks.filter(task => task.id !== taskId);
    taskData = taskData.filter(task => task.id !== taskId);
    setTasks(otherTasks);
  }

  function toggleTask(taskId) {

    taskData  = taskData.map(task => {
      if(task.id == taskId) {
        return {...task, 'completed': !task.completed};
      } else {
        return task;
      }
    });

    if(active) filterActive()
    if(completed) filterCompleted()

  }

  function filterAll() {
    setTasks(taskData);
    active = false;
    completed = false;
  }

  function filterActive() {
    active = true;
    let activeTasks = taskData.filter(task => task.completed === false);
    setTasks(activeTasks);
  }

  function filterCompleted() {
    completed = true;
    let completedTasks = taskData.filter(task => task.completed === true);
    setTasks(completedTasks);
  }

  taskList = tasks.map(task => <Todo key={task.id} id={task.id} name={task.name} completed={task.completed} removeTask={removeTask} toggleTask={toggleTask}/>);    

  const taskNumText = tasks.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskData.length} ${taskNumText} remaining`; 

  return (
    <div>
      <h1>TodoList</h1>
      <Form addTask={addTask}/>
      <ul>
        {taskList}
      </ul>
      { taskData.length !== 0 ? <h2>
        {headingText}
      </h2> : null }
      <div>
        <Filter name="All" filter={filterAll}/>
        <Filter name="Active" filter={filterActive}/>
        <Filter name="Completed" filter={filterCompleted}/>
      </div>
    </div>
  );
}

export default App;
  