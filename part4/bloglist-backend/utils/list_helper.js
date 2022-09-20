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

const mostBlogs = (blogs) => {
  const mapped = new Map()
  let name = { author: '', blogs: 0 }

  blogs.forEach((blog) => {
    const { author } = blog
    if (mapped.has(author)) {
      mapped.set(author, mapped.get(author) + 1)
    } else {
      mapped.set(author, 1)
    }
    if (name.blogs < mapped.get(author)) {
      name.author = author
      name.blogs = mapped.get(author)
    }
  })

  return name
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}