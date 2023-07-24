declare namespace google.maps {
  interface LatLng {
    lat(): number;
    lng(): number;
    lat(value: number): void;
    lng(value: number): void;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapOptions {
    zoom?: number;
    center?: LatLng | LatLngLiteral;
    // Agrega aquí otras opciones que quieras utilizar
  }

  class Map {
    constructor(mapDiv: Element, options?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    // Agrega aquí otros métodos y propiedades que quieras utilizar
  }

  class Marker {
    constructor(options?: MarkerOptions);
    setMap(map: Map | null): void;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    // Agrega aquí otros métodos y propiedades que quieras utilizar
  }

  interface MarkerOptions {
    position?: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    // Agrega aquí otras opciones que quieras utilizar
  }
}

export {};
