import { ProForm } from '@ant-design/pro-components';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import upload from '@/services/upload'
import './index.less'

export default (props) =>{
    const { name, formRef, setUploadStatus } = props
    const customRequest = async (info) =>{
        const { onSuccess, file } = info;
        const type = location.pathname.split('/')[1];
        let formData = new FormData();
        formData.append('type', type);
        formData.append('file', file);
        const res = await upload(formData);
        if(res){
            let obj = {};
            obj[name] = res.url
            formRef?.current?.setFieldsValue(obj)
            setUploadStatus && setUploadStatus(true)
            onSuccess('ok')
        }
    }
    return (
        <div className="wm-upload">
            <ProForm.Item 
                name={name}
                label="上传图片" 
                valuePropName="fileList" 
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }
                    return e && e.fileList;
                }}
            />
            <Upload customRequest={customRequest} maxCount={1}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
        </div>
       
    )
}