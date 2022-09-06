import { useState, useEffect, useRef } from 'react';
import { ProForm, ModalForm, ProFormText, ProFormDependency, ProFormSelect } from '@ant-design/pro-components';
import { ScanOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { addToPot, getOrderByScan, getAddressList } from '@/services/commonService'
import Upload from '@/components/Upload'
import './addModal.less'

export default (props) => {
    const { type, actionRef } = props;
    const formRef = useRef()
    const [uploadStatus, setUploadStatus] = useState(false)

    const [cityValue, setCityValue] = useState(null)
    const [areaValue, setAreaValue] = useState(null)

    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);
    const [area, setArea] = useState([])

    const getProvince = async(params) =>{
        const res = await getAddressList(params)
        setProvince(res || [])
    }
    const getCity = async(params) =>{
        const res = await getAddressList(params)
        setCity(res || [])
    }
    const getArea = async(params) =>{
        const res = await getAddressList(params)
        setArea(res || [])
    }

    useEffect(()=>{
        getProvince({ pId: 0})
    }, [])

  return (
    <ModalForm
        title="新增"
        className="add-modal"
        formRef={formRef}
        trigger={
            <Button type="primary">新增</Button>
        }
        layout='horizontal'
        autoFocusFirstInput
        modalProps={{
            destroyOnClose: true,
        }}
        onFinish={async (values) => {
            await formRef.current.validateFields()
            
            const res = await addToPot({ ...values, type });
            if(res){
                message.success('提交成功');
                actionRef?.current?.reload();
                return true;
            }
        }}
        width={1200}
    >
        <div className='form'>
            <Upload name='image' formRef={formRef} setUploadStatus={setUploadStatus} />
            <ProFormText name="name" label="姓名" placeholder="请输入姓名" rules={[{
                required: true, message:'请输入姓名'
            }]} />
            <ProFormText name="orderNum" label="订单号" placeholder="请输入订单号" required />
            <ProForm.Group>
                <ProFormSelect
                    name="province"
                    label={`省`}
                    options={province}
                    required
                    width={150}
                    onChange={(value) =>{ 
                        formRef.current.setFieldsValue({ city: undefined, area: undefined})
                        if(value) getCity({ pId: value });
                    }}
                />
                <ProFormDependency name={['province']} >
                    {({province})=>{
                        return (
                            <ProFormSelect
                                name="city"
                                label={'市'}
                                options={province ? city : []}
                                required
                                width={140}
                                onChange={(value)=>{ 
                                    formRef.current.setFieldsValue({ area: undefined })
                                    if(value) getArea({ pId: value }); 
                                }}
                            />
                        )
                    }}
                </ProFormDependency>
                <ProFormDependency name={['city']} >
                    {({city})=>{
                        return (
                            <ProFormSelect
                                name="area"
                                label={'区'}
                                required
                                width={140}
                                options={city ? area : []}
                            />
                        )
                    }}
                </ProFormDependency>
            </ProForm.Group>
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