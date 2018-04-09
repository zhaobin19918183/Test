//
//  InformationViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit
import CoreLocation
class InformationViewController: UIViewController,BMKMapViewDelegate,BMKLocationServiceDelegate,CLLocationManagerDelegate {

    @IBOutlet weak var EmergencyContactButton: UIButton!
    @IBOutlet weak var informationMapView: BMKMapView!
    @IBOutlet weak var informationButton: UIButton!
    var locaitonUser : BMKUserLocation!
    var locaitonUserHeadering : BMKUserLocation!
    var locationService: BMKLocationService!
    let dic = NSMutableDictionary()
    let array = NSMutableArray()
    //画折线
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
    //事件保存坐标
    var dictionaryExample = NSMutableDictionary()
    var arrayExample  = NSMutableArray()
    //录音文件
    var nameString:String = ""
    var  record = RecordManager()
    var number :Int = 9990
    var soundName = NSMutableArray()
    //TODO:数据库优化参数
        let coordinatesDic = NSMutableDictionary()
    override func viewDidLoad() {
        super.viewDidLoad()
        locationService = BMKLocationService()
        locationService.allowsBackgroundLocationUpdates = true
        print("进入普通定位态");
        locationService.startUserLocationService()
        informationMapView.showsUserLocation = false//先关闭显示的定位图层
        informationMapView.userTrackingMode = BMKUserTrackingModeFollow //设置定位的状态
        informationMapView.zoomLevel = 20.0
        informationMapView.showsUserLocation = true//显示定位图层
        
        let customRightBarButtonItem = UIBarButtonItem(title: "结束", style: .plain, target: self, action: #selector(InformationViewController.customLocationAccuracyCircle))
        self.navigationItem.rightBarButtonItem = customRightBarButtonItem
        
        
        
    }
    
    @objc func customLocationAccuracyCircle()
    {
//        coredataDic()
        coredatamanager()
        stopRecordAction()
        self.navigationController?.popViewController(animated: true)
    }
    //停止录音
    func stopRecordAction()
    {
        record.stopRecord(HelperManager.file_pathString(nameString: "\(HelperManager.converLocalTime())_\(number + 1).wav"))
        
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
    //MARK:开始录音
    func startToRecord()
    {
        
        record.beginRecord(HelperManager.file_pathString(nameString: "\(HelperManager.converLocalTime())_\(number + 1).wav"))
       soundName.add("\(HelperManager.converLocalTime())_\(number + 1).wav")
      
    }
    // MARK: - BMKMapViewDelegate
    // MARK: - BMKLocationServiceDelegate
    
    func willStartLocatingUser() {
        print("willStartLocatingUser");
    }
    
    /**
     *用户方向更新后，会调用此函数
     *@param userLocation 新的用户位置
     */
    func didUpdateUserHeading(_ userLocation: BMKUserLocation!) {
        print("heading is \(userLocation.heading)")
        locaitonUserHeadering = userLocation
//        locaitonUser = userLocation
        informationMapView.updateLocationData(userLocation)
    }
    
    /**
     *用户位置更新后，会调用此函数
     *@param userLocation 新的用户位置
     */
    func didUpdate(_ userLocation: BMKUserLocation!) {

        locaitonUser = userLocation
        locaitonUserHeadering =  userLocation
        informationMapView.updateLocationData(userLocation)
         print("heading is \(userLocation)")
        //TODO:初次进入导航页面记录获取到的第一个点,并录音
        if arrayExample.count == 0 && locaitonUserHeadering.heading != nil
        {
//           startToRecord()
            //TODO:起始位置没有录音
            locationUserMessage(nameString:"")
        }
       if  arrayExample.count != 0 && locaitonUserHeadering.heading != nil
        {
//            stopRecordAction()
            SameIntervalDistance()
        }
    }
    
    /**
     *在地图View停止定位后，会调用此函数
     *@param mapView 地图View
     */
    func didStopLocatingUser() {
        print("didStopLocatingUser")
    }
    //MARK:相同间隔距离
    func SameIntervalDistance()
    {
        let pointNow:BMKMapPoint  = BMKMapPointForCoordinate(CLLocationCoordinate2DMake(locaitonUser.location.coordinate.latitude,locaitonUser.location.coordinate.longitude));
        let  beforelat = dictionaryExample["locationlat"]
        let  beforelon = dictionaryExample["locationlon"]
        let pointBefore:BMKMapPoint  = BMKMapPointForCoordinate(CLLocationCoordinate2DMake(beforelat! as! CLLocationDegrees ,beforelon! as! CLLocationDegrees));
        let distance:CLLocationDistance =  BMKMetersBetweenMapPoints(pointBefore,pointNow)
        
        if distance >= 5 && distance < 10{

            locationUserMessage(nameString:"")
            
        }
        print(distance)
    }
    //MARK:画出地图上的运动轨迹和记录点
    func locationLine()
    {
        
        for i in 0...arrayExample.count - 1 {
            
            let  dictionary:NSDictionary = arrayExample[i] as! NSDictionary
            let  locationlat:Double =  dictionary.value(forKey: "locationlat") as! Double
            let  locationlon:Double =  dictionary.value(forKey: "locationlon") as! Double
            let coords2DMake = CLLocationCoordinate2DMake(locationlat ,locationlon )
            coord.add(coords2DMake)
            
            pointAnnotation = BMKPointAnnotation()
            pointAnnotation?.coordinate = CLLocationCoordinate2DMake(locationlat, locationlon)
//            pointAnnotation?.title = locationlat
//            pointAnnotation?.subtitle = locationlon
            
            informationMapView.addAnnotation(pointAnnotation)
        }
        
        self.addOverlayViews()
    }
    //添加内置覆盖物
    func addOverlayViews() {
            var coords = [
                self.coord[0] as!  CLLocationCoordinate2D]
           coords.append(self.coord[0] as!  CLLocationCoordinate2D)
            if coord.count > 1
            {
                for i in 1...coord.count - 1
                {
                    coords.append(self.coord[i] as!  CLLocationCoordinate2D)
                }
            }
        polyline = BMKPolyline(coordinates: &coords, count: UInt(coord.count))
      
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
        
            let polylineView = BMKPolylineView(overlay: overlay)
           
            polylineView?.strokeColor =  UIColor(red: 0, green: 0, blue: 0.5, alpha: 1)
            polylineView?.lineWidth = 3
            polylineView?.loadStrokeTextureImage(UIImage(named: "texture_arrow.png"))
            return polylineView

    }
    
    /**
     *当mapView新添加overlay views时，调用此接口
     *@param mapView 地图View
     *@param overlayViews 新添加的overlay views
     */
    func mapView(_ mapView: BMKMapView!, didAddOverlayViews overlayViews: [Any]!) {
        print("didAddOverlayViews")
    }
    //MARK:记录当前的坐标点以及录音
    @IBAction func informationAction(_ sender: UIButton)
    {
        startToRecord()
        locationUserMessage(nameString: HelperManager.converLocalTime())
    }
    //MARK:获取需要记录点的坐标
    func  locationUserMessage(nameString:String)
    {
        let locationlat :Double =   locaitonUser.location.coordinate.latitude
        let locationlon :Double  =    locaitonUser.location.coordinate.longitude
        dictionaryExample = ["locationlat":locationlat as AnyObject,"locationlon":locationlon as AnyObject,"headering":locaitonUserHeadering.heading.trueHeading as AnyObject,"soundName":nameString as AnyObject]
     
        arrayExample.add(dictionaryExample)
        locationLine()
    }
    //MARK:数据库优化
    func  coredatamanager()
    {
        //arrayExample
        let locationDic = NSMutableDictionary()
        locationDic.setValue(HelperManager.converLocalTime(), forKey: "locationDate")
        locationDic.setValue(HelperManager.converLocalTime(), forKey: "locationName")
        locationDic.setValue(1, forKey: "locationID")
        CoredataManager.coredataManagerLocation(LocationDic: locationDic, coordinatesArray: arrayExample)
        
    }

    func testSaveArrayPlist(arrayObject:NSMutableArray) ->NSData{
        //JSONSerialization
        let data = try? JSONSerialization.data(withJSONObject: arrayObject, options: JSONSerialization.WritingOptions.prettyPrinted)
        let strJson = NSString(data: data!, encoding: String.Encoding.utf8.rawValue)
        let dataExample : NSData = NSKeyedArchiver.archivedData(withRootObject: strJson as Any) as NSData
      return dataExample
        //locationSoundName
       
    }
    
    
    //MARK: 保存特定的坐标数据
    func userLocationData(array:[AnyObject])->NSData
    {
        let dic:[String:AnyObject] = ["arrayDic":array as AnyObject]
        
        let dataExample : NSData = NSKeyedArchiver.archivedData(withRootObject: dic) as NSData
        return dataExample
        
    }
    @IBAction func EmergencyContactAction(_ sender: UIButton)
    {
         stopRecordAction()
    }
    

}
