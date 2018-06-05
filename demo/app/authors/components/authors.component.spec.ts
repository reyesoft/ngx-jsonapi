import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { AuthorsService } from '../authors.service';
import { AuthorsComponent } from './authors.component';
import { NgxJsonapiModule } from 'ngx-jsonapi';

describe('AuthorsComponent', () => {
    let component: AuthorsComponent;
    let fixture: ComponentFixture<AuthorsComponent>;

    let ICollection = Object.defineProperties(
        {},
        {
            $length: {
                get: function() {
                    return Object.keys(this).length * 1;
                },
                enumerable: false,
            },
            $toArray: {
                get: function() {
                    return Object.keys(this).map(key => {
                        return this[key];
                    });
                },
                enumerable: false,
            },
            $is_loading: {
                value: false,
                enumerable: false,
                writable: true,
            },
            $source: { value: '', enumerable: false, writable: true },
            $cache_last_update: {
                value: 0,
                enumerable: false,
                writable: true
            },
            page: { value: Number, enumerable: false, writable: true }
        });

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
    it('authors should be filled', () =>{
        alert(ICollection);
        expect(component.authors).toBeTruthy();
    });
});
