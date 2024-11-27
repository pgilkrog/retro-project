import axios from 'axios'
import setAuthToken from '@/helpers/setAuthToken'

const baseUrl: string = import.meta.env.VITE_BASE_URL

export const get = async <T>(url: string): Promise<T> => {
  checkAuthToken()
  console.log('GET', url)
  try {
    const response = await axios.get(baseUrl + url)
    return response.data as T
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

export const post = async <T>(url: string, data: object): Promise<T> => {
  checkAuthToken()
  console.log('POST', url, data)
  try {
    return await axios.post(baseUrl + url, null, data )
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

export const put = async <T>(url: string, data: object): Promise<T> => {
  checkAuthToken()
  console.log('UPDATE', url, data)
  try {
    return await axios.put(baseUrl + url, null,  data )
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

export const del = async <T>(url: string): Promise<T> => {
  checkAuthToken()
  console.log('DELETE', url)
  try {
    return await axios.delete(baseUrl + url)
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

const checkAuthToken = () => {
  const token = sessionStorage.getItem('token')
  if (token != undefined) setAuthToken(token)
}
