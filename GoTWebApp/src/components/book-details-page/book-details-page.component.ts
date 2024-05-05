import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
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
  povCharacters: {[url: string]: Character} = {};
  bookId: string | null = null;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  povCurrentPage: number = 1;
  povPageSize: number = 10;
  povTotalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private characterService: CharacterService,
    private router: Router
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
        this.totalPages = Math.ceil(this.book.characters.length / this.pageSize);
        this.povTotalPages = Math.ceil(this.book.povCharacters.length / this.povPageSize);
        this.loadCharacters();
        this.loadPovCharacters();
      },
      (error) => {console.error('Error fetching book details: ', error);}
    )
  }

  loadCharacters(): void {
    this.characters = {};
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.book?.characters.length || 0);

    for (let i = startIndex; i < endIndex; i++) {
      const characterUrl = this.book?.characters[i]!;
      this.characterService.getCharacterByUrl(characterUrl).subscribe(
        (data) => {
          this.characters[characterUrl] = data; // Store character details by URL
        },
        (error) => {
          console.error('Error fetching character details: ', error);
        }
      );
    }
  }

  loadPovCharacters(): void{
    this.povCharacters = {};
    const startIndex = (this.povCurrentPage - 1) * this.povPageSize;
    const endIndex = Math.min(startIndex + this.povPageSize, this.book?.characters.length || 0);

    for (let i = startIndex; i < endIndex; i++) {
      const characterUrl = this.book?.povCharacters[i]!;
      this.characterService.getCharacterByUrl(characterUrl).subscribe(
        (data) => {
          this.povCharacters[characterUrl] = data; // Store character details by URL
        },
        (error) => {
          console.error('Error fetching character details: ', error);
        }
      );
    }
  }

  goToCharactersDetailsPage(characterUrl: string): void{
    const characterId = characterUrl.split('/').pop();
    if(characterId){
      this.router.navigate(['/characters', characterId]);
    }
  }

  previousPage(): void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.loadCharacters();
    }
  }

  nextPage(): void{
    if(this.currentPage != this.totalPages){
      this.currentPage++;
      this.loadCharacters();
    }
    
  }

  povPreviousPage(): void{
    if(this.povCurrentPage > 1){
      this.povCurrentPage--;
      this.loadPovCharacters();
    }
  }

  povNextPage(): void{
    if(this.povCurrentPage != this.povTotalPages){
      this.povCurrentPage++;
      this.loadPovCharacters();
    }
    
  }
  
}
