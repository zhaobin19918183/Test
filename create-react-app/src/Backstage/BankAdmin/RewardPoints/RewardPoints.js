/*
  Prize
*/
import React, {Component} from 'react';
import styles from './RewardPoints.css'
import {createHashHistory} from 'history'
import fh from '../../../image/fh.png'
import QRcode from '../../Tool/QRcode/QRcode'
import collection from '../../../image/collection.png'
class RewardPoints extends Component {


    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
         
        };
    }

    componentDidMount() {
        document.title = "RewardPoints"

    }
    back = () => {
        const history = createHashHistory()
        history.goBack();
    }
    handleChange(event) {
        
    }

    render() {
        return (
         <div className={styles.divcss}>
             <div className={styles.Header}>
                    <img className={styles.HeaderImageLeft} src={fh} onClick={this.back}></img>

                    <div className={styles.Headertitle}>
                    扫码赠送积分
                   </div>

                    <div className={styles.HeaderImage} ></div>

                </div>
                <QRcode></QRcode>
                <div className={styles.ShopUser}>
                 <img src={collection} className={styles.ShopUserImage}></img>
                 <div className={styles.ShopUserContent}>
                 <div className={styles.ShopUserName}>
                 疯人也有疯情调
                </div>
                 <div className={styles.ShopUserPhone}>
                 18842695584
                 </div>
                 </div>
                </div>

                <div className={styles.select}>
                    <div className={styles.selecTitle}>请选择</div>
                    <div className={styles.selectItem}>
                    <div className={styles.selectItemLfet}>
                    <label > <input type="radio" name='gender' value="Man"
                                        onChange={this.handleChange}/>   消费贷(1W送1000积分)</label>
                        
                    </div>
                    <div className={styles.selectItemLfet}>
                    <label > <input type="radio" name='gender' value="Man"
                                        onChange={this.handleChange}/>   消费贷(1W送1000积分)</label>
                 
                    </div>

                    </div>
                    <div className={styles.selectItem}>
                    <div className={styles.selectItemLfet}>
                    <label > <input type="radio" name='gender' value="Man"
                                        onChange={this.handleChange}/>   消费贷(1W送1000积分)</label>
                        
                    </div>

                    <div className={styles.selectItemLfet}>
                    <label > <input type="radio" name='gender' value="Man"
                                        onChange={this.handleChange}/>   消费贷(1W送1000积分)</label>
                 
                    </div>

                    </div>

                </div>

                <div className={styles.Bussiness}>
                    <div className={styles.BussinessTitle}>
                     业务金额:
                      </div>
                 <div className={styles.BussinessContent}>
                  5000
                   </div>
                    </div>
                    <div className={styles.Bussiness}>
                    <div className={styles.BussinessTitle}>
                    其他金额:
                      </div>
                 <div className={styles.BussinessContent}>
                  <input className={styles.inputDiv} placeholder="如无业务金额选择项请填写金额(单位:元)"></input>
                   </div>
                </div>


                <div className={styles.other}>
                    <div className={styles.BussinessTitle}>
                    赠送积分:
                      </div>
                 <div className={styles.BussinessContent}>
                  <input className={styles.inputDiv}  type="text" placeholder="5000"></input>
                   </div>
                </div>

                <div className={styles.sureButton}>
                  确认
                </div>
         </div>
        );
      }
    
}

export default RewardPoints;



