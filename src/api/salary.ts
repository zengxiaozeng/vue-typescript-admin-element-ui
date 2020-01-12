import request from '@/utils/request'

export const getAccountRecords = (params: any) =>
    request({
        url: `/api/financial/client_financial/account_records?page=${params.page}&size=${params.size}`,
        method: 'put',
        data: {
            endDate: params.endDate,
            startDate: params.startDate,
            status: params.status
        }
    })
