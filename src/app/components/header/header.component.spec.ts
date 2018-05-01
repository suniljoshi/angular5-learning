import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service'; 
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import {MatInputModule, MatTableModule,MatSortModule, MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
       providers:[AuthService, Ng4LoadingSpinnerService,ToastrService],
       imports:[RouterTestingModule,MatToolbarModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
