import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const generalState = useSelector(state => state.listPages);

  return (
    <section id="#home">
      <h1>Home section</h1>
      <p>{generalState}</p>
    </section>
  );
};

export default Home;
