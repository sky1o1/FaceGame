import { getRequest } from '../config/axios.config.js'

export const getAllUser = (pageNo, pageLimit = 10) => {
    return getRequest(`/user?_  page=${pageNo}&_limit=${pageLimit}`)
}