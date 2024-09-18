import { Component} from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css',
})
export class HrComponent {
  fileUploadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService
  ) {
    this.fileUploadForm = this.fb.group({
      fileInput: ['', Validators.required],
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.fileUploadForm.patchValue({
        fileInput: file 
      });
    }
    console.log(this.fileUploadForm.get('fileInput')?.value);
    this.firebaseService.csvConector(this.fileUploadForm.get('fileInput')?.value);

  }
}
