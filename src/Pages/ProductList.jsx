import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduts();
  }, []);
  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="text-center py-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="pb-5">
      <h2 className="fw-bold text-center mt-5 mb-4">
        
        <img
          src={logo}
          alt=" Logo"
          width="90"
          height="90"
          className="me-2"
        />
        Product Listing
      </h2>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: "250px", objectFit: "contain" }}
              />
              <Card.Body>
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text className="fw-bold text-success">
                  ${product.price}
                </Card.Text>
                <Button
                  variant="outline-primary"
                  className="me-2"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  View Details
                </Button>
                <Button
                  as={Link}
                  to={`/edit-product/${product.id}`}
                  variant="warning"
                >
                  Edit Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default ProductList;
