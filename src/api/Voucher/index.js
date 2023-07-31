import { instance } from "../index"

export default {

    createVoucher(params) {
        return instance.post(`/vouchers`, params);
    },

    updateVoucher(params, id) {
        return instance.patch(`/vouchers/${id}`, params);
    },

    getVoucherByUserId(params, id)
    {
        return instance.get(`/vouchers/${id}`, { params });
    },

    deleteVoucher(id)
    {
        return instance.delete(`/vouchers/${id}`);
    }

}