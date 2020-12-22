import { gql, QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { PROPERTY_FRAGMENT, PropertyFragment } from '../fragment/property.fragment'

const QUERY = gql`
  query search($filter: PropertySearchFilterInput, $pager: PaginationInput) {
    search: searchProperties(filter: $filter, pager: $pager) {
      total
      items {
        ...Property
      }
    }
  }

  ${PROPERTY_FRAGMENT}
`

interface Data {
  search: {
    total: number
    items: PropertyFragment[]
  }
}

interface Variables {
  filter?: {
    area?: {
      min?: number
      max?: number
    }
    price?: {
      min?: number
      max?: number
    }
    query?: string
    region?: { lat: number; lng: number }[]
  }
  pager?: {
    limit?: number
    offset?: number
  }
}

export const useSearchPropertyQuery = (
  options?: QueryHookOptions<Data, Variables>
): QueryResult<Data, Variables> => useQuery<Data, Variables>(QUERY, options)
