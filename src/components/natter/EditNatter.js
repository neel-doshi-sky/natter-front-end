import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";

const EditNatter = (props) => {
  const [value, setValue] = useState(null);
  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
    console.log("changed");
  };
  const submitForm = (value) => {
    console.log("form submit " + value);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: props.id, body: value }),
    };
    fetch("/api/v1/natter/", requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.href);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submitForm(value);
        window.location.href = window.location.href;
      }}
      onChange={(e) => handleChange(e)}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder={props.original} />
        <Form.Text className="text-muted" value={value}></Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default EditNatter;
