import { useRef } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { verifyUser } from "../data/users";

const pageStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#ffffff",
};

const Login = ({ setToken, setRole }) => {
  const userRef = useRef();
  const passRef = useRef();

  return (
    <div style={pageStyle}>
      <Card.Body>
        <Container className="text-center">
          <h1 className="fw-bold mb-5" style={{ color: "#000" }}>
            LOG IN
          </h1>
          <p className="text-muted mb-5">continue to your account.</p>

          <div className="d-flex align-content-center justify-content-center mb-5 mt-5">
            <Form className="d-grid gap-3" style={{ width: "35%" }}>
              <Form.Group htmlFor="username">
                <Form.Control
                  type="text"
                  placeholder="username"
                  id="username"
                  required
                  size="lg"
                  ref={userRef}
                />
              </Form.Group>
              <Form.Group htmlFor="password">
                <Form.Control
                  type="password"
                  placeholder="password"
                  id="password"
                  required
                  size="lg"
                  ref={passRef}
                />
              </Form.Group>

              <Button
                variant="dark"
                type="submit"
                size="lg"
                onClick={() => {
                  const user = userRef.current.value.trim();
                  const pass = passRef.current.value.trim();
                  userRef.current.value = "";
                  passRef.current.value = "";
                  const userInfo = verifyUser(user, pass);
                  if (userInfo === null) {
                    alert("Wrong username or password");
                    userRef.current.focus();
                  } else {
                    setToken(userInfo.token);
                    setRole(userInfo.role);
                  }
                }}
              >
                Continue
              </Button>
            </Form>
          </div>
        </Container>
      </Card.Body>
    </div>
  );
};

export default Login;
