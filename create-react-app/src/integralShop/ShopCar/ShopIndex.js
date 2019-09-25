/*
   CurrencyItem  收藏列表Item
*/
import React, { Component } from 'react';
import styles from './ShopIndex.css'
import collection from '../../image/collection.png'
import { List, Stepper } from 'antd-mobile';
import selectCar from '../../image/selectCar.png'
import disselectCar from '../../image/disselectCar.png'
import ShopSection from  './ShopSection'
class ShopIndex extends Component {


    constructor(props) {
        super(props);

        this.state = {
             use:false,
             useMine:false,
             val:1

        };
    }
    componentWillMount()
    {
    }
    componentDidMount()
    {

    }
    onChange = (val) => {
    
        this.setState({ 
            val :val});
    }
    selectIndex(id)
    {
        if(this.props.sectionSelect == false){
           
        }
       
        this.props.selectIndex.selectIndex(id)
        this.setState({
            use:!this.state.use
        })
        // console.log("Section")
      
    }
   selectIndexMine()
   {
    this.setState({
        useMine:!this.state.useMine
    })
        //  console.log("Index")
   }

    render() {
        return (
            <div className={styles.Currency}>
     
         {/* sectionSelect */}
              
            
               <img src={ this.state.useMine?disselectCar:selectCar }  className={styles.selectImage} onClick={this.selectIndexMine.bind(this,this.props.item)}></img>

                <img src={collection} className={styles.CurrencyImage}></img>
                <div>
                    <div className={styles.CurrencyTitle}>
                        <div className={styles.CurrencyTitle1}>{this.props.item.name}</div>
                      
                    </div>
                     {/* <div className={styles.CurrencyTitle4}>
                   30元抵50元代金券 
                   </div> */}
                    <div className={styles.CurrencyTitle3}>
                        源自新疆吐鲁番盆地，天气干燥， 昼夜温差大，口感酸甜适口。
                   </div>
                    <div className={styles.CurrencyMoney}>
                        <div className={styles.CurrencyMoney1}>
                            ￥{this.props.item.money}
                        </div>
                        <div className={styles.CurrencyMoney2}>
                            +{this.props.item.integral}积分
                        </div>
                    </div>
                    <div className={styles.CurrencyMoneyDelete}>
                        <div className={styles.CurrencyMoney3}>
                        ￥{this.props.item.Discount}
                    </div>
                  
                      
                   <div className={styles.CancleButton}>
                   <Stepper
                                    style={{ width: '100%', minWidth: '100px' }}
                                    showNumber
                                    min={1}
                                    value={this.state.val}
                                    onChange={this.onChange}
                                />
                    </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default ShopIndex;



     