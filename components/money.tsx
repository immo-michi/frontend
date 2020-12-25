import React from 'react'

interface Props {
  value?: number
}

export const Money: React.FC<Props> = ({ value }) => {
  if (value === undefined || value === null) {
    return null
  }

  return <>{value.toFixed(2)} €</>
}
