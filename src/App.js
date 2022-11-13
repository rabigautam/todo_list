/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
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
  const taskList = tasks?.map((task) => (
    <Todo
      key={task.id}
      id={task.id}
      name={task.name}
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));
  const tasksNoun = taskList.length > 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaning`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <FilterButton />
      <h2 id="list-heading">{headingText}</h2>
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
