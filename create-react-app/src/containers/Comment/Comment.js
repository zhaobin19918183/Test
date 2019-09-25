/*
   CollectionItem  我是评论
*/
import React, {Component} from 'react';
import { ImagePicker } from 'antd-mobile';
import styles from './Comment.css'
class Comment extends Component {


    constructor(props) {
        super(props);

        this.state = {
            files:[]
          }
        
    }

    onChange = (files, type, index) => {
        // console.log(files, type, index);
        this.setState({
          files,
        });
      }
    
      render() {
        const { files } = this.state;
        return (
          <div>
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 5}
              accept="image/gif,image/jpeg,image/jpg,image/png"
            />
          </div>
        );
      }
    
}

export default Comment;



