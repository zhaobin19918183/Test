/*
   SearchDetail  
*/
import React, { Component } from 'react';
import styles from './zoneSearch.css'
import SearchDetailBar from '../Tool/Search/SearchDetailBar'
import axios from 'axios';
class zoneSearch extends Component {


    constructor(props) {
        super(props);

        this.state = {
            advertlist: [
                {
                    title: '小吃'
                },
                {
                    title: '小吃'
                },
                {
                    title: '小吃'
                },
                {
                    title: '小吃'
                },
                {
                    title: '小吃1'
                },
                {
                    title: '你好'
                },
                {
                    title: '小吃你好'
                },
            ],
            liteData:[]
        };
    }
    componentDidMount() {
        document.title = "搜索"
    axios.get('/customer/merchant/foreground/guess/like', {
      params:
      {
        latitude: sessionStorage.getItem("latitude"),
        longitude:sessionStorage.getItem("longitude"),
      }

    }).then((res) => {

    //   console.log(res)
      this.setState({
        liteData:res.data.attach
      })
    })

    }
    toDetailSearch = (value) => {
        // this.props.history.push({ pathname: 'SearchDetailClass' ,state: { item: value }})

    }


    render() {
        const toDetailSearch =
        {
            toDetailSearch: this.toDetailSearch
        }

        return (
            <div style={{backgroundColor:'white',height:'100vh'}}>
                <SearchDetailBar toDetailSearch={toDetailSearch}></SearchDetailBar>
                <div className={styles.Recommendationdiv}>
                    <div className={styles.RecommendationUser}>
                        推荐商家
               </div>
                    <div className={styles.Recommendation}>

                        <div className={styles.RecommendationButton}>
                        中农任何
                    </div>
                        <div className={styles.RecommendationButton}>
                            中农任何
                    </div>
                        <div className={styles.RecommendationButton}>
                            中农任何
                    </div>
                        <div className={styles.RecommendationButton}>
                            中农任何
                    </div>
                        <div className={styles.RecommendationButton}>
                            中农任何中农任何
                    </div>
                        <div className={styles.RecommendationButton}>
                            中农任何
                    </div>
                        <div className={styles.RecommendationButton}>
                            中农任何
                    </div>
                        <div className={styles.RecommendationButton}>
                            中农任何
                    </div>
                        <div className={styles.RecommendationButton}>
                            中农任何q
                    </div>
                    </div>
                </div>


            </div>
        );
    }

}

export default zoneSearch;



