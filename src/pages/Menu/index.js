import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import AddModal from './addModal'
import { columns } from './const'

export default () => {
  const { initialState } = useModel('@@initialState');
  const { routes } = initialState;

  return (
    <PageContainer 
      header={{
        title:"菜单设置",
        extra: [<AddModal key='add' />],
      }}
    >
      <ProTable 
        rowKey='id'
        dataSource={routes.data}
        columns={columns}
        pagination={false}
        search={false}
      />
    </PageContainer>
  );
};
