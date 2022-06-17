import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const NotFound = (props) => {
  return (
    <Container fluid="md" className="mt-5">
      <Row>
        <Col>
          <div className="card">
            <div className="card-header">{props.errorCode}</div>
            <div className="card-body">
              <h5 className="card-title">Uh Oh....Something went wrong</h5>
              <p className="card-text">{props.errorMessage}</p>
              <Link to="/">
                <button className="btn btn-primary">Go Home</button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
