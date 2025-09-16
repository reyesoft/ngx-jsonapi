import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';

import { AuthorsService } from '../authors.service';
import { BooksService } from '../../books/books.service';
import { AuthorsComponent } from './authors.component';
import {
    DocumentCollection,
    NgxJsonapiModule,
    JsonapiConfig,
    JSONAPI_STORE_SERVICE,
    JSONAPI_RIPPER_SERVICE,
    StoreService,
    JsonRipper
} from 'ngx-jsonapi';
import { ActivatedRoute } from '@angular/router';

describe('AuthorsComponent', () => {
    let component: AuthorsComponent;
    let fixture: ComponentFixture<AuthorsComponent>;

    const queryParams$: BehaviorSubject<any> = new BehaviorSubject<any>({});

    const authorsServiceMock: any = {
        all: () => of(new DocumentCollection())
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, NgxJsonapiModule.forRoot(new JsonapiConfig()), AuthorsComponent],
            providers: [
                { provide: ActivatedRoute, useValue: { queryParams: queryParams$.asObservable() } },
                { provide: AuthorsService, useValue: authorsServiceMock as AuthorsService },
                BooksService,
                { provide: JSONAPI_RIPPER_SERVICE, useClass: JsonRipper },
                { provide: JSONAPI_STORE_SERVICE, useClass: StoreService }
            ]
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
