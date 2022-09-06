import { Modal } from "antd"
import { useState } from "react"

export const columns = () =>{ 

    const [visible, setVisible] = useState(false)

    return [{
        title: '姓名',
        dataIndex: 'name'
    },
    {
        title: '订单号',
        dataIndex: 'orderNum'
    },
    {
        title: '图片',
        search: false,
        render: (record) =>{
            if(record.image){
                return <div>
                    <img style={{width: 50}} src={record.image} onClick={()=>setVisible(true)}  />
                    <Modal title="查看订单图片" visible={visible} onCancel={()=>setVisible(false)} footer={null} width={800}>
                        <img src={record.image} width={'100%'} />
                    </Modal>
                </div>
            }
            return '--'
        }
    }]
}