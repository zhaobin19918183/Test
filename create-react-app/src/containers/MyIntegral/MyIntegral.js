/*
   MyIntegral  我的积分
*/
import React, { Component } from 'react';
import { List, DatePicker } from 'antd-mobile';
import incomeimg  from '../../image/income.png'
import spending  from '../../image/spending.png'
import question  from '../../image/question.png'
import styles from './MyIntegral.css'
import Mask from '../../Tool/Mask/Mask'
import axios from 'axios';
import Header from '../../Tool/Header/Header'
const Item = List.Item;
const Brief = Item.Brief;
function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${dateStr} ${timeStr}`;
}

class MyIntegral extends Component {


    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: '开始时间',
            timeend: '结束时间',
            queryTotalDetail:[],
            maskshow:false,
            image3: [
                {
                    selct: true
                },
                {
                    selct: false
                },
                {
                    selct: true
                },
                {
                    selct: false
                },
                {
                    selct: true
                },
                {
                    selct: false
                },
            ]
        };
    }
  
    componentDidMount() {
        // /customer/userAccountIntegral/queryTotalDetail
        document.title = "我的积分"
        axios.get('/customer/userAccountIntegral/queryTotalDetail', {
            headers: {
                openid: localStorage.getItem('user_openid'),
                token: localStorage.getItem('user_token'),
            
              }
      
          }).then((res) => {
      
        //   console.log(res)
            this.setState({
                queryTotalDetail:res.data.attach
            })
          })

    }
    back = () => {
        // console.log("header back home")
    }
    maskshow = () => {
        // console.log("遮罩层呢个");
        this.setState({
            maskshow:true
        })
       
    }
    showmask= () =>{
        this.setState({
            maskshow:false
        })
    }
    formatDate(date) {
        /* eslint no-confusing-arrow: 0 */
        const pad = n => n < 10 ? `0${n}` : n;
        const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        return `${dateStr}`;
    }
    searchNumber=()=>
    {

        var obj = { startTime:this.state.time,endTime:this.state.timeend,}

        axios.post('/customer/userAccountIntegral/queryDateDetail',JSON.stringify(obj)).then((res) => {
            // console.log(res)  
        this.setState({
               image3:res.data.attach
           })
         
         
          })
       
    }
     
 
    render() {
        const maskAction=
        {
            showmask:this.showmask
        }
        const HaederBack =
        {
            headerBack: this.back
        }
       
        return (
            <div>
                 {this.state.maskshow?<Mask maskAction={maskAction}></Mask>:null } 
                 <Header HaederBack={HaederBack} title={"我的积分"}></Header>
                <div className={styles.titleDiv}>
                <div className={styles.titleNumberDiv}>
                <img src={question} className={styles.allnumberImage} onClick={this.maskshow}></img>   
                    <div className={styles.allnumberdiv}>
                   
                     <div className={styles.allnumber}>
                    {this.state.queryTotalDetail.total}
                     </div>
                     <div className={styles.allnumber1}>
                     积分
                         </div>
                    </div>

                    <div className={styles.allnumber2}>
                    {this.state.queryTotalDetail.surintegral}积分将于 {this.state.queryTotalDetail.mintime}过期
                         </div>
                </div>

                <div className={styles.numberdiv}>
                    
                  <div className={styles.numberdivcontent}>
                  <div className={styles.numberdivtitle1}>
                     +{this.state.queryTotalDetail.allIntegral}
                     </div>
                     <div className={styles.numberdiv1}>
                     <img src={incomeimg} className={styles.numberdivImage}></img>   
                     收入积分
                      
                     </div>
                  </div>
                  <div className={styles.line}>
                  </div>
                  <div className={styles.numberdivcontent}>
                  <div className={styles.numberdivtitle2}>
                     -{this.state.queryTotalDetail.usetotal}
                     </div>
                     <div className={styles.numberdiv1}>
                     <img src={spending} className={styles.numberdivImage}></img>   
                     支出积分
                      
                     </div>
                  </div>

                </div>

                </div>

                <div className={styles.timediv}>
                <div className={styles.time}>
                    <DatePicker
                        mode="date"
                        title="开始时间"
                        value={this.state.date}
                        onOk={date =>
                            this.setState({
                                time: this.formatDate(date)
                            })

                        }
                    >
                        <div className={styles.startTime}>
                            {this.state.time}
                        </div>

                    </DatePicker>
                </div>
                <div className={styles.zhi}>
                    至
                </div>
                <div className={styles.time}>
                    <DatePicker
                        mode="date"
                        title="结束时间"
                        value={this.state.date}
                        onOk={date =>
                            this.setState({
                                timeend: this.formatDate(date)
                            })

                        }
                    >
                        <div className={styles.startTime}>
                            {this.state.timeend}
                        </div>

                    </DatePicker>
                </div>
                <div className={styles.search} onClick={this.searchNumber}>
                 查询
                </div>
                </div>
                

                <List className="my-list">
                    {
                        this.state.image3.map((item) =>
                            <Item multipleLine extra={
                                <div className={styles.numberColor1}>
                                    {item.integral}
                </div>
                            }>
                                 {item.record} <Brief> {item.createTime}</Brief>
                            </Item>

                        )
                    }

                </List>
            </div>
        );
    }

}

export default MyIntegral;



