import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';

/**
 * Component for displaying details of a book.
 */
@Component({
  selector: 'app-book-details-page',
  templateUrl: './book-details-page.component.html',
  styleUrls: ['./book-details-page.component.css']
})
export class BookDetailsPageComponent implements OnInit {
  /** The book to display details for. */
  book: Book | undefined;

  /** Characters in the book, mapped by URL. */
  characters: {[url: string]: Character} = {};

  /** POV (Point of View) characters in the book, mapped by URL. */
  povCharacters: {[url: string]: Character} = {};

  /** ID of the book to load details for. */
  bookId: string | null = null;

  /** Current page number for characters pagination. */
  currentPage: number = 1;

  /** Number of items per page for characters pagination. */
  pageSize: number = 10;

  /** Total number of pages for characters pagination. */
  totalPages: number = 0;

  /** Current page number for POV characters pagination. */
  povCurrentPage: number = 1;

  /** Number of items per page for POV characters pagination. */
  povPageSize: number = 10;

  /** Total number of pages for POV characters pagination. */
  povTotalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private characterService: CharacterService,
    private router: Router
  ){}

  /** Initializes the component. */
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');
      if(this.bookId){
        this.loadBookDetails(this.bookId);
      }
    })
  }

  /**
   * Loads details of the specified book.
   * @param bookId ID of the book.
   */
  loadBookDetails(bookId: string): void{
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

  /** Loads characters for the current page. */
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

  /** Loads POV characters for the current page. */
  loadPovCharacters(): void{
    this.povCharacters = {};
    const startIndex = (this.povCurrentPage - 1) * this.povPageSize;
    const endIndex = Math.min(startIndex + this.povPageSize, this.book?.povCharacters.length || 0);

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

  /**
   * Navigates to the details page of the specified character.
   * @param characterUrl URL of the character.
   */
  goToCharactersDetailsPage(characterUrl: string): void{
    const characterId = characterUrl.split('/').pop();
    if(characterId){
      this.router.navigate(['/characters', characterId]);
    }
  }

  /** Moves to the previous page of characters. */
  previousPage(): void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.loadCharacters();
    }
  }

  /** Moves to the next page of characters. */
  nextPage(): void{
    if(this.currentPage != this.totalPages){
      this.currentPage++;
      this.loadCharacters();
    }
  }

  /** Moves to the previous page of POV characters. */
  povPreviousPage(): void{
    if(this.povCurrentPage > 1){
      this.povCurrentPage--;
      this.loadPovCharacters();
    }
  }

  /** Moves to the next page of POV characters. */
  povNextPage(): void{
    if(this.povCurrentPage != this.povTotalPages){
      this.povCurrentPage++;
      this.loadPovCharacters();
    }
  }
}
