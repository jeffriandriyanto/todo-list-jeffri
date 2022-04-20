import { useEffect, useState } from "react";
import "./App.css";
import { Card, Modal } from 'react-bootstrap';

import Todo from "./components/Todo";
import FormTodo from "./components/FormTodo";

import moment from "moment";
const axios = require('axios');

function App() {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [popup, setPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [popupData, setPopupData] = useState();

  const addTodo = data => {
    const newTodosData = [...todos, ...doneTodos];
    let getMaxId = Math.max(...newTodosData.map(n => n.id));

    const newTodos = [...todos, {
      createdAt: moment().format("YYYY-MM-DD HH:mm"),
      description: data.description,
      id: getMaxId + 1,
      status: 0,
      title: data.title,
    }];
    setTodos(newTodos);
  };

  const markTodo = index => {
    const newTodos = [...todos];
    const newDoneTodos = [...doneTodos];
    
    newTodos[index].status = 1;
    newDoneTodos.push(newTodos[index]);
    setDoneTodos(newDoneTodos);
    
    setTimeout(() => {
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }, 10);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const openDetail = (index, status) => {
    if (status) setPopupData(doneTodos[index]);
    else setPopupData(todos[index]);
    setPopup(true);
  }

  const editTodo = (index) => {
    setEditData({ index: index, ...todos[index] });
    setIsEdit(true);
  }

  const handleClose = () => {
    setPopup(false);
  }

  const editTodoHandler = (todo) => {
    const newTodos = [...todos];
    newTodos[editData.index].title = todo.title
    newTodos[editData.index].description = todo.description
    newTodos[editData.index].updatedAt = moment().format("YYYY-MM-DD HH:mm");
    setTodos(newTodos);
    setIsEdit(false);
    setEditData({})
  }

  useEffect(() => {
    axios
      .get('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
      .then(({ data }) => {
        const todo = data.filter(data => data.status === 0);
        const doneTodo = data.filter(data => data.status === 1);
        setTodos(todo.sort((a, b) => moment(a.createdAt) - moment(b.createdAt)).reverse());
        setDoneTodos(doneTodo.sort((a, b) => moment(a.createdAt) - moment(b.createdAt)));
      });
  }, []);

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} isEdit={isEdit} todo={editData} editTodo={editTodoHandler} />

        <Modal show={popup} onHide={handleClose}>
          {popupData ? (
            <div className="ctr-detail">
              <Modal.Header closeButton>
                <Modal.Title>{popupData.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="detail-description">
                  {popupData.description}
                </div>
                <div className="detail-created-date">
                  {popupData.createdAt}
                </div>
              </Modal.Body>
            </div>
          ) : ""}
        </Modal>

        {!isEdit && (
          <div className="todos">
            <div className="todos-wrapper">
              <div className="todos-title">Todo</div>
              {todos.length > 0 ? todos.map((todo, index) => (
                <Card key={`todo-${index}`} >
                  <Card.Body>
                    <Todo
                      key={index}
                      index={index}
                      todo={todo}
                      markTodo={markTodo}
                      removeTodo={removeTodo}
                      openDetail={openDetail}
                      editTodo={editTodo}
                    />
                  </Card.Body>
                </Card>
              )) : "No Todos"}
            </div>
            <div className="todos-wrapper">
              <div className="todos-title">Done</div>
              {doneTodos.map((todo, index) => (
                <Card key={`doneTodos-${index}`}>
                  <Card.Body>
                    <Todo
                      key={index}
                      index={index}
                      todo={todo}
                      markTodo={markTodo}
                      removeTodo={removeTodo}
                      openDetail={openDetail}
                      editTodo={editTodo}
                    />
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;