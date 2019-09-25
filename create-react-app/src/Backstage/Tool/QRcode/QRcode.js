/*
 
*/
import React, {Component} from 'react';
import qr from '../../../image/qr.png'
import styles from './QRcode.css'
class QRcode extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }    
    second=()=>
    {
   
        this.props.onScanQRCode.onScanQRCode()
    }
    render() {
        return (
         <div className={styles.QRcode} onClick={this.second}>
             <img src={qr} className={styles.QRcodeImage}></img>
             <div className={styles.QRcodeTitle}>请扫描订单二维码</div>
         </div>
        );
      }
    
}

export default QRcode;



