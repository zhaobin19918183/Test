import axios from 'axios'; 
import shareDetail from './../image/shareDetail.png'
const init = ()=>{
    let { search } = window.location
    
    let paramsString = search.substring(1)
    paramsString=paramsString.replace('amp;','')
    let searchParams = new URLSearchParams(paramsString)
    let openid = searchParams.get('openid')
    let token = searchParams.get('token')
    let registered = searchParams.get('registered')
    if(openid !=null){
        sessionStorage.setItem('user_openid', openid)
        sessionStorage.setItem('user_token', token)
        sessionStorage.setItem('registered', registered)
        console.log("seopenid) ======== "+openid)
        console.log("token) ======== "+token)
        console.log("registered) ======== "+registered)
  
    }else if(sessionStorage.getItem('user_openid') == null){

        if(process.env.NODE_ENV == 'development'){
            window.location.href ='http://zz.wsmtec.com/pay/customer/token/getCode'
        }else if(process.env.NODE_ENV == 'cs'){
            console.log('测试环境')
            window.location.href ='http://zz.wsmtec.com/pay/customer/token/getCode'
        }else if(process.env.NODE_ENV == 'production'){
            console.log('生产环境')
            window.location.href ='http://xn1.wsmtec.com/customer/token/getCode'
        }
    }
    console.log("111111) ======== "+sessionStorage.getItem('user_openid'))
    axios.defaults.headers.common['openid'] = sessionStorage.getItem('user_openid');
    axios.defaults.headers.common['token'] = sessionStorage.getItem('user_token'); 

    if(process.env.NODE_ENV == 'development'){
    
        global.constants = {
           url:'http://zz.wsmtec.com/pay',
           pay:'http://zz.wsmtec.com/pay/customer/payment/o2o/pay?openid='+ sessionStorage.getItem('user_openid')+ '&token='+ sessionStorage.getItem('user_token')+'&orderNo=',
           refund:'http://zz.wsmtec.com/pay/customer/payment/o2o/refund?openid='+ sessionStorage.getItem('user_openid')+ '&token='+ sessionStorage.getItem('user_token')+'&orderNo=',
           share:'http://zz.wsmtec.com/pay/customer/token/getCode',
           come:"http://zz.wsmtec.com/",
           shareDetail:"http://xn.wsmtec.com/static/media/logo.jpg"
        };
        axios.defaults.baseURL ='http://zz.wsmtec.com/pay'
    }else if(process.env.NODE_ENV == 'cs'){
        console.log('测试环境')
        axios.defaults.baseURL ='http://zz.wsmtec.com/pay'

    }else if(process.env.NODE_ENV == 'production'){
        console.log('生产环境')
        axios.defaults.baseURL ='http://xn1.wsmtec.com'
        global.constants = {
            url:'http://xn1.wsmtec.com',
            pay:'http://xn1.wsmtec.com/customer/payment/o2o/pay?openid='+ sessionStorage.getItem('user_openid')+ '&token='+ sessionStorage.getItem('user_token')+'&orderNo=',
            refund:'http://xn1.wsmtec.com/customer/payment/o2o/refund?openid='+ sessionStorage.getItem('user_openid')+ '&token='+ sessionStorage.getItem('user_token')+'&orderNo=',
            share:'http://xn1.wsmtec.com/customer/token/getCode',
            shareDetail:"http://xn.wsmtec.com/static/media/logo.jpg"
         };
    }
    // else if(process.env.NODE_ENV == 'alpha'){
    //     console.log('线上版本')
    // }

    // axios.defaults.baseURL ='http://xn1.wsmtec.com'

    // axios.defaults.headers.common['openid'] = 'okgBl1qAdb9rpq8BFbFfQUOJZIdU'; 
    // axios.defaults.headers.common['token'] = 'fb8e60e5-2b8b-48ea-aa7f-3936d91ec74b'; 

    axios.defaults.headers.post['Content-Type'] = 'application/json ';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // 'Access-Control-Allow-Origin': '*'
    // axios.defaults.timeout
}

export default {init}
