const { initialBlogs, favoriteBlog } = require('../utils/list_helper.js')

describe('the top favorite blog', () => {
  test('the most like', () => {
    expect(favoriteBlog(initialBlogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

