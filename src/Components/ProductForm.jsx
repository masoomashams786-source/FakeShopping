import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

function ProductForm({ initialValues, onSubmit, mode }) {
  const [formData, setFormData] = useState(initialValues);
  const [message, setMessage] = useState({
    message: null,
    variant: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      onSubmit(formData);
    } catch (error) {
      setMessage({
        message: " Something went wrong while adding the product!",
        variant: "danger",
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = mode == "Edit" ? "Edit Product" : "Add Product";
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold text-muted mb-2">
          Product Title
        </Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter product title"
          value={formData.title}
          onChange={handleChange}
          className="shadow-sm rounded-3 mb-3"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold text-muted mb-2">Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          placeholder="Enter product price"
          value={formData.price}
          onChange={handleChange}
          className="shadow-sm rounded-3 mb-3"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold text-muted mb-2">
          Product Description
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          type="text"
          name="description"
          placeholder="Describe your product"
          value={formData.description}
          onChange={handleChange}
          className="shadow-sm rounded-3 mb-3"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold text-muted mb-2">
          Category
        </Form.Label>
        <Form.Control
          type="text"
          name="category"
          placeholder="Enter category"
          value={formData.category}
          onChange={handleChange}
          className="shadow-sm rounded-3 mb-3"
          required
        />
      </Form.Group>

      <div className="text-center mt-4">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Submitting..." : buttonLabel}
        </Button>
      </div>
    </Form>
  );
}
export default ProductForm;
