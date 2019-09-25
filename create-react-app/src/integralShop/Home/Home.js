/*
   Home  积分商城首页
*/
import React, { Component } from 'react';
import { CarouselTool, ListItem, SearchTabBar } from '../../Tool/ToolRouter'
import styles from './Home.css'
import { Grid } from 'antd-mobile';
import axios from 'axios';
import Selectedgoods from '../Tool/Selectedgoods/Selectedgoods'
import collection from '../../image/collection.png'
class Home extends Component {


    constructor(props) {
        super(props);

        this.state = {
            advertlist: [],
            bannerImage: [],
            catelist: [],
            demo: [{ data: 1 }, { data: 1 }, { data: 1 }, { data: 1 }, { data: 1 },]
        };
    }
    componentWillMount() {
        axios.get('/customer/banner/catelist').then((res) => {

            this.setState({
                catelist: res.data.attach
            })


        })

    }
    ToDiscountDetail = (item) => {

        // this.props.state.props.history.push({ pathname: 'GoodsDetail', state: { item: item } })
        this.props.state.props.history.push({ pathname: 'GoodsDetail' })
    }

    render() {
        return (
            <div style={{ backgroundColor: "white" }}>
                <SearchTabBar></SearchTabBar>
                <div className={styles.xuanfu}>
                    <CarouselTool bannerImage={this.state.bannerImage}></CarouselTool>
                </div>

                <Grid data={this.state.catelist}
                    columnNum={4}
                    hasLine={false}
                    onClick={this.navigationTo}
                    itemStyle={{ height: '100px', padding: '0px' }}
                    renderItem={dataItem => (
                        <div >
                            <img src={dataItem.picUrl} style={{ width: '50px', height: '50px' }} alt="" />
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                <span>{dataItem.title}</span>
                            </div>
                        </div>
                    )}
                />

                <div className={styles.h22}>
                    热门推荐
			   </div>
                <div className={styles.HomeItemHotDiv}>
                    <div className={styles.HomeItemHot}>
                        <img src={collection} className={styles.HomeItemHotImage}></img>
                        <div className={styles.HomeItemHotTitle}>

                            <div className={styles.HomeItemHotTitle1}>

                                ￥20.90
                            </div>
                            <div className={styles.HomeItemHotTitle2}>

                                ￥20.90
                            </div>
                        </div>

                    </div>
                    <div className={styles.HomeItemHot}>
                        <img src={collection} className={styles.HomeItemHotImage}></img>
                        <div className={styles.HomeItemHotTitle}>

                            <div className={styles.HomeItemHotTitle1}>

                                ￥20.90
                            </div>
                            <div className={styles.HomeItemHotTitle2}>

                                ￥20.90
                            </div>
                        </div>
                    </div>
                    <div className={styles.HomeItemHot}>
                        <img src={collection} className={styles.HomeItemHotImage}></img>
                        <div className={styles.HomeItemHotTitle}>

                            <div className={styles.HomeItemHotTitle1}>

                                ￥20.90
                            </div>
                            <div className={styles.HomeItemHotTitle2}>

                                ￥20.90
                            </div>
                        </div>
                    </div>
                </div>

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
        );
    }

}

export default Home;



