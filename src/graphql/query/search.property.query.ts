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

export interface SearchPropertyFilter {
  area?: {
    min?: number
    max?: number
  }
  price?: {
    min?: number
    max?: number
  }
  rental?: boolean
  type?: string[]
  query?: string
  region?: { lat: number; lng: number }[]
}

interface Variables {
  filter?: SearchPropertyFilter
  pager?: {
    limit?: number
    offset?: number
  }
}

export const useSearchPropertyQuery = (
  options?: QueryHookOptions<Data, Variables>
): QueryResult<Data, Variables> => {
  options = options || {}

  options.context = {
    ...(options.context || {}),
    debounceKey: 'property-search',
    debounceTimeout: 300,
  }

  return useQuery<Data, Variables>(QUERY, options)
}
