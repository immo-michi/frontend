import { useJsApiLoader } from '@react-google-maps/api'
import { Button } from 'antd'
import { NextPage } from 'next'
import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
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

  const [filter, setFilter] = useState<SearchPropertyFilter>({})
  useSearchPropertyQuery({
    variables: {
      filter,
      pager: {
        limit: 1000,
      },
    },
    onCompleted(data) {
      setItems(data.search.items)
    },
  })
  const [items, setItems] = useState<PropertyFragment[]>([])
  const Map = dynamic(
    () => import('../components/map'),
    { ssr: false } // This line is important. It's what prevents server-side render
  )

  if (!isLoaded) {
    return <div>loading</div>
  }

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          top: 16,
          right: 16,
        }}
      >
        <Button>HOME</Button>
      </div>
      <Map items={items} filter={filter} onFilter={setFilter} />
    </div>
  )
}

export default Index
