# GeoSphere Explorer

## Current State
New project — blank scaffold with empty Motoko actor and no frontend code.

## Requested Changes (Diff)

### Add
- Interactive 3D Earth globe (Three.js / React Three Fiber) with realistic texture, atmosphere glow, imaginary lines (lat/lng grid), country/state/city labels at zoom levels
- Famous world monuments dataset: ~50+ monuments with name, location (lat/lng), mini photo URL, description, history, category
- Search bar to find cities/places and show monument pop-ups with mini photos
- Monument detail panel: full description, history, photo, and action buttons
- 2D Map view using Leaflet + OpenStreetMap tiles
- Satellite view using Leaflet satellite tile layer
- Street view embed panel (Google Street View via embed URL)
- Zoom in/out slider control
- Compass widget at bottom-right showing cardinal directions
- Coordinates display at bottom-left showing hovered lat/lng
- Transport route planner: select monument as destination, show route from user's live GPS location by TRAIN, BUS, FLIGHT, CAR, MOTORCYCLE
- Map/Satellite view toggle
- Dark cozy space theme with glassmorphism panels, amber accents

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Backend: store monuments data (name, coords, description, history, category, imageUrl)
2. Backend: query monuments by text search, by proximity
3. Frontend: Three.js globe with earth texture, atmosphere, grid lines, country labels, monument pins
4. Frontend: Leaflet 2D map / satellite toggle
5. Frontend: Search bar with autocomplete
6. Frontend: Monument detail modal (photo, description, history, street view iframe)
7. Frontend: Route planner UI with transport mode tabs and drawn route on map
8. Frontend: Zoom slider, compass, coordinates overlay
9. Frontend: Dark glassmorphism theme
