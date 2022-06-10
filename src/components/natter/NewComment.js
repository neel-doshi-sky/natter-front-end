import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";

const NewComment = (props) => {
  const [value, setValue] = useState(null);
  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };
  const submitForm = (value) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parentNatterId: props.id, body: value }),
    };
    fetch("/api/v1/natter/comment", requestOptions)
      .then((response) => response.json())
      .then((data) => (window.location.href = window.location.href));
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submitForm(value);
      }}
      onChange={(e) => handleChange(e)}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Add a comment..." />
        <Form.Text className="text-muted" value={value}></Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
};

export default NewComment;
