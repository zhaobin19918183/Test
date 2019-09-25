export  function setToken(token)
{
    return localStorage.setItem('user_token',token)
}
export function setOpenID(setOpenID)
{
    return localStorage.setItem('user_openid',setOpenID)
}
export function shopCar(Item)
{
    return localStorage.setItem('shopCar',Item)
}
global.constants = {
    website:'http://www.baidu.com/',
    name:'百度',
};