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
    var locationService: BMKLocationService!
    let dic = NSMutableDictionary()
    let array = NSMutableArray()
 

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
    
    @objc func customLocationAccuracyCircle() {
 
        
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
    
    /**
     *在地图View停止定位后，会调用此函数
     *@param mapView 地图View
     */
    func didStopLocatingUser() {
        print("didStopLocatingUser")
    }
    
  


    @IBAction func informationAction(_ sender: UIButton)
    {
        coredataDic()
        
    }
    //MARK:存储到数据库
    func  coredataDic()
    {
        let str1 = "l like read"
        let data : NSData = str1.data(using: String.Encoding.utf8, allowLossyConversion: false)! as NSData
          print("didUpdateUserLocation lat:\(locaitonUser.location.coordinate.latitude) lon:\(locaitonUser.location.coordinate.longitude)")
        
        dic.setValue(userLocationData(userLocation: locaitonUser) , forKey: "coordinates")
        dic.setValue(data, forKey: "lcoaitonMessage")
        dic.setValue("locaitonName", forKey: "locaitonName")
        dic.setValue(HelperManager.converLocalTime(), forKey: "lcoaitonDate")
        WeatherDAO.createWeatherEntity(dic)
        
    }
    //MARK: 保存特定的坐标数据
    func userLocationData(userLocation: BMKUserLocation)->NSData
    {
        let locationlat  =    NSString(format: "%f" , userLocation.location.coordinate.latitude)
        let locationlon  =    NSString(format: "%f" , userLocation.location.coordinate.longitude)
        
        let dictionaryExample : [String:AnyObject] = ["locationlat":locationlat as AnyObject,"locationlon":locationlon as AnyObject]
        
        let dataExample : NSData = NSKeyedArchiver.archivedData(withRootObject: dictionaryExample) as NSData
        
        return dataExample
        
    }
    
    
    @IBAction func EmergencyContactAction(_ sender: UIButton)
    {
        
  
       print(WeatherDAO.SearchAllDataEntity().count)
        
    
    }
 

}
