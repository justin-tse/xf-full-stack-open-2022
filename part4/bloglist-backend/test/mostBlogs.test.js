const { initialBlogs, mostBlogs } = require('../utils/list_helper')

describe('most Blogs', () => {
  test('mostBlogs', () => {
    expect(mostBlogs(initialBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})
