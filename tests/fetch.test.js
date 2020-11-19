import { fetchCallback, fetchPromise } from '../src/fetch'

describe('fetchCallback', () => {
  test('fetchCallback test', (done) => {
    fetchCallback((data) => {
      if (data.code !== undefined) {
        expect(data.code).toBe(0)
      } else {
        expect(data.indexOf('failed') >= 0).toBe(true)
      }
      done()
    })
  })
})

describe('fetchPromise', () => {
  test('fetchPromise then catch test', () => {
    return fetchPromise().then(({ data }) => {
      expect(data.code).toBe(0)
    }).catch(error => {
      expect(error.toString().indexOf('failed') >= 0).toBe(true)
    })
  })

  test('fetchPromise resolves return test', () => {
    return expect(fetchPromise()).resolves.toMatchObject({
      data: {
        code: 0
      }
    })
  })

  test('fetchPromise resolves await test', async () => {
    await expect(fetchPromise()).resolves.toMatchObject({
      data: {
        code: 0
      }
    })
  })

  // test('fetchPromise rejects return test', () => {
  //   return expect(fetchPromise()).rejects.toThrow()
  // })

  // test('fetchPromise rejects return test', async () => {
  //   await expect(fetchPromise()).rejects.toThrow()
  // })

  test('fetchPromise async await test', async () => {
    try {
      const { data } = await fetchPromise()
      expect(data.code).toBe(0)
    } catch (error) {
      expect(error.toString().indexOf('failed') >= 0).toBe(true)
    }
  })
})
