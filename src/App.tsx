
import './App.css'
import { useState } from 'react';
import Map, {Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { HiMapPin } from "react-icons/hi2";
import mapLocations from './locations';

function App() {

  type Location = {
    name: string;
    latitude: number;
    longitude: number
  }

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  return (
    <>
      
      <h1>Mapbox demo</h1>

      <p className="read-the-docs">
        Nedenfor vises et kort med mapbox.
      </p>
      <p className="read-the-docs">
        Der er indsat fem forskellige Københavnske seværdigheder på kortet.
      </p>
    

      <Map
      mapboxAccessToken={import.meta.env.VITE_MAPBOX }
      initialViewState={{
        //55.68467816452233, 12.584083161614306
        longitude: 12.59000,
        latitude: 55.68000,
        zoom: 13.5
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {mapLocations.map(location => (
        <Marker key={location.name} longitude={location.longitude} latitude={location.latitude} anchor="bottom" >
          <button 
            onClick={() => {
              console.log("Clicked location:", location);
              setSelectedLocation(location)
            }} 
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <HiMapPin size={48} color='green'/>
          </button>
        </Marker>
      ))}
        {selectedLocation && (
        <Popup
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor="top"
          onClose={() => setSelectedLocation(null)}
        >
          <div>
            <h3>{selectedLocation.name}</h3>
          </div>
        </Popup>
      )}
      </Map> 
    </>
  )
}

export default App
