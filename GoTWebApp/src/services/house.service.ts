import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, of } from "rxjs";
import { House } from "../models/house";

@Injectable({
    providedIn: 'root'
})
export class HouseService{
    private apiUrl = 'https://anapioficeandfire.com/api/houses'
    constructor(private http: HttpClient){}

    getAllHouses(pageNumber: number = 1, pageSize: number = 10):Observable<House[]>{
        let params = new HttpParams()
        .set('page', pageNumber.toString())
        .set('pageSize', pageSize.toString());

        return this.http.get<House[]>(this.apiUrl, {params});
    }

    getHouseById(houseId: string):Observable<House>{
        return this.getHouseByUrl(`${this.apiUrl}/${houseId}`);
    }

    getHouseByUrl(url: string): Observable<House>{
        const tmp = this.getHouseFromLocalStorage(url);
        if(tmp != null){
            return of(tmp);
        }
        return this.http.get<House>(url).pipe(
            map(
              (house) => {
                this.saveHouse(house);
                return house;
              }
            )
          );
    }

    saveHouse(house: House):void{
        localStorage.setItem(house.url, JSON.stringify(house));
      }
    
    getHouseFromLocalStorage(url: string): House | null{
    const tmp = localStorage.getItem(url);
    if(tmp == null){
        return null;
    }
    return JSON.parse(tmp);
    }
}