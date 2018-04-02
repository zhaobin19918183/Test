//
//  LoginViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController,UITextFieldDelegate {

    @IBOutlet weak var nameTextField: UITextField!
    
    @IBOutlet weak var passwordTextField: UITextField!
    
    @IBOutlet weak var loginButton: UIButton!
    
    @IBOutlet weak var registeredButton: UIButton!
    
    @IBOutlet weak var threeLoginButton: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @IBAction func LoginAction(_ sender: UIButton) {
    }

    @IBAction func registeredAction(_ sender: UIButton) {
    }
    
    @IBAction func threeLoginAction(_ sender: UIButton) {
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    


}
