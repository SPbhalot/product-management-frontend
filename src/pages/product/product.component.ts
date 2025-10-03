import { animate, style, transition, trigger } from '@angular/animations';
import { Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  animations: [
    trigger('fadeIn', [ transition(':enter', [ style({ opacity: 0, transform: 'translateY(8px)' }), animate('250ms ease-out', style({opacity:1, transform:'none'})) ]) ])
  ]
})
export class ProductComponent {
  constructor(private fb: FormBuilder) {}

  // Reactive Form
  productForm = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    image: [''],
    description: [''],
  });

  // Signals (Angular 20 feature)
  products = signal<Product[]>([]);
  selectedCategory = signal<string>('All');

  // Computed filtered products
  filteredProducts = computed(() => {
    if (this.selectedCategory() === 'All') {
      return this.products();
    }
    return this.products().filter(
      (p) => p.category === this.selectedCategory()
    );
  });

  // Handle File Upload
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  // Add Product
  addProduct() {
    if (this.productForm.invalid) return;

    const newProduct: Product = {
      id: Date.now(),
      ...this.productForm.value,
    } as Product;

    this.products.update((list) => [...list, newProduct]);
    this.productForm.reset();
  }

  // Set Category filter
  filterByCategory(category: string) {
    this.selectedCategory.set(category);
  }
}


  // onFiles(event: any){
  //   const files: FileList = event.target.files;
  //   const form = new FormData();
  //   for (let i=0; i<files.length; i++){
  //     form.append('images', files[i]);
  //     const url = URL.createObjectURL(files[i]);
  //     this.preview.push(this.sanitizer.bypassSecurityTrustUrl(url));
  //   }
  //   // this.form.patchValue({ images: files });
  // }

  // async submit(){
  //   if (this.form.invalid) return;
  //   const fd = new FormData();
  //   // fd.append('name', this.form.value.name);
  //   // fd.append('description', this.form.value.description);
  //   // fd.append('categoryId', this.form.value.categoryId);
  //   // const files: FileList = this.form.value.images;
  //   // if (files) for(let i=0;i<files.length;i++) fd.append('images', files[i], files[i].name);

  //   // Use uploadImages to get progress events
  //   this.srv.uploadImages(fd).subscribe(evt => {
  //     // handle HttpEventType.UploadProgress and response
  //   }, err => console.error(err), () => {
  //     // on complete
  //     this.router.navigate(['/products']);
  //   });
  // }


//   async uploadLargeFile(file: File){
//   const chunkSize = 2 * 1024 * 1024; // 2MB
//   for (let start=0; start<file.size; start += chunkSize) {
//     const chunk = file.slice(start, start + chunkSize);
//     const fd = new FormData();
//     fd.append('chunk', chunk);
//     fd.append('fileName', file.name);
//     fd.append('chunkIndex', String(start / chunkSize));
//     // call server chunk endpoint
//     await this.http.post('/api/upload/chunk', fd).toPromise();
//   }
//   // finalize
//   await this.http.post('/api/upload/complete', { fileName: file.name }).toPromise();
// }

// }

