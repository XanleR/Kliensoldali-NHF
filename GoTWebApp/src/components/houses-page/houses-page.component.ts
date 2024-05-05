import { Component, OnInit } from '@angular/core';
import { House } from '../../models/house';
import { HouseService } from '../../services/house.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-houses-page',
  templateUrl: './houses-page.component.html',
  styleUrl: './houses-page.component.css'
})
export class HousesPageComponent {
  houses: House[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  isNextLastPage: boolean = false;

  constructor(
    private houseService: HouseService,
    private router: Router
    ){

  }

  ngOnInit(): void{
    this.loadHouses();
  }

  loadHouses(): void{
    this.houseService.getAllHouses(this.currentPage, this.pageSize).subscribe(
      (data) => {this.houses = data;},
      (error) => {console.error('Error fethcing houses: ', error);}
    );
    this.houseService.getAllHouses(this.currentPage+1, this.pageSize).subscribe(
      (data) => {if(data.length == 0 ){this.isNextLastPage = true;}},
      (error) => {console.error('Error fethcing next page of houses ', error);}
    );
  }

  previousPage(): void{
    if(this.currentPage > 1){
      this.currentPage--;
      this.isNextLastPage = false;
      this.loadHouses();
    }
  }

  nextPage(): void{
    if(this.houses.length == this.pageSize){
      this.currentPage++;
      this.loadHouses();
    }
  }
  goToHousesDetailsPage(houseUrl: string): void{
    const houseId = houseUrl.split('/').pop();
    if(houseId){
      this.router.navigate(['/houses', houseId]);
    }
  }
}
