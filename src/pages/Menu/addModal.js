import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { addMenu } from '@/services/menuService'

export default () => {
  return (
    <ModalForm
      title="新增菜单"
      trigger={
        <Button type="primary">
          新增菜单
        </Button>
      }
      layout='horizontal'
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        const res = await addMenu(values);
        if(res){
            message.success('提交成功');
            location.reload();
            return true;
        }
      }}
    >
      <ProFormText width="lg" name="name" label="菜单名称" required  rules={[
        {
          pattern: /^.{0,20}$/,
          message: '长度不能超过20',
        },
      ]}/>
      <ProFormText width="lg" name="path" label="路径/path" required rules={[
        {
          pattern: /^[a-z0-9]{0,20}$/,
          message: '请输入长度不超过20的没有空格的字母或数组',
        },
      ]} />
    </ModalForm>
  );
};