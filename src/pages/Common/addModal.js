import { useState, useEffect, useRef } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { ScanOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { addToPot, getOrderByScan } from '@/services/commonService'
import Upload from '@/components/Upload'
import './addModal.less'

export default (props) => {

    const formRef = useRef()
    const [uploadStatus, setUploadStatus] = useState(false)

  return (
    <ModalForm
        title="新增"
        className="add-modal"
        formRef={formRef}
        trigger={
            <Button type="primary">
            新增
            </Button>
        }
        layout='horizontal'
        autoFocusFirstInput
        modalProps={{
            destroyOnClose: true,
        }}
        onFinish={async (values) => {
            console.log('values', values)
            // const res = await addToPot({ ...values, type });
            // console.log(res,'res')
            // if(res){
            //     message.success('提交成功');
            //     location.reload();
            //     return true;
            // }
        }}
        width={1200}
    >
        <div className='form'>
            <Upload name='image' formRef={formRef} setUploadStatus={setUploadStatus} />
            {/* <ProFormText name="name" label="姓名" placeholder="请输入姓名" /> */}
            <ProFormText name="orderNum" label="订单号" placeholder="请输入订单号" />
        </div>
        {uploadStatus && <div className="show-img">
            <ScanOutlined style={{fontSize: 28}} onClick={async() =>{
                const res = await getOrderByScan(formRef?.current?.getFieldValue('image'))
                formRef?.current?.setFieldsValue({orderNum: res})
            }} />
            <img src={formRef?.current?.getFieldValue('image')}  onClick={() => window.open(formRef?.current?.getFieldValue('image'))} />
        </div>}
    </ModalForm>);
};