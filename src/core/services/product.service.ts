import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 constructor(private http: HttpClient) {}

  createProduct(payload: any) {
    return this.http.post('/api/products', payload);
  }

  uploadImages(formData: FormData) {
    const req = new HttpRequest('POST', '/api/products/upload', formData, {
      reportProgress: true,
    });
    return this.http.request(req); 
  }

  bulkUpload(formData: FormData) {
    return this.http.post('/api/products/bulk', formData, { observe: 'events', reportProgress: true });
  }

  list(params: { page?: number, size?: number, category?: string, start?: string, end?: string }) {
    let httpParams = new HttpParams();
    // Object.keys(params || {}).forEach((k:any) => params[k] ||  ? httpParams = httpParams.set(k, (params as any)[k]) : null);
    return this.http.get('/api/products', { params: httpParams });
  }

  getCategories() { return this.http.get('/api/categories'); }
}
