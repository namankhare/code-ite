import axios from "axios";
import { API } from "../backend";


const useAxios = () => {
    const axiosInstance = axios.create({
        API
    });
    // TODO: save data
    axiosInstance.interceptors.request.use(async req => {
        const response = await axios.post(`${API}/auth/renewAccessToken/`, {
            // refresh: authTokens.refresh
        });
        return axiosInstance
    })

    return (
        <div>

        </div>
    )
}

export default useAxios
