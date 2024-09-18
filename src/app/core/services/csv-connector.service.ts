import { Injectable } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { FirebaseService } from './firebase.service';
import { collection, doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CsvConnectorService {
  constructor(private papa: Papa, private firebaseService: FirebaseService) {}

  public csvConector(file: any): void {
    this.papa.parse(file, {
      complete: async (result: any) => {
        const mailBoxRef = collection(this.firebaseService.db, 'MailBox');
        const adsRef = collection(this.firebaseService.db, 'ADSAccount');

        for (let i = 1; i < result.data.length; i++) {
          await setDoc(doc(mailBoxRef, result.data[i][0]), {
            isActive: result.data[i][4] || true,
            isCompanyEmployee: result.data[i][3] || true,
            quota: result.data[i][3] == 'TRUE' ? 5 : 2,
          });

          await setDoc(doc(adsRef, result.data[i][0]), {
            isActive: result.data[i][4] || true,
            email: result.data[i][2],
            fullName: result.data[i][1],
          });
        }
      },
    });
  }
}
