/*
   ReceivingGoods  收货地址
*/
import React, {Component} from 'react';
import styles from './ReceivingGoods.css'
import Header from '../../Tool/Header/Header'
import addressImage from '../../image/addressImage.png'
import toedit from '../../image/toedit.png'
import OrderMask from '../../Tool/Mask/OrderMask'
class ReceivingGoods extends Component {


    constructor(props) {
        super(props);

        this.state = {
         address:true,
         maskshow:false,
        };
    }

    back=()=>
    {
        // console.log("header back home")
    }
    ToReceivingAddress=()=>
    {
      this.props.history.push({ pathname: 'ReceivingAddress'})
    }
    ToEditAddress=()=>
    {
        // console.log("EditAddress")
      this.props.history.push({ pathname: 'EditAddress'})
    }
    
    maskshow = () => {
        // console.log("遮罩层呢个");
        this.setState({
            maskshow:true
        })
       
    }
    showmask= () =>{
        this.setState({
            maskshow:false
        })
    }
    render() {
        const HaederBack =
        {
            headerBack : this.back
        }
        const maskAction=
        {
            showmask:this.showmask
        }
        return (
         <div>
               {this.state.maskshow?<OrderMask  title={"是否确认支付?"}  title2={""} maskAction={maskAction}></OrderMask>:null } 
               <Header  HaederBack={HaederBack}  title={"确认订单"}></Header>
              {this.state.address?
             <div className={styles.headerDiv1}>
                <img src={addressImage} className={styles.addressImage}></img>
                <div>
                 <div className={styles.addressEdit}>
                 张三 13845552255
                 </div>     
                 <div className={styles.addressEdit}>
                 辽宁省大连市高新园区火炬路38号
                 </div>  
                
                </div> 
                <img src={toedit} className={styles.editImage} onClick={this.ToEditAddress}></img>
               </div>:
            <div className={styles.headerDiv} onClick={this.ToReceivingAddress}>
               <div className={styles.addressButton}>
                   添加收货地址
               </div>
            </div>
            }

            <div className={styles.footer}>
                <div className={styles.footerALl}>
                共3件
                </div>
                <div className={styles.heji}>合计：</div>
                <div className={styles.footermoney}>
                ￥158.00
                </div>
                 <div className={styles.footSure}  onClick={this.maskshow}>
                 提交订单
                 </div>
            </div>

         </div>
        );
      }
    
}

export default ReceivingGoods;



