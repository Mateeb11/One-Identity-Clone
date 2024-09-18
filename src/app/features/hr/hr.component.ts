import { Component } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css',
})
export class HrComponent {
  constructor(private firebaseService: FirebaseService) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.firebaseService.csvConector(file);
      input.value=''
    }
  }
}
