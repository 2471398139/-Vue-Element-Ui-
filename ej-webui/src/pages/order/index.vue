<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: xuxu
 * @Date: 2021-09-06 14:55:55
 * @LastEditors: xuxu
 * @LastEditTime: 2021-09-09 19:09:14
-->
<template>
    <div class="order">
        <!-- 标签导航 -->
        <el-tabs v-model="activeName" @tab-click="tabClickHandler">
            <el-tab-pane label="所有订单" name="first">
                <order-table status=""></order-table>
            </el-tab-pane>
            <el-tab-pane label="待支付" name="second">
                <order-table status="待支付"></order-table>
            </el-tab-pane>
            <el-tab-pane label="待派单" name="third">
                <order-table status="待派单"></order-table>
            </el-tab-pane>
            <el-tab-pane label="待接单" name="fourth">
                <order-table status="待接单"></order-table>
            </el-tab-pane>
            <el-tab-pane label="待服务" name="five">
                <order-table status="待服务"></order-table>
            </el-tab-pane>
            <el-tab-pane label="待接单" name="six">
                <order-table status="待接单"></order-table>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="seven">
                <order-table status="已完成"></order-table>
            </el-tab-pane>
        </el-tabs>
        <!-- /标签导航 -->
    </div>
</template>
<script>
import OrderTable from '@/components/Order/index'
export default {
    data(){
        return {
            activeName: 'first'
        }
    },
    methods:{
        // 标签点击事件
        tabClickHandler(tab,event){
            
        }
    },
    // 映射 注册组件
    components: {
        OrderTable,
    }
}
</script>
<style lang="less" scoped>

</style>