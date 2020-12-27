import { GoogleMap, Marker, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api'
import { Button } from 'antd'
import { NextPage } from 'next'
import getConfig from 'next/config'
import React, { useEffect, useRef, useState } from 'react'
import { markerIconSvg } from '../components/marker.icon.svg'
import { PropertyCard } from '../components/property.card'
import { useUserLocation } from '../components/use.user.location'
import { PropertyFragment } from '../graphql/fragment/property.fragment'
import {
  SearchPropertyFilter,
  useSearchPropertyQuery,
} from '../graphql/query/search.property.query'
import { NextConfigType } from '../next.config.type'

const { publicRuntimeConfig } = getConfig() as NextConfigType
const Index: NextPage = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: publicRuntimeConfig.googleMapsKey,
    // ...otherOptions
  })

  const [selected, setSelected] = useState<PropertyFragment>()
  const [items, setItems] = useState<PropertyFragment[]>([])
  const [filter, setFilter] = useState<SearchPropertyFilter>({})
  const userLocation = useUserLocation()
  const map = useRef<google.maps.Map>()

  useSearchPropertyQuery({
    variables: {
      filter,
      pager: {
        limit: 1000,
      },
    },
    onCompleted(data) {
      const l = data.search.items.length
      const pl = Math.ceil(Math.sqrt(l))
      console.log('l', l)
      console.log('pl', pl)
      setItems(
        data.search.items.map((item, i) => ({
          ...item,
          location: {
            ...item.location,
            lat: item.location.lat + (0.0005 / pl) * (i % pl),
            lng: item.location.lng + (0.0005 / pl) * Math.floor(i / pl),
          },
        }))
      )
    },
  })

  useEffect(() => {
    if (
      map.current &&
      map.current.getCenter().lat() === 48.208174 &&
      map.current.getCenter().lng() === 16.373819
    ) {
      map.current.setCenter(userLocation)
    }
  }, [userLocation, map])

  if (!isLoaded) {
    return <div>loading</div>
  }

  return (
    <div style={{ height: '100%' }}>
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 16,
          right: 16,
        }}
      >
        <Button onClick={() => map.current.setCenter(userLocation)}>HOME</Button>
      </div>

      {selected && (
        <PropertyCard
          style={{
            position: 'absolute',
            zIndex: 10,
            bottom: 16,
            right: 60,
            left: 16,
          }}
          property={selected}
          onClose={() => setSelected(null)}
        />
      )}

      <GoogleMap
        onLoad={(ref) => {
          map.current = ref

          if (ref) {
            ref.setCenter({ lat: 48.208174, lng: 16.373819 })
          }
        }}
        onClick={() => setSelected(null)}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          disableDefaultUI: true,
          zoomControl: true,
        }}
        mapContainerStyle={{
          height: '100%',
          width: '100vw',
        }}
        zoom={11}
        onBoundsChanged={() => {
          if (!map.current) {
            return
          }
          const region = [
            map.current.getBounds().getNorthEast().toJSON(),
            map.current.getBounds().getSouthWest().toJSON(),
          ]

          if (filter && JSON.stringify(region) === JSON.stringify(filter.region)) {
            return
          }

          setFilter({
            ...filter,
            region,
          })
        }}
      >
        {/*
        {items.map((property) => (
          <Marker
            key={property.id}
            // icon={'/images/mappin.png'}
            title={property.name}
            position={{
              lat: property.location.lat,
              lng: property.location.lng,
            }}
          />
        ))}
        */}
        <MarkerClusterer>
          {(clusterer) =>
            items.map((property) => (
              <Marker
                key={property.id}
                // icon={'/images/mappin.png'}
                icon={{
                  url: `data:image/svg+xml;base64,${markerIconSvg(property.price, property.area)}`,
                  scaledSize: new google.maps.Size(70, 60),
                  anchor: new google.maps.Point(35, 60),
                }}
                title={property.name}
                clusterer={clusterer}
                onClick={() => setSelected(property)}
                position={{
                  lat: property.location.lat,
                  lng: property.location.lng,
                }}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </div>
  )
}

export default Index
