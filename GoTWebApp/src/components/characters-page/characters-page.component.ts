import { Component } from '@angular/core';
import { Character } from '../../models/character';

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
}
