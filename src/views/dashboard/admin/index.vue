<template>
    <div class="dashboard-main-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData" :beta="isBeta"/>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <line-chart :chart-data="lineChartData" :type="type"/>
        </el-row>
    </div>
</template>

<script lang="ts">
    import PanelGroup from './components/PanelGroup.vue'
    import 'echarts/theme/macarons.js'
    import { Component, Vue } from 'vue-property-decorator'
    import LineChart from './components/LineChart.vue'

    export interface ILineChartData {
        actualData: string[]
    }

    export interface IPanelData {
        type: string
        years: number
    }

    const lineChartData: { [type: string]: ILineChartData } = {
        newVisitis: {
            actualData: ["0","12","10","17","20","0","199","0","34","0","20","60","90"]
        }
    }

    @Component({
        name: 'DashboardAdmin',
        components: {
            LineChart,
            PanelGroup
        }
    })
    export default class extends Vue {
        private lineChartData = lineChartData.newVisitis
        private isBeta:boolean = false
        private type:string = '6'

        // 切换选项卡时获取类型
        private handleSetLineChartData(obj: IPanelData) {
            const chartData = {
                year: obj.years,
                statisticsType: obj.type,
                dateScale: 1
            }
            this.type = obj.type
            if (this.type === '5' && Number(obj.years) === 2018) {
                this.lineChartData = {
                    actualData: ["11110.00","187936.16","60.00","0.00","0.00","330.00","550.00","770.00","110.00","0.00","0.00","0.00","5.00"]
                }
            } else if (this.type === '5' && Number(obj.years) === 2019) {
                this.lineChartData = {
                    actualData: ["0.00","4305.11","7770.00","9990.00","550.00","5640.00","660.00","0.00","111.00","0.00","0.00","0.00","110.00"]
                }
            } else if (this.type === '6' && Number(obj.years) === 2018) {
                this.lineChartData = {
                    actualData: ["0","2","0","7","0","0","99","0","4","0","0","0","50"]
                }
            } else if (this.type === '6' && Number(obj.years) === 2019) {
                this.lineChartData = {
                    actualData: ["0","12","10","17","20","0","199","0","34","0","20","60","90"]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard-main-container {
        position: relative;
    }
</style>
