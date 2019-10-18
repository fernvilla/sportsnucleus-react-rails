import React from "react";
import PropTypes from "prop-types";
import { List, Layout, Avatar } from "antd";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";

const { Content } = Layout;

const ArticlesContainer = props => {
  const { articles } = props;

  const updateCount = id => {
    axios.patch(`/api/articles/update_count/${id}`);
  };

  return (
    <Content
      style={{
        background: "#fff",
        padding: "1em 2em 2em",
        margin: 0,
        boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)"
      }}
    >
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 20
        }}
        dataSource={articles}
        footer={null}
        renderItem={article => (
          <List.Item
            key={article.title}
            actions={null}
            extra={null}
            onClick={() => updateCount(article.id)}
          >
            <List.Item.Meta
              avatar={<Avatar icon="read" style={{ background: "#1b6dc1" }} />}
              title={
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferre"
                  style={{ color: "#1b6dc1" }}
                >
                  {article.title}
                </a>
              }
              description={
                <em>
                  {article.source.name} (
                  {formatDistanceToNow(new Date(article.published_date), { addSuffix: true })})
                </em>
              }
            />
            {article.summary && <span>Summary: {article.summary}</span>}
          </List.Item>
        )}
      />
    </Content>
  );
};

ArticlesContainer.propTypes = {
  articles: PropTypes.array
};

ArticlesContainer.defaultProps = {
  articles: []
};

export default ArticlesContainer;
