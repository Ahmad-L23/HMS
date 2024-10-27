import axios from "axios"
import config from '../config'

const createUser = data => axios.post(`${config.apiUrl}/auth/signup`,data)
const loginUser = data => axios.post(`${config.apiUrl}/auth/login`, data)

const usersApi = {createUser, loginUser}
export default usersApi