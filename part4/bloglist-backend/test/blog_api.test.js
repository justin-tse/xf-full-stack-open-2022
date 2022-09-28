const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
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

test('existing likes property', async () => {
  const newBlog = new Blog({
    title: 'likes'
  })

  await api
    .post('/api/blogs')
    .send(newBlog)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length - 1]).toHaveProperty('likes', 0)
})

test('verifies that if the title and url properties are missing from the request data', async () => {
  const newBlog = new Blog({
    // title: 'likes',
    // url: 'www'
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
}, 50000)

test('delete a single blog', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})
