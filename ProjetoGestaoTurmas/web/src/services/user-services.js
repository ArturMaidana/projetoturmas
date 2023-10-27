
import { api } from "./api";


export async function registerUser(data) {
    const result = await api.post('/register', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}

export async function loginUser(data) {
    const result = await api.post('/login', data);
    sessionStorage.setItem('token', JSON.stringify(result.data.accessToken));
}
