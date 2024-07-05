import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

import {
  fetchArticleById,
  requestUpdatingArticle,
} from "../store/articlesSlice";

function UpdateArticle() {
  const { selected } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    photo: "",
    price: "",
  });

  useEffect(() => {
    if (selected) {
      setArticleData(selected);
    }
  }, [selected]);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description, photo, price } = articleData;
    dispatch(
      requestUpdatingArticle({
        id,
        data: { title, description, photo, price },
        navigate,
      })
    );
  }

  function handleChange(e) {
    setArticleData((prevArticleData) => ({
      ...prevArticleData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <Container className="mt-3">
      <h1>Update Article</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={articleData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={articleData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            name="photo"
            value={articleData.photo}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={articleData.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit" className="mx-auto d-block w-100">
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateArticle;
