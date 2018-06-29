import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListPreviewComponent } from './file-list-preview.component';

describe('FileListPreviewComponent', () => {
  let component: FileListPreviewComponent;
  let fixture: ComponentFixture<FileListPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileListPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
