import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useEffect , useState, useRef} from 'react';
import AddModal from './addModal';
import { columns } from './const'
import { getCommonList, getAddressList } from '@/services/commonService' 

export default () =>{
    const actionRef = useRef()
    const type = location.pathname.split('/')[1];
  
    const handleRequest = async(params) =>{
        params.type = type;
        const res = await getCommonList(params);
        if(res) return res;
    }

    useEffect(()=>{
        actionRef?.current?.reload()
    },[type])

    return (
        <PageContainer
            header={{
                extra: [<AddModal key='add' type={type} actionRef={actionRef} />],
            }}
        >
            <ProTable 
                actionRef={actionRef}
                rowKey='id'
                columns={columns()}
                request={handleRequest}
            />
        </PageContainer>
    )
}