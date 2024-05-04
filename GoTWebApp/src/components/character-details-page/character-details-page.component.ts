import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/character';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character-details-page',
  templateUrl: './character-details-page.component.html',
  styleUrl: './character-details-page.component.css'
})
export class CharacterDetailsPageComponent {
  character: Character | undefined;
  characterId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
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
      (data) => {this.character = data;},
      (error) => {console.log('Error fetching character details: ', error);}
    )
  }
}
