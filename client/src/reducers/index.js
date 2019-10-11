import { combineReducers } from "redux";
import * as leagueReducers from "./leagueReducers";

export default combineReducers({ ...leagueReducers });
