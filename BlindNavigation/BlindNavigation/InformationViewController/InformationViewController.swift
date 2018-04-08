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
        coredataDic()
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
    // MARK: - IBAction
    @IBAction func startLocation(_ sender: AnyObject) {
        print("进入普通定位态");
        locationService.startUserLocationService()
        informationMapView.showsUserLocation = false//先关闭显示的定位图层
        informationMapView.userTrackingMode = BMKUserTrackingModeNone;//设置定位的状态
        informationMapView.showsUserLocation = true//显示定位图层
    }
    
    @IBAction func stopLocation(_ sender: AnyObject)
    {
        locationService.stopUserLocationService()
        informationMapView.showsUserLocation = false

    }
    
    @IBAction func followMode(_ sender: AnyObject) {
        print("进入跟随态");
        informationMapView.showsUserLocation = false
        informationMapView.userTrackingMode = BMKUserTrackingModeFollow
        informationMapView.showsUserLocation = true
    }
    
    @IBAction func followHeadingMode(_ sender: AnyObject) {
        print("进入罗盘态");
        informationMapView.showsUserLocation = false
        informationMapView.userTrackingMode = BMKUserTrackingModeFollowWithHeading
        informationMapView.showsUserLocation = true
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
        //初次进入导航页面记录获取到的第一个点,并录音
        if arrayExample.count == 0 && locaitonUserHeadering.heading != nil
        {
//            startToRecord()
            locationUserMessage()
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
        let  beforelat = Double(dictionaryExample["locationlat"] as! String)
        let  beforelon = Double(dictionaryExample["locationlon"] as! String)
        let pointBefore:BMKMapPoint  = BMKMapPointForCoordinate(CLLocationCoordinate2DMake(beforelat! ,beforelon!));
        let distance:CLLocationDistance =  BMKMetersBetweenMapPoints(pointBefore,pointNow)
        
        if distance == 10 {
            soundName.add("")
            locationUserMessage()
            
        }
        print(distance)
    }
    
    //MARK:记录当前的坐标点以及录音
    @IBAction func informationAction(_ sender: UIButton)
    {
        startToRecord()
        locationUserMessage()
    }
    //MARK:获取需要记录点的坐标
    func  locationUserMessage()
    {
        //
        let locationlat  =    NSString(format: "%f" , locaitonUser.location.coordinate.latitude)
        let locationlon  =    NSString(format: "%f" , locaitonUser.location.coordinate.longitude)
        dictionaryExample = ["locationlat":locationlat as AnyObject,"locationlon":locationlon as AnyObject,"headering":locaitonUserHeadering.heading.trueHeading as AnyObject]
     
        arrayExample.add(dictionaryExample)
    }
 

    
  
    //MARK:存储到数据库
    func  coredataDic()
    {
        let str1 = HelperManager.converLocalTime()
        let data : NSData = str1.data(using: String.Encoding.utf8, allowLossyConversion: false)! as NSData
          print("didUpdateUserLocation lat:\(locaitonUser.location.coordinate.latitude) lon:\(locaitonUser.location.coordinate.longitude)") 
      
        dic.setValue(data, forKey: "lcoaitonMessage")
        dic.setValue(HelperManager.converLocalTime(), forKey: "locaitonName")
        dic.setValue(testSaveArrayPlist(arrayObject: arrayExample), forKey: "coordinates")
        dic.setValue(testSaveArrayPlist(arrayObject: soundName), forKey: "locationSoundName")
        WeatherDAO.createWeatherEntity(dic)
        /*
         newEntity.locationID          = locationID
         newEntity.locationName        = locationName
         newEntity.locationDate        = locationDate
         */
        let locaitonDic = NSMutableDictionary()
        locaitonDic.setValue("", forKey: "locationID")
        locaitonDic.setValue("", forKey: "locationID")
        locaitonDic.setValue("", forKey: "locationID")
        WeatherDAO.locaitonToCoordinates(locaitonDic)
        /*  @NSManaged public var locationX: Double
         @NSManaged public var locationY: Double
         @NSManaged public var heading: Double
         @NSManaged public var relationship: Location?*/
        let CoordinatesDic = NSMutableDictionary()
        CoordinatesDic.setValue("", forKey: "locationX")
        CoordinatesDic.setValue("", forKey: "locationY")
        CoordinatesDic.setValue("", forKey: "heading")
        CoordinatesDic.setValue("", forKey: "relationship")
        WeatherDAO.CoordinatesToLocation(CoordinatesDic)
        
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

