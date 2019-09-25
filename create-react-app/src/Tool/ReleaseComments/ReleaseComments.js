/*
   ReleaseComments  
*/
import React, {Component} from 'react';
import styles from './ReleaseComments.css'
import { ImagePicker, TextareaItem,Toast } from 'antd-mobile';
import Header from '../../Tool/Header/Header'
import StarMarking from '../../Tool/StarMarking/StarMarking'
import collection from '../../image/collection.png'
import axios from 'axios';
import {createHashHistory} from 'history'
var  imageArray =[]
class ReleaseComments extends Component {


    constructor(props) {
        super(props);

        this.state = {
            files: [],
            image:'',
            score:0,
            merchantId:0,
            productId:0,
            orderNo:0,
            content:'',
            imglist:[]

        };
    }

      componentWillMount()
      {
        this.setState({
          image: this.props.history.location.state.item.productLogo
        })
       
      }
    componentDidMount()
    {
  
      this.setState({
        merchantId:this.props.history.location.state.item.merchantId,
        productId:this.props.history.location.state.item.productId,
        orderNo:this.props.history.location.state.item.orderNo,
     
      })
   
    }

    onChange = (files, type, index) => {
      
         if(files.length !=0)
         {
          imageArray.push(files[0]['url'].split(",")[1])
          this.setState({
            files,
            imglist:imageArray
          });
         }
       
      }
      back=()=>
    {
        // console.log("header back home")
    }
    submitComment(item)
    {
      
      Toast.loading('Loading...', 60, () => {
        Toast.hide();
      });
    var obj = {
      score:this.state.score,
      merchantId:this.state.merchantId,
      productId:this.state.productId,
      orderNo:this.state.orderNo,
      content:this.state.content,
      imglist:this.state.imglist
      } 
      // console.log(obj)
      if(this.state.content == '')
      {
        Toast.info('请输入评论内容!', 2);
      }
      else
      {
         axios.post('/customer/userMerchantComment/addcomment',JSON.stringify(obj)).then((res) => {
              // console.log(res)
              if(res.data.code != "0")
              {
                  Toast.info(res.data.message)
              }
              else
              {
                Toast.success('提交成功', 2, () => {
                  const history = createHashHistory();
                  history.goBack(); 
                  Toast.hide()
                 });
             
              
              }
       
  
    
    })
      }
 
  
    }
    changeMarkingScores=(item)=>
    {
        // console.log("item == "+item.score)
        this.setState({
          score:item.score
        })
    }
    
    render() {
         const { files } = this.state;
         const HaederBack =
         {
             headerBack : this.back
         }
         const changeMarkingScores=
         {
            changeMarkingScores: this.changeMarkingScores
         }
        return (
         <div>
             <Header  HaederBack={HaederBack}  title={"发布评论"}></Header>
             <div className={styles.TextareaItemCssHeader}>
                <img src={this.state.image} className={styles.TextareaItemCssImage}></img>
                <div className={styles.TextareaItemCsstitle}>满意程度</div>
                 <div className={styles.start}>
                       <StarMarking changeMarkingScores={changeMarkingScores}></StarMarking>
                 </div>
                
             </div>
        <div className={styles.TextareaItemCss}>
            <div className={styles.placeholderCss}>
            请简单描述以下您对商品的满意程度。
            </div>
          <div className={styles.content}>
          <TextareaItem
            rows={5}
            onChange={(v) => { 
              this.setState({
                content:v
              })
             }}
            count={200}/>
          </div>
        
        <div className={styles.selectImage}>
        <ImagePicker
          files={files}
          multiple={true}
          onChange={this.onChange}
          onImageClick={(index, fs) => {
            // console.log(index, fs)
          }}
          selectable={files.length < 8}
          multiple={this.state.multiple}
           />
        </div>

         
          </div>

          <div className={styles.submit} onClick={this.submitComment.bind(this,1213)}>发布评论</div>
        
         
         </div>
        );
      }
    
}

export default ReleaseComments;



