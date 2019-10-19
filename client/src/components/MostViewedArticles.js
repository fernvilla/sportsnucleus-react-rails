import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { List, Layout, Typography } from "antd";

const { Paragraph } = Typography;
const { Content } = Layout;

const MostViewedArticles = props => {
  return (
    <Content
      style={{
        background: "#fff",
        padding: "1em 2em",
        margin: 0,
        boxShadow: "0 1px 2px 0 rgba(34,36,38,.15)"
      }}
    >
      <Paragraph strong>Most Viewed Articles</Paragraph>

      <List
        itemLayout="horizontal"
        dataSource={props.articles}
        size="small"
        renderItem={article => (
          <List.Item>
            <List.Item.Meta
              title={
                <Fragment>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferre"
                    style={{ color: "#1b6dc1" }}
                  >
                    {article.title}{" "}
                  </a>

                  <em>
                    ({formatDistanceToNow(new Date(article.published_date), { addSuffix: true })})
                  </em>
                </Fragment>
              }
            />
          </List.Item>
        )}
      />
    </Content>
  );
};

MostViewedArticles.propTypes = {
  articles: PropTypes.array
};

MostViewedArticles.defaultProps = {
  articles: []
};

export default MostViewedArticles;
