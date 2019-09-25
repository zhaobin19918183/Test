/*
   aboutshop 商家评论   喜欢   收藏商家
*/
import React, { Component } from 'react';
import styles from './Aboutshopcss.css'
import comment from '../../image/comment.png'
import love from '../../image/love.png'
import start from '../../image/start.png'
import axios from 'axios';
import loveselect from '../../image/loveselect.png'
import startselect from '../../image/startselect.png'

class Aboutshop extends Component {


    constructor(props) {
        super(props);

        this.state = {
            comment: false,
            love: false,
            start: false,
            shoucang: false
        };
    }


    getCollection() {
        axios.get('/customer/merchant/foreground/select/collection/' + this.props.data.id).then((res) => {



        })
    }
    collection = (index) => {
        this.props.aboutShop.aboutShop(this.props.data)
        if (this.state.start == false) {
            this.setState({
                start: true
            })
        }
        else {
            this.setState({
                start: false
            })
        }
    }
    love = (index) => {
        // console.log("love")
        if (this.state.love == false) {
            this.setState({
                love: true
            })
        }
        else {
            this.setState({
                love: false
            })
        }

    }
    componentDidMount() {
        // console.log(this.props.data.collect)
    }
    comment = (index) => {
        // console.log("comment")
    }
    //

    render() {

        // console.log(this.props.data)
        return (
            <div className={styles.aboutDiv}>
                <div className={styles.divOne} onClick={this.comment}>
                    <img className={styles.aboutImage} src={comment} />

                    <span className={styles.aboutTitle} >
                        商家评论({this.props.data.commentCount})条
                    </span>
                </div>

                <div className={styles.divTwo}>
                    <img className={styles.aboutImage} src={love} />

                    <span className={styles.aboutTitle} >
                        {this.props.data.likeCount}人喜欢
                    </span>
                </div>

                <div className={styles.divThree} onClick={this.collection}>
                    <img className={styles.aboutImage} src={this.props.collection == "1" ? start : startselect} style={{marginLeft: '-6px', verticalAlign: 'text-bottom'}} />

                    <span className={styles.aboutTitle} >
                        {this.props.collection == "1" ? "添加收藏" : "取消收藏"}
                    </span>
                </div>
            </div>
        );
    }

}

export default Aboutshop;



