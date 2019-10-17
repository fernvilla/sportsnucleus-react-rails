import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import ArticlesContainer from "../components/ArticlesContainer";
import MostViewedArticles from "../components/MostViewedArticles";

const Home = props => {
  const [articles, setArticles] = useState([]);
  const [mostViewedArticles, setMostViewedArticles] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetchArticles();
      fetchMostViewed();
    };

    fetchData();
  }, []);

  const fetchArticles = async () => {
    const { data } = await axios.get(`/api/articles/last_day`);

    setArticles(data);
  };

  const fetchMostViewed = async () => {
    const { data } = await axios.get(`/api/articles/get_most_viewed_last_day`);

    setMostViewedArticles(data);
  };

  return (
    <div>
      <Row gutter={24}>
        <Col xs={24} lg={14} xl={17}>
          <ArticlesContainer articles={articles} />
        </Col>

        <Col xs={24} lg={10} xl={7}>
          <MostViewedArticles articles={mostViewedArticles} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
