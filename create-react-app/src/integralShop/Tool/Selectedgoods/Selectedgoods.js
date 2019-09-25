/*
   Selectedgoods  精选商品Item
*/
import React, {Component} from 'react';
import styles from './Selectedgoods.css'
import collection from '../../../image/collection.png'


class Selectedgoods extends Component {
    constructor(props) {
        super(props);

        this.state = {
         
        };
    }

    componentDidMount(){
      
    }
    
    render() {
        return (
            <div className={styles.Selectedgoods}>
                <img className={styles.SelectedgoodImage} src={this.props.data.logo}></img>
                <div className={styles.SelectedgoodsTitle}>{this.props.data.title}</div>
                <div className={styles.SelectedgoodsTitle1}>仅剩 {this.props.data.stock} 件</div>
                <div className={styles.SelectedgoodsNumber1}>
                    <div className={styles.SelectedgoodsNumber2}>￥{this.props.data.salesPrice}</div>
                    {/* <div className={styles.SelectedgoodsNumber3}>+{this.props.data.integral}积分</div> */}
                </div>
                <div className={styles.SelectedgoodsNumber4}>￥{this.props.data.originalPrice}</div>
            </div>
        );
    }
    
}

export default Selectedgoods;
