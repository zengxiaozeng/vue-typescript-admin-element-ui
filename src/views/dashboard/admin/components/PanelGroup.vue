<template>
    <el-row class="panel-group">
        <el-col :span="12">
            <el-tabs v-model="activeName" @tab-click="handleSetLineChartData">
                <el-tab-pane label="数量" name="6"></el-tab-pane>
                <el-tab-pane label="金额" name="5"></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="12" style="text-align: right">
            <el-select v-model="years" placeholder="请选择" style="margin-top: 6px;margin-right: 10px" @change="handleSelectYear">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-col>
    </el-row>
</template>
<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({
        name: 'PanelGroup'
    })
    export default class extends Vue {
        @Prop({ default: 'false' }) private beta!: boolean
        private activeName = '6'
        private years = 0
        private options = [{
            value: '2018',
            label: '2018'
        }, {
            value: '2019',
            label: '2019'
        }]

        mounted() {
            this.years = new Date().getFullYear()
        }

        private handleSetLineChartData() {
            this.$emit('handleSetLineChartData', {
                type: this.activeName,
                years: this.years
            })
        }

        private handleSelectYear() {
            this.handleSetLineChartData()
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .panel-group {
        margin-top: 18px;
        .el-tabs__nav-wrap::after {
            background: #fff !important;
        }
        .card-panel-col {
            margin-bottom: 32px;
        }
        .card-panel {
            height: 108px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            border-color: rgba(0, 0, 0, .05);
            &:hover {
                .card-panel-icon-wrapper {
                    color: #fff;
                }
                .icon-people {
                    background: #40c9c6;
                }
                .icon-message {
                    background: #36a3f7;
                }
                .icon-money {
                    background: #f4516c;
                }
                .icon-shopping {
                    background: #34bfa3
                }
            }
            .icon-people {
                color: #40c9c6;
            }
            .icon-message {
                color: #36a3f7;
            }
            .icon-money {
                color: #f4516c;
            }
            .icon-shopping {
                color: #34bfa3
            }
            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }
            .card-panel-icon {
                float: left;
                font-size: 48px;
            }
            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px;
                margin-left: 0px;
                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }
</style>
