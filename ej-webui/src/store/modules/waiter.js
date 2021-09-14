/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-07 11:31:25
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-10 20:32:47
 */
import request from '@/utils/request'
export default {
    namespaced: true,
    state(){
        return{
            waiters: []
        }
    },
    mutations:{
        SET_WAITER(state,payload){
            state.waiters = payload
        }
    },
    actions:{
        async findAllWaiters({ commit }){
            let res = await request.get('/baseUser/cascadeRoleFindAll')
               let waiters = res.data.filter(user =>{
                    return user.roles.name == '员工'
                })
                commit('SET_WAITER', waiters)
            }
        }
    }