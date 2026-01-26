import axios, { type AxiosResponse } from "axios"
import type { Contact_Model, Fetch_Response } from "./database_models"
export class _Axios {
    static #link = "http://localhost:5000"
    static Get_Circuit():Promise<AxiosResponse<Fetch_Response>> {
        return axios.get<Fetch_Response>(this.#link)
    }
    static Set_Contact(Data:Contact_Model):Promise<AxiosResponse<Fetch_Response>> {
        console.log(Data)
        return axios.post<Fetch_Response>(this.#link,Data)
    }
}