import { NgModule } from "@angular/core";
import { BooksPageComponent } from "../components/books-page/books-page.component";
import { HomePageComponent } from "../components/home-page/home-page.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";

@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot(routes), BooksPageComponent],
    declarations: [BooksPageComponent/*TODO*/],
    exports: [],
    providers: [/*TODO*/],
    bootstrap: [HomePageComponent]
})
export class myAppModule{}