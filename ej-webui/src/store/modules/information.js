/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-09 21:43:44
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-10 10:30:17
 */
import request from '@/utils/request'

export default {
    namespaced: true,
    state() {
        return {

        }
    },
    mutations: {

    },
    actions: {
        async findAllInformation() {
            let res = await request.get('/category/findAll', {
                params: { page: 1, pageSize: 1000 }
            });
            return res
        }
    }
}