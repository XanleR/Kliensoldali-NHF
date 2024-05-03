import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrl: './book-details-page.component.css'
})
export class BookDetailsPageComponent {
  book: Book | undefined;
  bookId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
      if(this.bookId){
        this.loadBookDetatails(this.bookId);
      }
    })
  }

  loadBookDetatails(bookId: string): void{
    this.bookService.getBookById(bookId).subscribe(
      (data) => {this.book = data;},
      (error) => {console.error('Error fetching book details: ', error);}
    )
  }
}
