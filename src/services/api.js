/* eslint-disable prettier/prettier */
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TokenService from "./token.service";


const instance =  axios.create({
    baseURL: "http://localhost:3350",
    headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'multipart/form-data'
    }, 
})

instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken()
        if (token) {
            config.headers["x-auth-token"] = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (res) => {
        return res
    },
    async (err) => {
        const originalConfig = err.config
        // console.log(!originalConfig.__isRetryRequest)

        if (err.response) {

           

            if (err.response.status === 403 && !originalConfig.__isRetryRequest) {
                // handle infinite loop
                originalConfig._retry = true;
        
                // console.log("refresh", TokenService.getLocalRefreshToken());

                // when the refresh token are expires handle loop
                if(err.response.status === 401 && !originalConfig.__isRetryRequest){
                    originalConfig.__isRetryRequest = true
                    return err.response
                }

                try {
                    const rs = await instance.post("/api/admin/token",{
                        refreshToken : TokenService.getLocalRefreshToken()
                    })

                    console.log('Response:', rs)

                    const {accessToken} = rs.data

                    TokenService.updateNewAccessToken(accessToken)

                    return instance(originalConfig)
                } catch (_error) {
                    // console.log(_error.response)
                    if(_error.response.status === 401){
                        return _error.response
                    }
                    return Promise.reject(_error)
                }
            }

            // return err.response
        }
        return Promise.reject(err);
    }
)

export default instance