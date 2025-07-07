import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Trip {
    id: number;
    name: string;
    date: string;
    locationName: string;
}

@Injectable({
    providedIn: 'root'
})
export class TripService {
    private apiUrl = 'https://your-dotnet-api-url/api/trips'; // Replace with your actual API endpoint

    constructor(private http: HttpClient) { }

    getTrips(): Observable<Trip[]> {
        // Mock data for testing
        return of([
            { id: 1, name: 'Paris Adventure', date: '2024-07-01', locationName: 'Paris, France' },
            { id: 2, name: 'Tokyo Journey', date: '2024-08-15', locationName: 'Tokyo, Japan' },
            { id: 3, name: 'Sydney Escape', date: '2024-09-10', locationName: 'Sydney, Australia' }
        ]);
        return this.http.get<Trip[]>(this.apiUrl);
    }
}
