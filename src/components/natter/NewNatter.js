import { Container, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "react-bootstrap";
import NotFound from "../../pages/NotFound";

const NewNatter = ({ id }) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitForm = (value) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: id, body: value }),
    };
    fetch("/api/v1/natter/", requestOptions).then(
      (result) => {
        console.log(result);
        setResult(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setError(error);
      }
    );
  };

  if (error) {
    return <NotFound errorCode={error.status}></NotFound>;
  } else {
    return (
      <Container>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab onClick={handleShow} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Box>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Go on...get it off your chest!</Modal.Title>
            <Button className="btn-close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <Form
              className="mb-2"
              onSubmit={(e) => {
                submitForm(value);
              }}
              onChange={(e) => handleChange(e)}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" placeholder="Nat time!" />
                <Form.Text className="text-muted" value={value}></Form.Text>
              </Form.Group>
              <br></br>
              <Button className="btn" variant="primary" type="submit">
                Post
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
};

export default NewNatter;
