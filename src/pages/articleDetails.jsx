import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";

import { fetchArticleById } from "../store/articleSlice";

export default function ArticleDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, isLoading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <h3>Article not found</h3>
      </div>
    );
  }
  if (selected) {
    return (
      <>
        <h1>Article details</h1>
        <img
          alt="article-img"
          className="mb-3 d-block mx-auto"
          style={{ maxWidth: 500 }}
          src={selected.photo}
        />
        <Table
          striped
          bordered
          hover
          style={{ maxWidth: 500 }}
          className="mx-auto"
        >
          <tbody>
            <tr>
              <td>Title</td>
              <td> {selected.title} </td>
            </tr>
            <tr>
              <td>Description</td>
              <td> {selected.description} </td>
            </tr>
            <tr>
              <td>Price</td>
              <td> {selected.price} </td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}
