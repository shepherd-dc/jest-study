import runCallback, { createObject } from '../src/mock'

import { fetchPromise } from '../src/fetch'
import axios from 'axios'
jest.mock('axios')

/**
 * 1.捕获函数的调用，返回结果，调用顺序以及 this指向
 * 2.自由设置函数的返回结果
 * 3.改变函数的内部实现
 */
describe('mock function', () => {
  let fn = null
  beforeEach(() => {
    fn = jest.fn()
  })

  test('toBeCalled', () => {
    const fn = jest.fn()
    runCallback(fn)
    expect(fn).toBeCalled()
  })

  test('fn.mock.calls', () => {
    const fn = jest.fn()
    runCallback(fn, 'test')
    runCallback(fn, 'test1', 'test2')
    expect(fn.mock.calls.length).toBe(2)
    expect(fn.mock.calls[0]).toEqual(['test'])
    expect(fn).toBeCalledWith('test')
    expect(fn).toBeCalledWith('test1', 'test2')
  })

  test('fn.mock.invocationCallOrder', () => {
    runCallback(fn)
    runCallback(fn)
    runCallback(fn)
    expect(fn.mock.invocationCallOrder).toEqual([4, 5, 6])
  })

  test('fn.mock.results', () => {
    fn = jest.fn((...args) => {
      return args.join(',')
    })
    runCallback(fn, 666, 777)

    fn.mockImplementationOnce(() => {
      return this
    })
    runCallback(fn)

    fn.mockReturnValueOnce('666').mockReturnValueOnce('777')
    runCallback(fn)
    runCallback(fn)

    expect(fn.mock.results[0].value).toEqual('666,777')
    expect(fn.mock.results[1].value).toBeUndefined()
    expect(fn.mock.results[2].value).toEqual('666')
    expect(fn.mock.results[3].value).toEqual('777')
  })

  test('fn.mock.instances', () => {
    createObject(fn)
    runCallback(fn)
    expect(fn.mock.instances[0]).toMatchObject({})
    expect(fn.mock.instances[1]).toBeUndefined()
  })
})

describe('mock axios', () => {
  test('mockResolvedValue', async () => {
    axios.get.mockResolvedValue({ data: 'ok' })
    await fetchPromise().then(({ data }) => {
      expect(data).toBe('ok')
    })
  })

  test('mockResolvedValueOnce', async () => {
    axios.get.mockResolvedValueOnce({ data: 'hello' })
    axios.get.mockResolvedValueOnce({ data: 'world' })
    await fetchPromise().then(({ data }) => {
      expect(data).toBe('hello')
    })
    await fetchPromise().then(({ data }) => {
      expect(data).toBe('world')
    })
  })
})
