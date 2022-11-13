/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useRef, useEffect } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import {usePrevious} from "./customHooks"

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");
  const listHeadingRef = useRef(null);
  function addTask(task) {
    const newTask = { id: `todo-${nanoid()}`, name: task, completed: false };
    setTasks([...tasks, newTask]);
  }
  function toggleTaskCompleted(id) {
    const updatedTask = tasks.map((task) => {
      if (id === task.id) {
        task = {
          ...task,
          completed: !task.completed
        };
        console.log(task);
        return task;
      }
      return task;
    });
    setTasks(updatedTask);
  }

  function deleteTask(id) {
    const remaningTasks = tasks.filter((task) => id !== task.id);
    setTasks(remaningTasks);
  }
  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {
          ...task,
          name: newName
        };
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        completed={task.completed}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));
  const filterList = FILTER_NAMES.map((name) => {
    return <FilterButton key={name} name={name} setFilter={setFilter} />;
  });
  const tasksNoun = taskList.length > 1 ? "tasks" : "task";
  const tasksStatus = filter === "Completed" ? "completed" : "remaning";

  const headingText = `${taskList.length} ${tasksNoun} ${tasksStatus}`;
  const prevTaskLength = usePrevious(tasks.length);
  useEffect(() => {
    if(tasks.length - prevTaskLength === -1){
        listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength]);
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      {filterList}
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
