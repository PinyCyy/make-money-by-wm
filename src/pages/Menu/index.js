import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import AddModal from './addModal'
import { columns } from './const'
import MyProgress from './MyProgress';

export default () => {
  const { initialState } = useModel('@@initialState');
  const { routes } = initialState;

  const data = {
    startTime: '2021-08-01',
    slaTime: '2022-08-07',
    expectTime: '2022-08-08',
    forecastTime: '2021-08-10',
    realityTime: null
  };

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
      {/* <MyProgress {...data} /> */}
    </PageContainer>
  );
};
