import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrl: './book-details-page.component.css'
})
export class BookDetailsPageComponent {
  book: Book | undefined;
  characters: {[url: string]: Character} = {};
  bookId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private characterService: CharacterService
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
      (data) => {
        this.book = data;
        this.loadCharacters();
      },
      (error) => {console.error('Error fetching book details: ', error);}
    )
  }

  loadCharacters(): void{
    this.book?.characters.forEach(characterUrl => {
      this.characterService.getCharacterByUrl(characterUrl).subscribe(
        (data) => {this.characters[characterUrl] = data;},
        (error) => {console.error('Error fetching character details: ', error);}
      )
    })
  }
}
