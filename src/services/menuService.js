import { menuService } from '@/ajax/index'

export const addMenu = async(payload) =>{
    return await menuService.post('addMenu', payload)
}

export const getMenuList = async(payload) =>{
    return await menuService.post('getMenuList', payload)
}

export const deleteMenu = async(payload) =>{
    return await menuService.post('deleteMenu', payload)
}