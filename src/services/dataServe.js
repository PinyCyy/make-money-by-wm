import { dataService } from '@/ajax/index'

export const getDataList = async(payload) =>{
    return dataService.post('getDataList', { ...payload })
}