# GeoSphere Explorer

## Current State
The app launches directly into the globe/map explorer (AppContent). There is no landing/splash page. The header shows the GeoSphere Explorer logo inline.

## Requested Changes (Diff)

### Add
- LandingPage component: full-screen with auto-cycling slideshow of monument background photos, app logo (yellow globe) centered at top, large app name "GeoSphere Explorer" below it, tagline, and a "Start Exploring" CTA button that transitions the user to the globe view.
- Use real monument photo URLs (Wikimedia/Unsplash) for the slideshow: Taj Mahal, Eiffel Tower, Machu Picchu, Colosseum, Great Wall, Angkor Wat, Petra, Pyramids of Giza.
- Smooth fade transition between landing page and globe view.

### Modify
- App.tsx: add `showLanding` boolean state (default true). When true, render LandingPage; when false, render AppContent.
- When "Start Exploring" is clicked, animate out the landing page and animate in the globe.

### Remove
- Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/LandingPage.tsx` with slideshow, logo, title, and CTA button.
2. Modify `App.tsx` to conditionally render LandingPage or AppContent based on state.
3. Use the generated logo at `/assets/generated/geosphere-logo-transparent.dim_200x200.png`.
