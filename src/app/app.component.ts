import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './core/services/firebase.service';
import { AdminComponent } from './features/admin/admin.component';
import { HrComponent } from "./features/hr/hr.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdminComponent, HrComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent  {
  constructor(private firebaseService: FirebaseService) {}

  getData() {
    this.firebaseService.getData();
  }

  @ViewChild('writeInputValue') writeInputValue!: ElementRef;

  setData() {
    this.firebaseService.setData(this.writeInputValue);
  }


}
