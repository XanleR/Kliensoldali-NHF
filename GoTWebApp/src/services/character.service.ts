import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map, of } from "rxjs";
import { Character } from "../models/character";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class CharacterService{
    private apiUrl = 'https://anapioficeandfire.com/api/characters'
    constructor(private http: HttpClient){}

    getAllCharacters(pageNumber: number = 1, pageSize: number = 10):Observable<Character[]>{
        let params = new HttpParams()
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString());

        return this.http.get<Character[]>(this.apiUrl, {params});
    }

    getCharacterById(characterId: string):Observable<Character>{
        return this.getCharacterByUrl(`${this.apiUrl}/${characterId}`);
        //return this.http.get<Character>(`${this.apiUrl}/${characterId}`);
    }

    getCharacterByUrl(url: string): Observable<Character>{
        const tmp = this.getCharacterFromLocalStorage(url);
        if(tmp != null){
            return of(tmp);
        }
        return this.http.get<Character>(url).pipe(
            map(
                (character) => {
                    this.saveCharacter(character);
                    return character;
                }
            )
        );
    }

    searchByName(name: string): Observable<Character[]>{
        return this.http.get<Character[]>(`${this.apiUrl}?name=${encodeURIComponent(name)}`);
    }

    saveCharacter(character: Character): void{
        localStorage.setItem(character.url, JSON.stringify(character));
    }

    getCharacterFromLocalStorage(url: string): Character | null{
        const tmp = localStorage.getItem(url);
        if(tmp == null){
            return null;
        }
        return JSON.parse(tmp);
    }

    
}