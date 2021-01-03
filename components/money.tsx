import React from 'react'
import { EuroFormatter } from './format'

interface Props {
  value?: number
}

export const Money: React.FC<Props> = ({ value }) => {
  if (value === undefined || value === null) {
    return null
  }

  return <>{EuroFormatter(value)}</>
}
