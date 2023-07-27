import { instance } from "../index"

export default {

    login(params) {
        return instance.post(`/login`, params);
    },

    register(params) {
        return instance.post(`/register`, params);
    },

    logout() {
        return instance.delete(`/logout`);
    }

}