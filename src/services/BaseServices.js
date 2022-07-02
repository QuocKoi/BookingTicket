import axios from "axios";
import { DOMAIN,TOKEN } from "../util/settings/config";

export class BaseServices{
    get(url){
        return axios({
            url:`${DOMAIN}${url}`,
            method:'GET',
            headers:{Authorization:'Bearer '+localStorage.getItem(TOKEN)}
        })
    }
    post(url,data){
        return axios({
            method:'POST',
            url:`${DOMAIN}${url}`,
            data,
            headers:{Authorization:'Bearer '+localStorage.getItem(TOKEN)}
        })
    }
    put(url,data){
        return axios({
            method:'PUT',
            url:`${DOMAIN}${url}`,
            data,
            headers:{Authorization:'Bearer '+localStorage.getItem(TOKEN)}
        }) 
    }
    delete(url){
        return axios({
            method:'DELETE',
            url:`${DOMAIN}${url}`,
            headers:{Authorization:'Bearer '+localStorage.getItem(TOKEN)}
        }) 
    }
}