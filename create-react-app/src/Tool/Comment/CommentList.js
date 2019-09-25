/*
   Comment  评论
*/
import React, { Component } from 'react';
import styles from './CommentList.css'
import collection from '../../image/collection.png'
import start0 from  '../../image/start0.png'
import start1 from  '../../image/start1.png'
import start2 from  '../../image/start2.png'
import start3 from  '../../image/start3.png'
import start4 from  '../../image/start4.png'
import start5 from  '../../image/start5.png'
import initAva from '../../image/init_headerImg_small.png'
class CommentList extends Component {


    constructor(props) {
        super(props);

        this.state = {
            startNumber:3,
            imageHidden:true,
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

  componentDidMount()
  {
      this.setState({
        startNumber:this.props.data.score
      })
  }

    render() {
        return (
            <div className={styles.CommentList}>
                <div className={styles.commentContentTitle}>
                <div className={styles.CommentListItemTitle}>
                    <div>
                        {
                            this.props.data.headimgurl?<img src={this.props.data.headimgurl} className={styles.CommentListImg}></img>:<img src={initAva} className={styles.CommentListImg}></img>
                        }
                    </div>
                </div>
                 <div>
                 <div className={styles.commentContentName}>
                  <div className={styles.commentContentName2}>{this.props.data.nickname}</div>
                  <div className={styles.commentContentName3}>{this.props.data.createTime.slice(0,10)}</div>
                  </div>
                  <div className={styles.commentContentName1}>
                   <img src={this.state.startNumber==0?start0:this.state.startNumber==1?start1:this.state.startNumber==2?
                   start2:this.state.startNumber==3?start3:this.state.startNumber==4?start4:this.state.startNumber==5?start5:null}  className={styles.startImage}></img>
                  </div>
                 </div>
 

                </div>
                <div className={styles.commentContent}>{this.props.data.content}</div>
                {this.props.data.hasImages == 1?
                <div className={styles.listul}>

                    {
                        this.props.data.images.map((item) =>
                            <li className={styles.maplicss} key={item.id}>
                                <img alt="example" className={styles.list_box_img} src={item.picUrl} />
                            </li>

                        )
                    }

                </div>:null
            }
            </div>
        );
    }

}

export default CommentList;



