/*
  Prize
*/
import React, {Component} from 'react';
import styles from './Prize.css'
import {createHashHistory} from 'history'
import fh from '../../../image/fh.png'
import collection from '../../../image/collection.png'
import QRcode from '../../Tool/QRcode/QRcode'
class Prize extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }

    back = () => {
        const history = createHashHistory()
        history.goBack();
    }
    render() {
        return (
         <div >
              <div className={styles.Header}>
                    <img className={styles.HeaderImageLeft} src={fh} onClick={this.back}></img>

                    <div className={styles.Headertitle}>
                        奖品验证
                   </div>

                    <div className={styles.HeaderImage} ></div>

                </div>
                <QRcode></QRcode>
            <div className={styles.OrderTitle2}>
              <img  src={collection} className={styles.OrderTitle2Image}>

              </img>
              <div className={styles.OrderTitle2Title1}>
              疯人也有情挑
              </div>
              <div className={styles.OrderTitle2Title1}>
              138 4161 1589
              </div>
              </div>


              <div className={styles.OrderContent}>
                  <img src={collection} className={styles.OrderContentImage}></img>
                   <div className={styles.OrderContentMessage}>
                    <div className={styles.OrderM} >
                       <div className={styles.OrderContentMessage1}>
                      <div className={styles.OrderContentMessage11}>
                      成园山庄温泉成园山庄温泉成园 山庄温泉成园山庄
                    </div>
                   
                    </div>
                    </div>

                
                  
                    <div className={styles.OrderContentMessage2}>待使用</div>
                   </div>
              </div>

             

              <div className={styles.buttonDiv}>
              <div className={styles.button}>确认验证 </div>
              </div>
         </div>
        );
      }
    
}

export default Prize;



