import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from './TaskForm';
import { taskAction } from "../strore/strore";

const TaskList = () => {
  const tasksList = useSelector((state) => state.tasks.tasksList);
  const editingTask = useSelector((state) => state.tasks.editingTask);
  const dispatch = useDispatch();

  // State for sorting and filtering
  const [sortByDueDate, setSortByDueDate] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState('');

  // Function to toggle sorting by due date
  const toggleSortByDueDate = () => {
    setSortByDueDate(!sortByDueDate);
  };

  // Function to handle filtering by status
  const handleFilterByStatus = (status) => {
    setFilterByStatus(status);
  };

  let filteredTasks = tasksList.slice(); 

  if (filterByStatus) {
    filteredTasks = filteredTasks.filter((task) => task.status === filterByStatus);
  }

  if (sortByDueDate) {
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  const handleEditTask = (index) => {
    dispatch(taskAction.editTask(index));
  };

  const handleDeleteTask = (index) => {
    dispatch(taskAction.deleteTask(index));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-8 text-center">Task Manager</h1>
      <TaskForm taskToEdit={tasksList[editingTask]} />
      <hr className="my-8" />
      {/* Sorting and Filtering */}
      <div className="flex flex-col sm:flex-row gap-2 mb-1 sm:flex  sm:justify-center sm:gap-10 sm:mb-4 ">
        <div>
          <label className="mr-2">Sort by Due Date:</label>
          <input
            type="checkbox"
            checked={sortByDueDate}
            onChange={toggleSortByDueDate}
          />
        </div>
        <div>
          <label className="mr-2">Filter by Status:</label>
          <select
            value={filterByStatus}
            onChange={(e) => handleFilterByStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      {/* Task lists */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Tasks List</h2>
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
            <div className='flex flex-col justify-start sm:flex-row sm:flex sm:justify-center sm:items-center my-2'>
             <div className='gap-5 mr-5'><strong>Title :</strong> {task.title}</div>
             <div className='gap-5 mr-5'><strong>Description :</strong> {task.description} </div>
             <div  className='gap-5 mr-5'><strong>Due Date :</strong> {task.dueDate} </div>
             <div className='flex gap-5 mr-5'><strong>Status :</strong><div className='uppercase'>{task.status}</div> </div>
            <button className="mx-2 border w-1/4 px-3 mt-2 py-2 rounded-lg bg-slate-500 text-slate-50 sm:w-1/6 sm:mt-0" onClick={() => handleEditTask(index)}>
              Edit
            </button>
            <button className='mx-2 border w-1/4 mt-2 px-3 py-2 rounded-lg bg-red-500 text-slate-50 sm:w-1/6 sm:mt-0' onClick={() => handleDeleteTask(index)}>
              Delete
            </button>
            </div>
          </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
