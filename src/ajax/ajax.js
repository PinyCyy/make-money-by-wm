import { message } from 'antd';
import { request } from 'umi'

export default class BaseService extends Object{
    constructor(service){
        super();
        this.service = service
    }
    async post(method, params = {}){
        let data = {
            service: this.service,
            method: method,
            params: params
        }
        const host = window.env === 'daily' ? 'http://127.0.0.1:7001/' : 'http://120.55.73.165:7003/';
        const res = await request(host + this.service, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        })
        if(res?.code == 200){
            return res.data;
        }else{
            message.error(res?.data || '出错了')
        }
    }
}