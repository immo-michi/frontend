import { MenuOutlined } from '@ant-design/icons'
import { GoogleMap, Marker, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api'
import { Alert, Button, Dropdown, Menu, Space } from 'antd'
import { NextPage } from 'next'
import getConfig from 'next/config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { connect } from 'react-redux'
import { MapFilterArea } from '../components/map/filter/area'
import { MapFilterPrice } from '../components/map/filter/price'
import { MapFilterType } from '../components/map/filter/type'
import { markerIconSvg } from '../components/marker.icon.svg'
import { PropertyCard } from '../components/property.card'
import { useUserLocation } from '../components/use.user.location'
import { PropertyFragment } from '../graphql/fragment/property.fragment'
import { useLoginFacebookMutation } from '../graphql/mutation/login.facebook.mutation'
import {
  SearchPropertyFilter,
  useSearchPropertyQuery,
} from '../graphql/query/search.property.query'
import { NextConfigType } from '../next.config.type'
import { State } from '../store'
import { setToken, setTokenType } from '../store/auth'

const { publicRuntimeConfig } = getConfig() as NextConfigType

interface DispatchProps {
  setToken: setTokenType
}

interface StateProps {
  authenticated: boolean
}

type Props = StateProps & DispatchProps

const Index: NextPage<Props> = (props) => {
  const [dropdown, setDropdown] = useState<string>()
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: publicRuntimeConfig.googleMapsKey,
    // ...otherOptions
  })

  const [initial, setInitial] = useState(true)
  const router = useRouter()
  const [selected, setSelected] = useState<PropertyFragment>()
  const [items, setItems] = useState<PropertyFragment[]>([])
  const [filter, setFilter] = useState<SearchPropertyFilter>({})
  const [total, setTotal] = useState<number>()
  const [facebookLoginMutation] = useLoginFacebookMutation()

  useEffect(() => {
    if (!initial) {
      return
    }

    const parse = (input) => {
      if (isNaN(input)) return undefined

      return parseInt(input, 10)
    }

    console.log('updated query', router.query)
    setFilter({
      price: {
        min: parse(router.query['price[min]'] as string),
        max: parse(router.query['price[max]'] as string),
      },
      area: {
        min: parse(router.query['area[min]'] as string),
        max: parse(router.query['area[max]'] as string),
      },
      type: router.query.type ? (router.query.type as string).split(',') : undefined,
    })
  }, [router.query])

  useEffect(() => {
    const query = {}

    if (filter.price?.min) {
      query['price[min]'] = filter.price?.min
    }

    if (filter.price?.max) {
      query['price[max]'] = filter.price?.max
    }

    if (filter.area?.min) {
      query['area[min]'] = filter.area?.min
    }

    if (filter.area?.max) {
      query['area[max]'] = filter.area?.max
    }

    if (filter.type) {
      console.log("filter.type.join(',')", filter.type, filter.type.join(','))

      query['type'] = filter.type.join(',')
    }

    if (Object.keys(query).length === 0) {
      return
    }

    console.log('query', query)

    void router.replace(
      {
        pathname: '/',
        query,
      },
      undefined,
      { shallow: false }
    )
  }, [
    filter.price?.min || 0,
    filter.price?.max || 0,
    filter.area?.min || 0,
    filter.area?.max || 0,
    filter.type ? filter.type.join(',') : '',
  ])

  const userLocation = useUserLocation()
  const map = useRef<google.maps.Map>()

  useSearchPropertyQuery({
    variables: {
      filter,
      pager: {
        limit: 100,
      },
    },
    skip: !filter.region || filter.region.length === 0,
    onCompleted(data) {
      const l = data.search.items.length
      const pl = Math.ceil(Math.sqrt(l))

      setTotal(data.search.total)
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
      setInitial(false)
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

  return (
    <div style={{ height: '100%' }}>
      {(initial || !isLoaded) && (
        <div
          style={{
            position: 'absolute',
            zIndex: 12,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            src={'/favicon.png'}
            alt={'Immo Michi'}
            style={{
              width: 256,
              maxWidth: '90%',
            }}
          />

          <div
            style={{
              padding: 32,
              fontSize: 20,
            }}
          >
            Lade Karte und Immobilien
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            IMMO Michi
          </div>
        </div>
      )}
      <Space
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 16,
          right: 16,
        }}
      >
        <MapFilterArea
          filter={filter}
          onChange={setFilter}
          visible={dropdown === 'area'}
          setVisible={(show) => setDropdown(show ? 'area' : undefined)}
        />

        <MapFilterPrice
          filter={filter}
          onChange={setFilter}
          visible={dropdown === 'price'}
          setVisible={(show) => setDropdown(show ? 'price' : undefined)}
        />

        <MapFilterType
          filter={filter}
          onChange={setFilter}
          visible={dropdown === 'type'}
          setVisible={(show) => setDropdown(show ? 'type' : undefined)}
        />

        <Dropdown
          visible={dropdown === 'user'}
          overlay={
            <Menu>
              <Menu.Item onClick={() => map.current.setCenter(userLocation)}>GPS Home</Menu.Item>
              {props.authenticated && [
                <Menu.Divider key={'spacer'} />,
                <Menu.Item key={'profile'}>
                  <Link href={'/profile'}>
                    <a>Profil</a>
                  </Link>
                </Menu.Item>,
                <Menu.Item key={'lists'}>Meine Listen</Menu.Item>,
                <Menu.Item key={'notifications'}>Benachrichtigungen</Menu.Item>,
              ]}
              <Menu.Divider />
              {props.authenticated ? (
                <Menu.Item>
                  <Link href={'/logout'}>
                    <a>Logout</a>
                  </Link>
                </Menu.Item>
              ) : (
                <Menu.Item>
                  <FacebookLogin
                    appId={publicRuntimeConfig.facebookAppId}
                    callback={async (response) => {
                      const result = await facebookLoginMutation({
                        variables: {
                          token: response.accessToken,
                        },
                      })

                      props.setToken(result.data.token)
                    }}
                    render={(renderProps) => <a onClick={renderProps.onClick}>Login</a>}
                  />
                </Menu.Item>
              )}
            </Menu>
          }
          placement="bottomRight"
          arrow
        >
          <Button onClick={() => setDropdown(dropdown !== 'user' ? 'user' : undefined)}>
            <MenuOutlined />
          </Button>
        </Dropdown>
      </Space>

      {total > items.length && (
        <Alert
          style={{
            position: 'absolute',
            zIndex: 9,
            bottom: 32,
            left: 32,
            right: 76,
          }}
          message={`Es werden nur ${items.length} von ${total} Immobilien angezeigt, Zomme doch ein bisschen rein!`}
        />
      )}

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

      {isLoaded && (
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
            if (!map.current || !map.current.getBounds()) {
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
                    url: `data:image/svg+xml;base64,${markerIconSvg(
                      property.price,
                      property.area
                    )}`,
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
      )}
    </div>
  )
}

export default connect<StateProps, DispatchProps, unknown, State>(
  ({ auth }) => ({
    authenticated: auth.authenticated,
  }),
  {
    setToken,
  }
)(Index)
