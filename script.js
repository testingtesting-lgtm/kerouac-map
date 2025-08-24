mapboxgl.accessToken = 'pk.eyJ1Ijoic2ltb25yb3Nlbjk5IiwiYSI6ImNtZWJwcnlqbTBvaHEya3F2MGFwZmpsMzUifQ.g0ROBXb5SfCVWqYsUHCX9g';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/simonrosen99/cmebpudu400f401sd3zs58kuu',
    center: [-98.5795, 34], // <-- Latitude shifted south
    zoom: 3.2                 // <-- Zoomed out slightly
});
// --- Data for our Placemarkers with Journey IDs, Types, and Content ---
const places = {
  'type': 'FeatureCollection',
  'features': [
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-74.0060, 40.7128] }, 'properties': { 'title': 'New York City, NY', 'journey': 1, 'date': 'July, 1947', 'quote': 'I shambled after as I\'ve been doing all my life after people who interest me, because the only people for me are the mad ones...' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-87.6298, 41.8781] }, 'properties': { 'title': 'Chicago, IL', 'journey': 1, 'date': 'July, 1947', 'quote': 'I arrived in Chicago on a bus from Indianapolis, and got a room in the Y. All the smoke and spit and grease of Chicago segregation.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-93.6210, 41.5868] }, 'properties': { 'title': 'Des Moines, IA', 'journey': 1, 'date': 'July, 1947', 'quote': 'I was halfway across America, at the dividing line between the East of my youth and the West of my future.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-100.7622, 41.1239] }, 'properties': { 'title': 'North Platte, NE', 'journey': 1, 'date': 'July, 1947', 'quote': 'The bus roared through North Platte, flew on across the flats, and finally there was the honest-to-God beginning of the West.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-104.8202, 41.1399] }, 'properties': { 'title': 'Cheyenne, WY', 'journey': 1, 'date': 'July, 1947', 'quote': 'Cheyenne again, in the afternoon this time, with a sun beating down on the cracked wild streets. Frontier Days! Banners flew.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-104.9903, 39.7392] }, 'properties': { 'title': 'Denver, CO', 'journey': 1, 'date': 'July, 1947', 'quote': 'I was far from home, but there was Chad King to look up, and Tim Gray, and Roland Major, and the famous Dean Moriarty of course...' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-122.4194, 37.7749] }, 'properties': { 'title': 'San Francisco, CA', 'journey': 1, 'date': 'August, 1947', 'quote': 'I was at the end of America—no more land—and now there was nowhere to go but back.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-77.4360, 37.5407] }, 'properties': { 'title': 'Testament, VA (Richmond)', 'journey': 2, 'date': 'Christmas, 1948', 'quote': 'In the morning we received a call from my sister, inviting me to come and live with her in Testament, Virginia...' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-77.0369, 38.9072] }, 'properties': { 'title': 'Washington D.C.', 'journey': 2, 'date': 'January, 199', 'quote': 'I went to the G.I. surplus store on the corner of Pennsylvania Avenue and bought myself a lumberjack shirt. I was ready for the road again.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-90.0715, 29.9511] }, 'properties': { 'title': 'New Orleans, LA', 'journey': 2, 'date': 'January, 1949', 'quote': 'The air was so sweet in New Orleans it seemed to come in soft bandannas...' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-95.3698, 29.7604] }, 'properties': { 'title': 'Houston, TX', 'journey': 2, 'date': 'January, 1949', 'quote': 'I took a bus to Houston. I felt like sleeping, but there was no place to sleep.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-119.0187, 35.3733] }, 'properties': { 'title': 'Bakersfield, CA', 'journey': 2, 'date': 'September, 1947', 'quote': 'Terry and I were working in the fields near Bakersfield. I was a man of the earth, precisely as I had dreamed I would be...' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-102.5132, 36.0592] }, 'properties': { 'title': 'Dalhart, TX', 'journey': 3, 'date': 'Summer, 1950', 'quote': 'We were ready to enter the wilderness of Texas, the great dry stretches where the great longhorns used to roam.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-99.5076, 27.5306] }, 'properties': { 'title': 'Laredo, TX', 'journey': 3, 'date': 'Summer, 1950', 'quote': 'At Laredo we had to get out and stand in line for the customs officials. I was nervous.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-102.5833, 22.7709] }, 'properties': { 'title': 'Zacatecas, Mexico', 'journey': 3, 'date': 'Summer, 1950', 'quote': 'The bus arrived in Zacatecas, which is the silver town of Mexico. It was a beautiful town, and this was the entry to the earth.' } },
    { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [-99.1332, 19.4326] }, 'properties': { 'title': 'Mexico City, Mexico', 'journey': 3, 'date': 'Summer, 1950', 'quote': 'We had finally found the magic land at the end of the road and we were led to the desk.' } }
  ]
};

