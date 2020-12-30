import { Button, Dropdown, InputNumber, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { SearchPropertyFilter } from '../../../graphql/query/search.property.query'
import { EuroFormatter } from '../../format'

interface Props {
  filter: SearchPropertyFilter
  onChange: (next: SearchPropertyFilter) => any
}

export const MapFilterPrice: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false)
  const [min, setMin] = useState<number>()
  const [max, setMax] = useState<number>()

  useEffect(() => {
    setMax(props.filter?.price?.max)
    setMin(props.filter?.price?.min)
  }, [props.filter, visible])

  const apply = () => {
    props.onChange({
      ...props.filter,
      price: {
        ...props.filter.price,
        min: Number(min) || undefined,
        max: Number(max) || undefined,
      },
    })

    setVisible(false)
  }

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
      visible={visible}
      overlay={
        <div style={{ background: '#FFF', padding: 16, borderRadius: 8 }}>
          <Space>
            <InputNumber
              prefix={'€'}
              placeholder={'Min'}
              value={min}
              onChange={(value) => setMin(Number(value))}
            />
            -
            <InputNumber
              prefix={'€'}
              placeholder={'Max'}
              value={props.filter?.price?.max}
              onChange={(value) => setMax(Number(value))}
            />
            <Button onClick={apply}>Anwenden</Button>
          </Space>
        </div>
      }
    >
      <Button onClick={() => setVisible(!visible)}>Preis{additional}</Button>
    </Dropdown>
  )
}
