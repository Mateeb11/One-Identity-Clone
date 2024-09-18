import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MailBoxInterface } from '../models/mailBox.interface';

@Injectable({
  providedIn: 'root',
})
export class MailBoxService {
  constructor(private angularFirestore: AngularFirestore) {}

  getCollection() {
    return this.angularFirestore.collection('MailBox').snapshotChanges();
  }

  deleteMailBox(id: string) {
    return this.angularFirestore.collection('MailBox').doc(id).delete();
  }

  createMailBox(mailBox: MailBoxInterface) {
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore
        .collection('MailBox')
        .add(mailBox)
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

  updateMailBox(mailBox: MailBoxInterface) {
    return this.angularFirestore
      .collection('MailBox')
      .doc(mailBox.id)
      .update({
        ...mailBox,
      });
  }
}
