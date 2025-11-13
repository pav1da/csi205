import { Col, Container, Row } from "react-bootstrap";
import img1 from "../assets/images/IMG_0157.jpg";
import img2 from "../assets/images/pavida.png";

const Home = () => {
  return (
    <>
      <div className="w-100 min-h-screen bg-white d-flex flex-column align-items-center justify-content-center">
        <img
          src={img1}
          alt="Pavida"
          width={"1520px"} 
          height={"300px"}
          className="img-fluid w-100"
          style={{ maxHeight: 320, objectFit: "cover" }}
        />

        <h2 className="mt-5">ABOUT ME</h2>
        <Container>
          <Row>
            <Col className="py-5 me-5 text-center">
              <hr />
              <img
                src={img2}
                alt="Pavida"
                width={"320px"}
                className="border border-2 border-black rounded-2"
              />
              <hr />
            </Col>
            <Col className="py-5 mx-2">
              <hr />
              <p className="fs-5">
                <b>Name : </b> Pavida Jainoi <br />
                <b>Nickname : </b> Jeab <br />
                <b>Age</b> : 21 <br />
                <b>Birthday</b> : 29 December 2003 <br />
                <b>University</b> : SPU | Sripathum University <br />
                <b>Student ID</b> : 67140996
              </p>
              <hr />
              <p className="fs-5">
                <b>NOTE : </b> <br />
                ปี 2 คณะเทคโนโลยีสารสนเทศ <br />
                สาขาวิทยาการคอมพิวเตอร์และนวัฒกรรมการพัฒนาซอฟต์แวร์
              </p>
            </Col>
            <Col className="py-5 ms-5">
              <hr />
              <h3>Contact</h3> <hr />
              <p className="fs-5">
                <b>Discord</b> : Jaogaony <br />
                <b>Instagram</b> : pav1da <br />
                <b>Facebook</b> : Pavida Jaonoi <br />
                <b>GitHub</b> : pav1da <br />
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
