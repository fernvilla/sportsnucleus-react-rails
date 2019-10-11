import React, { useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Spin } from "antd";
import { fetchLeagues } from "./actions";
import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";

const App = props => {
  useEffect(() => {
    const fetchInitialData = () => props.fetchLeagues();

    fetchInitialData();
  }, []);

  return (
    <SiteLayout>
      {props.fetchingLeagues ? (
        <Spin size="large" />
      ) : (
        <Fragment>
          <Route exact component={Home} />
        </Fragment>
      )}
    </SiteLayout>
  );
};

const mapStateToProps = state => ({
  fetchLeaguesError: state.fetchLeaguesError,
  fetchingLeagues: state.fetchingLeagues
});

const mapDispatchToProps = dispatch => ({
  fetchLeagues: () => dispatch(fetchLeagues())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
