import React, { useState, useEffect } from "react";
import { Layout, Menu, BackTop, Icon } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import _isNil from "lodash/isNil";
import {
  FaBasketballBall,
  FaBaseballBall,
  FaHockeyPuck,
  FaFutbol,
  FaFootballBall
} from "react-icons/fa";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const leagueIconMap = new Map([
  ["NBA", FaBasketballBall],
  ["MLB", FaBaseballBall],
  ["WNBA", FaBasketballBall],
  ["NHL", FaHockeyPuck],
  ["MLS", FaFutbol],
  ["NFL", FaFootballBall],
  ["NCAA", FaFootballBall]
]);

let SiteLayout = props => {
  const { leagues, location } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    if (location.pathname === "/") {
      setOpenKeys([]);
    } else {
      const selectedParentLeague = leagues.find(l =>
        l.teams.find(t => `/teams/${t.canonical}` === location.pathname)
      );

      if (selectedParentLeague) setOpenKeys([selectedParentLeague.abbreviation]);
    }
  }, [leagues, location.pathname]);

  const onCollapse = collapsed => setCollapsed(collapsed);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
          selectedKeys={[`${location.pathname}`]}
          openKeys={openKeys}
          onOpenChange={props => setOpenKeys(props)}
        >
          {leagues.map(league => {
            return (
              <SubMenu
                key={league.abbreviation}
                title={
                  <span>
                    <Icon component={leagueIconMap.get(league.abbreviation)} />
                    <span>{league.abbreviation}</span>
                  </span>
                }
              >
                {league.teams &&
                  league.teams.map(team => {
                    return (
                      <Menu.Item key={`/teams/${team.canonical}`}>
                        <Link to={`/teams/${team.canonical}`}>{team.abbreviation}</Link>
                      </Menu.Item>
                    );
                  })}
              </SubMenu>
            );
          })}
        </Menu>
      </Sider>

      <Layout>
        <Content style={{ margin: "2.5em", overflow: "initial" }}>
          {props.children}

          <BackTop />
        </Content>
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
