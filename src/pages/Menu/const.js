import { Button, message, Popconfirm } from "antd"
import { deleteMenu } from '@/services/menuService'
export const columns = [{
    dataIndex: 'name',
    title: '菜单',
},
{
    dataIndex: 'path',
    title: '路径'
},
{
    title: '操作',
    render: (record) => {
        return (
            <Popconfirm 
                title="确认删除?"
                onConfirm={async()=>{
                    const res = await deleteMenu(record.id);
                    if(res){
                        message.success('删除成功');
                        location.reload();
                    }
                
            }}>
                <Button type='link'>删除</Button>
            </Popconfirm>
        )
    }
}]

export const titleEnums = [{
    label: '姓名',
    value: 'name'
},
{
    label: '订单号',
    value: 'orderNum'
},
{
    label: '地址',
    value: 'address'
},
{
    label: '是否代付',
    value: 'payFor'
},
{
    label: '付款金额',
    value: 'payNum'
},
{
    label: '收款金额',
    value: 'getNum'
}]