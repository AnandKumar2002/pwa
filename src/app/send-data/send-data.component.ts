import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-data',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './send-data.component.html',
  styleUrls: ['./send-data.component.scss'],
})
export class SendDataComponent {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      file: [null, Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected File:', file);
      this.form.patchValue({ file });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('email', this.form.get('email')?.value);
      formData.append('file', this.form.get('file')?.value);
      formData.append('_method', 'PUT');

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      this.http
        .put('https://example.com/api/resource/123', formData)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Data submitted successfully!';
            this.errorMessage = null;
            console.log('Response:', response);
          },
          error: (error) => {
            this.errorMessage = 'An error occurred while submitting the data.';
            this.successMessage = null;
            console.error('Error:', error);
          },
        });
    } else {
      this.errorMessage =
        'Please fill out the form correctly before submitting.';
      this.successMessage = null;
      console.error('Form is invalid');
    }
  }
}
