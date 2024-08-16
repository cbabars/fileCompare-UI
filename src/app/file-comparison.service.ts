import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileComparisonService {

  private apiUrl = 'http://localhost:3000/compare';

  constructor(private http: HttpClient) {}

  compareFiles(file1: File, file2: File): Observable<any> {
    const formData = new FormData();
    formData.append('file1', file1);
    formData.append('file2', file2);

    return this.http.post<any>(this.apiUrl, formData);
  }
}
