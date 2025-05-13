import axios from "axios"
import { BASE_URL } from "../base"
import type { AlbumType } from "./type"

const API_URL = BASE_URL + "/albums"

export const AlbumsService = {
  async getAlbums(pageSize: number, currentPage: number, userId?: number) {
    return await axios.get(
      `${API_URL}?_start=${pageSize * (currentPage - 1)}&_end=${pageSize * currentPage}` +
      (userId ? `&userId=${userId}` : '')
    )
      .then((response) => response.data as AlbumType[])
      .catch((error) => { throw new Error(error) })
  },
  async getAlbum(id: string) {
    return await axios.get(`${API_URL}/${id}`)
      .then((response) => response.data as AlbumType)
      .catch((error) => { throw new Error(error) })
  }
}