/*
   BusinessDetail  商户免费入驻详细
*/
import React, { Component } from 'react';
import { List, InputItem, Toast, Picker } from 'antd-mobile';

import styles from './Businessresident.css'
import Header from '../../Tool/Header/Header'
import axios from 'axios';
import { createHashHistory } from 'history'

class BusinessDetail extends Component {


    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            value: '',
            btnText: '获取验证码',
            seconds: 300, //称数初始化
            liked: true,//获取验证码文案
            shopName: '',
            phoneNumber: 0,
            code: 0,
            namelx: '',
            nametj: '',
            testData: [
                {
                    label: '春2',
                    value: '春1',
                },
                {
                    label: '夏1',
                    value: '夏2',
                },
            ],
            SecondValueid:-100,
            secondData: [
               
            ],
            recommendPerson:'',
            recommendBank:''


        };
    }
    sendCode = () => {

        if (this.state.phoneNumber != 0) {
            this.state.phoneNumber = this.state.phoneNumber.replace(/\s/ig, '')
            let obj = {
                userMobile: this.state.phoneNumber,
                smsType: 1
            };
            if (this.state.liked == true) {
                axios.post('/customer/bindingMobile/sendMessageCode', JSON.stringify(obj)).then((res) => {
                    // console.log(res)

                    if (res.data.code == "0") {
                        let siv = setInterval(() => {
                            this.setState({
                                liked: false,
                                seconds: this.state.seconds - 1,
                            }, () => {
                                if (this.state.seconds == 0) {
                                    this.setState({
                                        liked: true,
                                        seconds: 300
                                    })
                                    clearInterval(siv);
                                }
                            });
                        }, 1000);
                    } else {
                        Toast.info(res.data.message);
                    }

                })

            }
        }
        else {
            Toast.info('五分钟内不可重复点击!');
        }


    }
    componentDidMount() {
        document.title = "商户免费入驻"
        var  dataArray =[]
        // 0: {id: 49, name: "123_=123", username: "123_123", status: 1, createTime: "2019-07-30 18:21:21", …}
        axios.get('/customer/merchant/foreground/get/bank').then((res) => {
        
            if(res.data.code == "0")
            {
             
                for(var i =0;i<res.data.attach.length;i++)
                {
                     dataArray.push(
                         { 
                    label: res.data.attach[i].name,
                    value: res.data.attach[i].id,
                }
                     )
                }
           
                this.setState({
                    testData:dataArray
                })


            }
   
          

        })

    }
    intoBusiness() {
        // console.log(123123123)


    }


    back = () => {



    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('请输入正确手机号');
        }
    }
    onChangeContent1 = (value) => {
        this.setState({
            shopName: value
        })
    }
    onChangeContent2 = (value) => {
        this.setState({
            code: value
        })
    }
    onChangeContent3 = (value) => {
        this.setState({
            namelx: value
        })
    }
    onChangeContent4 = (value) => {
        this.setState({
            namelx: value
        })
    }

    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value
        })
        this.setState({
            phoneNumber: value
        })
    }
    onChangeFirst = (value) => {
        this.setState({
            recommendBank:value
        })
   var  valeid = []

        axios.get('/customer/merchant/foreground/get/manager/'+value).then((res) => {
        
            if(res.data.code == "0")
            {
             
                for(var i =0;i<res.data.attach.length;i++)
                {
                    valeid.push(
                         { 
                    label: res.data.attach[i].name,
                    value: res.data.attach[i].id,
                }
                     )
                }
           
                this.setState({
                    secondData:valeid
                })


            }
          

        })
        this.setState({
           FirstValue: value
        })
    };
    onChangeSecond = (color) => {
        this.setState({
            recommendPerson:color
        })
        this.setState({
            SecondValue: color
        })
    };

    intoShop = () => {


        if (this.state.shopName == '') {
            Toast.info('请输入店铺名');
        }
        else if (this.state.phoneNumber == 0) {
            Toast.info('请输入手机号');
        }
        else if (this.state.code == 0) {
            Toast.info('请输入验证码');
        } else if (this.state.namelx == '') {
            Toast.info('请输入推荐人姓名');
        }
       
        else {
            // recommendBank
            let obj = {
                merchantName: this.state.shopName,
                userMobile: this.state.phoneNumber,
                code: this.state.code,
                linkman: this.state.namelx,
                recommendPerson: this.state.recommendPerson[0],
                recommendBank: this.state.recommendBank[0],
                smsType: 1

            };
            console.log(obj)
            axios.get('/customer/merchant/foreground/register', {
                params: obj
            }).then((res) => {
                // console.log(res)

                if (res.data.code == "0") {
                    Toast.success('商户入驻成功！');
                    const history = createHashHistory();
                    history.goBack();
                } else {
                    Toast.info(res.data.message);
                }

            })
        }




    }
    render() {
        const HaederBack =
        {
            headerBack: this.back
        }
        return (
            <div>
                <Header HaederBack={HaederBack} title={"优惠商户入驻"}></Header>
                <List>
                    <InputItem

                        clear
                        placeholder="请输入店铺门头名字"
                        onChange={this.onChangeContent1}
                        ref={el => this.autoFocusInst = el}
                    >店&nbsp;&nbsp;&nbsp;铺&nbsp;&nbsp;&nbsp;名</InputItem>
                    <InputItem
                        type="phone"
                        placeholder="请输入联系电话"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.value}
                    >联&nbsp;系&nbsp;电&nbsp;话</InputItem>

                    <InputItem

                        placeholder="&nbsp;&nbsp;&nbsp;请输入验证码"
                        onChange={this.onChangeContent2}
                        extra={
                            <div className={styles.numberButton} onClick={this.state.hasError ? this.onErrorClick : this.sendCode}>
                                {
                                    this.state.liked
                                        ?
                                        <span>{this.state.btnText}</span>
                                        :
                                        <span>{this.state.seconds}</span>
                                }
                            </div>
                        }
                    >验&nbsp;&nbsp;&nbsp;证&nbsp;&nbsp;&nbsp;码&nbsp;</InputItem>
                                        <InputItem
                        clear
                        placeholder="请输入联系人"
                        onChange={this.onChangeContent3}
                        ref={el => this.autoFocusInst = el}
                    >联系人姓名</InputItem>

                    <Picker data={this.state.testData} cols={1}
                        onChange={this.onChangeFirst}
                        value={this.state.FirstValue}
                        className="forss">
                        <List.Item arrow="horizontal">推&nbsp;荐&nbsp;银&nbsp;行</List.Item>
                    </Picker>
                    <Picker data={this.state.secondData} cols={1}
                        onChange={this.onChangeSecond}
                        value={this.state.SecondValue}
                        className="forss">
                        <List.Item arrow="horizontal">推&nbsp;荐&nbsp;人&nbsp;员</List.Item>
                    </Picker>

                </List>

                <div className={styles.sureButton} onClick={this.state.hasError ? this.onErrorClick : this.intoShop}>
                    入驻
             </div>
            </div>
        );
    }

}

export default BusinessDetail;



