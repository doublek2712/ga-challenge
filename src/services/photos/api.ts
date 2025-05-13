import axios from "axios"
import { BASE_URL } from "../base"
import type { PhotoType } from "./type"

const API_URL = BASE_URL + "/photos"

export const PhotosService = {
  async getPhotos(albumId: number) {
    return await axios.get(`${API_URL}?albumId=${albumId}`)
      .then((response) => response.data as PhotoType[])
      .catch((error) => { throw new Error(error) })
  }
}