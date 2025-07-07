import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LeafletDirective, LeafletModule } from '@bluehalo/ngx-leaflet';
import * as L from 'leaflet';
import { GeocodingService } from '../services/geocoding.service';
import { Trip, TripService } from '../services/trip.service';

@Component({
  selector: 'app-world-map',
  imports: [
    CommonModule,
    LeafletDirective,
    LeafletModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './world-map.html',
  styleUrl: './world-map.scss',
  providers: [TripService, GeocodingService]
})
export class WorldMap implements OnInit {
  options: any;
  layersControl: any;
  markers: any[] = [];
  trips: any[] = [];
  map: L.Map | undefined;
  selectedTrip: any = null;

  constructor(
    private tripService: TripService,
    private geocodingService: GeocodingService
  ) { }

  ngOnInit() {
    this.options = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 2,
      center: L.latLng(20, 0)
    };

    this.tripService.getTrips().subscribe(async (trips: Trip[]) => {
      const markerPromises = trips.map(async trip => {
        const coords = await this.geocodingService.geocode(trip.locationName).toPromise();
        if (coords) {
          const marker = L.marker([coords.lat, coords.lon])
            .bindPopup(
              `<b>${trip.name}</b><br>${trip.date}<br>${trip.locationName}`
            )
            .bindTooltip(trip.name, { permanent: false, direction: 'top' });
          this.markers.push(marker);
          // Attach coordinates to trip for zooming
          (trip as any).coords = coords;
        }
      });
      await Promise.all(markerPromises);
      this.trips = trips;
    });
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  zoomToTrip(trip: any) {
    this.selectedTrip = trip;
    if (this.map && trip.coords) {
      this.map.setView([trip.coords.lat, trip.coords.lon], 10, { animate: true });
    }
  }
}