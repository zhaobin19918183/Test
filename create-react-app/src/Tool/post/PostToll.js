import React from 'react'
import css from "./index.module.scss";
import {Avatar, Button} from "antd";
export default class PostToll extends React.Component {

componentDidMount() {

}
componentDidUpdate() {

}
render() {

      return  <div className={css.Threepart_list_box}>
                          <div className={css.list_box_left}>
                            <Avatar size={50} icon="user" />
                            <div className={css.left_title}>
                              <p className={css.title_name}>Username</p>
                              <p className={css.title_fabu}>
                                <i>发布于</i> <span>5小时前</span>
                              </p>
                            </div>
                          </div>
                          <Button type="primary" shape="round" style={{background:"#1F55FF"}}>
                            去看看
                          </Button>
                        </div>
}
}