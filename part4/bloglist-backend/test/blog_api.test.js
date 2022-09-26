const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const blogsList = require('../utils/list_helper').blogs

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = blogsList.map(blog => new Blog(blog))
  const blogArray = blogs.map(blog => blog.save())
  await Promise.all(blogArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(res => res.id)
  console.log(response.body, ids)
  ids.forEach(id => expect(id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = new Blog({
    title: 'hello'
  })

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsList.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})
