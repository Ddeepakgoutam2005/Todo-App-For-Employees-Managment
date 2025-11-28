import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api'

export const api = {
  async getEmployees() {
    const { data } = await axios.get(`${API_BASE}/employees`)
    return data
  },
  async getEmployee(id) {
    const { data } = await axios.get(`${API_BASE}/employees/${id}`)
    return data
  },
  async createEmployee(payload) {
    const { data } = await axios.post(`${API_BASE}/employees`, payload)
    return data
  },
  async updateEmployee(id, payload) {
    const { data } = await axios.put(`${API_BASE}/employees/${id}`, payload)
    return data
  },
  async deleteEmployee(id) {
    await axios.delete(`${API_BASE}/employees/${id}`)
  },
  async getTasks(params = {}) {
    const { data } = await axios.get(`${API_BASE}/tasks`, { params })
    return data
  },
  async getTask(id) {
    const { data } = await axios.get(`${API_BASE}/tasks/${id}`)
    return data
  },
  async createTask(payload) {
    const { data } = await axios.post(`${API_BASE}/tasks`, payload)
    return data
  },
  async updateTask(id, payload) {
    const { data } = await axios.put(`${API_BASE}/tasks/${id}`, payload)
    return data
  },
  async deleteTask(id) {
    await axios.delete(`${API_BASE}/tasks/${id}`)
  },
}