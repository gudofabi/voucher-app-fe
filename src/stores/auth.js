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
        roles: sessionStorage.user ? JSON.parse(sessionStorage.getItem("roles")) : null,
    }),

    getters: {
        authUser: (state) => state.user,
        getRoles: (state) => state.roles
        // authenticated: (state) => state.user !== null,
    },

    actions: {
        async login(params) {
            await repository.login(params)
                .then(response => {
                    this.user = response.data.result.user;
                    this.roles = response.data.result.roles;
                    sessionStorage.setItem("user", JSON.stringify(response.data.result.user));
                    sessionStorage.setItem("access_token", JSON.stringify(response.data.result.access_token))
                    sessionStorage.setItem("authenticated", true);
                    sessionStorage.setItem("roles", JSON.stringify(response.data.result.roles));
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
            sessionStorage.removeItem("roles");
            location.reload()
        },
    }
})