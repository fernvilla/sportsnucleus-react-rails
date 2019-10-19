import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticlesContainer from "../components/ArticlesContainer";
import { Row, Col, Layout, Typography } from "antd";
import MostViewedArticles from "../components/MostViewedArticles";

const { Content } = Layout;
const { Title } = Typography;

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
      <Row gutter={[24, 24]}>
        <Col>
          <Content
            style={{
              background: "#fff",
              padding: "1em 2em",
              margin: 0,
              boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)"
            }}
          >
            <Title level={3}>{team.name}</Title>
            <span>
              <a href={team.website_url} target="_blank" rel="noopener noreferrer">
                {team.website_url}
              </a>
            </span>
          </Content>
        </Col>

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
