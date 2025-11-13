import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const AppNevbar = ({ products, carts, setToken }) => {
  return (
    <div className="fs-5">
      <Navbar bg="light" variant="light" className="py-3">
        <Container className="justify-content-center">
          <Nav className="gap-5">
            <Nav.Link as={NavLink} to="home">
              HOME
            </Nav.Link>
            <Nav.Link as={NavLink} to="calculator">
              CALCULATOR
            </Nav.Link>
            <Nav.Link as={NavLink} to="animation">
              ANIMATION
            </Nav.Link>
            <Nav.Link as={NavLink} to="components">
              COMPONENTS
            </Nav.Link>
            <Nav.Link as={NavLink} to="todos">
              TODOS
            </Nav.Link>
            <Nav.Link as={NavLink} to="products">
              PRODUCTS ( {products.length} )
            </Nav.Link>
            <Nav.Link as={NavLink} to="carts" className="position-relative">
              CARTS
              {carts.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carts.length < 10 ? carts.length : "9+"}
                  <span className="visually-hidden">unread messages</span>
                </span>
              )}
            </Nav.Link>
            <Nav.Link as={NavLink} onClick={()=>{setToken('')}}>
              LOGOUT
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNevbar;
