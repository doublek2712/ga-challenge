import axios from "axios"
import { BASE_URL } from "../base"
import type { UserType } from "./type"

const API_URL = BASE_URL + "/users"

export const UsersService = {
  async getUsers(ids?: number[]) {
    return await axios.get(`${API_URL}${ids ? `?id=${ids.join('&id=')}` : ''}`)
      .then((response) => response.data as UserType[])
      .catch((error) => { throw new Error(error) })
  },
  async getUser(id: string) {
    return await axios.get(`${API_URL}/${id}`)
      .then((response) => response.data as UserType)
      .catch((error) => { throw new Error(error) })
  }
}