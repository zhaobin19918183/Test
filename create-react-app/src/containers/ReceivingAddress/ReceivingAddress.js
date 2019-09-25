/*
   ReceivingAddress  
*/
import React, { Component } from 'react';
import styles from './ReceivingAddress.css'
import { List, InputItem, Toast } from 'antd-mobile';
import Header from '../../Tool/Header/Header'
import selectno from '../../image/selectno.png'
import selectyes from '../../image/selectyes.png'
import {createHashHistory} from 'history'
class ReceivingAddress extends Component {


    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            value: '',
            select:false
        };
    }
    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
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
            value,
        });
    }
    back = () => {
        // console.log("header back home")
        const history = createHashHistory();
        history.goBack();  
    }
    selectImage= () =>{
        if(this.state.select==false)
        {
            this.setState({
                select:true
            })
        }
        else
        {
            this.setState({
                select:false
            })
        }
       
       
         }

         componentDidMount()
         {
            // console.log(this.props.location.sta)
         }

    render() {
        const HaederBack =
        {
            headerBack: this.back
        }

        return (
            <div>
                <Header HaederBack={HaederBack} title={"添加收货地址"}></Header>
                <InputItem

                    clear
                    placeholder="请添加收货人姓名"
                    ref={el => this.autoFocusInst = el}
                >收货人</InputItem>
                <InputItem
                    type="phone"
                    placeholder="请输入手机号"
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick}
                    onChange={this.onChange}
                    value={this.state.value}
                >手机号
            </InputItem>
          

                <div className={styles.inputaddress}>
                    <InputItem
                        onChange={(v) => {
                            //  console.log('onChange', v); 
                        }}
                        clear
                        placeholder="请添加收货地址"
                        ref={el => this.autoFocusInst = el}
                    >收货地址</InputItem>
                </div>
                <div className={styles.default}>
               <img  className={styles.defaultImage} src={this.state.select?selectyes:selectno} onClick={this.selectImage}></img>
               <div className={styles.defaultTitle}>
               设为默认地址
               </div>
               
                </div>
                <div className={styles.addressButton}>
                保存并使用
                </div>
            </div>
        );
    }

}

export default ReceivingAddress;



