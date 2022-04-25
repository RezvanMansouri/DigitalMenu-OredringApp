import {Component, OnInit} from '@angular/core';
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private  database: DatabaseService) {
  }

  ngOnInit(): void {
    this.database.initDB();
  }

}
