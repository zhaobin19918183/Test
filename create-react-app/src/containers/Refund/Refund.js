/*
   Refund  
*/
import React, {Component} from 'react';
import styles from './Refund.css'
import Header from '../../Tool/Header/Header'
import axios from 'axios';
import selectCar from '../../image/selectCar.png'
import selectyes from '../../image/selectCardis.png'
import backDetail from '../../image/backDetail.png'
import {  Radio ,TextareaItem,Toast} from 'antd-mobile';
const RadioItem = Radio.RadioItem;
class Refund extends Component {


    constructor(props) {
        super(props);

        this.state = {
          value: -1,
          other:'',
          label:'',
        };
    }
    
    goToDetal=(item)=>
    {   
        window.location.href= "CouponDetail?item="+this.props.history.location.state.item.productId+"&shopId="+item.merchantId 
    //   this.props.history.push({ pathname: 'CouponDetail', state: { item: {id:this.props.history.location.state.item.productId},shopId:item.merchantId } });
    }

    back=()=>
    {

        // console.log("header back home")
    }
    onChange = (i) => {
   
      this.setState({
        value:i.value,
        label:i.label,
        detailproducts:[],
    
        other:'',
        priceTag:''
  

      });
    };
    submitAction=()=>
    {
      if(this.state.other == ''&&this.state.value !=-1)
      {
        window.location.href = global.constants.refund+this.props.history.location.state.item.orderNo+'&refundCause='+this.state.label+'&refundCauseType='+this.state.value

      }
      if(this.state.other != ''&&this.state.value ==-1)
      {
        window.location.href = global.constants.refund+this.props.history.location.state.item.orderNo+'&refundCause='+this.state.other+'&refundCauseType='+6
    
      }
      if(this.state.other == ''&&this.state.value ==-1)
      {
        // window.location.href ='http://zz.wsmtec.com/Pay?orderNo=201908300928115526486054&code=1043&message=%E5%BD%93%E5%89%8D%E8%AE%A2%E5%8D%95%E4%B8%8D%E5%85%81%E8%AE%B8%E9%80%80%E6%AC%BE'
         Toast.info("请选择或者填写退款原因")
      }

    }
    componentWillMount()
    {
     
    }
    componentDidMount()
  {
        document.title = "申请退款"
      
        axios.get('/customer/merchantProduct/detail/'+this.props.history.location.state.item.productId).then((res) => {
          console.log(res)
          this.setState({
              detailproducts:res.data.attach,
              priceTag:res.data.attach.priceTag.replace(/,/g, " | "),
              salesPrice:res.data.attach.salesPrice
          })
        })
       
     
  }
    render() {
      const { value } = this.state;
        const HaederBack =
        {
            headerBack : this.back
        }
        const data = [
            { value: 1, label: '联系商家,约不到时间' },
            { value: 2, label: '计划有变不想要了' },
            { value: 3, label: '未预约到店后无法使用' },
            { value: 4, label: '到店后,刷卡/现金/第三方支付更优惠' },
            { value: 5, label: '到店后商家不让用' },
            { value: 6, label: '商家已停业' },
          ];
        return (
         <div className={styles.refundDiv}>
              <Header  HaederBack={HaederBack}  title={"申请退款"}></Header>
              {/* <div className={styles.TextareaItemCssHeader}>
                <img src={this.props.history.location.state.item.productLogo} className={styles.TextareaItemCssImage}></img>
                <div>
                <div className={styles.TextareaItemCsstitle}>{this.props.history.location.state.item.merchantName}</div>
                <div className={styles.TextareaItemCsstitle2}>{this.props.history.location.state.item.productTitle}</div>
                </div>
             </div> */}
              <div className={styles.titleDiv} onClick={this.goToDetal.bind(this,this.state.detailproducts)}>
                <img src={this.props.history.location.state.item.productLogo} className={styles.buyDetailtitleImage}></img>
              
                    <div>
                          <div className={styles.title1}>{this.props.history.location.state.item.merchantName}</div>
                          <div className={styles.successMoney}>¥{this.state.salesPrice}</div>
                          <div className={styles.success}>{this.props.history.location.state.item.title}</div>
                          <div className={styles.successTag}>{this.state.priceTag}</div>
                    </div>
                    <img src={backDetail} className={styles.backDetailImage}></img>
                    
                </div>

             <div className={styles.refundMoneyDiv}>
                 <div className={styles.refundMoneyDiv1}>
                  <div className={styles.refundMoneyTitle}>退款金额:</div>
                  <div className={styles.refundMoneyTitle2}>{this.props.history.location.state.item.orderAmount}</div>
                 </div>
                 <div className={styles.refundMoneyDiv1}>
                  <div className={styles.refundMoneyTitle}>退还方式：</div>
                  <div className={styles.refundMoneyTitle2}>（原路退还，7个工作日退款到原支付）</div>
                 </div>
             {/* 退款金额：
             现金退还方式： */}
             </div>
             <div className={styles.resultDiv}>
              <div className={styles.resultDivTitle}>
              退款原因：
                </div>   
             
             {data.map((i,key) => (
                 <div key={key} className={styles.tuikuan} onClick={this.onChange.bind(this,i)}>
                      <img  className={ styles.tuikuanImage} src={i.value == this.state.value?selectyes:selectCar}></img> 
                      <div className={styles.tuikuanTitle}> {i.label} </div> 

                    </div>  
             
         ))} 
             </div>
         <div className={styles.Reasons}> 
         <div className={styles.Reasonstitle}>
         填写退款原因:(非必填项)
         </div>
         <div className={styles.ReasonsContent}>
         <TextareaItem
         onChange={(v) => {
          this.setState({
            value:-1,
            other:v
          });
          }}
     
        rows={5}
        count={100}
      />
         </div>
            
            
         </div>
         
         <div className={styles.submit} onClick={this.submitAction}>申请退款</div>
         {/* </a> */}
            
            
         </div>
        );
      }
    
}

export default Refund;



