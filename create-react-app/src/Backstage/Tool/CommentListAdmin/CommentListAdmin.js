/*
   Comment  评论
*/
import React, { Component } from 'react';
import styles from './CommentListAdmin.css'
import collection from '../../../image/collection.png'
import tou1 from '../../../image/tou1.png'
import tou2 from '../../../image/tou2.png'
import axios from 'axios'
import { PullToRefresh } from 'antd-mobile';
import initAva from '../../../image/init_headerImg_small.png'

var array = []
class CommentListAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            height: document.documentElement.clientHeight,
            startNumber: 3,
            imageHidden: true,
            admin: true,
            pageNum: 1,
            pageSize: 10,
            image3: [
                {
                    icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    id: 1
                },
                {
                    icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    id: 2
                },
                {
                    icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    id: 3
                },
                {
                    icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    id: 4
                },
                {
                    icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    id: 5
                },
                {
                    icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    id: 6
                },
                {
                    icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    id: 7
                },
                {
                    icon: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    id: 8
                },
            ],
        };
    }

    componentDidMount() {
        this.getcommentList();
    }

    getcommentList = () => {
        let obj = {
            merchantId:sessionStorage.getItem("UserInformationID"),
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize
        };
        axios.post('/customer/userMerchantComment/MerchantCommentList', JSON.stringify(obj)).then((res) => {
           

            if (res.data.code == '0') {
                {
                    res.data.attach.map(function (el, index) {

                        array.push(
                            el
                        )
                    })
                }
                this.setState({
                    dataList: array
                })
            }

        })
    }



    render() {
        return (
            <div className={styles.commentContentAdmin}>


                <PullToRefresh
                    damping={60}
                    ref={el => this.ptr = el}
                    style={{
                        height:this.state.height<510?this.state.height*0.9:this.state.height,  
                        overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {

                        this.setState({
                            pageNum: this.state.pageNum + 1
                        })
                        this.getcommentList();
                    }}
                >

                    {
                        this.state.dataList.map((item, index) => {
                            return (
                                <div className={styles.CommentList}>
                                    <div className={styles.commentContentTitle}>
                                        <div className={styles.CommentListItemTitle}>
                                            <div>
                                                {
                                                    item.headimgurl?<img src={item.headimgurl} className={styles.CommentListImg}></img>:<img src={initAva} className={styles.CommentListImg}></img>
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <div className={styles.commentContentName}>
                                                <div className={styles.commentContentName2}>{item.nickname}</div>
                                                
                                            </div>
                                            <div className={styles.commentContentName3}>{item.createTime.slice(0,10)}</div>
                                            <img src={item.status == 1 ? tou2 : tou1} className={styles.adminImage}></img>
                                        </div>
                                    </div>
                                    <div className={styles.commentContent}>{item.content}</div>
                                    {this.state.imageHidden ?
                                        <div className={styles.listul}>
                                            {
                                                item.images.map((item) => {
                                                    return (
                                                        <li className={styles.maplicss} key={item.id}>
                                                            <img alt="example" className={styles.list_box_img} src={item.picUrl} />
                                                        </li>
                                                    )
                                                })
                                            }

                                        </div> : null
                                    }

                                    {/* 暂缓 */}
                                    {/* <div className={styles.buttonDIv}>
                                    <div className={styles.buttonYes}>
                                        确认展示
                                    </div>
                                    <div className={styles.buttonNo}>
                                        不展示
                                    </div>
                                </div> */}
                                </div>
                            );
                        })
                    }

                </PullToRefresh>




            </div>
        )
    }

}

export default CommentListAdmin;
