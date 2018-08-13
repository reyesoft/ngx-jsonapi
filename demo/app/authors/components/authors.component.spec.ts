import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthorsService } from '../authors.service';
import { AuthorsComponent } from './authors.component';
import { NgxJsonapiModule } from 'ngx-jsonapi';

describe('AuthorsComponent', () => {
    let component: AuthorsComponent;
    let fixture: ComponentFixture<AuthorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, NgxJsonapiModule],
            declarations: [AuthorsComponent],
            providers: [AuthorsService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('authors should be filled', () => {
        expect(component.authors).toBeTruthy();
    });
});
