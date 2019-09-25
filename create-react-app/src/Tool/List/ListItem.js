/*
   ListItem 列表组件
*/
import React, { Component } from 'react';
import styles from './ListItem.css'
import kuanghuan from '../../image/kuanghuan.png'
import noimage from '../../image/noimage.png'
import { Tag } from 'antd-mobile';
import defaultImg from '../../image/defaultImg_avatar.png'

class ListItem extends Component {


    constructor(props) {
        super(props);

        this.state = {
            lisdata: [{
                title: "免预约"
            },
            {
                title: "约电话13333"
            }]

        };
    }
    navigationToDiscountDetail = () => {

        this.props.detail.ToDiscountDetail(this.props.list)

    }


    render() {
        return (
            <div className={styles.itemDiv} >
                <div className={styles.itemDivImage} onClick={this.navigationToDiscountDetail.bind(this)}>

                    <div style={{ position: 'relative' }}>
                        <img className={styles.list_box_img} src={this.props.list.logo?this.props.list.logo:defaultImg} />

                        {this.props.list.type == "1" ? <img className={styles.kuanghuan} src={kuanghuan} /> : null}
                    </div>

                    <div className={styles.content}>
                        <div className={styles.tagDiv}>
                            <div className={styles.title1}>{this.props.list.merchantName}</div>
                            <div className={styles.title2}>{this.props.list.subtitle}</div>


                        </div>
                        {this.props.list.priceTag != "null" ? <div className={styles.title4}>{this.props.list.priceTag}</div> : null}
                        {this.props.list.title != "null" ? <div className={styles.title3}>{this.props.list.title}</div> : null}
                        {/* <ul className={styles.listul}>
                            {
                                this.state.lisdata.map((item) =>
                                    <div className={styles.title4}>{item.title}</div>
                                )
                            }
                            </ul> */}

                    </div>

                </div>
                {this.props.list.distance != "null" ? <div className={styles.distance}>
                    {this.props.list.distance}
                </div> : null}

                {/* <img  className={styles.list_box_img} alt="example" src={this.props.src} /> */}

            </div>
        );
    }

}

export default ListItem;



