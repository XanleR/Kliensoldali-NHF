import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Injectable } from "@angular/core";
import { Book } from "../models/book";
import { NonNullableFormBuilder } from "@angular/forms";
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class BookService{
    private apiUrl = 'https://anapioficeandfire.com/api/books'
    constructor(private http: HttpClient){}

  getAllBooks(pageNumber: number = 1, pageSize: number = 10):Observable<Book[]>{
    let params = new HttpParams()
    .set('page', pageNumber.toString())
    .set('pageSize', pageSize.toString());

    return this.http.get<Book[]>(this.apiUrl, {params});
  }

  getBookById(bookId: string): Observable<Book>{
    return this.getBookByUrl(`${this.apiUrl}/${bookId}`);

    //return this.http.get<Book>(`${this.apiUrl}/${bookId}`);
  }

  getBookByUrl(url: string): Observable<Book>{
    console.log("GetBookByUrl", url);

    const tmp = this.getBookFromLocalStorage(url);
    if(tmp != null){
      console.log("Getting data from Storage");
      return of(tmp);
    }

    
    
    return this.http.get<Book>(url).pipe(
      map(
        (book) => {
          console.log("Gettin data from API");
          this.saveBook(book);
          return book;
        }
      )
    );

  }

  saveBook(book: Book):void{
    localStorage.setItem(book.url, JSON.stringify(book));
  }

  getBookFromLocalStorage(url: string): Book | null{
    const tmp = localStorage.getItem(url);
    if(tmp == null){
      return null;
    }
    return JSON.parse(tmp);
  }
}