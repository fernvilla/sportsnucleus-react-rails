import React from "react";
import PropTypes from "prop-types";
import { List, Avatar, Icon, Layout } from "antd";
import { formatDistanceToNow } from "date-fns";

const { Content, Footer, Sider } = Layout;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const ArticlesContainer = props => {
  const { articles } = props;

  return (
    <Content
      style={{
        background: "#fff",
        padding: "1em 2em 2em",
        margin: 0,
        border: "1px solid #ccc"
      }}
    >
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            // console.log(page);
          },
          pageSize: 10
        }}
        dataSource={articles}
        footer={null}
        renderItem={article => (
          <List.Item key={article.title} actions={null} extra={null}>
            <List.Item.Meta
              avatar={null}
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