const journeyButtons = [
    { id: 'journey-1-btn', geojson: 'journey_1.geojson', color: '#B8860B' },
    { id: 'journey-2-btn', geojson: 'journey_2.geojson', color: '#B36743' },
    { id: 'journey-3-btn', geojson: 'journey_3.geojson', color: '#C9B884' }
];

function animateRoutePulse(timestamp) {
    const period = 2000; // ms for a full pulse cycle
    const minWidth = 5;  // Base width of the parchment layer
    const maxWidth = 7;  // Max width of the parchment layer
    const pulseValue = (Math.sin((timestamp / period) * 2 * Math.PI) + 1) / 2; // 0-1
    const currentWidth = minWidth + (maxWidth - minWidth) * pulseValue;

    journeyButtons.forEach(button => {
        if (map.getLayer(`route-parchment-${button.geojson}`)) {
            map.setPaintProperty(`route-parchment-${button.geojson}`, 'line-width', currentWidth);
        }
    });
    requestAnimationFrame(animateRoutePulse);
}

async function drawRoute(geojsonFile, routeColor, opacities) {
    try {
        const response = await fetch(geojsonFile);
        const routeData = await response.json();
        const sourceId = `route-source-${geojsonFile}`;
        if (!map.getSource(sourceId)) {
            map.addSource(sourceId, { 'type': 'geojson', 'data': routeData });
        }
        map.addLayer({ 'id': `route-parchment-${geojsonFile}`, 'type': 'line', 'source': sourceId, 'layout': { 'line-join': 'round', 'line-cap': 'round' }, 'paint': { 'line-color': '#F5EDE0', 'line-width': 5, 'line-opacity': opacities.stroke } });
        map.addLayer({ 'id': `route-ink-${geojsonFile}`, 'type': 'line', 'source': sourceId, 'layout': { 'line-join': 'round', 'line-cap': 'round' }, 'paint': { 'line-color': '#5D432C', 'line-width': 2.5, 'line-opacity': opacities.shadow } });
        map.addLayer({ 'id': `route-fill-${geojsonFile}`, 'type': 'line', 'source': sourceId, 'layout': { 'line-join': 'round', 'line-cap': 'round' }, 'paint': { 'line-color': routeColor, 'line-width': 1.5, 'line-opacity': opacities.fill } });
        console.log(`Route from ${geojsonFile} drawn successfully.`);
    } catch (error) { console.error(`Failed to draw route from ${geojsonFile}:`, error); }
}

