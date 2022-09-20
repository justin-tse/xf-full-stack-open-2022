const { blogs, mostLikes } = require('../utils/list_helper')

describe('most Likes', () => {
  test('mostLikes', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})