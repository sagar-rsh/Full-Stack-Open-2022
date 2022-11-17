const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));

  return blogs.find((blog) => blog.likes === mostLikes);
};

const mostBlogs = (blogs) => {
  const sumAuthorBlogs = _(blogs)
    .groupBy('author')
    .map((blogObjs, key) => ({
      author: key,
      blogs: blogObjs.length,
    }))
    .value();

  const maxBlogs = Math.max(...sumAuthorBlogs.map((obj) => obj.blogs));

  return sumAuthorBlogs.find((obj) => obj.blogs === maxBlogs);
};

const mostLikes = (blogs) => {
  const sumAuthorLikes = _(blogs)
    .groupBy('author')
    .map((blogObjs, key) => ({
      author: key,
      likes: _.sumBy(blogObjs, 'likes'),
    }))
    .value();

  return _.maxBy(sumAuthorLikes, 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
