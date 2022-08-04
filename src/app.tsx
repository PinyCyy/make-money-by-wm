// 运行时配置


// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate

import Common from '@/pages/Common'


const getRoutes = async () =>{
  const href = window.location.href;
  if(href.indexOf('127.0.0.1') > -1 || href.indexOf('localhost') > -1){
    window.env = 'daily';
    window.host = 'http://127.0.0.1:7001/';
  }else{
    window.env = 'prod';
    window.host = 'http://120.55.73.165:7003/';
  }
  let params = {
    method: "getMenuList",
    service: "menuService",
  }
  return fetch(window.host + 'menuService', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).then(res=>{
    return res.json()
  })
}

const routeData = await getRoutes()

export async function getInitialState(): Promise<{ name: string, routes: any }> {
  return { name: '@umijs/max', routes: routeData.data || {} };
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
  if(routeData?.code == 200){
    routeData.data.data.map((item: any)=>{
      routes[0].routes.push({
        path: `/${item.path}`,
        name: item.name,
        key: item.id,
        element: <Common />
      })
    })
  }
  routes[0].routes.push({
    path: `*`,
    redirect: '/menu',
  })
}