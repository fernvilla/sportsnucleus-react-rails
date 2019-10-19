import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticlesContainer from "../components/ArticlesContainer";
import { Row, Col } from "antd";
import MostViewedArticles from "../components/MostViewedArticles";

const Team = props => {
  const {
    match: { params }
  } = props;
  const [team, setTeam] = useState({});
  const [fetchingTeam, setFetchingTeam] = useState(false);
  const [mostViewedArticles, setMostViewedArticles] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetchTeam(params.canonical);
      fetchMostViewed(params.canonical);
    };

    fetchData();
  }, [params.canonical]);

  const fetchTeam = async team => {
    setFetchingTeam(true);
    const { data } = await axios.get(`/api/teams/get_by_canonical/${team}`);

    setTeam(data);
    setFetchingTeam(false);
  };

  const fetchMostViewed = async team => {
    const { data } = await axios.get(`/api/articles/get_most_viewed_by_team/${team}`);

    setMostViewedArticles(data);
  };

  return (
    <div>
      <Row gutter={24}>
        <Col xs={24} lg={14} xl={17}>
          <ArticlesContainer articles={team.articles} loading={fetchingTeam} showTitle={false} />
        </Col>

        <Col xs={24} lg={10} xl={7}>
          <MostViewedArticles articles={mostViewedArticles} />
        </Col>
      </Row>
    </div>
  );
};

export default Team;
