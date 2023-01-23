import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../model/item.interface';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  createItem(item: Item): Observable<any> {
    const url = `${environment.baseUrl}/item/create`;
    return this.http.post(url, item);
  }

  getItem(id: string): Observable<any> {
    const url = `${environment.baseUrl}/item/items/${id}`;
    return this.http.get(url);
  }

  queryItems(query: string, data: any): Observable<any> {
    const url = `${environment.baseUrl}/item/${query}`;
    return this.http.post(url, data);
  }

  deleteItem(id: string): Observable<any> {
    const url = `${environment.baseUrl}/item/${id}`;
    return this.http.delete(url);
  }

  exportcsv(data: any): Observable<any> {
    const url = `${environment.baseUrl}/item/items/csv`;
    return this.http.post(url, data, this.commonService.httpHeaders());
  }
}
