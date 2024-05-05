import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Book } from "../models/book";

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
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`);
  }

  getBookByUrl(url: string): Observable<Book>{
    return this.http.get<Book>(url);
}
}