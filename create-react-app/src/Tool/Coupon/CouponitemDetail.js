/*
   CouponItem 优惠券组件
*/
import React, { Component } from 'react';
import styles from './Couponcss.css'
import kuanghuan from '../../image/kuanghuan.png'
class CouponitemDetail extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showhidden: false
        };
    }
    navigationToCouponDetail (item) {
        // products
        {
            this.props.showhidden ? null :
            this.props.coupondetail.ToCouponDetail(item)
        }
    }

    componentDidMount()
    {
        // console.log("==11="+this.props.products.type)
    }

    render() {
      
        return (
            <div className={ this.props.products.type == "1"? styles.backgorundImage:styles.backgorundImage2} >
                <div>
                    <img className={styles.couponImage} src={this.props.products.logo} />
                    {this.props.products.type =='1'?<img className={styles.kuanghuan} src={kuanghuan} />:null} 
                </div>

                {/* <div > */}
                    <div className={styles.cardRight}>
                        <div className={styles.coupontitleDiv}>
                            <div className={styles.coupontitlename2}>
                                {this.props.products.title}
                            </div>
                        </div>

                        
                        <div className={styles.coupontitleDiv1}>
                            <div className={styles.couponcontent_detail}>
                                <div className={styles.couponcontent1}>¥</div>
                                <div className={styles.couponcontent11}>{this.props.products.salesPrice}</div>
                                
                                {/* <div className={styles.couponcontent2}>+</div> */}
                                {/* <div className={styles.couponcontent2}>+{this.props.products.integral}积分</div> */}
                            </div>
                            <div className={styles.coupontitlenumber1}>
                                仅剩{this.props.products.stock}份
                                </div>
                            </div>
                        <div className={styles.couponcontent4}>¥{this.props.products.originalPrice}</div>
                    </div>
                {/* </div> */}
            </div>
        );
    }

}

export default CouponitemDetail;



