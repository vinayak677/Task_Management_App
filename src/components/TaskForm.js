import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../strore/strore';

const TaskForm = ({ taskToEdit }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit);
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(taskAction.addTask(task));
    setTask({ title: '', description: '', dueDate: '', status: 'pending' });
  };

  return (
    <form
      className="max-w-md mx-auto mt-10 bg-slate-300 p-6 rounded-md shadow-2xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Task</h2>
      <label className="block mb-4">
        <span className="text-gray-700">Title:</span>
        <input
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          required
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Description:</span>
        <textarea
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          name="description"
          value={task.description}
          onChange={handleChange}
          required
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Due Date:</span>
        <input
          className=" mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
      </label>
      <label className="block mb-4">
          <span className="text-gray-700">Status:</span>
          <select
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      <button className="btn bg-black rounded-2xl p-1 text-white w-full hover:text-slate-100 hover:bg-slate-500" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
