/*
   buyDetail  立即购买
*/
import React, { Component } from 'react';
import styles from './buyDetail.css'
import { List, Stepper, Modal, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import help from '../../../image/help.png'
import WeChat from '../../../image/WeChat.png'
import selectno from '../../../image/selectno.png'
import selectyes from '../../../image/selectyes.png'
import collection from '../../../image/collection.png'
import axios from 'axios';
import Mask from '../../../Tool/Mask/Mask'
import Header from '../../../Tool/Header/Header'
import { createHashHistory } from 'history'
var   number = 0
class buyDetail extends Component {


    constructor(props) {
        super(props);

        this.state = {
            val: 1,
            val1: 2,
            show: true,
            select: false,
            maskshow: false,
            shopItemID: 0,
            phone: 0,
            messgae: false,
            buyDetail: [],
            type: 0,
            priceTag: ''

        };
    }
    componentWillMount() {


        this.setState({
            shopItemID: this.props.history.location.state.detail.id,
            type: this.props.history.location.state.detail.type,
            priceTag: this.props.history.location.state.detailproducts.priceTag
        })
        // console.log(this.props.history.location.state.detail)
        axios.get('/customer/order/getProductInfo?productId=' + this.props.history.location.state.detail + '&storeType=1').then((res) => {
            console.log(res)
            if (res.data.attach != null) {
                this.setState({
                    buyDetail: res.data.attach,
                    phone: res.data.attach.mobile
                })
            }
            else {
                Toast.info(res.data.message)
                const history = createHashHistory();
                history.goBack();

            }

        })


        //      })
    }
    componentDidMount() {
        document.title = "立即购买"
        window.history.pushState(null, null, document.URL); //禁止网页返回上一页
      
        window.addEventListener('popstate', function() { 
        
             
            if(number == 1)
            {
                window.history.go(-2);
            }
            if(number == 0)
            {
              number = number + 1
            }
            

        });


    }

    onChange = (val) => {
        // console.log(val);

        this.setState({ val });
    }
    onChange1 = (val1) => {

        // console.log(val);
        this.setState({});
    }

    maskshow = () => {
        // console.log("遮罩层呢个");
        this.setState({
            maskshow: true
        })

    }
    back = () => {
        // console.log("header back home")
    }
    selectImage = (item) => {
        if (this.state.select == false) {
            this.setState({
                select: true
            })
        }
        else {
            this.setState({
                select: false
            })
        }


    }
    showmask = () => {
        this.setState({
            maskshow: false
        })
    }
    goToPay(pay) {
        var timestamp = Date.parse(new Date());
        var time = timestamp.toString()
        time = time.slice(0, 10)



        if (sessionStorage.getItem("registered") == "false") {
            window.scrollTo(0, 0);
            this.props.history.push({ pathname: 'LoginIn' })
        }
        else {
            // 存取支付状态
            // sessionStorage.setItem('isPay', true);
            // -----------------------------------------------

            var obj = { productId: this.props.history.location.state.detail, number: this.state.val, presented: 0 }

            Toast.loading('正在支付...', 10, () => {
                console.log('Load complete !!!');
            });

            axios.post('/customer/order/placeO2oOrder', JSON.stringify(obj)).then((res) => {

                if (res.data.attach == null) {
                    Toast.info(res.data.message)


                }
                else {
                    if (res.data.attach.needToPay == true) {
                      
                        window.location.href = global.constants.pay + res.data.attach.orderNo + '&timestamp=' + time

                    }
                    else {
                        sessionStorage.setItem("buyResult",0)
                        this.props.history.push({ pathname: 'Pay', state: { item: res.data.attach.orderNo, title: "下单结果", detail: 1, detailproducts: this.props.history.location.state.detailproducts, productId: this.props.history.location.state.detail.id } })
                    }
                    window.scrollTo(0, 0);
                    Toast.hide()
                }


            })
        }

    }
    componentDidMount() {
   
    
     
       console.log(this.props.match)
    }
    render() {
        const maskAction =
        {
            showmask: this.showmask
        }
        const HaederBack =
        {
            headerBack: this.back
        }

        return (
            <div className={styles.buyDetail}>

                <Header HaederBack={HaederBack} title={"立即购买"}></Header>
                {this.state.maskshow ? <Mask maskAction={maskAction}></Mask> : null}
                <div className={this.state.type == '1' ? styles.backgorundImage1 : styles.backgorundImage}>
                    <img src={this.state.buyDetail.productLogo} className={styles.buyDetailtitleImage}></img>
                    <div>
                        <div className={styles.buyDetailtitle}>
                            {this.state.buyDetail.title}
                        </div>

                        <div className={styles.buyDetailtitle22}>
                            <div className={styles.buyDetailtitle1001}>
                                ￥
                            </div>
                            <div className={styles.buyDetailtitle1}>
                                {this.state.buyDetail.salesPrice}
                            </div>

                            {/* <div className={styles.buyDetailtitle2}>
                                +{this.state.buyDetail.neededPoints}积分
                            </div> */}


                        </div>
                        <div className={styles.conditionNumber}>
                            ¥{this.state.buyDetail.originalPrice}
                        </div>
                        <div className={styles.condition}>
                            {this.state.priceTag.replace(/,/g, " | ")}
                        </div>
                        {/* 免预约 随时退 过期自动退 */}
                    </div>
                </div>
                <div>
                    <List>

                        <List.Item
                            wrap
                            extra={
                                <Stepper
                                    style={{ width: '100%', minWidth: '100px' }}
                                    showNumber
                                    min={1}
                                    value={this.state.val}
                                    onChange={this.onChange}
                                />}
                        >
               
                        数量
  
                        
                         
                        </List.Item>
                        <List.Item
                            wrap
                           
                            extra={
                                <div className={styles.buyDetailnumber}>
                                    <div className={styles.buyDetailnumber1}>
                                        ￥{this.state.buyDetail.salesPrice}
                                    </div>
                                    <div className={styles.buyDetailnumber2}>
                                        x {this.state.val}
                                    </div>

                                </div>
                            }
                        >
                            小计
                        </List.Item>

                    </List>
                    <div className={styles.buyDetailListLine}></div>
                    <List>
                        {/* 
                        <List.Item
                            wrap
                            extra={
                                <div>
                                    {this.state.show ?
                                        <div className={styles.integral3}>
                                            消耗{JSON.parse(sessionStorage.getItem("buyDetail")).integral*this.state.val}      积分
                             </div> :
                                        <div className={styles.integral1}>
                                            当前积分不足以抵扣
                             </div>}

                                    <div className={styles.integral2}>
                                        现在积分为1258，可写优质评论获得积分
                             </div>
                                </div>
                            }
                        >
                            使用积分
                       {<img src={help} className={styles.help} onClick={this.maskshow}></img>}
                        </List.Item> */}
                        <List.Item
                            wrap={true}
                            extra={
                                <div className={styles.buyDetailnumber}>
                                    <div className={styles.buyDetailnumber1001}>
                                        ￥{(this.state.buyDetail.salesPrice * this.state.val).toFixed(1)}</div>
                                </div>
                            }
                        >
                            实付金额
                   </List.Item>

                    </List>
                    <div className={styles.buyDetailListLine}></div>
                    <List>

                        <List.Item
                            wrap={true}
                            extra={

                                <div >
                                    {this.state.phone}
                                </div>

                            }
                        >
                            绑定手机号
                   </List.Item>
                        <List.Item
                            wrap={true}
                        >
                            {
                                <div className={styles.buyButtonDiv}>

                                    {/* <div>
                                        支付方式
                                </div>
                                    <div className={styles.integral4}>
                                        <div>
                                            微信支付<img src={WeChat} className={styles.help}></img>
                                        </div>
                                        <img src={this.state.select?selectno:selectyes} className={styles.help} onClick={this.selectImage}></img>
                                    </div> */}
                                    <div className={styles.buyButton}>
                                        <div className={styles.buyButton1}>
                                            <span>￥</span>
                                            {(this.state.buyDetail.salesPrice * this.state.val).toFixed(1)}
                                        </div>
                                        {/* href={global.constants.pay+this.props.data.orderNo} */}

                                        <div className={styles.buyButton2} onClick={this.goToPay.bind(this, "付款")}>
                                            去下单
                                     </div>



                                    </div>
                                    <div className={styles.footertitle}>请尽快支付哦,订单将在半小时后关闭</div>
                                </div>

                            }

                        </List.Item>
                    </List>


                </div>

            </div>
        );
    }

}

export default buyDetail;



