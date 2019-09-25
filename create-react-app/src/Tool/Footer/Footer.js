/*
   Footer  底部购买
*/
import React, { Component } from 'react';
import styles from './footer.css'
class Footer extends Component {


    constructor(props) {
        super(props);

        this.state = {
            number: 158
        };
    }

    navigationToBuy = () => {

        this.props.buyDetail.ToBuyDetail()

    }

    
    render() {
        // console.log(this.props.detai)
        return (
            <div className={styles.footer}>
                <div className={styles.footer1} >
                    <div className={styles.footermoney}>
                        <div className={styles.footermoney11}>
                        ￥
                        </div>
                        <div className={styles.footermoney1}>
                            {this.props.detai.salesPrice}
                        </div>
                        {/* <div className={styles.footermoney2}>
                            +{this.props.detai.integral}积分
                    </div> */}
                    </div>
                    <div className={styles.footernumber}>
                        门市价:{this.props.detai.originalPrice}
                    </div>
                </div>

                <div className={styles.footer2} onClick={this.navigationToBuy}>
                     立即购买
                </div>

            </div>
        );
    }

}

export default Footer;



