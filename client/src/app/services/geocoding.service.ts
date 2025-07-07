import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeocodingService {
  constructor(private http: HttpClient) {}

  geocode(locationName: string): Observable<{ lat: number, lon: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`;
    return this.http.get<any[]>(url).pipe(
      map(results => results.length ? { lat: +results[0].lat, lon: +results[0].lon } : null)
    );
  }
}