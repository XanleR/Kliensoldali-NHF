import { Component, OnInit } from '@angular/core';
import { HouseService } from '../../services/house.service';
import { ActivatedRoute, Router } from '@angular/router';
import { House } from '../../models/house';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-house-details-page',
  templateUrl: './house-details-page.component.html',
  styleUrl: './house-details-page.component.css'
})
export class HouseDetailsPageComponent {
  house: House | undefined;
  houseId: string | null = null;
  currentLord: string | undefined;
  heir: string | undefined;
  overlord: string | undefined;
  founder: string | undefined;
  cadetBranches: {[url: string]: House} = {};
  swornMembers: {[url: string]: Character} = {};

  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private characterService: CharacterService,
    private router: Router
  ){}

  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.houseId = params.get('id');
      if(this.houseId){
        this.loadHouseDetails(this.houseId);
      }
    })
  }

  loadCurrentLord(): void{
    if(this.house?.currentLord){
      this.characterService.getCharacterByUrl(this.house.currentLord).subscribe(
      (data) => {this.currentLord = data.name;},
      (error) => {console.log('Error fetching currentLord: ', error);}
      )
    } 
  }

  loadCadetBranches(): void{
    this.house?.cadetBranches.forEach(houseUrl => {
      this.houseService.getHouseByUrl(houseUrl).subscribe(
        (data => {this.cadetBranches[houseUrl] = data;}),
        (error) => {console.error('Error fethcing cadetBranch: ', error);}
      )
    });
  }

  loadSwornMembers(): void{
    this.swornMembers = {};
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.house?.swornMembers.length || 0);

    for(let i = startIndex; i < endIndex; i++){
      const characterUrl = this.house?.swornMembers[i]!;
      this.characterService.getCharacterByUrl(characterUrl).subscribe(
        (data) => {this.swornMembers[characterUrl] = data;},
        (error) => {console.log('Error fetching sworn member: ', error);}
      )
    }
  }

  loadOtherCharacters(): void{
    if(this.house?.heir){
      this.characterService.getCharacterByUrl(this.house.heir).subscribe(
      (data) => {this.heir = data.name;},
      (error) => {console.log('Error fetching heir: ', error);}
      )
    }
    if(this.house?.overlord){
      this.houseService.getHouseByUrl(this.house.overlord).subscribe(
      (data) => {this.overlord = data.name;},
      (error) => {console.log('Error fetching overLord: ', error);}
      )
    } 
    if(this.house?.founder){
      this.characterService.getCharacterByUrl(this.house.founder).subscribe(
      (data) => {this.founder = data.name;},
      (error) => {console.log('Error fetching founder: ', error);}
      )
    } 
  }

  loadHouseDetails(houseId: string): void{
    this.houseService.getHouseById(houseId).subscribe(
      (data) => {
        this.house = data;
        this.totalPages = Math.ceil(this.house.swornMembers.length / this.pageSize);
        this.loadCurrentLord();
        this.loadCadetBranches();
        this.loadSwornMembers();
        this.loadOtherCharacters();
      },
      (error) => {console.log('Error fetching house details: ', error);}
    )
  }

  goToCharactersDetailsPage(characterUrl: string): void{
    const characterId = characterUrl.split('/').pop();
    if(characterId){
      this.router.navigate(['/characters', characterId]);
    }
  }

  goToHouseDetailsPage(houseUrl: string): void{
    const houseId = houseUrl.split('/').pop();
    if(houseId){
      this.router.navigate(['/houses', houseId]);
    }
  }

  previousPage(): void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.loadSwornMembers();
    }
  }

  nextPage(): void{
    if(this.currentPage != this.totalPages){
      this.currentPage++;
      this.loadSwornMembers();
    }
  }
  

}
