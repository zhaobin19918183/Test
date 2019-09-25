/*
   SureOeder  
*/
import React, { Component } from 'react';
import styles from './SureOeder.css'
import Header from '../Tool/Header/Header'
import collection from '../image/collection.png'
import help from '../image/help.png'
import WeChat from '../image/WeChat.png'
import location from '../image/location.png'
import disselectCar from '../image/disselectCar.png'
import selectCar from '../image/selectCar.png'
import Mask from '../Tool/Mask/Mask'
import SuccessMask from '../Tool/Mask/SuccessMask'
import {createHashHistory} from 'history'

class SureOeder extends Component {


    constructor(props) {
        super(props);

        this.state = {
            maskshow:false,
            select:false,
            success:false
        };
    }
    maskshow = () => {
     
        this.setState({
            maskshow:true
        })
       
    }
    showmask= () =>{
        this.setState({
            maskshow:false
        })
    }

    masksuccess = () => {
     
        this.setState({
            success:true
        })
       
    }
    successMask= () =>{
        const history = createHashHistory();

history.goBack();
        this.setState({
            success:false
        })
    }


    select= () => {
        this.setState({
            select:!this.state.select
        })
    }
    back = () => {
        // console.log("header back home")
    }
    successAction = () => {
        // console.log("successAction")
    }
    componentDidMount() {
        document.title = "确认下单"
        // console.log(this.props.history.location.state.item)
    }

    render() {
        const HaederBack =
        {
            headerBack: this.back
        }
        const maskAction=
        {
            showmask:this.showmask,
            successMask:this.successMask
        }
        return (
            <div >
                {this.state.maskshow?<Mask maskAction={maskAction}></Mask>:null } 
                {this.state.success?<SuccessMask maskAction={maskAction}></SuccessMask>:null } 
                <Header HaederBack={HaederBack} title={"确认下单"}></Header>
                <div className={styles.SureOrder}>
                    <img src={collection} className={styles.SureOrderImage1} ></img>
                    <div className={styles.SureOrderContent}>
                        <div className={styles.SureOrdertitle}>
                            黑加仑葡萄干黑加仑葡萄黑加...
               </div>
                        <div className={styles.SureOrdertitle1}>
                            源自新疆吐鲁番盆地，天气干燥，昼夜温 差大，口感酸甜适口。
               </div>
                        <div className={styles.SureOrderMoneyDIv}>
                            <div className={styles.SureOrderMoney}>
                                ￥1598.00
                </div>
                            <div className={styles.SureOrderIntegral}>
                                +2300积分
                </div>
                        </div>

                        <div className={styles.SureOrderCancleDiv} >
                            <div className={styles.SureOrderCancle}>
                                ￥2059.00
                </div>
                            <div className={styles.SureOrderCancleNUmber}>
                                x2
                </div>
                        </div>

                    </div>
                </div>

                {/* 定位 */}
                <div className={styles.location}>
                    <img src={location} className={styles.locationimage}>
                    </img>
                    <div className={styles.locationName}>肇州惠商城</div>
                </div>
                {/* 方式 */}
                <div className={styles.mode}>
                    <img src={this.state.select?disselectCar:selectCar} className={styles.modeimage} onClick={this.select} >
                    </img>
                    <div className={styles.modeName}>自提</div>
                </div>

                {/* 其他 */}
                <div className={styles.SureOrderInputDiv}>
                    <div className={styles.inputtitle}>
                        请输入详细地址：
                    </div>
                    <input className={styles.inputDiv}>

                    </input>
                </div>
                <div className={styles.SureOrderInputDiv}>
                    <div className={styles.inputtitle}>
                        姓名:
                    </div>
                    <input className={styles.inputDiv}>

                    </input>
                </div>

                <div className={styles.SureOrderInputDiv}>
                    <div className={styles.inputtitle}>
                        联系方式：
                    </div>
                    <input className={styles.inputDiv}>

                    </input>
                </div>
                <div className={styles.SureOrderInputDiv}>
                    <div className={styles.inputtitle}>
                        备注信息(选填)：
                    </div>
                    <input className={styles.inputDiv}>

                    </input>
                </div>
                <div className={styles.SureOrderDivRule}>

                    <div className={styles.SureOrderDivRule1}>
                        <div className={styles.SureOrderDivRulemame}>取货规则</div>
                        <img className={styles.SureOrderImage} src={help}  onClick={this.maskshow}></img>
                    </div>

                    <div className={styles.SureOrderlook}>
                        点击查看
                    </div>

                </div>

                <div className={styles.SureOrderDivMoney}>
                <div className={styles.SureOrderMode}>
                        支付方式
                </div>

                    <div className={styles.SureOrderDivRule1}>
                        <img className={styles.SureOrderImage} src={WeChat}></img>
                        <div className={styles.SureOrderDivRulemame}>微信支付</div>
                       
                    </div>
                </div>

              {/* 合计 */}
 
              <div className={styles.SureOrderAll}>
                  <div className={styles.SureOrderAllDiv}>
                  <span>共</span><span className={styles.titlecolor}>2</span><span>件商品</span><span>合计：</span><span className={styles.titlecolor}>￥690.00</span>
                  </div>
             
              </div>


              <div className={styles.footer}>
              <div className={styles.footermoneydiv}>
              <div className={styles.heji}>合计：</div>
                <div className={styles.footermoney}>
                ￥158.00
                </div>
              </div>



              <div className={styles.footercaclediv}>
              <div className={styles.cacleheji}>已省：</div>
                <div className={styles.footercacle}>
                ￥158.00
                </div>
              </div>
            
                 <div className={styles.footSure}  onClick={this.masksuccess}>
                 提交订单
                 </div>
            </div>



            </div>
        );
    }

}

export default SureOeder;



