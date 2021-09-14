/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-03 15:07:59
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-03 17:01:44
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
        async findAllCategories() {
            let res = await request.get('/productCategory/pageQuery', {
                params: { page: 1, pageSize: 1000 }
            });
            return res
        }
    }
}