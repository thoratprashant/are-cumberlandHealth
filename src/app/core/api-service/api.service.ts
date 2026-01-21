import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class ApiService {

  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}


  private request<T>(method: string, url: string, body?: any) {
    return this.http.request<T>(method, this.base + url, {
      body,
      withCredentials: true
    }).pipe(
      catchError(err => {
        return throwError(() => err.error); // <-- critical
      })
    );
  }

  post<T>(url: string, body: any) {
    return this.request<T>('POST', url, body);
  }

  get<T>(url: string) {
    return this.request<T>('GET', url);
  }

  patch<T>(url: string, body: any) {
    return this.request<T>('PATCH', url, body);
  }

  /** (optional but recommended) */
  put<T>(url: string, body: any) {
    return this.request<T>('PUT', url, body);
  }

  delete<T>(url: string) {
    return this.request<T>('DELETE', url);
  }
}
