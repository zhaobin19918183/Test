//
//  SettingViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit
//导入头文件
import MessageUI
import Alamofire
import SwiftyJSON

class SettingViewController: UIViewController, UINavigationControllerDelegate, MFMessageComposeViewControllerDelegate {

    @IBOutlet weak var userPhoto: UIImageView!
    @IBOutlet weak var usernameLabel: UILabel!
    @IBOutlet weak var useraddressLabel: UILabel!
    @IBOutlet weak var birthdayLabel: UILabel!
    @IBOutlet weak var usersexLabel: UILabel!
    @IBOutlet weak var userPhoneLabel: UILabel!
    var dataDic = NSMutableDictionary()
    override func viewDidLoad() {
        super.viewDidLoad()
       
         netWorkData()
   
    }
    func netWorkData()
    {
        let parameters1      = ["username":"newland", "password" :"zb123456789"]
        Alamofire.request(loginLocation,method:.post, parameters: parameters1)
            .responseJSON { response in
                if let jsonValue = response.result.value
                {
                    let json = JSON(jsonValue)
                    self.dataDic = self.jsonLogin(json: json)
                    // 将 base64的图片字符串转化成Data
                    print(self.dataDic)
                    let photoString = self.dataDic.value(forKey: "photo") as! String
                    self.userPhoto.image = HelperManager.base64StringToImage(imageString: photoString)
                   
                }
        }
        
    }
   
    
    func jsonLogin(json:JSON)->NSMutableDictionary
    {
         let dic = NSMutableDictionary()
        dic.setValue(String(describing: json["result"]["username"]), forKey: "username")
        dic.setValue(String(describing:json["result"]["phone"]), forKey: "phone")
        dic.setValue(String(describing:json["result"]["birthday"]) , forKey: "birthday")
        dic.setValue(String(describing:json["result"]["photo"]), forKey: "photo")
        dic.setValue(String(describing:json["result"]["sex"])  , forKey: "sex")
        dic.setValue(String(describing:json["result"]["address"]) , forKey: "address")
        return dic
        
        
    }
   

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
//    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
//        //设置联系人
//        let str = "10086"
//        //创建一个弹出框提示用户
//        let alertController = UIAlertController(title: "发短信", message: "是否给\(str)发送短信?", preferredStyle: .alert)
//        let cancleAction = UIAlertAction(title: "取消", style: .cancel, handler: nil)
//        let sendAction = UIAlertAction(title: "确定", style: .default) { (alertController) in
//            //判断设备是否能发短信(真机还是模拟器)
//            if MFMessageComposeViewController.canSendText() {
//                let controller = MFMessageComposeViewController()
//                //短信的内容,可以不设置
//                controller.body = "发短信"
//                //联系人列表
//                controller.recipients = [str]
//                //设置代理
//                controller.messageComposeDelegate = self
//                self.present(controller, animated: true, completion: nil)
//            } else {
//                print("本设备不能发短信")
//            }
//        }
//        alertController.addAction(cancleAction)
//        alertController.addAction(sendAction)
//        
//        self.present(alertController, animated: true, completion: nil)
//        
//    }
    //实现MFMessageComposeViewControllerDelegate的代理方法
    func messageComposeViewController(_ controller: MFMessageComposeViewController, didFinishWith result: MessageComposeResult) {
        controller.dismiss(animated: true, completion: nil)
        //判断短信的状态
        switch result{
            
        case .sent:
            print("短信已发送")
            break
        case .cancelled:
            print("短信取消发送")
            break
        case .failed:
            print("短信发送失败")
            break
            
        }
    }
    


}
