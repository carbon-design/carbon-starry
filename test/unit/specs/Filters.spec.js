import * as Filters from '~/filters'

describe('filters.js', () => {
  it('should be uppercase', () => {
    expect(Filters.uppercase('abc'))
      .to.equal('ABC')
  })
})
