import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

let SiteLayout = props => {
  const { leagues, location } = props;
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => setCollapsed(collapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <div style={{ textAlign: "center" }}>
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}${
                collapsed ? "/images/logo-transparent-solo.png" : "/images/logo-transparent.png"
              }`}
              alt="Logo"
              style={{
                height: "24px",
                margin: "16px 0"
              }}
            />
          </Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          style={{ height: "100%" }}
          selectedKeys={[`${location.pathname}`]}
        >
          {leagues.map((league, i) => {
            return (
              <SubMenu key={league.abbreviation} title={<span>{league.abbreviation}</span>}>
                {league.teams &&
                  league.teams.map(team => {
                    return (
                      <Menu.Item key={`/teams/${team.canonical}`}>
                        <Link to={`/teams/${team.canonical}`}>{team.name}</Link>
                      </Menu.Item>
                    );
                  })}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ margin: "2.5em", overflow: "initial" }}>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}>Sports Nucleus ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = state => ({
  leagues: state.leagues
});

SiteLayout = connect(
  mapStateToProps,
  null
)(SiteLayout);

export default withRouter(SiteLayout);
