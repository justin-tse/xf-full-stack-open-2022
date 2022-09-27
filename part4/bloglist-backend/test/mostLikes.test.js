const { initialBlogs, mostLikes } = require('../utils/list_helper')

describe('most Likes', () => {
  test('mostLikes', () => {
    expect(mostLikes(initialBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})