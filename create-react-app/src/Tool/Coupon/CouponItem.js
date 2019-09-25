/*
   CouponItem 优惠券组件
*/
import React, { Component } from 'react';
import styles from './Couponcss.css'
import kuanghuan from '../../image/kuanghuan.png'
class CouponItem extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showhidden: false
        };
    }
    navigationToCouponDetail(item) {
        // products
        {
            this.props.showhidden ? null :
                this.props.coupondetail.ToCouponDetail(item)
        }
    }
    componentDidMount()
    {
        // console.log(this.props.products)
        // console.log("====1====2=2=="+this.props.products)
    }

    render() {
   
        return (
            <div>


                {
                    this.props.products.map((item) =>
                        <div key={item.id} className={item.type == "1"? styles.backgorundImage:styles.backgorundImage2} >
                            <div>
                                <div>
                                    <img className={styles.couponImage} src={item.logo} />
                                    {item.type == "1"? <img className={styles.kuanghuan} src={kuanghuan} />:null}
                                </div>

                                <div className={styles.cardRight}>
                                    <div className={styles.coupontitleDiv}>
                                        <div className={styles.coupontitlename}>
                                            {item.title}
                                        </div>
                                    </div>

                                    <div className={styles.coupontitleDivRight} >
                                        {this.props.showhidden ? null : <div onClick={this.navigationToCouponDetail.bind(this, item)} className={item.type == "1" ? styles.couponbuy :styles.couponbuy2}>立即购买</div>}
                                    </div>

                                    <div className={styles.coupontitleDiv}>
                                        <div className={styles.couponcontent}>
                                            <div className={styles.couponcontent1}>¥</div>
                                            <div className={styles.couponcontent11}>{item.salesPrice}</div>
                                            {/* <div className={styles.couponcontent2}>+</div> */}
                                            {/* <div className={styles.couponcontent2}>{item.integral}积分</div> */}
                                        
                                        </div>
                                        <div className={styles.coupontitlenumber}>
                                            仅剩{item.stock}份
                                        </div>
                                    </div>

                                    <div className={styles.couponcontent3}>¥{item.originalPrice}</div>
                                </div>

                            </div>

                        </div>
                    )
                }

            </div>

        );
    }

}

export default CouponItem;



