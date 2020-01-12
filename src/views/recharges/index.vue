<template>
    <div class="recharge-container">
        <main>
            <header>
                <el-date-picker
                    v-model="dateRange"
                    type="datetimerange"
                    align="center"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="handleChangeDate">
                </el-date-picker>
                <el-select
                    v-model="listQuery.status"
                    placeholder="状态"
                    clearable
                    style="width: 120px"
                    class="filter-item"
                    @change="handleSelectChange"
                >
                    <el-option
                        v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </header>
            <el-table
                v-loading="listLoading"
                :data="list"
                border
                fit
                highlight-current-row
                style="width: 100%;"
            >
                <el-table-column
                    :label="$t('table.payNo')"
                    prop="payNo"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.payNo }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('table.remark')"
                    align="center"
                    class-name="fixed-width"
                >
                    <template slot-scope="{row}">
                        <span>{{ row.lastModifiedDate }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination
                v-show="totalSize>0"
                :total="totalSize"
                :limit="listQuery.size"
                layout="prev, pager, next, jumper"
                :page.sync="listQuery.page"
                @pagination="getInitData"
            />
        </main>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import {IRechargeTableData} from '@/api/salaryType'
    import {getAccountRecords} from '@/api/salary'
    import Pagination from '@/components/Pagination/index.vue'

    @Component({
        name: 'Recharge',
        components: {
            Pagination
        }
    })
    export default class extends Vue {
        private listLoading = true
        private list: IRechargeTableData[] = []
        private totalSize = 0
        private dateRange:string = ''
        private listQuery = {
            page: 1,
            size: 10,
            endDate: '',
            startDate: '',
            status: undefined
        }
        private statusOptions = [
            {
                value: '0',
                label: '全部'
            },
            {
                value: '12',
                label: '12审核'
            },
            {
                value: '13',
                label: '13'
            },
            {
                value: '14',
                label: '14拒绝'
            },
            {
                value: '21',
                label: '21成功'
            },
            {
                value: '31',
                label: '31失败'
            }
        ]

        created() {
            this.getInitData({
                ...this.listQuery,
                page: this.listQuery.page - 1
            })
        }

        private async getInitData(params: object) {
            const data = await getAccountRecords(params)
            this.list = data.data
            this.totalSize = JSON.parse(data.headers.pagination).totalNumber
            setTimeout(() => {
                this.listLoading = false
            }, 0.5 * 1000)
        }

        private handleSelectChange() {
            this.listQuery.page = 1
            this.getInitData({
                ...this.listQuery,
                status: this.listQuery.status,
                page: this.listQuery.page - 1
            })
        }

        private handleChangeDate () {
            this.listQuery.page = 1
            if (this.dateRange && this.dateRange !== '') {
                this.listQuery.startDate = this.dateRange[0]
                if (this.dateRange.length > 1) {
                    this.listQuery.endDate = this.dateRange[1]
                }
            } else {
                this.listQuery.startDate = ''
                this.listQuery.endDate = ''
            }
            this.getInitData({
                ...this.listQuery,
                page: this.listQuery.page - 1,
                startDate: this.listQuery.startDate,
                endDate: this.listQuery.endDate
            })
        }
    }
</script>
<style lang="scss">
.recharge-container {
    padding: 20px;
    width: 100%;
    > main {
        margin-top: 50px;

        > header {
            margin-bottom: 12px;
            height: 40px;
            text-align: right;

            > p {
                font-size: 16px;
                color: rgba(33, 33, 33, 0.85);
                font-weight: bold;
                float: left;
                line-height: 40px;
            }


            .el-date-editor {
                margin-right: 15px;
            }
        }

        .el-table__body-wrapper {
            // height: 456px;
            .detail-btn {
                cursor: pointer;
                color: #2D77EE;
                font-weight: 600;
            }
        }

        .el-pagination {
            margin: 20px 0;
            text-align: center;
        }

        .el-table__empty-block {
            height: 200px;
        }

        .cell {
            font-size: 12px;
            color: #212121;
        }

        .has-gutter {
            background: #F7F7F7;
        }
    }

}

</style>
