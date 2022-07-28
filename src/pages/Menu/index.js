import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import AddModal from './addModal'
import { columns } from './const'

import { getMenuList } from '@/services/menuService'

export default () => {
  const { name } = useModel('global');

  const getList = async (params) => {
    const res = await getMenuList(params)
    return res
  }

  return (
    <PageContainer 
      header={{
        title:"菜单设置",
        extra: [<AddModal key='add' />],
      }}
    >
      <ProTable 
        rowKey='id'
        request={async(values)=>{
          return await getList(values)
        }}
        columns={columns}
        pagination={{
          showSizeChanger: true,
        }}
        search={false}
      />
    </PageContainer>
  );
};
