import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { CharacterService } from '../../services/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrl: './characters-page.component.css'
})
export class CharactersPageComponent {
  characters: Character[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  isNextLastPage: boolean = false;

  constructor(private characterService: CharacterService, private router: Router){

  }

  ngOnInit(): void{
    this.loadCharacters();
  }

  loadCharacters(): void{
    this.characterService.getAllCharacters(this.currentPage, this.pageSize).subscribe(
      (data) => {this.characters = data;},
      (error) => {console.error('Error fethcing characters: ', error);}
    );
    this.characterService.getAllCharacters(this.currentPage+1, this.pageSize).subscribe(
      (data) => {if(data.length == 0 ){this.isNextLastPage = true;}},
      (error) => {console.error('Error fethcing next page of Characters: ', error);}
    );
  }

  previousPage(): void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.isNextLastPage = false;
      this.loadCharacters();
    }
  }

  nextPage(): void{
    if(this.characters.length == this.pageSize){
      this.currentPage++;
      this.loadCharacters();
    }
  }
  goToCharactersDetailsPage(characterUrl: string): void{
    const characterId = characterUrl.split('/').pop();
    if(characterId){
      this.router.navigate(['/characters', characterId]);
    }
  }
}
