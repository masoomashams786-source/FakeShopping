import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import ProductForm from "../Components/ProductForm";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
        });
      } catch (error) {
        setError(error.message || "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (formData) => {
    await axios.put(`https://fakestoreapi.com/products/${id}`, product);
    setSuccess(true);
    setTimeout(() => navigate("/products"), 2000);
  };

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
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      className=" mt-4 bg-light shadow-lg p-5 border-0 rounded-4 mx-auto"
      style={{ maxWidth: "720px", paddingTop: "500px" }}
    >
      <h2 className="fw-bold  text-center"> Edit Product</h2>
      {success && (
        <Alert variant="success">Product updated successfully!</Alert>
      )}
      <ProductForm
        initialValues={product}
        onSubmit={handleSubmit}
        mode="Edit"
      />
    </Container>
  );
}

export default EditProduct;
