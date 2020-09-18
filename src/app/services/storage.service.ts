import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storagekey : string, value : string){
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key : storagekey,
      value : encryptedValue
    });
  } 

  async get(storagekey : string){
    const res = await Storage.get({key : storagekey});
    if (res.value) {
      return JSON.parse(unescape(atob(res.value)));
    }
    else {
      console.log('entro al false');
      return false;
    }
  }

  async removeItem(storagekey){
    await Storage.remove({ key : storagekey });
  }

  async clear(){
    await Storage.clear();
  }

}
