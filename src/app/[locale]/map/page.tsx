'use client';

import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function MapPage() {
    const mapContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        const map = new maplibregl.Map({
            container: mapContainer.current,
            style: 'https://demotiles.maplibre.org/style.json',
            center: [2.3522, 48.8566], // Paris
            zoom: 12
        });

        new maplibregl.Marker()
            .setLngLat([2.3522, 48.8566])
            .setPopup(new maplibregl.Popup().setText('Coucou Paris!'))
            .addTo(map);

        return () => map.remove();
    }, []);

    return <div ref={mapContainer} style={{ height: '100vh', width: '100%' }} />;
}
