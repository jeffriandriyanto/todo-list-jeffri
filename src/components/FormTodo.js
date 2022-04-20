import { useEffect, useState } from "react";
import { Button, Form } from 'react-bootstrap';

const FormTodo = ({ addTodo, isEdit, todo, editTodo }) => {
  const initialProperty = {
    title: "Add Todo",
    inputTitle: "Add new todo",
    inputDesc: "Add description",
    submitText: "Submit"
  }
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [property, setProperty] = useState(initialProperty);

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    if (isEdit) {
      editTodo({ title: value, description: description })
    } else addTodo({ title: value, description: description });
    setValue("");
    setDescription("");
  };

  useEffect(() => {
    if (isEdit) {
      const { title, description } = todo;
      setProperty({
        title: "Edit Todo",
        inputTitle: "Edit todo title",
        inputDesc: "Edit todo Description",
        submitText: "Save"
      });
      setValue(title);
      setDescription(description);
    } else {
      setProperty(initialProperty);
      setValue("");
      setDescription("");
    }
  }, [isEdit])


  return (
    <Form onSubmit={handleSubmit} className="ctr-add-todos">
      <Form.Group>
        <Form.Label className="add-todos-title"><b>{property.title}</b></Form.Label>
        <Form.Control className="add-todos-input input" type="text" value={value} onChange={e => setValue(e.target.value)} placeholder={property.inputTitle} />
        <Form.Control className="add-todos-input input" type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder={property.inputDesc} />
      </Form.Group>
      <Button variant="primary mb-3" type="submit" className="add-todos-action">
        {property.submitText}
      </Button>
    </Form>
  );
}

export default FormTodo;
