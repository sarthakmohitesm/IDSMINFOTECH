import { useCallback, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Minus, Plus } from 'lucide-react';

/** Resolved from https://maps.app.goo.gl/48JZaF8TC7hZzydL6 — IDMS Infotech Private Limited */
export const MAP_LINK = 'https://maps.app.goo.gl/48JZaF8TC7hZzydL6';

const MAP_CENTER = { lat: 19.2040035, lng: 72.9692173 };
const MAP_ZOOM_DEFAULT = 17;
const MAP_ZOOM_MIN = 14;
const MAP_ZOOM_MAX = 20;

export const OFFICE_ADDRESS_LINES = [
  'IDMS Infotech Private Limited',
  '222, Jai Siddhivinayak Premises, Opp. Cadbury Company, Pokharan Road-1, Thane, Maharashtra 400602, India',
];

function mapEmbedSrc(zoom) {
  const { lat, lng } = MAP_CENTER;
  return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&ie=UTF8&iwloc=B&output=embed`;
}

/**
 * Styled map JSON (Maps JavaScript API) — light grey base, blue water/accents.
 * Tweak here or paste a Snazzy Maps export for a different look.
 */
const officeMapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#f0f4f8' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f0f4f8' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#5c6b7a' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'simplified' }] },
  { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#e8eef4' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#7a8a99' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#cfe6fa' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#d0dce8' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e8f0fa' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#93c5ef' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#a8c9ec' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#4a7ab5' }] },
];

const mapContainerStyle = { width: '100%', height: '100%' };

export default function OfficeLocationMap({ hideAddressFooter = false }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(MAP_ZOOM_DEFAULT);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleZoomChanged = useCallback(() => {
    const z = mapRef.current?.getZoom();
    if (typeof z === 'number') setZoom(z);
  }, []);

  const zoomIn = () => {
    setZoom((z) => {
      const next = Math.min(MAP_ZOOM_MAX, z + 1);
      mapRef.current?.setZoom(next);
      return next;
    });
  };

  const zoomOut = () => {
    setZoom((z) => {
      const next = Math.max(MAP_ZOOM_MIN, z - 1);
      mapRef.current?.setZoom(next);
      return next;
    });
  };

  const mapLayer = apiKey ? (
    <LoadScript
      googleMapsApiKey={apiKey}
      loadingElement={
        <div className="absolute inset-0 flex items-center justify-center bg-[#eef4fb] font-noto-sans text-sm text-gray-500">
          Loading map…
        </div>
      }
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        mapContainerClassName="h-full w-full"
        center={MAP_CENTER}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onZoomChanged={handleZoomChanged}
        options={{
          styles: officeMapStyles,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          gestureHandling: 'greedy',
        }}
      >
        <Marker position={MAP_CENTER} title={OFFICE_ADDRESS_LINES[0]} />
      </GoogleMap>
    </LoadScript>
  ) : (
    <iframe
      key={zoom}
      title={OFFICE_ADDRESS_LINES[0]}
      src={mapEmbedSrc(zoom)}
      className="absolute inset-0 h-full w-full border-0"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );

  return (
    <>
      <div className="absolute inset-0">{mapLayer}</div>

      <a
        href={MAP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-3.5 top-3.5 z-[3] flex items-center gap-1.5 rounded border border-slate-200/80 bg-white/95 px-3 py-1.5 text-[12px] font-semibold text-[#1E69D6] shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow"
      >
        <span className="text-sm">📍</span>
        <span>Open in Google Maps</span>
        <span className="text-[11px]">↗</span>
      </a>

      <div className="absolute right-3.5 top-3.5 z-[3] flex flex-col rounded border border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-sm overflow-hidden">
        <button
          type="button"
          aria-label="Zoom in"
          disabled={zoom >= MAP_ZOOM_MAX}
          onClick={zoomIn}
          className="flex h-8 w-8 items-center justify-center text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <div className="h-[1px] w-full bg-slate-200" />
        <button
          type="button"
          aria-label="Zoom out"
          disabled={zoom <= MAP_ZOOM_MIN}
          onClick={zoomOut}
          className="flex h-8 w-8 items-center justify-center text-slate-700 hover:bg-slate-100 active:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 transition-colors"
        >
          <Minus className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      {!hideAddressFooter && (
        <div className="absolute bottom-0 left-0 right-0 z-[2] bg-[#1E69D6] px-4 py-3 flex items-center gap-3.5 text-white shadow-md">
          <div className="w-9 h-9 rounded bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
            <span className="text-base">📍</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-bold leading-snug tracking-wide text-white truncate">
              {OFFICE_ADDRESS_LINES[0]}
            </p>
            <p className="text-[11px] font-normal leading-snug text-white/90 line-clamp-1 mt-0.5">
              {OFFICE_ADDRESS_LINES[1]}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
