import { commonService } from '@/ajax/index'

export const addToPot = async(payload) =>{
    return await commonService.post('addToPot', payload)
}

export const getOrderByScan = async(payload) =>{
    return await commonService.post('getOrderByScan', payload)
}