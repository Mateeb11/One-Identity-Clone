import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { Papa } from 'ngx-papaparse';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app = initializeApp(environment.firebaseConfig);
  db = getFirestore(this.app);
  dbValue: string = '';

  constructor(private papa: Papa) {}


  public csvConnector(file: any): void {
    this.papa.parse(file, {
      skipEmptyLines: true,
      complete: async (result: any) => {
        const mailBoxRef = collection(this.db, 'MailBox');
        const adsRef = collection(this.db, 'ADSAccount');

        // Make all documents "isActive" = FALSE
        const mailBoxSnapshot = await getDocs(query(mailBoxRef));
        mailBoxSnapshot.forEach(async (document) => {
          await updateDoc(doc(mailBoxRef, document.id), {
            isActive: false,
          });
        });

        const adsSnapshot = await getDocs(query(adsRef));
        adsSnapshot.forEach(async (document) => {
          await updateDoc(doc(adsRef, document.id), {
            isActive: false,
          });
        });

        // Add or update firebase documents with csv file data
        result.data.slice(1).forEach(async (user: any) => {
          if (
            this.validateId(user[0]) &&
            this.checkBoolean(user[3]) &&
            this.isValidEmail(user[2]) &&
            this.isValidName(user[1])
          ) {
            await setDoc(doc(mailBoxRef, user[0]), {
              isActive: true,
              isCompanyEmployee: user[3] || true,
              quota: user[3] == 'TRUE' ? 5 : 2,
            });

            await setDoc(doc(adsRef, user[0]), {
              isActive: true,
              email: user[2],
              fullName: user[1],
            });
          } else {
            console.log('Error');
          }
        });
      },
    });
  }

  validateId(value: any) {
    const digits = /^\d+$/;
    return digits.test(value);
  }

  checkBoolean(value: string) {
    const normalizedValue = String(value)?.toLowerCase();
    return normalizedValue === 'true' || normalizedValue === 'false';
  }

  isValidEmail(email: any) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  isValidName(name: any) {
    const namePattern = /^[A-Za-z' -]+$/;
    return namePattern.test(name);
  }
}
