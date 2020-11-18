// const { add, minus, multiply } = require('../src/math')
// jest使用es module方式引入，需要配置babel
import { add, minus, multiply } from '../src/math'

test('测试加法 8 + 5', () => {
  expect(add(8, 5)).toBe(13)
})

test('测试减法 8 + 5', () => {
  expect(minus(8, 5)).toBe(3)
})

test('测试乘法 8 + 5', () => {
  expect(multiply(8, 5)).toBe(40)
})
