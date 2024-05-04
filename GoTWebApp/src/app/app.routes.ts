import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { BooksPageComponent } from '../components/books-page/books-page.component';
import { HousesPageComponent } from '../components/houses-page/houses-page.component';
import { CharactersPageComponent } from '../components/characters-page/characters-page.component';
import { BookDetailsPageComponent } from '../components/book-details-page/book-details-page.component';
import { CharacterDetailsPageComponent } from '../components/character-details-page/character-details-page.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'books', component: BooksPageComponent},
    {path: 'books/:id', component: BookDetailsPageComponent},
    {path: 'houses', component: HousesPageComponent},
    {path: 'characters', component: CharactersPageComponent},
    {path: 'characters/:id', component: CharacterDetailsPageComponent},
    {path: '**', component: HomePageComponent}

];
