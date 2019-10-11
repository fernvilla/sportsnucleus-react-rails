import axios from "axios";
import {
  FETCHING_LEAGUE,
  FETCH_LEAGUE_ERROR,
  FETCH_LEAGUE_SUCCESS,
  FETCHING_LEAGUES,
  FETCH_LEAGUES_ERROR,
  FETCH_LEAGUES_SUCCESS
} from "./actionTypes";

export const fetchingLeague = bool => ({
  type: FETCHING_LEAGUE,
  isFetching: bool
});

export const fetchLeagueError = bool => ({
  type: FETCH_LEAGUE_ERROR,
  hasErrored: bool
});

export const fetchLeagueSuccess = league => ({
  type: FETCH_LEAGUE_SUCCESS,
  league
});

export const fetchLeague = leagueId => dispatch => {
  const path = `/api/league/${leagueId}`;

  dispatch(fetchingLeague(true));
  axios
    .get(path)
    .then(res => {
      dispatch(fetchLeagueSuccess(res.data));
      dispatch(fetchingLeague(false));
    })
    .catch(err => {
      dispatch(fetchLeagueError(true));
    });
};

export const fetchingLeagues = bool => ({
  type: FETCHING_LEAGUES,
  isFetching: bool
});

export const fetchLeaguesError = bool => ({
  type: FETCH_LEAGUES_ERROR,
  hasErrored: bool
});

export const fetchLeaguesSuccess = leagues => ({
  type: FETCH_LEAGUES_SUCCESS,
  leagues
});

export const fetchLeagues = () => dispatch => {
  const path = `/api/leagues`;

  dispatch(fetchingLeagues(true));
  axios
    .get(path)
    .then(res => {
      dispatch(fetchLeaguesSuccess(res.data));
      dispatch(fetchingLeagues(false));
    })
    .catch(err => {
      dispatch(fetchLeaguesError(true));
    });
};
