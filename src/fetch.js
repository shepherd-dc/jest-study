import axios from 'axios'
axios.defaults.timeout = 30000

export async function fetchCallback (fn) {
  try {
    const { data } = await axios.get('http://127.0.0.1:9000/data.json')
    fn(data)
  } catch (error) {
    fn(error.toString())
  }
}

export function fetchPromise () {
  return axios.get('http://127.0.0.1:9000/data.json')
}
