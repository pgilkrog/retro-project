import axios, { AxiosError } from 'axios'

const apiUrl = ''

interface ApiReponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

export class HttpService {
  private async makeRequest(url: string, method: string, data?: any) {
    try {
      const options: RequestInit = {
        method,
        headers,
        credentials: 'include',
        mode: 'cors'
      }

      if (data) {
        options.body = JSON.stringify(data)
      }

      const response = await fetch(url, options)
      return this.handleResponse(response)
    } catch (error) {
      console.error(`${method} request failed:`, error)
      throw error
    }
  }

  async handleResponse(response: Response) {
    if (!response.ok) {
      const errorMessage = await response.text()
      throw new Error(`HTTP Error: ${response.status} - ${errorMessage}`)

      // Or handle 401 and 403 like so:
      // if (response.status === 401 || response.status === 403) {
      //   // Handle 401/403 errors
      // } else {
      //   const errorMessage = await response.text()
      //   throw new Error(`HTTP Error: ${response.status} - ${errorMessage}`)
      // }
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return response.json()
    } else {
      return response
    }
  }

  async get(url: string) {
    return this.makeRequest(url, 'GET')
  }

  async post(url: string, data: any) {
    return this.makeRequest(url, 'POST', data)
  }

  async put(url: string, data?: any) {
    return this.makeRequest(url, 'PUT', data)
  }

  async delete(url: string, data: any) {
    return this.makeRequest(url, 'DELETE', data)
  }
}

export const httpService = new HttpService()