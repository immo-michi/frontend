import { GoogleMap, Marker, MarkerClusterer } from '@react-google-maps/api'
import React, { useEffect, useRef, useState } from 'react'
import { PropertyFragment } from '../graphql/fragment/property.fragment'
import { SearchPropertyFilter } from '../graphql/query/search.property.query'
import { useUserLocation } from './use.user.location'

interface Props {
  items: PropertyFragment[]
  filter: SearchPropertyFilter
  onFilter: (filter: SearchPropertyFilter) => any
}

const Map: React.FC<Props> = (props) => {
  const [mapCenter, setMapCenter] = useState({ lat: 48.208174, lng: 16.373819 })
  const userLocation = useUserLocation()
  const map = useRef<google.maps.Map>()

  useEffect(() => {
    if (!userLocation) {
      return
    }

    setMapCenter(userLocation)
  }, [userLocation])

  return (
    <GoogleMap
      onLoad={(ref) => {
        map.current = ref
      }}
      options={{
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        disableDefaultUI: true,
        zoomControl: true,
      }}
      center={mapCenter}
      mapContainerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      zoom={11}
      onBoundsChanged={() => {
        return null
        props.onFilter({
          ...props.filter,
          region: [
            map.current.getBounds().getNorthEast().toJSON(),
            map.current.getBounds().getSouthWest().toJSON(),
          ],
        })
      }}
    >
      <MarkerClusterer>
        {(clusterer) =>
          props.items.map((property) => (
            <Marker
              /* TODO add reference to what RV this marker is */
              key={property.id}
              // icon={'/images/mappin.png'}
              title={property.name}
              clusterer={clusterer}
              position={{
                lat: property.location.lat,
                lng: property.location.lng,
              }}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  )
}

export default Map
