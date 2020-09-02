import React from 'react';

const Post = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
};

export default Post;
