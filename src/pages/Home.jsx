import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getArticle("token");
    const userDetails = localStorage.getArticle("userDetails");
    if (token && userDetails) {
      dispatch(login({ token, details: JSON.parse(userDetails) }));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return <div></div>;
};

export default Home;
