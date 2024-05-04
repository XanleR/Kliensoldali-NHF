import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
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
        return this.http.get<Character>(`${this.apiUrl}/${characterId}`);
    }

    getCharacterByUrl(url: string): Observable<Character>{
        return this.http.get<Character>(url);
    }

    
}