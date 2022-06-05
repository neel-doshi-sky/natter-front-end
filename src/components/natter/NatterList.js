import { Container } from "react-bootstrap";
import Natter from "./Natter";

const NatterList = ({ natters }) => {
  return (
    <Container>
      <ul>
        {natters.map((natter) => (
          <Natter key={natter.id.id} value={natter} />
        ))}
      </ul>
    </Container>
  );
};

export default NatterList;
