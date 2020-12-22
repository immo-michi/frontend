import { gql } from '@apollo/client'

export class PropertyFragment {
  id: number
  name: string
  images: string[]
  price: number
  area: number
  tags: string[]
  values: {
    key: string
    value: string
  }[]
  location: {
    lat: number
    lng: number
    address: string
  }
}

export const PROPERTY_FRAGMENT = gql`
  fragment Property on Property {
    id
    name
    images
    price
    area
    tags
    values {
      key
      value
    }
    location: geoLocation {
      lat
      lng
      address
    }
  }
`
