<template>
    <div
        :class="className"
        :style="{height: height, width: width}"
    />
</template>

<script lang="ts">
    import echarts, { EChartOption } from 'echarts'
    import { Component, Prop, Watch } from 'vue-property-decorator'
    import { mixins } from 'vue-class-component'
    import ResizeMixin from '@/components/Charts/mixins/resize'

    export interface ILineChartData {
        actualData: string[]
    }

    @Component({
        name: 'LineChart'
    })
    export default class extends mixins(ResizeMixin) {
        @Prop({ required: true }) private chartData!: ILineChartData
        @Prop({ default: 'chart' }) private className!: string
        @Prop({ default: '100%' }) private width!: string
        @Prop({ default: '350px' }) private height!: string
        @Prop() private type!: string

        @Watch('chartData', { deep: true })
        private onChartDataChange(value: ILineChartData) {
            this.setOptions(value)
        }

        mounted() {
            this.$nextTick(() => {
                this.initChart()
            })
        }

        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        }

        private initChart() {
            this.chart = echarts.init(this.$el as HTMLDivElement, 'macarons')
            this.setOptions(this.chartData)
        }

        private setOptions(chartData: ILineChartData) {
            let seriesName = ''
            if (this.type === '6') {
                seriesName = '数量'
            } else if (this.type === '5') {
                seriesName = '金额'
            }
            if (this.chart) {
                this.chart.setOption({
                    xAxis: {
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        }
                    },
                    grid: {
                        left: 10,
                        right: 10,
                        bottom: 20,
                        top: 30,
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        padding: 8
                    },
                    yAxis: {
                        axisTick: {
                            show: false
                        }
                    },
                    series: [
                        // {
                        //     name: 'expected',
                        //     itemStyle: {
                        //         color: '#FF005A',
                        //         lineStyle: {
                        //             color: '#FF005A',
                        //             width: 2
                        //         }
                        //     },
                        //     smooth: true,
                        //     type: 'line',
                        //     data: chartData.expectedData,
                        //     animationDuration: 2800,
                        //     animationEasing: 'cubicInOut'
                        // },
                        {
                            name: seriesName,
                            smooth: true,
                            type: 'line',
                            itemStyle: {
                                color: '#3888fa',
                                lineStyle: {
                                    color: '#3888fa',
                                    width: 2
                                },
                                areaStyle: {
                                    color: '#f3f8ff'
                                }
                            },
                            data: chartData.actualData,
                            animationDuration: 2800,
                            animationEasing: 'quadraticOut'
                        }
                    ]
                } as EChartOption<EChartOption.SeriesLine>)
            }
        }
    }
</script>
