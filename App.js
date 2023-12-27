import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faPenToSquare, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// Task component represents each individual task
const Task = ({ task, index, toggleTaskStatus, setUpdatedTask, removeTask }) => {
  return (
    <div className={`col task-container ${task.status ? 'done' : ''}`} key={task.id}>
      <div>
        {/* Show number of task */}
        <span className="task-num">{index + 1}</span>
        {/* Show task title */}
        <span className="input-task">{task.title}</span>
      </div>
      <div className="icons">
        {/* Toggle task status */}
        <span onClick={() => toggleTaskStatus(task.id)} title="Completed / Not Completed">
          <FontAwesomeIcon icon={faSquareCheck} />
        </span>
        {/* Show edit and delete icons */}
        {!task.status && (
          <>
            <span title="Edit" onClick={() => setUpdatedTask({ id: task.id, title: task.title, status: task.status })}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </span>
            <span onClick={() => removeTask(task.id)} title="Delete">
              <FontAwesomeIcon icon={faSquareMinus} />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// Main App component
function App() {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  // State for new task input
  const [newTaskInput, setNewTaskInput] = useState('');
  // State for task being updated
  const [updatedTask, setUpdatedTask] = useState('');

  // Add new task
  const addNewTask = () => {
    if (newTaskInput) {
      let taskNumber = tasks.length + 1;
      let newTaskEntry = { id: taskNumber, title: newTaskInput, status: false };
      setTasks([...tasks, newTaskEntry]);
      setNewTaskInput('');
    }
  };

  // Remove task
  const removeTask = (id) => {
    let remainingTasks = tasks.filter((task) => task.id !== id);
    setTasks(remainingTasks);
  };

  // Toggle task status (complete/incomplete)
  const toggleTaskStatus = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return ({ ...task, status: !task.status });
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Cancel task update
  const cancelTaskUpdate = () => {
    setUpdatedTask('');
  };

  // Edit task
  const editTask = (e) => {
    let updatedTaskEntry = {
      id: updatedTask.id,
      title: e.target.value,
      status: updatedTask.status,
    };
    setUpdatedTask(updatedTaskEntry);
  };

  // Save updated task
  const saveUpdatedTask = () => {
    let remainingTasks = tasks.filter((task) => task.id !== updatedTask.id);
    let updatedTaskList = [...remainingTasks, updatedTask];
    setTasks(updatedTaskList);
    setUpdatedTask('');
  };

  return (
    <div className="container App">
      <br /><br />
      {/* Header */}
      <h2 className="headerTitle">To Do: Your Path to Achievement</h2>
      <br /><br />
      {/* Conditionally render input fields based on whether a task is being updated */}
      {updatedTask && updatedTask ? (
        <>
          <div className="row">
            <div className="col">
              {/* Input field for updating task */}
              <input
                value={updatedTask && updatedTask.title}
                onChange={(e) => editTask(e)}
                className="form-control form-control-lg input-task"
              />
            </div>
            <div className="col-auto column-container">
              {/* Buttons for updating and canceling task update */}
              <button
                className="btn btn-lg btn-update mr-20"
                onClick={saveUpdatedTask}
              >
                Update
              </button>
              <button
                className="btn btn-lg btn-cancel"
                onClick={cancelTaskUpdate}
              >
                Cancel
              </button>
            </div>
          </div>
          <br />
        </>
      ) : (
        <>
          <div className="row">
            <div className="col">
              {/* Input field for adding a new task */}
              <input
                value={newTaskInput}
                onChange={(e) => setNewTaskInput(e.target.value)}
                className="form-control form-control-lg input-task"
              />
            </div>
            <div className="col-auto">
              {/* Button for adding a new task */}
              <button
                className="btn btn-lg btn-update"
                onClick={addNewTask}
              >
                Add Task
              </button>
            </div>
          </div>
          <br />
        </>
      )}
      {/* Display message if there are no tasks */}
      {tasks && tasks.length ? '' : 'No task yet...'}
      {/* Render tasks */}
      {tasks &&
        tasks
          .sort((a, b) => a.id > b.id ? 1 : -1)
          .map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              toggleTaskStatus={toggleTaskStatus}
              setUpdatedTask={setUpdatedTask}
              removeTask={removeTask}
            />
          ))}
    </div>
  );
}

export default App;
