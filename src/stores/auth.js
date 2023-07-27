import { defineStore } from "pinia";
import repository from '../api/Auth/index'
import eventBus from '../shared/eventBus';

export const useAuthStore = defineStore({
    id: 'useAuthStore',

    state: () => ({
        user: sessionStorage.user ? JSON.parse(sessionStorage.getItem("user")) : null,
        authenticated: sessionStorage.user
        ? JSON.parse(sessionStorage.getItem("user"))
        : false,
    }),

    getters: {
        authUser: (state) => state.user,
        // authenticated: (state) => state.user !== null,
    },

    actions: {
        async login(params) {
            await repository.login(params)
                .then(response => {
                    console.log(response.data);
                    this.user = response.data.result.user;
                    console.log(this.user)
                    sessionStorage.setItem("user", JSON.stringify(response.data.result.user));
                    sessionStorage.setItem("access_token", JSON.stringify(response.data.result.access_token))
                    sessionStorage.setItem("authenticated", true);
                    location.reload()
                })
                .catch((err) => {
                    eventBus.emit("alert-notification", {
                        message: err.response?.data.message,
                        alertType: "error",
                        timeout: 3000,
                        show: true,
                    });
                });
        },

        async register(params) {
            const response = await repository.register(params);
            return response;
        },
    
        async logout() {
            await repository.logout();
            this.user = null;
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("access_token");
            sessionStorage.removeItem("authenticated");
            location.reload()
        },
    }
})