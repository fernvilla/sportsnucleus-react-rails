import React, { useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Spin } from "antd";
import { fetchLeagues } from "./actions";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Team from "./pages/Team";

const App = props => {
  const {
    match: { path },
    fetchingLeagues,
    fetchLeagues
  } = props;

  useEffect(() => {
    fetchLeagues();
  }, [fetchLeagues]);

  return (
    <SiteLayout>
      {fetchingLeagues ? (
        <Spin size="large" />
      ) : (
        <Fragment>
          <Route path={path} exact component={Home} />
          <Route path="/teams/:canonical" component={Team} />
        </Fragment>
      )}
    </SiteLayout>
  );
};

const mapStateToProps = state => ({
  fetchingLeagues: state.fetchingLeagues
});

const mapDispatchToProps = dispatch => ({
  fetchLeagues: () => dispatch(fetchLeagues())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
