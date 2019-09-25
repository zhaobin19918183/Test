/*
   Classification  分类
*/
import React, { Component } from 'react';
import styles from './Classification.css'
import { Grid } from 'antd-mobile';
import Header from '../../Tool/Header/Header'
// const data = Array.from(new Array(9)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//     text: `name${i}`,
// }));
const data = [];
const data1 = [];

// const data1 = Array.from(new Array(9)).map((_val, i) => ({
//     icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
//     text: `name${i}`,
// }));


class Classification extends Component {


    constructor(props) {
        super(props);

        this.state = {
            selectId: 0,
            selectTitle:'餐饮美食',
            address: [
                {

                    title: '餐饮美食',
                    id: 0

                },
                {

                    title: '居然建材',
                    id: 1
                },
                {

                    title: '你来我往',
                    id: 2
                },
                {

                    title: '美酒饮品',
                    id: 3
                }
                ,
                {

                    title: '家用',
                    id: 4
                }
                ,
                {

                    title: '居然建材',
                    id: 5
                }
            ],
        };
    }

    selectItem(item) {
        this.setState({
            selectId: item.id,
            selectTitle:item.title
        })

    }
    back = () => {

    }
    render() {
        const HaederBack =
        {
            headerBack: this.back
        }
        return (
            <div>
                <Header HaederBack={HaederBack} title={"分类"}></Header>
                <div className={styles.menuDiv}>
                    <div className={styles.menuDivLeft}>
                        {
                            this.state.address.map((item) =>
                                <div className={styles.menuDivLeft} onClick={this.selectItem.bind(this, item)}>
                                    <div className={this.state.selectId == item.id ? styles.menuBackground : styles.menuBackgroundDis}>
                                        <div className={this.state.selectId == item.id ? styles.menuSelect : styles.menuDisSelect}>
                                            {item.title}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={styles.menuDivRight}>
                        <div className={styles.itemContentTitle}>{this.state.selectTitle}</div>
                        <Grid data={data1}
                            columnNum={3}
                            hasLine={false}
                            square={false}
                            renderItem={dataItem => (
                                <div   >
                                    <img src={dataItem.icon} className={styles.itemImage} />
                                    <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                        <span>{dataItem.text}</span>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>

            </div>
        );
    }

}

export default Classification;



