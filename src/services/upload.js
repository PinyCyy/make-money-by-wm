import { upload } from '@/ajax/index'

export default async(payload) =>{
    return await upload.upload(payload)
}