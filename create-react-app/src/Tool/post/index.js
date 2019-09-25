import React, { Component } from 'react';
import css from './index.module.scss';
import {NavLink} from 'react-router-dom';
import FooterPC from '../../components/footer';
import header_logoImg from '../../asset/header_logo.png';
import post_banner1Img from '../../asset/post_banner1.png';
import post_main_convenientImg from '../../asset/post_main_convenient.png';
import post_main_timeImg from '../../asset/post_main_time.png';
import post_main_locationImg from '../../asset/post_main_location.png';
import post_main_list1Img from '../../asset/post_main_list1.png';
import { Carousel, Input, Avatar, Button,} from 'antd';
import {Net,PostNet} from './request';
import Advertisement from '../../components/Advertisement/index';
import  { getTimeChange } from './util'

import axios from 'axios';
const carListkey=[];
const Search = Input.Search;



// const renderTabBar = (props, DefaultTabBar) => (
//   <Sticky bottomOffset={80}>
//     {({ style }) => (
//       <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
//     )}
//   </Sticky>
// );

class Post extends Component{

	constructor(props) {
	  super(props);

	  this.state = {
      datademand:[],
	  };
  }

  componentDidMount() {


     Net('demand/views')
      .then(res => {
        // console.log("123 == "+res);
        this.setState({
        datademand:res
       })
      })
      .catch(err => {
        // console.log("456==="+err);
      })

    // axios.get('https://www.effects.cn/wp-json/wp/v2/demand/views').then((res)=>{
    //   console.log(res.data)
    //
    // })
  }

