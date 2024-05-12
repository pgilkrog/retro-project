import axios from 'axios'
import setAuthToken from "@/helpers/setAuthToken"

export const get = async <T> (url: string): Promise<T> => {
  checkAuthToken()
  console.log("GET", url)
 
  try { 
    const response = await axios.get(url)
    return response.data as T
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

export const post = async <T> (url: string, data: any): Promise<T> => {
  checkAuthToken()
  console.log("POST", url, data)
  try {
    return await axios.post(url, null, data)
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

export const put = async <T> (url: string, data: any): Promise<T> => {
  checkAuthToken()
  console.log("UPDATE", url, data)
  try {
    return await axios.put(url, null, data)
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

export const del = async <T> (url: string): Promise<T> => {
  checkAuthToken()
  console.log("DELETE", url)
  try {
    return await axios.delete(url)
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

const checkAuthToken = () => {
  const token = sessionStorage.getItem('token')
  if (token != undefined) setAuthToken(token)
}