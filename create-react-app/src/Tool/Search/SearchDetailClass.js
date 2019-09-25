
/*
   CollectionItem  收藏列表Item
*/
import React, { Component } from 'react';
import styles from './SearchDetailClass.css'
import selectDown from '../../image/selectDown.png'
import selectUp from '../../image/selectUp.png'
import SearchDetailBar from '../../Tool/Search/SearchDetailBar'
import Selectedgoods from '../../integralShop/Tool/Selectedgoods/Selectedgoods'
class SearchDetailClass extends Component {


    constructor(props) {
        super(props);

        this.state = {
            demo: [{ data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 },],
            selectId: 1,
            select: false
        };
    }
    componentDidMount() {
        document.title = "搜索结果"

    }
    toDetailSearch = (value) => {

        // console.log("我是搜索详情 === " + value)
    }
    selectAction(id) {
        this.setState({
            selectId: id
        })
        if (id == 3) {
            this.setState({
                select: !this.state.select
            })
        }

    }

    render() {
        const toDetailSearch =
        {
            toDetailSearch: this.toDetailSearch
        }
        return (
            <div style={{backgroundColor:'white'}}>
                <div className={styles.search}>
                    <SearchDetailBar toDetailSearch={toDetailSearch}></SearchDetailBar>
                </div>

                <div className={styles.TabCss}>
                    <div className={this.state.selectId == 1 ? styles.Tab1Select : styles.Tab1DisSelect} id='1' onClick={this.selectAction.bind(this, 1)} >
                        综合
                  </div>
                    <div className={this.state.selectId == 2 ? styles.Tab1Select : styles.Tab1DisSelect} id='2' onClick={this.selectAction.bind(this, 2)} >
                        销量
                      </div>
                    <div className={styles.tab3}>
                        <div className={this.state.selectId == 3 ? styles.Tab1Select : styles.Tab1DisSelect} id='3' onClick={this.selectAction.bind(this, 3)} >

                            价格
                   </div>
                        <img src={this.state.select ? selectUp : selectDown} className={styles.tab3Image}></img>
                    </div>

                </div>
                <div className={styles.goods}>
                    <ul className={styles.listul}>
                        {
                            this.state.demo.map((item) =>
                                <div className={styles.listItem} onClick={this.ToDiscountDetail}>
                                    <Selectedgoods></Selectedgoods>
                                </div>
                            )
                        }
                    </ul>
                </div>

            </div>
        );
    }

}

export default SearchDetailClass;



