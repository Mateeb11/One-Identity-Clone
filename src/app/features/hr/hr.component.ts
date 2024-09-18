import { Component, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css'
})
export class HrComponent {
  constructor(private firebaseService: FirebaseService) {}

  @ViewChild('csvInput') csvInput!: ElementRef;

  public readCSV() {
    this.firebaseService.csvConector(this.csvInput.nativeElement.files[0]);
  }
}
