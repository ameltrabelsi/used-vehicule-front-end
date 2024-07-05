import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "./Avatar";
import DeleteArticleModal from "./DeleteArticleModal.jsx";

function ArticleCard({ article }) {
  const { details: userDetails } = useSelector((state) => state.user);
  return (
    <Card>
      <Card.Img variant="top" className="card-img" src={article.photo} />
      <Card.Body>
        <card.Category className="text-truncate">
          {article.category}
        </card.Category>
        <Card.Title className="text-truncate">{article.title}</Card.Title>
        <Card.Text className="text-truncate">{article.description}</Card.Text>
        <Badge pill bg="primary">
          {article.price} TND
        </Badge>

        <div className="d-flex justify-content-center text-primary gap-2">
          <Link to={`/articles/${article._id}`} target="_blank">
            <i className="bi bi-box-arrow-up-right text-primary h3"></i>
          </Link>

          {userDetails?._id === article.user._id && (
            <>
              <Link to={`/update-article/${article._id}`}>
                <i className="bi bi-pencil-square text-warning h3"></i>
              </Link>
              <DeleteArticleModal article={article} />
            </>
          )}
        </div>

        <Avatar user={article.user} />
      </Card.Body>
    </Card>
  );
}

export default ArticleCard;
