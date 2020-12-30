const eurFormatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})

const numberFormatter = new Intl.NumberFormat('de-DE', {
  style: 'decimal',
})

export const EuroFormatter = (number) => eurFormatter.format(number)

export const AreaFormatter = (number) => numberFormatter.format(number) + 'm²'
