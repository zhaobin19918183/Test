//
//  RegisterViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/4/26.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit

class RegisterViewController: UIViewController,UITextFieldDelegate {

    @IBOutlet weak var registButton: UIButton!
    @IBOutlet weak var addressTextField: UITextField!
    @IBOutlet weak var phoneTextField: UITextField!
    @IBOutlet weak var birthdayButton: UIButton!
    @IBOutlet weak var userImageButton: UIButton!
    @IBOutlet weak var sexTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var userNameTextField: UITextField!
    
  
    @IBOutlet weak var _photosSelectView: PhotosSelectView!
    override func viewDidLoad() {
        super.viewDidLoad()
        _photosSelectView.photosSelectView = self.parent!
        // Do any additional setup after loading the view.
    }

    
    @IBAction func photoImageAction(_ sender: UIButton)
    {
        
    }
    
    @IBAction func registAction(_ sender: UIButton)
    {
        
    }
    

}
