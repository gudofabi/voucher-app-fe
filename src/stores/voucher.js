import { defineStore } from "pinia";
import repository from '../api/Voucher/index'
import eventBus from '../shared/eventBus';

export const useVoucherStore = defineStore({
    id: 'useVoucherStore',

    state: () => ({
        vouchers: [],

        loading: false,

        // pagination
        paginationNo: null,
        currentPage: null,
        lastPage: null,
        totalPages: null,
        meta: null,
    }),

    getters: {
        getVouchers: (state) => state.vouchers
    },

    actions: {
        async getVoucherByUserId(params, id) {
            this.loading = true;
            await repository.getVoucherByUserId(params, id)
                .then(response => {
                    this.loading = false;
                    this.vouchers = response.data.result.data
                    this.currentPage = response.data.result.current_page;
                    this.lastPage = response.data.result.last_page;
                    this.meta =  response.data.result;
                    this.paginationNo = response.data.result.total/response.data.result.per_page;
                })
                .catch(err => {
                    this.loading = false;
                })
        },

        async updateVoucher(voucher_id) {
            const params = { 
                word: this.getRandomWord(),
            }

            const response = await repository.updateVoucher(params, voucher_id)

            return response;
        },

        async createVoucher() {
            const params = { 
                word: this.getRandomWord(), 
                user_id: JSON.parse(sessionStorage.user)?.id 
            }
            const response = await repository.createVoucher(params)

            return response;
        },

        async deleteVoucher(id)
        {
            const response = await repository.deleteVoucher(id)
            return response;
        },

        getRandomWord() {
            // Array of words
            var words = ['apple', 'banana', 'cat', 'dog', 'elephant', 'flower', 'grape', 'honey', 'ice cream', 'juice', 'kiwi', 'lemon', 'mango', 'nut', 'orange', 'pineapple', 'quince', 'raspberry', 'strawberry', 'tomato', 'umbrella', 'vanilla', 'watermelon', 'xerox', 'yogurt', 'zebra'];
        
            // Get a random index
            var randomIndex = Math.floor(Math.random() * words.length);
        
            // Return the word at the random index
            return words[randomIndex];
        }
    }
})