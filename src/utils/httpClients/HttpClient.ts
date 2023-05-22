import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

interface ApiError {
  message: string
}

export class HttpClient {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL })
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data
  }

  private handleError(error: Error | AxiosResponse<ApiError> | any): never {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      throw new Error('An error occurred')
    }
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config)
      return this.handleResponse(response)
    } catch (error) {
      this.handleError(error)
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config)
      return this.handleResponse(response)
    } catch (error) {
      this.handleError(error)
    }
  }
}
