/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-10 19:41:57
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-11 13:54:29
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
        // 查询角色分类
        async findAllRole() {
            let res = request.get('/role/findAll', {
                
            });
            return res
        }
    }
}