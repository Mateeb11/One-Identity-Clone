import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
} from 'firebase/firestore';

import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './core/services/firebase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  constructor(private firebaseService:FirebaseService){}

   getData() {
    this.firebaseService.getData()
  }

  @ViewChild('writeInputValue') writeInputValue!: ElementRef;

   setData() {
   this.firebaseService.setData(this.writeInputValue)
  }
}
