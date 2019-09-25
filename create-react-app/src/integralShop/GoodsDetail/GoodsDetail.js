/*
   GoodsDetail  商品详细
*/
import React, {Component} from 'react';
import { CarouselTool, ListItem, SearchTabBar } from '../../Tool/ToolRouter'
import styles from './GoodsDetail.css'
import axios from 'axios';
import location  from '../../image/location.png'
import Comment from '../../Tool/Comment/Comment'
import CarFooter from '../../Tool/CarFooter/CarFooter'
import Header from '../../Tool/Header/Header'
class GoodsDetail extends Component {


    constructor(props) {
        super(props);

        this.state = {
            bannerImage: [],
            salesPrice:'',
            goodsName:'',
            goodsSubtitle:'',
            originalPrice:'',
            commentlist:[]
        };
    }

    componentDidMount() {
        document.title = "商品详细"
     
        var obj = {id:this.props.location.state.item.id}
        axios.post('/customer/shopMerGoodsDetail/queryDetail',JSON.stringify(obj)).then((res) => {
          // console.log(res)
        this.setState({
          salesPrice: res.data.attach[0].salesPrice,
          goodsName: res.data.attach[0].goodsName,
          goodsSubtitle: res.data.attach[0].goodsSubtitle,
          originalPrice: res.data.attach[0].originalPrice,
          stock: res.data.attach[0].originalPrice,
          integral: res.data.attach[0].integral,
          shopMerchantId: res.data.attach[0].shopMerchantId,
      })

      this.getCommentList()
    })

    }
     getCommentList()
     { 
      //  console.log(this.state.shopMerchantId)
      var obj = {merchantId:this.state.shopMerchantId,pageNum:1,pageSize:3}
      axios.post('/customer/userMerchantComment/commentlist',JSON.stringify(obj)).then((res) => {
        
      this.setState({
        commentlist:res.data.attach
    })


  })

     }
    ToCommentDetail=()=>
    {
      this.props.history.push({ pathname: 'CommentDetail'})
    }
    ToBuyDetail=()=>
    {
      // console.log(1)
      this.props.history.push({ pathname: 'ReceivingGoods'})
    }
    
    back=()=>
    {
        // console.log("header back home")
    }
    
    render() {
        const HaederBack =
        {
            headerBack : this.back
        }
        const ToCommentDetail =
        {
          ToCommentDetail : this.ToCommentDetail
        }
        const ToReceivingGoods =
        {
          ToBuyDetail : this.ToBuyDetail
        }

        return (
        
         <div className={styles.over}>
             <Header  HaederBack={HaederBack}  title={"商品详情"}></Header>
             <div>
             <CarouselTool bannerImage={this.state.bannerImage}></CarouselTool>
              <div className={styles.GoodsDetailTitleDiv}>
               <div className={styles.GoodsDetailTitle}>
                
                <div className={styles.GoodsDetailTitle1}>￥{this.state.salesPrice}</div>
                {/* <div className={styles.GoodsDetailTitle2}>+{this.state.integral}积分</div> */}
                <div className={styles.GoodsDetailTitle3}>仅剩{this.state.stock}件</div>
               </div>
               <div className={styles.GoodsDetailTitle4}>价格：{this.state.originalPrice}</div>
                <div className={styles.GoodsDetailContent}>{this.state.goodsSubtitle}</div>
              </div>
              <div className={styles.location}>
                <div className={styles.location1}>
                 发货
                </div>
                <img src={location} className={styles.locationImage}></img>
                <div className={styles.location2}>
                广州
                </div>
                <div className={styles.location4}>
                快递：包邮
                </div>
              </div>
              
              <div className={styles.commentDiv}>
           
                 {/* <Comment  commentlist={this.state.commentlist}  ToCommentDetail={ToCommentDetail}></Comment> */}
               
            </div>
             </div>
          
            <div>
            <CarFooter ToReceivingGoods={ToReceivingGoods}></CarFooter>
            </div>
          

         </div>
        );
      }
    
}

export default GoodsDetail;



