import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from 'firebase/firestore';

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './core/services/firebase.service';
import { MailBoxInterface } from './features/admin/models/mailBox.interface';
import { ADAccountInterface } from './features/admin/models/adAccount.interface';
import { AdminComponent } from './features/admin/admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  
  ngOnInit(): void {
   
  }



  getData() {
    this.firebaseService.getData();
  }

  @ViewChild('writeInputValue') writeInputValue!: ElementRef;

  setData() {
    this.firebaseService.setData(this.writeInputValue);
  }

  @ViewChild('csvInput') csvInput!: ElementRef;

  public readCSV() {
    this.firebaseService.csvConector(this.csvInput.nativeElement.files[0]);
  }
}
