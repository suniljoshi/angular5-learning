import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service'; 
import { RouterTestingModule } from '@angular/router/testing';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource,  MatSort, MatPaginator } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatInputModule, MatTableModule,MatSortModule, MatToolbarModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
       providers:[AuthService, Ng4LoadingSpinnerService,ToastrService],
       imports:[RouterTestingModule,MatToolbarModule,ToastrModule.forRoot(), MatInputModule, MatTableModule,MatSortModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatPaginatorModule],
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
   
   
   it('Check if user cookie not exists it should redirect to login page', () => {
    component.ngOnInit()
    let username = component.username;
    expect(username).toBe('sunil joshi');
      
  });
   
   
   
   
});
