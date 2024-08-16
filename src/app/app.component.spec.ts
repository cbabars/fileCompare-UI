import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { FileComparisonService } from './file-comparison.service';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fileComparisonService: FileComparisonService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      providers: [FileComparisonService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fileComparisonService = TestBed.inject(FileComparisonService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update file1 on valid file selection', () => {
    const file = new File(['file content'], 'file1.txt');
    const event = { target: { files: [file] } };

    component.handleFileChange(event, 1);

    expect(component.file1).toEqual(file);
    expect(component.error).toBe('');
  });

  it('should update file2 on valid file selection', () => {
    const file = new File(['file content'], 'file2.txt');
    const event = { target: { files: [file] } };

    component.handleFileChange(event, 2);

    expect(component.file2).toEqual(file);
    expect(component.error).toBe('');
  });

  it('should show error on invalid file type selection', () => {
    const file = new File(['file content'], 'file1.exe');
    const event = { target: { files: [file] } };

    component.handleFileChange(event, 1);

    expect(component.file1).toBeNull();
    expect(component.error).toBe('Invalid file type. Only txt, pdf, docx, json are allowed.');
  });

  it('should show error if file fields are empty on submit', () => {
    component.handleSubmit();

    expect(component.error).toBe('Both file fields must be filled.');
  });

  it('should display result on successful comparison', () => {
    const file1 = new File(['file content 1'], 'file1.txt');
    const file2 = new File(['file content 2'], 'file2.txt');
    const mockResult = { result: 'Files are different' };

    component.file1 = file1;
    component.file2 = file2;

    spyOn(fileComparisonService, 'compareFiles').and.returnValue(of(mockResult));

    component.handleSubmit();

    expect(component.result).toBe(mockResult.result);
    expect(component.error).toBe('');
  });

  it('should handle error during file comparison', () => {
    const file1 = new File(['file content 1'], 'file1.txt');
    const file2 = new File(['file content 2'], 'file2.txt');
    const mockError = 'Something went wrong!';

    component.file1 = file1;
    component.file2 = file2;

    spyOn(fileComparisonService, 'compareFiles').and.returnValue(throwError(mockError));

    component.handleSubmit();

    expect(component.error).toBe(mockError);
    expect(component.result).toBeNull();
  });
});
