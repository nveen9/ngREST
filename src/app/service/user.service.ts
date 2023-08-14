import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:8080';

  constructor() { }

  async getData(){
    const url = `${this.api}/expenses`;
    return await axios.get(url);
  }

  async postData(data: any){
    const url = `${this.api}/expenses`;
    return await axios.post(url, data);
  }

  async updateData(id: number, data: any){
    const url = `${this.api}/expense/${id}`;
    return await axios.put(url, data);
  }

  async deleteData(id: number){
    const url = `${this.api}/expense/${id}`;
    return await axios.delete(url);
  }
}
