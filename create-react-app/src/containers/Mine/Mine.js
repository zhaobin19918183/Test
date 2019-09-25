/*
   Mine 我的
*/
import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import { Map, Marker } from 'react-amap';
import Header from '../../Tool/Header/Header'




class Mine extends Component {


    constructor(props) {
        super(props);
       
        this.toolEvents = {
          created: (tool) => {
            this.tool = tool;
          
          }
        }
        this.mapPlugins = ['ToolBar'];
        this.mapCenter = {longitude:45.882324 , latitude: 125.26184};
        this.markerPosition = {longitude:45.882324 , latitude: 125.26184};
        this.state = {
          
           lng:0,
          lat:0,
        };
    }
    back = () => {
      // console.log("header back home")
  }
    componentDidMount()
    {

      var strArr = this.props.history.location.state.location.coordinate.split(",");
      this.setState({
        lat:strArr[1],
        lng:strArr[0],

      })
      // console.log(strArr)
   
    }
    render() {
      const HaederBack =
      {
          headerBack: this.back
      }

        return (
             
         <div style={{width: '100%', height: "93vh"}}>
             <Header HaederBack={HaederBack} title={"定位"}></Header>
      <Map 
        plugins={['ToolBar']} 
        center={{longitude: this.state.lng, latitude:  this.state.lat}} 
        zoom={15}
      >
        <Marker
          position={{longitude: this.state.lng, latitude: this.state.lat }} 
          clickable
          events={this.markerEvents}
        />
      </Map>
     </div>

        );
      }
    
}

export default Mine;



