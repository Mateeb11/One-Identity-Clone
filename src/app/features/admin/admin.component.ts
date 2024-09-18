import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../core/services/firebase.service';
import { ADAccountInterface } from './models/adAccount.interface';
import { MailBoxInterface } from './models/mailBox.interface';
import { MailboxComponent } from './components/mailbox/mailbox.component';
import { ActiveDirectoryComponent } from './components/active-directory/active-directory.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MailboxComponent,ActiveDirectoryComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  

  constructor(private firebaseService: FirebaseService) {}
  
  ngOnInit(): void {

  }


}
