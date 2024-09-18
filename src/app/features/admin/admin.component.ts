import { Component } from '@angular/core';

import { MailboxComponent } from './components/mailbox/mailbox.component';
import { ActiveDirectoryComponent } from './components/active-directory/active-directory.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MailboxComponent,ActiveDirectoryComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  


}
