/*
   注册 主页
*/

import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import styles from  './../css/login.modules.scss'
const  heigtH = window.screen.height
const  widthW = window.screen.width
// screen.height：取得屏幕高度
class Login extends Component {

    componentDidMount()
    {
       document.title="健康管理中心"
    }
    handleSubmit = e => {
          this.props.history.push({ pathname: './Home' });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
      }
    });
  };
    render() {

        const {getFieldDecorator} = this.props.form;

        return (
            <div className="background-pic">
               <div   className= "container">

                <div className="centerContainer">

                    <div style={{marginTop:20,marginBottom:20,marginLeft:40,marginRight:40}}>
                        手机登录

                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item
                            style={{marginLeft:40,marginRight:40}}
                        >
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入您的推界手机号' }],
                            })(
                                <Input
                                    style={{width: 400,height:50}}
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入手机号"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item
                            style={{marginLeft:40,marginRight:40}}
                        >
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入验证码' }],
                            })(
                                <div>
                                    <Input
                                        style={{width:220,height:50,marginRight:10}}
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入验证码"
                                    />
                                    <Button type="primary" style={{height:50,width:170}}>获取手机验证码</Button>
                                </div>
                            )}
                        </Form.Item>
                        <Form.Item  style={{marginLeft:40,marginRight:40}}>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>下次自动登录</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                忘记密码？
                            </a>
                            <a href="">注册</a>
                        </Form.Item>
                        <Form.Item style={{marginLeft:40,marginRight:40}}>
                            <Button type="primary" htmlType="submit" style={{width:400,height:50}} className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
            </div>

    );
   }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm;



