/*
   CommentDetail  
*/
import React, { Component } from 'react';
import { CarouselTool, ListItem, SearchTabBar } from '../../Tool/ToolRouter'
import styles from './CommentDetail.css'
import axios from 'axios';
import location from '../../image/location.png'
import Comment from '../../Tool/Comment/Comment'
import CarFooter from '../../Tool/CarFooter/CarFooter'
import Header from '../../Tool/Header/Header'
var  array=[]
class CommentDetail extends Component {


    constructor(props) {
        super(props);

        this.state = {
            showfalse: -100,
            pageNum: 1,
            pageSize: 10,
            commentlist: []
        };
    }

    componentDidMount() {
        this.getCommentList()
    }
    getCommentList() {
        var obj = { merchantId: this.props.history.location.state.merchantId, pageNum: this.state.pageNum, pageSize: this.state.pageSize }
        axios.post('/customer/userMerchantComment/commentlist', JSON.stringify(obj)).then((res) => {
            // console.log(res)
            if (res.data.attach == null) {

            }
            else {
                {
                    res.data.attach.map(function (el, index) {

                        array.push(
                            el
                        )
                    })
                }

                this.setState({
                    commentlist: array,
                    CommentBool: true
                })

            }


        })
    }
    back = () => {
        // console.log("header back home")
    }
    CommentList = () => {

        
        this.setState({
            pageNum: this.state.pageNum + 1
        })
        var obj = { merchantId: this.props.history.location.state.merchantId, pageNum: this.state.pageNum, pageSize: this.state.pageSize }
        // console.log(obj)
        axios.post('/customer/userMerchantComment/commentlist', JSON.stringify(obj)).then((res) => {
            if (res.data.attach == null) {
       
            }
            else {

                {
                    res.data.attach.map(function (el, index) {

                        array.push(
                            el
                        )
                    })
                }

                this.setState({
                    commentlist: array,
                    CommentBool: true
                })

            }


        })
    }
    render() {
        const ToCommentDetail =
        {

            CommentList: this.CommentList
        }
        const HaederBack =
        {
            headerBack: this.back
        }
        return (
            <div className={styles.over}>
                <Header HaederBack={HaederBack} title={"评论详情"}></Header>
                <div>



                    <div className={styles.commentDiv}>

                        <Comment pull={true} ToCommentDetail={ToCommentDetail} commentlist={this.state.commentlist} showfalse={this.state.showfalse}></Comment>

                    </div>
                </div>



            </div>
        );
    }

}

export default CommentDetail;



