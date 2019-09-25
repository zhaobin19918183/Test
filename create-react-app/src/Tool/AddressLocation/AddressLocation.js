/*
  
*/
import React, {Component} from 'react';
import { Map} from 'react-amap';
import Geolocation from 'react-amap-plugin-geolocation';
class AddressLocation extends Component {


    constructor(props) {
        super(props);

        this.state = {
          pluginProps : {
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 100,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
                extensions:'all'
            }
            ,
            location:true
        };
    }

    render() {
        // console.log(this.state.location)
        return (
         <div>
          
          <Map >
            
             <Geolocation
                    ref={(locat)=>
                        
                        {this.state.location?
                         locat.geolocation.getCurrentPosition((status,getData)=>{
                          this.setState({
                              location:false
                          })
                        //   console.log(getData)
                          this.props.addressL.addressLocation(getData)
                       
                      }):null}
                    }
                    {...this.state.pluginProps} />
          </Map>

         </div>
        );
      }
    
}

export default AddressLocation;



