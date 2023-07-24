import React, { FC, useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { customDispatch } from 'hooks/redux';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { ErrorCodes } from 'shared/dictionary/errors';
import ITracking from 'shared/dictionary/tracking';
import IVehicle, { initialState } from 'shared/dictionary/vehicle';
import { handleCustomAlert } from 'shared/redux/slices/alerts';
import { GetLatestTrackingByVehicleId } from 'shared/redux/slices/vehicle/vehicle';
import { CustomButton } from 'shared/utils/components/general';
import CustomComponentToSelect from 'shared/utils/components/general/customComponentToSelect';
import { Coords } from 'google-map-react';
import 'timers-browserify';

const initialCoords = {
  lat: 20.67386773,
  lng: -103.3766127
};

declare global {
  interface Window {
    google: any;
  }
}

const CustomMap: FC = () => {
  const [vehicle, setVehicle] = useState<IVehicle>(initialState);
  const [marker, setMarker] = useState<Coords>(initialCoords);
  // const [isNew, setIsNew] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const apiKey = process.env.REACT_APP_GOOGLE_KEY!;
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.async = true;
  const dispatch = customDispatch();
  const navigate = useNavigate();

  const loadMap = async (e: any): Promise<any> => {
    if (!_.isNil(e) && e.id !== 0) {
      await getLatestTrackingByVehicleId(e);
    } else {
      void initMap;
      setMarker(initialCoords);
      setVehicle(initialState);
    }
  };

  const getLatestTrackingByVehicleId = async (
    object: IVehicle
  ): Promise<any> => {
    if (object.id !== initialState.id) {
      await GetLatestTrackingByVehicleId(object.id ?? 0).then(
        (data: ITracking | any) => {
          if ('Error' in data) {
            void dispatch(
              handleCustomAlert(ErrorCodes(data.Error, data.Message))
            );
          } else {
            if (data.id !== undefined) {
              if (
                Number(parseFloat(data.latitude)) !== marker.lat &&
                Number(parseFloat(data.longitude)) !== marker.lng
              ) {
                setMarker({
                  lat: Number(parseFloat(data.latitude)),
                  lng: Number(parseFloat(data.longitude))
                });
                setVehicle(object);
                void initMap;
              }
            }
          }
        }
      );
    }
  };

  const initMap = (): void => {
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 4,
        center: initialCoords
      }
    );

    if (
      marker.lat !== initialCoords.lat &&
      marker.lng !== initialCoords.lng &&
      vehicle.id !== initialState.id
    ) {
      // eslint-disable-next-line no-new
      const mk = new window.google.maps.Marker({
        position: marker,
        map,
        title: vehicle.plates ?? 'Vehículo'
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      map.setCenter(mk.getPosition()!);
      map.setZoom(12);
    }
  };

  useEffect(() => {
    window.initMap = initMap;
    document.body.appendChild(script);

    // Creamos un intervalo para llamar a loadMap cada 5 segundos
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(async () => {
      await getLatestTrackingByVehicleId(vehicle);
    }, 5000);

    return () => {
      clearInterval(interval);
      delete window.initMap;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initMap]);

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <CustomButton
              navigate={navigate}
              path="/entity/vehicle"
              type="list"
            />
          }
          id="title"
          title={'Localización de vehículos'}
        />
        <CardContent>
          <CustomComponentToSelect
            type="Vehicle"
            id="VehicleSelect"
            title="Vehiculos"
            sx={{ width: 300 }}
            value={vehicle}
            setObject={loadMap}
            required={true}
          />
          <Box display="flex" flexDirection="column" height="400px">
            <Box flexGrow={1}>
              <div id="map" style={{ height: '100%', width: '100%' }} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CustomMap;
