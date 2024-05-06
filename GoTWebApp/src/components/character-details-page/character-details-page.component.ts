import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService } from '../../services/character.service';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { House } from '../../models/house';
import { HouseService } from '../../services/house.service';

@Component({
  selector: 'app-character-details-page',
  templateUrl: './character-details-page.component.html',
  styleUrl: './character-details-page.component.css'
})
export class CharacterDetailsPageComponent {
  character: Character | undefined;
  characterId: string | null = null;
  books: {[url: string]: Book} = {};
  povBooks: {[url: string]: Book} = {};
  allegiances: {[url: string]: House} = {};
  
  fatherName: string | undefined;
  motherName: string | undefined;
  spouseName: string | undefined;
  

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private bookService: BookService,
    private houseService: HouseService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.characterId = params.get('id');
      if(this.characterId){
        this.loadCharacterDetails(this.characterId);
      }
    })
  }

  loadCharacterDetails(characterId: string): void{
    this.characterService.getCharacterById(characterId).subscribe(
      (data) => {
        this.character = data;
        this.loadBooks();
        this.loadFamilyNames();
        this.loadAllegiances();
      },
      (error) => {console.log('Error fetching character details: ', error);}
    )
  }

  loadFamilyNames(): void {
    // Load father name
    if (this.character?.father) {
      this.characterService.getCharacterByUrl(this.character.father).subscribe(
        (data) => {
          this.fatherName = data.name;
        },
        (error) => {
          console.error('Error fetching father details: ', error);
        }
      );
    }

    // Load mother name
    if (this.character?.mother) {
      this.characterService.getCharacterByUrl(this.character.mother).subscribe(
        (data) => {
          this.motherName = data.name;
        },
        (error) => {
          console.error('Error fetching mother details: ', error);
        }
      );
    }

    // Load spouse name
    if (this.character?.spouse) {
      this.characterService.getCharacterByUrl(this.character.spouse).subscribe(
        (data) => {
          this.spouseName = data.name;
        },
        (error) => {
          console.error('Error fetching spouse details: ', error);
        }
      );
    }
  }

  loadBooks(): void{
    this.books = {};
    this.povBooks = {};
    
    this.character?.books.forEach(bookUrl => {
      this.bookService.getBookByUrl(bookUrl).subscribe(
        (data) => {this.books[bookUrl] = data;},
        (error) => {console.error('Error fetching book details: ', error);}
      )
    });

    this.character?.povBooks.forEach(bookUrl => {
      this.bookService.getBookByUrl(bookUrl).subscribe(
        (data) => {this.povBooks[bookUrl] = data;},
        (error) => {console.error('Error fetching povBook details: ', error);}
      )
    });
  }

  loadAllegiances(): void{
    this.character?.allegiances.forEach(houseUrl => {
      this.houseService.getHouseByUrl(houseUrl).subscribe(
        (data) => {this.allegiances[houseUrl] = data;},
        (error) => {console.error('Error fetching allegiances: ', error);}
      )
    });
  }

  goToBooksDetailsPage(bookUrl: string):void{
    const bookId = bookUrl.split('/').pop();
    if(bookId){
      this.router.navigate(['/books', bookId]);
    }
  }

  goToHouseDetailsPage(houseUrl: string): void{
    const houseId = houseUrl.split('/').pop();
    if(houseId){
      this.router.navigate(['/houses', houseId]);
    }
  }

  goToCharacterDetailsPage(characterUrl: string): void{
    console.log(characterUrl);
    const characterId = characterUrl.split('/').pop();
    if(characterId){
      this.router.navigate(['/characters', characterId]);
    }
  }
}
