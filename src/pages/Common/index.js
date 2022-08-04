import { PageContainer, ProTable } from '@ant-design/pro-components';
import AddModal from './addModal';
import { columns } from './const'

export default () =>{
    const type = location.pathname.split('/')[1]
    return (
        <PageContainer
            header={{
                extra: [<AddModal key='add' type={type} />],
            }}
        >
            <ProTable 
                columns={columns}
                dataSource={[]} 
            />
        </PageContainer>
    )
}