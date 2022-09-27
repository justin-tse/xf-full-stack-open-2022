const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
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

const mostLikes = (blogs) => {
  const mapped = new Map()
  let name = { author: '', likes: 0 }

  blogs.forEach((blog) => {
    const { author, likes } = blog
    if (mapped.has(author)) {
      mapped.set(author, mapped.get(author) + likes)
    } else {
      mapped.set(author, likes)
    }
    if (name.likes < mapped.get(author)) {
      name.author = author
      name.likes = mapped.get(author)
    }
  })

  return name
}

const Blog = require('../models/blog')
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  blogsInDb,
}