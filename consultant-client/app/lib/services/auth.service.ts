import API from "./api"

export const AuthService = {

    login: async(param: any) => {
        try{
            const { data } = await API.post("/auth/google", param, { withCredentials: true });
            return { error: false, payload: data };
        }catch(e: any){
            return { error: true, payload: e.message }
        }
    },

    getAuthUser: async() => {
        try{
            const { data } = await API.get("/user/me", { withCredentials: true });
            return { error: false, payload: data };
        }catch(e: any){
            return { error: true, payload: e.message }
        }
    },

    logout: async() => {
        try{
            const { data } = await API.post("/auth/logout", {}, { withCredentials: true });
            return { error: false, payload: data };
        }catch(e: any){
            return { error: true, payload: e.message }
        }
    },

    searchQuery: async(query: any) => {
        try{
            const { data } = await API.post("/prompt", query, { withCredentials: true });
            return { error: false, payload: data };
        }catch(e: any){
            return { error: true, payload: e.message }
        }
    },
}