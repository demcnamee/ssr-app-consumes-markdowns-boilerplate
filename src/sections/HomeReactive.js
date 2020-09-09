import React from 'react';
import { useSelector } from 'react-redux';

/*
  this is the same component as Home, but this uses js (redux) for get the post list
*/

const Home = () => {
  const pageTitles = useSelector(state => state.pageTitles);

  return (
    <section id="#home">
      <h1>Home section Reactive</h1>
      <p>It gets the list from redux store</p>
      <ul>
        {pageTitles.map((title, i) => (
          <li key={i}>
            <a href={`http://localhost:3000/${title}`}>{title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
