//
//  InformationViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit

class InformationViewController: UIViewController,BMKMapViewDelegate,BMKLocationServiceDelegate {

    @IBOutlet weak var EmergencyContactButton: UIButton!
    @IBOutlet weak var informationMapView: UIView!
    @IBOutlet weak var informationButton: UIButton!
    var _mapView: BMKMapView?
    var _locService: BMKLocationService?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        _mapView = BMKMapView(frame: CGRect(x: 0, y: 0, width: self.view.frame.width, height: self.view.frame.height))
        _mapView?.showsUserLocation = true//显示定位图层
        _mapView?.userTrackingMode = BMKUserTrackingModeNone
        informationMapView.addSubview(_mapView!)
        //设置定位的状态为普通定位模式
        
        //
        //        _locService = [[BMKLocationService alloc]init];
        //        _locService.delegate = self;
        //        //启动LocationService
        //        [_locService startUserLocationService];
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    
    
    //    //处理方向变更信息
    //    - (void)didUpdateUserHeading:(BMKUserLocation *)userLocation
    //    {
    //    //NSLog(@"heading is %@",userLocation.heading);
    //    }
    //    //处理位置坐标更新
    //    - (void)didUpdateBMKUserLocation:(BMKUserLocation *)userLocation
    //    {
    //    //NSLog(@"didUpdateUserLocation lat %f,long %f",userLocation.location.coordinate.latitude,userLocation.location.coordinate.longitude);
    //    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        _mapView?.viewWillAppear()
        _mapView?.delegate = nil // 此处记得不用的时候需要置nil，否则影响内存的释放
    }
    
    override func viewWillDisappear(_ animated: Bool) {
        super.viewWillDisappear(animated)
        _mapView?.viewWillDisappear()
        _mapView?.delegate = nil // 不用时，置nil
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func informationAction(_ sender: UIButton)
    {
        
    }
   

    @IBAction func EmergencyContactAction(_ sender: UIButton)
    {
        
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
