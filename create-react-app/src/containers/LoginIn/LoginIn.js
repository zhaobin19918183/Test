/*
   LoginIn  登录
*/
import React, { Component } from 'react';
import styles from './LoginIn.css'
import logo from '../../image/logo.png'
import phoneLogin from '../../image/phoneLogin.png'
import phonenumber from '../../image/phonenumber.png'
import { withRouter, } from "react-router-dom";
import { Toast } from 'antd-mobile';
import axios from 'axios';
// import createHashHistory from 'history/createHashHistory'
import {createHashHistory} from 'history'
import Header from '../../Tool/Header/Header'
class LoginIn extends Component {


    constructor(props) {
        super(props);

        this.state = {
               phone:0,
               code:0,
               seconds:60,
               btnText:"发送验证码",
               liked:true,
               hasError: false,
        };
    }
    sendCode = () => 
    {
        let siv = setInterval(() => {
            this.setState({
                liked: false,
                seconds: this.state.seconds - 1,
            }, () => {
                if (this.state.seconds == 0) {  
                    this.setState({
                        liked: true,
                        seconds: 60
                    })
                    clearInterval(siv);
                }
            });
        }, 500); 
        
    }

    submitAction =()=>
    {
           
        let obj = {
            userMobile :this.state.phone,		//联系电话*必传
            code : this.state.code,
            smsType : 2	
        };
        axios.get('/customer/merchant/foreground/register',{
            params:obj
        }).then((res) => {
        //    console.log(res)
          
           if(res.data.code == "0")
           {
              sessionStorage.setItem('registered', "true")
              const history = createHashHistory()
              history.go(-1);
              sessionStorage.setItem("selectedTab","blueTab")
           }
           else
           {
               Toast.info(res.data.message)
           }
          
       })
    }
    getCode =()=>
    {
        if(this.state.phone!=0)
        {
            // console.log(this.state.phone)
            if (this.state.phone.replace(/\s/g, '').length < 11) {
                Toast.info('请输入正确手机号');
                this.setState({
                    hasError: false,
                });
            } else {
                this.setState({
                    hasError: true,
                });
                   let obj = {
                    userMobile: this.state.phone,
                    smsType: 2
                };
                axios.post('/customer/bindingMobile/sendMessageCode', JSON.stringify(obj)).then((res) => {
               
                    if(res.data.code =="0")
                    {
                        let siv = setInterval(() => {
                            this.setState({
                                liked: false,
                                seconds: this.state.seconds - 1,
                            }, () => {
                                if (this.state.seconds == 0) {  
                                    this.setState({
                                        liked: true,
                                        seconds: 300,
                                        hasError: false,
                                    })
                                    clearInterval(siv);
                                }
                            });
                        }, 1000); 

                    }
                    else
                    {
                        Toast.info(res.data.message);
                        this.setState({
                            hasError: false,
                        }); 
                    }
                  
                })
               
            }
    
        }
       
       
    }
    componentDidMount() {
        document.title = "登录"
      
    }
    goRuleDetail(id)
    {
        this.props.history.push({ pathname: 'RuleDetail',state:{ruleId:id}})
    }
    handelChange1(e)
    {
  
      this.setState({
          phone:e.target.value
      })
    }
    handelChange2(e)
    {
        this.setState({
            code:e.target.value
        })
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('不可重复点击');
        }
    }
    back=()=>
    {
        sessionStorage.setItem("selectedTab","blueTab")
         const history = createHashHistory()
         history.goBack(-2);
    }

    render() {
        const HaederBack =
        {
            headerBack : this.back
        }
        return (
            <div className={styles.Login}>
           
               <Header  HaederBack={HaederBack}  title={"登录"}></Header>
                <img src={logo} className={styles.LoginImage}></img>
             
               
                <div className={styles.LoginContent}>

                    <div className={styles.phoneDiv}>

                        <img src={phoneLogin} className={styles.LoginImage1}></img>
                        <input placeholder="请输入手机号"   onChange={this.handelChange1.bind(this)} className={styles.LoginPhone}></input>
                        <div className={styles.LoginYan}   onClick={this.state.hasError?this.onErrorClick:this.getCode}>  {
                                    this.state.liked
                                        ?
                                        <span>{this.state.btnText}</span>
                                        :
                                        <span>{this.state.seconds}</span>
                                }</div>

                    </div>

                    <div className={styles.phoneDiv}>

                        <img src={phonenumber} className={styles.LoginImage1}></img>
                        <input placeholder="请输入验证码"  onChange={this.handelChange2.bind(this)} className={styles.LoginPhone} ></input>


                    </div>

                </div>
                <div className={styles.rule}>
                <span>登录代表您已同意惠商城 <span className={styles.blueRule} onClick={this.goRuleDetail.bind(this,2)}>用户协议</span>与<span onClick={this.goRuleDetail.bind(this,1)} className={styles.blueRule}>隐私政策</span></span>
                </div>
                
                <div className={styles.submit} onClick={this.submitAction}>登录</div>

                <div className={styles.footerMain}>
                    <div className={styles.footer}>* 工作时间8:00—17:30</div>
                    <div className={styles.footer}>* 如有疑问，请致电客服：13614653455</div>
                </div>
                     
            </div>
        );
    }

}
export default withRouter(LoginIn);
// export default LoginIn;



