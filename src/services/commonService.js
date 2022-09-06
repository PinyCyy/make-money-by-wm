import { commonService } from '@/ajax/index'


export const getCommonList = async(payload) =>{
    return await commonService.post('getCommonList', payload)
}

export const addToPot = async(payload) =>{
    return await commonService.post('addToPot', payload)
}

export const getOrderByScan = async(payload) =>{
    return await commonService.post('getOrderByScan', payload)
}

export const getAddressList = async(params) =>{
    console.log('0000')
    return await commonService.post('getAddressList', params)
}