import axios from "axios";

const API_URL = 'http://localhost:8080';

export const fetchDataFromApi = async (method,url,data) => {
    return(
        axios({
            method:method,
            url:`${API_URL}${url}`,
            data:data
        })
    )
}
