webpackJsonp([0],{

/***/ "./demo/app.component.html":
/***/ (function(module, exports) {

module.exports = "<main [class]=\"theme\">\n    <h1>\n        ngx-jsonapi example\n        <!-- <small class=\"bg-primary\" ng-if=\"loading\">{{ $ctrl.loading }} <img src=\"http://s.ytimg.com/yt/img/loader-vflff1Mjj.gif\" /></small> -->\n    </h1>\n\n    <nav>\n        <ul class=\"nav nav-pills pull-xs-right\">\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" routerLink=\"/authors\">Authors</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" routerLink=\"/books\">Books</a>\n            </li>\n        </ul>\n    </nav>\n\n    <content>\n        <router-outlet></router-outlet>\n    </content>\n</main>\n"

/***/ }),

/***/ "./demo/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./demo/app.component.scss");

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),

/***/ "./demo/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'app',
            providers: [],
            styles: [__webpack_require__("./demo/app.component.scss")],
            template: __webpack_require__("./demo/app.component.html")
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./demo/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("./demo/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authors_authors_component__ = __webpack_require__("./demo/authors/authors.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__authors_author_component__ = __webpack_require__("./demo/authors/author.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__books_books_component__ = __webpack_require__("./demo/books/books.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__books_book_component__ = __webpack_require__("./demo/books/book.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_jsonapi__ = __webpack_require__("./src/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__authors_authors_service__ = __webpack_require__("./demo/authors/authors.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__books_books_service__ = __webpack_require__("./demo/books/books.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__photos_photos_service__ = __webpack_require__("./demo/photos/photos.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var appRoutes = [
    {
        path: '',
        redirectTo: '/authors',
        pathMatch: 'full'
    },
    { path: 'authors', component: __WEBPACK_IMPORTED_MODULE_4__authors_authors_component__["a" /* AuthorsComponent */] },
    { path: 'authors/:id', component: __WEBPACK_IMPORTED_MODULE_5__authors_author_component__["a" /* AuthorComponent */] },
    { path: 'books', component: __WEBPACK_IMPORTED_MODULE_6__books_books_component__["a" /* BooksComponent */] },
    { path: 'books/:id', component: __WEBPACK_IMPORTED_MODULE_7__books_book_component__["a" /* BookComponent */] }
    // { path: '**', redirectTo: '/authors', pathMatch: 'full' }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgModule */])({
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__authors_authors_service__["a" /* AuthorsService */],
                __WEBPACK_IMPORTED_MODULE_10__books_books_service__["a" /* BooksService */],
                __WEBPACK_IMPORTED_MODULE_11__photos_photos_service__["a" /* PhotosService */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* RouterModule */].forRoot(appRoutes, { useHash: true }),
                __WEBPACK_IMPORTED_MODULE_8__ngx_jsonapi__["a" /* NgxJsonapiModule */].forRoot({
                    url: 'http://jsonapiplayground.reyesoft.com/v2/'
                })
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_4__authors_authors_component__["a" /* AuthorsComponent */],
                __WEBPACK_IMPORTED_MODULE_5__authors_author_component__["a" /* AuthorComponent */],
                __WEBPACK_IMPORTED_MODULE_6__books_books_component__["a" /* BooksComponent */],
                __WEBPACK_IMPORTED_MODULE_7__books_book_component__["a" /* BookComponent */]
            ],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
            ]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./demo/authors/author.component.html":
/***/ (function(module, exports) {

module.exports = "<h3>Author #{{ author.id }}, with books and photos</h3>\n<pre>authors.get('{{ author.id }}', {{ '{' }} include: ['books', 'photos'] {{ '}' }});</pre>\n<ul>\n    <li>Name: <strong>{{ author.attributes.name }}</strong></li>\n    <li>Date of birth: <strong>{{ author.attributes.date_of_birth | date }}</strong></li>\n    <li>Date of dead: <strong>{{ author.attributes.date_of_death | date }}</strong></li>\n</ul>\n<p>\n    <button (click)=\"new()\">New author</button>\n    <button (click)=\"update()\">Update author</button>\n    <button (click)=\"removeRelationship()\">Remove relationship</button>\n</p>\n\n<h4>Photos</h4>\n<img *ngFor=\"let photo of author.relationships.photos.data.$toArray\"\n    [src]=\"photo.attributes.uri\" height=\"150\" style=\"padding-right: 1em\"\n    title=\"Book id #{{ photo.id }}\"\n    />\n\n<h4>Books</h4>\n<table class=\"table table-striped\">\n    <thead>\n        <tr>\n            <th>ID</th>\n            <th>Title</th>\n            <th>Date Published</th>\n        </tr>\n    </thead>\n    <tr *ngFor=\"let book of author.relationships.books.data.$toArray\">\n        <td>{{ book.id }}</td>\n        <td>\n            <a>{{ book.attributes.title  }}</a>\n        </td>\n        <td>{{ book.attributes.date_published | date }}</td>\n    </tr>\n</table>\n\n<!-- <h3>Related Books by URL</h3>\n<pre>BooksService.all( {{ '{' }} beforepath: 'authors/{{author.id}}' {{ '}' }} );</pre>\n<table class=\"table table-striped\">\n    <thead>\n        <tr>\n            <th>ID</th>\n            <th>Title</th>\n            <th>Date Published</th>\n        </tr>\n    </thead>\n    <tr *ngFor=\"let book of relatedbooks.$toArray\">\n        <td>{{ book.id }}</td>\n        <td>\n            <a ui-sref=\"book({ bookId: book.id })\">{{ book.attributes.title  }}</a>\n        </td>\n        <td>{{ book.attributes.date_published | date }}</td>\n    </tr>\n</table> -->\n\n<p>\n    <a ui-sref=\"authors\">Volver</a>\n</p>\n"

/***/ }),

/***/ "./demo/authors/author.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__authors_service__ = __webpack_require__("./demo/authors/authors.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__photos_photos_service__ = __webpack_require__("./demo/photos/photos.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthorComponent = /** @class */ (function () {
    /** @ngInject */
    function AuthorComponent(authorsService, photosService, route) {
        this.authorsService = authorsService;
        this.photosService = photosService;
        this.route = route;
        authorsService.register();
        photosService.register();
        this.author = authorsService.get(this.route.snapshot.paramMap.get('id'), { include: ['books', 'photos'] }, function (success) {
            // this.author.attributes.name = this.author.attributes.name + 'x';
            // this.author.save();
            console.info('success authors controller', success);
        }, function (error) {
            console.info('error authors controller', error);
        });
        //
        // this.relatedbooks = BooksService.all(
        //     { beforepath: 'authors/' + $stateParams.authorId },
        //     () => {
        //         console.info('Books from authors relationship', this.relatedbooks);
        //     }
        // );
    }
    /*
    Add a new author
    */
    AuthorComponent.prototype.new = function () {
        var author = this.authorsService.new();
        author.attributes.name = 'Pablo Reyes';
        author.attributes.date_of_birth = '2030-12-10';
        // angular.forEach(this.relatedbooks, (book: Jsonapi.IResource) => {
        //     author.addRelationship(book /* , 'handbook' */);
        // });
        console.log('new save', author.toObject());
        // author.save( /* { include: ['book'] } */ );
    };
    /*
    Update name for actual author
    */
    AuthorComponent.prototype.update = function () {
        this.author.attributes.name += 'o';
        this.author.save();
        console.log('update save with book include', this.author.toObject({ include: ['books'] }));
        console.log('update save without any include', this.author.toObject());
    };
    AuthorComponent.prototype.removeRelationship = function () {
        this.author.removeRelationship('photos', '1');
        this.author.save();
        console.log('removeRelationship save with photos include', this.author.toObject());
    };
    AuthorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'author',
            // providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
            // encapsulation: ViewEncapsulation.None,
            // styles: [require('./app.component.scss')],
            template: __webpack_require__("./demo/authors/author.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__authors_service__["a" /* AuthorsService */],
            __WEBPACK_IMPORTED_MODULE_2__photos_photos_service__["a" /* PhotosService */],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]])
    ], AuthorComponent);
    return AuthorComponent;
}());



/***/ }),

/***/ "./demo/authors/authors.component.html":
/***/ (function(module, exports) {

module.exports = "<h3>Authors</h3>\n<p><code>$length={{ authors.$length }}. $is_loading={{ authors.$is_loading }}. $source={{ authors.$source }}.</code></p>\n<table class=\"table table-striped\">\n    <thead>\n        <tr>\n            <th>ID</th>\n            <th>Name</th>\n            <th>Date of birth</th>\n            <th>Date of dead</th>\n        </tr>\n    </thead>\n    <tr *ngFor=\"let author of authors.$toArray\">\n        <td>{{ author.id }}</td>\n        <td>\n            <a [routerLink]=\"['/authors', author.id]\">{{ author.attributes.name  }}</a>\n        </td>\n        <td>{{ author.attributes.date_of_birth | date }}</td>\n        <td>{{ author.attributes.date_of_death | date }}</td>\n        <td><button (click)=\"delete(author)\">Delete</button></td>\n    </tr>\n</table>\n\n<!-- <p>\n<button ng-click=\"update()\">Update author</button>\n<button ng-click=\"removeRelationship()\">Remove relationship</button>\n</p> -->\n"

/***/ }),

/***/ "./demo/authors/authors.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthorsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__authors_service__ = __webpack_require__("./demo/authors/authors.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthorsComponent = /** @class */ (function () {
    function AuthorsComponent(authorsService) {
        var _this = this;
        this.authorsService = authorsService;
        // bootstrap all services
        authorsService.register();
        // BooksService.register();
        // PhotosService.register();
        // JsonapiCore.loadingsStart = (): void => {
        //     this.loading = 'LOADING...';
        // };
        // JsonapiCore.loadingsDone = (): void => {
        //     this.$scope.loading = '';
        // };
        // JsonapiCore.loadingsOffline = (error): void => {
        //     this.$scope.loading = 'No connection!!!';
        // };
        // JsonapiCore.loadingsError = (error): void => {
        //     this.$scope.loading = 'No connection 2!!!';
        // };
        this.authors = authorsService.all(
        // { include: ['books', 'photos'] },
        function (success) {
            console.log('success authors controll', _this.authors);
        }, function (error) {
            console.log('error authors controll', error);
        });
    }
    AuthorsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'authors',
            // providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
            // encapsulation: ViewEncapsulation.None,
            // styles: [require('./app.component.scss')],
            template: __webpack_require__("./demo/authors/authors.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__authors_service__["a" /* AuthorsService */]])
    ], AuthorsComponent);
    return AuthorsComponent;
}());



/***/ }),

/***/ "./demo/authors/authors.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthorsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_jsonapi_service__ = __webpack_require__("./src/service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AuthorsService = /** @class */ (function (_super) {
    __extends(AuthorsService, _super);
    function AuthorsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'authors';
        _this.schema = {
            attributes: {
                name: {},
                date_of_birth: { default: '1993-12-10' },
                date_of_death: {},
                created_at: {},
                updated_at: {}
            },
            relationships: {
                books: {
                    hasMany: true
                },
                photos: {
                    hasMany: true
                }
            },
            ttl: 10
        };
        return _this;
    }
    AuthorsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
    ], AuthorsService);
    return AuthorsService;
}(__WEBPACK_IMPORTED_MODULE_1__ngx_jsonapi_service__["a" /* Service */]));



/***/ }),

/***/ "./demo/books/book.component.html":
/***/ (function(module, exports) {

module.exports = "<h3>Book</h3>\n<h3>Book #{{ book.id }}</h3>\n<ul>\n    <li>Title: <strong>{{ book.attributes.title }}</strong></li>\n    <li>Date Published: <strong>{{ book.attributes.date_published | date }}</strong></li>\n</ul>\n\n<h4>Author (one)</h4>\n<p><small>This a relationship with <i>hasMany:false</i></small></p>\n<ul>\n    <li>Name: <strong>{{ book.relationships.author.data.attributes ? book.relationships.author.data.attributes.name : '' }}</strong></li>\n</ul>\n\n<h4>Photos (many)</h4>\n<p><small>This a relationship with <i>hasMany:true</i></small></p>\n<ul>\n    <li *ngFor=\"let photo of book.relationships.photos.data.$toArray\">\n        URI: <a href=\"{{ photo.attributes.uri }}\">{{ photo.attributes.uri }}</a>\n    </li>\n</ul>\n\n<p>\n    <a ui-sref=\"books\">Volver</a>\n</p>\n"

/***/ }),

/***/ "./demo/books/book.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__demo_authors_authors_service__ = __webpack_require__("./demo/authors/authors.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__books_service__ = __webpack_require__("./demo/books/books.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__demo_photos_photos_service__ = __webpack_require__("./demo/photos/photos.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BookComponent = /** @class */ (function () {
    /** @ngInject */
    function BookComponent(authorsService, booksService, photosService, route) {
        var _this = this;
        this.authorsService = authorsService;
        this.booksService = booksService;
        this.photosService = photosService;
        this.route = route;
        authorsService.register();
        booksService.register();
        photosService.register();
        this.book = booksService.get(this.route.snapshot.paramMap.get('id'), { include: ['author', 'photos'] }, function (success) {
            console.log('success book       ', _this.book);
            // console.log('success book object', this.book.toObject({ include: ['authors', 'photos'] }));
            // console.log('success book relationships', this.book.toObject({ include: ['authors', 'photos'] }).data.relationships);
            // console.log('success book included', this.book.toObject({ include: ['authors', 'photos'] }).included);
        }, function (error) {
            console.log('error books controll', error);
        });
    }
    BookComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'book',
            // providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
            // encapsulation: ViewEncapsulation.None,
            // styles: [require('./app.component.scss')],
            template: __webpack_require__("./demo/books/book.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__demo_authors_authors_service__["a" /* AuthorsService */],
            __WEBPACK_IMPORTED_MODULE_2__books_service__["a" /* BooksService */],
            __WEBPACK_IMPORTED_MODULE_3__demo_photos_photos_service__["a" /* PhotosService */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */]])
    ], BookComponent);
    return BookComponent;
}());



/***/ }),

/***/ "./demo/books/books.component.html":
/***/ (function(module, exports) {

module.exports = "<h3>Books</h3>\n<br/>\n<!-- <label>\n    Search books with:\n    <input\n    ng-model=\"filter_text\"\n    ng-change=\"getAll({ title: filter_text});\"\n    ng-model-options=\"{ debounce: 200 }\"\n    ></input>\n</label> -->\n<table class=\"table table-striped\">\n    <thead>\n        <tr>\n            <th>ID</th>\n            <th>Title</th>\n            <th>Date Published</th>\n            <th>Author</th>\n            <th>Photos</th>\n        </tr>\n    </thead>\n    <tr *ngFor=\"let book of books.$toArray\">\n        <td>{{ book.id }}</td>\n        <td>\n            <a [routerLink]=\"['/books', book.id]\">{{ book.attributes.title  }}</a>\n        </td>\n        <td>{{ book.attributes.date_published | date }}</td>\n        <td>{{ book.relationships.author.data.attributes }} #{{ book.relationships.author.data.id }}</td>\n        <td><span *ngFor=\"let photo of book.relationships.photos.data.$toArray\">{{ photo.id }}</span></td>\n        <td><a ng-click=\"delete(book)\" title=\"not supported by demo server\"><small>DELETE</small></a></td>\n    </tr>\n</table>\n"

/***/ }),

/***/ "./demo/books/books.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__books_service__ = __webpack_require__("./demo/books/books.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BooksComponent = /** @class */ (function () {
    /** @ngInject */
    function BooksComponent(booksService) {
        var _this = this;
        this.booksService = booksService;
        booksService.register();
        this.books = booksService.all(
        // { include: ['books', 'photos'] },
        function (success) {
            console.info('success books controll', _this.books);
        }, function (error) {
            console.info('error books controll', error);
        });
    }
    BooksComponent.prototype.getAll = function (remotefilter) {
        var _this = this;
        // we add some remote filter
        remotefilter.date_published = {
            since: '1983-01-01',
            until: '2010-01-01'
        };
        this.books = this.booksService.all({
            localfilter: {},
            remotefilter: remotefilter,
            page: { number: 1 },
            include: ['author', 'photos']
        }, function (success) {
            console.log('success books controller', success, _this.books);
            /*** YOU CAN REMOVE THE NEXT TEST LINES **/
            // TEST 1
            // this test merge data with cache (this not include author or photos)
            console.log('BooksRequest#1 received (author data from server)', _this.books[Object.keys(_this.books)[2]].relationships.author.data.attributes);
            console.log('BooksRequest#2 requested');
            var books2 = _this.booksService.all(function (success2) {
                console.log('BooksRequest#2 received (author data from cache)', books2[Object.keys(_this.books)[1]].relationships.author.data);
            });
            // TEST 2
            console.log('BookRequest#3 requested');
            var book1 = _this.booksService.get(1, function (success1) {
                console.log('BookRequest#3 received (author data from cache)', book1.relationships.author.data.attributes);
            });
        }, function (error) {
            console.log('error books controller', error);
        });
    };
    BooksComponent.prototype.delete = function (book) {
        this.booksService.delete(book.id);
    };
    BooksComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
            selector: 'books',
            template: __webpack_require__("./demo/books/books.component.html")
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__books_service__["a" /* BooksService */]])
    ], BooksComponent);
    return BooksComponent;
}());



/***/ }),

/***/ "./demo/books/books.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BooksService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_jsonapi_service__ = __webpack_require__("./src/service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var BooksService = /** @class */ (function (_super) {
    __extends(BooksService, _super);
    function BooksService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'books';
        _this.schema = {
            attributes: {
                date_published: {},
                title: { presence: true, length: { maximum: 96 } },
                created_at: {},
                updated_at: {}
            },
            relationships: {
                author: {
                    hasMany: false
                },
                photos: {
                    hasMany: true
                }
            },
            ttl: 10
        };
        return _this;
    }
    // executed before get data from server
    BooksService.prototype.parseFromServer = function (attributes) {
        attributes.title = '📖 ' + attributes.title;
    };
    // executed before send to server
    BooksService.prototype.parseToServer = function (attributes) {
        if ('title' in attributes) {
            attributes.title = attributes.title.replace('📖 ', '');
        }
    };
    BooksService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
    ], BooksService);
    return BooksService;
}(__WEBPACK_IMPORTED_MODULE_1__ngx_jsonapi_service__["a" /* Service */]));



/***/ }),

/***/ "./demo/bootstrap.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__("./demo/app.module.ts");


document.addEventListener('DOMContentLoaded', function () {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])()
        .bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */])
        .catch(function (err) { return console.error(err); });
});


/***/ }),

/***/ "./demo/photos/photos.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhotosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_jsonapi_service__ = __webpack_require__("./src/service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var PhotosService = /** @class */ (function (_super) {
    __extends(PhotosService, _super);
    function PhotosService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'photos';
        _this.schema = {
            attributes: {
                title: {},
                uri: {},
                imageable_id: {},
                created_at: {},
                updated_at: {}
            }
        };
        return _this;
    }
    PhotosService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])()
    ], PhotosService);
    return PhotosService;
}(__WEBPACK_IMPORTED_MODULE_1__ngx_jsonapi_service__["a" /* Service */]));



/***/ }),

/***/ "./node_modules/@angular/common/@angular/common/http.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpBackend */
/* unused harmony export HttpHandler */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return HttpHeaders; });
/* unused harmony export HTTP_INTERCEPTORS */
/* unused harmony export JsonpClientBackend */
/* unused harmony export JsonpInterceptor */
/* unused harmony export HttpClientJsonpModule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HttpClientModule; });
/* unused harmony export HttpClientXsrfModule */
/* unused harmony export ɵinterceptingHandler */
/* unused harmony export HttpParams */
/* unused harmony export HttpUrlEncodingCodec */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return HttpRequest; });
/* unused harmony export HttpErrorResponse */
/* unused harmony export HttpEventType */
/* unused harmony export HttpHeaderResponse */
/* unused harmony export HttpResponse */
/* unused harmony export HttpResponseBase */
/* unused harmony export HttpXhrBackend */
/* unused harmony export XhrFactory */
/* unused harmony export HttpXsrfTokenExtractor */
/* unused harmony export ɵa */
/* unused harmony export ɵb */
/* unused harmony export ɵc */
/* unused harmony export ɵd */
/* unused harmony export ɵg */
/* unused harmony export ɵh */
/* unused harmony export ɵe */
/* unused harmony export ɵf */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__ = __webpack_require__("./node_modules/rxjs/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatMap__ = __webpack_require__("./node_modules/rxjs/operator/concatMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_filter__ = __webpack_require__("./node_modules/rxjs/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__ = __webpack_require__("./node_modules/rxjs/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__);

/**
 * @license Angular v4.4.5
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */







/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Transforms an `HttpRequest` into a stream of `HttpEvent`s, one of which will likely be a
 * `HttpResponse`.
 *
 * `HttpHandler` is injectable. When injected, the handler instance dispatches requests to the
 * first interceptor in the chain, which dispatches to the second, etc, eventually reaching the
 * `HttpBackend`.
 *
 * In an `HttpInterceptor`, the `HttpHandler` parameter is the next interceptor in the chain.
 *
 * \@experimental
 * @abstract
 */
var HttpHandler = (function () {
    function HttpHandler() {
    }
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    HttpHandler.prototype.handle = function (req) { };
    return HttpHandler;
}());
/**
 * A final `HttpHandler` which will dispatch the request via browser HTTP APIs to a backend.
 *
 * Interceptors sit between the `HttpClient` interface and the `HttpBackend`.
 *
 * When injected, `HttpBackend` dispatches requests directly to the backend, without going
 * through the interceptor chain.
 *
 * \@experimental
 * @abstract
 */
var HttpBackend = (function () {
    function HttpBackend() {
    }
    /**
     * @abstract
     * @param {?} req
     * @return {?}
     */
    HttpBackend.prototype.handle = function (req) { };
    return HttpBackend;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * A `HttpParameterCodec` that uses `encodeURIComponent` and `decodeURIComponent` to
 * serialize and parse URL parameter keys and values.
 *
 * \@experimental
 */
var HttpUrlEncodingCodec = (function () {
    function HttpUrlEncodingCodec() {
    }
    /**
     * @param {?} k
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.encodeKey = function (k) { return standardEncoding(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.encodeValue = function (v) { return standardEncoding(v); };
    /**
     * @param {?} k
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.decodeKey = function (k) { return decodeURIComponent(k); };
    /**
     * @param {?} v
     * @return {?}
     */
    HttpUrlEncodingCodec.prototype.decodeValue = function (v) { return decodeURIComponent(v); };
    return HttpUrlEncodingCodec;
}());
/**
 * @param {?} rawParams
 * @param {?} codec
 * @return {?}
 */
function paramParser(rawParams, codec) {
    var /** @type {?} */ map$$1 = new Map();
    if (rawParams.length > 0) {
        var /** @type {?} */ params = rawParams.split('&');
        params.forEach(function (param) {
            var /** @type {?} */ eqIdx = param.indexOf('=');
            var _a = eqIdx == -1 ?
                [codec.decodeKey(param), ''] :
                [codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1))], key = _a[0], val = _a[1];
            var /** @type {?} */ list = map$$1.get(key) || [];
            list.push(val);
            map$$1.set(key, list);
        });
    }
    return map$$1;
}
/**
 * @param {?} v
 * @return {?}
 */
function standardEncoding(v) {
    return encodeURIComponent(v)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/gi, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';')
        .replace(/%2B/gi, '+')
        .replace(/%3D/gi, '=')
        .replace(/%3F/gi, '?')
        .replace(/%2F/gi, '/');
}
/**
 * An HTTP request/response body that represents serialized parameters,
 * per the MIME type `application/x-www-form-urlencoded`.
 *
 * This class is immuatable - all mutation operations return a new instance.
 *
 * \@experimental
 */
var HttpParams = (function () {
    /**
     * @param {?=} options
     */
    function HttpParams(options) {
        if (options === void 0) { options = {}; }
        this.updates = null;
        this.cloneFrom = null;
        this.encoder = options.encoder || new HttpUrlEncodingCodec();
        this.map = !!options.fromString ? paramParser(options.fromString, this.encoder) : null;
    }
    /**
     * Check whether the body has one or more values for the given parameter name.
     * @param {?} param
     * @return {?}
     */
    HttpParams.prototype.has = function (param) {
        this.init();
        return ((this.map)).has(param);
    };
    /**
     * Get the first value for the given parameter name, or `null` if it's not present.
     * @param {?} param
     * @return {?}
     */
    HttpParams.prototype.get = function (param) {
        this.init();
        var /** @type {?} */ res = ((this.map)).get(param);
        return !!res ? res[0] : null;
    };
    /**
     * Get all values for the given parameter name, or `null` if it's not present.
     * @param {?} param
     * @return {?}
     */
    HttpParams.prototype.getAll = function (param) {
        this.init();
        return ((this.map)).get(param) || null;
    };
    /**
     * Get all the parameter names for this body.
     * @return {?}
     */
    HttpParams.prototype.keys = function () {
        this.init();
        return Array.from(/** @type {?} */ ((this.map)).keys());
    };
    /**
     * Construct a new body with an appended value for the given parameter name.
     * @param {?} param
     * @param {?} value
     * @return {?}
     */
    HttpParams.prototype.append = function (param, value) { return this.clone({ param: param, value: value, op: 'a' }); };
    /**
     * Construct a new body with a new value for the given parameter name.
     * @param {?} param
     * @param {?} value
     * @return {?}
     */
    HttpParams.prototype.set = function (param, value) { return this.clone({ param: param, value: value, op: 's' }); };
    /**
     * Construct a new body with either the given value for the given parameter
     * removed, if a value is given, or all values for the given parameter removed
     * if not.
     * @param {?} param
     * @param {?=} value
     * @return {?}
     */
    HttpParams.prototype.delete = function (param, value) { return this.clone({ param: param, value: value, op: 'd' }); };
    /**
     * Serialize the body to an encoded string, where key-value pairs (separated by `=`) are
     * separated by `&`s.
     * @return {?}
     */
    HttpParams.prototype.toString = function () {
        var _this = this;
        this.init();
        return this.keys()
            .map(function (key) {
            var /** @type {?} */ eKey = _this.encoder.encodeKey(key);
            return ((((_this.map)).get(key))).map(function (value) { return eKey + '=' + _this.encoder.encodeValue(value); })
                .join('&');
        })
            .join('&');
    };
    /**
     * @param {?} update
     * @return {?}
     */
    HttpParams.prototype.clone = function (update) {
        var /** @type {?} */ clone = new HttpParams({ encoder: this.encoder });
        clone.cloneFrom = this.cloneFrom || this;
        clone.updates = (this.updates || []).concat([update]);
        return clone;
    };
    /**
     * @return {?}
     */
    HttpParams.prototype.init = function () {
        var _this = this;
        if (this.map === null) {
            this.map = new Map();
        }
        if (this.cloneFrom !== null) {
            this.cloneFrom.init();
            this.cloneFrom.keys().forEach(function (key) { return ((_this.map)).set(key, /** @type {?} */ ((((((_this.cloneFrom)).map)).get(key)))); }); /** @type {?} */
            ((this.updates)).forEach(function (update) {
                switch (update.op) {
                    case 'a':
                    case 's':
                        var /** @type {?} */ base = (update.op === 'a' ? ((_this.map)).get(update.param) : undefined) || [];
                        base.push(/** @type {?} */ ((update.value))); /** @type {?} */
                        ((_this.map)).set(update.param, base);
                        break;
                    case 'd':
                        if (update.value !== undefined) {
                            var /** @type {?} */ base_1 = ((_this.map)).get(update.param) || [];
                            var /** @type {?} */ idx = base_1.indexOf(update.value);
                            if (idx !== -1) {
                                base_1.splice(idx, 1);
                            }
                            if (base_1.length > 0) {
                                ((_this.map)).set(update.param, base_1);
                            }
                            else {
                                ((_this.map)).delete(update.param);
                            }
                        }
                        else {
                            ((_this.map)).delete(update.param);
                            break;
                        }
                }
            });
            this.cloneFrom = null;
        }
    };
    return HttpParams;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Immutable set of Http headers, with lazy parsing.
 * \@experimental
 */
var HttpHeaders = (function () {
    /**
     * @param {?=} headers
     */
    function HttpHeaders(headers) {
        var _this = this;
        /**
         * Internal map of lowercased header names to the normalized
         * form of the name (the form seen first).
         */
        this.normalizedNames = new Map();
        /**
         * Queued updates to be materialized the next initialization.
         */
        this.lazyUpdate = null;
        if (!headers) {
            this.headers = new Map();
        }
        else if (typeof headers === 'string') {
            this.lazyInit = function () {
                _this.headers = new Map();
                headers.split('\n').forEach(function (line) {
                    var index = line.indexOf(':');
                    if (index > 0) {
                        var name = line.slice(0, index);
                        var key = name.toLowerCase();
                        var value = line.slice(index + 1).trim();
                        _this.maybeSetNormalizedName(name, key);
                        if (_this.headers.has(key)) {
                            _this.headers.get(key).push(value);
                        }
                        else {
                            _this.headers.set(key, [value]);
                        }
                    }
                });
            };
        }
        else {
            this.lazyInit = function () {
                _this.headers = new Map();
                Object.keys(headers).forEach(function (name) {
                    var values = headers[name];
                    var key = name.toLowerCase();
                    if (typeof values === 'string') {
                        values = [values];
                    }
                    if (values.length > 0) {
                        _this.headers.set(key, values);
                        _this.maybeSetNormalizedName(name, key);
                    }
                });
            };
        }
    }
    /**
     * Checks for existence of header by given name.
     * @param {?} name
     * @return {?}
     */
    HttpHeaders.prototype.has = function (name) {
        this.init();
        return this.headers.has(name.toLowerCase());
    };
    /**
     * Returns first header that matches given name.
     * @param {?} name
     * @return {?}
     */
    HttpHeaders.prototype.get = function (name) {
        this.init();
        var /** @type {?} */ values = this.headers.get(name.toLowerCase());
        return values && values.length > 0 ? values[0] : null;
    };
    /**
     * Returns the names of the headers
     * @return {?}
     */
    HttpHeaders.prototype.keys = function () {
        this.init();
        return Array.from(this.normalizedNames.values());
    };
    /**
     * Returns list of header values for a given name.
     * @param {?} name
     * @return {?}
     */
    HttpHeaders.prototype.getAll = function (name) {
        this.init();
        return this.headers.get(name.toLowerCase()) || null;
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HttpHeaders.prototype.append = function (name, value) {
        return this.clone({ name: name, value: value, op: 'a' });
    };
    /**
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    HttpHeaders.prototype.set = function (name, value) {
        return this.clone({ name: name, value: value, op: 's' });
    };
    /**
     * @param {?} name
     * @param {?=} value
     * @return {?}
     */
    HttpHeaders.prototype.delete = function (name, value) {
        return this.clone({ name: name, value: value, op: 'd' });
    };
    /**
     * @param {?} name
     * @param {?} lcName
     * @return {?}
     */
    HttpHeaders.prototype.maybeSetNormalizedName = function (name, lcName) {
        if (!this.normalizedNames.has(lcName)) {
            this.normalizedNames.set(lcName, name);
        }
    };
    /**
     * @return {?}
     */
    HttpHeaders.prototype.init = function () {
        var _this = this;
        if (!!this.lazyInit) {
            if (this.lazyInit instanceof HttpHeaders) {
                this.copyFrom(this.lazyInit);
            }
            else {
                this.lazyInit();
            }
            this.lazyInit = null;
            if (!!this.lazyUpdate) {
                this.lazyUpdate.forEach(function (update) { return _this.applyUpdate(update); });
                this.lazyUpdate = null;
            }
        }
    };
    /**
     * @param {?} other
     * @return {?}
     */
    HttpHeaders.prototype.copyFrom = function (other) {
        var _this = this;
        other.init();
        Array.from(other.headers.keys()).forEach(function (key) {
            _this.headers.set(key, /** @type {?} */ ((other.headers.get(key))));
            _this.normalizedNames.set(key, /** @type {?} */ ((other.normalizedNames.get(key))));
        });
    };
    /**
     * @param {?} update
     * @return {?}
     */
    HttpHeaders.prototype.clone = function (update) {
        var /** @type {?} */ clone = new HttpHeaders();
        clone.lazyInit =
            (!!this.lazyInit && this.lazyInit instanceof HttpHeaders) ? this.lazyInit : this;
        clone.lazyUpdate = (this.lazyUpdate || []).concat([update]);
        return clone;
    };
    /**
     * @param {?} update
     * @return {?}
     */
    HttpHeaders.prototype.applyUpdate = function (update) {
        var /** @type {?} */ key = update.name.toLowerCase();
        switch (update.op) {
            case 'a':
            case 's':
                var /** @type {?} */ value = ((update.value));
                if (typeof value === 'string') {
                    value = [value];
                }
                if (value.length === 0) {
                    return;
                }
                this.maybeSetNormalizedName(update.name, key);
                var /** @type {?} */ base = (update.op === 'a' ? this.headers.get(key) : undefined) || [];
                base.push.apply(base, value);
                this.headers.set(key, base);
                break;
            case 'd':
                var /** @type {?} */ toDelete_1 = (update.value);
                if (!toDelete_1) {
                    this.headers.delete(key);
                    this.normalizedNames.delete(key);
                }
                else {
                    var /** @type {?} */ existing = this.headers.get(key);
                    if (!existing) {
                        return;
                    }
                    existing = existing.filter(function (value) { return toDelete_1.indexOf(value) === -1; });
                    if (existing.length === 0) {
                        this.headers.delete(key);
                        this.normalizedNames.delete(key);
                    }
                    else {
                        this.headers.set(key, existing);
                    }
                }
                break;
        }
    };
    /**
     * \@internal
     * @param {?} fn
     * @return {?}
     */
    HttpHeaders.prototype.forEach = function (fn) {
        var _this = this;
        this.init();
        Array.from(this.normalizedNames.keys())
            .forEach(function (key) { return fn(/** @type {?} */ ((_this.normalizedNames.get(key))), /** @type {?} */ ((_this.headers.get(key)))); });
    };
    return HttpHeaders;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Determine whether the given HTTP method may include a body.
 * @param {?} method
 * @return {?}
 */
function mightHaveBody(method) {
    switch (method) {
        case 'DELETE':
        case 'GET':
        case 'HEAD':
        case 'OPTIONS':
        case 'JSONP':
            return false;
        default:
            return true;
    }
}
/**
 * Safely assert whether the given value is an ArrayBuffer.
 *
 * In some execution environments ArrayBuffer is not defined.
 * @param {?} value
 * @return {?}
 */
function isArrayBuffer(value) {
    return typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer;
}
/**
 * Safely assert whether the given value is a Blob.
 *
 * In some execution environments Blob is not defined.
 * @param {?} value
 * @return {?}
 */
function isBlob(value) {
    return typeof Blob !== 'undefined' && value instanceof Blob;
}
/**
 * Safely assert whether the given value is a FormData instance.
 *
 * In some execution environments FormData is not defined.
 * @param {?} value
 * @return {?}
 */
function isFormData(value) {
    return typeof FormData !== 'undefined' && value instanceof FormData;
}
/**
 * An outgoing HTTP request with an optional typed body.
 *
 * `HttpRequest` represents an outgoing request, including URL, method,
 * headers, body, and other request configuration options. Instances should be
 * assumed to be immutable. To modify a `HttpRequest`, the `clone`
 * method should be used.
 *
 * \@experimental
 */
var HttpRequest = (function () {
    /**
     * @param {?} method
     * @param {?} url
     * @param {?=} third
     * @param {?=} fourth
     */
    function HttpRequest(method, url, third, fourth) {
        this.url = url;
        /**
         * The request body, or `null` if one isn't set.
         *
         * Bodies are not enforced to be immutable, as they can include a reference to any
         * user-defined data type. However, interceptors should take care to preserve
         * idempotence by treating them as such.
         */
        this.body = null;
        /**
         * Whether this request should be made in a way that exposes progress events.
         *
         * Progress events are expensive (change detection runs on each event) and so
         * they should only be requested if the consumer intends to monitor them.
         */
        this.reportProgress = false;
        /**
         * Whether this request should be sent with outgoing credentials (cookies).
         */
        this.withCredentials = false;
        /**
         * The expected response type of the server.
         *
         * This is used to parse the response appropriately before returning it to
         * the requestee.
         */
        this.responseType = 'json';
        this.method = method.toUpperCase();
        // Next, need to figure out which argument holds the HttpRequestInit
        // options, if any.
        var options;
        // Check whether a body argument is expected. The only valid way to omit
        // the body argument is to use a known no-body method like GET.
        if (mightHaveBody(this.method) || !!fourth) {
            // Body is the third argument, options are the fourth.
            this.body = third || null;
            options = fourth;
        }
        else {
            // No body required, options are the third argument. The body stays null.
            options = third;
        }
        // If options have been passed, interpret them.
        if (options) {
            // Normalize reportProgress and withCredentials.
            this.reportProgress = !!options.reportProgress;
            this.withCredentials = !!options.withCredentials;
            // Override default response type of 'json' if one is provided.
            if (!!options.responseType) {
                this.responseType = options.responseType;
            }
            // Override headers if they're provided.
            if (!!options.headers) {
                this.headers = options.headers;
            }
            if (!!options.params) {
                this.params = options.params;
            }
        }
        // If no headers have been passed in, construct a new HttpHeaders instance.
        if (!this.headers) {
            this.headers = new HttpHeaders();
        }
        // If no parameters have been passed in, construct a new HttpUrlEncodedParams instance.
        if (!this.params) {
            this.params = new HttpParams();
            this.urlWithParams = url;
        }
        else {
            // Encode the parameters to a string in preparation for inclusion in the URL.
            var params = this.params.toString();
            if (params.length === 0) {
                // No parameters, the visible URL is just the URL given at creation time.
                this.urlWithParams = url;
            }
            else {
                // Does the URL already have query parameters? Look for '?'.
                var qIdx = url.indexOf('?');
                // There are 3 cases to handle:
                // 1) No existing parameters -> append '?' followed by params.
                // 2) '?' exists and is followed by existing query string ->
                //    append '&' followed by params.
                // 3) '?' exists at the end of the url -> append params directly.
                // This basically amounts to determining the character, if any, with
                // which to join the URL and parameters.
                var sep = qIdx === -1 ? '?' : (qIdx < url.length - 1 ? '&' : '');
                this.urlWithParams = url + sep + params;
            }
        }
    }
    /**
     * Transform the free-form body into a serialized format suitable for
     * transmission to the server.
     * @return {?}
     */
    HttpRequest.prototype.serializeBody = function () {
        // If no body is present, no need to serialize it.
        if (this.body === null) {
            return null;
        }
        // Check whether the body is already in a serialized form. If so,
        // it can just be returned directly.
        if (isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) ||
            typeof this.body === 'string') {
            return this.body;
        }
        // Check whether the body is an instance of HttpUrlEncodedParams.
        if (this.body instanceof HttpParams) {
            return this.body.toString();
        }
        // Check whether the body is an object or array, and serialize with JSON if so.
        if (typeof this.body === 'object' || typeof this.body === 'boolean' ||
            Array.isArray(this.body)) {
            return JSON.stringify(this.body);
        }
        // Fall back on toString() for everything else.
        return ((this.body)).toString();
    };
    /**
     * Examine the body and attempt to infer an appropriate MIME type
     * for it.
     *
     * If no such type can be inferred, this method will return `null`.
     * @return {?}
     */
    HttpRequest.prototype.detectContentTypeHeader = function () {
        // An empty body has no content type.
        if (this.body === null) {
            return null;
        }
        // FormData bodies rely on the browser's content type assignment.
        if (isFormData(this.body)) {
            return null;
        }
        // Blobs usually have their own content type. If it doesn't, then
        // no type can be inferred.
        if (isBlob(this.body)) {
            return this.body.type || null;
        }
        // Array buffers have unknown contents and thus no type can be inferred.
        if (isArrayBuffer(this.body)) {
            return null;
        }
        // Technically, strings could be a form of JSON data, but it's safe enough
        // to assume they're plain strings.
        if (typeof this.body === 'string') {
            return 'text/plain';
        }
        // `HttpUrlEncodedParams` has its own content-type.
        if (this.body instanceof HttpParams) {
            return 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        // Arrays, objects, and numbers will be encoded as JSON.
        if (typeof this.body === 'object' || typeof this.body === 'number' ||
            Array.isArray(this.body)) {
            return 'application/json';
        }
        // No type could be inferred.
        return null;
    };
    /**
     * @param {?=} update
     * @return {?}
     */
    HttpRequest.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        // For method, url, and responseType, take the current value unless
        // it is overridden in the update hash.
        var /** @type {?} */ method = update.method || this.method;
        var /** @type {?} */ url = update.url || this.url;
        var /** @type {?} */ responseType = update.responseType || this.responseType;
        // The body is somewhat special - a `null` value in update.body means
        // whatever current body is present is being overridden with an empty
        // body, whereas an `undefined` value in update.body implies no
        // override.
        var /** @type {?} */ body = (update.body !== undefined) ? update.body : this.body;
        // Carefully handle the boolean options to differentiate between
        // `false` and `undefined` in the update args.
        var /** @type {?} */ withCredentials = (update.withCredentials !== undefined) ? update.withCredentials : this.withCredentials;
        var /** @type {?} */ reportProgress = (update.reportProgress !== undefined) ? update.reportProgress : this.reportProgress;
        // Headers and params may be appended to if `setHeaders` or
        // `setParams` are used.
        var /** @type {?} */ headers = update.headers || this.headers;
        var /** @type {?} */ params = update.params || this.params;
        // Check whether the caller has asked to add headers.
        if (update.setHeaders !== undefined) {
            // Set every requested header.
            headers =
                Object.keys(update.setHeaders)
                    .reduce(function (headers, name) { return headers.set(name, /** @type {?} */ ((update.setHeaders))[name]); }, headers);
        }
        // Check whether the caller has asked to set params.
        if (update.setParams) {
            // Set every requested param.
            params = Object.keys(update.setParams)
                .reduce(function (params, param) { return params.set(param, /** @type {?} */ ((update.setParams))[param]); }, params);
        }
        // Finally, construct the new HttpRequest using the pieces from above.
        return new HttpRequest(method, url, body, {
            params: params, headers: headers, reportProgress: reportProgress, responseType: responseType, withCredentials: withCredentials,
        });
    };
    return HttpRequest;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var HttpEventType = {};
HttpEventType.Sent = 0;
HttpEventType.UploadProgress = 1;
HttpEventType.ResponseHeader = 2;
HttpEventType.DownloadProgress = 3;
HttpEventType.Response = 4;
HttpEventType.User = 5;
HttpEventType[HttpEventType.Sent] = "Sent";
HttpEventType[HttpEventType.UploadProgress] = "UploadProgress";
HttpEventType[HttpEventType.ResponseHeader] = "ResponseHeader";
HttpEventType[HttpEventType.DownloadProgress] = "DownloadProgress";
HttpEventType[HttpEventType.Response] = "Response";
HttpEventType[HttpEventType.User] = "User";
/**
 * Base class for both `HttpResponse` and `HttpHeaderResponse`.
 *
 * \@experimental
 * @abstract
 */
var HttpResponseBase = (function () {
    /**
     * Super-constructor for all responses.
     *
     * The single parameter accepted is an initialization hash. Any properties
     * of the response passed there will override the default values.
     * @param {?} init
     * @param {?=} defaultStatus
     * @param {?=} defaultStatusText
     */
    function HttpResponseBase(init, defaultStatus, defaultStatusText) {
        if (defaultStatus === void 0) { defaultStatus = 200; }
        if (defaultStatusText === void 0) { defaultStatusText = 'OK'; }
        // If the hash has values passed, use them to initialize the response.
        // Otherwise use the default values.
        this.headers = init.headers || new HttpHeaders();
        this.status = init.status !== undefined ? init.status : defaultStatus;
        this.statusText = init.statusText || defaultStatusText;
        this.url = init.url || null;
        // Cache the ok value to avoid defining a getter.
        this.ok = this.status >= 200 && this.status < 300;
    }
    return HttpResponseBase;
}());
/**
 * A partial HTTP response which only includes the status and header data,
 * but no response body.
 *
 * `HttpHeaderResponse` is a `HttpEvent` available on the response
 * event stream, only when progress events are requested.
 *
 * \@experimental
 */
var HttpHeaderResponse = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](HttpHeaderResponse, _super);
    /**
     * Create a new `HttpHeaderResponse` with the given parameters.
     * @param {?=} init
     */
    function HttpHeaderResponse(init) {
        if (init === void 0) { init = {}; }
        var _this = _super.call(this, init) || this;
        _this.type = HttpEventType.ResponseHeader;
        return _this;
    }
    /**
     * Copy this `HttpHeaderResponse`, overriding its contents with the
     * given parameter hash.
     * @param {?=} update
     * @return {?}
     */
    HttpHeaderResponse.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        // Perform a straightforward initialization of the new HttpHeaderResponse,
        // overriding the current parameters with new ones if given.
        return new HttpHeaderResponse({
            headers: update.headers || this.headers,
            status: update.status !== undefined ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    };
    return HttpHeaderResponse;
}(HttpResponseBase));
/**
 * A full HTTP response, including a typed response body (which may be `null`
 * if one was not returned).
 *
 * `HttpResponse` is a `HttpEvent` available on the response event
 * stream.
 *
 * \@experimental
 */
var HttpResponse = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](HttpResponse, _super);
    /**
     * Construct a new `HttpResponse`.
     * @param {?=} init
     */
    function HttpResponse(init) {
        if (init === void 0) { init = {}; }
        var _this = _super.call(this, init) || this;
        _this.type = HttpEventType.Response;
        _this.body = init.body || null;
        return _this;
    }
    /**
     * @param {?=} update
     * @return {?}
     */
    HttpResponse.prototype.clone = function (update) {
        if (update === void 0) { update = {}; }
        return new HttpResponse({
            body: (update.body !== undefined) ? update.body : this.body,
            headers: update.headers || this.headers,
            status: (update.status !== undefined) ? update.status : this.status,
            statusText: update.statusText || this.statusText,
            url: update.url || this.url || undefined,
        });
    };
    return HttpResponse;
}(HttpResponseBase));
/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 *
 * Any error returned on the `Observable` response stream will be
 * wrapped in an `HttpErrorResponse` to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 * \@experimental
 */
var HttpErrorResponse = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](HttpErrorResponse, _super);
    /**
     * @param {?} init
     */
    function HttpErrorResponse(init) {
        var _this = 
        // Initialize with a default status of 0 / Unknown Error.
        _super.call(this, init, 0, 'Unknown Error') || this;
        _this.name = 'HttpErrorResponse';
        /**
         * Errors are never okay, even when the status code is in the 2xx success range.
         */
        _this.ok = false;
        // If the response was successful, then this was a parse error. Otherwise, it was
        // a protocol-level failure of some sort. Either the request failed in transit
        // or the server returned an unsuccessful status code.
        if (_this.status >= 200 && _this.status < 300) {
            _this.message = "Http failure during parsing for " + (init.url || '(unknown url)');
        }
        else {
            _this.message =
                "Http failure response for " + (init.url || '(unknown url)') + ": " + init.status + " " + init.statusText;
        }
        _this.error = init.error || null;
        return _this;
    }
    return HttpErrorResponse;
}(HttpResponseBase));
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Construct an instance of `HttpRequestOptions<T>` from a source `HttpMethodOptions` and
 * the given `body`. Basically, this clones the object and adds the body.
 * @template T
 * @param {?} options
 * @param {?} body
 * @return {?}
 */
function addBody(options, body) {
    return {
        body: body,
        headers: options.headers,
        observe: options.observe,
        params: options.params,
        reportProgress: options.reportProgress,
        responseType: options.responseType,
        withCredentials: options.withCredentials,
    };
}
/**
 * Perform HTTP requests.
 *
 * `HttpClient` is available as an injectable class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies according to which
 * signature is called (mainly the values of `observe` and `responseType`).
 *
 * \@experimental
 */
var HttpClient = (function () {
    /**
     * @param {?} handler
     */
    function HttpClient(handler) {
        this.handler = handler;
    }
    /**
     * Constructs an `Observable` for a particular HTTP request that, when subscribed,
     * fires the request through the chain of registered interceptors and on to the
     * server.
     *
     * This method can be called in one of two ways. Either an `HttpRequest`
     * instance can be passed directly as the only parameter, or a method can be
     * passed as the first parameter, a string URL as the second, and an
     * options hash as the third.
     *
     * If a `HttpRequest` object is passed directly, an `Observable` of the
     * raw `HttpEvent` stream will be returned.
     *
     * If a request is instead built by providing a URL, the options object
     * determines the return type of `request()`. In addition to configuring
     * request parameters such as the outgoing headers and/or the body, the options
     * hash specifies two key pieces of information about the request: the
     * `responseType` and what to `observe`.
     *
     * The `responseType` value determines how a successful response body will be
     * parsed. If `responseType` is the default `json`, a type interface for the
     * resulting object may be passed as a type parameter to `request()`.
     *
     * The `observe` value determines the return type of `request()`, based on what
     * the consumer is interested in observing. A value of `events` will return an
     * `Observable<HttpEvent>` representing the raw `HttpEvent` stream,
     * including progress events by default. A value of `response` will return an
     * `Observable<HttpResponse<T>>` where the `T` parameter of `HttpResponse`
     * depends on the `responseType` and any optionally provided type parameter.
     * A value of `body` will return an `Observable<T>` with the same `T` body type.
     * @param {?} first
     * @param {?=} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.request = function (first, url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var /** @type {?} */ req;
        // Firstly, check whether the primary argument is an instance of `HttpRequest`.
        if (first instanceof HttpRequest) {
            // It is. The other arguments must be undefined (per the signatures) and can be
            // ignored.
            req = (first);
        }
        else {
            // It's a string, so it represents a URL. Construct a request based on it,
            // and incorporate the remaining arguments (assuming GET unless a method is
            // provided.
            req = new HttpRequest(first, /** @type {?} */ ((url)), options.body || null, {
                headers: options.headers,
                params: options.params,
                reportProgress: options.reportProgress,
                // By default, JSON is assumed to be returned for all calls.
                responseType: options.responseType || 'json',
                withCredentials: options.withCredentials,
            });
        }
        // Start with an Observable.of() the initial request, and run the handler (which
        // includes all interceptors) inside a concatMap(). This way, the handler runs
        // inside an Observable chain, which causes interceptors to be re-run on every
        // subscription (this also makes retries re-run the handler, including interceptors).
        var /** @type {?} */ events$ = __WEBPACK_IMPORTED_MODULE_3_rxjs_operator_concatMap__["concatMap"].call(Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_observable_of__["of"])(req), function (req) { return _this.handler.handle(req); });
        // If coming via the API signature which accepts a previously constructed HttpRequest,
        // the only option is to get the event stream. Otherwise, return the event stream if
        // that is what was requested.
        if (first instanceof HttpRequest || options.observe === 'events') {
            return events$;
        }
        // The requested stream contains either the full response or the body. In either
        // case, the first step is to filter the event stream to extract a stream of
        // responses(s).
        var /** @type {?} */ res$ = __WEBPACK_IMPORTED_MODULE_4_rxjs_operator_filter__["filter"].call(events$, function (event) { return event instanceof HttpResponse; });
        // Decide which stream to return.
        switch (options.observe || 'body') {
            case 'body':
                // The requested stream is the body. Map the response stream to the response
                // body. This could be done more simply, but a misbehaving interceptor might
                // transform the response body into a different format and ignore the requested
                // responseType. Guard against this by validating that the response is of the
                // requested type.
                switch (req.responseType) {
                    case 'arraybuffer':
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(res$, function (res) {
                            // Validate that the body is an ArrayBuffer.
                            if (res.body !== null && !(res.body instanceof ArrayBuffer)) {
                                throw new Error('Response is not an ArrayBuffer.');
                            }
                            return res.body;
                        });
                    case 'blob':
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(res$, function (res) {
                            // Validate that the body is a Blob.
                            if (res.body !== null && !(res.body instanceof Blob)) {
                                throw new Error('Response is not a Blob.');
                            }
                            return res.body;
                        });
                    case 'text':
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(res$, function (res) {
                            // Validate that the body is a string.
                            if (res.body !== null && typeof res.body !== 'string') {
                                throw new Error('Response is not a string.');
                            }
                            return res.body;
                        });
                    case 'json':
                    default:
                        // No validation needed for JSON responses, as they can be of any type.
                        return __WEBPACK_IMPORTED_MODULE_5_rxjs_operator_map__["map"].call(res$, function (res) { return res.body; });
                }
            case 'response':
                // The response stream was requested directly, so return it.
                return res$;
            default:
                // Guard against new future observe types being added.
                throw new Error("Unreachable: unhandled observe type " + options.observe + "}");
        }
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * DELETE request to be executed on the server. See the individual overloads for
     * details of `delete()`'s return type based on the provided options.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.delete = function (url, options) {
        if (options === void 0) { options = {}; }
        return this.request('DELETE', url, /** @type {?} */ (options));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * GET request to be executed on the server. See the individual overloads for
     * details of `get()`'s return type based on the provided options.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        return this.request('GET', url, /** @type {?} */ (options));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * HEAD request to be executed on the server. See the individual overloads for
     * details of `head()`'s return type based on the provided options.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.head = function (url, options) {
        if (options === void 0) { options = {}; }
        return this.request('HEAD', url, /** @type {?} */ (options));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause a request
     * with the special method `JSONP` to be dispatched via the interceptor pipeline.
     *
     * A suitable interceptor must be installed (e.g. via the `HttpClientJsonpModule`).
     * If no such interceptor is reached, then the `JSONP` request will likely be
     * rejected by the configured backend.
     * @template T
     * @param {?} url
     * @param {?} callbackParam
     * @return {?}
     */
    HttpClient.prototype.jsonp = function (url, callbackParam) {
        return this.request('JSONP', url, {
            params: new HttpParams().append(callbackParam, 'JSONP_CALLBACK'),
            observe: 'body',
            responseType: 'json',
        });
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * OPTIONS request to be executed on the server. See the individual overloads for
     * details of `options()`'s return type based on the provided options.
     * @param {?} url
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.options = function (url, options) {
        if (options === void 0) { options = {}; }
        return this.request('OPTIONS', url, /** @type {?} */ (options));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * PATCH request to be executed on the server. See the individual overloads for
     * details of `patch()`'s return type based on the provided options.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.patch = function (url, body, options) {
        if (options === void 0) { options = {}; }
        return this.request('PATCH', url, addBody(options, body));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * POST request to be executed on the server. See the individual overloads for
     * details of `post()`'s return type based on the provided options.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.post = function (url, body, options) {
        if (options === void 0) { options = {}; }
        return this.request('POST', url, addBody(options, body));
    };
    /**
     * Constructs an `Observable` which, when subscribed, will cause the configured
     * POST request to be executed on the server. See the individual overloads for
     * details of `post()`'s return type based on the provided options.
     * @param {?} url
     * @param {?} body
     * @param {?=} options
     * @return {?}
     */
    HttpClient.prototype.put = function (url, body, options) {
        if (options === void 0) { options = {}; }
        return this.request('PUT', url, addBody(options, body));
    };
    return HttpClient;
}());
HttpClient.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
HttpClient.ctorParameters = function () { return [
    { type: HttpHandler, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
 *
 * \@experimental
 */
var HttpInterceptorHandler = (function () {
    /**
     * @param {?} next
     * @param {?} interceptor
     */
    function HttpInterceptorHandler(next, interceptor) {
        this.next = next;
        this.interceptor = interceptor;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    HttpInterceptorHandler.prototype.handle = function (req) {
        return this.interceptor.intercept(req, this.next);
    };
    return HttpInterceptorHandler;
}());
/**
 * A multi-provider token which represents the array of `HttpInterceptor`s that
 * are registered.
 *
 * \@experimental
 */
var HTTP_INTERCEPTORS = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* InjectionToken */]('HTTP_INTERCEPTORS');
var NoopInterceptor = (function () {
    function NoopInterceptor() {
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    NoopInterceptor.prototype.intercept = function (req, next) {
        return next.handle(req);
    };
    return NoopInterceptor;
}());
NoopInterceptor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
NoopInterceptor.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Every request made through JSONP needs a callback name that's unique across the
// whole page. Each request is assigned an id and the callback name is constructed
// from that. The next id to be assigned is tracked in a global variable here that
// is shared among all applications on the page.
var nextRequestId = 0;
// Error text given when a JSONP script is injected, but doesn't invoke the callback
// passed in its URL.
var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
// Error text given when a request is passed to the JsonpClientBackend that doesn't
// have a request method JSONP.
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use JSONP request method.';
var JSONP_ERR_WRONG_RESPONSE_TYPE = 'JSONP requests must use Json response type.';
/**
 * DI token/abstract type representing a map of JSONP callbacks.
 *
 * In the browser, this should always be the `window` object.
 *
 * \@experimental
 * @abstract
 */
var JsonpCallbackContext = (function () {
    function JsonpCallbackContext() {
    }
    return JsonpCallbackContext;
}());
/**
 * `HttpBackend` that only processes `HttpRequest` with the JSONP method,
 * by performing JSONP style requests.
 *
 * \@experimental
 */
var JsonpClientBackend = (function () {
    /**
     * @param {?} callbackMap
     * @param {?} document
     */
    function JsonpClientBackend(callbackMap, document) {
        this.callbackMap = callbackMap;
        this.document = document;
    }
    /**
     * Get the name of the next callback method, by incrementing the global `nextRequestId`.
     * @return {?}
     */
    JsonpClientBackend.prototype.nextCallback = function () { return "ng_jsonp_callback_" + nextRequestId++; };
    /**
     * Process a JSONP request and return an event stream of the results.
     * @param {?} req
     * @return {?}
     */
    JsonpClientBackend.prototype.handle = function (req) {
        var _this = this;
        // Firstly, check both the method and response type. If either doesn't match
        // then the request was improperly routed here and cannot be handled.
        if (req.method !== 'JSONP') {
            throw new Error(JSONP_ERR_WRONG_METHOD);
        }
        else if (req.responseType !== 'json') {
            throw new Error(JSONP_ERR_WRONG_RESPONSE_TYPE);
        }
        // Everything else happens inside the Observable boundary.
        return new __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"](function (observer) {
            // The first step to make a request is to generate the callback name, and replace the
            // callback placeholder in the URL with the name. Care has to be taken here to ensure
            // a trailing &, if matched, gets inserted back into the URL in the correct place.
            var /** @type {?} */ callback = _this.nextCallback();
            var /** @type {?} */ url = req.urlWithParams.replace(/=JSONP_CALLBACK(&|$)/, "=" + callback + "$1");
            // Construct the <script> tag and point it at the URL.
            var /** @type {?} */ node = _this.document.createElement('script');
            node.src = url;
            // A JSONP request requires waiting for multiple callbacks. These variables
            // are closed over and track state across those callbacks.
            // The response object, if one has been received, or null otherwise.
            var /** @type {?} */ body = null;
            // Whether the response callback has been called.
            var /** @type {?} */ finished = false;
            // Whether the request has been cancelled (and thus any other callbacks)
            // should be ignored.
            var /** @type {?} */ cancelled = false;
            // Set the response callback in this.callbackMap (which will be the window
            // object in the browser. The script being loaded via the <script> tag will
            // eventually call this callback.
            _this.callbackMap[callback] = function (data) {
                // Data has been received from the JSONP script. Firstly, delete this callback.
                delete _this.callbackMap[callback];
                // Next, make sure the request wasn't cancelled in the meantime.
                if (cancelled) {
                    return;
                }
                // Set state to indicate data was received.
                body = data;
                finished = true;
            };
            // cleanup() is a utility closure that removes the <script> from the page and
            // the response callback from the window. This logic is used in both the
            // success, error, and cancellation paths, so it's extracted out for convenience.
            var /** @type {?} */ cleanup = function () {
                // Remove the <script> tag if it's still on the page.
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
                // Remove the response callback from the callbackMap (window object in the
                // browser).
                delete _this.callbackMap[callback];
            };
            // onLoad() is the success callback which runs after the response callback
            // if the JSONP script loads successfully. The event itself is unimportant.
            // If something went wrong, onLoad() may run without the response callback
            // having been invoked.
            var /** @type {?} */ onLoad = function (event) {
                // Do nothing if the request has been cancelled.
                if (cancelled) {
                    return;
                }
                // Cleanup the page.
                cleanup();
                // Check whether the response callback has run.
                if (!finished) {
                    // It hasn't, something went wrong with the request. Return an error via
                    // the Observable error path. All JSONP errors have status 0.
                    observer.error(new HttpErrorResponse({
                        url: url,
                        status: 0,
                        statusText: 'JSONP Error',
                        error: new Error(JSONP_ERR_NO_CALLBACK),
                    }));
                    return;
                }
                // Success. body either contains the response body or null if none was
                // returned.
                observer.next(new HttpResponse({
                    body: body,
                    status: 200,
                    statusText: 'OK', url: url,
                }));
                // Complete the stream, the resposne is over.
                observer.complete();
            };
            // onError() is the error callback, which runs if the script returned generates
            // a Javascript error. It emits the error via the Observable error channel as
            // a HttpErrorResponse.
            var /** @type {?} */ onError = function (error) {
                // If the request was already cancelled, no need to emit anything.
                if (cancelled) {
                    return;
                }
                cleanup();
                // Wrap the error in a HttpErrorResponse.
                observer.error(new HttpErrorResponse({
                    error: error,
                    status: 0,
                    statusText: 'JSONP Error', url: url,
                }));
            };
            // Subscribe to both the success (load) and error events on the <script> tag,
            // and add it to the page.
            node.addEventListener('load', onLoad);
            node.addEventListener('error', onError);
            _this.document.body.appendChild(node);
            // The request has now been successfully sent.
            observer.next({ type: HttpEventType.Sent });
            // Cancellation handler.
            return function () {
                // Track the cancellation so event listeners won't do anything even if already scheduled.
                cancelled = true;
                // Remove the event listeners so they won't run if the events later fire.
                node.removeEventListener('load', onLoad);
                node.removeEventListener('error', onError);
                // And finally, clean up the page.
                cleanup();
            };
        });
    };
    return JsonpClientBackend;
}());
JsonpClientBackend.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
JsonpClientBackend.ctorParameters = function () { return [
    { type: JsonpCallbackContext, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_6__angular_common__["c" /* DOCUMENT */],] },] },
]; };
/**
 * An `HttpInterceptor` which identifies requests with the method JSONP and
 * shifts them to the `JsonpClientBackend`.
 *
 * \@experimental
 */
var JsonpInterceptor = (function () {
    /**
     * @param {?} jsonp
     */
    function JsonpInterceptor(jsonp) {
        this.jsonp = jsonp;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    JsonpInterceptor.prototype.intercept = function (req, next) {
        if (req.method === 'JSONP') {
            return this.jsonp.handle(/** @type {?} */ (req));
        }
        // Fall through for normal HTTP requests.
        return next.handle(req);
    };
    return JsonpInterceptor;
}());
JsonpInterceptor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
JsonpInterceptor.ctorParameters = function () { return [
    { type: JsonpClientBackend, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Determine an appropriate URL for the response, by checking either
 * XMLHttpRequest.responseURL or the X-Request-URL header.
 * @param {?} xhr
 * @return {?}
 */
function getResponseUrl(xhr) {
    if ('responseURL' in xhr && xhr.responseURL) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return null;
}
/**
 * A wrapper around the `XMLHttpRequest` constructor.
 *
 * \@experimental
 * @abstract
 */
var XhrFactory = (function () {
    function XhrFactory() {
    }
    /**
     * @abstract
     * @return {?}
     */
    XhrFactory.prototype.build = function () { };
    return XhrFactory;
}());
/**
 * A factory for \@{link HttpXhrBackend} that uses the `XMLHttpRequest` browser API.
 *
 * \@experimental
 */
var BrowserXhr = (function () {
    function BrowserXhr() {
    }
    /**
     * @return {?}
     */
    BrowserXhr.prototype.build = function () { return ((new XMLHttpRequest())); };
    return BrowserXhr;
}());
BrowserXhr.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
BrowserXhr.ctorParameters = function () { return []; };
/**
 * An `HttpBackend` which uses the XMLHttpRequest API to send
 * requests to a backend server.
 *
 * \@experimental
 */
var HttpXhrBackend = (function () {
    /**
     * @param {?} xhrFactory
     */
    function HttpXhrBackend(xhrFactory) {
        this.xhrFactory = xhrFactory;
    }
    /**
     * Process a request and return a stream of response events.
     * @param {?} req
     * @return {?}
     */
    HttpXhrBackend.prototype.handle = function (req) {
        var _this = this;
        // Quick check to give a better error message when a user attempts to use
        // HttpClient.jsonp() without installing the JsonpClientModule
        if (req.method === 'JSONP') {
            throw new Error("Attempted to construct Jsonp request without JsonpClientModule installed.");
        }
        // Everything happens on Observable subscription.
        return new __WEBPACK_IMPORTED_MODULE_7_rxjs_Observable__["Observable"](function (observer) {
            // Start by setting up the XHR object with request method, URL, and withCredentials flag.
            var /** @type {?} */ xhr = _this.xhrFactory.build();
            xhr.open(req.method, req.urlWithParams);
            if (!!req.withCredentials) {
                xhr.withCredentials = true;
            }
            // Add all the requested headers.
            req.headers.forEach(function (name, values) { return xhr.setRequestHeader(name, values.join(',')); });
            // Add an Accept header if one isn't present already.
            if (!req.headers.has('Accept')) {
                xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
            }
            // Auto-detect the Content-Type header if one isn't present already.
            if (!req.headers.has('Content-Type')) {
                var /** @type {?} */ detectedType = req.detectContentTypeHeader();
                // Sometimes Content-Type detection fails.
                if (detectedType !== null) {
                    xhr.setRequestHeader('Content-Type', detectedType);
                }
            }
            // Set the responseType if one was requested.
            if (req.responseType) {
                var /** @type {?} */ responseType = req.responseType.toLowerCase();
                // JSON responses need to be processed as text. This is because if the server
                // returns an XSSI-prefixed JSON response, the browser will fail to parse it,
                // xhr.response will be null, and xhr.responseText cannot be accessed to
                // retrieve the prefixed JSON data in order to strip the prefix. Thus, all JSON
                // is parsed by first requesting text and then applying JSON.parse.
                xhr.responseType = (((responseType !== 'json') ? responseType : 'text'));
            }
            // Serialize the request body if one is present. If not, this will be set to null.
            var /** @type {?} */ reqBody = req.serializeBody();
            // If progress events are enabled, response headers will be delivered
            // in two events - the HttpHeaderResponse event and the full HttpResponse
            // event. However, since response headers don't change in between these
            // two events, it doesn't make sense to parse them twice. So headerResponse
            // caches the data extracted from the response whenever it's first parsed,
            // to ensure parsing isn't duplicated.
            var /** @type {?} */ headerResponse = null;
            // partialFromXhr extracts the HttpHeaderResponse from the current XMLHttpRequest
            // state, and memoizes it into headerResponse.
            var /** @type {?} */ partialFromXhr = function () {
                if (headerResponse !== null) {
                    return headerResponse;
                }
                // Read status and normalize an IE9 bug (http://bugs.jquery.com/ticket/1450).
                var /** @type {?} */ status = xhr.status === 1223 ? 204 : xhr.status;
                var /** @type {?} */ statusText = xhr.statusText || 'OK';
                // Parse headers from XMLHttpRequest - this step is lazy.
                var /** @type {?} */ headers = new HttpHeaders(xhr.getAllResponseHeaders());
                // Read the response URL from the XMLHttpResponse instance and fall back on the
                // request URL.
                var /** @type {?} */ url = getResponseUrl(xhr) || req.url;
                // Construct the HttpHeaderResponse and memoize it.
                headerResponse = new HttpHeaderResponse({ headers: headers, status: status, statusText: statusText, url: url });
                return headerResponse;
            };
            // Next, a few closures are defined for the various events which XMLHttpRequest can
            // emit. This allows them to be unregistered as event listeners later.
            // First up is the load event, which represents a response being fully available.
            var /** @type {?} */ onLoad = function () {
                // Read response state from the memoized partial data.
                var _a = partialFromXhr(), headers = _a.headers, status = _a.status, statusText = _a.statusText, url = _a.url;
                // The body will be read out if present.
                var /** @type {?} */ body = null;
                if (status !== 204) {
                    // Use XMLHttpRequest.response if set, responseText otherwise.
                    body = (typeof xhr.response === 'undefined') ? xhr.responseText : xhr.response;
                }
                // Normalize another potential bug (this one comes from CORS).
                if (status === 0) {
                    status = !!body ? 200 : 0;
                }
                // ok determines whether the response will be transmitted on the event or
                // error channel. Unsuccessful status codes (not 2xx) will always be errors,
                // but a successful status code can still result in an error if the user
                // asked for JSON data and the body cannot be parsed as such.
                var /** @type {?} */ ok = status >= 200 && status < 300;
                // Check whether the body needs to be parsed as JSON (in many cases the browser
                // will have done that already).
                if (ok && req.responseType === 'json' && typeof body === 'string') {
                    // Attempt the parse. If it fails, a parse error should be delivered to the user.
                    body = body.replace(XSSI_PREFIX, '');
                    try {
                        body = JSON.parse(body);
                    }
                    catch (error) {
                        // Even though the response status was 2xx, this is still an error.
                        ok = false;
                        // The parse error contains the text of the body that failed to parse.
                        body = ({ error: error, text: body });
                    }
                }
                if (ok) {
                    // A successful response is delivered on the event stream.
                    observer.next(new HttpResponse({
                        body: body,
                        headers: headers,
                        status: status,
                        statusText: statusText,
                        url: url || undefined,
                    }));
                    // The full body has been received and delivered, no further events
                    // are possible. This request is complete.
                    observer.complete();
                }
                else {
                    // An unsuccessful request is delivered on the error channel.
                    observer.error(new HttpErrorResponse({
                        // The error in this case is the response body (error from the server).
                        error: body,
                        headers: headers,
                        status: status,
                        statusText: statusText,
                        url: url || undefined,
                    }));
                }
            };
            // The onError callback is called when something goes wrong at the network level.
            // Connection timeout, DNS error, offline, etc. These are actual errors, and are
            // transmitted on the error channel.
            var /** @type {?} */ onError = function (error) {
                var /** @type {?} */ res = new HttpErrorResponse({
                    error: error,
                    status: xhr.status || 0,
                    statusText: xhr.statusText || 'Unknown Error',
                });
                observer.error(res);
            };
            // The sentHeaders flag tracks whether the HttpResponseHeaders event
            // has been sent on the stream. This is necessary to track if progress
            // is enabled since the event will be sent on only the first download
            // progerss event.
            var /** @type {?} */ sentHeaders = false;
            // The download progress event handler, which is only registered if
            // progress events are enabled.
            var /** @type {?} */ onDownProgress = function (event) {
                // Send the HttpResponseHeaders event if it hasn't been sent already.
                if (!sentHeaders) {
                    observer.next(partialFromXhr());
                    sentHeaders = true;
                }
                // Start building the download progress event to deliver on the response
                // event stream.
                var /** @type {?} */ progressEvent = {
                    type: HttpEventType.DownloadProgress,
                    loaded: event.loaded,
                };
                // Set the total number of bytes in the event if it's available.
                if (event.lengthComputable) {
                    progressEvent.total = event.total;
                }
                // If the request was for text content and a partial response is
                // available on XMLHttpRequest, include it in the progress event
                // to allow for streaming reads.
                if (req.responseType === 'text' && !!xhr.responseText) {
                    progressEvent.partialText = xhr.responseText;
                }
                // Finally, fire the event.
                observer.next(progressEvent);
            };
            // The upload progress event handler, which is only registered if
            // progress events are enabled.
            var /** @type {?} */ onUpProgress = function (event) {
                // Upload progress events are simpler. Begin building the progress
                // event.
                var /** @type {?} */ progress = {
                    type: HttpEventType.UploadProgress,
                    loaded: event.loaded,
                };
                // If the total number of bytes being uploaded is available, include
                // it.
                if (event.lengthComputable) {
                    progress.total = event.total;
                }
                // Send the event.
                observer.next(progress);
            };
            // By default, register for load and error events.
            xhr.addEventListener('load', onLoad);
            xhr.addEventListener('error', onError);
            // Progress events are only enabled if requested.
            if (req.reportProgress) {
                // Download progress is always enabled if requested.
                xhr.addEventListener('progress', onDownProgress);
                // Upload progress depends on whether there is a body to upload.
                if (reqBody !== null && xhr.upload) {
                    xhr.upload.addEventListener('progress', onUpProgress);
                }
            }
            // Fire the request, and notify the event stream that it was fired.
            xhr.send(reqBody);
            observer.next({ type: HttpEventType.Sent });
            // This is the return from the Observable function, which is the
            // request cancellation handler.
            return function () {
                // On a cancellation, remove all registered event listeners.
                xhr.removeEventListener('error', onError);
                xhr.removeEventListener('load', onLoad);
                if (req.reportProgress) {
                    xhr.removeEventListener('progress', onDownProgress);
                    if (reqBody !== null && xhr.upload) {
                        xhr.upload.removeEventListener('progress', onUpProgress);
                    }
                }
                // Finally, abort the in-flight request.
                xhr.abort();
            };
        });
    };
    return HttpXhrBackend;
}());
HttpXhrBackend.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
HttpXhrBackend.ctorParameters = function () { return [
    { type: XhrFactory, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var XSRF_COOKIE_NAME = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* InjectionToken */]('XSRF_COOKIE_NAME');
var XSRF_HEADER_NAME = new __WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* InjectionToken */]('XSRF_HEADER_NAME');
/**
 * Retrieves the current XSRF token to use with the next outgoing request.
 *
 * \@experimental
 * @abstract
 */
var HttpXsrfTokenExtractor = (function () {
    function HttpXsrfTokenExtractor() {
    }
    /**
     * Get the XSRF token to use with an outgoing request.
     *
     * Will be called for every request, so the token may change between requests.
     * @abstract
     * @return {?}
     */
    HttpXsrfTokenExtractor.prototype.getToken = function () { };
    return HttpXsrfTokenExtractor;
}());
/**
 * `HttpXsrfTokenExtractor` which retrieves the token from a cookie.
 */
var HttpXsrfCookieExtractor = (function () {
    /**
     * @param {?} doc
     * @param {?} platform
     * @param {?} cookieName
     */
    function HttpXsrfCookieExtractor(doc, platform, cookieName) {
        this.doc = doc;
        this.platform = platform;
        this.cookieName = cookieName;
        this.lastCookieString = '';
        this.lastToken = null;
        /**
         * \@internal for testing
         */
        this.parseCount = 0;
    }
    /**
     * @return {?}
     */
    HttpXsrfCookieExtractor.prototype.getToken = function () {
        if (this.platform === 'server') {
            return null;
        }
        var /** @type {?} */ cookieString = this.doc.cookie || '';
        if (cookieString !== this.lastCookieString) {
            this.parseCount++;
            this.lastToken = Object(__WEBPACK_IMPORTED_MODULE_6__angular_common__["k" /* ɵparseCookieValue */])(cookieString, this.cookieName);
            this.lastCookieString = cookieString;
        }
        return this.lastToken;
    };
    return HttpXsrfCookieExtractor;
}());
HttpXsrfCookieExtractor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
HttpXsrfCookieExtractor.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_6__angular_common__["c" /* DOCUMENT */],] },] },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Inject */], args: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["V" /* PLATFORM_ID */],] },] },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Inject */], args: [XSRF_COOKIE_NAME,] },] },
]; };
/**
 * `HttpInterceptor` which adds an XSRF token to eligible outgoing requests.
 */
var HttpXsrfInterceptor = (function () {
    /**
     * @param {?} tokenService
     * @param {?} headerName
     */
    function HttpXsrfInterceptor(tokenService, headerName) {
        this.tokenService = tokenService;
        this.headerName = headerName;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    HttpXsrfInterceptor.prototype.intercept = function (req, next) {
        var /** @type {?} */ lcUrl = req.url.toLowerCase();
        // Skip both non-mutating requests and absolute URLs.
        // Non-mutating requests don't require a token, and absolute URLs require special handling
        // anyway as the cookie set
        // on our origin is not the same as the token expected by another origin.
        if (req.method === 'GET' || req.method === 'HEAD' || lcUrl.startsWith('http://') ||
            lcUrl.startsWith('https://')) {
            return next.handle(req);
        }
        var /** @type {?} */ token = this.tokenService.getToken();
        // Be careful not to overwrite an existing header of the same name.
        if (token !== null && !req.headers.has(this.headerName)) {
            req = req.clone({ headers: req.headers.set(this.headerName, token) });
        }
        return next.handle(req);
    };
    return HttpXsrfInterceptor;
}());
HttpXsrfInterceptor.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
HttpXsrfInterceptor.ctorParameters = function () { return [
    { type: HttpXsrfTokenExtractor, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Inject */], args: [XSRF_HEADER_NAME,] },] },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Constructs an `HttpHandler` that applies a bunch of `HttpInterceptor`s
 * to a request before passing it to the given `HttpBackend`.
 *
 * Meant to be used as a factory function within `HttpClientModule`.
 *
 * \@experimental
 * @param {?} backend
 * @param {?=} interceptors
 * @return {?}
 */
function interceptingHandler(backend, interceptors) {
    if (interceptors === void 0) { interceptors = []; }
    if (!interceptors) {
        return backend;
    }
    return interceptors.reduceRight(function (next, interceptor) { return new HttpInterceptorHandler(next, interceptor); }, backend);
}
/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 * \@experimental
 * @return {?}
 */
function jsonpCallbackContext() {
    if (typeof window === 'object') {
        return window;
    }
    return {};
}
/**
 * `NgModule` which adds XSRF protection support to outgoing requests.
 *
 * Provided the server supports a cookie-based XSRF protection system, this
 * module can be used directly to configure XSRF protection with the correct
 * cookie and header names.
 *
 * If no such names are provided, the default is to use `X-XSRF-TOKEN` for
 * the header name and `XSRF-TOKEN` for the cookie name.
 *
 * \@experimental
 */
var HttpClientXsrfModule = (function () {
    function HttpClientXsrfModule() {
    }
    /**
     * Disable the default XSRF protection.
     * @return {?}
     */
    HttpClientXsrfModule.disable = function () {
        return {
            ngModule: HttpClientXsrfModule,
            providers: [
                { provide: HttpXsrfInterceptor, useClass: NoopInterceptor },
            ],
        };
    };
    /**
     * Configure XSRF protection to use the given cookie name or header name,
     * or the default names (as described above) if not provided.
     * @param {?=} options
     * @return {?}
     */
    HttpClientXsrfModule.withOptions = function (options) {
        if (options === void 0) { options = {}; }
        return {
            ngModule: HttpClientXsrfModule,
            providers: [
                options.cookieName ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName } : [],
                options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : [],
            ],
        };
    };
    return HttpClientXsrfModule;
}());
HttpClientXsrfModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */], args: [{
                providers: [
                    HttpXsrfInterceptor,
                    { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
                    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
                    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
                    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
                ],
            },] },
];
/**
 * @nocollapse
 */
HttpClientXsrfModule.ctorParameters = function () { return []; };
/**
 * `NgModule` which provides the `HttpClient` and associated services.
 *
 * Interceptors can be added to the chain behind `HttpClient` by binding them
 * to the multiprovider for `HTTP_INTERCEPTORS`.
 *
 * \@experimental
 */
var HttpClientModule = (function () {
    function HttpClientModule() {
    }
    return HttpClientModule;
}());
HttpClientModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */], args: [{
                imports: [
                    HttpClientXsrfModule.withOptions({
                        cookieName: 'XSRF-TOKEN',
                        headerName: 'X-XSRF-TOKEN',
                    }),
                ],
                providers: [
                    HttpClient,
                    // HttpHandler is the backend + interceptors and is constructed
                    // using the interceptingHandler factory function.
                    {
                        provide: HttpHandler,
                        useFactory: interceptingHandler,
                        deps: [HttpBackend, [new __WEBPACK_IMPORTED_MODULE_1__angular_core__["S" /* Optional */](), new __WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Inject */](HTTP_INTERCEPTORS)]],
                    },
                    HttpXhrBackend,
                    { provide: HttpBackend, useExisting: HttpXhrBackend },
                    BrowserXhr,
                    { provide: XhrFactory, useExisting: BrowserXhr },
                ],
            },] },
];
/**
 * @nocollapse
 */
HttpClientModule.ctorParameters = function () { return []; };
/**
 * `NgModule` which enables JSONP support in `HttpClient`.
 *
 * Without this module, Jsonp requests will reach the backend
 * with method JSONP, where they'll be rejected.
 *
 * \@experimental
 */
var HttpClientJsonpModule = (function () {
    function HttpClientJsonpModule() {
    }
    return HttpClientJsonpModule;
}());
HttpClientJsonpModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */], args: [{
                providers: [
                    JsonpClientBackend,
                    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
                    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
                ],
            },] },
];
/**
 * @nocollapse
 */
HttpClientJsonpModule.ctorParameters = function () { return []; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=http.es5.js.map


/***/ }),

/***/ "./node_modules/@angular/router/@angular/router.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RouterLink */
/* unused harmony export RouterLinkWithHref */
/* unused harmony export RouterLinkActive */
/* unused harmony export RouterOutlet */
/* unused harmony export GuardsCheckEnd */
/* unused harmony export GuardsCheckStart */
/* unused harmony export NavigationCancel */
/* unused harmony export NavigationEnd */
/* unused harmony export NavigationError */
/* unused harmony export NavigationStart */
/* unused harmony export ResolveEnd */
/* unused harmony export ResolveStart */
/* unused harmony export RouteConfigLoadEnd */
/* unused harmony export RouteConfigLoadStart */
/* unused harmony export RoutesRecognized */
/* unused harmony export RouteReuseStrategy */
/* unused harmony export Router */
/* unused harmony export ROUTES */
/* unused harmony export ROUTER_CONFIGURATION */
/* unused harmony export ROUTER_INITIALIZER */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RouterModule; });
/* unused harmony export provideRoutes */
/* unused harmony export ChildrenOutletContexts */
/* unused harmony export OutletContext */
/* unused harmony export NoPreloading */
/* unused harmony export PreloadAllModules */
/* unused harmony export PreloadingStrategy */
/* unused harmony export RouterPreloader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActivatedRoute; });
/* unused harmony export ActivatedRouteSnapshot */
/* unused harmony export RouterState */
/* unused harmony export RouterStateSnapshot */
/* unused harmony export PRIMARY_OUTLET */
/* unused harmony export convertToParamMap */
/* unused harmony export UrlHandlingStrategy */
/* unused harmony export DefaultUrlSerializer */
/* unused harmony export UrlSegment */
/* unused harmony export UrlSegmentGroup */
/* unused harmony export UrlSerializer */
/* unused harmony export UrlTree */
/* unused harmony export VERSION */
/* unused harmony export ɵROUTER_PROVIDERS */
/* unused harmony export ɵflatten */
/* unused harmony export ɵa */
/* unused harmony export ɵg */
/* unused harmony export ɵh */
/* unused harmony export ɵi */
/* unused harmony export ɵd */
/* unused harmony export ɵc */
/* unused harmony export ɵj */
/* unused harmony export ɵf */
/* unused harmony export ɵb */
/* unused harmony export ɵe */
/* unused harmony export ɵk */
/* unused harmony export ɵl */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__("./node_modules/tslib/tslib.es6.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__ = __webpack_require__("./node_modules/rxjs/observable/from.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__ = __webpack_require__("./node_modules/rxjs/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_concatMap__ = __webpack_require__("./node_modules/rxjs/operator/concatMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_every__ = __webpack_require__("./node_modules/rxjs/operator/every.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_every___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_operator_every__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operator_first__ = __webpack_require__("./node_modules/rxjs/operator/first.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_operator_first__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_operator_last__ = __webpack_require__("./node_modules/rxjs/operator/last.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_operator_last___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_operator_last__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__ = __webpack_require__("./node_modules/rxjs/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__ = __webpack_require__("./node_modules/rxjs/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_operator_reduce__ = __webpack_require__("./node_modules/rxjs/operator/reduce.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_operator_reduce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_operator_reduce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_operator_catch__ = __webpack_require__("./node_modules/rxjs/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_rxjs_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_operator_concatAll__ = __webpack_require__("./node_modules/rxjs/operator/concatAll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_rxjs_operator_concatAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_rxjs_operator_concatAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_util_EmptyError__ = __webpack_require__("./node_modules/rxjs/util/EmptyError.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_rxjs_util_EmptyError___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17_rxjs_util_EmptyError__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_observable_fromPromise__ = __webpack_require__("./node_modules/rxjs/observable/fromPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_rxjs_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_rxjs_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_rxjs_operator_mergeAll__ = __webpack_require__("./node_modules/rxjs/operator/mergeAll.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_rxjs_operator_mergeAll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_rxjs_operator_mergeAll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_rxjs_operator_filter__ = __webpack_require__("./node_modules/rxjs/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_rxjs_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_rxjs_operator_filter__);

/**
 * @license Angular v4.4.5
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */





















/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Represents an event triggered when a navigation starts.
 *
 * \@stable
 */
var NavigationStart = (function () {
    /**
     * @param {?} id
     * @param {?} url
     */
    function NavigationStart(id, url) {
        this.id = id;
        this.url = url;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    NavigationStart.prototype.toString = function () { return "NavigationStart(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationStart;
}());
/**
 * \@whatItDoes Represents an event triggered when a navigation ends successfully.
 *
 * \@stable
 */
var NavigationEnd = (function () {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     */
    function NavigationEnd(id, url, urlAfterRedirects) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    NavigationEnd.prototype.toString = function () {
        return "NavigationEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "')";
    };
    return NavigationEnd;
}());
/**
 * \@whatItDoes Represents an event triggered when a navigation is canceled.
 *
 * \@stable
 */
var NavigationCancel = (function () {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} reason
     */
    function NavigationCancel(id, url, reason) {
        this.id = id;
        this.url = url;
        this.reason = reason;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    NavigationCancel.prototype.toString = function () { return "NavigationCancel(id: " + this.id + ", url: '" + this.url + "')"; };
    return NavigationCancel;
}());
/**
 * \@whatItDoes Represents an event triggered when a navigation fails due to an unexpected error.
 *
 * \@stable
 */
var NavigationError = (function () {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} error
     */
    function NavigationError(id, url, error) {
        this.id = id;
        this.url = url;
        this.error = error;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    NavigationError.prototype.toString = function () {
        return "NavigationError(id: " + this.id + ", url: '" + this.url + "', error: " + this.error + ")";
    };
    return NavigationError;
}());
/**
 * \@whatItDoes Represents an event triggered when routes are recognized.
 *
 * \@stable
 */
var RoutesRecognized = (function () {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     */
    function RoutesRecognized(id, url, urlAfterRedirects, state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /**
     * \@docsNotRequired
     * @return {?}
     */
    RoutesRecognized.prototype.toString = function () {
        return "RoutesRecognized(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
    };
    return RoutesRecognized;
}());
/**
 * \@whatItDoes Represents an event triggered before lazy loading a route config.
 *
 * \@experimental
 */
var RouteConfigLoadStart = (function () {
    /**
     * @param {?} route
     */
    function RouteConfigLoadStart(route) {
        this.route = route;
    }
    /**
     * @return {?}
     */
    RouteConfigLoadStart.prototype.toString = function () { return "RouteConfigLoadStart(path: " + this.route.path + ")"; };
    return RouteConfigLoadStart;
}());
/**
 * \@whatItDoes Represents an event triggered when a route has been lazy loaded.
 *
 * \@experimental
 */
var RouteConfigLoadEnd = (function () {
    /**
     * @param {?} route
     */
    function RouteConfigLoadEnd(route) {
        this.route = route;
    }
    /**
     * @return {?}
     */
    RouteConfigLoadEnd.prototype.toString = function () { return "RouteConfigLoadEnd(path: " + this.route.path + ")"; };
    return RouteConfigLoadEnd;
}());
/**
 * \@whatItDoes Represents the start of the Guard phase of routing.
 *
 * \@experimental
 */
var GuardsCheckStart = (function () {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     */
    function GuardsCheckStart(id, url, urlAfterRedirects, state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /**
     * @return {?}
     */
    GuardsCheckStart.prototype.toString = function () {
        return "GuardsCheckStart(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
    };
    return GuardsCheckStart;
}());
/**
 * \@whatItDoes Represents the end of the Guard phase of routing.
 *
 * \@experimental
 */
var GuardsCheckEnd = (function () {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     * @param {?} shouldActivate
     */
    function GuardsCheckEnd(id, url, urlAfterRedirects, state, shouldActivate) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
        this.shouldActivate = shouldActivate;
    }
    /**
     * @return {?}
     */
    GuardsCheckEnd.prototype.toString = function () {
        return "GuardsCheckEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ", shouldActivate: " + this.shouldActivate + ")";
    };
    return GuardsCheckEnd;
}());
/**
 * \@whatItDoes Represents the start of the Resolve phase of routing. The timing of this
 * event may change, thus it's experimental. In the current iteration it will run
 * in the "resolve" phase whether there's things to resolve or not. In the future this
 * behavior may change to only run when there are things to be resolved.
 *
 * \@experimental
 */
var ResolveStart = (function () {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     */
    function ResolveStart(id, url, urlAfterRedirects, state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /**
     * @return {?}
     */
    ResolveStart.prototype.toString = function () {
        return "ResolveStart(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
    };
    return ResolveStart;
}());
/**
 * \@whatItDoes Represents the end of the Resolve phase of routing. See note on
 * {\@link ResolveStart} for use of this experimental API.
 *
 * \@experimental
 */
var ResolveEnd = (function () {
    /**
     * @param {?} id
     * @param {?} url
     * @param {?} urlAfterRedirects
     * @param {?} state
     */
    function ResolveEnd(id, url, urlAfterRedirects, state) {
        this.id = id;
        this.url = url;
        this.urlAfterRedirects = urlAfterRedirects;
        this.state = state;
    }
    /**
     * @return {?}
     */
    ResolveEnd.prototype.toString = function () {
        return "ResolveEnd(id: " + this.id + ", url: '" + this.url + "', urlAfterRedirects: '" + this.urlAfterRedirects + "', state: " + this.state + ")";
    };
    return ResolveEnd;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Name of the primary outlet.
 *
 * \@stable
 */
var PRIMARY_OUTLET = 'primary';
var ParamsAsMap = (function () {
    /**
     * @param {?} params
     */
    function ParamsAsMap(params) {
        this.params = params || {};
    }
    /**
     * @param {?} name
     * @return {?}
     */
    ParamsAsMap.prototype.has = function (name) { return this.params.hasOwnProperty(name); };
    /**
     * @param {?} name
     * @return {?}
     */
    ParamsAsMap.prototype.get = function (name) {
        if (this.has(name)) {
            var /** @type {?} */ v = this.params[name];
            return Array.isArray(v) ? v[0] : v;
        }
        return null;
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ParamsAsMap.prototype.getAll = function (name) {
        if (this.has(name)) {
            var /** @type {?} */ v = this.params[name];
            return Array.isArray(v) ? v : [v];
        }
        return [];
    };
    Object.defineProperty(ParamsAsMap.prototype, "keys", {
        /**
         * @return {?}
         */
        get: function () { return Object.keys(this.params); },
        enumerable: true,
        configurable: true
    });
    return ParamsAsMap;
}());
/**
 * Convert a {\@link Params} instance to a {\@link ParamMap}.
 *
 * \@stable
 * @param {?} params
 * @return {?}
 */
function convertToParamMap(params) {
    return new ParamsAsMap(params);
}
var NAVIGATION_CANCELING_ERROR = 'ngNavigationCancelingError';
/**
 * @param {?} message
 * @return {?}
 */
function navigationCancelingError(message) {
    var /** @type {?} */ error = Error('NavigationCancelingError: ' + message);
    ((error))[NAVIGATION_CANCELING_ERROR] = true;
    return error;
}
/**
 * @param {?} error
 * @return {?}
 */
function isNavigationCancelingError(error) {
    return ((error))[NAVIGATION_CANCELING_ERROR];
}
/**
 * @param {?} segments
 * @param {?} segmentGroup
 * @param {?} route
 * @return {?}
 */
function defaultUrlMatcher(segments, segmentGroup, route) {
    var /** @type {?} */ parts = ((route.path)).split('/');
    if (parts.length > segments.length) {
        // The actual URL is shorter than the config, no match
        return null;
    }
    if (route.pathMatch === 'full' &&
        (segmentGroup.hasChildren() || parts.length < segments.length)) {
        // The config is longer than the actual URL but we are looking for a full match, return null
        return null;
    }
    var /** @type {?} */ posParams = {};
    // Check each config part against the actual URL
    for (var /** @type {?} */ index = 0; index < parts.length; index++) {
        var /** @type {?} */ part = parts[index];
        var /** @type {?} */ segment = segments[index];
        var /** @type {?} */ isParameter = part.startsWith(':');
        if (isParameter) {
            posParams[part.substring(1)] = segment;
        }
        else if (part !== segment.path) {
            // The actual URL part does not match the config, no match
            return null;
        }
    }
    return { consumed: segments.slice(0, parts.length), posParams: posParams };
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var LoadedRouterConfig = (function () {
    /**
     * @param {?} routes
     * @param {?} module
     */
    function LoadedRouterConfig(routes, module) {
        this.routes = routes;
        this.module = module;
    }
    return LoadedRouterConfig;
}());
/**
 * @param {?} config
 * @param {?=} parentPath
 * @return {?}
 */
function validateConfig(config, parentPath) {
    if (parentPath === void 0) { parentPath = ''; }
    // forEach doesn't iterate undefined values
    for (var /** @type {?} */ i = 0; i < config.length; i++) {
        var /** @type {?} */ route = config[i];
        var /** @type {?} */ fullPath = getFullPath(parentPath, route);
        validateNode(route, fullPath);
    }
}
/**
 * @param {?} route
 * @param {?} fullPath
 * @return {?}
 */
function validateNode(route, fullPath) {
    if (!route) {
        throw new Error("\n      Invalid configuration of route '" + fullPath + "': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    ");
    }
    if (Array.isArray(route)) {
        throw new Error("Invalid configuration of route '" + fullPath + "': Array cannot be specified");
    }
    if (!route.component && (route.outlet && route.outlet !== PRIMARY_OUTLET)) {
        throw new Error("Invalid configuration of route '" + fullPath + "': a componentless route cannot have a named outlet set");
    }
    if (route.redirectTo && route.children) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and children cannot be used together");
    }
    if (route.redirectTo && route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and loadChildren cannot be used together");
    }
    if (route.children && route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "': children and loadChildren cannot be used together");
    }
    if (route.redirectTo && route.component) {
        throw new Error("Invalid configuration of route '" + fullPath + "': redirectTo and component cannot be used together");
    }
    if (route.path && route.matcher) {
        throw new Error("Invalid configuration of route '" + fullPath + "': path and matcher cannot be used together");
    }
    if (route.redirectTo === void 0 && !route.component && !route.children && !route.loadChildren) {
        throw new Error("Invalid configuration of route '" + fullPath + "'. One of the following must be provided: component, redirectTo, children or loadChildren");
    }
    if (route.path === void 0 && route.matcher === void 0) {
        throw new Error("Invalid configuration of route '" + fullPath + "': routes must have either a path or a matcher specified");
    }
    if (typeof route.path === 'string' && route.path.charAt(0) === '/') {
        throw new Error("Invalid configuration of route '" + fullPath + "': path cannot start with a slash");
    }
    if (route.path === '' && route.redirectTo !== void 0 && route.pathMatch === void 0) {
        var /** @type {?} */ exp = "The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.";
        throw new Error("Invalid configuration of route '{path: \"" + fullPath + "\", redirectTo: \"" + route.redirectTo + "\"}': please provide 'pathMatch'. " + exp);
    }
    if (route.pathMatch !== void 0 && route.pathMatch !== 'full' && route.pathMatch !== 'prefix') {
        throw new Error("Invalid configuration of route '" + fullPath + "': pathMatch can only be set to 'prefix' or 'full'");
    }
    if (route.children) {
        validateConfig(route.children, fullPath);
    }
}
/**
 * @param {?} parentPath
 * @param {?} currentRoute
 * @return {?}
 */
function getFullPath(parentPath, currentRoute) {
    if (!currentRoute) {
        return parentPath;
    }
    if (!parentPath && !currentRoute.path) {
        return '';
    }
    else if (parentPath && !currentRoute.path) {
        return parentPath + "/";
    }
    else if (!parentPath && currentRoute.path) {
        return currentRoute.path;
    }
    else {
        return parentPath + "/" + currentRoute.path;
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function shallowEqualArrays(a, b) {
    if (a.length !== b.length)
        return false;
    for (var /** @type {?} */ i = 0; i < a.length; ++i) {
        if (!shallowEqual(a[i], b[i]))
            return false;
    }
    return true;
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function shallowEqual(a, b) {
    var /** @type {?} */ k1 = Object.keys(a);
    var /** @type {?} */ k2 = Object.keys(b);
    if (k1.length != k2.length) {
        return false;
    }
    var /** @type {?} */ key;
    for (var /** @type {?} */ i = 0; i < k1.length; i++) {
        key = k1[i];
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
/**
 * @template T
 * @param {?} arr
 * @return {?}
 */
function flatten(arr) {
    return Array.prototype.concat.apply([], arr);
}
/**
 * @template T
 * @param {?} a
 * @return {?}
 */
function last$1(a) {
    return a.length > 0 ? a[a.length - 1] : null;
}
/**
 * @param {?} bools
 * @return {?}
 */
/**
 * @template K, V
 * @param {?} map
 * @param {?} callback
 * @return {?}
 */
function forEach(map$$1, callback) {
    for (var /** @type {?} */ prop in map$$1) {
        if (map$$1.hasOwnProperty(prop)) {
            callback(map$$1[prop], prop);
        }
    }
}
/**
 * @template A, B
 * @param {?} obj
 * @param {?} fn
 * @return {?}
 */
function waitForMap(obj, fn) {
    if (Object.keys(obj).length === 0) {
        return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])({});
    }
    var /** @type {?} */ waitHead = [];
    var /** @type {?} */ waitTail = [];
    var /** @type {?} */ res = {};
    forEach(obj, function (a, k) {
        var /** @type {?} */ mapped = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(fn(k, a), function (r) { return res[k] = r; });
        if (k === PRIMARY_OUTLET) {
            waitHead.push(mapped);
        }
        else {
            waitTail.push(mapped);
        }
    });
    var /** @type {?} */ concat$ = __WEBPACK_IMPORTED_MODULE_16_rxjs_operator_concatAll__["concatAll"].call(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"].apply(void 0, waitHead.concat(waitTail)));
    var /** @type {?} */ last$ = __WEBPACK_IMPORTED_MODULE_10_rxjs_operator_last__["last"].call(concat$);
    return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(last$, function () { return res; });
}
/**
 * @param {?} observables
 * @return {?}
 */
function andObservables(observables) {
    var /** @type {?} */ merged$ = __WEBPACK_IMPORTED_MODULE_19_rxjs_operator_mergeAll__["mergeAll"].call(observables);
    return __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_every__["every"].call(merged$, function (result) { return result === true; });
}
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
function wrapIntoObservable(value) {
    if (Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_53" /* ɵisObservable */])(value)) {
        return value;
    }
    if (Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_54" /* ɵisPromise */])(value)) {
        // Use `Promise.resolve()` to wrap promise-like instances.
        // Required ie when a Resolver returns a AngularJS `$q` promise to correctly trigger the
        // change detection.
        return Object(__WEBPACK_IMPORTED_MODULE_18_rxjs_observable_fromPromise__["fromPromise"])(Promise.resolve(value));
    }
    return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(/** @type {?} */ (value));
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @return {?}
 */
function createEmptyUrlTree() {
    return new UrlTree(new UrlSegmentGroup([], {}), {}, null);
}
/**
 * @param {?} container
 * @param {?} containee
 * @param {?} exact
 * @return {?}
 */
function containsTree(container, containee, exact) {
    if (exact) {
        return equalQueryParams(container.queryParams, containee.queryParams) &&
            equalSegmentGroups(container.root, containee.root);
    }
    return containsQueryParams(container.queryParams, containee.queryParams) &&
        containsSegmentGroup(container.root, containee.root);
}
/**
 * @param {?} container
 * @param {?} containee
 * @return {?}
 */
function equalQueryParams(container, containee) {
    return shallowEqual(container, containee);
}
/**
 * @param {?} container
 * @param {?} containee
 * @return {?}
 */
function equalSegmentGroups(container, containee) {
    if (!equalPath(container.segments, containee.segments))
        return false;
    if (container.numberOfChildren !== containee.numberOfChildren)
        return false;
    for (var /** @type {?} */ c in containee.children) {
        if (!container.children[c])
            return false;
        if (!equalSegmentGroups(container.children[c], containee.children[c]))
            return false;
    }
    return true;
}
/**
 * @param {?} container
 * @param {?} containee
 * @return {?}
 */
function containsQueryParams(container, containee) {
    return Object.keys(containee).length <= Object.keys(container).length &&
        Object.keys(containee).every(function (key) { return containee[key] === container[key]; });
}
/**
 * @param {?} container
 * @param {?} containee
 * @return {?}
 */
function containsSegmentGroup(container, containee) {
    return containsSegmentGroupHelper(container, containee, containee.segments);
}
/**
 * @param {?} container
 * @param {?} containee
 * @param {?} containeePaths
 * @return {?}
 */
function containsSegmentGroupHelper(container, containee, containeePaths) {
    if (container.segments.length > containeePaths.length) {
        var /** @type {?} */ current = container.segments.slice(0, containeePaths.length);
        if (!equalPath(current, containeePaths))
            return false;
        if (containee.hasChildren())
            return false;
        return true;
    }
    else if (container.segments.length === containeePaths.length) {
        if (!equalPath(container.segments, containeePaths))
            return false;
        for (var /** @type {?} */ c in containee.children) {
            if (!container.children[c])
                return false;
            if (!containsSegmentGroup(container.children[c], containee.children[c]))
                return false;
        }
        return true;
    }
    else {
        var /** @type {?} */ current = containeePaths.slice(0, container.segments.length);
        var /** @type {?} */ next = containeePaths.slice(container.segments.length);
        if (!equalPath(container.segments, current))
            return false;
        if (!container.children[PRIMARY_OUTLET])
            return false;
        return containsSegmentGroupHelper(container.children[PRIMARY_OUTLET], containee, next);
    }
}
/**
 * \@whatItDoes Represents the parsed URL.
 *
 * \@howToUse
 *
 * ```
 * \@Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const tree: UrlTree =
 *       router.parseUrl('/team/33/(user/victor//support:help)?debug=true#fragment');
 *     const f = tree.fragment; // return 'fragment'
 *     const q = tree.queryParams; // returns {debug: 'true'}
 *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
 *     const s: UrlSegment[] = g.segments; // returns 2 segments 'team' and '33'
 *     g.children[PRIMARY_OUTLET].segments; // returns 2 segments 'user' and 'victor'
 *     g.children['support'].segments; // return 1 segment 'help'
 *   }
 * }
 * ```
 *
 * \@description
 *
 * Since a router state is a tree, and the URL is nothing but a serialized state, the URL is a
 * serialized tree.
 * UrlTree is a data structure that provides a lot of affordances in dealing with URLs
 *
 * \@stable
 */
var UrlTree = (function () {
    /**
     * \@internal
     * @param {?} root
     * @param {?} queryParams
     * @param {?} fragment
     */
    function UrlTree(root, queryParams, fragment) {
        this.root = root;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    Object.defineProperty(UrlTree.prototype, "queryParamMap", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._queryParamMap) {
                this._queryParamMap = convertToParamMap(this.queryParams);
            }
            return this._queryParamMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * \@docsNotRequired
     * @return {?}
     */
    UrlTree.prototype.toString = function () { return DEFAULT_SERIALIZER.serialize(this); };
    return UrlTree;
}());
/**
 * \@whatItDoes Represents the parsed URL segment group.
 *
 * See {\@link UrlTree} for more information.
 *
 * \@stable
 */
var UrlSegmentGroup = (function () {
    /**
     * @param {?} segments
     * @param {?} children
     */
    function UrlSegmentGroup(segments, children) {
        var _this = this;
        this.segments = segments;
        this.children = children;
        /**
         * The parent node in the url tree
         */
        this.parent = null;
        forEach(children, function (v, k) { return v.parent = _this; });
    }
    /**
     * Whether the segment has child segments
     * @return {?}
     */
    UrlSegmentGroup.prototype.hasChildren = function () { return this.numberOfChildren > 0; };
    Object.defineProperty(UrlSegmentGroup.prototype, "numberOfChildren", {
        /**
         * Number of child segments
         * @return {?}
         */
        get: function () { return Object.keys(this.children).length; },
        enumerable: true,
        configurable: true
    });
    /**
     * \@docsNotRequired
     * @return {?}
     */
    UrlSegmentGroup.prototype.toString = function () { return serializePaths(this); };
    return UrlSegmentGroup;
}());
/**
 * \@whatItDoes Represents a single URL segment.
 *
 * \@howToUse
 *
 * ```
 * \@Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const tree: UrlTree = router.parseUrl('/team;id=33');
 *     const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
 *     const s: UrlSegment[] = g.segments;
 *     s[0].path; // returns 'team'
 *     s[0].parameters; // returns {id: 33}
 *   }
 * }
 * ```
 *
 * \@description
 *
 * A UrlSegment is a part of a URL between the two slashes. It contains a path and the matrix
 * parameters associated with the segment.
 *
 * \@stable
 */
var UrlSegment = (function () {
    /**
     * @param {?} path
     * @param {?} parameters
     */
    function UrlSegment(path, parameters) {
        this.path = path;
        this.parameters = parameters;
    }
    Object.defineProperty(UrlSegment.prototype, "parameterMap", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._parameterMap) {
                this._parameterMap = convertToParamMap(this.parameters);
            }
            return this._parameterMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * \@docsNotRequired
     * @return {?}
     */
    UrlSegment.prototype.toString = function () { return serializePath(this); };
    return UrlSegment;
}());
/**
 * @param {?} as
 * @param {?} bs
 * @return {?}
 */
function equalSegments(as, bs) {
    return equalPath(as, bs) && as.every(function (a, i) { return shallowEqual(a.parameters, bs[i].parameters); });
}
/**
 * @param {?} as
 * @param {?} bs
 * @return {?}
 */
function equalPath(as, bs) {
    if (as.length !== bs.length)
        return false;
    return as.every(function (a, i) { return a.path === bs[i].path; });
}
/**
 * @template T
 * @param {?} segment
 * @param {?} fn
 * @return {?}
 */
function mapChildrenIntoArray(segment, fn) {
    var /** @type {?} */ res = [];
    forEach(segment.children, function (child, childOutlet) {
        if (childOutlet === PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    forEach(segment.children, function (child, childOutlet) {
        if (childOutlet !== PRIMARY_OUTLET) {
            res = res.concat(fn(child, childOutlet));
        }
    });
    return res;
}
/**
 * \@whatItDoes Serializes and deserializes a URL string into a URL tree.
 *
 * \@description The url serialization strategy is customizable. You can
 * make all URLs case insensitive by providing a custom UrlSerializer.
 *
 * See {\@link DefaultUrlSerializer} for an example of a URL serializer.
 *
 * \@stable
 * @abstract
 */
var UrlSerializer = (function () {
    function UrlSerializer() {
    }
    /**
     * Parse a url into a {\@link UrlTree}
     * @abstract
     * @param {?} url
     * @return {?}
     */
    UrlSerializer.prototype.parse = function (url) { };
    /**
     * Converts a {\@link UrlTree} into a url
     * @abstract
     * @param {?} tree
     * @return {?}
     */
    UrlSerializer.prototype.serialize = function (tree) { };
    return UrlSerializer;
}());
/**
 * \@whatItDoes A default implementation of the {\@link UrlSerializer}.
 *
 * \@description
 *
 * Example URLs:
 *
 * ```
 * /inbox/33(popup:compose)
 * /inbox/33;open=true/messages/44
 * ```
 *
 * DefaultUrlSerializer uses parentheses to serialize secondary segments (e.g., popup:compose), the
 * colon syntax to specify the outlet, and the ';parameter=value' syntax (e.g., open=true) to
 * specify route specific parameters.
 *
 * \@stable
 */
var DefaultUrlSerializer = (function () {
    function DefaultUrlSerializer() {
    }
    /**
     * Parses a url into a {\@link UrlTree}
     * @param {?} url
     * @return {?}
     */
    DefaultUrlSerializer.prototype.parse = function (url) {
        var /** @type {?} */ p = new UrlParser(url);
        return new UrlTree(p.parseRootSegment(), p.parseQueryParams(), p.parseFragment());
    };
    /**
     * Converts a {\@link UrlTree} into a url
     * @param {?} tree
     * @return {?}
     */
    DefaultUrlSerializer.prototype.serialize = function (tree) {
        var /** @type {?} */ segment = "/" + serializeSegment(tree.root, true);
        var /** @type {?} */ query = serializeQueryParams(tree.queryParams);
        var /** @type {?} */ fragment = typeof tree.fragment === "string" ? "#" + encodeURI(/** @type {?} */ ((tree.fragment))) : '';
        return "" + segment + query + fragment;
    };
    return DefaultUrlSerializer;
}());
var DEFAULT_SERIALIZER = new DefaultUrlSerializer();
/**
 * @param {?} segment
 * @return {?}
 */
function serializePaths(segment) {
    return segment.segments.map(function (p) { return serializePath(p); }).join('/');
}
/**
 * @param {?} segment
 * @param {?} root
 * @return {?}
 */
function serializeSegment(segment, root) {
    if (!segment.hasChildren()) {
        return serializePaths(segment);
    }
    if (root) {
        var /** @type {?} */ primary = segment.children[PRIMARY_OUTLET] ?
            serializeSegment(segment.children[PRIMARY_OUTLET], false) :
            '';
        var /** @type {?} */ children_1 = [];
        forEach(segment.children, function (v, k) {
            if (k !== PRIMARY_OUTLET) {
                children_1.push(k + ":" + serializeSegment(v, false));
            }
        });
        return children_1.length > 0 ? primary + "(" + children_1.join('//') + ")" : primary;
    }
    else {
        var /** @type {?} */ children = mapChildrenIntoArray(segment, function (v, k) {
            if (k === PRIMARY_OUTLET) {
                return [serializeSegment(segment.children[PRIMARY_OUTLET], false)];
            }
            return [k + ":" + serializeSegment(v, false)];
        });
        return serializePaths(segment) + "/(" + children.join('//') + ")";
    }
}
/**
 * This method is intended for encoding *key* or *value* parts of query component. We need a custom
 * method because encodeURIComponent is too aggressive and encodes stuff that doesn't have to be
 * encoded per http://tools.ietf.org/html/rfc3986:
 *    query         = *( pchar / "/" / "?" )
 *    pchar         = unreserved / pct-encoded / sub-delims / ":" / "\@"
 *    unreserved    = ALPHA / DIGIT / "-" / "." / "_" / "~"
 *    pct-encoded   = "%" HEXDIG HEXDIG
 *    sub-delims    = "!" / "$" / "&" / "'" / "(" / ")"
 *                     / "*" / "+" / "," / ";" / "="
 * @param {?} s
 * @return {?}
 */
function encode(s) {
    return encodeURIComponent(s)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%3B/gi, ';');
}
/**
 * @param {?} s
 * @return {?}
 */
function decode(s) {
    return decodeURIComponent(s);
}
/**
 * @param {?} path
 * @return {?}
 */
function serializePath(path) {
    return "" + encode(path.path) + serializeParams(path.parameters);
}
/**
 * @param {?} params
 * @return {?}
 */
function serializeParams(params) {
    return Object.keys(params).map(function (key) { return ";" + encode(key) + "=" + encode(params[key]); }).join('');
}
/**
 * @param {?} params
 * @return {?}
 */
function serializeQueryParams(params) {
    var /** @type {?} */ strParams = Object.keys(params).map(function (name) {
        var /** @type {?} */ value = params[name];
        return Array.isArray(value) ? value.map(function (v) { return encode(name) + "=" + encode(v); }).join('&') :
            encode(name) + "=" + encode(value);
    });
    return strParams.length ? "?" + strParams.join("&") : '';
}
var SEGMENT_RE = /^[^\/()?;=&#]+/;
/**
 * @param {?} str
 * @return {?}
 */
function matchSegments(str) {
    var /** @type {?} */ match = str.match(SEGMENT_RE);
    return match ? match[0] : '';
}
var QUERY_PARAM_RE = /^[^=?&#]+/;
/**
 * @param {?} str
 * @return {?}
 */
function matchQueryParams(str) {
    var /** @type {?} */ match = str.match(QUERY_PARAM_RE);
    return match ? match[0] : '';
}
var QUERY_PARAM_VALUE_RE = /^[^?&#]+/;
/**
 * @param {?} str
 * @return {?}
 */
function matchUrlQueryParamValue(str) {
    var /** @type {?} */ match = str.match(QUERY_PARAM_VALUE_RE);
    return match ? match[0] : '';
}
var UrlParser = (function () {
    /**
     * @param {?} url
     */
    function UrlParser(url) {
        this.url = url;
        this.remaining = url;
    }
    /**
     * @return {?}
     */
    UrlParser.prototype.parseRootSegment = function () {
        this.consumeOptional('/');
        if (this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')) {
            return new UrlSegmentGroup([], {});
        }
        // The root segment group never has segments
        return new UrlSegmentGroup([], this.parseChildren());
    };
    /**
     * @return {?}
     */
    UrlParser.prototype.parseQueryParams = function () {
        var /** @type {?} */ params = {};
        if (this.consumeOptional('?')) {
            do {
                this.parseQueryParam(params);
            } while (this.consumeOptional('&'));
        }
        return params;
    };
    /**
     * @return {?}
     */
    UrlParser.prototype.parseFragment = function () {
        return this.consumeOptional('#') ? decodeURI(this.remaining) : null;
    };
    /**
     * @return {?}
     */
    UrlParser.prototype.parseChildren = function () {
        if (this.remaining === '') {
            return {};
        }
        this.consumeOptional('/');
        var /** @type {?} */ segments = [];
        if (!this.peekStartsWith('(')) {
            segments.push(this.parseSegment());
        }
        while (this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(')) {
            this.capture('/');
            segments.push(this.parseSegment());
        }
        var /** @type {?} */ children = {};
        if (this.peekStartsWith('/(')) {
            this.capture('/');
            children = this.parseParens(true);
        }
        var /** @type {?} */ res = {};
        if (this.peekStartsWith('(')) {
            res = this.parseParens(false);
        }
        if (segments.length > 0 || Object.keys(children).length > 0) {
            res[PRIMARY_OUTLET] = new UrlSegmentGroup(segments, children);
        }
        return res;
    };
    /**
     * @return {?}
     */
    UrlParser.prototype.parseSegment = function () {
        var /** @type {?} */ path = matchSegments(this.remaining);
        if (path === '' && this.peekStartsWith(';')) {
            throw new Error("Empty path url segment cannot have parameters: '" + this.remaining + "'.");
        }
        this.capture(path);
        return new UrlSegment(decode(path), this.parseMatrixParams());
    };
    /**
     * @return {?}
     */
    UrlParser.prototype.parseMatrixParams = function () {
        var /** @type {?} */ params = {};
        while (this.consumeOptional(';')) {
            this.parseParam(params);
        }
        return params;
    };
    /**
     * @param {?} params
     * @return {?}
     */
    UrlParser.prototype.parseParam = function (params) {
        var /** @type {?} */ key = matchSegments(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var /** @type {?} */ value = '';
        if (this.consumeOptional('=')) {
            var /** @type {?} */ valueMatch = matchSegments(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        params[decode(key)] = decode(value);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    UrlParser.prototype.parseQueryParam = function (params) {
        var /** @type {?} */ key = matchQueryParams(this.remaining);
        if (!key) {
            return;
        }
        this.capture(key);
        var /** @type {?} */ value = '';
        if (this.consumeOptional('=')) {
            var /** @type {?} */ valueMatch = matchUrlQueryParamValue(this.remaining);
            if (valueMatch) {
                value = valueMatch;
                this.capture(value);
            }
        }
        var /** @type {?} */ decodedKey = decode(key);
        var /** @type {?} */ decodedVal = decode(value);
        if (params.hasOwnProperty(decodedKey)) {
            // Append to existing values
            var /** @type {?} */ currentVal = params[decodedKey];
            if (!Array.isArray(currentVal)) {
                currentVal = [currentVal];
                params[decodedKey] = currentVal;
            }
            currentVal.push(decodedVal);
        }
        else {
            // Create a new value
            params[decodedKey] = decodedVal;
        }
    };
    /**
     * @param {?} allowPrimary
     * @return {?}
     */
    UrlParser.prototype.parseParens = function (allowPrimary) {
        var /** @type {?} */ segments = {};
        this.capture('(');
        while (!this.consumeOptional(')') && this.remaining.length > 0) {
            var /** @type {?} */ path = matchSegments(this.remaining);
            var /** @type {?} */ next = this.remaining[path.length];
            // if is is not one of these characters, then the segment was unescaped
            // or the group was not closed
            if (next !== '/' && next !== ')' && next !== ';') {
                throw new Error("Cannot parse url '" + this.url + "'");
            }
            var /** @type {?} */ outletName = ((undefined));
            if (path.indexOf(':') > -1) {
                outletName = path.substr(0, path.indexOf(':'));
                this.capture(outletName);
                this.capture(':');
            }
            else if (allowPrimary) {
                outletName = PRIMARY_OUTLET;
            }
            var /** @type {?} */ children = this.parseChildren();
            segments[outletName] = Object.keys(children).length === 1 ? children[PRIMARY_OUTLET] :
                new UrlSegmentGroup([], children);
            this.consumeOptional('//');
        }
        return segments;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    UrlParser.prototype.peekStartsWith = function (str) { return this.remaining.startsWith(str); };
    /**
     * @param {?} str
     * @return {?}
     */
    UrlParser.prototype.consumeOptional = function (str) {
        if (this.peekStartsWith(str)) {
            this.remaining = this.remaining.substring(str.length);
            return true;
        }
        return false;
    };
    /**
     * @param {?} str
     * @return {?}
     */
    UrlParser.prototype.capture = function (str) {
        if (!this.consumeOptional(str)) {
            throw new Error("Expected \"" + str + "\".");
        }
    };
    return UrlParser;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NoMatch = (function () {
    /**
     * @param {?=} segmentGroup
     */
    function NoMatch(segmentGroup) {
        this.segmentGroup = segmentGroup || null;
    }
    return NoMatch;
}());
var AbsoluteRedirect = (function () {
    /**
     * @param {?} urlTree
     */
    function AbsoluteRedirect(urlTree) {
        this.urlTree = urlTree;
    }
    return AbsoluteRedirect;
}());
/**
 * @param {?} segmentGroup
 * @return {?}
 */
function noMatch(segmentGroup) {
    return new __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__["Observable"](function (obs) { return obs.error(new NoMatch(segmentGroup)); });
}
/**
 * @param {?} newTree
 * @return {?}
 */
function absoluteRedirect(newTree) {
    return new __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__["Observable"](function (obs) { return obs.error(new AbsoluteRedirect(newTree)); });
}
/**
 * @param {?} redirectTo
 * @return {?}
 */
function namedOutletsRedirect(redirectTo) {
    return new __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__["Observable"](function (obs) { return obs.error(new Error("Only absolute redirects can have named outlets. redirectTo: '" + redirectTo + "'")); });
}
/**
 * @param {?} route
 * @return {?}
 */
function canLoadFails(route) {
    return new __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__["Observable"](function (obs) { return obs.error(navigationCancelingError("Cannot load children because the guard of the route \"path: '" + route.path + "'\" returned false")); });
}
/**
 * Returns the `UrlTree` with the redirection applied.
 *
 * Lazy modules are loaded along the way.
 * @param {?} moduleInjector
 * @param {?} configLoader
 * @param {?} urlSerializer
 * @param {?} urlTree
 * @param {?} config
 * @return {?}
 */
function applyRedirects(moduleInjector, configLoader, urlSerializer, urlTree, config) {
    return new ApplyRedirects(moduleInjector, configLoader, urlSerializer, urlTree, config).apply();
}
var ApplyRedirects = (function () {
    /**
     * @param {?} moduleInjector
     * @param {?} configLoader
     * @param {?} urlSerializer
     * @param {?} urlTree
     * @param {?} config
     */
    function ApplyRedirects(moduleInjector, configLoader, urlSerializer, urlTree, config) {
        this.configLoader = configLoader;
        this.urlSerializer = urlSerializer;
        this.urlTree = urlTree;
        this.config = config;
        this.allowRedirects = true;
        this.ngModule = moduleInjector.get(__WEBPACK_IMPORTED_MODULE_2__angular_core__["P" /* NgModuleRef */]);
    }
    /**
     * @return {?}
     */
    ApplyRedirects.prototype.apply = function () {
        var _this = this;
        var /** @type {?} */ expanded$ = this.expandSegmentGroup(this.ngModule, this.config, this.urlTree.root, PRIMARY_OUTLET);
        var /** @type {?} */ urlTrees$ = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(expanded$, function (rootSegmentGroup) { return _this.createUrlTree(rootSegmentGroup, _this.urlTree.queryParams, /** @type {?} */ ((_this.urlTree.fragment))); });
        return __WEBPACK_IMPORTED_MODULE_15_rxjs_operator_catch__["_catch"].call(urlTrees$, function (e) {
            if (e instanceof AbsoluteRedirect) {
                // after an absolute redirect we do not apply any more redirects!
                _this.allowRedirects = false;
                // we need to run matching, so we can fetch all lazy-loaded modules
                return _this.match(e.urlTree);
            }
            if (e instanceof NoMatch) {
                throw _this.noMatchError(e);
            }
            throw e;
        });
    };
    /**
     * @param {?} tree
     * @return {?}
     */
    ApplyRedirects.prototype.match = function (tree) {
        var _this = this;
        var /** @type {?} */ expanded$ = this.expandSegmentGroup(this.ngModule, this.config, tree.root, PRIMARY_OUTLET);
        var /** @type {?} */ mapped$ = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(expanded$, function (rootSegmentGroup) { return _this.createUrlTree(rootSegmentGroup, tree.queryParams, /** @type {?} */ ((tree.fragment))); });
        return __WEBPACK_IMPORTED_MODULE_15_rxjs_operator_catch__["_catch"].call(mapped$, function (e) {
            if (e instanceof NoMatch) {
                throw _this.noMatchError(e);
            }
            throw e;
        });
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ApplyRedirects.prototype.noMatchError = function (e) {
        return new Error("Cannot match any routes. URL Segment: '" + e.segmentGroup + "'");
    };
    /**
     * @param {?} rootCandidate
     * @param {?} queryParams
     * @param {?} fragment
     * @return {?}
     */
    ApplyRedirects.prototype.createUrlTree = function (rootCandidate, queryParams, fragment) {
        var /** @type {?} */ root = rootCandidate.segments.length > 0 ?
            new UrlSegmentGroup([], (_a = {}, _a[PRIMARY_OUTLET] = rootCandidate, _a)) :
            rootCandidate;
        return new UrlTree(root, queryParams, fragment);
        var _a;
    };
    /**
     * @param {?} ngModule
     * @param {?} routes
     * @param {?} segmentGroup
     * @param {?} outlet
     * @return {?}
     */
    ApplyRedirects.prototype.expandSegmentGroup = function (ngModule, routes, segmentGroup, outlet) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
            return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(this.expandChildren(ngModule, routes, segmentGroup), function (children) { return new UrlSegmentGroup([], children); });
        }
        return this.expandSegment(ngModule, segmentGroup, routes, segmentGroup.segments, outlet, true);
    };
    /**
     * @param {?} ngModule
     * @param {?} routes
     * @param {?} segmentGroup
     * @return {?}
     */
    ApplyRedirects.prototype.expandChildren = function (ngModule, routes, segmentGroup) {
        var _this = this;
        return waitForMap(segmentGroup.children, function (childOutlet, child) { return _this.expandSegmentGroup(ngModule, routes, child, childOutlet); });
    };
    /**
     * @param {?} ngModule
     * @param {?} segmentGroup
     * @param {?} routes
     * @param {?} segments
     * @param {?} outlet
     * @param {?} allowRedirects
     * @return {?}
     */
    ApplyRedirects.prototype.expandSegment = function (ngModule, segmentGroup, routes, segments, outlet, allowRedirects) {
        var _this = this;
        var /** @type {?} */ routes$ = __WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"].apply(void 0, routes);
        var /** @type {?} */ processedRoutes$ = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(routes$, function (r) {
            var /** @type {?} */ expanded$ = _this.expandSegmentAgainstRoute(ngModule, segmentGroup, routes, r, segments, outlet, allowRedirects);
            return __WEBPACK_IMPORTED_MODULE_15_rxjs_operator_catch__["_catch"].call(expanded$, function (e) {
                if (e instanceof NoMatch) {
                    return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(null);
                }
                throw e;
            });
        });
        var /** @type {?} */ concattedProcessedRoutes$ = __WEBPACK_IMPORTED_MODULE_16_rxjs_operator_concatAll__["concatAll"].call(processedRoutes$);
        var /** @type {?} */ first$ = __WEBPACK_IMPORTED_MODULE_9_rxjs_operator_first__["first"].call(concattedProcessedRoutes$, function (s) { return !!s; });
        return __WEBPACK_IMPORTED_MODULE_15_rxjs_operator_catch__["_catch"].call(first$, function (e, _) {
            if (e instanceof __WEBPACK_IMPORTED_MODULE_17_rxjs_util_EmptyError__["EmptyError"]) {
                if (_this.noLeftoversInUrl(segmentGroup, segments, outlet)) {
                    return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(new UrlSegmentGroup([], {}));
                }
                throw new NoMatch(segmentGroup);
            }
            throw e;
        });
    };
    /**
     * @param {?} segmentGroup
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    ApplyRedirects.prototype.noLeftoversInUrl = function (segmentGroup, segments, outlet) {
        return segments.length === 0 && !segmentGroup.children[outlet];
    };
    /**
     * @param {?} ngModule
     * @param {?} segmentGroup
     * @param {?} routes
     * @param {?} route
     * @param {?} paths
     * @param {?} outlet
     * @param {?} allowRedirects
     * @return {?}
     */
    ApplyRedirects.prototype.expandSegmentAgainstRoute = function (ngModule, segmentGroup, routes, route, paths, outlet, allowRedirects) {
        if (getOutlet(route) !== outlet) {
            return noMatch(segmentGroup);
        }
        if (route.redirectTo === undefined) {
            return this.matchSegmentAgainstRoute(ngModule, segmentGroup, route, paths);
        }
        if (allowRedirects && this.allowRedirects) {
            return this.expandSegmentAgainstRouteUsingRedirect(ngModule, segmentGroup, routes, route, paths, outlet);
        }
        return noMatch(segmentGroup);
    };
    /**
     * @param {?} ngModule
     * @param {?} segmentGroup
     * @param {?} routes
     * @param {?} route
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    ApplyRedirects.prototype.expandSegmentAgainstRouteUsingRedirect = function (ngModule, segmentGroup, routes, route, segments, outlet) {
        if (route.path === '**') {
            return this.expandWildCardWithParamsAgainstRouteUsingRedirect(ngModule, routes, route, outlet);
        }
        return this.expandRegularSegmentAgainstRouteUsingRedirect(ngModule, segmentGroup, routes, route, segments, outlet);
    };
    /**
     * @param {?} ngModule
     * @param {?} routes
     * @param {?} route
     * @param {?} outlet
     * @return {?}
     */
    ApplyRedirects.prototype.expandWildCardWithParamsAgainstRouteUsingRedirect = function (ngModule, routes, route, outlet) {
        var _this = this;
        var /** @type {?} */ newTree = this.applyRedirectCommands([], /** @type {?} */ ((route.redirectTo)), {});
        if (((route.redirectTo)).startsWith('/')) {
            return absoluteRedirect(newTree);
        }
        return __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(this.lineralizeSegments(route, newTree), function (newSegments) {
            var /** @type {?} */ group = new UrlSegmentGroup(newSegments, {});
            return _this.expandSegment(ngModule, group, routes, newSegments, outlet, false);
        });
    };
    /**
     * @param {?} ngModule
     * @param {?} segmentGroup
     * @param {?} routes
     * @param {?} route
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    ApplyRedirects.prototype.expandRegularSegmentAgainstRouteUsingRedirect = function (ngModule, segmentGroup, routes, route, segments, outlet) {
        var _this = this;
        var _a = match(segmentGroup, route, segments), matched = _a.matched, consumedSegments = _a.consumedSegments, lastChild = _a.lastChild, positionalParamSegments = _a.positionalParamSegments;
        if (!matched)
            return noMatch(segmentGroup);
        var /** @type {?} */ newTree = this.applyRedirectCommands(consumedSegments, /** @type {?} */ ((route.redirectTo)), /** @type {?} */ (positionalParamSegments));
        if (((route.redirectTo)).startsWith('/')) {
            return absoluteRedirect(newTree);
        }
        return __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(this.lineralizeSegments(route, newTree), function (newSegments) {
            return _this.expandSegment(ngModule, segmentGroup, routes, newSegments.concat(segments.slice(lastChild)), outlet, false);
        });
    };
    /**
     * @param {?} ngModule
     * @param {?} rawSegmentGroup
     * @param {?} route
     * @param {?} segments
     * @return {?}
     */
    ApplyRedirects.prototype.matchSegmentAgainstRoute = function (ngModule, rawSegmentGroup, route, segments) {
        var _this = this;
        if (route.path === '**') {
            if (route.loadChildren) {
                return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(this.configLoader.load(ngModule.injector, route), function (cfg) {
                    route._loadedConfig = cfg;
                    return new UrlSegmentGroup(segments, {});
                });
            }
            return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(new UrlSegmentGroup(segments, {}));
        }
        var _a = match(rawSegmentGroup, route, segments), matched = _a.matched, consumedSegments = _a.consumedSegments, lastChild = _a.lastChild;
        if (!matched)
            return noMatch(rawSegmentGroup);
        var /** @type {?} */ rawSlicedSegments = segments.slice(lastChild);
        var /** @type {?} */ childConfig$ = this.getChildConfig(ngModule, route);
        return __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(childConfig$, function (routerConfig) {
            var /** @type {?} */ childModule = routerConfig.module;
            var /** @type {?} */ childConfig = routerConfig.routes;
            var _a = split(rawSegmentGroup, consumedSegments, rawSlicedSegments, childConfig), segmentGroup = _a.segmentGroup, slicedSegments = _a.slicedSegments;
            if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
                var /** @type {?} */ expanded$_1 = _this.expandChildren(childModule, childConfig, segmentGroup);
                return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(expanded$_1, function (children) { return new UrlSegmentGroup(consumedSegments, children); });
            }
            if (childConfig.length === 0 && slicedSegments.length === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(new UrlSegmentGroup(consumedSegments, {}));
            }
            var /** @type {?} */ expanded$ = _this.expandSegment(childModule, segmentGroup, childConfig, slicedSegments, PRIMARY_OUTLET, true);
            return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(expanded$, function (cs) { return new UrlSegmentGroup(consumedSegments.concat(cs.segments), cs.children); });
        });
    };
    /**
     * @param {?} ngModule
     * @param {?} route
     * @return {?}
     */
    ApplyRedirects.prototype.getChildConfig = function (ngModule, route) {
        var _this = this;
        if (route.children) {
            // The children belong to the same module
            return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(new LoadedRouterConfig(route.children, ngModule));
        }
        if (route.loadChildren) {
            // lazy children belong to the loaded module
            if (route._loadedConfig !== undefined) {
                return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(route._loadedConfig);
            }
            return __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(runCanLoadGuard(ngModule.injector, route), function (shouldLoad) {
                if (shouldLoad) {
                    return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(_this.configLoader.load(ngModule.injector, route), function (cfg) {
                        route._loadedConfig = cfg;
                        return cfg;
                    });
                }
                return canLoadFails(route);
            });
        }
        return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(new LoadedRouterConfig([], ngModule));
    };
    /**
     * @param {?} route
     * @param {?} urlTree
     * @return {?}
     */
    ApplyRedirects.prototype.lineralizeSegments = function (route, urlTree) {
        var /** @type {?} */ res = [];
        var /** @type {?} */ c = urlTree.root;
        while (true) {
            res = res.concat(c.segments);
            if (c.numberOfChildren === 0) {
                return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(res);
            }
            if (c.numberOfChildren > 1 || !c.children[PRIMARY_OUTLET]) {
                return namedOutletsRedirect(/** @type {?} */ ((route.redirectTo)));
            }
            c = c.children[PRIMARY_OUTLET];
        }
    };
    /**
     * @param {?} segments
     * @param {?} redirectTo
     * @param {?} posParams
     * @return {?}
     */
    ApplyRedirects.prototype.applyRedirectCommands = function (segments, redirectTo, posParams) {
        return this.applyRedirectCreatreUrlTree(redirectTo, this.urlSerializer.parse(redirectTo), segments, posParams);
    };
    /**
     * @param {?} redirectTo
     * @param {?} urlTree
     * @param {?} segments
     * @param {?} posParams
     * @return {?}
     */
    ApplyRedirects.prototype.applyRedirectCreatreUrlTree = function (redirectTo, urlTree, segments, posParams) {
        var /** @type {?} */ newRoot = this.createSegmentGroup(redirectTo, urlTree.root, segments, posParams);
        return new UrlTree(newRoot, this.createQueryParams(urlTree.queryParams, this.urlTree.queryParams), urlTree.fragment);
    };
    /**
     * @param {?} redirectToParams
     * @param {?} actualParams
     * @return {?}
     */
    ApplyRedirects.prototype.createQueryParams = function (redirectToParams, actualParams) {
        var /** @type {?} */ res = {};
        forEach(redirectToParams, function (v, k) {
            var /** @type {?} */ copySourceValue = typeof v === 'string' && v.startsWith(':');
            if (copySourceValue) {
                var /** @type {?} */ sourceName = v.substring(1);
                res[k] = actualParams[sourceName];
            }
            else {
                res[k] = v;
            }
        });
        return res;
    };
    /**
     * @param {?} redirectTo
     * @param {?} group
     * @param {?} segments
     * @param {?} posParams
     * @return {?}
     */
    ApplyRedirects.prototype.createSegmentGroup = function (redirectTo, group, segments, posParams) {
        var _this = this;
        var /** @type {?} */ updatedSegments = this.createSegments(redirectTo, group.segments, segments, posParams);
        var /** @type {?} */ children = {};
        forEach(group.children, function (child, name) {
            children[name] = _this.createSegmentGroup(redirectTo, child, segments, posParams);
        });
        return new UrlSegmentGroup(updatedSegments, children);
    };
    /**
     * @param {?} redirectTo
     * @param {?} redirectToSegments
     * @param {?} actualSegments
     * @param {?} posParams
     * @return {?}
     */
    ApplyRedirects.prototype.createSegments = function (redirectTo, redirectToSegments, actualSegments, posParams) {
        var _this = this;
        return redirectToSegments.map(function (s) { return s.path.startsWith(':') ? _this.findPosParam(redirectTo, s, posParams) :
            _this.findOrReturn(s, actualSegments); });
    };
    /**
     * @param {?} redirectTo
     * @param {?} redirectToUrlSegment
     * @param {?} posParams
     * @return {?}
     */
    ApplyRedirects.prototype.findPosParam = function (redirectTo, redirectToUrlSegment, posParams) {
        var /** @type {?} */ pos = posParams[redirectToUrlSegment.path.substring(1)];
        if (!pos)
            throw new Error("Cannot redirect to '" + redirectTo + "'. Cannot find '" + redirectToUrlSegment.path + "'.");
        return pos;
    };
    /**
     * @param {?} redirectToUrlSegment
     * @param {?} actualSegments
     * @return {?}
     */
    ApplyRedirects.prototype.findOrReturn = function (redirectToUrlSegment, actualSegments) {
        var /** @type {?} */ idx = 0;
        for (var _i = 0, actualSegments_1 = actualSegments; _i < actualSegments_1.length; _i++) {
            var s = actualSegments_1[_i];
            if (s.path === redirectToUrlSegment.path) {
                actualSegments.splice(idx);
                return s;
            }
            idx++;
        }
        return redirectToUrlSegment;
    };
    return ApplyRedirects;
}());
/**
 * @param {?} moduleInjector
 * @param {?} route
 * @return {?}
 */
function runCanLoadGuard(moduleInjector, route) {
    var /** @type {?} */ canLoad = route.canLoad;
    if (!canLoad || canLoad.length === 0)
        return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(true);
    var /** @type {?} */ obs = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(canLoad), function (injectionToken) {
        var /** @type {?} */ guard = moduleInjector.get(injectionToken);
        return wrapIntoObservable(guard.canLoad ? guard.canLoad(route) : guard(route));
    });
    return andObservables(obs);
}
/**
 * @param {?} segmentGroup
 * @param {?} route
 * @param {?} segments
 * @return {?}
 */
function match(segmentGroup, route, segments) {
    if (route.path === '') {
        if ((route.pathMatch === 'full') && (segmentGroup.hasChildren() || segments.length > 0)) {
            return { matched: false, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
        }
        return { matched: true, consumedSegments: [], lastChild: 0, positionalParamSegments: {} };
    }
    var /** @type {?} */ matcher = route.matcher || defaultUrlMatcher;
    var /** @type {?} */ res = matcher(segments, segmentGroup, route);
    if (!res) {
        return {
            matched: false,
            consumedSegments: /** @type {?} */ ([]),
            lastChild: 0,
            positionalParamSegments: {},
        };
    }
    return {
        matched: true,
        consumedSegments: /** @type {?} */ ((res.consumed)),
        lastChild: /** @type {?} */ ((res.consumed.length)),
        positionalParamSegments: /** @type {?} */ ((res.posParams)),
    };
}
/**
 * @param {?} segmentGroup
 * @param {?} consumedSegments
 * @param {?} slicedSegments
 * @param {?} config
 * @return {?}
 */
function split(segmentGroup, consumedSegments, slicedSegments, config) {
    if (slicedSegments.length > 0 &&
        containsEmptyPathRedirectsWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        var /** @type {?} */ s = new UrlSegmentGroup(consumedSegments, createChildrenForEmptySegments(config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
        return { segmentGroup: mergeTrivialChildren(s), slicedSegments: [] };
    }
    if (slicedSegments.length === 0 &&
        containsEmptyPathRedirects(segmentGroup, slicedSegments, config)) {
        var /** @type {?} */ s = new UrlSegmentGroup(segmentGroup.segments, addEmptySegmentsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
        return { segmentGroup: mergeTrivialChildren(s), slicedSegments: slicedSegments };
    }
    return { segmentGroup: segmentGroup, slicedSegments: slicedSegments };
}
/**
 * @param {?} s
 * @return {?}
 */
function mergeTrivialChildren(s) {
    if (s.numberOfChildren === 1 && s.children[PRIMARY_OUTLET]) {
        var /** @type {?} */ c = s.children[PRIMARY_OUTLET];
        return new UrlSegmentGroup(s.segments.concat(c.segments), c.children);
    }
    return s;
}
/**
 * @param {?} segmentGroup
 * @param {?} slicedSegments
 * @param {?} routes
 * @param {?} children
 * @return {?}
 */
function addEmptySegmentsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
    var /** @type {?} */ res = {};
    for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
        var r = routes_1[_i];
        if (isEmptyPathRedirect(segmentGroup, slicedSegments, r) && !children[getOutlet(r)]) {
            res[getOutlet(r)] = new UrlSegmentGroup([], {});
        }
    }
    return Object.assign({}, children, res);
}
/**
 * @param {?} routes
 * @param {?} primarySegmentGroup
 * @return {?}
 */
function createChildrenForEmptySegments(routes, primarySegmentGroup) {
    var /** @type {?} */ res = {};
    res[PRIMARY_OUTLET] = primarySegmentGroup;
    for (var _i = 0, routes_2 = routes; _i < routes_2.length; _i++) {
        var r = routes_2[_i];
        if (r.path === '' && getOutlet(r) !== PRIMARY_OUTLET) {
            res[getOutlet(r)] = new UrlSegmentGroup([], {});
        }
    }
    return res;
}
/**
 * @param {?} segmentGroup
 * @param {?} segments
 * @param {?} routes
 * @return {?}
 */
function containsEmptyPathRedirectsWithNamedOutlets(segmentGroup, segments, routes) {
    return routes.some(function (r) { return isEmptyPathRedirect(segmentGroup, segments, r) && getOutlet(r) !== PRIMARY_OUTLET; });
}
/**
 * @param {?} segmentGroup
 * @param {?} segments
 * @param {?} routes
 * @return {?}
 */
function containsEmptyPathRedirects(segmentGroup, segments, routes) {
    return routes.some(function (r) { return isEmptyPathRedirect(segmentGroup, segments, r); });
}
/**
 * @param {?} segmentGroup
 * @param {?} segments
 * @param {?} r
 * @return {?}
 */
function isEmptyPathRedirect(segmentGroup, segments, r) {
    if ((segmentGroup.hasChildren() || segments.length > 0) && r.pathMatch === 'full') {
        return false;
    }
    return r.path === '' && r.redirectTo !== undefined;
}
/**
 * @param {?} route
 * @return {?}
 */
function getOutlet(route) {
    return route.outlet || PRIMARY_OUTLET;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var Tree = (function () {
    /**
     * @param {?} root
     */
    function Tree(root) {
        this._root = root;
    }
    Object.defineProperty(Tree.prototype, "root", {
        /**
         * @return {?}
         */
        get: function () { return this._root.value; },
        enumerable: true,
        configurable: true
    });
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    Tree.prototype.parent = function (t) {
        var /** @type {?} */ p = this.pathFromRoot(t);
        return p.length > 1 ? p[p.length - 2] : null;
    };
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    Tree.prototype.children = function (t) {
        var /** @type {?} */ n = findNode(t, this._root);
        return n ? n.children.map(function (t) { return t.value; }) : [];
    };
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    Tree.prototype.firstChild = function (t) {
        var /** @type {?} */ n = findNode(t, this._root);
        return n && n.children.length > 0 ? n.children[0].value : null;
    };
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    Tree.prototype.siblings = function (t) {
        var /** @type {?} */ p = findPath(t, this._root);
        if (p.length < 2)
            return [];
        var /** @type {?} */ c = p[p.length - 2].children.map(function (c) { return c.value; });
        return c.filter(function (cc) { return cc !== t; });
    };
    /**
     * \@internal
     * @param {?} t
     * @return {?}
     */
    Tree.prototype.pathFromRoot = function (t) { return findPath(t, this._root).map(function (s) { return s.value; }); };
    return Tree;
}());
/**
 * @template T
 * @param {?} value
 * @param {?} node
 * @return {?}
 */
function findNode(value, node) {
    if (value === node.value)
        return node;
    for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var /** @type {?} */ node_1 = findNode(value, child);
        if (node_1)
            return node_1;
    }
    return null;
}
/**
 * @template T
 * @param {?} value
 * @param {?} node
 * @return {?}
 */
function findPath(value, node) {
    if (value === node.value)
        return [node];
    for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var child = _a[_i];
        var /** @type {?} */ path = findPath(value, child);
        if (path.length) {
            path.unshift(node);
            return path;
        }
    }
    return [];
}
var TreeNode = (function () {
    /**
     * @param {?} value
     * @param {?} children
     */
    function TreeNode(value, children) {
        this.value = value;
        this.children = children;
    }
    /**
     * @return {?}
     */
    TreeNode.prototype.toString = function () { return "TreeNode(" + this.value + ")"; };
    return TreeNode;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Represents the state of the router.
 *
 * \@howToUse
 *
 * ```
 * \@Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state: RouterState = router.routerState;
 *     const root: ActivatedRoute = state.root;
 *     const child = root.firstChild;
 *     const id: Observable<string> = child.params.map(p => p.id);
 *     //...
 *   }
 * }
 * ```
 *
 * \@description
 * RouterState is a tree of activated routes. Every node in this tree knows about the "consumed" URL
 * segments, the extracted parameters, and the resolved data.
 *
 * See {\@link ActivatedRoute} for more information.
 *
 * \@stable
 */
var RouterState = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](RouterState, _super);
    /**
     * \@internal
     * @param {?} root
     * @param {?} snapshot
     */
    function RouterState(root, snapshot) {
        var _this = _super.call(this, root) || this;
        _this.snapshot = snapshot;
        setRouterState(_this, root);
        return _this;
    }
    /**
     * @return {?}
     */
    RouterState.prototype.toString = function () { return this.snapshot.toString(); };
    return RouterState;
}(Tree));
/**
 * @param {?} urlTree
 * @param {?} rootComponent
 * @return {?}
 */
function createEmptyState(urlTree, rootComponent) {
    var /** @type {?} */ snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
    var /** @type {?} */ emptyUrl = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]([new UrlSegment('', {})]);
    var /** @type {?} */ emptyParams = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]({});
    var /** @type {?} */ emptyData = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]({});
    var /** @type {?} */ emptyQueryParams = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]({});
    var /** @type {?} */ fragment = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]('');
    var /** @type {?} */ activated = new ActivatedRoute(emptyUrl, emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, snapshot.root);
    activated.snapshot = snapshot.root;
    return new RouterState(new TreeNode(activated, []), snapshot);
}
/**
 * @param {?} urlTree
 * @param {?} rootComponent
 * @return {?}
 */
function createEmptyStateSnapshot(urlTree, rootComponent) {
    var /** @type {?} */ emptyParams = {};
    var /** @type {?} */ emptyData = {};
    var /** @type {?} */ emptyQueryParams = {};
    var /** @type {?} */ fragment = '';
    var /** @type {?} */ activated = new ActivatedRouteSnapshot([], emptyParams, emptyQueryParams, fragment, emptyData, PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1, {});
    return new RouterStateSnapshot('', new TreeNode(activated, []));
}
/**
 * \@whatItDoes Contains the information about a route associated with a component loaded in an
 * outlet.
 * An `ActivatedRoute` can also be used to traverse the router state tree.
 *
 * \@howToUse
 *
 * ```
 * \@Component({...})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: Observable<string> = route.params.map(p => p.id);
 *     const url: Observable<string> = route.url.map(segments => segments.join(''));
 *     // route.data includes both `data` and `resolve`
 *     const user = route.data.map(d => d.user);
 *   }
 * }
 * ```
 *
 * \@stable
 */
var ActivatedRoute = (function () {
    /**
     * \@internal
     * @param {?} url
     * @param {?} params
     * @param {?} queryParams
     * @param {?} fragment
     * @param {?} data
     * @param {?} outlet
     * @param {?} component
     * @param {?} futureSnapshot
     */
    function ActivatedRoute(url, params, queryParams, fragment, data, outlet, component, futureSnapshot) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
    }
    Object.defineProperty(ActivatedRoute.prototype, "routeConfig", {
        /**
         * The configuration used to match this route
         * @return {?}
         */
        get: function () { return this._futureSnapshot.routeConfig; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "root", {
        /**
         * The root of the router state
         * @return {?}
         */
        get: function () { return this._routerState.root; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "parent", {
        /**
         * The parent of this route in the router state tree
         * @return {?}
         */
        get: function () { return this._routerState.parent(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "firstChild", {
        /**
         * The first child of this route in the router state tree
         * @return {?}
         */
        get: function () { return this._routerState.firstChild(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "children", {
        /**
         * The children of this route in the router state tree
         * @return {?}
         */
        get: function () { return this._routerState.children(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "pathFromRoot", {
        /**
         * The path from the root of the router state tree to this route
         * @return {?}
         */
        get: function () { return this._routerState.pathFromRoot(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "paramMap", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._paramMap) {
                this._paramMap = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(this.params, function (p) { return convertToParamMap(p); });
            }
            return this._paramMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRoute.prototype, "queryParamMap", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._queryParamMap) {
                this._queryParamMap =
                    __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(this.queryParams, function (p) { return convertToParamMap(p); });
            }
            return this._queryParamMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ActivatedRoute.prototype.toString = function () {
        return this.snapshot ? this.snapshot.toString() : "Future(" + this._futureSnapshot + ")";
    };
    return ActivatedRoute;
}());
/**
 * \@internal
 * @param {?} route
 * @return {?}
 */
function inheritedParamsDataResolve(route) {
    var /** @type {?} */ pathToRoot = route.pathFromRoot;
    var /** @type {?} */ inhertingStartingFrom = pathToRoot.length - 1;
    while (inhertingStartingFrom >= 1) {
        var /** @type {?} */ current = pathToRoot[inhertingStartingFrom];
        var /** @type {?} */ parent = pathToRoot[inhertingStartingFrom - 1];
        // current route is an empty path => inherits its parent's params and data
        if (current.routeConfig && current.routeConfig.path === '') {
            inhertingStartingFrom--;
            // parent is componentless => current route should inherit its params and data
        }
        else if (!parent.component) {
            inhertingStartingFrom--;
        }
        else {
            break;
        }
    }
    return pathToRoot.slice(inhertingStartingFrom).reduce(function (res, curr) {
        var /** @type {?} */ params = Object.assign({}, res.params, curr.params);
        var /** @type {?} */ data = Object.assign({}, res.data, curr.data);
        var /** @type {?} */ resolve = Object.assign({}, res.resolve, curr._resolvedData);
        return { params: params, data: data, resolve: resolve };
    }, /** @type {?} */ ({ params: {}, data: {}, resolve: {} }));
}
/**
 * \@whatItDoes Contains the information about a route associated with a component loaded in an
 * outlet
 * at a particular moment in time. ActivatedRouteSnapshot can also be used to traverse the router
 * state tree.
 *
 * \@howToUse
 *
 * ```
 * \@Component({templateUrl:'./my-component.html'})
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: string = route.snapshot.params.id;
 *     const url: string = route.snapshot.url.join('');
 *     const user = route.snapshot.data.user;
 *   }
 * }
 * ```
 *
 * \@stable
 */
var ActivatedRouteSnapshot = (function () {
    /**
     * \@internal
     * @param {?} url
     * @param {?} params
     * @param {?} queryParams
     * @param {?} fragment
     * @param {?} data
     * @param {?} outlet
     * @param {?} component
     * @param {?} routeConfig
     * @param {?} urlSegment
     * @param {?} lastPathIndex
     * @param {?} resolve
     */
    function ActivatedRouteSnapshot(url, params, queryParams, fragment, data, outlet, component, routeConfig, urlSegment, lastPathIndex, resolve) {
        this.url = url;
        this.params = params;
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._routeConfig = routeConfig;
        this._urlSegment = urlSegment;
        this._lastPathIndex = lastPathIndex;
        this._resolve = resolve;
    }
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "routeConfig", {
        /**
         * The configuration used to match this route
         * @return {?}
         */
        get: function () { return this._routeConfig; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "root", {
        /**
         * The root of the router state
         * @return {?}
         */
        get: function () { return this._routerState.root; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "parent", {
        /**
         * The parent of this route in the router state tree
         * @return {?}
         */
        get: function () { return this._routerState.parent(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "firstChild", {
        /**
         * The first child of this route in the router state tree
         * @return {?}
         */
        get: function () { return this._routerState.firstChild(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "children", {
        /**
         * The children of this route in the router state tree
         * @return {?}
         */
        get: function () { return this._routerState.children(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "pathFromRoot", {
        /**
         * The path from the root of the router state tree to this route
         * @return {?}
         */
        get: function () { return this._routerState.pathFromRoot(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "paramMap", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._paramMap) {
                this._paramMap = convertToParamMap(this.params);
            }
            return this._paramMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteSnapshot.prototype, "queryParamMap", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this._queryParamMap) {
                this._queryParamMap = convertToParamMap(this.queryParams);
            }
            return this._queryParamMap;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ActivatedRouteSnapshot.prototype.toString = function () {
        var /** @type {?} */ url = this.url.map(function (segment) { return segment.toString(); }).join('/');
        var /** @type {?} */ matched = this._routeConfig ? this._routeConfig.path : '';
        return "Route(url:'" + url + "', path:'" + matched + "')";
    };
    return ActivatedRouteSnapshot;
}());
/**
 * \@whatItDoes Represents the state of the router at a moment in time.
 *
 * \@howToUse
 *
 * ```
 * \@Component({templateUrl:'template.html'})
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state: RouterState = router.routerState;
 *     const snapshot: RouterStateSnapshot = state.snapshot;
 *     const root: ActivatedRouteSnapshot = snapshot.root;
 *     const child = root.firstChild;
 *     const id: Observable<string> = child.params.map(p => p.id);
 *     //...
 *   }
 * }
 * ```
 *
 * \@description
 * RouterStateSnapshot is a tree of activated route snapshots. Every node in this tree knows about
 * the "consumed" URL segments, the extracted parameters, and the resolved data.
 *
 * \@stable
 */
var RouterStateSnapshot = (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __extends */](RouterStateSnapshot, _super);
    /**
     * \@internal
     * @param {?} url
     * @param {?} root
     */
    function RouterStateSnapshot(url, root) {
        var _this = _super.call(this, root) || this;
        _this.url = url;
        setRouterState(_this, root);
        return _this;
    }
    /**
     * @return {?}
     */
    RouterStateSnapshot.prototype.toString = function () { return serializeNode(this._root); };
    return RouterStateSnapshot;
}(Tree));
/**
 * @template U, T
 * @param {?} state
 * @param {?} node
 * @return {?}
 */
function setRouterState(state, node) {
    node.value._routerState = state;
    node.children.forEach(function (c) { return setRouterState(state, c); });
}
/**
 * @param {?} node
 * @return {?}
 */
function serializeNode(node) {
    var /** @type {?} */ c = node.children.length > 0 ? " { " + node.children.map(serializeNode).join(", ") + " } " : '';
    return "" + node.value + c;
}
/**
 * The expectation is that the activate route is created with the right set of parameters.
 * So we push new values into the observables only when they are not the initial values.
 * And we detect that by checking if the snapshot field is set.
 * @param {?} route
 * @return {?}
 */
function advanceActivatedRoute(route) {
    if (route.snapshot) {
        var /** @type {?} */ currentSnapshot = route.snapshot;
        var /** @type {?} */ nextSnapshot = route._futureSnapshot;
        route.snapshot = nextSnapshot;
        if (!shallowEqual(currentSnapshot.queryParams, nextSnapshot.queryParams)) {
            ((route.queryParams)).next(nextSnapshot.queryParams);
        }
        if (currentSnapshot.fragment !== nextSnapshot.fragment) {
            ((route.fragment)).next(nextSnapshot.fragment);
        }
        if (!shallowEqual(currentSnapshot.params, nextSnapshot.params)) {
            ((route.params)).next(nextSnapshot.params);
        }
        if (!shallowEqualArrays(currentSnapshot.url, nextSnapshot.url)) {
            ((route.url)).next(nextSnapshot.url);
        }
        if (!shallowEqual(currentSnapshot.data, nextSnapshot.data)) {
            ((route.data)).next(nextSnapshot.data);
        }
    }
    else {
        route.snapshot = route._futureSnapshot;
        // this is for resolved data
        ((route.data)).next(route._futureSnapshot.data);
    }
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function equalParamsAndUrlSegments(a, b) {
    var /** @type {?} */ equalUrlParams = shallowEqual(a.params, b.params) && equalSegments(a.url, b.url);
    var /** @type {?} */ parentsMismatch = !a.parent !== !b.parent;
    return equalUrlParams && !parentsMismatch &&
        (!a.parent || equalParamsAndUrlSegments(a.parent, /** @type {?} */ ((b.parent))));
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} routeReuseStrategy
 * @param {?} curr
 * @param {?} prevState
 * @return {?}
 */
function createRouterState(routeReuseStrategy, curr, prevState) {
    var /** @type {?} */ root = createNode(routeReuseStrategy, curr._root, prevState ? prevState._root : undefined);
    return new RouterState(root, curr);
}
/**
 * @param {?} routeReuseStrategy
 * @param {?} curr
 * @param {?=} prevState
 * @return {?}
 */
function createNode(routeReuseStrategy, curr, prevState) {
    // reuse an activated route that is currently displayed on the screen
    if (prevState && routeReuseStrategy.shouldReuseRoute(curr.value, prevState.value.snapshot)) {
        var /** @type {?} */ value = prevState.value;
        value._futureSnapshot = curr.value;
        var /** @type {?} */ children = createOrReuseChildren(routeReuseStrategy, curr, prevState);
        return new TreeNode(value, children);
        // retrieve an activated route that is used to be displayed, but is not currently displayed
    }
    else if (routeReuseStrategy.retrieve(curr.value)) {
        var /** @type {?} */ tree_1 = ((routeReuseStrategy.retrieve(curr.value))).route;
        setFutureSnapshotsOfActivatedRoutes(curr, tree_1);
        return tree_1;
    }
    else {
        var /** @type {?} */ value = createActivatedRoute(curr.value);
        var /** @type {?} */ children = curr.children.map(function (c) { return createNode(routeReuseStrategy, c); });
        return new TreeNode(value, children);
    }
}
/**
 * @param {?} curr
 * @param {?} result
 * @return {?}
 */
function setFutureSnapshotsOfActivatedRoutes(curr, result) {
    if (curr.value.routeConfig !== result.value.routeConfig) {
        throw new Error('Cannot reattach ActivatedRouteSnapshot created from a different route');
    }
    if (curr.children.length !== result.children.length) {
        throw new Error('Cannot reattach ActivatedRouteSnapshot with a different number of children');
    }
    result.value._futureSnapshot = curr.value;
    for (var /** @type {?} */ i = 0; i < curr.children.length; ++i) {
        setFutureSnapshotsOfActivatedRoutes(curr.children[i], result.children[i]);
    }
}
/**
 * @param {?} routeReuseStrategy
 * @param {?} curr
 * @param {?} prevState
 * @return {?}
 */
function createOrReuseChildren(routeReuseStrategy, curr, prevState) {
    return curr.children.map(function (child) {
        for (var _i = 0, _a = prevState.children; _i < _a.length; _i++) {
            var p = _a[_i];
            if (routeReuseStrategy.shouldReuseRoute(p.value.snapshot, child.value)) {
                return createNode(routeReuseStrategy, child, p);
            }
        }
        return createNode(routeReuseStrategy, child);
    });
}
/**
 * @param {?} c
 * @return {?}
 */
function createActivatedRoute(c) {
    return new ActivatedRoute(new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](c.url), new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](c.params), new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](c.queryParams), new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](c.fragment), new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](c.data), c.outlet, c.component, c);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} route
 * @param {?} urlTree
 * @param {?} commands
 * @param {?} queryParams
 * @param {?} fragment
 * @return {?}
 */
function createUrlTree(route, urlTree, commands, queryParams, fragment) {
    if (commands.length === 0) {
        return tree(urlTree.root, urlTree.root, urlTree, queryParams, fragment);
    }
    var /** @type {?} */ nav = computeNavigation(commands);
    if (nav.toRoot()) {
        return tree(urlTree.root, new UrlSegmentGroup([], {}), urlTree, queryParams, fragment);
    }
    var /** @type {?} */ startingPosition = findStartingPosition(nav, urlTree, route);
    var /** @type {?} */ segmentGroup = startingPosition.processChildren ?
        updateSegmentGroupChildren(startingPosition.segmentGroup, startingPosition.index, nav.commands) :
        updateSegmentGroup(startingPosition.segmentGroup, startingPosition.index, nav.commands);
    return tree(startingPosition.segmentGroup, segmentGroup, urlTree, queryParams, fragment);
}
/**
 * @param {?} command
 * @return {?}
 */
function isMatrixParams(command) {
    return typeof command === 'object' && command != null && !command.outlets && !command.segmentPath;
}
/**
 * @param {?} oldSegmentGroup
 * @param {?} newSegmentGroup
 * @param {?} urlTree
 * @param {?} queryParams
 * @param {?} fragment
 * @return {?}
 */
function tree(oldSegmentGroup, newSegmentGroup, urlTree, queryParams, fragment) {
    var /** @type {?} */ qp = {};
    if (queryParams) {
        forEach(queryParams, function (value, name) {
            qp[name] = Array.isArray(value) ? value.map(function (v) { return "" + v; }) : "" + value;
        });
    }
    if (urlTree.root === oldSegmentGroup) {
        return new UrlTree(newSegmentGroup, qp, fragment);
    }
    return new UrlTree(replaceSegment(urlTree.root, oldSegmentGroup, newSegmentGroup), qp, fragment);
}
/**
 * @param {?} current
 * @param {?} oldSegment
 * @param {?} newSegment
 * @return {?}
 */
function replaceSegment(current, oldSegment, newSegment) {
    var /** @type {?} */ children = {};
    forEach(current.children, function (c, outletName) {
        if (c === oldSegment) {
            children[outletName] = newSegment;
        }
        else {
            children[outletName] = replaceSegment(c, oldSegment, newSegment);
        }
    });
    return new UrlSegmentGroup(current.segments, children);
}
var Navigation = (function () {
    /**
     * @param {?} isAbsolute
     * @param {?} numberOfDoubleDots
     * @param {?} commands
     */
    function Navigation(isAbsolute, numberOfDoubleDots, commands) {
        this.isAbsolute = isAbsolute;
        this.numberOfDoubleDots = numberOfDoubleDots;
        this.commands = commands;
        if (isAbsolute && commands.length > 0 && isMatrixParams(commands[0])) {
            throw new Error('Root segment cannot have matrix parameters');
        }
        var cmdWithOutlet = commands.find(function (c) { return typeof c === 'object' && c != null && c.outlets; });
        if (cmdWithOutlet && cmdWithOutlet !== last$1(commands)) {
            throw new Error('{outlets:{}} has to be the last command');
        }
    }
    /**
     * @return {?}
     */
    Navigation.prototype.toRoot = function () {
        return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
    };
    return Navigation;
}());
/**
 * Transforms commands to a normalized `Navigation`
 * @param {?} commands
 * @return {?}
 */
function computeNavigation(commands) {
    if ((typeof commands[0] === 'string') && commands.length === 1 && commands[0] === '/') {
        return new Navigation(true, 0, commands);
    }
    var /** @type {?} */ numberOfDoubleDots = 0;
    var /** @type {?} */ isAbsolute = false;
    var /** @type {?} */ res = commands.reduce(function (res, cmd, cmdIdx) {
        if (typeof cmd === 'object' && cmd != null) {
            if (cmd.outlets) {
                var /** @type {?} */ outlets_1 = {};
                forEach(cmd.outlets, function (commands, name) {
                    outlets_1[name] = typeof commands === 'string' ? commands.split('/') : commands;
                });
                return res.concat([{ outlets: outlets_1 }]);
            }
            if (cmd.segmentPath) {
                return res.concat([cmd.segmentPath]);
            }
        }
        if (!(typeof cmd === 'string')) {
            return res.concat([cmd]);
        }
        if (cmdIdx === 0) {
            cmd.split('/').forEach(function (urlPart, partIndex) {
                if (partIndex == 0 && urlPart === '.') {
                    // skip './a'
                }
                else if (partIndex == 0 && urlPart === '') {
                    isAbsolute = true;
                }
                else if (urlPart === '..') {
                    numberOfDoubleDots++;
                }
                else if (urlPart != '') {
                    res.push(urlPart);
                }
            });
            return res;
        }
        return res.concat([cmd]);
    }, []);
    return new Navigation(isAbsolute, numberOfDoubleDots, res);
}
var Position = (function () {
    /**
     * @param {?} segmentGroup
     * @param {?} processChildren
     * @param {?} index
     */
    function Position(segmentGroup, processChildren, index) {
        this.segmentGroup = segmentGroup;
        this.processChildren = processChildren;
        this.index = index;
    }
    return Position;
}());
/**
 * @param {?} nav
 * @param {?} tree
 * @param {?} route
 * @return {?}
 */
function findStartingPosition(nav, tree, route) {
    if (nav.isAbsolute) {
        return new Position(tree.root, true, 0);
    }
    if (route.snapshot._lastPathIndex === -1) {
        return new Position(route.snapshot._urlSegment, true, 0);
    }
    var /** @type {?} */ modifier = isMatrixParams(nav.commands[0]) ? 0 : 1;
    var /** @type {?} */ index = route.snapshot._lastPathIndex + modifier;
    return createPositionApplyingDoubleDots(route.snapshot._urlSegment, index, nav.numberOfDoubleDots);
}
/**
 * @param {?} group
 * @param {?} index
 * @param {?} numberOfDoubleDots
 * @return {?}
 */
function createPositionApplyingDoubleDots(group, index, numberOfDoubleDots) {
    var /** @type {?} */ g = group;
    var /** @type {?} */ ci = index;
    var /** @type {?} */ dd = numberOfDoubleDots;
    while (dd > ci) {
        dd -= ci;
        g = ((g.parent));
        if (!g) {
            throw new Error('Invalid number of \'../\'');
        }
        ci = g.segments.length;
    }
    return new Position(g, false, ci - dd);
}
/**
 * @param {?} command
 * @return {?}
 */
function getPath(command) {
    if (typeof command === 'object' && command != null && command.outlets) {
        return command.outlets[PRIMARY_OUTLET];
    }
    return "" + command;
}
/**
 * @param {?} commands
 * @return {?}
 */
function getOutlets(commands) {
    if (!(typeof commands[0] === 'object'))
        return _a = {}, _a[PRIMARY_OUTLET] = commands, _a;
    if (commands[0].outlets === undefined)
        return _b = {}, _b[PRIMARY_OUTLET] = commands, _b;
    return commands[0].outlets;
    var _a, _b;
}
/**
 * @param {?} segmentGroup
 * @param {?} startIndex
 * @param {?} commands
 * @return {?}
 */
function updateSegmentGroup(segmentGroup, startIndex, commands) {
    if (!segmentGroup) {
        segmentGroup = new UrlSegmentGroup([], {});
    }
    if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
        return updateSegmentGroupChildren(segmentGroup, startIndex, commands);
    }
    var /** @type {?} */ m = prefixedWith(segmentGroup, startIndex, commands);
    var /** @type {?} */ slicedCommands = commands.slice(m.commandIndex);
    if (m.match && m.pathIndex < segmentGroup.segments.length) {
        var /** @type {?} */ g = new UrlSegmentGroup(segmentGroup.segments.slice(0, m.pathIndex), {});
        g.children[PRIMARY_OUTLET] =
            new UrlSegmentGroup(segmentGroup.segments.slice(m.pathIndex), segmentGroup.children);
        return updateSegmentGroupChildren(g, 0, slicedCommands);
    }
    else if (m.match && slicedCommands.length === 0) {
        return new UrlSegmentGroup(segmentGroup.segments, {});
    }
    else if (m.match && !segmentGroup.hasChildren()) {
        return createNewSegmentGroup(segmentGroup, startIndex, commands);
    }
    else if (m.match) {
        return updateSegmentGroupChildren(segmentGroup, 0, slicedCommands);
    }
    else {
        return createNewSegmentGroup(segmentGroup, startIndex, commands);
    }
}
/**
 * @param {?} segmentGroup
 * @param {?} startIndex
 * @param {?} commands
 * @return {?}
 */
function updateSegmentGroupChildren(segmentGroup, startIndex, commands) {
    if (commands.length === 0) {
        return new UrlSegmentGroup(segmentGroup.segments, {});
    }
    else {
        var /** @type {?} */ outlets_2 = getOutlets(commands);
        var /** @type {?} */ children_2 = {};
        forEach(outlets_2, function (commands, outlet) {
            if (commands !== null) {
                children_2[outlet] = updateSegmentGroup(segmentGroup.children[outlet], startIndex, commands);
            }
        });
        forEach(segmentGroup.children, function (child, childOutlet) {
            if (outlets_2[childOutlet] === undefined) {
                children_2[childOutlet] = child;
            }
        });
        return new UrlSegmentGroup(segmentGroup.segments, children_2);
    }
}
/**
 * @param {?} segmentGroup
 * @param {?} startIndex
 * @param {?} commands
 * @return {?}
 */
function prefixedWith(segmentGroup, startIndex, commands) {
    var /** @type {?} */ currentCommandIndex = 0;
    var /** @type {?} */ currentPathIndex = startIndex;
    var /** @type {?} */ noMatch = { match: false, pathIndex: 0, commandIndex: 0 };
    while (currentPathIndex < segmentGroup.segments.length) {
        if (currentCommandIndex >= commands.length)
            return noMatch;
        var /** @type {?} */ path = segmentGroup.segments[currentPathIndex];
        var /** @type {?} */ curr = getPath(commands[currentCommandIndex]);
        var /** @type {?} */ next = currentCommandIndex < commands.length - 1 ? commands[currentCommandIndex + 1] : null;
        if (currentPathIndex > 0 && curr === undefined)
            break;
        if (curr && next && (typeof next === 'object') && next.outlets === undefined) {
            if (!compare(curr, next, path))
                return noMatch;
            currentCommandIndex += 2;
        }
        else {
            if (!compare(curr, {}, path))
                return noMatch;
            currentCommandIndex++;
        }
        currentPathIndex++;
    }
    return { match: true, pathIndex: currentPathIndex, commandIndex: currentCommandIndex };
}
/**
 * @param {?} segmentGroup
 * @param {?} startIndex
 * @param {?} commands
 * @return {?}
 */
function createNewSegmentGroup(segmentGroup, startIndex, commands) {
    var /** @type {?} */ paths = segmentGroup.segments.slice(0, startIndex);
    var /** @type {?} */ i = 0;
    while (i < commands.length) {
        if (typeof commands[i] === 'object' && commands[i].outlets !== undefined) {
            var /** @type {?} */ children = createNewSegmentChildren(commands[i].outlets);
            return new UrlSegmentGroup(paths, children);
        }
        // if we start with an object literal, we need to reuse the path part from the segment
        if (i === 0 && isMatrixParams(commands[0])) {
            var /** @type {?} */ p = segmentGroup.segments[startIndex];
            paths.push(new UrlSegment(p.path, commands[0]));
            i++;
            continue;
        }
        var /** @type {?} */ curr = getPath(commands[i]);
        var /** @type {?} */ next = (i < commands.length - 1) ? commands[i + 1] : null;
        if (curr && next && isMatrixParams(next)) {
            paths.push(new UrlSegment(curr, stringify(next)));
            i += 2;
        }
        else {
            paths.push(new UrlSegment(curr, {}));
            i++;
        }
    }
    return new UrlSegmentGroup(paths, {});
}
/**
 * @param {?} outlets
 * @return {?}
 */
function createNewSegmentChildren(outlets) {
    var /** @type {?} */ children = {};
    forEach(outlets, function (commands, outlet) {
        if (commands !== null) {
            children[outlet] = createNewSegmentGroup(new UrlSegmentGroup([], {}), 0, commands);
        }
    });
    return children;
}
/**
 * @param {?} params
 * @return {?}
 */
function stringify(params) {
    var /** @type {?} */ res = {};
    forEach(params, function (v, k) { return res[k] = "" + v; });
    return res;
}
/**
 * @param {?} path
 * @param {?} params
 * @param {?} segment
 * @return {?}
 */
function compare(path, params, segment) {
    return path == segment.path && shallowEqual(params, segment.parameters);
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var NoMatch$1 = (function () {
    function NoMatch$1() {
    }
    return NoMatch$1;
}());
/**
 * @param {?} rootComponentType
 * @param {?} config
 * @param {?} urlTree
 * @param {?} url
 * @return {?}
 */
function recognize(rootComponentType, config, urlTree, url) {
    return new Recognizer(rootComponentType, config, urlTree, url).recognize();
}
var Recognizer = (function () {
    /**
     * @param {?} rootComponentType
     * @param {?} config
     * @param {?} urlTree
     * @param {?} url
     */
    function Recognizer(rootComponentType, config, urlTree, url) {
        this.rootComponentType = rootComponentType;
        this.config = config;
        this.urlTree = urlTree;
        this.url = url;
    }
    /**
     * @return {?}
     */
    Recognizer.prototype.recognize = function () {
        try {
            var /** @type {?} */ rootSegmentGroup = split$1(this.urlTree.root, [], [], this.config).segmentGroup;
            var /** @type {?} */ children = this.processSegmentGroup(this.config, rootSegmentGroup, PRIMARY_OUTLET);
            var /** @type {?} */ root = new ActivatedRouteSnapshot([], Object.freeze({}), Object.freeze(this.urlTree.queryParams), /** @type {?} */ ((this.urlTree.fragment)), {}, PRIMARY_OUTLET, this.rootComponentType, null, this.urlTree.root, -1, {});
            var /** @type {?} */ rootNode = new TreeNode(root, children);
            var /** @type {?} */ routeState = new RouterStateSnapshot(this.url, rootNode);
            this.inheritParamsAndData(routeState._root);
            return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(routeState);
        }
        catch (e) {
            return new __WEBPACK_IMPORTED_MODULE_14_rxjs_Observable__["Observable"](function (obs) { return obs.error(e); });
        }
    };
    /**
     * @param {?} routeNode
     * @return {?}
     */
    Recognizer.prototype.inheritParamsAndData = function (routeNode) {
        var _this = this;
        var /** @type {?} */ route = routeNode.value;
        var /** @type {?} */ i = inheritedParamsDataResolve(route);
        route.params = Object.freeze(i.params);
        route.data = Object.freeze(i.data);
        routeNode.children.forEach(function (n) { return _this.inheritParamsAndData(n); });
    };
    /**
     * @param {?} config
     * @param {?} segmentGroup
     * @param {?} outlet
     * @return {?}
     */
    Recognizer.prototype.processSegmentGroup = function (config, segmentGroup, outlet) {
        if (segmentGroup.segments.length === 0 && segmentGroup.hasChildren()) {
            return this.processChildren(config, segmentGroup);
        }
        return this.processSegment(config, segmentGroup, segmentGroup.segments, outlet);
    };
    /**
     * @param {?} config
     * @param {?} segmentGroup
     * @return {?}
     */
    Recognizer.prototype.processChildren = function (config, segmentGroup) {
        var _this = this;
        var /** @type {?} */ children = mapChildrenIntoArray(segmentGroup, function (child, childOutlet) { return _this.processSegmentGroup(config, child, childOutlet); });
        checkOutletNameUniqueness(children);
        sortActivatedRouteSnapshots(children);
        return children;
    };
    /**
     * @param {?} config
     * @param {?} segmentGroup
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    Recognizer.prototype.processSegment = function (config, segmentGroup, segments, outlet) {
        for (var _i = 0, config_1 = config; _i < config_1.length; _i++) {
            var r = config_1[_i];
            try {
                return this.processSegmentAgainstRoute(r, segmentGroup, segments, outlet);
            }
            catch (e) {
                if (!(e instanceof NoMatch$1))
                    throw e;
            }
        }
        if (this.noLeftoversInUrl(segmentGroup, segments, outlet)) {
            return [];
        }
        throw new NoMatch$1();
    };
    /**
     * @param {?} segmentGroup
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    Recognizer.prototype.noLeftoversInUrl = function (segmentGroup, segments, outlet) {
        return segments.length === 0 && !segmentGroup.children[outlet];
    };
    /**
     * @param {?} route
     * @param {?} rawSegment
     * @param {?} segments
     * @param {?} outlet
     * @return {?}
     */
    Recognizer.prototype.processSegmentAgainstRoute = function (route, rawSegment, segments, outlet) {
        if (route.redirectTo)
            throw new NoMatch$1();
        if ((route.outlet || PRIMARY_OUTLET) !== outlet)
            throw new NoMatch$1();
        if (route.path === '**') {
            var /** @type {?} */ params = segments.length > 0 ? ((last$1(segments))).parameters : {};
            var /** @type {?} */ snapshot_1 = new ActivatedRouteSnapshot(segments, params, Object.freeze(this.urlTree.queryParams), /** @type {?} */ ((this.urlTree.fragment)), getData(route), outlet, /** @type {?} */ ((route.component)), route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + segments.length, getResolve(route));
            return [new TreeNode(snapshot_1, [])];
        }
        var _a = match$1(rawSegment, route, segments), consumedSegments = _a.consumedSegments, parameters = _a.parameters, lastChild = _a.lastChild;
        var /** @type {?} */ rawSlicedSegments = segments.slice(lastChild);
        var /** @type {?} */ childConfig = getChildConfig(route);
        var _b = split$1(rawSegment, consumedSegments, rawSlicedSegments, childConfig), segmentGroup = _b.segmentGroup, slicedSegments = _b.slicedSegments;
        var /** @type {?} */ snapshot = new ActivatedRouteSnapshot(consumedSegments, parameters, Object.freeze(this.urlTree.queryParams), /** @type {?} */ ((this.urlTree.fragment)), getData(route), outlet, /** @type {?} */ ((route.component)), route, getSourceSegmentGroup(rawSegment), getPathIndexShift(rawSegment) + consumedSegments.length, getResolve(route));
        if (slicedSegments.length === 0 && segmentGroup.hasChildren()) {
            var /** @type {?} */ children_3 = this.processChildren(childConfig, segmentGroup);
            return [new TreeNode(snapshot, children_3)];
        }
        if (childConfig.length === 0 && slicedSegments.length === 0) {
            return [new TreeNode(snapshot, [])];
        }
        var /** @type {?} */ children = this.processSegment(childConfig, segmentGroup, slicedSegments, PRIMARY_OUTLET);
        return [new TreeNode(snapshot, children)];
    };
    return Recognizer;
}());
/**
 * @param {?} nodes
 * @return {?}
 */
function sortActivatedRouteSnapshots(nodes) {
    nodes.sort(function (a, b) {
        if (a.value.outlet === PRIMARY_OUTLET)
            return -1;
        if (b.value.outlet === PRIMARY_OUTLET)
            return 1;
        return a.value.outlet.localeCompare(b.value.outlet);
    });
}
/**
 * @param {?} route
 * @return {?}
 */
function getChildConfig(route) {
    if (route.children) {
        return route.children;
    }
    if (route.loadChildren) {
        return ((route._loadedConfig)).routes;
    }
    return [];
}
/**
 * @param {?} segmentGroup
 * @param {?} route
 * @param {?} segments
 * @return {?}
 */
function match$1(segmentGroup, route, segments) {
    if (route.path === '') {
        if (route.pathMatch === 'full' && (segmentGroup.hasChildren() || segments.length > 0)) {
            throw new NoMatch$1();
        }
        return { consumedSegments: [], lastChild: 0, parameters: {} };
    }
    var /** @type {?} */ matcher = route.matcher || defaultUrlMatcher;
    var /** @type {?} */ res = matcher(segments, segmentGroup, route);
    if (!res)
        throw new NoMatch$1();
    var /** @type {?} */ posParams = {};
    forEach(/** @type {?} */ ((res.posParams)), function (v, k) { posParams[k] = v.path; });
    var /** @type {?} */ parameters = res.consumed.length > 0 ? Object.assign({}, posParams, res.consumed[res.consumed.length - 1].parameters) :
        posParams;
    return { consumedSegments: res.consumed, lastChild: res.consumed.length, parameters: parameters };
}
/**
 * @param {?} nodes
 * @return {?}
 */
function checkOutletNameUniqueness(nodes) {
    var /** @type {?} */ names = {};
    nodes.forEach(function (n) {
        var /** @type {?} */ routeWithSameOutletName = names[n.value.outlet];
        if (routeWithSameOutletName) {
            var /** @type {?} */ p = routeWithSameOutletName.url.map(function (s) { return s.toString(); }).join('/');
            var /** @type {?} */ c = n.value.url.map(function (s) { return s.toString(); }).join('/');
            throw new Error("Two segments cannot have the same outlet name: '" + p + "' and '" + c + "'.");
        }
        names[n.value.outlet] = n.value;
    });
}
/**
 * @param {?} segmentGroup
 * @return {?}
 */
function getSourceSegmentGroup(segmentGroup) {
    var /** @type {?} */ s = segmentGroup;
    while (s._sourceSegment) {
        s = s._sourceSegment;
    }
    return s;
}
/**
 * @param {?} segmentGroup
 * @return {?}
 */
function getPathIndexShift(segmentGroup) {
    var /** @type {?} */ s = segmentGroup;
    var /** @type {?} */ res = (s._segmentIndexShift ? s._segmentIndexShift : 0);
    while (s._sourceSegment) {
        s = s._sourceSegment;
        res += (s._segmentIndexShift ? s._segmentIndexShift : 0);
    }
    return res - 1;
}
/**
 * @param {?} segmentGroup
 * @param {?} consumedSegments
 * @param {?} slicedSegments
 * @param {?} config
 * @return {?}
 */
function split$1(segmentGroup, consumedSegments, slicedSegments, config) {
    if (slicedSegments.length > 0 &&
        containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, config)) {
        var /** @type {?} */ s_1 = new UrlSegmentGroup(consumedSegments, createChildrenForEmptyPaths(segmentGroup, consumedSegments, config, new UrlSegmentGroup(slicedSegments, segmentGroup.children)));
        s_1._sourceSegment = segmentGroup;
        s_1._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s_1, slicedSegments: [] };
    }
    if (slicedSegments.length === 0 &&
        containsEmptyPathMatches(segmentGroup, slicedSegments, config)) {
        var /** @type {?} */ s_2 = new UrlSegmentGroup(segmentGroup.segments, addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, config, segmentGroup.children));
        s_2._sourceSegment = segmentGroup;
        s_2._segmentIndexShift = consumedSegments.length;
        return { segmentGroup: s_2, slicedSegments: slicedSegments };
    }
    var /** @type {?} */ s = new UrlSegmentGroup(segmentGroup.segments, segmentGroup.children);
    s._sourceSegment = segmentGroup;
    s._segmentIndexShift = consumedSegments.length;
    return { segmentGroup: s, slicedSegments: slicedSegments };
}
/**
 * @param {?} segmentGroup
 * @param {?} slicedSegments
 * @param {?} routes
 * @param {?} children
 * @return {?}
 */
function addEmptyPathsToChildrenIfNeeded(segmentGroup, slicedSegments, routes, children) {
    var /** @type {?} */ res = {};
    for (var _i = 0, routes_3 = routes; _i < routes_3.length; _i++) {
        var r = routes_3[_i];
        if (emptyPathMatch(segmentGroup, slicedSegments, r) && !children[getOutlet$1(r)]) {
            var /** @type {?} */ s = new UrlSegmentGroup([], {});
            s._sourceSegment = segmentGroup;
            s._segmentIndexShift = segmentGroup.segments.length;
            res[getOutlet$1(r)] = s;
        }
    }
    return Object.assign({}, children, res);
}
/**
 * @param {?} segmentGroup
 * @param {?} consumedSegments
 * @param {?} routes
 * @param {?} primarySegment
 * @return {?}
 */
function createChildrenForEmptyPaths(segmentGroup, consumedSegments, routes, primarySegment) {
    var /** @type {?} */ res = {};
    res[PRIMARY_OUTLET] = primarySegment;
    primarySegment._sourceSegment = segmentGroup;
    primarySegment._segmentIndexShift = consumedSegments.length;
    for (var _i = 0, routes_4 = routes; _i < routes_4.length; _i++) {
        var r = routes_4[_i];
        if (r.path === '' && getOutlet$1(r) !== PRIMARY_OUTLET) {
            var /** @type {?} */ s = new UrlSegmentGroup([], {});
            s._sourceSegment = segmentGroup;
            s._segmentIndexShift = consumedSegments.length;
            res[getOutlet$1(r)] = s;
        }
    }
    return res;
}
/**
 * @param {?} segmentGroup
 * @param {?} slicedSegments
 * @param {?} routes
 * @return {?}
 */
function containsEmptyPathMatchesWithNamedOutlets(segmentGroup, slicedSegments, routes) {
    return routes.some(function (r) { return emptyPathMatch(segmentGroup, slicedSegments, r) && getOutlet$1(r) !== PRIMARY_OUTLET; });
}
/**
 * @param {?} segmentGroup
 * @param {?} slicedSegments
 * @param {?} routes
 * @return {?}
 */
function containsEmptyPathMatches(segmentGroup, slicedSegments, routes) {
    return routes.some(function (r) { return emptyPathMatch(segmentGroup, slicedSegments, r); });
}
/**
 * @param {?} segmentGroup
 * @param {?} slicedSegments
 * @param {?} r
 * @return {?}
 */
function emptyPathMatch(segmentGroup, slicedSegments, r) {
    if ((segmentGroup.hasChildren() || slicedSegments.length > 0) && r.pathMatch === 'full') {
        return false;
    }
    return r.path === '' && r.redirectTo === undefined;
}
/**
 * @param {?} route
 * @return {?}
 */
function getOutlet$1(route) {
    return route.outlet || PRIMARY_OUTLET;
}
/**
 * @param {?} route
 * @return {?}
 */
function getData(route) {
    return route.data || {};
}
/**
 * @param {?} route
 * @return {?}
 */
function getResolve(route) {
    return route.resolve || {};
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Provides a way to customize when activated routes get reused.
 *
 * \@experimental
 * @abstract
 */
var RouteReuseStrategy = (function () {
    function RouteReuseStrategy() {
    }
    /**
     * Determines if this route (and its subtree) should be detached to be reused later
     * @abstract
     * @param {?} route
     * @return {?}
     */
    RouteReuseStrategy.prototype.shouldDetach = function (route) { };
    /**
     * Stores the detached route.
     *
     * Storing a `null` value should erase the previously stored value.
     * @abstract
     * @param {?} route
     * @param {?} handle
     * @return {?}
     */
    RouteReuseStrategy.prototype.store = function (route, handle) { };
    /**
     * Determines if this route (and its subtree) should be reattached
     * @abstract
     * @param {?} route
     * @return {?}
     */
    RouteReuseStrategy.prototype.shouldAttach = function (route) { };
    /**
     * Retrieves the previously stored route
     * @abstract
     * @param {?} route
     * @return {?}
     */
    RouteReuseStrategy.prototype.retrieve = function (route) { };
    /**
     * Determines if a route should be reused
     * @abstract
     * @param {?} future
     * @param {?} curr
     * @return {?}
     */
    RouteReuseStrategy.prototype.shouldReuseRoute = function (future, curr) { };
    return RouteReuseStrategy;
}());
/**
 * Does not detach any subtrees. Reuses routes as long as their route config is the same.
 */
var DefaultRouteReuseStrategy = (function () {
    function DefaultRouteReuseStrategy() {
    }
    /**
     * @param {?} route
     * @return {?}
     */
    DefaultRouteReuseStrategy.prototype.shouldDetach = function (route) { return false; };
    /**
     * @param {?} route
     * @param {?} detachedTree
     * @return {?}
     */
    DefaultRouteReuseStrategy.prototype.store = function (route, detachedTree) { };
    /**
     * @param {?} route
     * @return {?}
     */
    DefaultRouteReuseStrategy.prototype.shouldAttach = function (route) { return false; };
    /**
     * @param {?} route
     * @return {?}
     */
    DefaultRouteReuseStrategy.prototype.retrieve = function (route) { return null; };
    /**
     * @param {?} future
     * @param {?} curr
     * @return {?}
     */
    DefaultRouteReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        return future.routeConfig === curr.routeConfig;
    };
    return DefaultRouteReuseStrategy;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@docsNotRequired
 * \@experimental
 */
var ROUTES = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["D" /* InjectionToken */]('ROUTES');
var RouterConfigLoader = (function () {
    /**
     * @param {?} loader
     * @param {?} compiler
     * @param {?=} onLoadStartListener
     * @param {?=} onLoadEndListener
     */
    function RouterConfigLoader(loader, compiler, onLoadStartListener, onLoadEndListener) {
        this.loader = loader;
        this.compiler = compiler;
        this.onLoadStartListener = onLoadStartListener;
        this.onLoadEndListener = onLoadEndListener;
    }
    /**
     * @param {?} parentInjector
     * @param {?} route
     * @return {?}
     */
    RouterConfigLoader.prototype.load = function (parentInjector, route) {
        var _this = this;
        if (this.onLoadStartListener) {
            this.onLoadStartListener(route);
        }
        var /** @type {?} */ moduleFactory$ = this.loadModuleFactory(/** @type {?} */ ((route.loadChildren)));
        return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(moduleFactory$, function (factory) {
            if (_this.onLoadEndListener) {
                _this.onLoadEndListener(route);
            }
            var /** @type {?} */ module = factory.create(parentInjector);
            return new LoadedRouterConfig(flatten(module.injector.get(ROUTES)), module);
        });
    };
    /**
     * @param {?} loadChildren
     * @return {?}
     */
    RouterConfigLoader.prototype.loadModuleFactory = function (loadChildren) {
        var _this = this;
        if (typeof loadChildren === 'string') {
            return Object(__WEBPACK_IMPORTED_MODULE_18_rxjs_observable_fromPromise__["fromPromise"])(this.loader.load(loadChildren));
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(wrapIntoObservable(loadChildren()), function (t) {
                if (t instanceof __WEBPACK_IMPORTED_MODULE_2__angular_core__["N" /* NgModuleFactory */]) {
                    return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(t);
                }
                else {
                    return Object(__WEBPACK_IMPORTED_MODULE_18_rxjs_observable_fromPromise__["fromPromise"])(_this.compiler.compileModuleAsync(t));
                }
            });
        }
    };
    return RouterConfigLoader;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Provides a way to migrate AngularJS applications to Angular.
 *
 * \@experimental
 * @abstract
 */
var UrlHandlingStrategy = (function () {
    function UrlHandlingStrategy() {
    }
    /**
     * Tells the router if this URL should be processed.
     *
     * When it returns true, the router will execute the regular navigation.
     * When it returns false, the router will set the router state to an empty state.
     * As a result, all the active components will be destroyed.
     *
     * @abstract
     * @param {?} url
     * @return {?}
     */
    UrlHandlingStrategy.prototype.shouldProcessUrl = function (url) { };
    /**
     * Extracts the part of the URL that should be handled by the router.
     * The rest of the URL will remain untouched.
     * @abstract
     * @param {?} url
     * @return {?}
     */
    UrlHandlingStrategy.prototype.extract = function (url) { };
    /**
     * Merges the URL fragment with the rest of the URL.
     * @abstract
     * @param {?} newUrlPart
     * @param {?} rawUrl
     * @return {?}
     */
    UrlHandlingStrategy.prototype.merge = function (newUrlPart, rawUrl) { };
    return UrlHandlingStrategy;
}());
/**
 * \@experimental
 */
var DefaultUrlHandlingStrategy = (function () {
    function DefaultUrlHandlingStrategy() {
    }
    /**
     * @param {?} url
     * @return {?}
     */
    DefaultUrlHandlingStrategy.prototype.shouldProcessUrl = function (url) { return true; };
    /**
     * @param {?} url
     * @return {?}
     */
    DefaultUrlHandlingStrategy.prototype.extract = function (url) { return url; };
    /**
     * @param {?} newUrlPart
     * @param {?} wholeUrl
     * @return {?}
     */
    DefaultUrlHandlingStrategy.prototype.merge = function (newUrlPart, wholeUrl) { return newUrlPart; };
    return DefaultUrlHandlingStrategy;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @param {?} error
 * @return {?}
 */
function defaultErrorHandler(error) {
    throw error;
}
/**
 * \@internal
 * @param {?} snapshot
 * @return {?}
 */
function defaultRouterHook(snapshot) {
    return (Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(null));
}
/**
 * \@whatItDoes Provides the navigation and url manipulation capabilities.
 *
 * See {\@link Routes} for more details and examples.
 *
 * \@ngModule RouterModule
 *
 * \@stable
 */
var Router = (function () {
    /**
     * @param {?} rootComponentType
     * @param {?} urlSerializer
     * @param {?} rootContexts
     * @param {?} location
     * @param {?} injector
     * @param {?} loader
     * @param {?} compiler
     * @param {?} config
     */
    function Router(rootComponentType, urlSerializer, rootContexts, location, injector, loader, compiler, config) {
        var _this = this;
        this.rootComponentType = rootComponentType;
        this.urlSerializer = urlSerializer;
        this.rootContexts = rootContexts;
        this.location = location;
        this.config = config;
        this.navigations = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](/** @type {?} */ ((null)));
        this.routerEvents = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.navigationId = 0;
        /**
         * Error handler that is invoked when a navigation errors.
         *
         * See {\@link ErrorHandler} for more information.
         */
        this.errorHandler = defaultErrorHandler;
        /**
         * Indicates if at least one navigation happened.
         */
        this.navigated = false;
        /**
         * Used by RouterModule. This allows us to
         * pause the navigation either before preactivation or after it.
         * \@internal
         */
        this.hooks = {
            beforePreactivation: defaultRouterHook,
            afterPreactivation: defaultRouterHook
        };
        /**
         * Extracts and merges URLs. Used for AngularJS to Angular migrations.
         */
        this.urlHandlingStrategy = new DefaultUrlHandlingStrategy();
        this.routeReuseStrategy = new DefaultRouteReuseStrategy();
        var onLoadStart = function (r) { return _this.triggerEvent(new RouteConfigLoadStart(r)); };
        var onLoadEnd = function (r) { return _this.triggerEvent(new RouteConfigLoadEnd(r)); };
        this.ngModule = injector.get(__WEBPACK_IMPORTED_MODULE_2__angular_core__["P" /* NgModuleRef */]);
        this.resetConfig(config);
        this.currentUrlTree = createEmptyUrlTree();
        this.rawUrlTree = this.currentUrlTree;
        this.configLoader = new RouterConfigLoader(loader, compiler, onLoadStart, onLoadEnd);
        this.currentRouterState = createEmptyState(this.currentUrlTree, this.rootComponentType);
        this.processNavigations();
    }
    /**
     * \@internal
     * TODO: this should be removed once the constructor of the router made internal
     * @param {?} rootComponentType
     * @return {?}
     */
    Router.prototype.resetRootComponentType = function (rootComponentType) {
        this.rootComponentType = rootComponentType;
        // TODO: vsavkin router 4.0 should make the root component set to null
        // this will simplify the lifecycle of the router.
        this.currentRouterState.root.component = this.rootComponentType;
    };
    /**
     * Sets up the location change listener and performs the initial navigation.
     * @return {?}
     */
    Router.prototype.initialNavigation = function () {
        this.setUpLocationChangeListener();
        if (this.navigationId === 0) {
            this.navigateByUrl(this.location.path(true), { replaceUrl: true });
        }
    };
    /**
     * Sets up the location change listener.
     * @return {?}
     */
    Router.prototype.setUpLocationChangeListener = function () {
        var _this = this;
        // Zone.current.wrap is needed because of the issue with RxJS scheduler,
        // which does not work properly with zone.js in IE and Safari
        if (!this.locationSubscription) {
            this.locationSubscription = (this.location.subscribe(Zone.current.wrap(function (change) {
                var /** @type {?} */ rawUrlTree = _this.urlSerializer.parse(change['url']);
                var /** @type {?} */ source = change['type'] === 'popstate' ? 'popstate' : 'hashchange';
                setTimeout(function () { _this.scheduleNavigation(rawUrlTree, source, { replaceUrl: true }); }, 0);
            })));
        }
    };
    Object.defineProperty(Router.prototype, "routerState", {
        /**
         * The current route state
         * @return {?}
         */
        get: function () { return this.currentRouterState; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "url", {
        /**
         * The current url
         * @return {?}
         */
        get: function () { return this.serializeUrl(this.currentUrlTree); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Router.prototype, "events", {
        /**
         * An observable of router events
         * @return {?}
         */
        get: function () { return this.routerEvents; },
        enumerable: true,
        configurable: true
    });
    /**
     * \@internal
     * @param {?} e
     * @return {?}
     */
    Router.prototype.triggerEvent = function (e) { this.routerEvents.next(e); };
    /**
     * Resets the configuration used for navigation and generating links.
     *
     * ### Usage
     *
     * ```
     * router.resetConfig([
     *  { path: 'team/:id', component: TeamCmp, children: [
     *    { path: 'simple', component: SimpleCmp },
     *    { path: 'user/:name', component: UserCmp }
     *  ]}
     * ]);
     * ```
     * @param {?} config
     * @return {?}
     */
    Router.prototype.resetConfig = function (config) {
        validateConfig(config);
        this.config = config;
        this.navigated = false;
    };
    /**
     * \@docsNotRequired
     * @return {?}
     */
    Router.prototype.ngOnDestroy = function () { this.dispose(); };
    /**
     * Disposes of the router
     * @return {?}
     */
    Router.prototype.dispose = function () {
        if (this.locationSubscription) {
            this.locationSubscription.unsubscribe();
            this.locationSubscription = ((null));
        }
    };
    /**
     * Applies an array of commands to the current url tree and creates a new url tree.
     *
     * When given an activate route, applies the given commands starting from the route.
     * When not given a route, applies the given command starting from the root.
     *
     * ### Usage
     *
     * ```
     * // create /team/33/user/11
     * router.createUrlTree(['/team', 33, 'user', 11]);
     *
     * // create /team/33;expand=true/user/11
     * router.createUrlTree(['/team', 33, {expand: true}, 'user', 11]);
     *
     * // you can collapse static segments like this (this works only with the first passed-in value):
     * router.createUrlTree(['/team/33/user', userId]);
     *
     * // If the first segment can contain slashes, and you do not want the router to split it, you
     * // can do the following:
     *
     * router.createUrlTree([{segmentPath: '/one/two'}]);
     *
     * // create /team/33/(user/11//right:chat)
     * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: 'chat'}}]);
     *
     * // remove the right secondary node
     * router.createUrlTree(['/team', 33, {outlets: {primary: 'user/11', right: null}}]);
     *
     * // assuming the current url is `/team/33/user/11` and the route points to `user/11`
     *
     * // navigate to /team/33/user/11/details
     * router.createUrlTree(['details'], {relativeTo: route});
     *
     * // navigate to /team/33/user/22
     * router.createUrlTree(['../22'], {relativeTo: route});
     *
     * // navigate to /team/44/user/22
     * router.createUrlTree(['../../team/44/user/22'], {relativeTo: route});
     * ```
     * @param {?} commands
     * @param {?=} navigationExtras
     * @return {?}
     */
    Router.prototype.createUrlTree = function (commands, navigationExtras) {
        if (navigationExtras === void 0) { navigationExtras = {}; }
        var relativeTo = navigationExtras.relativeTo, queryParams = navigationExtras.queryParams, fragment = navigationExtras.fragment, preserveQueryParams = navigationExtras.preserveQueryParams, queryParamsHandling = navigationExtras.queryParamsHandling, preserveFragment = navigationExtras.preserveFragment;
        if (Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_25" /* isDevMode */])() && preserveQueryParams && (console) && (console.warn)) {
            console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
        }
        var /** @type {?} */ a = relativeTo || this.routerState.root;
        var /** @type {?} */ f = preserveFragment ? this.currentUrlTree.fragment : fragment;
        var /** @type {?} */ q = null;
        if (queryParamsHandling) {
            switch (queryParamsHandling) {
                case 'merge':
                    q = Object.assign({}, this.currentUrlTree.queryParams, queryParams);
                    break;
                case 'preserve':
                    q = this.currentUrlTree.queryParams;
                    break;
                default:
                    q = queryParams || null;
            }
        }
        else {
            q = preserveQueryParams ? this.currentUrlTree.queryParams : queryParams || null;
        }
        return createUrlTree(a, this.currentUrlTree, commands, /** @type {?} */ ((q)), /** @type {?} */ ((f)));
    };
    /**
     * Navigate based on the provided url. This navigation is always absolute.
     *
     * Returns a promise that:
     * - resolves to 'true' when navigation succeeds,
     * - resolves to 'false' when navigation fails,
     * - is rejected when an error happens.
     *
     * ### Usage
     *
     * ```
     * router.navigateByUrl("/team/33/user/11");
     *
     * // Navigate without updating the URL
     * router.navigateByUrl("/team/33/user/11", { skipLocationChange: true });
     * ```
     *
     * In opposite to `navigate`, `navigateByUrl` takes a whole URL
     * and does not apply any delta to the current one.
     * @param {?} url
     * @param {?=} extras
     * @return {?}
     */
    Router.prototype.navigateByUrl = function (url, extras) {
        if (extras === void 0) { extras = { skipLocationChange: false }; }
        var /** @type {?} */ urlTree = url instanceof UrlTree ? url : this.parseUrl(url);
        var /** @type {?} */ mergedTree = this.urlHandlingStrategy.merge(urlTree, this.rawUrlTree);
        return this.scheduleNavigation(mergedTree, 'imperative', extras);
    };
    /**
     * Navigate based on the provided array of commands and a starting point.
     * If no starting route is provided, the navigation is absolute.
     *
     * Returns a promise that:
     * - resolves to 'true' when navigation succeeds,
     * - resolves to 'false' when navigation fails,
     * - is rejected when an error happens.
     *
     * ### Usage
     *
     * ```
     * router.navigate(['team', 33, 'user', 11], {relativeTo: route});
     *
     * // Navigate without updating the URL
     * router.navigate(['team', 33, 'user', 11], {relativeTo: route, skipLocationChange: true});
     * ```
     *
     * In opposite to `navigateByUrl`, `navigate` always takes a delta that is applied to the current
     * URL.
     * @param {?} commands
     * @param {?=} extras
     * @return {?}
     */
    Router.prototype.navigate = function (commands, extras) {
        if (extras === void 0) { extras = { skipLocationChange: false }; }
        validateCommands(commands);
        if (typeof extras.queryParams === 'object' && extras.queryParams !== null) {
            extras.queryParams = this.removeEmptyProps(extras.queryParams);
        }
        return this.navigateByUrl(this.createUrlTree(commands, extras), extras);
    };
    /**
     * Serializes a {\@link UrlTree} into a string
     * @param {?} url
     * @return {?}
     */
    Router.prototype.serializeUrl = function (url) { return this.urlSerializer.serialize(url); };
    /**
     * Parses a string into a {\@link UrlTree}
     * @param {?} url
     * @return {?}
     */
    Router.prototype.parseUrl = function (url) { return this.urlSerializer.parse(url); };
    /**
     * Returns whether the url is activated
     * @param {?} url
     * @param {?} exact
     * @return {?}
     */
    Router.prototype.isActive = function (url, exact) {
        if (url instanceof UrlTree) {
            return containsTree(this.currentUrlTree, url, exact);
        }
        var /** @type {?} */ urlTree = this.urlSerializer.parse(url);
        return containsTree(this.currentUrlTree, urlTree, exact);
    };
    /**
     * @param {?} params
     * @return {?}
     */
    Router.prototype.removeEmptyProps = function (params) {
        return Object.keys(params).reduce(function (result, key) {
            var /** @type {?} */ value = params[key];
            if (value !== null && value !== undefined) {
                result[key] = value;
            }
            return result;
        }, {});
    };
    /**
     * @return {?}
     */
    Router.prototype.processNavigations = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_concatMap__["concatMap"]
            .call(this.navigations, function (nav) {
            if (nav) {
                _this.executeScheduledNavigation(nav);
                // a failed navigation should not stop the router from processing
                // further navigations => the catch
                return nav.promise.catch(function () { });
            }
            else {
                return (Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(null));
            }
        })
            .subscribe(function () { });
    };
    /**
     * @param {?} rawUrl
     * @param {?} source
     * @param {?} extras
     * @return {?}
     */
    Router.prototype.scheduleNavigation = function (rawUrl, source, extras) {
        var /** @type {?} */ lastNavigation = this.navigations.value;
        // If the user triggers a navigation imperatively (e.g., by using navigateByUrl),
        // and that navigation results in 'replaceState' that leads to the same URL,
        // we should skip those.
        if (lastNavigation && source !== 'imperative' && lastNavigation.source === 'imperative' &&
            lastNavigation.rawUrl.toString() === rawUrl.toString()) {
            return Promise.resolve(true); // return value is not used
        }
        // Because of a bug in IE and Edge, the location class fires two events (popstate and
        // hashchange) every single time. The second one should be ignored. Otherwise, the URL will
        // flicker.
        if (lastNavigation && source == 'hashchange' && lastNavigation.source === 'popstate' &&
            lastNavigation.rawUrl.toString() === rawUrl.toString()) {
            return Promise.resolve(true); // return value is not used
        }
        var /** @type {?} */ resolve = null;
        var /** @type {?} */ reject = null;
        var /** @type {?} */ promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        });
        var /** @type {?} */ id = ++this.navigationId;
        this.navigations.next({ id: id, source: source, rawUrl: rawUrl, extras: extras, resolve: resolve, reject: reject, promise: promise });
        // Make sure that the error is propagated even though `processNavigations` catch
        // handler does not rethrow
        return promise.catch(function (e) { return Promise.reject(e); });
    };
    /**
     * @param {?} __0
     * @return {?}
     */
    Router.prototype.executeScheduledNavigation = function (_a) {
        var _this = this;
        var id = _a.id, rawUrl = _a.rawUrl, extras = _a.extras, resolve = _a.resolve, reject = _a.reject;
        var /** @type {?} */ url = this.urlHandlingStrategy.extract(rawUrl);
        var /** @type {?} */ urlTransition = !this.navigated || url.toString() !== this.currentUrlTree.toString();
        if (urlTransition && this.urlHandlingStrategy.shouldProcessUrl(rawUrl)) {
            this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
            Promise.resolve()
                .then(function (_) { return _this.runNavigate(url, rawUrl, !!extras.skipLocationChange, !!extras.replaceUrl, id, null); })
                .then(resolve, reject);
            // we cannot process the current URL, but we could process the previous one =>
            // we need to do some cleanup
        }
        else if (urlTransition && this.rawUrlTree &&
            this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)) {
            this.routerEvents.next(new NavigationStart(id, this.serializeUrl(url)));
            Promise.resolve()
                .then(function (_) { return _this.runNavigate(url, rawUrl, false, false, id, createEmptyState(url, _this.rootComponentType).snapshot); })
                .then(resolve, reject);
        }
        else {
            this.rawUrlTree = rawUrl;
            resolve(null);
        }
    };
    /**
     * @param {?} url
     * @param {?} rawUrl
     * @param {?} shouldPreventPushState
     * @param {?} shouldReplaceUrl
     * @param {?} id
     * @param {?} precreatedState
     * @return {?}
     */
    Router.prototype.runNavigate = function (url, rawUrl, shouldPreventPushState, shouldReplaceUrl, id, precreatedState) {
        var _this = this;
        if (id !== this.navigationId) {
            this.location.go(this.urlSerializer.serialize(this.currentUrlTree));
            this.routerEvents.next(new NavigationCancel(id, this.serializeUrl(url), "Navigation ID " + id + " is not equal to the current navigation id " + this.navigationId));
            return Promise.resolve(false);
        }
        return new Promise(function (resolvePromise, rejectPromise) {
            // create an observable of the url and route state snapshot
            // this operation do not result in any side effects
            var /** @type {?} */ urlAndSnapshot$;
            if (!precreatedState) {
                var /** @type {?} */ moduleInjector = _this.ngModule.injector;
                var /** @type {?} */ redirectsApplied$ = applyRedirects(moduleInjector, _this.configLoader, _this.urlSerializer, url, _this.config);
                urlAndSnapshot$ = __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(redirectsApplied$, function (appliedUrl) {
                    return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(recognize(_this.rootComponentType, _this.config, appliedUrl, _this.serializeUrl(appliedUrl)), function (snapshot) {
                        _this.routerEvents.next(new RoutesRecognized(id, _this.serializeUrl(url), _this.serializeUrl(appliedUrl), snapshot));
                        return { appliedUrl: appliedUrl, snapshot: snapshot };
                    });
                });
            }
            else {
                urlAndSnapshot$ = Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])({ appliedUrl: url, snapshot: precreatedState });
            }
            var /** @type {?} */ beforePreactivationDone$ = __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(urlAndSnapshot$, function (p) {
                return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(_this.hooks.beforePreactivation(p.snapshot), function () { return p; });
            });
            // run preactivation: guards and data resolvers
            var /** @type {?} */ preActivation;
            var /** @type {?} */ preactivationTraverse$ = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(beforePreactivationDone$, function (_a) {
                var appliedUrl = _a.appliedUrl, snapshot = _a.snapshot;
                var /** @type {?} */ moduleInjector = _this.ngModule.injector;
                preActivation =
                    new PreActivation(snapshot, _this.currentRouterState.snapshot, moduleInjector);
                preActivation.traverse(_this.rootContexts);
                return { appliedUrl: appliedUrl, snapshot: snapshot };
            });
            var /** @type {?} */ preactivationCheckGuards$ = __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(preactivationTraverse$, function (_a) {
                var appliedUrl = _a.appliedUrl, snapshot = _a.snapshot;
                if (_this.navigationId !== id)
                    return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(false);
                _this.triggerEvent(new GuardsCheckStart(id, _this.serializeUrl(url), appliedUrl, snapshot));
                return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(preActivation.checkGuards(), function (shouldActivate) {
                    _this.triggerEvent(new GuardsCheckEnd(id, _this.serializeUrl(url), appliedUrl, snapshot, shouldActivate));
                    return { appliedUrl: appliedUrl, snapshot: snapshot, shouldActivate: shouldActivate };
                });
            });
            var /** @type {?} */ preactivationResolveData$ = __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(preactivationCheckGuards$, function (p) {
                if (_this.navigationId !== id)
                    return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(false);
                if (p.shouldActivate && preActivation.isActivating()) {
                    _this.triggerEvent(new ResolveStart(id, _this.serializeUrl(url), p.appliedUrl, p.snapshot));
                    return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(preActivation.resolveData(), function () {
                        _this.triggerEvent(new ResolveEnd(id, _this.serializeUrl(url), p.appliedUrl, p.snapshot));
                        return p;
                    });
                }
                else {
                    return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(p);
                }
            });
            var /** @type {?} */ preactivationDone$ = __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(preactivationResolveData$, function (p) {
                return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(_this.hooks.afterPreactivation(p.snapshot), function () { return p; });
            });
            // create router state
            // this operation has side effects => route state is being affected
            var /** @type {?} */ routerState$ = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(preactivationDone$, function (_a) {
                var appliedUrl = _a.appliedUrl, snapshot = _a.snapshot, shouldActivate = _a.shouldActivate;
                if (shouldActivate) {
                    var /** @type {?} */ state = createRouterState(_this.routeReuseStrategy, snapshot, _this.currentRouterState);
                    return { appliedUrl: appliedUrl, state: state, shouldActivate: shouldActivate };
                }
                else {
                    return { appliedUrl: appliedUrl, state: null, shouldActivate: shouldActivate };
                }
            });
            // applied the new router state
            // this operation has side effects
            var /** @type {?} */ navigationIsSuccessful;
            var /** @type {?} */ storedState = _this.currentRouterState;
            var /** @type {?} */ storedUrl = _this.currentUrlTree;
            routerState$
                .forEach(function (_a) {
                var appliedUrl = _a.appliedUrl, state = _a.state, shouldActivate = _a.shouldActivate;
                if (!shouldActivate || id !== _this.navigationId) {
                    navigationIsSuccessful = false;
                    return;
                }
                _this.currentUrlTree = appliedUrl;
                _this.rawUrlTree = _this.urlHandlingStrategy.merge(_this.currentUrlTree, rawUrl);
                _this.currentRouterState = state;
                if (!shouldPreventPushState) {
                    var /** @type {?} */ path = _this.urlSerializer.serialize(_this.rawUrlTree);
                    if (_this.location.isCurrentPathEqualTo(path) || shouldReplaceUrl) {
                        _this.location.replaceState(path);
                    }
                    else {
                        _this.location.go(path);
                    }
                }
                new ActivateRoutes(_this.routeReuseStrategy, state, storedState)
                    .activate(_this.rootContexts);
                navigationIsSuccessful = true;
            })
                .then(function () {
                if (navigationIsSuccessful) {
                    _this.navigated = true;
                    _this.routerEvents.next(new NavigationEnd(id, _this.serializeUrl(url), _this.serializeUrl(_this.currentUrlTree)));
                    resolvePromise(true);
                }
                else {
                    _this.resetUrlToCurrentUrlTree();
                    _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url), ''));
                    resolvePromise(false);
                }
            }, function (e) {
                if (isNavigationCancelingError(e)) {
                    _this.resetUrlToCurrentUrlTree();
                    _this.navigated = true;
                    _this.routerEvents.next(new NavigationCancel(id, _this.serializeUrl(url), e.message));
                    resolvePromise(false);
                }
                else {
                    _this.routerEvents.next(new NavigationError(id, _this.serializeUrl(url), e));
                    try {
                        resolvePromise(_this.errorHandler(e));
                    }
                    catch (ee) {
                        rejectPromise(ee);
                    }
                }
                _this.currentRouterState = storedState;
                _this.currentUrlTree = storedUrl;
                _this.rawUrlTree = _this.urlHandlingStrategy.merge(_this.currentUrlTree, rawUrl);
                _this.location.replaceState(_this.serializeUrl(_this.rawUrlTree));
            });
        });
    };
    /**
     * @return {?}
     */
    Router.prototype.resetUrlToCurrentUrlTree = function () {
        var /** @type {?} */ path = this.urlSerializer.serialize(this.rawUrlTree);
        this.location.replaceState(path);
    };
    return Router;
}());
var CanActivate = (function () {
    /**
     * @param {?} path
     */
    function CanActivate(path) {
        this.path = path;
    }
    Object.defineProperty(CanActivate.prototype, "route", {
        /**
         * @return {?}
         */
        get: function () { return this.path[this.path.length - 1]; },
        enumerable: true,
        configurable: true
    });
    return CanActivate;
}());
var CanDeactivate = (function () {
    /**
     * @param {?} component
     * @param {?} route
     */
    function CanDeactivate(component, route) {
        this.component = component;
        this.route = route;
    }
    return CanDeactivate;
}());
var PreActivation = (function () {
    /**
     * @param {?} future
     * @param {?} curr
     * @param {?} moduleInjector
     */
    function PreActivation(future, curr, moduleInjector) {
        this.future = future;
        this.curr = curr;
        this.moduleInjector = moduleInjector;
        this.canActivateChecks = [];
        this.canDeactivateChecks = [];
    }
    /**
     * @param {?} parentContexts
     * @return {?}
     */
    PreActivation.prototype.traverse = function (parentContexts) {
        var /** @type {?} */ futureRoot = this.future._root;
        var /** @type {?} */ currRoot = this.curr ? this.curr._root : null;
        this.traverseChildRoutes(futureRoot, currRoot, parentContexts, [futureRoot.value]);
    };
    /**
     * @return {?}
     */
    PreActivation.prototype.checkGuards = function () {
        var _this = this;
        if (!this.isDeactivating() && !this.isActivating()) {
            return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(true);
        }
        var /** @type {?} */ canDeactivate$ = this.runCanDeactivateChecks();
        return __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(canDeactivate$, function (canDeactivate) { return canDeactivate ? _this.runCanActivateChecks() : Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(false); });
    };
    /**
     * @return {?}
     */
    PreActivation.prototype.resolveData = function () {
        var _this = this;
        if (!this.isActivating())
            return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(null);
        var /** @type {?} */ checks$ = Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(this.canActivateChecks);
        var /** @type {?} */ runningChecks$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_concatMap__["concatMap"].call(checks$, function (check) { return _this.runResolve(check.route); });
        return __WEBPACK_IMPORTED_MODULE_13_rxjs_operator_reduce__["reduce"].call(runningChecks$, function (_, __) { return _; });
    };
    /**
     * @return {?}
     */
    PreActivation.prototype.isDeactivating = function () { return this.canDeactivateChecks.length !== 0; };
    /**
     * @return {?}
     */
    PreActivation.prototype.isActivating = function () { return this.canActivateChecks.length !== 0; };
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} contexts
     * @param {?} futurePath
     * @return {?}
     */
    PreActivation.prototype.traverseChildRoutes = function (futureNode, currNode, contexts, futurePath) {
        var _this = this;
        var /** @type {?} */ prevChildren = nodeChildrenAsMap(currNode);
        // Process the children of the future route
        futureNode.children.forEach(function (c) {
            _this.traverseRoutes(c, prevChildren[c.value.outlet], contexts, futurePath.concat([c.value]));
            delete prevChildren[c.value.outlet];
        });
        // Process any children left from the current route (not active for the future route)
        forEach(prevChildren, function (v, k) { return _this.deactivateRouteAndItsChildren(v, /** @type {?} */ ((contexts)).getContext(k)); });
    };
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} parentContexts
     * @param {?} futurePath
     * @return {?}
     */
    PreActivation.prototype.traverseRoutes = function (futureNode, currNode, parentContexts, futurePath) {
        var /** @type {?} */ future = futureNode.value;
        var /** @type {?} */ curr = currNode ? currNode.value : null;
        var /** @type {?} */ context = parentContexts ? parentContexts.getContext(futureNode.value.outlet) : null;
        // reusing the node
        if (curr && future._routeConfig === curr._routeConfig) {
            var /** @type {?} */ shouldRunGuardsAndResolvers = this.shouldRunGuardsAndResolvers(curr, future, /** @type {?} */ ((future._routeConfig)).runGuardsAndResolvers);
            if (shouldRunGuardsAndResolvers) {
                this.canActivateChecks.push(new CanActivate(futurePath));
            }
            else {
                // we need to set the data
                future.data = curr.data;
                future._resolvedData = curr._resolvedData;
            }
            // If we have a component, we need to go through an outlet.
            if (future.component) {
                this.traverseChildRoutes(futureNode, currNode, context ? context.children : null, futurePath);
                // if we have a componentless route, we recurse but keep the same outlet map.
            }
            else {
                this.traverseChildRoutes(futureNode, currNode, parentContexts, futurePath);
            }
            if (shouldRunGuardsAndResolvers) {
                var /** @type {?} */ outlet = ((((context)).outlet));
                this.canDeactivateChecks.push(new CanDeactivate(outlet.component, curr));
            }
        }
        else {
            if (curr) {
                this.deactivateRouteAndItsChildren(currNode, context);
            }
            this.canActivateChecks.push(new CanActivate(futurePath));
            // If we have a component, we need to go through an outlet.
            if (future.component) {
                this.traverseChildRoutes(futureNode, null, context ? context.children : null, futurePath);
                // if we have a componentless route, we recurse but keep the same outlet map.
            }
            else {
                this.traverseChildRoutes(futureNode, null, parentContexts, futurePath);
            }
        }
    };
    /**
     * @param {?} curr
     * @param {?} future
     * @param {?} mode
     * @return {?}
     */
    PreActivation.prototype.shouldRunGuardsAndResolvers = function (curr, future, mode) {
        switch (mode) {
            case 'always':
                return true;
            case 'paramsOrQueryParamsChange':
                return !equalParamsAndUrlSegments(curr, future) ||
                    !shallowEqual(curr.queryParams, future.queryParams);
            case 'paramsChange':
            default:
                return !equalParamsAndUrlSegments(curr, future);
        }
    };
    /**
     * @param {?} route
     * @param {?} context
     * @return {?}
     */
    PreActivation.prototype.deactivateRouteAndItsChildren = function (route, context) {
        var _this = this;
        var /** @type {?} */ children = nodeChildrenAsMap(route);
        var /** @type {?} */ r = route.value;
        forEach(children, function (node, childName) {
            if (!r.component) {
                _this.deactivateRouteAndItsChildren(node, context);
            }
            else if (context) {
                _this.deactivateRouteAndItsChildren(node, context.children.getContext(childName));
            }
            else {
                _this.deactivateRouteAndItsChildren(node, null);
            }
        });
        if (!r.component) {
            this.canDeactivateChecks.push(new CanDeactivate(null, r));
        }
        else if (context && context.outlet && context.outlet.isActivated) {
            this.canDeactivateChecks.push(new CanDeactivate(context.outlet.component, r));
        }
        else {
            this.canDeactivateChecks.push(new CanDeactivate(null, r));
        }
    };
    /**
     * @return {?}
     */
    PreActivation.prototype.runCanDeactivateChecks = function () {
        var _this = this;
        var /** @type {?} */ checks$ = Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(this.canDeactivateChecks);
        var /** @type {?} */ runningChecks$ = __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(checks$, function (check) { return _this.runCanDeactivate(check.component, check.route); });
        return __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_every__["every"].call(runningChecks$, function (result) { return result === true; });
    };
    /**
     * @return {?}
     */
    PreActivation.prototype.runCanActivateChecks = function () {
        var _this = this;
        var /** @type {?} */ checks$ = Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(this.canActivateChecks);
        var /** @type {?} */ runningChecks$ = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_concatMap__["concatMap"].call(checks$, function (check) { return andObservables(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])([_this.runCanActivateChild(check.path), _this.runCanActivate(check.route)])); });
        return __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_every__["every"].call(runningChecks$, function (result) { return result === true; });
    };
    /**
     * @param {?} future
     * @return {?}
     */
    PreActivation.prototype.runCanActivate = function (future) {
        var _this = this;
        var /** @type {?} */ canActivate = future._routeConfig ? future._routeConfig.canActivate : null;
        if (!canActivate || canActivate.length === 0)
            return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(true);
        var /** @type {?} */ obs = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(canActivate), function (c) {
            var /** @type {?} */ guard = _this.getToken(c, future);
            var /** @type {?} */ observable;
            if (guard.canActivate) {
                observable = wrapIntoObservable(guard.canActivate(future, _this.future));
            }
            else {
                observable = wrapIntoObservable(guard(future, _this.future));
            }
            return __WEBPACK_IMPORTED_MODULE_9_rxjs_operator_first__["first"].call(observable);
        });
        return andObservables(obs);
    };
    /**
     * @param {?} path
     * @return {?}
     */
    PreActivation.prototype.runCanActivateChild = function (path) {
        var _this = this;
        var /** @type {?} */ future = path[path.length - 1];
        var /** @type {?} */ canActivateChildGuards = path.slice(0, path.length - 1)
            .reverse()
            .map(function (p) { return _this.extractCanActivateChild(p); })
            .filter(function (_) { return _ !== null; });
        return andObservables(__WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(canActivateChildGuards), function (d) {
            var /** @type {?} */ obs = __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(d.guards), function (c) {
                var /** @type {?} */ guard = _this.getToken(c, d.node);
                var /** @type {?} */ observable;
                if (guard.canActivateChild) {
                    observable = wrapIntoObservable(guard.canActivateChild(future, _this.future));
                }
                else {
                    observable = wrapIntoObservable(guard(future, _this.future));
                }
                return __WEBPACK_IMPORTED_MODULE_9_rxjs_operator_first__["first"].call(observable);
            });
            return andObservables(obs);
        }));
    };
    /**
     * @param {?} p
     * @return {?}
     */
    PreActivation.prototype.extractCanActivateChild = function (p) {
        var /** @type {?} */ canActivateChild = p._routeConfig ? p._routeConfig.canActivateChild : null;
        if (!canActivateChild || canActivateChild.length === 0)
            return null;
        return { node: p, guards: canActivateChild };
    };
    /**
     * @param {?} component
     * @param {?} curr
     * @return {?}
     */
    PreActivation.prototype.runCanDeactivate = function (component, curr) {
        var _this = this;
        var /** @type {?} */ canDeactivate = curr && curr._routeConfig ? curr._routeConfig.canDeactivate : null;
        if (!canDeactivate || canDeactivate.length === 0)
            return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(true);
        var /** @type {?} */ canDeactivate$ = __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(canDeactivate), function (c) {
            var /** @type {?} */ guard = _this.getToken(c, curr);
            var /** @type {?} */ observable;
            if (guard.canDeactivate) {
                observable =
                    wrapIntoObservable(guard.canDeactivate(component, curr, _this.curr, _this.future));
            }
            else {
                observable = wrapIntoObservable(guard(component, curr, _this.curr, _this.future));
            }
            return __WEBPACK_IMPORTED_MODULE_9_rxjs_operator_first__["first"].call(observable);
        });
        return __WEBPACK_IMPORTED_MODULE_8_rxjs_operator_every__["every"].call(canDeactivate$, function (result) { return result === true; });
    };
    /**
     * @param {?} future
     * @return {?}
     */
    PreActivation.prototype.runResolve = function (future) {
        var /** @type {?} */ resolve = future._resolve;
        return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(this.resolveNode(resolve, future), function (resolvedData) {
            future._resolvedData = resolvedData;
            future.data = Object.assign({}, future.data, inheritedParamsDataResolve(future).resolve);
            return null;
        });
    };
    /**
     * @param {?} resolve
     * @param {?} future
     * @return {?}
     */
    PreActivation.prototype.resolveNode = function (resolve, future) {
        var _this = this;
        var /** @type {?} */ keys = Object.keys(resolve);
        if (keys.length === 0) {
            return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])({});
        }
        if (keys.length === 1) {
            var /** @type {?} */ key_1 = keys[0];
            return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(this.getResolver(resolve[key_1], future), function (value) {
                return _a = {}, _a[key_1] = value, _a;
                var _a;
            });
        }
        var /** @type {?} */ data = {};
        var /** @type {?} */ runningResolvers$ = __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(keys), function (key) {
            return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(_this.getResolver(resolve[key], future), function (value) {
                data[key] = value;
                return value;
            });
        });
        return __WEBPACK_IMPORTED_MODULE_11_rxjs_operator_map__["map"].call(__WEBPACK_IMPORTED_MODULE_10_rxjs_operator_last__["last"].call(runningResolvers$), function () { return data; });
    };
    /**
     * @param {?} injectionToken
     * @param {?} future
     * @return {?}
     */
    PreActivation.prototype.getResolver = function (injectionToken, future) {
        var /** @type {?} */ resolver = this.getToken(injectionToken, future);
        return resolver.resolve ? wrapIntoObservable(resolver.resolve(future, this.future)) :
            wrapIntoObservable(resolver(future, this.future));
    };
    /**
     * @param {?} token
     * @param {?} snapshot
     * @return {?}
     */
    PreActivation.prototype.getToken = function (token, snapshot) {
        var /** @type {?} */ config = closestLoadedConfig(snapshot);
        var /** @type {?} */ injector = config ? config.module.injector : this.moduleInjector;
        return injector.get(token);
    };
    return PreActivation;
}());
var ActivateRoutes = (function () {
    /**
     * @param {?} routeReuseStrategy
     * @param {?} futureState
     * @param {?} currState
     */
    function ActivateRoutes(routeReuseStrategy, futureState, currState) {
        this.routeReuseStrategy = routeReuseStrategy;
        this.futureState = futureState;
        this.currState = currState;
    }
    /**
     * @param {?} parentContexts
     * @return {?}
     */
    ActivateRoutes.prototype.activate = function (parentContexts) {
        var /** @type {?} */ futureRoot = this.futureState._root;
        var /** @type {?} */ currRoot = this.currState ? this.currState._root : null;
        this.deactivateChildRoutes(futureRoot, currRoot, parentContexts);
        advanceActivatedRoute(this.futureState.root);
        this.activateChildRoutes(futureRoot, currRoot, parentContexts);
    };
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} contexts
     * @return {?}
     */
    ActivateRoutes.prototype.deactivateChildRoutes = function (futureNode, currNode, contexts) {
        var _this = this;
        var /** @type {?} */ children = nodeChildrenAsMap(currNode);
        // Recurse on the routes active in the future state to de-activate deeper children
        futureNode.children.forEach(function (futureChild) {
            var /** @type {?} */ childOutletName = futureChild.value.outlet;
            _this.deactivateRoutes(futureChild, children[childOutletName], contexts);
            delete children[childOutletName];
        });
        // De-activate the routes that will not be re-used
        forEach(children, function (v, childName) {
            _this.deactivateRouteAndItsChildren(v, contexts);
        });
    };
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} parentContext
     * @return {?}
     */
    ActivateRoutes.prototype.deactivateRoutes = function (futureNode, currNode, parentContext) {
        var /** @type {?} */ future = futureNode.value;
        var /** @type {?} */ curr = currNode ? currNode.value : null;
        if (future === curr) {
            // Reusing the node, check to see if the children need to be de-activated
            if (future.component) {
                // If we have a normal route, we need to go through an outlet.
                var /** @type {?} */ context = parentContext.getContext(future.outlet);
                if (context) {
                    this.deactivateChildRoutes(futureNode, currNode, context.children);
                }
            }
            else {
                // if we have a componentless route, we recurse but keep the same outlet map.
                this.deactivateChildRoutes(futureNode, currNode, parentContext);
            }
        }
        else {
            if (curr) {
                // Deactivate the current route which will not be re-used
                this.deactivateRouteAndItsChildren(currNode, parentContext);
            }
        }
    };
    /**
     * @param {?} route
     * @param {?} parentContexts
     * @return {?}
     */
    ActivateRoutes.prototype.deactivateRouteAndItsChildren = function (route, parentContexts) {
        if (this.routeReuseStrategy.shouldDetach(route.value.snapshot)) {
            this.detachAndStoreRouteSubtree(route, parentContexts);
        }
        else {
            this.deactivateRouteAndOutlet(route, parentContexts);
        }
    };
    /**
     * @param {?} route
     * @param {?} parentContexts
     * @return {?}
     */
    ActivateRoutes.prototype.detachAndStoreRouteSubtree = function (route, parentContexts) {
        var /** @type {?} */ context = parentContexts.getContext(route.value.outlet);
        if (context && context.outlet) {
            var /** @type {?} */ componentRef = context.outlet.detach();
            var /** @type {?} */ contexts = context.children.onOutletDeactivated();
            this.routeReuseStrategy.store(route.value.snapshot, { componentRef: componentRef, route: route, contexts: contexts });
        }
    };
    /**
     * @param {?} route
     * @param {?} parentContexts
     * @return {?}
     */
    ActivateRoutes.prototype.deactivateRouteAndOutlet = function (route, parentContexts) {
        var _this = this;
        var /** @type {?} */ context = parentContexts.getContext(route.value.outlet);
        if (context) {
            var /** @type {?} */ children = nodeChildrenAsMap(route);
            var /** @type {?} */ contexts_1 = route.value.component ? context.children : parentContexts;
            forEach(children, function (v, k) { return _this.deactivateRouteAndItsChildren(v, contexts_1); });
            if (context.outlet) {
                // Destroy the component
                context.outlet.deactivate();
                // Destroy the contexts for all the outlets that were in the component
                context.children.onOutletDeactivated();
            }
        }
    };
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} contexts
     * @return {?}
     */
    ActivateRoutes.prototype.activateChildRoutes = function (futureNode, currNode, contexts) {
        var _this = this;
        var /** @type {?} */ children = nodeChildrenAsMap(currNode);
        futureNode.children.forEach(function (c) { _this.activateRoutes(c, children[c.value.outlet], contexts); });
    };
    /**
     * @param {?} futureNode
     * @param {?} currNode
     * @param {?} parentContexts
     * @return {?}
     */
    ActivateRoutes.prototype.activateRoutes = function (futureNode, currNode, parentContexts) {
        var /** @type {?} */ future = futureNode.value;
        var /** @type {?} */ curr = currNode ? currNode.value : null;
        advanceActivatedRoute(future);
        // reusing the node
        if (future === curr) {
            if (future.component) {
                // If we have a normal route, we need to go through an outlet.
                var /** @type {?} */ context = parentContexts.getOrCreateContext(future.outlet);
                this.activateChildRoutes(futureNode, currNode, context.children);
            }
            else {
                // if we have a componentless route, we recurse but keep the same outlet map.
                this.activateChildRoutes(futureNode, currNode, parentContexts);
            }
        }
        else {
            if (future.component) {
                // if we have a normal route, we need to place the component into the outlet and recurse.
                var /** @type {?} */ context = parentContexts.getOrCreateContext(future.outlet);
                if (this.routeReuseStrategy.shouldAttach(future.snapshot)) {
                    var /** @type {?} */ stored = ((this.routeReuseStrategy.retrieve(future.snapshot)));
                    this.routeReuseStrategy.store(future.snapshot, null);
                    context.children.onOutletReAttached(stored.contexts);
                    context.attachRef = stored.componentRef;
                    context.route = stored.route.value;
                    if (context.outlet) {
                        // Attach right away when the outlet has already been instantiated
                        // Otherwise attach from `RouterOutlet.ngOnInit` when it is instantiated
                        context.outlet.attach(stored.componentRef, stored.route.value);
                    }
                    advanceActivatedRouteNodeAndItsChildren(stored.route);
                }
                else {
                    var /** @type {?} */ config = parentLoadedConfig(future.snapshot);
                    var /** @type {?} */ cmpFactoryResolver = config ? config.module.componentFactoryResolver : null;
                    context.route = future;
                    context.resolver = cmpFactoryResolver;
                    if (context.outlet) {
                        // Activate the outlet when it has already been instantiated
                        // Otherwise it will get activated from its `ngOnInit` when instantiated
                        context.outlet.activateWith(future, cmpFactoryResolver);
                    }
                    this.activateChildRoutes(futureNode, null, context.children);
                }
            }
            else {
                // if we have a componentless route, we recurse but keep the same outlet map.
                this.activateChildRoutes(futureNode, null, parentContexts);
            }
        }
    };
    return ActivateRoutes;
}());
/**
 * @param {?} node
 * @return {?}
 */
function advanceActivatedRouteNodeAndItsChildren(node) {
    advanceActivatedRoute(node.value);
    node.children.forEach(advanceActivatedRouteNodeAndItsChildren);
}
/**
 * @param {?} snapshot
 * @return {?}
 */
function parentLoadedConfig(snapshot) {
    for (var /** @type {?} */ s = snapshot.parent; s; s = s.parent) {
        var /** @type {?} */ route = s._routeConfig;
        if (route && route._loadedConfig)
            return route._loadedConfig;
        if (route && route.component)
            return null;
    }
    return null;
}
/**
 * @param {?} snapshot
 * @return {?}
 */
function closestLoadedConfig(snapshot) {
    if (!snapshot)
        return null;
    for (var /** @type {?} */ s = snapshot.parent; s; s = s.parent) {
        var /** @type {?} */ route = s._routeConfig;
        if (route && route._loadedConfig)
            return route._loadedConfig;
    }
    return null;
}
/**
 * @template T
 * @param {?} node
 * @return {?}
 */
function nodeChildrenAsMap(node) {
    var /** @type {?} */ map$$1 = {};
    if (node) {
        node.children.forEach(function (child) { return map$$1[child.value.outlet] = child; });
    }
    return map$$1;
}
/**
 * @param {?} commands
 * @return {?}
 */
function validateCommands(commands) {
    for (var /** @type {?} */ i = 0; i < commands.length; i++) {
        var /** @type {?} */ cmd = commands[i];
        if (cmd == null) {
            throw new Error("The requested path contains " + cmd + " segment at index " + i);
        }
    }
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Lets you link to specific parts of your app.
 *
 * \@howToUse
 *
 * Consider the following route configuration:
 * `[{ path: 'user/:name', component: UserCmp }]`
 *
 * When linking to this `user/:name` route, you can write:
 * `<a routerLink='/user/bob'>link to user component</a>`
 *
 * \@description
 *
 * The RouterLink directives let you link to specific parts of your app.
 *
 * When the link is static, you can use the directive as follows:
 * `<a routerLink="/user/bob">link to user component</a>`
 *
 * If you use dynamic values to generate the link, you can pass an array of path
 * segments, followed by the params for each segment.
 *
 * For instance `['/team', teamId, 'user', userName, {details: true}]`
 * means that we want to generate a link to `/team/11/user/bob;details=true`.
 *
 * Multiple static segments can be merged into one
 * (e.g., `['/team/11/user', userName, {details: true}]`).
 *
 * The first segment name can be prepended with `/`, `./`, or `../`:
 * * If the first segment begins with `/`, the router will look up the route from the root of the
 *   app.
 * * If the first segment begins with `./`, or doesn't begin with a slash, the router will
 *   instead look in the children of the current activated route.
 * * And if the first segment begins with `../`, the router will go up one level.
 *
 * You can set query params and fragment as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
 *   link to user component
 * </a>
 * ```
 * RouterLink will use these to generate this link: `/user/bob#education?debug=true`.
 *
 * (Deprecated in v4.0.0 use `queryParamsHandling` instead) You can also tell the
 * directive to preserve the current query params and fragment:
 *
 * ```
 * <a [routerLink]="['/user/bob']" preserveQueryParams preserveFragment>
 *   link to user component
 * </a>
 * ```
 *
 * You can tell the directive to how to handle queryParams, available options are:
 *  - 'merge' merge the queryParams into the current queryParams
 *  - 'preserve' preserve the current queryParams
 *  - default / '' use the queryParams only
 *  same options for {\@link NavigationExtras#queryParamsHandling}
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" queryParamsHandling="merge">
 *   link to user component
 * </a>
 * ```
 *
 * The router link directive always treats the provided input as a delta to the current url.
 *
 * For instance, if the current url is `/user/(box//aux:team)`.
 *
 * Then the following link `<a [routerLink]="['/user/jim']">Jim</a>` will generate the link
 * `/user/(jim//aux:team)`.
 *
 * \@ngModule RouterModule
 *
 * See {\@link Router#createUrlTree} for more information.
 *
 * \@stable
 */
var RouterLink = (function () {
    /**
     * @param {?} router
     * @param {?} route
     * @param {?} tabIndex
     * @param {?} renderer
     * @param {?} el
     */
    function RouterLink(router, route, tabIndex, renderer, el) {
        this.router = router;
        this.route = route;
        this.commands = [];
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }
    Object.defineProperty(RouterLink.prototype, "routerLink", {
        /**
         * @param {?} commands
         * @return {?}
         */
        set: function (commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
            }
            else {
                this.commands = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterLink.prototype, "preserveQueryParams", {
        /**
         * @deprecated 4.0.0 use `queryParamsHandling` instead.
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_25" /* isDevMode */])() && (console) && (console.warn)) {
                console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
            }
            this.preserve = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RouterLink.prototype.onClick = function () {
        var /** @type {?} */ extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
    };
    Object.defineProperty(RouterLink.prototype, "urlTree", {
        /**
         * @return {?}
         */
        get: function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: attrBoolValue(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: attrBoolValue(this.preserveFragment),
            });
        },
        enumerable: true,
        configurable: true
    });
    return RouterLink;
}());
RouterLink.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* Directive */], args: [{ selector: ':not(a)[routerLink]' },] },
];
/**
 * @nocollapse
 */
RouterLink.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["h" /* Attribute */], args: ['tabindex',] },] },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["_2" /* Renderer2 */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ElementRef */], },
]; };
RouterLink.propDecorators = {
    'queryParams': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'fragment': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'queryParamsHandling': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'preserveFragment': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'skipLocationChange': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'replaceUrl': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'routerLink': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'preserveQueryParams': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* HostListener */], args: ['click',] },],
};
/**
 * \@whatItDoes Lets you link to specific parts of your app.
 *
 * See {\@link RouterLink} for more information.
 *
 * \@ngModule RouterModule
 *
 * \@stable
 */
var RouterLinkWithHref = (function () {
    /**
     * @param {?} router
     * @param {?} route
     * @param {?} locationStrategy
     */
    function RouterLinkWithHref(router, route, locationStrategy) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                _this.updateTargetUrlAndHref();
            }
        });
    }
    Object.defineProperty(RouterLinkWithHref.prototype, "routerLink", {
        /**
         * @param {?} commands
         * @return {?}
         */
        set: function (commands) {
            if (commands != null) {
                this.commands = Array.isArray(commands) ? commands : [commands];
            }
            else {
                this.commands = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterLinkWithHref.prototype, "preserveQueryParams", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_25" /* isDevMode */])() && (console) && (console.warn)) {
                console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
            }
            this.preserve = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    RouterLinkWithHref.prototype.ngOnChanges = function (changes) { this.updateTargetUrlAndHref(); };
    /**
     * @return {?}
     */
    RouterLinkWithHref.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    /**
     * @param {?} button
     * @param {?} ctrlKey
     * @param {?} metaKey
     * @param {?} shiftKey
     * @return {?}
     */
    RouterLinkWithHref.prototype.onClick = function (button, ctrlKey, metaKey, shiftKey) {
        if (button !== 0 || ctrlKey || metaKey || shiftKey) {
            return true;
        }
        if (typeof this.target === 'string' && this.target != '_self') {
            return true;
        }
        var /** @type {?} */ extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return false;
    };
    /**
     * @return {?}
     */
    RouterLinkWithHref.prototype.updateTargetUrlAndHref = function () {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    };
    Object.defineProperty(RouterLinkWithHref.prototype, "urlTree", {
        /**
         * @return {?}
         */
        get: function () {
            return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: attrBoolValue(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: attrBoolValue(this.preserveFragment),
            });
        },
        enumerable: true,
        configurable: true
    });
    return RouterLinkWithHref;
}());
RouterLinkWithHref.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* Directive */], args: [{ selector: 'a[routerLink]' },] },
];
/**
 * @nocollapse
 */
RouterLinkWithHref.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: __WEBPACK_IMPORTED_MODULE_1__angular_common__["g" /* LocationStrategy */], },
]; };
RouterLinkWithHref.propDecorators = {
    'target': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["z" /* HostBinding */], args: ['attr.target',] }, { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'queryParams': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'fragment': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'queryParamsHandling': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'preserveFragment': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'skipLocationChange': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'replaceUrl': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'href': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["z" /* HostBinding */] },],
    'routerLink': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'preserveQueryParams': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'onClick': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* HostListener */], args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'],] },],
};
/**
 * @param {?} s
 * @return {?}
 */
function attrBoolValue(s) {
    return s === '' || !!s;
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Lets you add a CSS class to an element when the link's route becomes active.
 *
 * \@howToUse
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
 * ```
 *
 * \@description
 *
 * The RouterLinkActive directive lets you add a CSS class to an element when the link's route
 * becomes active.
 *
 * Consider the following example:
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
 * ```
 *
 * When the url is either '/user' or '/user/bob', the active-link class will
 * be added to the `a` tag. If the url changes, the class will be removed.
 *
 * You can set more than one class, as follows:
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="class1 class2">Bob</a>
 * <a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
 * ```
 *
 * You can configure RouterLinkActive by passing `exact: true`. This will add the classes
 * only when the url matches the link exactly.
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:
 * true}">Bob</a>
 * ```
 *
 * You can assign the RouterLinkActive instance to a template variable and directly check
 * the `isActive` status.
 * ```
 * <a routerLink="/user/bob" routerLinkActive #rla="routerLinkActive">
 *   Bob {{ rla.isActive ? '(already open)' : ''}}
 * </a>
 * ```
 *
 * Finally, you can apply the RouterLinkActive directive to an ancestor of a RouterLink.
 *
 * ```
 * <div routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
 *   <a routerLink="/user/jim">Jim</a>
 *   <a routerLink="/user/bob">Bob</a>
 * </div>
 * ```
 *
 * This will set the active-link class on the div tag if the url is either '/user/jim' or
 * '/user/bob'.
 *
 * \@ngModule RouterModule
 *
 * \@stable
 */
var RouterLinkActive = (function () {
    /**
     * @param {?} router
     * @param {?} element
     * @param {?} renderer
     * @param {?} cdr
     */
    function RouterLinkActive(router, element, renderer, cdr) {
        var _this = this;
        this.router = router;
        this.element = element;
        this.renderer = renderer;
        this.cdr = cdr;
        this.classes = [];
        this.active = false;
        this.routerLinkActiveOptions = { exact: false };
        this.subscription = router.events.subscribe(function (s) {
            if (s instanceof NavigationEnd) {
                _this.update();
            }
        });
    }
    Object.defineProperty(RouterLinkActive.prototype, "isActive", {
        /**
         * @return {?}
         */
        get: function () { return this.active; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    RouterLinkActive.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.links.changes.subscribe(function (_) { return _this.update(); });
        this.linksWithHrefs.changes.subscribe(function (_) { return _this.update(); });
        this.update();
    };
    Object.defineProperty(RouterLinkActive.prototype, "routerLinkActive", {
        /**
         * @param {?} data
         * @return {?}
         */
        set: function (data) {
            var /** @type {?} */ classes = Array.isArray(data) ? data : data.split(' ');
            this.classes = classes.filter(function (c) { return !!c; });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    RouterLinkActive.prototype.ngOnChanges = function (changes) { this.update(); };
    /**
     * @return {?}
     */
    RouterLinkActive.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    /**
     * @return {?}
     */
    RouterLinkActive.prototype.update = function () {
        var _this = this;
        if (!this.links || !this.linksWithHrefs || !this.router.navigated)
            return;
        var /** @type {?} */ hasActiveLinks = this.hasActiveLinks();
        // react only when status has changed to prevent unnecessary dom updates
        if (this.active !== hasActiveLinks) {
            this.classes.forEach(function (c) {
                if (hasActiveLinks) {
                    _this.renderer.addClass(_this.element.nativeElement, c);
                }
                else {
                    _this.renderer.removeClass(_this.element.nativeElement, c);
                }
            });
            Promise.resolve(hasActiveLinks).then(function (active) { return _this.active = active; });
        }
    };
    /**
     * @param {?} router
     * @return {?}
     */
    RouterLinkActive.prototype.isLinkActive = function (router) {
        var _this = this;
        return function (link) { return router.isActive(link.urlTree, _this.routerLinkActiveOptions.exact); };
    };
    /**
     * @return {?}
     */
    RouterLinkActive.prototype.hasActiveLinks = function () {
        return this.links.some(this.isLinkActive(this.router)) ||
            this.linksWithHrefs.some(this.isLinkActive(this.router));
    };
    return RouterLinkActive;
}());
RouterLinkActive.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* Directive */], args: [{
                selector: '[routerLinkActive]',
                exportAs: 'routerLinkActive',
            },] },
];
/**
 * @nocollapse
 */
RouterLinkActive.ctorParameters = function () { return [
    { type: Router, },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["_2" /* Renderer2 */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["l" /* ChangeDetectorRef */], },
]; };
RouterLinkActive.propDecorators = {
    'links': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["t" /* ContentChildren */], args: [RouterLink, { descendants: true },] },],
    'linksWithHrefs': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["t" /* ContentChildren */], args: [RouterLinkWithHref, { descendants: true },] },],
    'routerLinkActiveOptions': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
    'routerLinkActive': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["F" /* Input */] },],
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Store contextual information about a {\@link RouterOutlet}
 *
 * \@stable
 */
var OutletContext = (function () {
    function OutletContext() {
        this.outlet = null;
        this.route = null;
        this.resolver = null;
        this.children = new ChildrenOutletContexts();
        this.attachRef = null;
    }
    return OutletContext;
}());
/**
 * Store contextual information about the children (= nested) {\@link RouterOutlet}
 *
 * \@stable
 */
var ChildrenOutletContexts = (function () {
    function ChildrenOutletContexts() {
        this.contexts = new Map();
    }
    /**
     * Called when a `RouterOutlet` directive is instantiated
     * @param {?} childName
     * @param {?} outlet
     * @return {?}
     */
    ChildrenOutletContexts.prototype.onChildOutletCreated = function (childName, outlet) {
        var /** @type {?} */ context = this.getOrCreateContext(childName);
        context.outlet = outlet;
        this.contexts.set(childName, context);
    };
    /**
     * Called when a `RouterOutlet` directive is destroyed.
     * We need to keep the context as the outlet could be destroyed inside a NgIf and might be
     * re-created later.
     * @param {?} childName
     * @return {?}
     */
    ChildrenOutletContexts.prototype.onChildOutletDestroyed = function (childName) {
        var /** @type {?} */ context = this.getContext(childName);
        if (context) {
            context.outlet = null;
        }
    };
    /**
     * Called when the corresponding route is deactivated during navigation.
     * Because the component get destroyed, all children outlet are destroyed.
     * @return {?}
     */
    ChildrenOutletContexts.prototype.onOutletDeactivated = function () {
        var /** @type {?} */ contexts = this.contexts;
        this.contexts = new Map();
        return contexts;
    };
    /**
     * @param {?} contexts
     * @return {?}
     */
    ChildrenOutletContexts.prototype.onOutletReAttached = function (contexts) { this.contexts = contexts; };
    /**
     * @param {?} childName
     * @return {?}
     */
    ChildrenOutletContexts.prototype.getOrCreateContext = function (childName) {
        var /** @type {?} */ context = this.getContext(childName);
        if (!context) {
            context = new OutletContext();
            this.contexts.set(childName, context);
        }
        return context;
    };
    /**
     * @param {?} childName
     * @return {?}
     */
    ChildrenOutletContexts.prototype.getContext = function (childName) { return this.contexts.get(childName) || null; };
    return ChildrenOutletContexts;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Acts as a placeholder that Angular dynamically fills based on the current router
 * state.
 *
 * \@howToUse
 *
 * ```
 * <router-outlet></router-outlet>
 * <router-outlet name='left'></router-outlet>
 * <router-outlet name='right'></router-outlet>
 * ```
 *
 * A router outlet will emit an activate event any time a new component is being instantiated,
 * and a deactivate event when it is being destroyed.
 *
 * ```
 * <router-outlet
 *   (activate)='onActivate($event)'
 *   (deactivate)='onDeactivate($event)'></router-outlet>
 * ```
 * \@ngModule RouterModule
 *
 * \@stable
 */
var RouterOutlet = (function () {
    /**
     * @param {?} parentContexts
     * @param {?} location
     * @param {?} resolver
     * @param {?} name
     * @param {?} changeDetector
     */
    function RouterOutlet(parentContexts, location, resolver, name, changeDetector) {
        this.parentContexts = parentContexts;
        this.location = location;
        this.resolver = resolver;
        this.changeDetector = changeDetector;
        this.activated = null;
        this._activatedRoute = null;
        this.activateEvents = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]();
        this.deactivateEvents = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["x" /* EventEmitter */]();
        this.name = name || PRIMARY_OUTLET;
        parentContexts.onChildOutletCreated(this.name, this);
    }
    /**
     * @return {?}
     */
    RouterOutlet.prototype.ngOnDestroy = function () { this.parentContexts.onChildOutletDestroyed(this.name); };
    /**
     * @return {?}
     */
    RouterOutlet.prototype.ngOnInit = function () {
        if (!this.activated) {
            // If the outlet was not instantiated at the time the route got activated we need to populate
            // the outlet when it is initialized (ie inside a NgIf)
            var /** @type {?} */ context = this.parentContexts.getContext(this.name);
            if (context && context.route) {
                if (context.attachRef) {
                    // `attachRef` is populated when there is an existing component to mount
                    this.attach(context.attachRef, context.route);
                }
                else {
                    // otherwise the component defined in the configuration is created
                    this.activateWith(context.route, context.resolver || null);
                }
            }
        }
    };
    Object.defineProperty(RouterOutlet.prototype, "locationInjector", {
        /**
         * @deprecated since v4 *
         * @return {?}
         */
        get: function () { return this.location.injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "locationFactoryResolver", {
        /**
         * @deprecated since v4 *
         * @return {?}
         */
        get: function () { return this.resolver; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "isActivated", {
        /**
         * @return {?}
         */
        get: function () { return !!this.activated; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "component", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this.activated.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "activatedRoute", {
        /**
         * @return {?}
         */
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return (this._activatedRoute);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "activatedRouteData", {
        /**
         * @return {?}
         */
        get: function () {
            if (this._activatedRoute) {
                return this._activatedRoute.snapshot.data;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Called when the `RouteReuseStrategy` instructs to detach the subtree
     * @return {?}
     */
    RouterOutlet.prototype.detach = function () {
        if (!this.activated)
            throw new Error('Outlet is not activated');
        this.location.detach();
        var /** @type {?} */ cmp = this.activated;
        this.activated = null;
        this._activatedRoute = null;
        return cmp;
    };
    /**
     * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
     * @param {?} ref
     * @param {?} activatedRoute
     * @return {?}
     */
    RouterOutlet.prototype.attach = function (ref, activatedRoute) {
        this.activated = ref;
        this._activatedRoute = activatedRoute;
        this.location.insert(ref.hostView);
    };
    /**
     * @return {?}
     */
    RouterOutlet.prototype.deactivate = function () {
        if (this.activated) {
            var /** @type {?} */ c = this.component;
            this.activated.destroy();
            this.activated = null;
            this._activatedRoute = null;
            this.deactivateEvents.emit(c);
        }
    };
    /**
     * @param {?} activatedRoute
     * @param {?} resolver
     * @return {?}
     */
    RouterOutlet.prototype.activateWith = function (activatedRoute, resolver) {
        if (this.isActivated) {
            throw new Error('Cannot activate an already activated outlet');
        }
        this._activatedRoute = activatedRoute;
        var /** @type {?} */ snapshot = activatedRoute._futureSnapshot;
        var /** @type {?} */ component = (((snapshot._routeConfig)).component);
        resolver = resolver || this.resolver;
        var /** @type {?} */ factory = resolver.resolveComponentFactory(component);
        var /** @type {?} */ childContexts = this.parentContexts.getOrCreateContext(this.name).children;
        var /** @type {?} */ injector = new OutletInjector(activatedRoute, childContexts, this.location.injector);
        this.activated = this.location.createComponent(factory, this.location.length, injector);
        // Calling `markForCheck` to make sure we will run the change detection when the
        // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
        this.changeDetector.markForCheck();
        this.activateEvents.emit(this.activated.instance);
    };
    return RouterOutlet;
}());
RouterOutlet.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["u" /* Directive */], args: [{ selector: 'router-outlet', exportAs: 'outlet' },] },
];
/**
 * @nocollapse
 */
RouterOutlet.ctorParameters = function () { return [
    { type: ChildrenOutletContexts, },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["_18" /* ViewContainerRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["q" /* ComponentFactoryResolver */], },
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["h" /* Attribute */], args: ['name',] },] },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["l" /* ChangeDetectorRef */], },
]; };
RouterOutlet.propDecorators = {
    'activateEvents': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["T" /* Output */], args: ['activate',] },],
    'deactivateEvents': [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["T" /* Output */], args: ['deactivate',] },],
};
var OutletInjector = (function () {
    /**
     * @param {?} route
     * @param {?} childContexts
     * @param {?} parent
     */
    function OutletInjector(route, childContexts, parent) {
        this.route = route;
        this.childContexts = childContexts;
        this.parent = parent;
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    OutletInjector.prototype.get = function (token, notFoundValue) {
        if (token === ActivatedRoute) {
            return this.route;
        }
        if (token === ChildrenOutletContexts) {
            return this.childContexts;
        }
        return this.parent.get(token, notFoundValue);
    };
    return OutletInjector;
}());
/**
*@license
*Copyright Google Inc. All Rights Reserved.
*
*Use of this source code is governed by an MIT-style license that can be
*found in the LICENSE file at https://angular.io/license
*/
/**
 * \@whatItDoes Provides a preloading strategy.
 *
 * \@experimental
 * @abstract
 */
var PreloadingStrategy = (function () {
    function PreloadingStrategy() {
    }
    /**
     * @abstract
     * @param {?} route
     * @param {?} fn
     * @return {?}
     */
    PreloadingStrategy.prototype.preload = function (route, fn) { };
    return PreloadingStrategy;
}());
/**
 * \@whatItDoes Provides a preloading strategy that preloads all modules as quickly as possible.
 *
 * \@howToUse
 *
 * ```
 * RouteModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})
 * ```
 *
 * \@experimental
 */
var PreloadAllModules = (function () {
    function PreloadAllModules() {
    }
    /**
     * @param {?} route
     * @param {?} fn
     * @return {?}
     */
    PreloadAllModules.prototype.preload = function (route, fn) {
        return __WEBPACK_IMPORTED_MODULE_15_rxjs_operator_catch__["_catch"].call(fn(), function () { return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(null); });
    };
    return PreloadAllModules;
}());
/**
 * \@whatItDoes Provides a preloading strategy that does not preload any modules.
 *
 * \@description
 *
 * This strategy is enabled by default.
 *
 * \@experimental
 */
var NoPreloading = (function () {
    function NoPreloading() {
    }
    /**
     * @param {?} route
     * @param {?} fn
     * @return {?}
     */
    NoPreloading.prototype.preload = function (route, fn) { return Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(null); };
    return NoPreloading;
}());
/**
 * The preloader optimistically loads all router configurations to
 * make navigations into lazily-loaded sections of the application faster.
 *
 * The preloader runs in the background. When the router bootstraps, the preloader
 * starts listening to all navigation events. After every such event, the preloader
 * will check if any configurations can be loaded lazily.
 *
 * If a route is protected by `canLoad` guards, the preloaded will not load it.
 *
 * \@stable
 */
var RouterPreloader = (function () {
    /**
     * @param {?} router
     * @param {?} moduleLoader
     * @param {?} compiler
     * @param {?} injector
     * @param {?} preloadingStrategy
     */
    function RouterPreloader(router, moduleLoader, compiler, injector, preloadingStrategy) {
        this.router = router;
        this.injector = injector;
        this.preloadingStrategy = preloadingStrategy;
        var onStartLoad = function (r) { return router.triggerEvent(new RouteConfigLoadStart(r)); };
        var onEndLoad = function (r) { return router.triggerEvent(new RouteConfigLoadEnd(r)); };
        this.loader = new RouterConfigLoader(moduleLoader, compiler, onStartLoad, onEndLoad);
    }
    /**
     * @return {?}
     */
    RouterPreloader.prototype.setUpPreloading = function () {
        var _this = this;
        var /** @type {?} */ navigations$ = __WEBPACK_IMPORTED_MODULE_21_rxjs_operator_filter__["filter"].call(this.router.events, function (e) { return e instanceof NavigationEnd; });
        this.subscription = __WEBPACK_IMPORTED_MODULE_7_rxjs_operator_concatMap__["concatMap"].call(navigations$, function () { return _this.preload(); }).subscribe(function () { });
    };
    /**
     * @return {?}
     */
    RouterPreloader.prototype.preload = function () {
        var /** @type {?} */ ngModule = this.injector.get(__WEBPACK_IMPORTED_MODULE_2__angular_core__["P" /* NgModuleRef */]);
        return this.processRoutes(ngModule, this.router.config);
    };
    /**
     * @return {?}
     */
    RouterPreloader.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    /**
     * @param {?} ngModule
     * @param {?} routes
     * @return {?}
     */
    RouterPreloader.prototype.processRoutes = function (ngModule, routes) {
        var /** @type {?} */ res = [];
        for (var _i = 0, routes_5 = routes; _i < routes_5.length; _i++) {
            var route = routes_5[_i];
            // we already have the config loaded, just recurse
            if (route.loadChildren && !route.canLoad && route._loadedConfig) {
                var /** @type {?} */ childConfig = route._loadedConfig;
                res.push(this.processRoutes(childConfig.module, childConfig.routes));
                // no config loaded, fetch the config
            }
            else if (route.loadChildren && !route.canLoad) {
                res.push(this.preloadConfig(ngModule, route));
                // recurse into children
            }
            else if (route.children) {
                res.push(this.processRoutes(ngModule, route.children));
            }
        }
        return __WEBPACK_IMPORTED_MODULE_19_rxjs_operator_mergeAll__["mergeAll"].call(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_observable_from__["from"])(res));
    };
    /**
     * @param {?} ngModule
     * @param {?} route
     * @return {?}
     */
    RouterPreloader.prototype.preloadConfig = function (ngModule, route) {
        var _this = this;
        return this.preloadingStrategy.preload(route, function () {
            var /** @type {?} */ loaded$ = _this.loader.load(ngModule.injector, route);
            return __WEBPACK_IMPORTED_MODULE_12_rxjs_operator_mergeMap__["mergeMap"].call(loaded$, function (config) {
                route._loadedConfig = config;
                return _this.processRoutes(config.module, config.routes);
            });
        });
    };
    return RouterPreloader;
}());
RouterPreloader.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
RouterPreloader.ctorParameters = function () { return [
    { type: Router, },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["O" /* NgModuleFactoryLoader */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Compiler */], },
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["E" /* Injector */], },
    { type: PreloadingStrategy, },
]; };
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * \@whatItDoes Contains a list of directives
 * \@stable
 */
var ROUTER_DIRECTIVES = [RouterOutlet, RouterLink, RouterLinkWithHref, RouterLinkActive];
/**
 * \@whatItDoes Is used in DI to configure the router.
 * \@stable
 */
var ROUTER_CONFIGURATION = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["D" /* InjectionToken */]('ROUTER_CONFIGURATION');
/**
 * \@docsNotRequired
 */
var ROUTER_FORROOT_GUARD = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["D" /* InjectionToken */]('ROUTER_FORROOT_GUARD');
var ROUTER_PROVIDERS = [
    __WEBPACK_IMPORTED_MODULE_1__angular_common__["f" /* Location */],
    { provide: UrlSerializer, useClass: DefaultUrlSerializer },
    {
        provide: Router,
        useFactory: setupRouter,
        deps: [
            __WEBPACK_IMPORTED_MODULE_2__angular_core__["g" /* ApplicationRef */], UrlSerializer, ChildrenOutletContexts, __WEBPACK_IMPORTED_MODULE_1__angular_common__["f" /* Location */], __WEBPACK_IMPORTED_MODULE_2__angular_core__["E" /* Injector */],
            __WEBPACK_IMPORTED_MODULE_2__angular_core__["O" /* NgModuleFactoryLoader */], __WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Compiler */], ROUTES, ROUTER_CONFIGURATION,
            [UrlHandlingStrategy, new __WEBPACK_IMPORTED_MODULE_2__angular_core__["S" /* Optional */]()], [RouteReuseStrategy, new __WEBPACK_IMPORTED_MODULE_2__angular_core__["S" /* Optional */]()]
        ]
    },
    ChildrenOutletContexts,
    { provide: ActivatedRoute, useFactory: rootRoute, deps: [Router] },
    { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["O" /* NgModuleFactoryLoader */], useClass: __WEBPACK_IMPORTED_MODULE_2__angular_core__["_9" /* SystemJsNgModuleLoader */] },
    RouterPreloader,
    NoPreloading,
    PreloadAllModules,
    { provide: ROUTER_CONFIGURATION, useValue: { enableTracing: false } },
];
/**
 * @return {?}
 */
function routerNgProbeToken() {
    return new __WEBPACK_IMPORTED_MODULE_2__angular_core__["Q" /* NgProbeToken */]('Router', Router);
}
/**
 * \@whatItDoes Adds router directives and providers.
 *
 * \@howToUse
 *
 * RouterModule can be imported multiple times: once per lazily-loaded bundle.
 * Since the router deals with a global shared resource--location, we cannot have
 * more than one router service active.
 *
 * That is why there are two ways to create the module: `RouterModule.forRoot` and
 * `RouterModule.forChild`.
 *
 * * `forRoot` creates a module that contains all the directives, the given routes, and the router
 *   service itself.
 * * `forChild` creates a module that contains all the directives and the given routes, but does not
 *   include the router service.
 *
 * When registered at the root, the module should be used as follows
 *
 * ```
 * \@NgModule({
 *   imports: [RouterModule.forRoot(ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * For submodules and lazy loaded submodules the module should be used as follows:
 *
 * ```
 * \@NgModule({
 *   imports: [RouterModule.forChild(ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * \@description
 *
 * Managing state transitions is one of the hardest parts of building applications. This is
 * especially true on the web, where you also need to ensure that the state is reflected in the URL.
 * In addition, we often want to split applications into multiple bundles and load them on demand.
 * Doing this transparently is not trivial.
 *
 * The Angular router solves these problems. Using the router, you can declaratively specify
 * application states, manage state transitions while taking care of the URL, and load bundles on
 * demand.
 *
 * [Read this developer guide](https://angular.io/docs/ts/latest/guide/router.html) to get an
 * overview of how the router should be used.
 *
 * \@stable
 */
var RouterModule = (function () {
    /**
     * @param {?} guard
     * @param {?} router
     */
    function RouterModule(guard, router) {
    }
    /**
     * Creates a module with all the router providers and directives. It also optionally sets up an
     * application listener to perform an initial navigation.
     *
     * Options:
     * * `enableTracing` makes the router log all its internal events to the console.
     * * `useHash` enables the location strategy that uses the URL fragment instead of the history
     * API.
     * * `initialNavigation` disables the initial navigation.
     * * `errorHandler` provides a custom error handler.
     * @param {?} routes
     * @param {?=} config
     * @return {?}
     */
    RouterModule.forRoot = function (routes, config) {
        return {
            ngModule: RouterModule,
            providers: [
                ROUTER_PROVIDERS,
                provideRoutes(routes),
                {
                    provide: ROUTER_FORROOT_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [[Router, new __WEBPACK_IMPORTED_MODULE_2__angular_core__["S" /* Optional */](), new __WEBPACK_IMPORTED_MODULE_2__angular_core__["_8" /* SkipSelf */]()]]
                },
                { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} },
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_common__["g" /* LocationStrategy */],
                    useFactory: provideLocationStrategy,
                    deps: [
                        __WEBPACK_IMPORTED_MODULE_1__angular_common__["i" /* PlatformLocation */], [new __WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Inject */](__WEBPACK_IMPORTED_MODULE_1__angular_common__["a" /* APP_BASE_HREF */]), new __WEBPACK_IMPORTED_MODULE_2__angular_core__["S" /* Optional */]()], ROUTER_CONFIGURATION
                    ]
                },
                {
                    provide: PreloadingStrategy,
                    useExisting: config && config.preloadingStrategy ? config.preloadingStrategy :
                        NoPreloading
                },
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["Q" /* NgProbeToken */], multi: true, useFactory: routerNgProbeToken },
                provideRouterInitializer(),
            ],
        };
    };
    /**
     * Creates a module with all the router directives and a provider registering routes.
     * @param {?} routes
     * @return {?}
     */
    RouterModule.forChild = function (routes) {
        return { ngModule: RouterModule, providers: [provideRoutes(routes)] };
    };
    return RouterModule;
}());
RouterModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["M" /* NgModule */], args: [{ declarations: ROUTER_DIRECTIVES, exports: ROUTER_DIRECTIVES },] },
];
/**
 * @nocollapse
 */
RouterModule.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["S" /* Optional */] }, { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["B" /* Inject */], args: [ROUTER_FORROOT_GUARD,] },] },
    { type: Router, decorators: [{ type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["S" /* Optional */] },] },
]; };
/**
 * @param {?} platformLocationStrategy
 * @param {?} baseHref
 * @param {?=} options
 * @return {?}
 */
function provideLocationStrategy(platformLocationStrategy, baseHref, options) {
    if (options === void 0) { options = {}; }
    return options.useHash ? new __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* HashLocationStrategy */](platformLocationStrategy, baseHref) :
        new __WEBPACK_IMPORTED_MODULE_1__angular_common__["h" /* PathLocationStrategy */](platformLocationStrategy, baseHref);
}
/**
 * @param {?} router
 * @return {?}
 */
function provideForRootGuard(router) {
    if (router) {
        throw new Error("RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead.");
    }
    return 'guarded';
}
/**
 * \@whatItDoes Registers routes.
 *
 * \@howToUse
 *
 * ```
 * \@NgModule({
 *   imports: [RouterModule.forChild(ROUTES)],
 *   providers: [provideRoutes(EXTRA_ROUTES)]
 * })
 * class MyNgModule {}
 * ```
 *
 * \@stable
 * @param {?} routes
 * @return {?}
 */
function provideRoutes(routes) {
    return [
        { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* ANALYZE_FOR_ENTRY_COMPONENTS */], multi: true, useValue: routes },
        { provide: ROUTES, multi: true, useValue: routes },
    ];
}
/**
 * @param {?} ref
 * @param {?} urlSerializer
 * @param {?} contexts
 * @param {?} location
 * @param {?} injector
 * @param {?} loader
 * @param {?} compiler
 * @param {?} config
 * @param {?=} opts
 * @param {?=} urlHandlingStrategy
 * @param {?=} routeReuseStrategy
 * @return {?}
 */
function setupRouter(ref, urlSerializer, contexts, location, injector, loader, compiler, config, opts, urlHandlingStrategy, routeReuseStrategy) {
    if (opts === void 0) { opts = {}; }
    var /** @type {?} */ router = new Router(null, urlSerializer, contexts, location, injector, loader, compiler, flatten(config));
    if (urlHandlingStrategy) {
        router.urlHandlingStrategy = urlHandlingStrategy;
    }
    if (routeReuseStrategy) {
        router.routeReuseStrategy = routeReuseStrategy;
    }
    if (opts.errorHandler) {
        router.errorHandler = opts.errorHandler;
    }
    if (opts.enableTracing) {
        var /** @type {?} */ dom_1 = Object(__WEBPACK_IMPORTED_MODULE_20__angular_platform_browser__["c" /* ɵgetDOM */])();
        router.events.subscribe(function (e) {
            dom_1.logGroup("Router Event: " + ((e.constructor)).name);
            dom_1.log(e.toString());
            dom_1.log(e);
            dom_1.logGroupEnd();
        });
    }
    return router;
}
/**
 * @param {?} router
 * @return {?}
 */
function rootRoute(router) {
    return router.routerState.root;
}
/**
 * To initialize the router properly we need to do in two steps:
 *
 * We need to start the navigation in a APP_INITIALIZER to block the bootstrap if
 * a resolver or a guards executes asynchronously. Second, we need to actually run
 * activation in a BOOTSTRAP_LISTENER. We utilize the afterPreactivation
 * hook provided by the router to do that.
 *
 * The router navigation starts, reaches the point when preactivation is done, and then
 * pauses. It waits for the hook to be resolved. We then resolve it only in a bootstrap listener.
 */
var RouterInitializer = (function () {
    /**
     * @param {?} injector
     */
    function RouterInitializer(injector) {
        this.injector = injector;
        this.initNavigation = false;
        this.resultOfPreactivationDone = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
    }
    /**
     * @return {?}
     */
    RouterInitializer.prototype.appInitializer = function () {
        var _this = this;
        var /** @type {?} */ p = this.injector.get(__WEBPACK_IMPORTED_MODULE_1__angular_common__["e" /* LOCATION_INITIALIZED */], Promise.resolve(null));
        return p.then(function () {
            var /** @type {?} */ resolve = ((null));
            var /** @type {?} */ res = new Promise(function (r) { return resolve = r; });
            var /** @type {?} */ router = _this.injector.get(Router);
            var /** @type {?} */ opts = _this.injector.get(ROUTER_CONFIGURATION);
            if (_this.isLegacyDisabled(opts) || _this.isLegacyEnabled(opts)) {
                resolve(true);
            }
            else if (opts.initialNavigation === 'disabled') {
                router.setUpLocationChangeListener();
                resolve(true);
            }
            else if (opts.initialNavigation === 'enabled') {
                router.hooks.afterPreactivation = function () {
                    // only the initial navigation should be delayed
                    if (!_this.initNavigation) {
                        _this.initNavigation = true;
                        resolve(true);
                        return _this.resultOfPreactivationDone;
                        // subsequent navigations should not be delayed
                    }
                    else {
                        return (Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_observable_of__["of"])(null));
                    }
                };
                router.initialNavigation();
            }
            else {
                throw new Error("Invalid initialNavigation options: '" + opts.initialNavigation + "'");
            }
            return res;
        });
    };
    /**
     * @param {?} bootstrappedComponentRef
     * @return {?}
     */
    RouterInitializer.prototype.bootstrapListener = function (bootstrappedComponentRef) {
        var /** @type {?} */ opts = this.injector.get(ROUTER_CONFIGURATION);
        var /** @type {?} */ preloader = this.injector.get(RouterPreloader);
        var /** @type {?} */ router = this.injector.get(Router);
        var /** @type {?} */ ref = this.injector.get(__WEBPACK_IMPORTED_MODULE_2__angular_core__["g" /* ApplicationRef */]);
        if (bootstrappedComponentRef !== ref.components[0]) {
            return;
        }
        if (this.isLegacyEnabled(opts)) {
            router.initialNavigation();
        }
        else if (this.isLegacyDisabled(opts)) {
            router.setUpLocationChangeListener();
        }
        preloader.setUpPreloading();
        router.resetRootComponentType(ref.componentTypes[0]);
        this.resultOfPreactivationDone.next(/** @type {?} */ ((null)));
        this.resultOfPreactivationDone.complete();
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    RouterInitializer.prototype.isLegacyEnabled = function (opts) {
        return opts.initialNavigation === 'legacy_enabled' || opts.initialNavigation === true ||
            opts.initialNavigation === undefined;
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    RouterInitializer.prototype.isLegacyDisabled = function (opts) {
        return opts.initialNavigation === 'legacy_disabled' || opts.initialNavigation === false;
    };
    return RouterInitializer;
}());
RouterInitializer.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["C" /* Injectable */] },
];
/**
 * @nocollapse
 */
RouterInitializer.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_2__angular_core__["E" /* Injector */], },
]; };
/**
 * @param {?} r
 * @return {?}
 */
function getAppInitializer(r) {
    return r.appInitializer.bind(r);
}
/**
 * @param {?} r
 * @return {?}
 */
function getBootstrapListener(r) {
    return r.bootstrapListener.bind(r);
}
/**
 * A token for the router initializer that will be called after the app is bootstrapped.
 *
 * \@experimental
 */
var ROUTER_INITIALIZER = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["D" /* InjectionToken */]('Router Initializer');
/**
 * @return {?}
 */
function provideRouterInitializer() {
    return [
        RouterInitializer,
        {
            provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["d" /* APP_INITIALIZER */],
            multi: true,
            useFactory: getAppInitializer,
            deps: [RouterInitializer]
        },
        { provide: ROUTER_INITIALIZER, useFactory: getBootstrapListener, deps: [RouterInitializer] },
        { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* APP_BOOTSTRAP_LISTENER */], multi: true, useExisting: ROUTER_INITIALIZER },
    ];
}
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the common package.
 */
/**
 * \@stable
 */
var VERSION = new __WEBPACK_IMPORTED_MODULE_2__angular_core__["_15" /* Version */]('4.4.5');
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @module
 * @description
 * Entry point for all public APIs of the router package.
 */
// This file only reexports content of the `src` folder. Keep it that way.
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=router.es5.js.map


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/postcss-loader/index.js!./node_modules/sass-loader/lib/loader.js?{\"sourceMap\":true}!./demo/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/rxjs/BehaviorSubject.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subject_1 = __webpack_require__("./node_modules/rxjs/Subject.js");
var ObjectUnsubscribedError_1 = __webpack_require__("./node_modules/rxjs/util/ObjectUnsubscribedError.js");
/**
 * @class BehaviorSubject<T>
 */
var BehaviorSubject = (function (_super) {
    __extends(BehaviorSubject, _super);
    function BehaviorSubject(_value) {
        _super.call(this);
        this._value = _value;
    }
    Object.defineProperty(BehaviorSubject.prototype, "value", {
        get: function () {
            return this.getValue();
        },
        enumerable: true,
        configurable: true
    });
    BehaviorSubject.prototype._subscribe = function (subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        if (subscription && !subscription.closed) {
            subscriber.next(this._value);
        }
        return subscription;
    };
    BehaviorSubject.prototype.getValue = function () {
        if (this.hasError) {
            throw this.thrownError;
        }
        else if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return this._value;
        }
    };
    BehaviorSubject.prototype.next = function (value) {
        _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject;
}(Subject_1.Subject));
exports.BehaviorSubject = BehaviorSubject;
//# sourceMappingURL=BehaviorSubject.js.map

/***/ }),

/***/ "./node_modules/rxjs/Notification.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
/**
 * Represents a push-based event or value that an {@link Observable} can emit.
 * This class is particularly useful for operators that manage notifications,
 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
 * others. Besides wrapping the actual delivered value, it also annotates it
 * with metadata of, for instance, what type of push message it is (`next`,
 * `error`, or `complete`).
 *
 * @see {@link materialize}
 * @see {@link dematerialize}
 * @see {@link observeOn}
 *
 * @class Notification<T>
 */
var Notification = (function () {
    function Notification(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === 'N';
    }
    /**
     * Delivers to the given `observer` the value wrapped by this Notification.
     * @param {Observer} observer
     * @return
     */
    Notification.prototype.observe = function (observer) {
        switch (this.kind) {
            case 'N':
                return observer.next && observer.next(this.value);
            case 'E':
                return observer.error && observer.error(this.error);
            case 'C':
                return observer.complete && observer.complete();
        }
    };
    /**
     * Given some {@link Observer} callbacks, deliver the value represented by the
     * current Notification to the correctly corresponding callback.
     * @param {function(value: T): void} next An Observer `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.do = function (next, error, complete) {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return next && next(this.value);
            case 'E':
                return error && error(this.error);
            case 'C':
                return complete && complete();
        }
    };
    /**
     * Takes an Observer or its individual callback functions, and calls `observe`
     * or `do` methods accordingly.
     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
     * the `next` callback.
     * @param {function(err: any): void} [error] An Observer `error` callback.
     * @param {function(): void} [complete] An Observer `complete` callback.
     * @return {any}
     */
    Notification.prototype.accept = function (nextOrObserver, error, complete) {
        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
            return this.observe(nextOrObserver);
        }
        else {
            return this.do(nextOrObserver, error, complete);
        }
    };
    /**
     * Returns a simple Observable that just delivers the notification represented
     * by this Notification instance.
     * @return {any}
     */
    Notification.prototype.toObservable = function () {
        var kind = this.kind;
        switch (kind) {
            case 'N':
                return Observable_1.Observable.of(this.value);
            case 'E':
                return Observable_1.Observable.throw(this.error);
            case 'C':
                return Observable_1.Observable.empty();
        }
        throw new Error('unexpected notification kind value');
    };
    /**
     * A shortcut to create a Notification instance of the type `next` from a
     * given value.
     * @param {T} value The `next` value.
     * @return {Notification<T>} The "next" Notification representing the
     * argument.
     */
    Notification.createNext = function (value) {
        if (typeof value !== 'undefined') {
            return new Notification('N', value);
        }
        return Notification.undefinedValueNotification;
    };
    /**
     * A shortcut to create a Notification instance of the type `error` from a
     * given error.
     * @param {any} [err] The `error` error.
     * @return {Notification<T>} The "error" Notification representing the
     * argument.
     */
    Notification.createError = function (err) {
        return new Notification('E', undefined, err);
    };
    /**
     * A shortcut to create a Notification instance of the type `complete`.
     * @return {Notification<any>} The valueless "complete" Notification.
     */
    Notification.createComplete = function () {
        return Notification.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map

/***/ }),

/***/ "./node_modules/rxjs/add/operator/map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var map_1 = __webpack_require__("./node_modules/rxjs/operator/map.js");
Observable_1.Observable.prototype.map = map_1.map;
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "./node_modules/rxjs/add/operator/toPromise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var toPromise_1 = __webpack_require__("./node_modules/rxjs/operator/toPromise.js");
Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
//# sourceMappingURL=toPromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/ArrayLikeObservable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var ScalarObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ScalarObservable.js");
var EmptyObservable_1 = __webpack_require__("./node_modules/rxjs/observable/EmptyObservable.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var ArrayLikeObservable = (function (_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, scheduler) {
        _super.call(this);
        this.arrayLike = arrayLike;
        this.scheduler = scheduler;
        if (!scheduler && arrayLike.length === 1) {
            this._isScalar = true;
            this.value = arrayLike[0];
        }
    }
    ArrayLikeObservable.create = function (arrayLike, scheduler) {
        var length = arrayLike.length;
        if (length === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else if (length === 1) {
            return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
        }
        else {
            return new ArrayLikeObservable(arrayLike, scheduler);
        }
    };
    ArrayLikeObservable.dispatch = function (state) {
        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
        if (subscriber.closed) {
            return;
        }
        if (index >= length) {
            subscriber.complete();
            return;
        }
        subscriber.next(arrayLike[index]);
        state.index = index + 1;
        this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
        var length = arrayLike.length;
        if (scheduler) {
            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
            });
        }
        else {
            for (var i = 0; i < length && !subscriber.closed; i++) {
                subscriber.next(arrayLike[i]);
            }
            subscriber.complete();
        }
    };
    return ArrayLikeObservable;
}(Observable_1.Observable));
exports.ArrayLikeObservable = ArrayLikeObservable;
//# sourceMappingURL=ArrayLikeObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/FromObservable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isArray_1 = __webpack_require__("./node_modules/rxjs/util/isArray.js");
var isArrayLike_1 = __webpack_require__("./node_modules/rxjs/util/isArrayLike.js");
var isPromise_1 = __webpack_require__("./node_modules/rxjs/util/isPromise.js");
var PromiseObservable_1 = __webpack_require__("./node_modules/rxjs/observable/PromiseObservable.js");
var IteratorObservable_1 = __webpack_require__("./node_modules/rxjs/observable/IteratorObservable.js");
var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
var ArrayLikeObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayLikeObservable.js");
var iterator_1 = __webpack_require__("./node_modules/rxjs/symbol/iterator.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var observeOn_1 = __webpack_require__("./node_modules/rxjs/operator/observeOn.js");
var observable_1 = __webpack_require__("./node_modules/rxjs/symbol/observable.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var FromObservable = (function (_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
        _super.call(this, null);
        this.ish = ish;
        this.scheduler = scheduler;
    }
    /**
     * Creates an Observable from an Array, an array-like object, a Promise, an
     * iterable object, or an Observable-like object.
     *
     * <span class="informal">Converts almost anything to an Observable.</span>
     *
     * <img src="./img/from.png" width="100%">
     *
     * Convert various other objects and data types into Observables. `from`
     * converts a Promise or an array-like or an
     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
     * object into an Observable that emits the items in that promise or array or
     * iterable. A String, in this context, is treated as an array of characters.
     * Observable-like objects (contains a function named with the ES2015 Symbol
     * for Observable) can also be converted through this operator.
     *
     * @example <caption>Converts an array to an Observable</caption>
     * var array = [10, 20, 30];
     * var result = Rx.Observable.from(array);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 10 20 30
     *
     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
     * function* generateDoubles(seed) {
     *   var i = seed;
     *   while (true) {
     *     yield i;
     *     i = 2 * i; // double it
     *   }
     * }
     *
     * var iterator = generateDoubles(3);
     * var result = Rx.Observable.from(iterator).take(10);
     * result.subscribe(x => console.log(x));
     *
     * // Results in the following:
     * // 3 6 12 24 48 96 192 384 768 1536
     *
     * @see {@link create}
     * @see {@link fromEvent}
     * @see {@link fromEventPattern}
     * @see {@link fromPromise}
     *
     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
     * Observable-like, an Array, an iterable or an array-like object to be
     * converted.
     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
     * emissions of values.
     * @return {Observable<T>} The Observable whose values are originally from the
     * input object that was converted.
     * @static true
     * @name from
     * @owner Observable
     */
    FromObservable.create = function (ish, scheduler) {
        if (ish != null) {
            if (typeof ish[observable_1.observable] === 'function') {
                if (ish instanceof Observable_1.Observable && !scheduler) {
                    return ish;
                }
                return new FromObservable(ish, scheduler);
            }
            else if (isArray_1.isArray(ish)) {
                return new ArrayObservable_1.ArrayObservable(ish, scheduler);
            }
            else if (isPromise_1.isPromise(ish)) {
                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
            }
            else if (typeof ish[iterator_1.iterator] === 'function' || typeof ish === 'string') {
                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
            }
            else if (isArrayLike_1.isArrayLike(ish)) {
                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
            }
        }
        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function (subscriber) {
        var ish = this.ish;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            return ish[observable_1.observable]().subscribe(subscriber);
        }
        else {
            return ish[observable_1.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
        }
    };
    return FromObservable;
}(Observable_1.Observable));
exports.FromObservable = FromObservable;
//# sourceMappingURL=FromObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/IteratorObservable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
var iterator_1 = __webpack_require__("./node_modules/rxjs/symbol/iterator.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var IteratorObservable = (function (_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, scheduler) {
        _super.call(this);
        this.scheduler = scheduler;
        if (iterator == null) {
            throw new Error('iterator cannot be null.');
        }
        this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function (iterator, scheduler) {
        return new IteratorObservable(iterator, scheduler);
    };
    IteratorObservable.dispatch = function (state) {
        var index = state.index, hasError = state.hasError, iterator = state.iterator, subscriber = state.subscriber;
        if (hasError) {
            subscriber.error(state.error);
            return;
        }
        var result = iterator.next();
        if (result.done) {
            subscriber.complete();
            return;
        }
        subscriber.next(result.value);
        state.index = index + 1;
        if (subscriber.closed) {
            if (typeof iterator.return === 'function') {
                iterator.return();
            }
            return;
        }
        this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function (subscriber) {
        var index = 0;
        var _a = this, iterator = _a.iterator, scheduler = _a.scheduler;
        if (scheduler) {
            return scheduler.schedule(IteratorObservable.dispatch, 0, {
                index: index, iterator: iterator, subscriber: subscriber
            });
        }
        else {
            do {
                var result = iterator.next();
                if (result.done) {
                    subscriber.complete();
                    break;
                }
                else {
                    subscriber.next(result.value);
                }
                if (subscriber.closed) {
                    if (typeof iterator.return === 'function') {
                        iterator.return();
                    }
                    break;
                }
            } while (true);
        }
    };
    return IteratorObservable;
}(Observable_1.Observable));
exports.IteratorObservable = IteratorObservable;
var StringIterator = (function () {
    function StringIterator(str, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = str.length; }
        this.str = str;
        this.idx = idx;
        this.len = len;
    }
    StringIterator.prototype[iterator_1.iterator] = function () { return (this); };
    StringIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.str.charAt(this.idx++)
        } : {
            done: true,
            value: undefined
        };
    };
    return StringIterator;
}());
var ArrayIterator = (function () {
    function ArrayIterator(arr, idx, len) {
        if (idx === void 0) { idx = 0; }
        if (len === void 0) { len = toLength(arr); }
        this.arr = arr;
        this.idx = idx;
        this.len = len;
    }
    ArrayIterator.prototype[iterator_1.iterator] = function () { return this; };
    ArrayIterator.prototype.next = function () {
        return this.idx < this.len ? {
            done: false,
            value: this.arr[this.idx++]
        } : {
            done: true,
            value: undefined
        };
    };
    return ArrayIterator;
}());
function getIterator(obj) {
    var i = obj[iterator_1.iterator];
    if (!i && typeof obj === 'string') {
        return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
        return new ArrayIterator(obj);
    }
    if (!i) {
        throw new TypeError('object is not iterable');
    }
    return obj[iterator_1.iterator]();
}
var maxSafeInteger = Math.pow(2, 53) - 1;
function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
        return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
        return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
        return 0;
    }
    if (len > maxSafeInteger) {
        return maxSafeInteger;
    }
    return len;
}
function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
}
function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
        return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
        return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
}
//# sourceMappingURL=IteratorObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/PromiseObservable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/Observable.js");
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @extends {Ignored}
 * @hide true
 */
var PromiseObservable = (function (_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
        _super.call(this);
        this.promise = promise;
        this.scheduler = scheduler;
    }
    /**
     * Converts a Promise to an Observable.
     *
     * <span class="informal">Returns an Observable that just emits the Promise's
     * resolved value, then completes.</span>
     *
     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
     * Observable. If the Promise resolves with a value, the output Observable
     * emits that resolved value as a `next`, and then completes. If the Promise
     * is rejected, then the output Observable emits the corresponding Error.
     *
     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
     * result.subscribe(x => console.log(x), e => console.error(e));
     *
     * @see {@link bindCallback}
     * @see {@link from}
     *
     * @param {PromiseLike<T>} promise The promise to be converted.
     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
     * the delivery of the resolved value (or the rejection).
     * @return {Observable<T>} An Observable which wraps the Promise.
     * @static true
     * @name fromPromise
     * @owner Observable
     */
    PromiseObservable.create = function (promise, scheduler) {
        return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function (subscriber) {
        var _this = this;
        var promise = this.promise;
        var scheduler = this.scheduler;
        if (scheduler == null) {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    subscriber.next(this.value);
                    subscriber.complete();
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.next(value);
                        subscriber.complete();
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.error(err);
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
        else {
            if (this._isScalar) {
                if (!subscriber.closed) {
                    return scheduler.schedule(dispatchNext, 0, { value: this.value, subscriber: subscriber });
                }
            }
            else {
                promise.then(function (value) {
                    _this.value = value;
                    _this._isScalar = true;
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchNext, 0, { value: value, subscriber: subscriber }));
                    }
                }, function (err) {
                    if (!subscriber.closed) {
                        subscriber.add(scheduler.schedule(dispatchError, 0, { err: err, subscriber: subscriber }));
                    }
                })
                    .then(null, function (err) {
                    // escape the promise trap, throw unhandled errors
                    root_1.root.setTimeout(function () { throw err; });
                });
            }
        }
    };
    return PromiseObservable;
}(Observable_1.Observable));
exports.PromiseObservable = PromiseObservable;
function dispatchNext(arg) {
    var value = arg.value, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
    }
}
function dispatchError(arg) {
    var err = arg.err, subscriber = arg.subscriber;
    if (!subscriber.closed) {
        subscriber.error(err);
    }
}
//# sourceMappingURL=PromiseObservable.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/from.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FromObservable_1 = __webpack_require__("./node_modules/rxjs/observable/FromObservable.js");
exports.from = FromObservable_1.FromObservable.create;
//# sourceMappingURL=from.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/fromPromise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var PromiseObservable_1 = __webpack_require__("./node_modules/rxjs/observable/PromiseObservable.js");
exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
//# sourceMappingURL=fromPromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/observable/of.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayObservable_1 = __webpack_require__("./node_modules/rxjs/observable/ArrayObservable.js");
exports.of = ArrayObservable_1.ArrayObservable.of;
//# sourceMappingURL=of.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/catch.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
/**
 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
 *
 * <img src="./img/catch.png" width="100%">
 *
 * @example <caption>Continues with a different Observable when there's an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n == 4) {
 * 	     throw 'four!';
 *     }
 *	   return n;
 *   })
 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, I, II, III, IV, V
 *
 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 * 	   if (n === 4) {
 * 	     throw 'four!';
 *     }
 * 	   return n;
 *   })
 *   .catch((err, caught) => caught)
 *   .take(30)
 *   .subscribe(x => console.log(x));
 *   // 1, 2, 3, 1, 2, 3, ...
 *
 * @example <caption>Throws a new error when the source Observable throws an error</caption>
 *
 * Observable.of(1, 2, 3, 4, 5)
 *   .map(n => {
 *     if (n == 4) {
 *       throw 'four!';
 *     }
 *     return n;
 *   })
 *   .catch(err => {
 *     throw 'error in source. Details: ' + err;
 *   })
 *   .subscribe(
 *     x => console.log(x),
 *     err => console.log(err)
 *   );
 *   // 1, 2, 3, error in source. Details: four!
 *
 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
 *  is returned by the `selector` will be used to continue the observable chain.
 * @return {Observable} An observable that originates from either the source or the observable returned by the
 *  catch `selector` function.
 * @method catch
 * @name catch
 * @owner Observable
 */
function _catch(selector) {
    var operator = new CatchOperator(selector);
    var caught = this.lift(operator);
    return (operator.caught = caught);
}
exports._catch = _catch;
var CatchOperator = (function () {
    function CatchOperator(selector) {
        this.selector = selector;
    }
    CatchOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
    };
    return CatchOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var CatchSubscriber = (function (_super) {
    __extends(CatchSubscriber, _super);
    function CatchSubscriber(destination, selector, caught) {
        _super.call(this, destination);
        this.selector = selector;
        this.caught = caught;
    }
    // NOTE: overriding `error` instead of `_error` because we don't want
    // to have this flag this subscriber as `isStopped`. We can mimic the
    // behavior of the RetrySubscriber (from the `retry` operator), where
    // we unsubscribe from our source chain, reset our Subscriber flags,
    // then subscribe to the selector result.
    CatchSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var result = void 0;
            try {
                result = this.selector(err, this.caught);
            }
            catch (err2) {
                _super.prototype.error.call(this, err2);
                return;
            }
            this._unsubscribeAndRecycle();
            this.add(subscribeToResult_1.subscribeToResult(this, result));
        }
    };
    return CatchSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/concatAll.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeAll_1 = __webpack_require__("./node_modules/rxjs/operator/mergeAll.js");
/* tslint:enable:max-line-length */
/**
 * Converts a higher-order Observable into a first-order Observable by
 * concatenating the inner Observables in order.
 *
 * <span class="informal">Flattens an Observable-of-Observables by putting one
 * inner Observable after the other.</span>
 *
 * <img src="./img/concatAll.png" width="100%">
 *
 * Joins every Observable emitted by the source (a higher-order Observable), in
 * a serial fashion. It subscribes to each inner Observable only after the
 * previous inner Observable has completed, and merges all of their values into
 * the returned observable.
 *
 * __Warning:__ If the source Observable emits Observables quickly and
 * endlessly, and the inner Observables it emits generally complete slower than
 * the source emits, you can run into memory issues as the incoming Observables
 * collect in an unbounded buffer.
 *
 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
 * var firstOrder = higherOrder.concatAll();
 * firstOrder.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link combineAll}
 * @see {@link concat}
 * @see {@link concatMap}
 * @see {@link concatMapTo}
 * @see {@link exhaust}
 * @see {@link mergeAll}
 * @see {@link switch}
 * @see {@link zipAll}
 *
 * @return {Observable} An Observable emitting values from all the inner
 * Observables concatenated.
 * @method concatAll
 * @owner Observable
 */
function concatAll() {
    return this.lift(new mergeAll_1.MergeAllOperator(1));
}
exports.concatAll = concatAll;
//# sourceMappingURL=concatAll.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/concatMap.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var mergeMap_1 = __webpack_require__("./node_modules/rxjs/operator/mergeMap.js");
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable, in a serialized fashion waiting for each one to complete before
 * merging the next.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link concatAll}.</span>
 *
 * <img src="./img/concatMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an (so-called "inner") Observable. Each new inner Observable is
 * concatenated with the previous inner Observable.
 *
 * __Warning:__ if source values arrive endlessly and faster than their
 * corresponding inner Observables can complete, it will result in memory issues
 * as inner Observables amass in an unbounded buffer waiting for their turn to
 * be subscribed to.
 *
 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
 * to `1`.
 *
 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // (results are not concurrent)
 * // For every click on the "document" it will emit values 0 to 3 spaced
 * // on a 1000ms interval
 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
 *
 * @see {@link concat}
 * @see {@link concatAll}
 * @see {@link concatMapTo}
 * @see {@link exhaustMap}
 * @see {@link mergeMap}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and taking values from each projected inner
 * Observable sequentially.
 * @method concatMap
 * @owner Observable
 */
function concatMap(project, resultSelector) {
    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
}
exports.concatMap = concatMap;
//# sourceMappingURL=concatMap.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/every.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
 *
 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
 *  Observable.of(1, 2, 3, 4, 5, 6)
 *     .every(x => x < 5)
 *     .subscribe(x => console.log(x)); // -> false
 *
 * @param {function} predicate A function for determining if an item meets a specified condition.
 * @param {any} [thisArg] Optional object to use for `this` in the callback.
 * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
 * @method every
 * @owner Observable
 */
function every(predicate, thisArg) {
    return this.lift(new EveryOperator(predicate, thisArg, this));
}
exports.every = every;
var EveryOperator = (function () {
    function EveryOperator(predicate, thisArg, source) {
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
    }
    EveryOperator.prototype.call = function (observer, source) {
        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
    };
    return EveryOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var EverySubscriber = (function (_super) {
    __extends(EverySubscriber, _super);
    function EverySubscriber(destination, predicate, thisArg, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.source = source;
        this.index = 0;
        this.thisArg = thisArg || this;
    }
    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
        this.destination.next(everyValueMatch);
        this.destination.complete();
    };
    EverySubscriber.prototype._next = function (value) {
        var result = false;
        try {
            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (!result) {
            this.notifyComplete(false);
        }
    };
    EverySubscriber.prototype._complete = function () {
        this.notifyComplete(true);
    };
    return EverySubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=every.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/filter.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/* tslint:enable:max-line-length */
/**
 * Filter items emitted by the source Observable by only emitting those that
 * satisfy a specified predicate.
 *
 * <span class="informal">Like
 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
 * it only emits a value from the source if it passes a criterion function.</span>
 *
 * <img src="./img/filter.png" width="100%">
 *
 * Similar to the well-known `Array.prototype.filter` method, this operator
 * takes values from the source Observable, passes them through a `predicate`
 * function and only emits those values that yielded `true`.
 *
 * @example <caption>Emit only click events whose target was a DIV element</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
 * clicksOnDivs.subscribe(x => console.log(x));
 *
 * @see {@link distinct}
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link ignoreElements}
 * @see {@link partition}
 * @see {@link skip}
 *
 * @param {function(value: T, index: number): boolean} predicate A function that
 * evaluates each value emitted by the source Observable. If it returns `true`,
 * the value is emitted, if `false` the value is not passed to the output
 * Observable. The `index` parameter is the number `i` for the i-th source
 * emission that has happened since the subscription, starting from the number
 * `0`.
 * @param {any} [thisArg] An optional argument to determine the value of `this`
 * in the `predicate` function.
 * @return {Observable} An Observable of values from the source that were
 * allowed by the `predicate` function.
 * @method filter
 * @owner Observable
 */
function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
}
exports.filter = filter;
var FilterOperator = (function () {
    function FilterOperator(predicate, thisArg) {
        this.predicate = predicate;
        this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FilterSubscriber = (function (_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.thisArg = thisArg;
        this.count = 0;
    }
    // the try catch block below is left specifically for
    // optimization and perf reasons. a tryCatcher is not necessary here.
    FilterSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.predicate.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this.destination.next(value);
        }
    };
    return FilterSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=filter.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/first.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var EmptyError_1 = __webpack_require__("./node_modules/rxjs/util/EmptyError.js");
/**
 * Emits only the first value (or the first value that meets some condition)
 * emitted by the source Observable.
 *
 * <span class="informal">Emits only the first value. Or emits only the first
 * value that passes some test.</span>
 *
 * <img src="./img/first.png" width="100%">
 *
 * If called with no arguments, `first` emits the first value of the source
 * Observable, then completes. If called with a `predicate` function, `first`
 * emits the first value of the source that matches the specified condition. It
 * may also take a `resultSelector` function to produce the output value from
 * the input value, and a `defaultValue` to emit in case the source completes
 * before it is able to emit a valid value. Throws an error if `defaultValue`
 * was not provided and a matching element is not found.
 *
 * @example <caption>Emit only the first click that happens on the DOM</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first();
 * result.subscribe(x => console.log(x));
 *
 * @example <caption>Emits the first click that happens on a DIV</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
 * result.subscribe(x => console.log(x));
 *
 * @see {@link filter}
 * @see {@link find}
 * @see {@link take}
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 *
 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
 * An optional function called with each item to test for condition matching.
 * @param {function(value: T, index: number): R} [resultSelector] A function to
 * produce the value on the output Observable based on the values
 * and the indices of the source Observable. The arguments passed to this
 * function are:
 * - `value`: the value that was emitted on the source.
 * - `index`: the "index" of the value from the source.
 * @param {R} [defaultValue] The default value emitted in case no valid value
 * was found on the source.
 * @return {Observable<T|R>} An Observable of the first item that matches the
 * condition.
 * @method first
 * @owner Observable
 */
function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
}
exports.first = first;
var FirstOperator = (function () {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    FirstOperator.prototype.call = function (observer, source) {
        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return FirstOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var FirstSubscriber = (function (_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.index = 0;
        this.hasCompleted = false;
        this._emitted = false;
    }
    FirstSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            this._emit(value, index);
        }
    };
    FirstSubscriber.prototype._emit = function (value, index) {
        if (this.resultSelector) {
            this._tryResultSelector(value, index);
            return;
        }
        this._emitFinal(value);
    };
    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this._emitFinal(result);
    };
    FirstSubscriber.prototype._emitFinal = function (value) {
        var destination = this.destination;
        if (!this._emitted) {
            this._emitted = true;
            destination.next(value);
            destination.complete();
            this.hasCompleted = true;
        }
    };
    FirstSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
            destination.next(this.defaultValue);
            destination.complete();
        }
        else if (!this.hasCompleted) {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return FirstSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=first.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/last.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var EmptyError_1 = __webpack_require__("./node_modules/rxjs/util/EmptyError.js");
/* tslint:enable:max-line-length */
/**
 * Returns an Observable that emits only the last item emitted by the source Observable.
 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
 * the last item from the source Observable, the resulting Observable will emit the last item
 * from the source Observable that satisfies the predicate.
 *
 * <img src="./img/last.png" width="100%">
 *
 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
 * callback if the Observable completes before any `next` notification was sent.
 * @param {function} predicate - The condition any source emitted item has to satisfy.
 * @return {Observable} An Observable that emits only the last item satisfying the given condition
 * from the source, or an NoSuchElementException if no such items are emitted.
 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
 * @method last
 * @owner Observable
 */
function last(predicate, resultSelector, defaultValue) {
    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
}
exports.last = last;
var LastOperator = (function () {
    function LastOperator(predicate, resultSelector, defaultValue, source) {
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
    }
    LastOperator.prototype.call = function (observer, source) {
        return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return LastOperator;
}());
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var LastSubscriber = (function (_super) {
    __extends(LastSubscriber, _super);
    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
        _super.call(this, destination);
        this.predicate = predicate;
        this.resultSelector = resultSelector;
        this.defaultValue = defaultValue;
        this.source = source;
        this.hasValue = false;
        this.index = 0;
        if (typeof defaultValue !== 'undefined') {
            this.lastValue = defaultValue;
            this.hasValue = true;
        }
    }
    LastSubscriber.prototype._next = function (value) {
        var index = this.index++;
        if (this.predicate) {
            this._tryPredicate(value, index);
        }
        else {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._tryPredicate = function (value, index) {
        var result;
        try {
            result = this.predicate(value, index, this.source);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        if (result) {
            if (this.resultSelector) {
                this._tryResultSelector(value, index);
                return;
            }
            this.lastValue = value;
            this.hasValue = true;
        }
    };
    LastSubscriber.prototype._tryResultSelector = function (value, index) {
        var result;
        try {
            result = this.resultSelector(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.lastValue = result;
        this.hasValue = true;
    };
    LastSubscriber.prototype._complete = function () {
        var destination = this.destination;
        if (this.hasValue) {
            destination.next(this.lastValue);
            destination.complete();
        }
        else {
            destination.error(new EmptyError_1.EmptyError);
        }
    };
    return LastSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=last.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
 * it passes each source value through a transformation function to get
 * corresponding output values.</span>
 *
 * <img src="./img/map.png" width="100%">
 *
 * Similar to the well known `Array.prototype.map` function, this operator
 * applies a projection to each value and emits that projection in the output
 * Observable.
 *
 * @example <caption>Map every click to the clientX position of that click</caption>
 * var clicks = Rx.Observable.fromEvent(document, 'click');
 * var positions = clicks.map(ev => ev.clientX);
 * positions.subscribe(x => console.log(x));
 *
 * @see {@link mapTo}
 * @see {@link pluck}
 *
 * @param {function(value: T, index: number): R} project The function to apply
 * to each `value` emitted by the source Observable. The `index` parameter is
 * the number `i` for the i-th emission that has happened since the
 * subscription, starting from the number `0`.
 * @param {any} [thisArg] An optional argument to define what `this` is in the
 * `project` function.
 * @return {Observable<R>} An Observable that emits the values from the source
 * Observable transformed by the given `project` function.
 * @method map
 * @owner Observable
 */
function map(project, thisArg) {
    if (typeof project !== 'function') {
        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
}
exports.map = map;
var MapOperator = (function () {
    function MapOperator(project, thisArg) {
        this.project = project;
        this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
}());
exports.MapOperator = MapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MapSubscriber = (function (_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
        _super.call(this, destination);
        this.project = project;
        this.count = 0;
        this.thisArg = thisArg || this;
    }
    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    MapSubscriber.prototype._next = function (value) {
        var result;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    return MapSubscriber;
}(Subscriber_1.Subscriber));
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/mergeMap.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var subscribeToResult_1 = __webpack_require__("./node_modules/rxjs/util/subscribeToResult.js");
var OuterSubscriber_1 = __webpack_require__("./node_modules/rxjs/OuterSubscriber.js");
/* tslint:enable:max-line-length */
/**
 * Projects each source value to an Observable which is merged in the output
 * Observable.
 *
 * <span class="informal">Maps each value to an Observable, then flattens all of
 * these inner Observables using {@link mergeAll}.</span>
 *
 * <img src="./img/mergeMap.png" width="100%">
 *
 * Returns an Observable that emits items based on applying a function that you
 * supply to each item emitted by the source Observable, where that function
 * returns an Observable, and then merging those resulting Observables and
 * emitting the results of this merger.
 *
 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
 * var letters = Rx.Observable.of('a', 'b', 'c');
 * var result = letters.mergeMap(x =>
 *   Rx.Observable.interval(1000).map(i => x+i)
 * );
 * result.subscribe(x => console.log(x));
 *
 * // Results in the following:
 * // a0
 * // b0
 * // c0
 * // a1
 * // b1
 * // c1
 * // continues to list a,b,c with respective ascending integers
 *
 * @see {@link concatMap}
 * @see {@link exhaustMap}
 * @see {@link merge}
 * @see {@link mergeAll}
 * @see {@link mergeMapTo}
 * @see {@link mergeScan}
 * @see {@link switchMap}
 *
 * @param {function(value: T, ?index: number): ObservableInput} project A function
 * that, when applied to an item emitted by the source Observable, returns an
 * Observable.
 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
 * A function to produce the value on the output Observable based on the values
 * and the indices of the source (outer) emission and the inner Observable
 * emission. The arguments passed to this function are:
 * - `outerValue`: the value that came from the source
 * - `innerValue`: the value that came from the projected Observable
 * - `outerIndex`: the "index" of the value that came from the source
 * - `innerIndex`: the "index" of the value from the projected Observable
 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
 * Observables being subscribed to concurrently.
 * @return {Observable} An Observable that emits the result of applying the
 * projection function (and the optional `resultSelector`) to each item emitted
 * by the source Observable and merging the results of the Observables obtained
 * from this transformation.
 * @method mergeMap
 * @owner Observable
 */
function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
    if (typeof resultSelector === 'number') {
        concurrent = resultSelector;
        resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
}
exports.mergeMap = mergeMap;
var MergeMapOperator = (function () {
    function MergeMapOperator(project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function (observer, source) {
        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
}());
exports.MergeMapOperator = MergeMapOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var MergeMapSubscriber = (function (_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
        _super.call(this, destination);
        this.project = project;
        this.resultSelector = resultSelector;
        this.concurrent = concurrent;
        this.hasCompleted = false;
        this.buffer = [];
        this.active = 0;
        this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function (value) {
        if (this.active < this.concurrent) {
            this._tryNext(value);
        }
        else {
            this.buffer.push(value);
        }
    };
    MergeMapSubscriber.prototype._tryNext = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.active++;
        this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
        this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function () {
        this.hasCompleted = true;
        if (this.active === 0 && this.buffer.length === 0) {
            this.destination.complete();
        }
    };
    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
        if (this.resultSelector) {
            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        else {
            this.destination.next(innerValue);
        }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
        var result;
        try {
            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
        var buffer = this.buffer;
        this.remove(innerSub);
        this.active--;
        if (buffer.length > 0) {
            this._next(buffer.shift());
        }
        else if (this.active === 0 && this.hasCompleted) {
            this.destination.complete();
        }
    };
    return MergeMapSubscriber;
}(OuterSubscriber_1.OuterSubscriber));
exports.MergeMapSubscriber = MergeMapSubscriber;
//# sourceMappingURL=mergeMap.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/observeOn.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
var Notification_1 = __webpack_require__("./node_modules/rxjs/Notification.js");
/**
 *
 * Re-emits all notifications from source Observable with specified scheduler.
 *
 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
 *
 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
 * notifications emitted by the source Observable. It might be useful, if you do not have control over
 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
 *
 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
 * little bit more, to ensure that they are emitted at expected moments.
 *
 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
 * will delay all notifications - including error notifications - while `delay` will pass through error
 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
 * for notification emissions in general.
 *
 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
 *                                               // with async scheduler by default...
 *
 * intervals
 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
 * .subscribe(val => {                           // scheduler to ensure smooth animation.
 *   someDiv.style.height = val + 'px';
 * });
 *
 * @see {@link delay}
 *
 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
 * but with provided scheduler.
 *
 * @method observeOn
 * @owner Observable
 */
function observeOn(scheduler, delay) {
    if (delay === void 0) { delay = 0; }
    return this.lift(new ObserveOnOperator(scheduler, delay));
}
exports.observeOn = observeOn;
var ObserveOnOperator = (function () {
    function ObserveOnOperator(scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
}());
exports.ObserveOnOperator = ObserveOnOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ObserveOnSubscriber = (function (_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
        if (delay === void 0) { delay = 0; }
        _super.call(this, destination);
        this.scheduler = scheduler;
        this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function (arg) {
        var notification = arg.notification, destination = arg.destination;
        notification.observe(destination);
        this.unsubscribe();
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function (value) {
        this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function (err) {
        this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function () {
        this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
}(Subscriber_1.Subscriber));
exports.ObserveOnSubscriber = ObserveOnSubscriber;
var ObserveOnMessage = (function () {
    function ObserveOnMessage(notification, destination) {
        this.notification = notification;
        this.destination = destination;
    }
    return ObserveOnMessage;
}());
exports.ObserveOnMessage = ObserveOnMessage;
//# sourceMappingURL=observeOn.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/reduce.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscriber_1 = __webpack_require__("./node_modules/rxjs/Subscriber.js");
/* tslint:enable:max-line-length */
/**
 * Applies an accumulator function over the source Observable, and returns the
 * accumulated result when the source completes, given an optional seed value.
 *
 * <span class="informal">Combines together all values emitted on the source,
 * using an accumulator function that knows how to join a new source value into
 * the accumulation from the past.</span>
 *
 * <img src="./img/reduce.png" width="100%">
 *
 * Like
 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
 * `reduce` applies an `accumulator` function against an accumulation and each
 * value of the source Observable (from the past) to reduce it to a single
 * value, emitted on the output Observable. Note that `reduce` will only emit
 * one value, only when the source Observable completes. It is equivalent to
 * applying operator {@link scan} followed by operator {@link last}.
 *
 * Returns an Observable that applies a specified `accumulator` function to each
 * item emitted by the source Observable. If a `seed` value is specified, then
 * that value will be used as the initial value for the accumulator. If no seed
 * value is specified, the first item of the source is used as the seed.
 *
 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
 *   .takeUntil(Rx.Observable.interval(5000));
 * var ones = clicksInFiveSeconds.mapTo(1);
 * var seed = 0;
 * var count = ones.reduce((acc, one) => acc + one, seed);
 * count.subscribe(x => console.log(x));
 *
 * @see {@link count}
 * @see {@link expand}
 * @see {@link mergeScan}
 * @see {@link scan}
 *
 * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
 * called on each source value.
 * @param {R} [seed] The initial accumulation value.
 * @return {Observable<R>} An Observable that emits a single value that is the
 * result of accumulating the values emitted by the source Observable.
 * @method reduce
 * @owner Observable
 */
function reduce(accumulator, seed) {
    var hasSeed = false;
    // providing a seed of `undefined` *should* be valid and trigger
    // hasSeed! so don't use `seed !== undefined` checks!
    // For this reason, we have to check it here at the original call site
    // otherwise inside Operator/Subscriber we won't know if `undefined`
    // means they didn't provide anything or if they literally provided `undefined`
    if (arguments.length >= 2) {
        hasSeed = true;
    }
    return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
}
exports.reduce = reduce;
var ReduceOperator = (function () {
    function ReduceOperator(accumulator, seed, hasSeed) {
        if (hasSeed === void 0) { hasSeed = false; }
        this.accumulator = accumulator;
        this.seed = seed;
        this.hasSeed = hasSeed;
    }
    ReduceOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
    };
    return ReduceOperator;
}());
exports.ReduceOperator = ReduceOperator;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var ReduceSubscriber = (function (_super) {
    __extends(ReduceSubscriber, _super);
    function ReduceSubscriber(destination, accumulator, seed, hasSeed) {
        _super.call(this, destination);
        this.accumulator = accumulator;
        this.hasSeed = hasSeed;
        this.index = 0;
        this.hasValue = false;
        this.acc = seed;
        if (!this.hasSeed) {
            this.index++;
        }
    }
    ReduceSubscriber.prototype._next = function (value) {
        if (this.hasValue || (this.hasValue = this.hasSeed)) {
            this._tryReduce(value);
        }
        else {
            this.acc = value;
            this.hasValue = true;
        }
    };
    ReduceSubscriber.prototype._tryReduce = function (value) {
        var result;
        try {
            result = this.accumulator(this.acc, value, this.index++);
        }
        catch (err) {
            this.destination.error(err);
            return;
        }
        this.acc = result;
    };
    ReduceSubscriber.prototype._complete = function () {
        if (this.hasValue || this.hasSeed) {
            this.destination.next(this.acc);
        }
        this.destination.complete();
    };
    return ReduceSubscriber;
}(Subscriber_1.Subscriber));
exports.ReduceSubscriber = ReduceSubscriber;
//# sourceMappingURL=reduce.js.map

/***/ }),

/***/ "./node_modules/rxjs/operator/toPromise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__("./node_modules/rxjs/util/root.js");
/* tslint:enable:max-line-length */
/**
 * Converts an Observable sequence to a ES2015 compliant promise.
 *
 * @example
 * // Using normal ES2015
 * let source = Rx.Observable
 *   .of(42)
 *   .toPromise();
 *
 * source.then((value) => console.log('Value: %s', value));
 * // => Value: 42
 *
 * // Rejected Promise
 * // Using normal ES2015
 * let source = Rx.Observable
 *   .throw(new Error('woops'))
 *   .toPromise();
 *
 * source
 *   .then((value) => console.log('Value: %s', value))
 *   .catch((err) => console.log('Error: %s', err));
 * // => Error: Error: woops
 *
 * // Setting via the config
 * Rx.config.Promise = RSVP.Promise;
 *
 * let source = Rx.Observable
 *   .of(42)
 *   .toPromise();
 *
 * source.then((value) => console.log('Value: %s', value));
 * // => Value: 42
 *
 * // Setting via the method
 * let source = Rx.Observable
 *   .of(42)
 *   .toPromise(RSVP.Promise);
 *
 * source.then((value) => console.log('Value: %s', value));
 * // => Value: 42
 *
 * @param {PromiseConstructor} [PromiseCtor] The constructor of the promise. If not provided,
 * it will look for a constructor first in Rx.config.Promise then fall back to
 * the native Promise constructor if available.
 * @return {Promise<T>} An ES2015 compatible promise with the last value from
 * the observable sequence.
 * @method toPromise
 * @owner Observable
 */
function toPromise(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
            PromiseCtor = root_1.root.Rx.config.Promise;
        }
        else if (root_1.root.Promise) {
            PromiseCtor = root_1.root.Promise;
        }
    }
    if (!PromiseCtor) {
        throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function (resolve, reject) {
        var value;
        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
    });
}
exports.toPromise = toPromise;
//# sourceMappingURL=toPromise.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/EmptyError.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an Observable or a sequence was queried but has no
 * elements.
 *
 * @see {@link first}
 * @see {@link last}
 * @see {@link single}
 *
 * @class EmptyError
 */
var EmptyError = (function (_super) {
    __extends(EmptyError, _super);
    function EmptyError() {
        var err = _super.call(this, 'no elements in sequence');
        this.name = err.name = 'EmptyError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return EmptyError;
}(Error));
exports.EmptyError = EmptyError;
//# sourceMappingURL=EmptyError.js.map

/***/ }),

/***/ "./node_modules/rxjs/util/noop.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),

/***/ "./src/core.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Core; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_core_services_service__ = __webpack_require__("./src/services/core-services.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_base__ = __webpack_require__("./src/services/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jsonapi_config__ = __webpack_require__("./src/jsonapi-config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sources_http_service__ = __webpack_require__("./src/sources/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_util_noop__ = __webpack_require__("./node_modules/rxjs/util/noop.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_util_noop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_util_noop__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var Core = /** @class */ (function () {
    /** @ngInject */
    function Core(user_config, jsonapiHttp) {
        this.resourceServices = {};
        this.loadingsCounter = 0;
        this.loadingsStart = __WEBPACK_IMPORTED_MODULE_5_rxjs_util_noop__["noop"];
        this.loadingsDone = __WEBPACK_IMPORTED_MODULE_5_rxjs_util_noop__["noop"];
        this.loadingsError = __WEBPACK_IMPORTED_MODULE_5_rxjs_util_noop__["noop"];
        this.loadingsOffline = __WEBPACK_IMPORTED_MODULE_5_rxjs_util_noop__["noop"];
        this.config = new __WEBPACK_IMPORTED_MODULE_3__jsonapi_config__["a" /* JsonapiConfig */]();
        for (var k in this.config)
            this.config[k] = user_config[k] || this.config[k];
        Core_1.me = this;
        Core_1.injectedServices = {
            // migrationProblem
            JsonapiStoreService: 'xxxxxxxxxxxxxxxx',
            JsonapiHttp: jsonapiHttp,
            rsJsonapiConfig: this.config
        };
    }
    Core_1 = Core;
    Core.prototype._register = function (clase) {
        if (clase.type in this.resourceServices) {
            return false;
        }
        this.resourceServices[clase.type] = clase;
        return true;
    };
    Core.prototype.getResourceService = function (type) {
        return this.resourceServices[type];
    };
    Core.prototype.refreshLoadings = function (factor) {
        this.loadingsCounter += factor;
        if (this.loadingsCounter === 0) {
            this.loadingsDone();
        }
        else if (this.loadingsCounter === 1) {
            this.loadingsStart();
        }
    };
    Core.prototype.clearCache = function () {
        Core_1.injectedServices.JsonapiStoreService.clearCache();
        return true;
    };
    // just an helper
    Core.prototype.duplicateResource = function (resource) {
        var _this = this;
        var relations_alias_to_duplicate_too = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            relations_alias_to_duplicate_too[_i - 1] = arguments[_i];
        }
        var newresource = this.getResourceService(resource.type).new();
        newresource.attributes = __assign({}, newresource.attributes, resource.attributes);
        newresource.attributes.name = newresource.attributes.name + ' xXx';
        __WEBPACK_IMPORTED_MODULE_2__services_base__["a" /* Base */].forEach(resource.relationships, function (relationship, alias) {
            if ('id' in relationship.data) {
                // relation hasOne
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    newresource.addRelationship(_this.duplicateResource(relationship.data), alias);
                }
                else {
                    newresource.addRelationship(relationship.data, alias);
                }
            }
            else {
                // relation hasMany
                if (relations_alias_to_duplicate_too.indexOf(alias) > -1) {
                    __WEBPACK_IMPORTED_MODULE_2__services_base__["a" /* Base */].forEach(relationship.data, function (relationresource) {
                        newresource.addRelationship(_this.duplicateResource(relationresource), alias);
                    });
                }
                else {
                    newresource.addRelationships(relationship.data, alias);
                }
            }
        });
        return newresource;
    };
    Core = Core_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Optional */])()),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__jsonapi_config__["a" /* JsonapiConfig */],
            __WEBPACK_IMPORTED_MODULE_4__sources_http_service__["a" /* Http */]])
    ], Core);
    return Core;
    var Core_1;
}());

// migrationProblem
// angular.module('Jsonapi.services').service('JsonapiCore', Core);


/***/ }),

/***/ "./src/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ngx_jsonapi_module__ = __webpack_require__("./src/ngx-jsonapi.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ngx_jsonapi_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__("./src/core.ts");
/* unused harmony reexport JsonapiCore */

// import { IResource } from './interfaces';
// import { IService } from './interfaces';
// export { IResource };
// export { IService };



/***/ }),

/***/ "./src/jsonapi-config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JsonapiConfig; });
var JsonapiConfig = /** @class */ (function () {
    function JsonapiConfig() {
        this.url = 'http://yourdomain/api/v1/';
        this.params_separator = '?';
        this.delay = 0;
        this.unify_concurrency = true;
        this.cache_prerequests = true;
        this.parameters = {
            page: {
                number: 'page[number]',
                limit: 'page[limit]'
            }
        };
    }
    return JsonapiConfig;
}());



/***/ }),

/***/ "./src/ngx-jsonapi.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxJsonapiModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills__ = __webpack_require__("./src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("./node_modules/@angular/common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core__ = __webpack_require__("./src/core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__sources_http_service__ = __webpack_require__("./src/sources/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_noduplicatedhttpcalls_service__ = __webpack_require__("./src/services/noduplicatedhttpcalls.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__jsonapi_config__ = __webpack_require__("./src/jsonapi-config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var NgxJsonapiModule = /** @class */ (function () {
    function NgxJsonapiModule(parentModule, jsonapiCore) {
        if (parentModule) {
            throw new Error('NgxJsonapiModule is already loaded. Import it in the AppModule only');
        }
    }
    NgxJsonapiModule_1 = NgxJsonapiModule;
    NgxJsonapiModule.forRoot = function (config) {
        return {
            ngModule: NgxJsonapiModule_1,
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_8__jsonapi_config__["a" /* JsonapiConfig */], useValue: config }
            ]
        };
    };
    NgxJsonapiModule = NgxJsonapiModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_common__["b" /* CommonModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__core__["a" /* Core */],
                __WEBPACK_IMPORTED_MODULE_7__services_noduplicatedhttpcalls_service__["a" /* NoDuplicatedHttpCallsService */],
                __WEBPACK_IMPORTED_MODULE_6__sources_http_service__["a" /* Http */]
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["S" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* SkipSelf */])()),
        __metadata("design:paramtypes", [NgxJsonapiModule, __WEBPACK_IMPORTED_MODULE_5__core__["a" /* Core */]])
    ], NgxJsonapiModule);
    return NgxJsonapiModule;
    var NgxJsonapiModule_1;
}());



/***/ }),

/***/ "./src/parent-resource-service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParentResourceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_base__ = __webpack_require__("./src/services/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_util_isFunction__ = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_util_isFunction___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_isFunction__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_util_noop__ = __webpack_require__("./node_modules/rxjs/util/noop.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_util_noop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_util_noop__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};



var ParentResourceService = /** @class */ (function () {
    function ParentResourceService() {
    }
    /*
    This method sort params for all(), get(), delete() and save()
    */
    ParentResourceService.prototype.proccess_exec_params = function (exec_params) {
        // makes `params` optional
        if (Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_isFunction__["isFunction"])(exec_params.params)) {
            exec_params.fc_error = exec_params.fc_success;
            exec_params.fc_success = exec_params.params;
            exec_params.params = __assign({}, __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].Params);
        }
        else {
            if (typeof exec_params.params === 'undefined') {
                exec_params.params = __assign({}, __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].Params);
            }
            else {
                exec_params.params = __assign({}, __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].Params, exec_params.params);
            }
        }
        exec_params.fc_success = Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_isFunction__["isFunction"])(exec_params.fc_success) ? exec_params.fc_success : __WEBPACK_IMPORTED_MODULE_2_rxjs_util_noop__["noop"];
        exec_params.fc_error = Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_isFunction__["isFunction"])(exec_params.fc_error) ? exec_params.fc_error : undefined;
        return exec_params; // @todo
    };
    ParentResourceService.prototype.runFc = function (some_fc, param) {
        return Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_isFunction__["isFunction"])(some_fc) ? some_fc(param) : Object(__WEBPACK_IMPORTED_MODULE_2_rxjs_util_noop__["noop"])();
    };
    return ParentResourceService;
}());



/***/ }),

/***/ "./src/polyfills.ts":
/***/ (function(module, exports) {

// IE11 fix
// Ref: https://github.com/swimlane/ngx-charts/issues/386
if (typeof SVGElement.prototype.contains === 'undefined') {
    SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
}


/***/ }),

/***/ "./src/resource.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resource; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__("./src/core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_base__ = __webpack_require__("./src/services/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parent_resource_service__ = __webpack_require__("./src/parent-resource-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_path_builder__ = __webpack_require__("./src/services/path-builder.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_converter__ = __webpack_require__("./src/services/converter.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_util_isFunction__ = __webpack_require__("./node_modules/rxjs/util/isFunction.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_util_isFunction___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_util_isFunction__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_util_isArray__ = __webpack_require__("./node_modules/rxjs/util/isArray.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_util_isArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_util_isArray__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};




// import { UrlParamsBuilder } from './services/url-params-builder';



var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.is_new = true;
        _this.is_loading = false;
        _this.is_saving = false;
        _this.id = '';
        _this.type = '';
        _this.attributes = {};
        _this.relationships = {};
        return _this;
    }
    Resource.prototype.reset = function () {
        var _this = this;
        this.id = '';
        this.attributes = {};
        __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].forEach(this.getService().schema.attributes, function (value, key) {
            _this.attributes[key] = ('default' in value) ? value.default : undefined;
        });
        this.relationships = {};
        __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].forEach(this.getService().schema.relationships, function (value, key) {
            var relation = { data: {} };
            _this.relationships[key] = relation;
            if (_this.getService().schema.relationships[key].hasMany) {
                _this.relationships[key].data = __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].newCollection();
            }
        });
        this.is_new = true;
    };
    Resource.prototype.toObject = function (params) {
        var _this = this;
        params = __assign({}, __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].Params, params);
        var relationships = {};
        var included = [];
        var included_ids = []; // just for control don't repeat any resource
        // REALTIONSHIPS
        __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].forEach(this.relationships, function (relationship, relation_alias) {
            if (_this.getService().schema.relationships[relation_alias] && _this.getService().schema.relationships[relation_alias].hasMany) {
                // has many (hasMany:true)
                relationships[relation_alias] = { data: [] };
                __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].forEach(relationship.data, function (resource) {
                    var reational_object = { id: resource.id, type: resource.type };
                    relationships[relation_alias].data.push(reational_object);
                    // no se agregó aún a included && se ha pedido incluir con el parms.include
                    var temporal_id = resource.type + '_' + resource.id;
                    if (included_ids.indexOf(temporal_id) === -1 && params.include.indexOf(relation_alias) !== -1) {
                        included_ids.push(temporal_id);
                        included.push(resource.toObject({}).data);
                    }
                });
            }
            else {
                // has one (hasMany:false)
                var relationship_data = relationship.data;
                if (!('id' in relationship.data) && Object.keys(relationship.data).length > 0) {
                    console.warn(relation_alias + ' defined with hasMany:false, but I have a collection');
                }
                if (relationship_data.id && relationship_data.type) {
                    relationships[relation_alias] = { data: { id: relationship_data.id, type: relationship_data.type } };
                }
                else {
                    relationships[relation_alias] = { data: {} };
                }
                // no se agregó aún a included && se ha pedido incluir con el parms.include
                var temporal_id = relationship_data.type + '_' + relationship_data.id;
                if (included_ids.indexOf(temporal_id) === -1 && params.include.indexOf(relationship_data.type) !== -1) {
                    included_ids.push(temporal_id);
                    included.push(relationship_data.toObject({}).data);
                }
            }
        });
        // just for performance dont copy if not necessary
        var attributes;
        if (this.getService().parseToServer) {
            attributes = __assign({}, this.attributes);
            this.getService().parseToServer(attributes);
        }
        else {
            attributes = this.attributes;
        }
        var ret = {
            data: {
                type: this.type,
                id: this.id,
                attributes: attributes,
                relationships: relationships
            }
        };
        if (included.length > 0) {
            ret.included = included;
        }
        return ret;
    };
    Resource.prototype.save = function (params, fc_success, fc_error) {
        return this.__exec({ id: null, params: params, fc_success: fc_success, fc_error: fc_error, exec_type: 'save' });
    };
    Resource.prototype.__exec = function (exec_params) {
        var exec_pp = _super.prototype.proccess_exec_params.call(this, exec_params);
        switch (exec_params.exec_type) {
            case 'save':
                return this._save(exec_pp.params, exec_params.fc_success, exec_params.fc_error);
        }
    };
    Resource.prototype._save = function (params, fc_success, fc_error) {
        var _this = this;
        var promisesave = new Promise(function (resolve, reject) {
            if (_this.is_saving || _this.is_loading) {
                return;
            }
            _this.is_saving = true;
            var object = _this.toObject(params);
            // http request
            var path = new __WEBPACK_IMPORTED_MODULE_3__services_path_builder__["a" /* PathBuilder */]();
            path.applyParams(_this.getService(), params);
            if (_this.id) {
                path.appendPath(_this.id);
            }
            var promise = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.JsonapiHttp.exec(path.get(), _this.id ? 'PUT' : 'POST', object, !Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_util_isFunction__["isFunction"])(fc_error));
            promise.then(function (success) {
                _this.is_saving = false;
                // foce reload cache (for example, we add a new element)
                if (!_this.id) {
                    _this.getService().cachememory.deprecateCollections(path.get());
                    // migrationProblem
                    // this.getService().cachestore.deprecateCollections(path.get());
                }
                // is a resource?
                if ('id' in success.data.data) {
                    _this.id = success.data.data.id;
                    __WEBPACK_IMPORTED_MODULE_4__services_converter__["a" /* Converter */].build(success.data, _this);
                    /*
                    Si lo guardo en la caché, luego no queda bindeado con la vista
                    Usar {{ $ctrl.service.getCachedResources() | json }}, agregar uno nuevo, editar
                    */
                    // this.getService().cachememory.setResource(this);
                }
                else if (Object(__WEBPACK_IMPORTED_MODULE_6_rxjs_util_isArray__["isArray"])(success.data.data)) {
                    console.warn('Server return a collection when we save()', success.data.data);
                    /*
                    we request the service again, because server maybe are giving
                    us another type of resource (getService(resource.type))
                    */
                    var tempororay_collection = _this.getService().cachememory.getOrCreateCollection('justAnUpdate');
                    __WEBPACK_IMPORTED_MODULE_4__services_converter__["a" /* Converter */].build(success.data, tempororay_collection);
                    __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].forEach(tempororay_collection, function (resource_value, key) {
                        var res = __WEBPACK_IMPORTED_MODULE_4__services_converter__["a" /* Converter */].getService(resource_value.type).cachememory.resources[resource_value.id];
                        __WEBPACK_IMPORTED_MODULE_4__services_converter__["a" /* Converter */].getService(resource_value.type).cachememory.setResource(resource_value);
                        // migrationProblem
                        // Converter.getService(resource_value.type).cachestore.setResource(resource_value);
                        res.id = res.id + 'x';
                    });
                    console.warn('Temporal collection for a resource_value update', tempororay_collection);
                }
                _this.runFc(fc_success, success);
                resolve(success);
            }).catch(function (error) {
                _this.is_saving = false;
                _this.runFc(fc_error, 'data' in error ? error.data : error);
                reject('data' in error ? error.data : error);
            });
        });
        return promisesave;
    };
    Resource.prototype.addRelationship = function (resource, type_alias) {
        var object_key = resource.id;
        if (!object_key) {
            object_key = 'new_' + (Math.floor(Math.random() * 100000));
        }
        type_alias = (type_alias ? type_alias : resource.type);
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {} };
        }
        if (type_alias in this.getService().schema.relationships && this.getService().schema.relationships[type_alias].hasMany) {
            this.relationships[type_alias].data[object_key] = resource;
        }
        else {
            this.relationships[type_alias].data = resource;
        }
    };
    Resource.prototype.addRelationships = function (resources, type_alias) {
        var _this = this;
        if (!(type_alias in this.relationships)) {
            this.relationships[type_alias] = { data: {} };
        }
        else {
            // we receive a new collection of this relationship. We need remove old (if don't exist on new collection)
            __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].forEach(this.relationships[type_alias].data, function (resource) {
                if (!(resource.id in resources)) {
                    delete _this.relationships[type_alias].data[resource.id];
                }
            });
        }
        __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].forEach(resources, function (resource) {
            _this.relationships[type_alias].data[resource.id] = resource;
        });
    };
    Resource.prototype.addRelationshipsArray = function (resources, type_alias) {
        var _this = this;
        resources.forEach(function (item) {
            _this.addRelationship(item, type_alias || item.type);
        });
    };
    Resource.prototype.removeRelationship = function (type_alias, id) {
        if (!(type_alias in this.relationships)) {
            return false;
        }
        if (!('data' in this.relationships[type_alias])) {
            return false;
        }
        if (type_alias in this.getService().schema.relationships && this.getService().schema.relationships[type_alias].hasMany) {
            if (!(id in this.relationships[type_alias].data)) {
                return false;
            }
            delete this.relationships[type_alias].data[id];
        }
        else {
            this.relationships[type_alias].data = {};
        }
        return true;
    };
    /*
    @return This resource like a service
    */
    Resource.prototype.getService = function () {
        return __WEBPACK_IMPORTED_MODULE_4__services_converter__["a" /* Converter */].getService(this.type);
    };
    return Resource;
}(__WEBPACK_IMPORTED_MODULE_2__parent_resource_service__["a" /* ParentResourceService */]));



/***/ }),

/***/ "./src/service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__("./src/core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_base__ = __webpack_require__("./src/services/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource__ = __webpack_require__("./src/resource.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parent_resource_service__ = __webpack_require__("./src/parent-resource-service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_path_builder__ = __webpack_require__("./src/services/path-builder.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_url_params_builder__ = __webpack_require__("./src/services/url-params-builder.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_converter__ = __webpack_require__("./src/services/converter.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_localfilter__ = __webpack_require__("./src/services/localfilter.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_cachememory__ = __webpack_require__("./src/services/cachememory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_cachestore__ = __webpack_require__("./src/services/cachestore.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_util_noop__ = __webpack_require__("./node_modules/rxjs/util/noop.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_util_noop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_util_noop__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};











// export class Service extends ParentResourceService implements IService {
var Service = /** @class */ (function (_super) {
    __extends(Service, _super);
    function Service() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.smartfiltertype = 'undefined';
        return _this;
    }
    /*
    Register schema on Core
    @return true if the resource don't exist and registered ok
    */
    Service.prototype.register = function () {
        if (__WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].me === null) {
            throw new Error('Error: you are trying register `' + this.type + '` before inject JsonapiCore somewhere, almost one time.');
        }
        // only when service is registered, not cloned object
        this.cachememory = new __WEBPACK_IMPORTED_MODULE_8__services_cachememory__["a" /* CacheMemory */]();
        this.cachestore = new __WEBPACK_IMPORTED_MODULE_9__services_cachestore__["a" /* CacheStore */]();
        this.schema = __assign({}, __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].Schema, this.schema);
        return __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].me._register(this);
    };
    Service.prototype.newResource = function () {
        var resource = new __WEBPACK_IMPORTED_MODULE_2__resource__["a" /* Resource */]();
        return resource;
    };
    Service.prototype.new = function () {
        var resource = this.newResource();
        resource.type = this.type;
        resource.reset();
        return resource;
    };
    Service.prototype.getPrePath = function () {
        return '';
    };
    Service.prototype.getPath = function () {
        return this.path ? this.path : this.type;
    };
    Service.prototype.get = function (id, params, fc_success, fc_error) {
        return this.__exec({ id: id, params: params, fc_success: fc_success, fc_error: fc_error, exec_type: 'get' });
    };
    Service.prototype.delete = function (id, params, fc_success, fc_error) {
        return this.__exec({ id: id, params: params, fc_success: fc_success, fc_error: fc_error, exec_type: 'delete' });
    };
    Service.prototype.all = function (params, fc_success, fc_error) {
        return this.__exec({ id: null, params: params, fc_success: fc_success, fc_error: fc_error, exec_type: 'all' });
    };
    Service.prototype.__exec = function (exec_params) {
        var exec_pp = _super.prototype.proccess_exec_params.call(this, exec_params);
        switch (exec_pp.exec_type) {
            case 'get':
                return this._get(exec_pp.id, exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
            case 'delete':
                return this._delete(exec_pp.id, exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
            case 'all':
                return this._all(exec_pp.params, exec_pp.fc_success, exec_pp.fc_error);
        }
    };
    Service.prototype._get = function (id, params, fc_success, fc_error) {
        var _this = this;
        // http request
        var path = new __WEBPACK_IMPORTED_MODULE_4__services_path_builder__["a" /* PathBuilder */]();
        path.applyParams(this, params);
        path.appendPath(id);
        // CACHEMEMORY
        var resource = this.getService().cachememory.getOrCreateResource(this.type, id);
        resource.is_loading = true;
        // exit if ttl is not expired
        var temporal_ttl = params.ttl || 0; // this.schema.ttl
        if (this.getService().cachememory.isResourceLive(id, temporal_ttl)) {
            // we create a promise because we need return collection before
            // run success client function
            var promise_1 = new Promise(function (resolve, reject) {
                resolve(fc_success);
                promise_1.then(function (fc_success2) {
                    _this.runFc(fc_success2, 'cachememory');
                })
                    .catch(__WEBPACK_IMPORTED_MODULE_10_rxjs_util_noop__["noop"]);
                resource.is_loading = false;
            });
            return resource;
        }
        else {
            // CACHESTORE
            this.getService().cachestore.getResource(resource)
                .then(function (success) {
                if (__WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].isObjectLive(temporal_ttl, resource.lastupdate)) {
                    _this.runFc(fc_success, { data: success });
                }
                else {
                    _this.getGetFromServer(path, fc_success, fc_error, resource);
                }
            })
                .catch(function (error) {
                _this.getGetFromServer(path, fc_success, fc_error, resource);
            });
        }
        return resource;
    };
    Service.prototype.getGetFromServer = function (path, fc_success, fc_error, resource) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.JsonapiHttp
            .get(path.get())
            .then(function (success) {
            __WEBPACK_IMPORTED_MODULE_6__services_converter__["a" /* Converter */].build(success /*.data*/, resource);
            resource.is_loading = false;
            _this.getService().cachememory.setResource(resource);
            _this.getService().cachestore.setResource(resource);
            _this.runFc(fc_success, success);
        })
            .catch(function (error) {
            _this.runFc(fc_error, error);
        });
    };
    Service.prototype._all = function (params, fc_success, fc_error) {
        var _this = this;
        // check smartfiltertype, and set on remotefilter
        if (params.smartfilter && this.smartfiltertype !== 'localfilter') {
            Object.assign(params.remotefilter, params.smartfilter);
        }
        params.cachehash = params.cachehash || '';
        // http request
        var path = new __WEBPACK_IMPORTED_MODULE_4__services_path_builder__["a" /* PathBuilder */]();
        var paramsurl = new __WEBPACK_IMPORTED_MODULE_5__services_url_params_builder__["a" /* UrlParamsBuilder */]();
        path.applyParams(this, params);
        if (params.remotefilter && Object.keys(params.remotefilter).length > 0) {
            if (this.getService().parseToServer) {
                this.getService().parseToServer(params.remotefilter);
            }
            path.addParam(paramsurl.toparams({ filter: params.remotefilter }));
        }
        if (params.page) {
            if (params.page.number > 1) {
                path.addParam(__WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.rsJsonapiConfig.parameters.page.number + '=' + params.page.number);
            }
            if (params.page.limit) {
                path.addParam(__WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.rsJsonapiConfig.parameters.page.limit + '=' + params.page.limit);
            }
        }
        // make request
        // if we remove this, dont work the same .all on same time (ej: <component /><component /><component />)
        var tempororay_collection = this.getService().cachememory.getOrCreateCollection(path.getForCache());
        // creamos otra colleción si luego será filtrada
        var localfilter = new __WEBPACK_IMPORTED_MODULE_7__services_localfilter__["a" /* LocalFilter */](params.localfilter);
        var cached_collection;
        if (params.localfilter && Object.keys(params.localfilter).length > 0) {
            cached_collection = __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].newCollection();
        }
        else {
            cached_collection = tempororay_collection;
        }
        // MEMORY_CACHE
        var temporal_ttl = params.ttl || this.schema.ttl;
        if (temporal_ttl >= 0 && this.getService().cachememory.isCollectionExist(path.getForCache())) {
            // get cached data and merge with temporal collection
            tempororay_collection.$source = 'memory';
            // check smartfiltertype, and set on localfilter
            if (params.smartfilter && this.smartfiltertype === 'localfilter') {
                Object.assign(params.localfilter, params.smartfilter);
            }
            // fill collection and localfilter
            localfilter.filterCollection(tempororay_collection, cached_collection);
            // exit if ttl is not expired
            if (this.getService().cachememory.isCollectionLive(path.getForCache(), temporal_ttl)) {
                // we create a promise because we need return collection before
                // run success client function
                var promise_2 = new Promise(function (resolve, reject) {
                    resolve(fc_success);
                    promise_2.then(function (fc_success2) {
                        _this.runFc(fc_success2, 'cachememory');
                    })
                        .catch(__WEBPACK_IMPORTED_MODULE_10_rxjs_util_noop__["noop"]);
                });
            }
            else {
                this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection);
            }
        }
        else {
            // STORE
            tempororay_collection.$is_loading = true;
            this.getService().cachestore.getCollectionFromStorePromise(path.getForCache(), path.includes, tempororay_collection)
                .then(function (success) {
                tempororay_collection.$source = 'store';
                tempororay_collection.$is_loading = false;
                // when load collection from store, we save collection on memory
                _this.getService().cachememory.setCollection(path.getForCache(), tempororay_collection);
                // localfilter getted data
                localfilter.filterCollection(tempororay_collection, cached_collection);
                if (__WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].isObjectLive(temporal_ttl, tempororay_collection.$cache_last_update)) {
                    _this.runFc(fc_success, { data: success });
                }
                else {
                    _this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection);
                }
            }).catch(function (error) {
                _this.getAllFromServer(path, params, fc_success, fc_error, tempororay_collection, cached_collection);
            });
        }
        return cached_collection;
    };
    Service.prototype.getAllFromServer = function (path, params, fc_success, fc_error, tempororay_collection, cached_collection) {
        var _this = this;
        // SERVER REQUEST
        tempororay_collection.$is_loading = true;
        __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.JsonapiHttp
            .get(path.get())
            .then(function (success) {
            tempororay_collection.$source = 'server';
            tempororay_collection.$is_loading = false;
            // this create a new ID for every resource (for caching proposes)
            // for example, two URL return same objects but with different attributes
            if (params.cachehash) {
                __WEBPACK_IMPORTED_MODULE_1__services_base__["a" /* Base */].forEach(success.data.data, function (resource) {
                    resource.id = resource.id + params.cachehash;
                });
            }
            __WEBPACK_IMPORTED_MODULE_6__services_converter__["a" /* Converter */].build(success /*.data*/, tempororay_collection);
            _this.getService().cachememory.setCollection(path.getForCache(), tempororay_collection);
            // migrationProblem
            // this.getService().cachestore.setCollection(path.getForCache(), tempororay_collection, params.include);
            // localfilter getted data
            var localfilter = new __WEBPACK_IMPORTED_MODULE_7__services_localfilter__["a" /* LocalFilter */](params.localfilter);
            localfilter.filterCollection(tempororay_collection, cached_collection);
            // trying to define smartfiltertype
            if (_this.smartfiltertype === 'undefined') {
                var page = tempororay_collection.page;
                if (page.number === 1 && page.total_resources <= page.resources_per_page) {
                    _this.smartfiltertype = 'localfilter';
                }
                else if (page.number === 1 && page.total_resources > page.resources_per_page) {
                    _this.smartfiltertype = 'remotefilter';
                }
            }
            _this.runFc(fc_success, success);
        })
            .catch(function (error) {
            // do not replace $source, because localstorage don't write if = server
            // tempororay_collection.$source = 'server';
            tempororay_collection.$is_loading = false;
            _this.runFc(fc_error, error);
        });
    };
    Service.prototype._delete = function (id, params, fc_success, fc_error) {
        var _this = this;
        // http request
        var path = new __WEBPACK_IMPORTED_MODULE_4__services_path_builder__["a" /* PathBuilder */]();
        path.applyParams(this, params);
        path.appendPath(id);
        __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.JsonapiHttp
            .delete(path.get())
            .then(function (success) {
            _this.getService().cachememory.removeResource(id);
            _this.runFc(fc_success, success);
        }).catch(function (error) {
            _this.runFc(fc_error, error);
        });
    };
    /*
    @return This resource like a service
    */
    Service.prototype.getService = function () {
        return __WEBPACK_IMPORTED_MODULE_6__services_converter__["a" /* Converter */].getService(this.type);
    };
    Service.prototype.clearCacheMemory = function () {
        var path = new __WEBPACK_IMPORTED_MODULE_4__services_path_builder__["a" /* PathBuilder */]();
        path.applyParams(this);
        return this.getService().cachememory.deprecateCollections(path.getForCache()) &&
            this.getService().cachestore.deprecateCollections(path.getForCache());
    };
    Service.prototype.parseFromServer = function (attributes) {
        /* */
    };
    return Service;
}(__WEBPACK_IMPORTED_MODULE_3__parent_resource_service__["a" /* ParentResourceService */]));



/***/ }),

/***/ "./src/services/base.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Base; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__page__ = __webpack_require__("./src/services/page.ts");

var Base = /** @class */ (function () {
    function Base() {
    }
    Base.newCollection = function () {
        return Object.defineProperties({}, {
            $length: {
                get: function () {
                    return Object.keys(this).length * 1;
                },
                enumerable: false
            },
            $toArray: {
                get: function () {
                    var _this = this;
                    return Object.keys(this).map(function (key) {
                        return _this[key];
                    });
                },
                enumerable: false
            },
            $is_loading: { value: false, enumerable: false, writable: true },
            $source: { value: '', enumerable: false, writable: true },
            $cache_last_update: { value: 0, enumerable: false, writable: true },
            page: { value: new __WEBPACK_IMPORTED_MODULE_0__page__["a" /* Page */](), enumerable: false, writable: true }
        });
    };
    Base.isObjectLive = function (ttl, last_update) {
        return (ttl >= 0 && Date.now() <= (last_update + ttl * 1000));
    };
    Base.forEach = function (collection, fc) {
        Object.keys(collection).forEach(function (key) {
            fc(collection[key], key);
        });
    };
    Base.Params = {
        id: '',
        include: []
    };
    Base.Schema = {
        attributes: {},
        relationships: {},
        ttl: 0
    };
    return Base;
}());



/***/ }),

/***/ "./src/services/cachememory.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CacheMemory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__("./src/services/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__converter__ = __webpack_require__("./src/services/converter.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource_functions__ = __webpack_require__("./src/services/resource-functions.ts");



var CacheMemory = /** @class */ (function () {
    function CacheMemory() {
        this.collections = {};
        this.collections_lastupdate = {};
        this.resources = {};
    }
    CacheMemory.prototype.isCollectionExist = function (url) {
        return (url in this.collections && this.collections[url].$source !== 'new' ? true : false);
    };
    CacheMemory.prototype.isCollectionLive = function (url, ttl) {
        return (Date.now() <= (this.collections_lastupdate[url] + ttl * 1000));
    };
    CacheMemory.prototype.isResourceLive = function (id, ttl) {
        return this.resources[id] && (Date.now() <= (this.resources[id].lastupdate + ttl * 1000));
    };
    CacheMemory.prototype.getOrCreateCollection = function (url) {
        if (!(url in this.collections)) {
            this.collections[url] = __WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */].newCollection();
            this.collections[url].$source = 'new';
        }
        return this.collections[url];
    };
    CacheMemory.prototype.setCollection = function (url, collection) {
        var _this = this;
        // clone collection, because after maybe delete items for localfilter o pagination
        this.collections[url] = __WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */].newCollection();
        Object.keys(collection).forEach(function (resource_id) {
            var resource = collection[resource_id];
            _this.collections[url][resource_id] = resource;
            _this.setResource(resource);
        });
        this.collections[url].page = collection.page;
        this.collections_lastupdate[url] = Date.now();
    };
    CacheMemory.prototype.getOrCreateResource = function (type, id) {
        if (__WEBPACK_IMPORTED_MODULE_1__converter__["a" /* Converter */].getService(type).cachememory && id in __WEBPACK_IMPORTED_MODULE_1__converter__["a" /* Converter */].getService(type).cachememory.resources) {
            return __WEBPACK_IMPORTED_MODULE_1__converter__["a" /* Converter */].getService(type).cachememory.resources[id];
        }
        else {
            var resource = __WEBPACK_IMPORTED_MODULE_1__converter__["a" /* Converter */].getService(type).new();
            resource.id = id;
            // needed for a lot of request (all and get, tested on multinexo.com)
            this.setResource(resource, false);
            return resource;
        }
    };
    CacheMemory.prototype.setResource = function (resource, update_lastupdate) {
        if (update_lastupdate === void 0) { update_lastupdate = false; }
        // we cannot redefine object, because view don't update.
        if (resource.id in this.resources) {
            __WEBPACK_IMPORTED_MODULE_2__resource_functions__["a" /* ResourceFunctions */].resourceToResource(resource, this.resources[resource.id]);
        }
        else {
            this.resources[resource.id] = resource;
        }
        this.resources[resource.id].lastupdate = (update_lastupdate ? Date.now() : 0);
    };
    CacheMemory.prototype.deprecateCollections = function (path_start_with) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */].forEach(this.collections_lastupdate, function (lastupdate, key) {
            _this.collections_lastupdate[key] = 0;
        });
        return true;
    };
    CacheMemory.prototype.removeResource = function (id) {
        __WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */].forEach(this.collections, function (value, url) {
            delete value[id];
        });
        this.resources[id].attributes = {}; // just for confirm deletion on view
        this.resources[id].relationships = {}; // just for confirm deletion on view
        delete this.resources[id];
    };
    return CacheMemory;
}());



/***/ }),

/***/ "./src/services/cachestore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CacheStore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__("./src/core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base__ = __webpack_require__("./src/services/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__converter__ = __webpack_require__("./src/services/converter.ts");



var CacheStore = /** @class */ (function () {
    function CacheStore() {
    }
    CacheStore.prototype.getResource = function (resource /* | IDataResource*/, include) {
        var _this = this;
        if (include === void 0) { include = []; }
        var mypromise = new Promise(function (resolve, reject) {
            __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.JsonapiStoreService.getObjet(resource.type + '.' + resource.id)
                .then(function (success) {
                __WEBPACK_IMPORTED_MODULE_2__converter__["a" /* Converter */].build({ data: success }, resource);
                var promises = [];
                // include some times is a collection :S
                // for (let keys in include) {
                __WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */].forEach(include, function (resource_type) {
                    //  && ('attributes' in resource.relationships[resource_type].data)
                    if (resource_type in resource.relationships) {
                        // hasOne
                        var related_resource = resource.relationships[resource_type].data;
                        if (!('attributes' in related_resource)) {
                            // no está cargado aún
                            var builded_resource = _this.getResourceFromMemory(related_resource);
                            if (builded_resource.is_new) {
                                // no está en memoria, la pedimos a store
                                promises.push(_this.getResource(builded_resource));
                            }
                            else {
                                console.warn('ts-angular-json: esto no debería pasar #isdjf2l1a');
                            }
                            resource.relationships[resource_type].data = builded_resource;
                        }
                    }
                });
                resource.lastupdate = success._lastupdate_time;
                // no debo esperar a que se resuelvan los include
                if (promises.length === 0) {
                    resolve(success);
                }
                else {
                    // esperamos las promesas de los include antes de dar el resolve
                    Promise.all(promises)
                        .then(function (success3) {
                        resolve(success3);
                    })
                        .catch(function (error3) {
                        reject(error3);
                    });
                }
            })
                .catch(function () {
                reject();
            });
            // build collection and resources from store
            // Core.injectedServices.$q.all(promises)
            // .then(success2 => {
            //     deferred.resolve(success2);
            // })
            // .catch(() => {
            //     deferred.reject();
            // });
        });
        return mypromise;
    };
    CacheStore.prototype.setResource = function (resource) {
        // migrationProblem
        // Core.injectedServices.JsonapiStoreService.saveObject(
        //     resource.type + '.' + resource.id,
        //     resource.toObject().data
        // );
    };
    CacheStore.prototype.getCollectionFromStorePromise = function (url, include, collection) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.getCollectionFromStore(url, include, collection, resolve, reject);
        });
        return promise;
    };
    CacheStore.prototype.getCollectionFromStore = function (url, include, collection, resolve, reject) {
        var _this = this;
        var promise = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.JsonapiStoreService.getObjet('collection.' + url);
        promise.then(function (success) {
            // build collection from store and resources from memory
            if (_this.fillCollectionWithArrrayAndResourcesOnMemory(success.data, collection)) {
                collection.$source = 'store'; // collection from storeservice, resources from memory
                collection.$cache_last_update = success._lastupdate_time;
                resolve(collection);
                return;
            }
            var promise2 = _this.fillCollectionWithArrrayAndResourcesOnStore(success, include, collection);
            promise2.then(function () {
                // just for precaution, we not rewrite server data
                if (collection.$source !== 'new') {
                    console.warn('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#');
                    throw new Error('ts-angular-json: esto no debería pasar. buscar eEa2ASd2#');
                }
                collection.$source = 'store'; // collection and resources from storeservice
                collection.$cache_last_update = success._lastupdate_time;
                resolve(collection);
            })
                .catch(function () {
                reject();
            });
        })
            .catch(function () {
            reject();
        });
    };
    CacheStore.prototype.fillCollectionWithArrrayAndResourcesOnMemory = function (dataresources, collection) {
        var all_ok = true;
        for (var key in dataresources) {
            var dataresource = dataresources[key];
            var resource = this.getResourceFromMemory(dataresource);
            if (resource.is_new) {
                all_ok = false;
                break;
            }
            collection[dataresource.id] = resource;
        }
        return all_ok;
    };
    CacheStore.prototype.getResourceFromMemory = function (dataresource) {
        var cachememory = __WEBPACK_IMPORTED_MODULE_2__converter__["a" /* Converter */].getService(dataresource.type).cachememory;
        var resource = cachememory.getOrCreateResource(dataresource.type, dataresource.id);
        return resource;
    };
    CacheStore.prototype.fillCollectionWithArrrayAndResourcesOnStore = function (datacollection, include, collection) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            // request resources from store
            var temporalcollection = {};
            var promises = [];
            for (var key in datacollection.data) {
                var dataresource = datacollection.data[key];
                var cachememory = __WEBPACK_IMPORTED_MODULE_2__converter__["a" /* Converter */].getService(dataresource.type).cachememory;
                temporalcollection[dataresource.id] = cachememory.getOrCreateResource(dataresource.type, dataresource.id);
                promises.push(_this.getResource(temporalcollection[dataresource.id], include));
            }
            // build collection and resources from store
            Promise.all(promises)
                .then(function (success2) {
                if (datacollection.page) {
                    collection.page = datacollection.page;
                }
                for (var key in temporalcollection) {
                    var resource = temporalcollection[key];
                    collection[resource.id] = resource; // collection from storeservice, resources from memory
                }
                resolve(collection);
            })
                .catch(function (error2) {
                reject(error2);
            });
        });
        return promise;
    };
    CacheStore.prototype.setCollection = function (url, collection, include) {
        var _this = this;
        var tmp = { data: {}, page: {} };
        var resources_for_save = {};
        __WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */].forEach(collection, function (resource) {
            _this.setResource(resource);
            tmp.data[resource.id] = { id: resource.id, type: resource.type };
            __WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */].forEach(include, function (resource_type_alias) {
                if ('id' in resource.relationships[resource_type_alias].data) {
                    // hasOne
                    var ress = resource.relationships[resource_type_alias].data;
                    resources_for_save[resource_type_alias + ress.id] = ress;
                }
                else {
                    // hasMany
                    var collection2 = resource.relationships[resource_type_alias].data;
                    __WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */].forEach(collection2, function (inc_resource) {
                        resources_for_save[resource_type_alias + inc_resource.id] = inc_resource;
                    });
                }
            });
        });
        tmp.page = collection.page;
        __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.JsonapiStoreService.saveObject('collection.' + url, tmp);
        __WEBPACK_IMPORTED_MODULE_1__base__["a" /* Base */].forEach(resources_for_save, function (resource_for_save) {
            if ('is_new' in resource_for_save) {
                _this.setResource(resource_for_save);
            }
            else {
                console.warn('No se pudo guardar en la cache el', resource_for_save.type, 'por no se ser IResource.', resource_for_save);
            }
        });
    };
    CacheStore.prototype.deprecateCollections = function (path_start_with) {
        __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.JsonapiStoreService.deprecateObjectsWithKey('collection.' + path_start_with);
        return true;
    };
    return CacheStore;
}());



/***/ }),

/***/ "./src/services/converter.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Converter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__("./src/core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resource__ = __webpack_require__("./src/resource.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resource_relationships_converter__ = __webpack_require__("./src/services/resource-relationships-converter.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_base__ = __webpack_require__("./src/services/base.ts");
// import * as angular from 'angular';




var Converter = /** @class */ (function () {
    function Converter() {
    }
    /*
    Convert json arrays (like included) to an Resources arrays without [keys]
    */
    Converter.json_array2resources_array = function (json_array, destination_array) {
        if (destination_array === void 0) { destination_array = {}; }
        for (var _i = 0, json_array_1 = json_array; _i < json_array_1.length; _i++) {
            var data = json_array_1[_i];
            var resource = Converter.json2resource(data, false);
            destination_array[resource.type + '_' + resource.id] = resource;
        }
    };
    /*
    Convert json arrays (like included) to an indexed Resources array by [type][id]
    */
    Converter.json_array2resources_array_by_type = function (json_array) {
        var all_resources = {};
        var resources_by_type = {};
        Converter.json_array2resources_array(json_array, all_resources);
        __WEBPACK_IMPORTED_MODULE_3__services_base__["a" /* Base */].forEach(all_resources, function (resource) {
            if (!(resource.type in resources_by_type)) {
                resources_by_type[resource.type] = {};
            }
            resources_by_type[resource.type][resource.id] = resource;
        });
        return resources_by_type;
    };
    Converter.json2resource = function (json_resource, instance_relationships) {
        var resource_service = Converter.getService(json_resource.type);
        if (resource_service) {
            return Converter.procreate(json_resource);
        }
        else {
            // service not registered
            console.warn('`' + json_resource.type + '`', 'service not found on json2resource()');
            var temp = new __WEBPACK_IMPORTED_MODULE_1__resource__["a" /* Resource */]();
            temp.id = json_resource.id;
            temp.type = json_resource.type;
            return temp;
        }
    };
    Converter.getService = function (type) {
        var resource_service = __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].me.getResourceService(type);
        if (typeof resource_service === 'undefined') {
            // console.warn('`' + type + '`', 'service not found on getService()');
        }
        return resource_service;
    };
    /* return a resource type(resoruce_service) with data(data) */
    Converter.procreate = function (data) {
        if (!('type' in data && 'id' in data)) {
            console.error('Jsonapi Resource is not correct', data);
        }
        var resource;
        if (data.id in Converter.getService(data.type).cachememory.resources) {
            resource = Converter.getService(data.type).cachememory.resources[data.id];
        }
        else {
            resource = Converter.getService(data.type).cachememory.getOrCreateResource(data.type, data.id);
        }
        resource.attributes = data.attributes || {};
        resource.is_new = false;
        return resource;
    };
    Converter.build = function (document_from, resource_dest) {
        // instancio los include y los guardo en included arrary
        var included_resources = {};
        if ('included' in document_from) {
            included_resources = Converter.json_array2resources_array_by_type(document_from.included);
        }
        if (Array.isArray(document_from.data)) {
            Converter._buildCollection(document_from, resource_dest, included_resources);
        }
        else {
            Converter._buildResource(document_from.data, resource_dest, included_resources);
        }
    };
    Converter._buildCollection = function (collection_data_from, collection_dest, included_resources) {
        // sometime get Cannot set property 'number' of undefined (page)
        if (collection_dest.page && collection_data_from.meta) {
            collection_dest.page.number = collection_data_from.meta.page || 1;
            collection_dest.page.resources_per_page = collection_data_from.meta.resources_per_page || null;
            collection_dest.page.total_resources = collection_data_from.meta.total_resources || null;
        }
        // convert and add new dataresoures to final collection
        var new_ids = {};
        for (var _i = 0, _a = collection_data_from.data; _i < _a.length; _i++) {
            var dataresource = _a[_i];
            if (!(dataresource.id in collection_dest)) {
                collection_dest[dataresource.id] =
                    Converter.getService(dataresource.type).cachememory.getOrCreateResource(dataresource.type, dataresource.id);
            }
            Converter._buildResource(dataresource, collection_dest[dataresource.id], included_resources);
            new_ids[dataresource.id] = dataresource.id;
        }
        // remove old members of collection (bug, for example, when request something like orders/10/details and has new ids)
        __WEBPACK_IMPORTED_MODULE_3__services_base__["a" /* Base */].forEach(collection_dest, function (resource) {
            if (!(resource.id in new_ids)) {
                delete collection_dest[resource.id];
            }
        });
    };
    Converter._buildResource = function (resource_data_from, resource_dest, included_resources) {
        resource_dest.attributes = resource_data_from.attributes;
        resource_dest.id = resource_data_from.id;
        resource_dest.is_new = false;
        var service = Converter.getService(resource_data_from.type);
        // esto previene la creación indefinida de resources
        // el servicio debe estar sino no tenemos el schema
        if (!resource_dest.relationships || !service) {
            return;
        }
        Converter.getService(resource_data_from.type).parseFromServer(resource_dest.attributes);
        var relationships_converter = new __WEBPACK_IMPORTED_MODULE_2__resource_relationships_converter__["a" /* ResourceRelationshipsConverter */](Converter.getService, resource_data_from.relationships, resource_dest.relationships, included_resources, service.schema);
        relationships_converter.buildRelationships();
    };
    return Converter;
}());



/***/ }),

/***/ "./src/services/core-services.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CoreServices */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sources_http_service__ = __webpack_require__("./src/sources/http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sources_store_service__ = __webpack_require__("./src/sources/store.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sources_store_service___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__sources_store_service__);


var CoreServices = /** @class */ (function () {
    /** @ngInject */
    function CoreServices(JsonapiHttp, rsJsonapiConfig, JsonapiStoreService) {
        this.JsonapiHttp = JsonapiHttp;
        this.rsJsonapiConfig = rsJsonapiConfig;
        this.JsonapiStoreService = JsonapiStoreService;
    }
    return CoreServices;
}());

// migrationProblem
// angular.module('Jsonapi.services').service('JsonapiCoreServices', CoreServices);


/***/ }),

/***/ "./src/services/localfilter.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalFilter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_base__ = __webpack_require__("./src/services/base.ts");

var LocalFilter = /** @class */ (function () {
    /** @ngInject */
    function LocalFilter(localfilter) {
        this.localfilterparams = localfilter || {};
    }
    LocalFilter.prototype.passFilter = function (resource, localfilter) {
        for (var attribute in localfilter) {
            if (typeof resource !== 'object' || !('attributes' in resource)) {
                // is not a resource. Is an internal property, for example $source
                return true;
            }
            else if (typeof localfilter[attribute] === 'object') {
                // its a regular expression
                return localfilter[attribute].test(resource.attributes[attribute]);
            }
            else if (typeof resource.attributes[attribute] === 'string') {
                // just a string
                return (resource.attributes[attribute] === localfilter[attribute]);
            }
        }
        return false;
    };
    LocalFilter.prototype.filterCollection = function (source_collection, dest_collection) {
        var _this = this;
        if (Object.keys(this.localfilterparams).length) {
            __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].forEach(source_collection, function (resource, key) {
                if (_this.passFilter(resource, _this.localfilterparams)) {
                    dest_collection[key] = resource;
                }
            });
        }
    };
    return LocalFilter;
}());



/***/ }),

/***/ "./src/services/noduplicatedhttpcalls.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoDuplicatedHttpCallsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_deferred__ = __webpack_require__("./src/shared/deferred.ts");

var NoDuplicatedHttpCallsService = /** @class */ (function () {
    function NoDuplicatedHttpCallsService() {
        this.calls = {};
    }
    NoDuplicatedHttpCallsService.prototype.hasPromises = function (path) {
        return (path in this.calls);
    };
    NoDuplicatedHttpCallsService.prototype.getAPromise = function (path) {
        if (!(path in this.calls)) {
            this.calls[path] = [];
        }
        var deferred = new __WEBPACK_IMPORTED_MODULE_0__shared_deferred__["a" /* Deferred */]();
        // let deferred = this.$q.defer();
        this.calls[path].push(deferred);
        return deferred.promise;
    };
    NoDuplicatedHttpCallsService.prototype.setPromiseRequest = function (path, promise) {
        var _this = this;
        promise.then(function (success) {
            if (path in _this.calls) {
                for (var _i = 0, _a = _this.calls[path]; _i < _a.length; _i++) {
                    var promise2 = _a[_i];
                    promise2.resolve(success);
                }
                delete _this.calls[path];
            }
        }).catch(function (error) {
            if (path in _this.calls) {
                for (var _i = 0, _a = _this.calls[path]; _i < _a.length; _i++) {
                    var promise2 = _a[_i];
                    promise2.reject(error);
                }
                delete _this.calls[path];
            }
        });
    };
    return NoDuplicatedHttpCallsService;
}());

// migrationProblem
// angular.module('Jsonapi.services').service('noDuplicatedHttpCallsService', NoDuplicatedHttpCallsService);


/***/ }),

/***/ "./src/services/page.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Page; });
var Page = /** @class */ (function () {
    function Page() {
        this.number = 0;
        this.total_resources = 0;
        this.resources_per_page = 0;
    }
    return Page;
}());



/***/ }),

/***/ "./src/services/path-builder.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PathBuilder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__("./src/core.ts");

var PathBuilder = /** @class */ (function () {
    function PathBuilder() {
        this.paths = [];
        this.includes = [];
        this.get_params = [];
    }
    PathBuilder.prototype.applyParams = function (service, params) {
        if (params === void 0) { params = {}; }
        this.appendPath(service.getPrePath());
        if (params.beforepath) {
            this.appendPath(params.beforepath);
        }
        this.appendPath(service.getPath());
        if (params.include) {
            this.setInclude(params.include);
        }
    };
    PathBuilder.prototype.appendPath = function (value) {
        if (value !== '') {
            this.paths.push(value);
        }
    };
    PathBuilder.prototype.addParam = function (param) {
        this.get_params.push(param);
    };
    PathBuilder.prototype.setInclude = function (strings_array) {
        this.includes = strings_array;
    };
    PathBuilder.prototype.getForCache = function () {
        return this.paths.join('/') + this.get_params.join('/');
    };
    PathBuilder.prototype.get = function () {
        var params = [];
        // angular.copy(this.get_params, params);
        this.get_params = JSON.parse(JSON.stringify(params));
        if (this.includes.length > 0) {
            params.push('include=' + this.includes.join(','));
        }
        return this.paths.join('/') +
            (params.length > 0 ? __WEBPACK_IMPORTED_MODULE_0__core__["a" /* Core */].injectedServices.rsJsonapiConfig.params_separator + params.join('&') : '');
    };
    return PathBuilder;
}());



/***/ }),

/***/ "./src/services/resource-functions.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceFunctions; });
var ResourceFunctions = /** @class */ (function () {
    function ResourceFunctions() {
    }
    ResourceFunctions.resourceToResource = function (source, destination) {
        destination.attributes = source.attributes;
        // remove relationships on destination resource
        for (var type_alias in destination.relationships) {
            if (!(type_alias in source.relationships)) {
                delete destination.relationships[type_alias];
            }
            else {
                // this resource is a collection?
                if (!('id' in destination.relationships[type_alias].data)) {
                    for (var id in destination.relationships[type_alias].data) {
                        if (!(id in source.relationships[type_alias].data)) {
                            delete destination.relationships[type_alias];
                        }
                    }
                }
            }
        }
        // add source relationships to destination
        for (var type_alias in source.relationships) {
            if ('id' in source.relationships[type_alias].data) {
                destination.addRelationship(source.relationships[type_alias].data, type_alias);
            }
            else {
                destination.addRelationships(source.relationships[type_alias].data, type_alias);
            }
        }
    };
    return ResourceFunctions;
}());



/***/ }),

/***/ "./src/services/resource-relationships-converter.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceRelationshipsConverter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_base__ = __webpack_require__("./src/services/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_util_noop__ = __webpack_require__("./node_modules/rxjs/util/noop.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_util_noop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_noop__);


var ResourceRelationshipsConverter = /** @class */ (function () {
    /** @ngInject */
    function ResourceRelationshipsConverter(getService, relationships_from, relationships_dest, included_resources, schema) {
        this.getService = getService;
        this.relationships_from = relationships_from;
        this.relationships_dest = relationships_dest;
        this.included_resources = included_resources;
        this.schema = schema;
    }
    ResourceRelationshipsConverter.prototype.buildRelationships = function () {
        var _this = this;
        // recorro los relationships levanto el service correspondiente
        __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].forEach(this.relationships_from, function (relation_from_value, relation_key) {
            // relation is in schema? have data or just links?
            if (!(relation_key in _this.relationships_dest) && ('data' in relation_from_value)) {
                _this.relationships_dest[relation_key] = { data: __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].newCollection() };
            }
            // sometime data=null or simple { }
            if (!relation_from_value.data) {
                return;
            }
            if (_this.schema.relationships[relation_key] && _this.schema.relationships[relation_key].hasMany) {
                // hasMany
                if (relation_from_value.data.length === 0) {
                    // from data is an empty array, remove all data on relationship
                    _this.relationships_dest[relation_key] = { data: __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].newCollection() };
                    return;
                }
                _this.__buildRelationshipHasMany(relation_from_value, relation_key);
            }
            else {
                // hasOne
                _this.__buildRelationshipHasOne(relation_from_value, relation_key);
            }
        });
    };
    ResourceRelationshipsConverter.prototype.__buildRelationshipHasMany = function (relation_from_value, relation_key // number to string?
    ) {
        var _this = this;
        var resource_service = this.getService(relation_from_value.data[0].type);
        if (resource_service) {
            var tmp_relationship_data_1 = __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].newCollection();
            __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].forEach(relation_from_value.data, function (relation_value) {
                var tmp = _this.__buildRelationship(relation_value, _this.included_resources);
                // sometimes we have a cache like a services
                if (!('attributes' in tmp)
                    && tmp.id in _this.relationships_dest[relation_key].data
                    && 'attributes' in _this.relationships_dest[relation_key].data[tmp.id]) {
                    tmp_relationship_data_1[tmp.id] = _this.relationships_dest[relation_key].data[tmp.id];
                }
                else {
                    tmp_relationship_data_1[tmp.id] = tmp;
                }
            });
            // REMOVE resources from cached collection
            // build an array with the news ids
            var new_ids_1 = {};
            __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].forEach(relation_from_value.data, function (data_resource) {
                new_ids_1[data_resource.id] = true;
            });
            // check if new ids are on destination. If not, delete resource
            __WEBPACK_IMPORTED_MODULE_0__services_base__["a" /* Base */].forEach(this.relationships_dest[relation_key].data, function (relation_dest_value) {
                if (!(relation_dest_value.id in new_ids_1)) {
                    delete _this.relationships_dest[relation_dest_value.id];
                }
            });
            this.relationships_dest[relation_key].data = tmp_relationship_data_1;
        }
    };
    ResourceRelationshipsConverter.prototype.__buildRelationshipHasOne = function (relation_data_from, relation_data_key // number to string?
    ) {
        // new related resource <> cached related resource <> ? delete!
        if (!('type' in relation_data_from.data)) {
            this.relationships_dest[relation_data_key].data = {};
            return;
        }
        if (this.relationships_dest[relation_data_key].data == null ||
            relation_data_from.data.id !== this.relationships_dest[relation_data_key].data.id) {
            this.relationships_dest[relation_data_key].data = {};
        }
        // trae datos o cambió resource? actualizamos!
        if (
        // 'attributes' in relation_data_from.data ||  // ???
        !this.relationships_dest[relation_data_key].data.attributes || // we have only a  dataresource
            this.relationships_dest[relation_data_key].data.id !== relation_data_from.data.id) {
            var resource_data = this.__buildRelationship(relation_data_from.data, this.included_resources);
            this.relationships_dest[relation_data_key].data = resource_data;
        }
    };
    ResourceRelationshipsConverter.prototype.__buildRelationship = function (resource_data_from, included_array) {
        if (resource_data_from.type in included_array &&
            resource_data_from.id in included_array[resource_data_from.type]) {
            // it's in included
            return included_array[resource_data_from.type][resource_data_from.id];
        }
        else {
            // OPTIONAL: return cached IResource
            var service = this.getService(resource_data_from.type);
            if (service && resource_data_from.id in service.cachememory.resources) {
                return service.cachememory.resources[resource_data_from.id];
            }
            else {
                // we dont have information on included or memory. try pass to store
                if (service) {
                    service.cachestore.getResource(resource_data_from)
                        .catch(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_noop__["noop"]);
                }
                return resource_data_from;
            }
        }
    };
    return ResourceRelationshipsConverter;
}());



/***/ }),

/***/ "./src/services/url-params-builder.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UrlParamsBuilder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__("./src/services/base.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_util_isObject__ = __webpack_require__("./node_modules/rxjs/util/isObject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_util_isObject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_isObject__);


var UrlParamsBuilder = /** @class */ (function () {
    function UrlParamsBuilder() {
    }
    UrlParamsBuilder.prototype.toparamsarray = function (params, add) {
        var _this = this;
        if (add === void 0) { add = ''; }
        var ret = '';
        if (Array.isArray(params) || Object(__WEBPACK_IMPORTED_MODULE_1_rxjs_util_isObject__["isObject"])(params)) {
            __WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */].forEach(params, function (value, key) {
                ret += _this.toparamsarray(value, add + '[' + key + ']');
            });
        }
        else {
            ret += add + '=' + params;
        }
        return ret;
    };
    UrlParamsBuilder.prototype.toparams = function (params) {
        var _this = this;
        var ret = '';
        __WEBPACK_IMPORTED_MODULE_0__base__["a" /* Base */].forEach(params, function (value, key) {
            ret += _this.toparamsarray(value, '&' + key);
        });
        return ret.slice(1);
    };
    return UrlParamsBuilder;
}());



/***/ }),

/***/ "./src/shared/deferred.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Deferred; });
// export class Deferred {
//     public promise: Promise<any>;
//     public reject: Function;
//     public resolve: Function;
//
//     constructor() {
//         this.promise = new Promise((resolve, reject)=> {
//             this.reject = reject
//             this.resolve = resolve
//         })
//     }
// }
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());



/***/ }),

/***/ "./src/sources/http.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Http; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_deferred__ = __webpack_require__("./src/shared/deferred.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_noduplicatedhttpcalls_service__ = __webpack_require__("./src/services/noduplicatedhttpcalls.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core__ = __webpack_require__("./src/core.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__jsonapi_config__ = __webpack_require__("./src/jsonapi-config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__ = __webpack_require__("./node_modules/rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var Http = /** @class */ (function () {
    /** @ngInject */
    function Http(http, rsJsonapiConfig, 
        // private $timeout,
        // private rsJsonapiConfig,
        noDuplicatedHttpCallsService
        // private $q
    ) {
        this.http = http;
        this.rsJsonapiConfig = rsJsonapiConfig;
        this.noDuplicatedHttpCallsService = noDuplicatedHttpCallsService;
    }
    Http.prototype.delete = function (path) {
        return this.exec(path, 'DELETE');
    };
    Http.prototype.get = function (path) {
        return this.exec(path, 'get');
    };
    Http.prototype.exec = function (path, method, data, call_loadings_error) {
        var _this = this;
        if (call_loadings_error === void 0) { call_loadings_error = true; }
        var fakeHttpPromise = null;
        // http request (if we don't have any GET request yet)
        if (method !== 'get' || !this.noDuplicatedHttpCallsService.hasPromises(path)) {
            var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/vnd.api+json' });
            var req = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpRequest */](method, this.rsJsonapiConfig.url + path, {
                headers: headers,
                body: data || null
            });
            var http_observable = this.http.request(method, this.rsJsonapiConfig.url + path, req);
            if (method === 'get') {
                this.noDuplicatedHttpCallsService.setPromiseRequest(path, http_observable.toPromise());
            }
            else {
                fakeHttpPromise = http_observable;
            }
        }
        if (method === 'get') {
            fakeHttpPromise = this.noDuplicatedHttpCallsService.getAPromise(path);
        }
        var deferred = new __WEBPACK_IMPORTED_MODULE_0__shared_deferred__["a" /* Deferred */]();
        __WEBPACK_IMPORTED_MODULE_3__core__["a" /* Core */].me.refreshLoadings(1);
        fakeHttpPromise.then(function (success) {
            // timeout just for develop environment
            setTimeout(function () {
                __WEBPACK_IMPORTED_MODULE_3__core__["a" /* Core */].me.refreshLoadings(-1);
                deferred.resolve(success);
            }, _this.rsJsonapiConfig.delay);
        }).catch(function (error) {
            __WEBPACK_IMPORTED_MODULE_3__core__["a" /* Core */].me.refreshLoadings(-1);
            if (error.status <= 0) {
                // offline?
                if (!__WEBPACK_IMPORTED_MODULE_3__core__["a" /* Core */].me.loadingsOffline(error)) {
                    console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsOffline for catch it) error =>', error);
                }
            }
            else {
                if (call_loadings_error && !__WEBPACK_IMPORTED_MODULE_3__core__["a" /* Core */].me.loadingsError(error)) {
                    console.warn('Jsonapi.Http.exec (use JsonapiCore.loadingsError for catch it) error =>', error);
                }
            }
            deferred.reject(error);
        });
        return deferred.promise;
    };
    Http = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__jsonapi_config__["a" /* JsonapiConfig */],
            __WEBPACK_IMPORTED_MODULE_2__services_noduplicatedhttpcalls_service__["a" /* NoDuplicatedHttpCallsService */]
            // private $q
        ])
    ], Http);
    return Http;
}());

// migrationProblem
// angular.module('Jsonapi.services').service('JsonapiHttp', Http);


/***/ }),

/***/ "./src/sources/store.service.ts":
/***/ (function(module, exports) {

// import * as angular from 'angular';
// import { IStoreObject } from '../interfaces';
//
// // @types/angular-forage is outdated, we need add new parameter documented here
// // https://github.com/ocombe/angular-localForage#functions-
// interface ILocalForageServiceUpdated extends ng.localForage.ILocalForageService {
//     getItem(key: string, rejectIfNull?: boolean): angular.IPromise<any>;
//     getItem(keys: Array<string>, rejectIfNull?: boolean): angular.IPromise<Array<any>>;
// }
//
// export class StoreService {
//     private globalstore: ILocalForageServiceUpdated;
//     private allstore: ILocalForageServiceUpdated;
//
//     /** @ngInject */
//     public constructor(
//         protected $localForage,
//         protected $q
//     ) {
//         this.globalstore = $localForage.createInstance({ name: 'jsonapiglobal' });
//         this.allstore = $localForage.createInstance({ name: 'allstore' });
//         this.checkIfIsTimeToClean();
//     }
//
//     private checkIfIsTimeToClean() {
//         // check if is time to check cachestore
//         this.globalstore.getItem('_lastclean_time', true).then(success => {
//             if (Date.now() >= (success.time + 12 * 3600 * 1000)) {
//                 // is time to check cachestore!
//                 this.globalstore.setItem('_lastclean_time', { time: Date.now() });
//                 this.checkAndDeleteOldElements();
//             }
//         })
//         .catch(() => {
//             this.globalstore.setItem('_lastclean_time', { time: Date.now() });
//         });
//     }
//
//     private checkAndDeleteOldElements() {
//         this.allstore.keys().then(success => {
//             angular.forEach(success, (key) => {
//                 // recorremos cada item y vemos si es tiempo de removerlo
//                 this.allstore.getItem(key).then(success2 => {
//                     // es tiempo de removerlo?
//                     if (Date.now() >= (success2._lastupdate_time + 24 * 3600 * 1000)) {
//                         // removemos!!
//                         this.allstore.removeItem(key);
//                     }
//                 })
//                 .catch( () => { /* */ } );
//             });
//         })
//         .catch( () => { /* */ } );
//     }
//
//     public getObjet(key: string): Promise<object> {
//         let deferred = this.$q.defer();
//
//         this.allstore.getItem('jsonapi.' + key, true)
//         .then (success => {
//             deferred.resolve(success);
//         })
//         .catch(error => {
//             deferred.reject(error);
//         });
//
//         return deferred.promise;
//     }
//
//     public getObjets(keys: Array<string>): Promise<object> {
//         return this.allstore.getItem('jsonapi.' + keys[0]);
//     }
//
//     public saveObject(key: string, value: IStoreObject): void {
//         value._lastupdate_time = Date.now();
//         this.allstore.setItem('jsonapi.' + key, value);
//     }
//
//     public clearCache() {
//         this.allstore.clear();
//         this.globalstore.clear();
//     }
//
//     public deprecateObjectsWithKey(key_start_with: string) {
//         this.allstore.keys().then(success => {
//             angular.forEach(success, (key: string) => {
//                 if (key.startsWith(key_start_with)) {
//                     // key of stored object starts with key_start_with
//                     this.allstore.getItem(key).then(success2 => {
//                         success2._lastupdate_time = 0;
//                         this.allstore.setItem(key, success2);
//                     })
//                     .catch( () => { /* */ } )
//                     ;
//                 }
//             });
//         })
//         .catch( () => { /* */ } )
//         ;
//     }
// }
//
// angular.module('Jsonapi.services').service('JsonapiStoreService', StoreService);


/***/ })

},["./demo/bootstrap.ts"]);
//# sourceMappingURL=app.map