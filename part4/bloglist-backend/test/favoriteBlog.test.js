const { blogs, favoriteBlog } = require('../utils/list_helper.js')

describe('the top favorite blog', () => {
  test('the most like', () => {
    expect(favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

