import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import axios from 'axios';
import styles from './carousel.css'
import defaultImg from '../../image/defaultImg_small.png'

class DetailCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
      bannerImage: [],
      banner:false
    };
  }
  goTo(value){
  //  console.log(value)
  // / window.location.href = 'https://你的url'
  }

  carouselJump(val){
    // console.log(val)
    window.location.href = val.linkUrl;
  }

  componentDidMount() {
   
    if (this.props.class == "integral") {
      axios.get(this.props.bannerImage).then((res) => {
        const image = []
        res.data.attach.map(function (el, index) {

          image.push(el.bannerLogo)
        })

        this.setState({
          bannerImage: image
        })

      })


    }
    else
      if (this.props.class == "home") {
   

        axios.get(this.props.bannerImage).then((res) => {
          this.setState({
            bannerImage: res.data.attach
          })
        })
      }
      else {
      
        axios.get(this.props.bannerImage).then((res) => {
        //   console.log("========   111=============")
        //   console.log(res)
        //   console.log("=========22============")
          if(res.data.code == "0")
          {
            this.setState({
              bannerImage: res.data.attach.picUrls
            })
          }
        
        })
      }


  }
  render() {
    const picture = this.props.class;
    const self = this;
    let content;

    if(this.props.bannerImage.length != 0){
        content = this.props.bannerImage.map(function (el, index) {
                return <a key={index} style={{ display: 'inline-block', width: '100%' }} >
                            <img src={picture == "home" ? el.picUrl : el} style={{ width: '100%' }} alt=""  onClick={self.carouselJump.bind(self,el)}  onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                            }} />
                        </a>
        })
    }else{
        content = (
            <a style={{ display: 'inline-block', width: '100%' }} >
                <img src={defaultImg} style={{ width: '100%' }} alt="" onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                }} />
            </a>
        )
    };
    return (
        <Carousel autoplay={true} infinite slideWidth={1} >
            {content}
        </Carousel>
    );
  }

}
export default DetailCarousel;