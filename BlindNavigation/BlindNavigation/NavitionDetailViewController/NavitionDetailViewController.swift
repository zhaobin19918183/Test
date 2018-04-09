//
//  NavitionDetailViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit
import CoreLocation
class NavitionDetailViewController: UIViewController,BMKMapViewDelegate,BMKLocationServiceDelegate,CLLocationManagerDelegate {
    @IBOutlet weak var informationMapView: BMKMapView!
    var locaitonUser : BMKUserLocation!
    var locationService: BMKLocationService!
    let dic = NSMutableDictionary()
    var circle: BMKCircle?
    var polygon: BMKPolygon?
    var polyline: BMKPolyline?
    var colorfulPolyline: BMKPolyline?
    var arcline: BMKArcline?
    var ground: BMKGroundOverlay?
    var pointAnnotation: BMKPointAnnotation?
    var animatedAnnotation: BMKPointAnnotation?
    var lockedScreenAnnotation: BMKPointAnnotation?
    let coord = NSMutableArray()
    var dictionaryExample : [String:AnyObject] = [:]
    var index:Int = 0 
    var arrayExample : [AnyObject] = []
    var entity = LocationEntity()
    var  record = RecordManager()
    var start  =      VoiceBroadcasManager()
    //第几个点
    var pointNumber:Int = 0
    var mindistance = Int()
    var nextPoint = Int()
    var CoordinatesArray = [Coordinates]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationService = BMKLocationService()
        locationService.allowsBackgroundLocationUpdates = true
        locationService.startUserLocationService()
        informationMapView.showsUserLocation = false//先关闭显示的定位图层
        informationMapView.userTrackingMode = BMKUserTrackingModeFollow //设置定位的状态
        informationMapView.zoomLevel = 20.0
        informationMapView.showsUserLocation = true//显示定位图层
//         locationLine()
        CoordinatesLine()
        playMusicFile(number: 0)
        
        
        
//        let customRightBarButtonItem = UIBarButtonItem(title: "结束", style: .plain, target: self, action: #selector(InformationViewController.customLocationAccuracyCircle))
//        self.navigationItem.rightBarButtonItem = customRightBarButtonItem


     
//
        
    }
    override func viewDidDisappear(_ animated: Bool)
    {
        start.cancleSpeek()
    }
   
   
    
    
    @objc func customLocationAccuracyCircle()
    {
        
    
        self.navigationController?.popViewController(animated: true)
        
        
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        locationService.delegate = self
        informationMapView.delegate = self
        informationMapView.viewWillAppear()
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        locationService.delegate = self
        informationMapView.delegate = nil
        informationMapView.viewWillDisappear()
    }
    

    
    // MARK: - BMKMapViewDelegate
    
    
    // MARK: - BMKLocationServiceDelegate
    
    /**
     *在地图View将要启动定位时，会调用此函数
     *@param mapView 地图View
     */
    func willStartLocatingUser() {
        print("willStartLocatingUser");
    }
    
    /**
     *用户方向更新后，会调用此函数
     *@param userLocation 新的用户位置
     */
    func didUpdateUserHeading(_ userLocation: BMKUserLocation!) {
        print("heading is \(userLocation.heading)")
        //TODO:实时监听偏离路线
        
        ClosestPointOfDistance(userLocation: userLocation)
        informationMapView.updateLocationData(userLocation)
    }
    
    /**
     *用户位置更新后，会调用此函数
     *@param userLocation 新的用户位置
     */
    func didUpdate(_ userLocation: BMKUserLocation!) {
        
        locaitonUser = userLocation
        informationMapView.updateLocationData(userLocation)
    }
    //MARK:SDK还提供获取折线上与折线外指定位置最近点的方法。核心代码如下
    func  ClosestPointOfDistance(userLocation: BMKUserLocation)
    {
        let pointNow:BMKMapPoint =   BMKMapPointForCoordinate(CLLocationCoordinate2DMake(userLocation.location.coordinate.latitude,userLocation.location.coordinate.longitude));
        var pointDistanceArr:[AnyObject] = []
        for i  in 0...CoordinatesArray.count - 1 {
            let  coordinates:Coordinates = CoordinatesArray[i]
            let  locationlat =  coordinates.locationX
            let  locationlon =  coordinates.locationY
    
            let pointBefore:BMKMapPoint =   BMKMapPointForCoordinate(CLLocationCoordinate2DMake(Double(locationlat),Double(locationlon)));
  
           let distance  =  BMKMetersBetweenMapPoints(pointNow,pointBefore)
            pointDistanceArr.append(distance as AnyObject)
            
        }
    
        var min = Int(truncating: pointDistanceArr[0] as! NSNumber)
        for i in 0..<pointDistanceArr.count - 1 {
            
            let mindis = Int(truncating: pointDistanceArr[i] as! NSNumber)
            if  mindis < min  {
                min = mindis
                mindistance = i
            }
        }
        //TODO:到达下一个坐标点
        nextPoint(location: userLocation, number: mindistance)
        //TODO:判断是否迷路
        LostToJudge(location: userLocation, number: mindistance)
   
    }
    //MARK:是否到达下一个坐标点
    func nextPoint(location:BMKUserLocation, number:Int)
    {
        let  coordinates:Coordinates = CoordinatesArray[number]
        let pointBefore:BMKMapPoint =   BMKMapPointForCoordinate(CLLocationCoordinate2DMake(coordinates.locationX,coordinates.locationY))
         let pointNow:BMKMapPoint =   BMKMapPointForCoordinate(CLLocationCoordinate2DMake(location.location.coordinate.latitude,location.location.coordinate.longitude));
        let distance  =  BMKMetersBetweenMapPoints(pointNow,pointBefore)
        nextPoint = number
        if distance  < 2
        {
           start.startTranslattion(message: "距离目标位置还有3米,请注意", countrylanguage: "11")
           playMusicFile(number:nextPoint)
        }

    }
    //MARK:播放录音文件
    func playMusicFile(number:Int)
    {
        let  coordinates:Coordinates = CoordinatesArray[number]
        if coordinates.soundName != ""
        {
            record.play(HelperManager.file_pathString(nameString: coordinates.soundName!))
        }
        
    }
    //MARK:判断是否迷路
    func  LostToJudge(location:BMKUserLocation,number:Int)
    {

        let  coordinates:Coordinates = CoordinatesArray[number]
        let  heading:Double =  coordinates.heading
        let beforeHeading = heading
        let beforeAdd = beforeHeading + 15.0
        let beforeReduce  = beforeHeading - 15.0
        let nowHeading   =  Double(location.heading.trueHeading)
        if nowHeading <= 180.0
        {
            if beforeReduce  < nowHeading && beforeReduce < 15.0
            {
                  start.startTranslattion(message: "脱离路线,请注意,请向右侧移动", countrylanguage: "11")
            } else
            if beforeReduce > 345.0
            {
                start.startTranslattion(message: "脱离路线,请注意,请向右侧移动", countrylanguage: "11")
            }
            else
            if   nowHeading < beforeAdd
            {
                
                start.startTranslattion(message: "脱离路线,请注意,请向左侧移动", countrylanguage: "11")
            }
            else
            {
                start.startTranslattion(message: "路线正确请直行", countrylanguage: "11")

            }
            
        }
        else
        {
            if beforeAdd > 270.0 && beforeAdd < nowHeading
            {
                  start.startTranslattion(message: "脱离路线,请注意,请向左侧移动", countrylanguage: "11")
                
            }
            else
            if  beforeAdd < 90.0
            {
                  start.startTranslattion(message: "脱离路线,请注意,请向左侧移动", countrylanguage: "11")
            }
            else
            if beforeReduce > nowHeading
            {
                 start.startTranslattion(message: "脱离路线,请注意,请向右侧移动", countrylanguage: "11")
            }
            else
            
            {
                 start.startTranslattion(message: "路线正确请直行", countrylanguage: "11")
 
            }
           
            
            
        }
        
        
    
        
    }
    
    
    /**
     *在地图View停止定位后，会调用此函数
     *@param mapView 地图View
     */
    func didStopLocatingUser() {
        print("didStopLocatingUser")
    }
   
    func getDictionaryFromJSONString(jsonString:String) ->NSArray{
        
        let jsonData:Data = jsonString.data(using: .utf8)!
        
        let dict = try? JSONSerialization.jsonObject(with: jsonData, options: .mutableContainers)
        if dict != nil {
            return dict as! NSArray
        }
        return NSArray()
        
        
    }
    //MARK:画出地图上的运动轨迹和记录点
    func CoordinatesLine()
    {
        for i in 0...CoordinatesArray.count - 1 {
            
            let  coordinates:Coordinates = CoordinatesArray[i]
            let coords2DMake = CLLocationCoordinate2DMake(coordinates.locationX,coordinates.locationY )
            coord.add(coords2DMake)
            pointAnnotation = BMKPointAnnotation()
            pointAnnotation?.coordinate = CLLocationCoordinate2DMake(coordinates.locationX,coordinates.locationY)
//            pointAnnotation?.title = coordinates.locationX
//            pointAnnotation?.subtitle = coordinates.locationY
            
            informationMapView.addAnnotation(pointAnnotation)
        }
         self.addOverlayViews()
        
        
    }
    
    
    func locationLine()
    {
//        CoordinatesArray
        
        let naviModel = NavigationModel.convertFrom(WeatherDAO.SearchAllDataEntity()[index] as! LocationEntity)
        let dictionary:String = NSKeyedUnarchiver.unarchiveObject(with: naviModel.coordinates!)! as! String
       
      let array = getDictionaryFromJSONString(jsonString: dictionary)
 
      
        
        for i in 0...array.count - 1 {
            
            let  dictionary:NSDictionary = array[i] as! NSDictionary
            let  locationlat =  dictionary.value(forKey: "locationlat") as! String
            let  locationlon =  dictionary.value(forKey: "locationlon")  as! String
            let coords2DMake = CLLocationCoordinate2DMake(Double(locationlat)! ,Double(locationlon)! )
            coord.add(coords2DMake)
            
            pointAnnotation = BMKPointAnnotation()
            pointAnnotation?.coordinate = CLLocationCoordinate2DMake(Double(locationlat)!, Double(locationlon)!)
            pointAnnotation?.title = locationlat
            pointAnnotation?.subtitle = locationlon
            
            informationMapView.addAnnotation(pointAnnotation)
        }
        
        
        
        
        
        self.addOverlayViews()
    }
    //添加内置覆盖物
    func addOverlayViews() {
        
        // 添加折线覆盖物
        if polyline == nil {
            
            var coords = [
                self.coord[0] as!  CLLocationCoordinate2D]
            for i in 1...coord.count - 1
            {
                coords.append(self.coord[i] as!  CLLocationCoordinate2D)
            }
            polyline = BMKPolyline(coordinates: &coords, count: UInt(coord.count))
        }
        informationMapView.add(polyline)
        
    }
    
    // MARK: - BMKMapViewDelegate
    
    /**
     *根据overlay生成对应的View
     *@param mapView 地图View
     *@param overlay 指定的overlay
     *@return 生成的覆盖物View
     */
    func mapView(_ mapView: BMKMapView!, viewFor overlay: BMKOverlay!) -> BMKOverlayView! {
        
        if (overlay as? BMKCircle) != nil {
            let circleView = BMKCircleView(overlay: overlay)
            circleView?.fillColor = UIColor(red: 1, green: 0, blue: 0, alpha: 0.5)
            circleView?.strokeColor = UIColor(red: 0, green: 0, blue: 1, alpha: 0.5)
            circleView?.lineWidth = 5
            
            return circleView
        }
        
        if (overlay as? BMKPolygon) != nil {
            let polygonView = BMKPolygonView(overlay: overlay)
            polygonView?.strokeColor = UIColor(red: 0, green: 0, blue: 0.5, alpha: 1)
            polygonView?.fillColor = UIColor(red: 0, green: 1, blue: 1, alpha: 0.2)
            polygonView?.lineWidth = 1
            polygonView?.lineDash = true
            return polygonView
        }
        
        if let overlayTemp = overlay as? BMKPolyline {
            let polylineView = BMKPolylineView(overlay: overlay)
            if overlayTemp == polyline {
                polylineView?.strokeColor =  UIColor(red: 0, green: 0, blue: 0.5, alpha: 1)
                polylineView?.lineWidth = 3
                polylineView?.loadStrokeTextureImage(UIImage(named: "texture_arrow.png"))
            } else if overlayTemp == colorfulPolyline {
                polylineView?.lineWidth = 5
                /// 使用分段颜色绘制时，必须设置（内容必须为UIColor）
                polylineView?.colors = [UIColor(red: 0, green: 1, blue: 0, alpha: 1),
                                        UIColor(red: 1, green: 0, blue: 0, alpha: 1),
                                        UIColor(red: 1, green: 1, blue: 0, alpha: 1)]
            }
            return polylineView
        }
        
        if (overlay as? BMKGroundOverlay) != nil {
            let groundView = BMKGroundOverlayView(overlay: overlay)
            return groundView
        }
        
        if (overlay as? BMKArcline) != nil {
            let arclineView = BMKArclineView(overlay: overlay)
            arclineView?.strokeColor = UIColor(red: 0, green: 0, blue: 1, alpha: 1)
            arclineView?.lineDash = true
            arclineView?.lineWidth = 6
            
            return arclineView
        }
        return nil
    }
    
    /**
     *当mapView新添加overlay views时，调用此接口
     *@param mapView 地图View
     *@param overlayViews 新添加的overlay views
     */
    func mapView(_ mapView: BMKMapView!, didAddOverlayViews overlayViews: [Any]!) {
        print("didAddOverlayViews")
    }
    
}
