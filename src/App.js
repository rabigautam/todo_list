/* eslint-disable jsx-a11y/no-redundant-roles */
import Todo from "./components/Todo";
import Form from "./components/Form";

import FilterButton from "./components/FilterButton";
function addTask(task){
    alert(`${task}`)
}
function App(props) {
  const taskList = props.tasks?.map((task) => (
    <Todo key = {task.id} id={task.id} name={task.name} completed={task.completed} />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <FilterButton/>
      <h2 id="list-heading">3 tasks remaining</h2>
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
