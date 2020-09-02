import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const generalState = useSelector(state => state.listPages.pageTitles);
  const fetchPage = title => {
    //const postPage = fetch("")
  };

  return (
    <section id="#home">
      <h1>Home section</h1>
      {generalState.map((title, i) => (
        <a>{title}</a>
      ))}
    </section>
  );
};

export default Home;
