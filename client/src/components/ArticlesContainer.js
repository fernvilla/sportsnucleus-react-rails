import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { List, Layout, Avatar, Typography } from "antd";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { Content } = Layout;
const { Title } = Typography;

const ArticleTeam = styled.span`
  color: #333;

  &:hover {
    opacity: 0.8;
    transition: 0.5s ease;
    text-decoration: underline;
  }
`;

const ArticleLink = styled.a`
  && {
    color: #1b6dc1;

    &:hover {
      opacity: 0.8;
      transition: 0.5s ease;
    }

    &:visited {
      color: #9e9e9e;
    }
  }
`;

const ArticlesContainer = props => {
  const { articles, loading, showTitle } = props;

  const updateCount = id => {
    axios.patch(`/api/articles/update_count/${id}`);
  };

  return (
    <Fragment>
      <Content
        style={{
          background: "#fff",
          padding: "1em 2em",
          margin: 0,
          boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)"
        }}
      >
        {showTitle && <Title level={4}>Latest Headlines</Title>}

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 20
          }}
          loading={loading}
          dataSource={articles}
          footer={null}
          renderItem={article => (
            <List.Item
              key={article.title}
              actions={null}
              extra={
                article.image && <img width={100} height="auto" alt="logo" src={article.image} />
              }
              onClick={() => updateCount(article.id)}
            >
              <List.Item.Meta
                avatar={<Avatar icon="read" style={{ background: "#1b6dc1" }} />}
                title={
                  <ArticleLink href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </ArticleLink>
                }
                description={
                  <span>
                    {article.team && (
                      <span>
                        <Link to={`/teams/${article.team.canonical}`}>
                          <ArticleTeam>{`${article.team.name} `}</ArticleTeam>
                        </Link>
                        -{" "}
                      </span>
                    )}

                    <em>
                      {article.source.name} (
                      {formatDistanceToNow(new Date(article.published_date), { addSuffix: true })})
                    </em>
                  </span>
                }
              />
              {article.summary && <span>Summary: {article.summary}</span>}
            </List.Item>
          )}
        />
      </Content>
    </Fragment>
  );
};

ArticlesContainer.propTypes = {
  articles: PropTypes.array,
  loading: PropTypes.bool,
  showTitle: PropTypes.bool
};

ArticlesContainer.defaultProps = {
  articles: [],
  loading: false,
  showTitle: true
};

export default ArticlesContainer;
