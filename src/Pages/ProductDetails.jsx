import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        setError(error.message || "Failed to Fetch Product Details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }
  const handleDelete = async () => {
    if (window.confirm("Are you Sure you want to delete this product?")) {
      try {
        setDeleting(true);
        await axios.delete(`https://fakestoreapi.com/products/${id}`);
        alert("Product deleted successfully!");
        navigate("/products");
      } catch (error) {
        alert("Failed to delete product.");
      } finally {
        setDeleting(false);
      }
    }
  };
  const handleAddToCard = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updateCart = [...existingCart, product];
    alert(`${product.title} added to cart!`);
  };

  if (error) {
    return (
      <Container className="text-center py-5">
        <p className="text-danger">{error}</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 animate__animated animate__fadeIn">
            <Row className="g-0 align-items-center">
              <Col md={5} className="text-center p-3">
                <Card.Img
                  src={product.image}
                  alt={product.title}
                  style={{
                    height: "280px",
                    objectFit: "contain",
                    transition: "transform 0.3s",
                  }}
                  className="img-fluid hover-zoom"
                />
              </Col>
              <Col md={7}>
                <Card.Body>
                  <Card.Title className="fw-bold">{product.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {product.description}
                  </Card.Text>
                  <Card.Text className="fw-bold fs-4 text-success">
                    ${product.price}
                  </Card.Text>
                  <Card.Text className="text-secondary text-capitalize">
                    Category: {product.category}
                  </Card.Text>
                  <div className="d-flex gap-2 mt-4">
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate(-1)}
                    >
                      ← Back
                    </Button>
                    <Button variant="success" onClick={handleAddToCard}>
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default ProductDetails;
