const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  if (blogs.length === 1) return blogs[0].likes
  const likesArr = blogs.map(blog => blog.likes)
  return likesArr.reduce((prev, curv) => prev + curv)
}

module.exports = {
  dummy,
  totalLikes
}