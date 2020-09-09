import React from 'react';

const Home = ({ content }) => {
  return (
    <section id="#home">
      <h1>Home section</h1>
      <ul>
        {content.map((title, i) => (
          <li key={i}>
            <a href={`http://localhost:3000/posts/${title}`}>{title}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
