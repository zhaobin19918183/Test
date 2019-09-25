import axios from 'axios'
import { Toast } from 'antd-mobile'
import { createHashHistory } from 'history';

const history = createHashHistory();

// request拦截
axios.interceptors.request.use(config => {
 // 可以设置 token 
 // browserCookie.set("token", request.headers.token)
    return config
}, error => {
    return Promise.reject(error)
})


// response拦截
axios.interceptors.response.use(response => {
    // 成功返回的回调
    // if(response.status == 200){
    //     Toast.success('Load success !!!', 1);
    // }
    return response
}, err => {
        // debugger
        if (err && err.response) {
            if(err.response.status == 403 && err.response.data.code == 91){ 
                Toast.fail(err.response.data.message + '，请重新登录！', 3,() => {
                    // window.location.replace('/Home');
                    debugger
                    if(process.env.NODE_ENV == 'development'){
                        window.location.href ='http://zz.wsmtec.com/pay/customer/token/getCode'
                    }else if(process.env.NODE_ENV == 'production'){
                        window.location.href ='http://xn1.wsmtec.com/customer/token/getCode'
                    }
                });
                return;
            }

            // switch (err.response.status) {
            //     // case 400: err.message = '请求错误(400)'; break;
            //     // case 401: return history.push('/login'); break;
            //     // case 404: err.message = '请求出错(404)'; break;
            //     // case 500: err.message = '服务器错误(500)'; break;
            //     // case 501: err.message = '服务未实现(501)'; break;
            //     // case 502: err.message = '网络错误(502)'; break;
            //     // case 503: err.message = '服务不可用(503)'; break;
            //     // case 504: err.message = '网络超时(504)'; break;
            //     // case 505: err.message = 'HTTP版本不受支持(505)'; break;
            // }
        } else {
            // Toast.fail('连接服务器失败！', 2);
        }

        return Promise.reject(err);
})

