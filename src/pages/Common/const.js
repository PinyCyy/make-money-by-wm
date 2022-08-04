export const columns = [{
    title: '姓名',
    dataIndex: 'name'
},
{
    title: '订单号',
    dataIndex: 'orderNum'
},
{
    title: '图片',
    dataIndex: 'image',
    search: false,
    render: (record) =>{
        return <img style={{width: 50}} src={record} />
    }
}]