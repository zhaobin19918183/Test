/*
   BusinessInformation  商家信息
*/
import React, { Component } from 'react';
import styles from './BusinessInformation.css'
import { Tag } from 'antd-mobile';
import start0 from '../../image/start0.png'
import start1 from '../../image/start1.png'
import start2 from '../../image/start2.png'
import start3 from '../../image/start3.png'
import start4 from '../../image/start4.png'
import start5 from '../../image/start5.png'

class BusinessInformation extends Component {


    constructor(props) {
        super(props);

        this.state = {
            liteData: []

        };
    }
    componentWillMount() {
 
    }


    render() {

        const ceshi = this.props.merchant.servicesInfo
        // console.log("===="+this.props.merchant.servicesInfo,ceshi)
        return (
            <div className={styles.BusinessInformantion}>
                <div className={styles.BusinessInformantionTitle}>
                    商家信息
             </div>
                <div className={styles.BusinessInformantionContent}>
                    <img src={this.props.merchant.logo} className={styles.BusinessInformantionImage}>

                    </img>
                    <div className={styles.BusinessInformantionCount}>

                        <div className={styles.BusinessInformantionTitle1}>
                            {this.props.merchant.merchantName}
                        </div>
                        <div className={styles.BusinessInformantionTitle1}>
                            <img src={this.props.merchant.score == 0 ? start0 : this.props.merchant.score == 1 ? start1 : this.props.merchant.score == 2 ?
                                start2 : this.props.merchant.score == 3 ? start3 : this.props.merchant.score == 4 ? start4 : this.props.merchant.score == 5 ? start5 : null} className={styles.startImage}></img>
                        </div>
                        <div className={styles.tagDiv}>
                            {
                             ceshi!=undefined? ceshi.map(function (el, index) {
                                return <div key={index} className={styles.tag} >{el}</div>
                            }):null
                                // <Tag data-seed="logId" className={styles.tag} >{this.props.merchant.servicesInfo}</Tag>
                               

                            }
                        </div>
                    </div>

                </div>

            </div>
        );
    }

}

export default BusinessInformation;



