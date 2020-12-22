import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url'
import { Button } from 'antd'
import { NextPage } from 'next'
import getConfig from 'next/config'
import React from 'react'
import { useSearchPropertyQuery } from '../graphql/query/search.property.query'
import { NextConfigType } from '../next.config.type'

const { publicRuntimeConfig } = getConfig() as NextConfigType

const libraries: Libraries = ['places']

const Index: NextPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: publicRuntimeConfig.googleMapsKey,
    libraries,
  })
  const { loading, data } = useSearchPropertyQuery()

  if (loading || !isLoaded) {
    return <div>Loading Data</div>
  }

  return (
    <div>
      meine start seite!! ohne default styles
      <Button>HOME</Button>
      <GoogleMap
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          disableDefaultUI: true,
          zoomControl: true,
        }}
        center={{
          lat: 43,
          lng: 16,
        }}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
          minHeight: 400,
          minWidth: 400,
        }}
        zoom={5}
        /*
    onBoundsChanged={() => {
      setFilter({
        ...filter,
        region: [
          map.current
            .getBounds()
            .getNorthEast()
            .toJSON(),
          map.current
            .getBounds()
            .getSouthWest()
            .toJSON(),
        ],
      })
        }}
      */
      >
        {data.search.items.map((property) => (
          <Marker
            /* TODO add reference to what RV this marker is */
            key={property.id}
            // icon={'/images/mappin.png'}
            label={property.name}
            position={{
              lat: property.location.lat,
              lng: property.location.lng,
            }}
          />
        ))}
      </GoogleMap>
    </div>
  )
}

export default Index
