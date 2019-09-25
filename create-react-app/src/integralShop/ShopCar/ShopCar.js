/*
   ShopCar  
*/
import React, { Component } from 'react';
import styles from './ShopCar.css'
import disselectCar from '../../image/disselectCar.png'
import selectCar from '../../image/selectCar.png'
import ShopSection from './ShopSection'
import {shopCar} from   '../../Tool/global/global'
const IndexArr = []
class ShopCar extends Component {


    constructor(props) {
        super(props);

        this.state = {
            selectAll: false,
            selectSectionBool: false,
            selectIndexBool: false,
            ShopCarSection: [
                {
                    name: "新疆特产食品店",
                    id: 1,
                    select:false,
                    ShopCarIndex:
                        [{
                            id: 11,
                            sectionid: 1,
                            name: "黑加仑葡萄干1",
                            money: 114,
                            number: 1,
                            Discount: 158,
                            integral: 5,
                            select:false,
                            image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        },
                        {
                            id: 12,
                            sectionid: 1,
                            name: "黑加仑葡萄干2",
                            money: 110,
                            number: 1,
                            integral: 5,
                            Discount: 258,
                            select:false,
                            image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        }]
                }
                ,
                {
                    name: "大连特产食品店",
                    id: 2,
                    select: false,
            
                    ShopCarIndex:
                        [{
                            id: 21,
                            name: "黑加仑葡萄干1",
                            money: 200,
                            number: 5,
                            sectionid: 2,
                            Discount: 1518,
                            select:false,
                            image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        },
                        {
                            id: 22,
                            sectionid: 2,
                            name: "黑加仑葡萄干2",
                            money: 300,
                            number: 5,
                            Discount: 1258,
                            select:false,
                            image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
                        }]
                }

            ]

        };
    }
 componentDidMount()
 {
    // shopCar(this.state.ShopCarSection)
    // console.log(localStorage.getItem('user_openid'))
 }
    selectSection = (item) => {
        // console.log("选择一组商品" + item)
        this.setState({
            // selectSectionBool:!selectSectionBool
        })
        item.select = ! item.select
    }
    selectIndex = (item) => {

        // console.log("选择一个商品" + item)


    }
    selectAll = () => {
        this.setState({
            selectAll: !this.state.selectAll
        })
    }

    render() {

        const select =
        {
            selectIndex: this.selectIndex,
            selectSection: this.selectSection
        }

        return (
            <div className={styles.ShopCar}>
                <div className={styles.ShopCarHeader}>
                    <div className={styles.ShopCarHeaderTitle}>购物车</div>
                </div>
                {/* 订单开始 */}
                <div className={styles.carSection}> </div>
                {
                    this.state.ShopCarSection.map((item) =>

                        <div key={item.id} className={styles.carIndex} >

                            <ShopSection  ShopCarSection={item} selectAction={select}></ShopSection>
                        </div>
                    )
                }


                {/* 订单部分结束 */}
                <div className={styles.ShopCarfooter}>
                    <img src={this.state.selectAll ? disselectCar : selectCar} className={styles.ShopCarfooterImage} onClick={this.selectAll}></img>
                    <div className={styles.ShopCarfooterquanxuan}>全选</div>
                    <div className={styles.hejidiv}>
                        <div className={styles.ShopCarfooterdiv}>
                            <div className={styles.ShopCarfooterheji}>合计:</div>
                            <div className={styles.ShopCarfootermoney}>￥0</div>
                        </div>
                        <div className={styles.ShopCarfootercacle}>
                            已省￥0
                 </div>
                    </div>
                    <div className={styles.submit}>
                        结算(0)
             </div>

                </div>


            </div>
        );
    }

}

export default ShopCar;



