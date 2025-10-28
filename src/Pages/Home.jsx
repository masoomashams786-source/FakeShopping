import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  console.log("change")

  const handleViewProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <Container className="text-center py-5">
            <Row
              className="justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <Col md={8}>
                <h1 className="fw-bold mb-4 ">Welcome to SILK DUNE 🌿</h1>
                <p className="text-muted fs-5 mb-4">
                  Discover amazing products at unbeatable prices. Start
                  exploring our store today!
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleViewProducts}
                >
                  View Products
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <footer className="bg-dark text-light py-4 mt-auto">
        <Container>
          <Row className="text-center">
            <Col>
              <p className="mb-2">
                &copy; {new Date().getFullYear()} SILK DUNE. All rights
                reserved.
              </p>

              <p className="text-light me-3 ">Contact Privacy Policy</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Home;
