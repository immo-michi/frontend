import { gql } from '@apollo/client'

export class PropertyFragment {
  id: number
  name: string
  description: string
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
  source: {
    id: string
    link: string
    name: string
  }
}

export const PROPERTY_FRAGMENT = gql`
  fragment Property on Property {
    id
    name
    description
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
    source {
      id
      link
      name: source
    }
  }
`
