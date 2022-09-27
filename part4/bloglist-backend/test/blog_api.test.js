const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = initialBlogs.map(blog => new Blog(blog))
  const blogArray = blogs.map(blog => blog.save())
  await Promise.all(blogArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  const ids = response.body.map(res => res.id)
  ids.forEach(id => expect(id).toBeDefined())
})

test('a valid blog can be added', async () => {
  const newBlog = new Blog({
    title: 'hello',
  })

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
})

test.only('existing likes property', async () => {
  const newBlog = new Blog({
    title: 'likes'
  })
  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length - 1]).toHaveProperty('likes', 0)
})

afterAll(() => {
  mongoose.connection.close()
})
