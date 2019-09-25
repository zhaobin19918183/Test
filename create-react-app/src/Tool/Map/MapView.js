
import React, { Component } from 'react';
import { Map, Markers } from 'react-amap';
import Header from '../../Tool/Header/Header'
// import {createHashHistory} from 'history'
const randomPosition = () => ({
  longitude: 100 + Math.random() * 20,
  latitude: 30 + Math.random() * 20
})
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: randomPosition()
  }))
);
class MapView extends Component {


  constructor() {
    super();
    this.state = {
      markers: [],
      center: randomPosition()
    }
    this.randomMarkers = this.randomMarkers.bind(this)

  }

  back = () => {
    
    // const history = createHashHistory();
    // history.goBack();  
  }
  componentWillMount() {
    this.randomMarkers()
  }
  randomMarkers() {

    this.setState({
      markers: this.props.history.location.state.map,
      center: this.props.history.location.state.map[0].position
    })
  }
  componentDidMount() {

    //  console.log(this.props.history.location.state.map,parseFloat(sessionStorage.getItem("lacotionlng")) )
  }
  render() {
    const HaederBack =
    {
      headerBack: this.back
    }
    return (
      <div>
        <Header HaederBack={HaederBack} title={"地图模式"}></Header>
        <div >
          <div style={{ width: '100%', height: '95vh' }}>
            <Map plugins={['ToolBar']} center={this.state.center} zoom={15}>
              <Markers
                markers={this.state.markers}
              />
            </Map>
          </div>

        </div>

      </div>
    );
  }

}

export default MapView;



