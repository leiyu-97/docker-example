import axios from 'axios'

const { BASE_API } = process.env

const service = axios.create({
  baseURL: BASE_API,
  timeout: 5000,
  xsrfCookieName: 'csrfToken',
  xsrfHeaderName: 'x-csrf-token',
})

export default service
