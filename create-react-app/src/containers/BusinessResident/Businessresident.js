/*
   Businessresident  商户入驻
*/
import React, {Component} from 'react';
import styles from './Businessresident.css'
import store  from '../../image/store.png'
import vouchers  from '../../image/vouchers.png'
import axios from 'axios';

import Header from '../../Tool/Header/Header'
class Businessresident extends Component {


    constructor(props) {
        super(props);

        this.state = {
         
        };
    }

    componentDidMount() {
        document.title = "商户免费入驻"

    }
    toDetail = () => {

        this.props.history.push({ pathname: 'BusinessDetail'})
       
    }
    back = () => {
   
 

    }
    render() {  
        const HaederBack =
        {
          headerBack: this.back
        }
        return (
         <div >
             <Header HaederBack={HaederBack} title={"商户入驻"}></Header>
            <div className={styles.businessDiv}>
            
                <div className={styles.businessDiv1} onClick={this.toDetail}>
                    <img src={vouchers} className={styles.businessImage}></img>
                    <div>优惠商家入住</div>
                </div>
                <div className={styles.businessDiv2}>
                <img src={store} className={styles.businessImage2}></img>
                    <div>商城商家入住</div>
              </div>
            </div>
         
         </div>
        );
      }
    
}

export default Businessresident;



