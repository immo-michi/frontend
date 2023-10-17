import { Button, Dropdown, InputNumber, Space } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { SearchPropertyFilter } from '../../../graphql/query/search.property.query'
import { EuroFormatter } from '../../format'
import { getNumberOrUndefined } from './number.or.undefined'

interface Props {
  visible: boolean
  setVisible: (next: boolean) => any
  filter: SearchPropertyFilter
  onChange: (next: SearchPropertyFilter) => any
}

export const MapFilterPrice: React.FC<Props> = (props) => {
  const [min, setMin] = useState<number>()
  const [max, setMax] = useState<number>()

  useEffect(() => {
    setMax(props.filter?.price?.max)
    setMin(props.filter?.price?.min)
  }, [props.filter, props.visible])

  const apply = useCallback(() => {
    props.onChange({
      ...props.filter,
      price: {
        ...props.filter.price,
        min,
        max,
      },
    })

    props.setVisible(false)
  }, [min, max, props])

  let additional = ''

  if (props.filter?.price?.min && props.filter?.price?.max) {
    additional = ` zwischen ${EuroFormatter(props.filter?.price?.min)} und ${EuroFormatter(
      props.filter?.price?.max
    )}`
  } else if (props.filter?.price?.min) {
    additional = ` mehr als ${EuroFormatter(props.filter?.price?.min)}`
  } else if (props.filter?.price?.max) {
    additional = ` weniger als ${EuroFormatter(props.filter?.price?.max)}`
  }

  return (
    <Dropdown
      arrow
      visible={props.visible}
      overlay={
        <div style={{ background: '#FFF', padding: 16, borderRadius: 8 }}>
          <Space>
            <InputNumber
              prefix={'€'}
              placeholder={'Min'}
              value={min}
              onChange={(value) => setMin(getNumberOrUndefined(value))}
            />
            -
            <InputNumber
              prefix={'€'}
              placeholder={'Max'}
              value={props.filter?.price?.max}
              onChange={(value) => setMax(getNumberOrUndefined(value, false))}
            />
            <Button onClick={apply}>Anwenden</Button>
          </Space>
        </div>
      }
    >
      <Button onClick={() => props.setVisible(!props.visible)}>Preis{additional}</Button>
    </Dropdown>
  )
}
