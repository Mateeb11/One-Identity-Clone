import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ADAccountInterface } from '../models/adAccount.interface';

@Injectable({
  providedIn: 'root'
})
export class ActiveDirectoryService {

  constructor(private angularFirestore: AngularFirestore) { }

  getCollection() {
    return this.angularFirestore.collection('ADSAccount').snapshotChanges();
  }

  deleteAdRecord(id: string) {
    return this.angularFirestore.collection('ADSAccount').doc(id).delete();
  }

  createAdRecord(adAccount: ADAccountInterface) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('ADSAccount')
        .add(adAccount)
        .then(
          (res) => {
            console.log(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  
  updateAdAccount(adAccount: ADAccountInterface) {
    return this.angularFirestore
      .collection('ADSAccount')
      .doc(adAccount.id)
      .update({
        ...adAccount,
      });
  }

}
