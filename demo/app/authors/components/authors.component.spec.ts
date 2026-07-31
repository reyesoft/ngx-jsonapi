import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';

import { Author, AuthorsService } from '../authors.service';
import { BooksService } from '../../books/books.service';
import { AuthorsComponent } from './authors.component';
import { DocumentCollection } from 'ngx-jsonapi';
import { ActivatedRoute, Params } from '@angular/router';

describe('AuthorsComponent', () => {
    let component: AuthorsComponent;
    let fixture: ComponentFixture<AuthorsComponent>;

    const queryParams$: BehaviorSubject<Params> = new BehaviorSubject<Params>({});

    const authorsServiceMock: Pick<AuthorsService, 'all'> = {
        all: () => of(new DocumentCollection<Author>())
    };
    const booksServiceMock: Pick<BooksService, never> = {};

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, AuthorsComponent],
            providers: [{ provide: ActivatedRoute, useValue: { queryParams: queryParams$.asObservable() } }]
        })
            .overrideComponent(AuthorsComponent, {
                set: {
                    providers: [
                        { provide: AuthorsService, useValue: authorsServiceMock },
                        { provide: BooksService, useValue: booksServiceMock }
                    ]
                }
            })
            .compileComponents();
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
