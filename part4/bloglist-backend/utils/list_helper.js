const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes
  const likesArr = blogs.map(blog => blog.likes)
  return likesArr.reduce((prev, curv) => prev + curv)
}

const favoriteBlog = (blogs) => {
  const mapBlogs = blogs.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
    }
  })
  const likseArray = mapBlogs.map(blog => blog.likes)
  const max = Math.max(...likseArray)
  return mapBlogs.find(blog => blog.likes === max)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}