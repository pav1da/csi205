import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Carts.css";
import { Badge } from "react-bootstrap";

const Carts = ({ carts, setCarts }) => {
  return (
    <>
      <div className="d-flex justify-content-center w-100 bg-white rounded-4 py-3 mx-4">
        <div className="items-container">
          {carts.map((cart) => {
            return (
              <Card style={{ width: "18rem" }} key={cart.id}>
                <Card.Img variant="top" src={cart.thumbnailUrl} />
                <Card.Body>
                  <Card.Title>{cart.title}</Card.Title>
                  <Card.Text>
                    <b>$ {cart.price.toFixed(2)}</b>
                  </Card.Text>
                  <Button
                    variant="outline-danger"
                    onClick={() => setCarts(carts.filter((c) => c.id !== cart.id))}
                  >
                    Remove from Carts
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
        <center>
          <h4>
            Products : <Badge className="bg-danger">{carts.length} item</Badge>
            - Total Price : <Badge className="bg-success my-4">
              $ {carts.reduce((prev, cart) => {
                return prev + cart.price;
              }, 0).toFixed(2)}
            </Badge>
          </h4>
          <button className="btn btn-warning align-items-center justify-content-center fs-4 mb-4">Checkout&nbsp;&nbsp;<i class="bi bi-credit-card"></i></button>
        </center>
    </>
  );
};

export default Carts;
