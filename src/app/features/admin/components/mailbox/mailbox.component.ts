import { Component, OnInit } from '@angular/core';
import { MailBoxInterface } from '../../models/mailBox.interface';
import { MailBoxService } from '../../data-access/mail-box.service';

@Component({
  selector: 'app-mailbox',
  standalone: true,
  imports: [],
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css',
})
export class MailboxComponent implements OnInit {
  mailBoxes: MailBoxInterface[] = [];

  constructor(private mailBoxService: MailBoxService) {}
  ngOnInit(): void {
    this.getMailBoxes();
  }

  getMailBoxes() {
    this.mailBoxService.getCollection().subscribe((res) => {
      this.mailBoxes = res.map((m) => {
        return {
          ...(m.payload.doc.data() as MailBoxInterface),
          id: m.payload.doc.id,
        };
      });
    });
  }
}
