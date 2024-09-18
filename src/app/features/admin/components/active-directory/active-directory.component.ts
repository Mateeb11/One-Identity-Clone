import { Component, OnInit } from '@angular/core';
import { ADAccountInterface } from '../../models/adAccount.interface';
import { ActiveDirectoryService } from '../../data-access/active-directory.service';
import { ModalComponent } from '../../../../shared/ui/modal/modal.component';

@Component({
  selector: 'app-active-directory',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './active-directory.component.html',
  styleUrl: './active-directory.component.css',
})
export class ActiveDirectoryComponent implements OnInit {
  adRecords: ADAccountInterface[] = [];
  isModalOpen:boolean= true;

  constructor(private adService: ActiveDirectoryService) {}
  ngOnInit(): void {
    this.getAdRecords();
    this.updateAdAccount();
  }

  getAdRecords() {
    this.adService.getCollection().subscribe((res) => {
      this.adRecords = res.map((m) => {
        return {
          ...(m.payload.doc.data() as ADAccountInterface),
          id: m.payload.doc.id,
        };
      });
    });
  }

  deleteAdRecord(id: string) {
    this.adService.deleteAdRecord(id);
  }

  updateAdAccount() {
    let adAccount: ADAccountInterface = {
      id: '123424',
      email: 'dev',
      fullName: ' dev dev',
      isActive: true,
    };

    this.adService.updateAdAccount(adAccount);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
