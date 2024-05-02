import { Routes } from '@angular/router';
import { RouterModule, Route } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { BooksPageComponent } from '../components/books-page/books-page.component';

export const routes: Routes = [
    { path: "", component: HomePageComponent },
    { path: "books", component: BooksPageComponent },
];
