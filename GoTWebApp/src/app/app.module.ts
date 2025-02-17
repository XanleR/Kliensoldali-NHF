import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "../components/home-page/home-page.component";
import { BooksPageComponent } from "../components/books-page/books-page.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HousesPageComponent } from "../components/houses-page/houses-page.component";
import { CharactersPageComponent } from "../components/characters-page/characters-page.component";
import { BookService } from "../services/book.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { MatIconModule } from '@angular/material/icon';
import { BookDetailsPageComponent } from "../components/book-details-page/book-details-page.component";
import { CharacterService } from "../services/character.service";
import { CharacterDetailsPageComponent } from "../components/character-details-page/character-details-page.component";
import { HouseDetailsPageComponent } from "../components/house-details-page/house-details-page.component";
import { HouseService } from "../services/house.service";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


@NgModule({
    imports:[
        MatToolbarModule,
        HttpClientModule,
        BrowserModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
    RouterModule.forRoot(routes)
    ],
    declarations:[AppComponent,
        HomePageComponent,
        BooksPageComponent,
        HousesPageComponent,
        CharactersPageComponent,
        BookDetailsPageComponent,
        CharacterDetailsPageComponent,
        HouseDetailsPageComponent,
    ],
    providers:[
        BookService,
        CharacterService,
        HouseService,
    provideAnimationsAsync()
  ],
    bootstrap: [AppComponent],
})

export class AppModule{}