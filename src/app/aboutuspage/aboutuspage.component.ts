import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-aboutuspage',
  templateUrl: './aboutuspage.component.html',
  styleUrls: ['./aboutuspage.component.css']
})
export class AboutuspageComponent implements OnInit {

  constructor(private database: DatabaseService) { }

  ngOnInit(): void {
  }

  btnCreateDatabase_click() {
    this.database.initDB();
  }

  btnClearDatabase_click() {
    this.database.clearDB();
  }



}
