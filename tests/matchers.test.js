// 匹配器 matchers toBe: ===
test('测试10与10相匹配', () => {
  const a = 10
  expect(a).toBe(10)
})

// toEqual: 内容相等
test('测试对象内容相等', () => {
  const a = { one: 1 }
  expect(a).toEqual({ one: 1 })
})

// 真假相关的匹配器
test('匹配器 toBeNull', () => {
  const a = null
  expect(a).toBeNull()
})

test('匹配器 toBeUndefined', () => {
  const a = undefined
  expect(a).toBeUndefined()
})

test('匹配器 toBeDefined', () => {
  const a = null
  expect(a).toBeDefined()
})

test('匹配器 toBeTruthy', () => {
  const a = 1
  expect(a).toBeTruthy()
})

test('匹配器 toBeFalsy', () => {
  const a = 0
  expect(a).toBeFalsy()
})

// 取反
test('匹配器 not', () => {
  const a = 0
  expect(a).not.toBeTruthy()
})

// 数字相关的匹配器
test('匹配器 toBeGreaterThan', () => {
  const n = 10
  expect(n).toBeGreaterThan(9)
})

test('匹配器 toBeGreaterThanOrEqual', () => {
  const n = 10
  expect(n).toBeGreaterThanOrEqual(10)
})

test('匹配器 toBeLessThan', () => {
  const n = 10
  expect(n).toBeLessThan(11)
})

test('匹配器 toBeLessThanOrEqual', () => {
  const n = 10
  expect(n).toBeLessThanOrEqual(10)
})

test('匹配器 toBeCloseTo', () => {
  const n1 = 0.1
  const n2 = 0.2
  // expect(n1 + n2).toEqual(0.3)
  // 浮点数运算
  expect(n1 + n2).toBeCloseTo(0.3)
})

// String相关的匹配器
test('匹配器 toMatch', () => {
  const str = 'https://shepherdnet.top'
  expect(str).toMatch('shepherd')
  expect(str).toMatch(/^http/)
})

// Array, Set
test('匹配器 toContain', () => {
  const arr = ['https', 'shepherdnet', 'top']
  const data = new Set(arr)
  expect(arr).toContain('shepherdnet')
  expect(data).toContain('https')
})

// 异常
function throwNewError () {
  throw new Error('error')
}
test('匹配器 toThrow', () => {
  expect(throwNewError).toThrow()
  expect(throwNewError).toThrow('error')
  expect(throwNewError).toThrow(/err/)
})
