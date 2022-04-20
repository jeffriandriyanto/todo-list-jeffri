import { Button } from 'react-bootstrap';

const Todo = ({ todo, index, markTodo, removeTodo, openDetail, editTodo }) => {
  const done = todo.status === 1;
  return (
    <div
      className="todo"
    >
      <span onClick={() => openDetail(index, todo.status)} style={{ cursor: "pointer" }}>{todo.title}</span>
      <div className="todos-action">
        {!done && <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>}
        {!done && <Button variant="outline-primary" onClick={() => editTodo(index)}><i className="bi bi-pencil-square"></i></Button>}
        {!done && <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>}
      </div>
    </div>
  );
}

export default Todo;