async function initializeMap() {
    // 1. Hide the original 'water' layer from the style.
    if (map.getLayer('water')) {
        map.setLayoutProperty('water', 'visibility', 'none');
    }

    // 2. Apply Textures
    try {
        const waterTextureDensity = 3;
        const waterImage = await new Promise((resolve, reject) => map.loadImage('water4.jpg', (e, i) => e ? reject(e) : resolve(i)));
        if (!map.hasImage('water-background-pattern')) {
            map.addImage('water-background-pattern', waterImage, { pixelRatio: waterTextureDensity });
        }
        map.setPaintProperty('background', 'background-pattern', 'water-background-pattern');

        const goldImage = await new Promise((resolve, reject) => map.loadImage('gold11.jpg', (e, i) => e ? reject(e) : resolve(i)));
        if (!map.hasImage('gilding-texture-pattern')) {
            map.addImage('gilding-texture-pattern', goldImage);
        }
        map.addLayer({
            'id': 'gilding-texture-overlay', 'type': 'fill', 'source': 'composite', 'source-layer': 'landcover',
            'paint': { 'fill-pattern': 'gilding-texture-pattern', 'fill-opacity': 0.11 }
        }, 'road');
        console.log('Textures applied successfully.');
    } catch (error) {
        console.error('Failed to apply textures:', error);
    }

    // 3. Add HTML Markers and Popups
    let legendClicked = false;    
    places.features.forEach(feature => {

      const el = document.createElement('div');
        let classes = `typewriter-marker journey-${feature.properties.journey}`;
        el.className = classes;
        el.classList.add('pulse');
        const popupContent = `<h3>${feature.properties.title}</h3><p>"${feature.properties.quote}"</p><small>${feature.properties.date}</small>`;
        const popup = new mapboxgl.Popup({ offset: 15, closeButton: false, className: 'kerouac-popup' }).setHTML(popupContent);       
        // This is the line with the corrected typo
        const marker = new mapboxgl.Marker(el)

            .setLngLat(feature.geometry.coordinates)
            .setPopup(popup) //bind popup to marker
            .addTo(map);

        el.addEventListener('mouseenter', () => {
            // highlight associated legend item
            const journey = feature.properties.journey;
            document.getElementById(`journey-${journey}-btn`).classList.add('highlighted');
        });

        el.addEventListener('mouseleave', () => {
             // highlight associated legend item
            const journey = feature.properties.journey;
            document.getElementById(`journey-${journey}-btn`).classList.remove('highlighted');
        });


        el.addEventListener('mouseenter', () => {popup.addTo(map);});
        el.addEventListener('mouseleave', () => {
            popup.remove();
        });
        if(legendClicked){
            el.classList.remove('pulse');
        }
    });
    console.log('HTML markers added successfully.');

   // 4. Draw ALL journeys with unique colors and opacities
   await Promise.all([
        drawRoute('journey_1.geojson', '#B8860B', { shadow: 0.22, stroke: 0.35, fill: 0.65 }),
        drawRoute('journey_2.geojson', '#B36743', { shadow: 0.22, stroke: 0.35, fill: 0.5 }),  
        drawRoute('journey_3.geojson', '#C9B884', { shadow: 0.22, stroke: 0.35, fill: 0.4 })
    ]);
    // Start the route pulse animation
    requestAnimationFrame(animateRoutePulse);

    let sequenceTimeouts = [];
    let animationFrameId;

    // Function to add pulse class with a delay
    function pulseMarkersInOrder(routeNumber) {
        // Clear any existing timeouts from a previous sequence
        sequenceTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        sequenceTimeouts = [];

        // Immediately remove the highlight from all markers
        document.querySelectorAll('.typewriter-marker').forEach(marker => {
            marker.classList.remove('sequence-highlight');
        });

        const markers = document.querySelectorAll(`.journey-${routeNumber}.typewriter-marker`);
        let delay = 250;
        const pulseDuration = 1000; // Duration each marker stays highlighted
        const delayBetweenPulses = 1000;

        markers.forEach((marker, index) => {
            // Schedule adding the highlight class
            const timeout1 = setTimeout(() => {
                marker.classList.add('sequence-highlight');
            }, delay);

            // Schedule removing the highlight class
            const timeout2 = setTimeout(() => {
                marker.classList.remove('sequence-highlight');
            }, delay + pulseDuration);

            sequenceTimeouts.push(timeout1);
            sequenceTimeouts.push(timeout2);
            delay += delayBetweenPulses;
        });

        // After the entire sequence is over, remove the general 'highlighted'
        // class to revert markers to their original size.
        const totalDuration = calculateTotalDuration(routeNumber);
        const buttonInfo = journeyButtons.find(b => parseInt(b.id.split('-')[1]) === routeNumber);
        const finalCleanup = setTimeout(() => {
            markers.forEach(m => m.classList.remove('highlighted'));

            // Remove the animation layer
            const animationLayerId = 'route-animation-layer';
            if (map.getLayer(animationLayerId)) {
                map.removeLayer(animationLayerId);
            }

            if (buttonInfo) {
                // Reset the base route layer style
                const fillLayerId = `route-fill-${buttonInfo.geojson}`;
                if (map.getLayer(fillLayerId)) {
                    map.setPaintProperty(fillLayerId, 'line-opacity', 0.55);
                    map.setPaintProperty(fillLayerId, 'line-width', 1.5);
                }
                // Remove arrows
                const layerId = `route-arrows-${buttonInfo.geojson}`;
                if (map.getLayer(layerId)) { map.removeLayer(layerId); }
            }
        }, totalDuration);
        sequenceTimeouts.push(finalCleanup);
    }

    function calculateDrawingDuration(routeNumber) {
        const markers = document.querySelectorAll(`.journey-${routeNumber}.typewriter-marker`);
        if (markers.length === 0) return 0;
        const delayBetweenPulses = 1000;
        // Duration should cover up to the start of the last marker's pulse
        return 250 + (markers.length - 1) * delayBetweenPulses;
    }

    function calculateTotalDuration(routeNumber) {
        const markers = document.querySelectorAll(`.journey-${routeNumber}.typewriter-marker`);
        if (markers.length === 0) return 0;
        const drawingDuration = calculateDrawingDuration(routeNumber);
        const pulseDuration = 1000;
        // Total duration covers the end of the last marker's pulse
        return drawingDuration + pulseDuration;
    }

    function animateRouteDrawing(sourceId, duration) {
        const animationLayerId = 'route-animation-layer';

        // Find the ID of the first symbol layer in the map style. This is
        // to ensure that our animation line is drawn underneath labels.
        let firstSymbolId;
        for (const layer of map.getStyle().layers) {
            if (layer.type === 'symbol') {
                firstSymbolId = layer.id;
                break;
            }
        }

        // Add the new animation layer
        map.addLayer( {
            'id': animationLayerId,
            'type': 'line',
            'source': sourceId, // Use the existing source of the route
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#E4B456', // A bright, distinct animation color
                'line-width': 4,
                'line-opacity': 1,
                'line-trim-offset': [0, 0] // Start invisible
            }
        }, firstSymbolId);

        let start;
        function frame(timestamp) {
            if (start === undefined) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            if (isNaN(progress)) return; // a failsafe

            if (map.getLayer(animationLayerId)) {
                map.setPaintProperty(animationLayerId, 'line-trim-offset', [0, progress]);
            }

            if (progress < 1) animationFrameId = requestAnimationFrame(frame);
        }
        // Clear any existing frame to avoid conflicts
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(frame);
    }

    function removeAllArrowLayers() {
        journeyButtons.forEach(button => {
            const layerId = `route-arrows-${button.geojson}`;
            if (map.getLayer(layerId)) {
                map.removeLayer(layerId);
            }
        });
    }

    journeyButtons.forEach(button => {
        const element = document.getElementById(button.id);
        if (element) {
            element.addEventListener('click', () => {
                // 1. Clear previous animations and timeouts
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
                sequenceTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
                sequenceTimeouts = [];
                const routeNumber = parseInt(button.id.split('-')[1]);

                // 2. Reset all routes and markers to their default state
                removeAllArrowLayers();
                const animationLayerId = 'route-animation-layer';
                if (map.getLayer(animationLayerId)) {
                    map.removeLayer(animationLayerId);
                }

                journeyButtons.forEach(b => {
                    const fillLayerId = `route-fill-${b.geojson}`;
                    if (map.getLayer(fillLayerId)) {
                        map.setPaintProperty(fillLayerId, 'line-opacity', 0.55);
                        map.setPaintProperty(fillLayerId, 'line-width', 1.5);
                    }
                });

                document.querySelectorAll('.typewriter-marker').forEach(marker => {
                    marker.classList.remove('highlighted', 'sequence-highlight', 'pulse');
                });

                // 3. Highlight the selected route and its markers
                const selectedFillLayer = `route-fill-${button.geojson}`;
                if (map.getLayer(selectedFillLayer)) {
                    map.setPaintProperty(selectedFillLayer, 'line-opacity', 0.9);
                    map.setPaintProperty(selectedFillLayer, 'line-width', 2.5);
                }
                document.querySelectorAll(`.journey-${routeNumber}.typewriter-marker`).forEach(marker => {
                    marker.classList.add('highlighted');
                });

                // 4. Start the new animations
                const drawingDuration = calculateDrawingDuration(routeNumber);
                const sourceId = `route-source-${button.geojson}`;
                animateRouteDrawing(sourceId, drawingDuration);
                addRouteDirection(button.geojson, button.color);
                pulseMarkersInOrder(routeNumber);
          });
        } else {
            console.error(`Element with id ${button.id} not found.`);
        }
    });

    function addRouteDirection(geojsonFile, routeColor) {
        const sourceId = `route-source-${geojsonFile}`;
        map.addLayer({
            'id': `route-arrows-${geojsonFile}`,
            'type': 'symbol',
            'source': sourceId,
            'layout': {
                'symbol-placement': 'line',
                'symbol-spacing': 20,
                'icon-image': 'triangle-15', // Use a Mapbox default arrow icon
                'icon-rotate': 90,
            }, 'paint': { 'icon-color': routeColor, }
        });
    }
}

map.on('load', initializeMap);
