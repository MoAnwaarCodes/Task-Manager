import React, { useEffect, useState } from "react";
import DateTime from "./DateTime";
import "./AddTask.css"; // Import your CSS file

const AddTask = () => {
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.103/Timetable/api/home/showData",
        {
          method: "GET",
          mode: "cors", // Ensure that CORS is enabled
        }
      );
      const result = await response.json();
      const arr = result.map((item) => {
        return { tasks: item.Tasks, id: item.id };
      });
      setTasks(arr);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrTask] = useState("");

  const clearHandler = async (i) => {
    const newArr = tasks.filter((item) => item.id !== i);
    setTasks(newArr);
    try {
      const response = await fetch(
        `http://192.168.1.103/Timetable/api/home/deleteData?id=${i}`,
        {
          method: "GET",
          mode: "cors", // Ensure that CORS is enabled
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {}
  };
  const taskHandler = async () => {
    // Clear the input value after submitting
    const a={tasks:currentTask,id:null}
      const arr = [...tasks, a];
      setTasks(arr);
      setCurrTask("");
    
    try {
      const response = await fetch(
        `http://192.168.1.103/Timetable/api/home/saveData?task=${currentTask}`,
        {
          method: "GET",
          mode: "cors", // Ensure that CORS is enabled
        }
      );
      const result = await response.json();
      
      console.log(result);
    
    } catch (error) {}
  };

  return (
    <div className="task-container">
      <DateTime />
      <h1 className="task-header">Task List</h1>
      <div className="input-container">
        <input
          onChange={(event) => setCurrTask(event.target.value)}
          value={currentTask}
          type="text"
          placeholder="Enter Task"
          className="task-input"
        />
        <button onClick={taskHandler} className="add-button">
          Add Task
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((item,index) => (
          <li key={index} className="task-item">
            <input type="checkbox" className="checkbox" />
            <p>{item.tasks}</p>
            <button
              onClick={() => {
                clearHandler(item.id);
              }}
              className="clear-button"
            >
              clear
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTask;
