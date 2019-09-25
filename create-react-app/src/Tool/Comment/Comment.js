/*
   Comment  评论
*/
import React, {Component} from 'react';
import styles from './Comment.css'
import CommentList from './CommentList'
import nocomment from '../../image/nocomment.png'
import { PullToRefresh } from 'antd-mobile';
var  array=[]
class Comment extends Component {


    constructor(props) {
        super(props);

        this.state = {
          number:100,
          nocomment:false,
          height: document.documentElement.clientHeight,
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
    ToCommentDetail=()=>
    {
        this.props.ToCommentDetail.ToCommentDetail()
    }

    ToCommentList=()=>
    {
     
        this.props.ToCommentDetail.CommentList()
    }
componentWillMount()
{
    // console.log( this.props)
}
    render() {
        return (
         <div>
            {this.props.showfalse == -100? null:<div className={styles.CommentTitle}>
                <div className={styles.CommentTitle1}>
                        用户评价
                    </div>
                <div className={styles.CommentTitle2} onClick={this.ToCommentDetail}>
                        查看全部 >
                    </div>
                  
                </div>}
                {this.state.nocomment?
                <img src={nocomment} className={styles.nocomment}></img>:
                this.props.pull?
                <PullToRefresh
                damping={60}
                ref={el => this.ptr = el}
                style={{
                    height:this.state.height<510?this.state.height*0.72:this.state.height,  
                    overflow: 'auto'
                }}
                indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                   
                    this.ToCommentList()
                }}
              >
                 {
                     this.props.commentlist.map(function (el, index) {
                   
                        return  <div key={index} style={{'padding': '0 6vw'}}><CommentList   data={el}></CommentList></div>
                      })
                }
              
              </PullToRefresh>: 
                     this.props.commentlist.map(function (el, index) {
                   
                        return  <div key={index} style={{'padding': '0 6vw'}}><CommentList   data={el}></CommentList></div>
                      })
                // this.props.commentlist.map((item) =>
                // <CommentList data={item}></CommentList>)
                 }
         </div>
        );
      }
    
}

export default Comment;



