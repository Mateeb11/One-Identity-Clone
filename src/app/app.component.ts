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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private firebaseService: FirebaseService) {}

  mailBoxes: any = [];
  ngOnInit(): void {
    this.firebaseService.getMailBoxes().subscribe((res) => {
      this.mailBoxes = res.map((m) => {
        return {
          ...(m.payload.doc.data() as {}),
        };
      });
    });
  }

  getData() {
    this.firebaseService.getData();
  }

  @ViewChild('writeInputValue') writeInputValue!: ElementRef;

  setData() {
    this.firebaseService.setData(this.writeInputValue);
  }
}
