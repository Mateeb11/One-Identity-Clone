import { Component, OnInit } from '@angular/core';
import { ADAccountInterface } from '../../models/adAccount.interface';
import { ActiveDirectoryService } from '../../data-access/active-directory.service';

@Component({
  selector: 'app-active-directory',
  standalone: true,
  imports: [],
  templateUrl: './active-directory.component.html',
  styleUrl: './active-directory.component.css',
})
export class ActiveDirectoryComponent implements OnInit {
  adRecords: ADAccountInterface[] = [];

  constructor(private adService: ActiveDirectoryService) {}
  ngOnInit(): void {
    this.getAdRecords();
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

 
}
