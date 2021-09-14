/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-07 10:21:38
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-07 15:16:33
 */
import moment from 'moment'

export function fmtDate(val){
    return moment().format('YYYY-MM-DD hh-mm-ss')
}