	render () {
	    const releaseDate = getTimeChange('2019-6-9')
      // console.log(releaseDate)
		return  <div className={css.post}>
              <div className={css.headernav}>
                <div className={css.headernav_left}>
                  <a href="https://www.baidu.com">
                    <img src={header_logoImg} alt="" />
                  </a>
                  <div className={css.headernav_left_route}>
                    <NavLink className={css.headernav_left_route_link} to="/post">首页</NavLink>
                    <NavLink className={css.headernav_left_route_link} to="/resources">资源</NavLink>
                    <NavLink className={css.headernav_left_route_link} to="/programme">策划方案</NavLink>
                    <NavLink className={css.headernav_left_route_link} to="/material">设计素材</NavLink>
                    <NavLink className={css.headernav_left_route_link} to="/requirementsList">近期需求</NavLink>
                  </div>
                </div>
                <div className={css.headernav_right}>
                  <a href="https://www.baidu.com">登录/注册</a>
                </div>
              </div>
              <div className={css.post_banner}>
                <Carousel
                  autoplay
                >
                  <div>
                    <img src={post_banner1Img} alt="" />
                  </div>
                  <div>
                    <img src={post_banner1Img} alt="" />
                  </div>
                  <div>
                    <img src={post_banner1Img} alt="" />
                  </div>
                </Carousel>
                <Search placeholder="请输入想要搜索的关键词"
                        onSearch={value => {
                          // console.log(value)
                        }}
                        enterButton
                        style={{width:830 , height:60}}
                        className={css.post_banner_search}
                />
              </div>

              <div className={css.post_main}>

                <div className={css.post_main_demand}>
                  <div className={css.post_main_demand_Apart}>
                    <p className={css.post_main_demand_Apart_p}>近期需求</p>
                    <div className={css.post_main_demand_Apart_div}>
                      <div className={css.post_main_demand_Apart_div1}>
                        <img src={post_main_convenientImg} alt="" /> 发布需求
                      </div>
                      <div className={css.post_main_demand_Apart_div2}>
                        更多 ＞
                      </div>
                    </div>
                  </div>

                  <div className={css.post_main_demand_Twopart}>Recent demand</div>

                  <div className={css.post_main_demand_Threepart}>
                    <ul className={css.Threepart}>
                      {
                        this.state.datademand.map(item => {


                          for(var  value =0;value < item.items.length; value++) {
                            //  console.log(value)
                            carListkey.push(item.items[value])

                          }
                          //  console.log(carListkey)

                            return (
                            <li className={css.Threepart_list}>
                              <div className={css.Threepart_list_box}>
                                <div className={css.list_box_left}>
                                  <Avatar size={50} icon="user" />
                                  <div className={css.left_title}>
                                    <p className={css.title_name}>{item.header}</p>
                                    <p className={css.title_fabu}>
                                      <i>发布于</i> <span>{getTimeChange('2019-6-9')}</span>
                                    </p>
                                  </div>
                                </div>
                                <Button type="primary" shape="round" style={{background:"#1F55FF"}}>
                                  去看看
                                </Button>
                              </div>
                              <div className={css.Threepart_list_con}>地产开盘需要礼仪模特10人</div>
                              <div className={css.Threepart_list_foo}>
                                <div className={css.foo_location}>
                                  <div>
                                    <img src={post_main_locationImg} alt="" />
                                  </div>
                                  <div className={css.location}>
                                    <i>沈阳</i>
                                    <span>沈河区</span>
                                  </div>
                                </div>
                                <div className={css.foo_time}>
                                  <div>
                                    <img src={post_main_timeImg} alt="" />
                                  </div>
                                  <div className={css.time}>2019-05-28</div>
                                </div>
                              </div>
                            </li>
                            )
                         })
                      }

{/*
                      <li className={css.Threepart_list}>
                        <div className={css.Threepart_list_box}>
                          <div className={css.list_box_left}>
                            <Avatar size={50} icon="user" />
                            <div className={css.left_title}>
                              <p className={css.title_name}>Username</p>
                              <p className={css.title_fabu}>
                                <i>发布于</i> <span>3小时前</span>
                              </p>
                            </div>
                          </div>
                          <Button type="primary" shape="round" style={{background:"#1F55FF"}}>
                            去看看
                          </Button>
                        </div>
                        <div className={css.Threepart_list_con}>地产开盘需要礼仪模特10人</div>
                        <div className={css.Threepart_list_foo}>
                          <div className={css.foo_location}>
                            <div>
                              <img src={post_main_locationImg} alt="" />
                            </div>
                            <div className={css.location}>
                              <i>沈阳</i>
                              <span>沈河区</span>
                            </div>
                          </div>
                          <div className={css.foo_time}>
                            <div>
                              <img src={post_main_timeImg} alt="" />
                            </div>
                            <div className={css.time}>2019-05-28</div>
                          </div>
                        </div>
                      </li>

                      <li className={css.Threepart_list}>
                        <div className={css.Threepart_list_box}>
                          <div className={css.list_box_left}>
                            <Avatar size={50} icon="user" />
                            <div className={css.left_title}>
                              <p className={css.title_name}>Username</p>
                              <p className={css.title_fabu}>
                                <i>发布于</i> <span>3小时前</span>
                              </p>
                            </div>
                          </div>
                          <Button type="primary" shape="round" style={{background:"#1F55FF"}}>
                            去看看
                          </Button>
                        </div>
                        <div className={css.Threepart_list_con}>地产开盘需要礼仪模特10人</div>
                        <div className={css.Threepart_list_foo}>
                          <div className={css.foo_location}>
                            <div>
                              <img src={post_main_locationImg} alt="" />
                            </div>
                            <div className={css.location}>
                              <i>沈阳</i>
                              <span>沈河区</span>
                            </div>
                          </div>
                          <div className={css.foo_time}>
                            <div>
                              <img src={post_main_timeImg} alt="" />
                            </div>
                            <div className={css.time}>2019-05-28</div>
                          </div>
                        </div>
                      </li>

                      <li className={css.Threepart_list}>
                        <div className={css.Threepart_list_box}>
                          <div className={css.list_box_left}>
                            <Avatar size={50} icon="user" />
                            <div className={css.left_title}>
                              <p className={css.title_name}>Username</p>
                              <p className={css.title_fabu}>
                                <i>发布于</i> <span>3小时前</span>
                              </p>
                            </div>
                          </div>
                          <Button type="primary" shape="round" style={{background:"#1F55FF"}}>
                            去看看
                          </Button>
                        </div>
                        <div className={css.Threepart_list_con}>地产开盘需要礼仪模特10人</div>
                        <div className={css.Threepart_list_foo}>
                          <div className={css.foo_location}>
                            <div>
                              <img src={post_main_locationImg} alt="" />
                            </div>
                            <div className={css.location}>
                              <i>沈阳</i>
                              <span>沈河区</span>
                            </div>
                          </div>
                          <div className={css.foo_time}>
                            <div>
                              <img src={post_main_timeImg} alt="" />
                            </div>
                            <div className={css.time}>2019-05-28</div>
                          </div>
                        </div>
                      </li>

                      <li className={css.Threepart_list}>
                        <div className={css.Threepart_list_box}>
                          <div className={css.list_box_left}>
                            <Avatar size={50} icon="user" />
                            <div className={css.left_title}>
                              <p className={css.title_name}>Username</p>
                              <p className={css.title_fabu}>
                                <i>发布于</i> <span>3小时前</span>
                              </p>
                            </div>
                          </div>
                          <Button type="primary" shape="round" style={{background:"#1F55FF"}}>
                            去看看
                          </Button>
                        </div>
                        <div className={css.Threepart_list_con}>地产开盘需要礼仪模特10人</div>
                        <div className={css.Threepart_list_foo}>
                          <div className={css.foo_location}>
                            <div>
                              <img src={post_main_locationImg} alt="" />
                            </div>
                            <div className={css.location}>
                              <i>沈阳</i>
                              <span>沈河区</span>
                            </div>
                          </div>
                          <div className={css.foo_time}>
                            <div>
                              <img src={post_main_timeImg} alt="" />
                            </div>
                            <div className={css.time}>2019-05-28</div>
                          </div>
                        </div>
                      </li>

                      <li className={css.Threepart_list}> */}
                        {/* <div className={css.Threepart_list_box}>
                          <div className={css.list_box_left}>
                            <Avatar size={50} icon="user" />
                            <div className={css.left_title}>
                              <p className={css.title_name}>Username</p>
                              <p className={css.title_fabu}>
                                <i>发布于</i> <span>3小时前</span>
                              </p>
                            </div>
                          </div>
                          <Button type="primary" shape="round" style={{background:"#1F55FF"}}>
                            去看看
                          </Button>
                        </div>
                        <div className={css.Threepart_list_con}>地产开盘需要礼仪模特10人</div>
                        <div className={css.Threepart_list_foo}>
                          <div className={css.foo_location}>
                            <div>
                              <img src={post_main_locationImg} alt="" />
                            </div>
                            <div className={css.location}>
                              <i>沈阳</i>
                              <span>沈河区</span>
                            </div>
                          </div>
                          <div className={css.foo_time}>
                            <div>
                              <img src={post_main_timeImg} alt="" />
                            </div>
                            <div className={css.time}>2019-05-28</div>
                          </div>
                        </div>
                      </li> */}
                    </ul>
                  </div>
                </div>

                <div className={css.post_main_resources}>
                  <div className={css.post_main_demand_Apart}>
                    <p className={css.post_main_demand_Apart_p}>最新资源</p>
                    <div className={css.post_main_demand_Apart_div}>
                      <div className={css.post_main_demand_Apart_div2}>
                        更多 ＞
                      </div>
                    </div>
                  </div>
                  <div className={css.post_main_demand_Twopart}>Latest resources</div>
                  <ul className={css.post_main_resources_Threepart}>
                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>

                    <li className={css.resources_list}>
                      <div>
                        <img src={post_main_list1Img} alt="" />
                      </div>
                      <div className={css.resources_text}>
                        <p className={css.text_content}>led射灯聚光导轨灯服装店展厅</p>
                        <div className={css.text_price}>
                          <p className={css.price_va}>
                            <i>￥</i>
                            <span>320</span>
                          </p>
                          <p className={css.price_sold}>已售: 20</p>
                        </div>
                        <div className={css.text_user}>
                          <Avatar size={30} icon="user" />
                          <span className={css.user_name}>Username</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className={css.post_advertisement}>
                  <Advertisement></Advertisement>
                </div>
              </div>
              <FooterPC></FooterPC>
        </div>
    }
    
}
export default Post;