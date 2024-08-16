import { Component } from '@angular/core';
import { FileComparisonService } from './file-comparison.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  file1: File | null = null;
  file2: File | null = null;
  error: string = '';
  result: string | null = null;

  allowedExtensions = ['txt', 'pdf', 'docx', 'json'];

  constructor(private fileComparisonService: FileComparisonService) {}

  handleFileChange(event: any, fileIndex: number) {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop();

    if (this.allowedExtensions.includes(fileExtension)) {
      if (fileIndex === 1) {
        this.file1 = file;
      } else {
        this.file2 = file;
      }
      this.error = '';
    } else {
      this.error = `Invalid file type. Only ${this.allowedExtensions.join(', ')} are allowed.`;
    }
  }

   handleSubmit() {
    if (!this.file1 || !this.file2) {
      this.error = 'Both file fields must be filled.';
      return;
    }

  this.fileComparisonService.compareFiles(this.file1, this.file2).subscribe(
    response => {
      this.result = response.result;
    },
    error => {
      this.error = error;
      console.error('Error comparing files:', error);
    }
  );
}
  
}