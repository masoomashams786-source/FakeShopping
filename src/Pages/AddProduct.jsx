import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";
import ProductForm from "../Components/ProductForm";

function AddProduct() {
  const initalValues = {
    title: "",
    price: "",
    description: "",
    category: "",
  };

  const [message, setMessage] = useState(null);
  const onSubmit = async (formData) => {
    const response = await axios.post(
      "https://fakestoreapi.com/products",
      formData
    );
    setMessage(`Product "${response.data.title}" added successfully!`);
  };
  return (
    <Container className="py-5">
      <Card
        className="bg-light shadow-lg p-5 border-0 rounded-4 mx-auto"
        style={{ maxWidth: "720px" }}
      >
        <h2 className="text-center mb-4 fw-bold  display-6 border-bottom pb-2 glow-text">
          Add New Product
        </h2>
        {message && <Alert variant={"success"}>{message}</Alert>}
        <ProductForm
          initialValues={initalValues}
          onSubmit={onSubmit}
          mode="Create"
        />
      </Card>
    </Container>
  );
}
export default AddProduct;
