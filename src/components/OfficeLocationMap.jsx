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
        className="absolute left-3 top-3 z-[3] max-w-[calc(100%-5.5rem)] rounded-[5px] border border-[#1e82e6]/35 bg-white/95 px-3 py-2 font-noto-sans text-[13px] font-semibold leading-snug text-[#1e82e6] shadow-sm backdrop-blur-sm transition-colors hover:border-[#1e82e6] hover:bg-white"
      >
        Open in Google Maps
      </a>

      <div className="absolute right-3 top-3 z-[3] flex flex-col gap-1.5">
        <button
          type="button"
          aria-label="Zoom in"
          disabled={zoom >= MAP_ZOOM_MAX}
          onClick={zoomIn}
          className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-[#1e82e6]/40 bg-white/95 text-[#1e82e6] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#1e82e6] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/95 disabled:hover:text-[#1e82e6]"
        >
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          disabled={zoom <= MAP_ZOOM_MIN}
          onClick={zoomOut}
          className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-[#1e82e6]/40 bg-white/95 text-[#1e82e6] shadow-sm backdrop-blur-sm transition-colors hover:bg-[#1e82e6] hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white/95 disabled:hover:text-[#1e82e6]"
        >
          <Minus className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      {!hideAddressFooter && (
        <div className="absolute bottom-0 left-0 right-0 z-[2] border-t border-[#4a9eef] bg-[#1e82e6] px-4 py-3">
          <p className="font-noto-sans text-[15px] font-bold leading-snug text-white">{OFFICE_ADDRESS_LINES[0]}</p>
          <p className="mt-1 font-noto-sans text-[15px] font-normal leading-snug text-white/95">{OFFICE_ADDRESS_LINES[1]}</p>
        </div>
      )}
    </>
  );
}
