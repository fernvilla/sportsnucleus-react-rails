import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticlesContainer from "../components/ArticlesContainer";

const Team = props => {
  const {
    match: {
      params: { team }
    }
  } = props;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchTeam(team);
  }, [team]);

  const fetchTeam = async team => {
    const { data } = await axios.get(`/api/articles/get_by_team/${team}`);

    setArticles(data);
  };

  return (
    <div>
      <ArticlesContainer articles={articles} />
    </div>
  );
};

export default Team;
