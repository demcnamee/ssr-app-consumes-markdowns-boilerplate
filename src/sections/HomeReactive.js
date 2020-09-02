import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const pageTitles = useSelector(state => state.pageTitles);
  console.log(pageTitles);

  return (
    <section id="#home">
      <h1>Home section Reactive</h1>
      <p>It gets the list from redux store</p>
      <ul>
        {pageTitles.map((title, i) => (
          <li>
            <a href={`http://localhost:3000/${title}`} key={i}>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
