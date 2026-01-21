'use client';

import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps';
import { useState } from 'react';
import { locations } from '../data/locations';

type YandexMouseEvent = {
  get: (key: 'domEvent') => {
    originalEvent: MouseEvent;
  };
};

export const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState<
    'berlin' | 'london' | 'newYork'
  >('berlin');

  const [hoveredShop, setHoveredShop] = useState<{
    name: string;
    image: string;
    x: number;
    y: number;
  } | null>(null);

  const currentLocationData = locations[currentLocation];

  return (
    <YMaps query={{ lang: 'en_US' }}>
      <section className="max-w-365 w-full px-2.5 mx-auto">
        <div className="flex flex-col gap-10 w-full">
          <h2 className="text-xl font-semibold">Locations</h2>

          <div className="flex gap-4 flex-wrap">
            {Object.entries(locations).map(([key, location]) => (
              <button
                key={key}
                onClick={() =>
                  setCurrentLocation(key as keyof typeof locations)
                }
                className={`px-3 py-1 rounded text-neutral-50 transition cursor-pointer active:scale-95
                  ${
                    key === currentLocation
                      ? 'bg-lime-600 scale-105'
                      : 'bg-neutral-800 hover:bg-neutral-700'
                  }
                `}
              >
                {location.name}
              </button>
            ))}
          </div>

          <div className="w-full h-87.5 rounded overflow-hidden">
            <Map
              options={{
                suppressMapOpenBlock: true,
              }}
              state={{
                center: currentLocationData.center,
                zoom: 12,
              }}
              className="no-ymaps-copyright size-full"
            >
              {currentLocationData.shops.map((shop) => (
                <Placemark
                  key={shop.id}
                  geometry={shop.coordinates}
                  options={{
                    iconColor: '#84cc16',
                  }}
                  onMouseEnter={(e: YandexMouseEvent) => {
                    const domEvent = e.get('domEvent');
                    setHoveredShop({
                      name: shop.name,
                      image: shop.image,
                      x: domEvent.originalEvent.clientX,
                      y: domEvent.originalEvent.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoveredShop(null);
                  }}
                />
              ))}
            </Map>
            {hoveredShop && (
              <div
                className="fixed z-50 bg-white rounded-lg shadow-lg p-2 w-48 pointer-events-none"
                style={{
                  top: hoveredShop.y + 12,
                  left: hoveredShop.x + 12,
                }}
              >
                <img
                  src={hoveredShop.image}
                  alt={hoveredShop.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <div className="text-sm font-semibold text-black">
                  {hoveredShop.name}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </YMaps>
  );
};
