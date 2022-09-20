const { blogs, mostBlogs } = require('../utils/list_helper')

describe('most Blogs', () => {
  test('mostBlogs', () => {
    expect(mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})
