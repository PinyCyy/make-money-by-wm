// 运行时配置


// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate

import Menu from '@/pages/Menu'

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

let changeSum = 0;

export function onRouteChange({ location, clientRoutes, routes, action }) {
  if(changeSum === 0 && window.location.pathname !== '/menu' ){
    window.location.href = `${window.location.origin}/menu`
  }
  changeSum = changeSum + 1;
}

export const patchClientRoutes = async({routes}: any) =>{
  let params = {
    method: "getMenuList",
    service: "menuService",
  }
  fetch('http://127.0.0.1:7001/menuService', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(res=>{
    return res.json()
  }).then(res=>{
    if(res?.code == 200){
    res.data.data.map((item: any)=>{
      routes[0].routes.push({
        path: `/${item.path}`,
        name: item.name,
        key: item.id,
        element: <Menu />
      })
    })
    }
  })
  routes[0].routes.push({
    path: `*`,
    redirect: '/menu',
  })
}