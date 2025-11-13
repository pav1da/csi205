import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Products.css";

const Products = ({ products, carts, setCarts }) => {
  return (
    <>
      <div className="d-flex justify-content-center w-100 bg-white rounded-4 py-3 mx-4">
        <div className="items-container">
          {products.map((product) => {
            return (
              <Card style={{ width: "18rem"}} key={product.id}>
                <Card.Img variant="top" src={product.thumbnailUrl} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <b>$ {product.price.toFixed(2)}</b>
                  </Card.Text>
                  {carts.find((carts) => carts.id === product.id) ? (
                    <span className="badge bg-danger py-2 px-4">Added</span>
                  ) : (
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        setCarts([...carts, product]);
                      }}
                    >
                      Add To Carts
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
