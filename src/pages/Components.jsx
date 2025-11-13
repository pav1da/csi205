// react dependencies
import { useState } from "react";

// user components
import RadixCounter from "../components/RadixCounter";
import Value from "../components/Value";
import Adder from "../components/Adder";
import Timer from "../components/Timer";
import Temperatures from "../components/Temperatures";
import { Col, Container, Row } from "react-bootstrap";


const Components = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <div className="d-flex justify-content-center align-items-center w-100 h-auto bg-white rounded-4 py-3">
        <div className="min-h-screen bg-white d-flex flex-column align-items-center justify-content-center">
          <h2 className="text-center py-4">REACT COMPONENT</h2>
          <Container>
            <Row className="mx-5 px-5 pb-4">
              <Col>
                <Value name={"COUNTER"} value={counter} setValue={setCounter} />
                <Timer />
              </Col>
              <Col>
                <Adder />
              </Col>
            </Row>
            <Row className="mx-5 pb-5">
              <Col>
                <Temperatures />
              </Col>
            </Row>
          </Container>

          {/* <RadixCounter /> */}
        </div>
      </div>
    </>
  );
};

export default Components;
