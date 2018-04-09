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

class SettingViewController: UIViewController, UINavigationControllerDelegate, MFMessageComposeViewControllerDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        //设置联系人
        let str = "10086"
        //创建一个弹出框提示用户
        let alertController = UIAlertController(title: "发短信", message: "是否给\(str)发送短信?", preferredStyle: .alert)
        let cancleAction = UIAlertAction(title: "取消", style: .cancel, handler: nil)
        let sendAction = UIAlertAction(title: "确定", style: .default) { (alertController) in
            //判断设备是否能发短信(真机还是模拟器)
            if MFMessageComposeViewController.canSendText() {
                let controller = MFMessageComposeViewController()
                //短信的内容,可以不设置
                controller.body = "发短信"
                //联系人列表
                controller.recipients = [str]
                //设置代理
                controller.messageComposeDelegate = self
                self.present(controller, animated: true, completion: nil)
            } else {
                print("本设备不能发短信")
            }
        }
        alertController.addAction(cancleAction)
        alertController.addAction(sendAction)
        
        self.present(alertController, animated: true, completion: nil)
        
    }
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
