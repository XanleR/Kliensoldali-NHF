import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../models/character';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.css'
})
export class BooksPageComponent {
  books: Book[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  isNextLastPage: boolean = false;

  constructor(private bookService: BookService, private router: Router){
    
  }

  ngOnInit(): void{
    this.loadBooks();
  }

  loadBooks(): void{
    this.bookService.getAllBooks(this.currentPage, this.pageSize).subscribe(
      (data) => {this.books = data;},
      (error) => {console.error('Error fethcing books: ', error);}
    );
    this.bookService.getAllBooks(this.currentPage+1, this.pageSize).subscribe(
      (data) => {if(data.length == 0 ){this.isNextLastPage = true;}},
      (error) => {console.error('Error fethcing next page of books: ', error);}
    );
  }

  previousPage(): void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.isNextLastPage = false;
      this.loadBooks();
    }
  }

  nextPage(): void{
    if(this.books.length == this.pageSize){
      this.currentPage++;
      this.loadBooks();
    }
  }

  goToBookDetailsPage(bookUrl: string): void{
    const bookId = bookUrl.split('/').pop();
    if(bookId){
      this.router.navigate(['/books', bookId]);
    }
  }

}
