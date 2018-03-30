//
//  HomeViewController.swift
//  BlindNavigation
//
//  Created by newland on 2018/3/30.
//  Copyright © 2018年 newland. All rights reserved.
//

import UIKit

class HomeViewController: UIViewController {

    @IBOutlet weak var informationButton: UIButton!
    @IBOutlet weak var InstructionsButton: UIButton!
    @IBOutlet weak var settingButton: UIButton!
    @IBOutlet weak var listDetailButton: UIButton!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @IBAction func informationAction(_ sender: UIButton) {
    }
    
    @IBAction func listDetailAction(_ sender: UIButton) {
    }
    @IBAction func settingAction(_ sender: UIButton) {
    }
    
    @IBAction func InstructionsAction(_ sender: UIButton) {
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
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
