import { Button, Dropdown, InputNumber, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { SearchPropertyFilter } from '../../../graphql/query/search.property.query'
import { AreaFormatter } from '../../format'

interface Props {
  visible: boolean
  setVisible: (next: boolean) => any
  filter: SearchPropertyFilter
  onChange: (next: SearchPropertyFilter) => any
}

export const MapFilterArea: React.FC<Props> = (props) => {
  const [min, setMin] = useState<number>()
  const [max, setMax] = useState<number>()

  useEffect(() => {
    setMax(props.filter?.area?.max)
    setMin(props.filter?.area?.min)
  }, [props.filter, props.visible])

  const apply = () => {
    props.onChange({
      ...props.filter,
      area: {
        ...props.filter.area,
        min: Number(min) || undefined,
        max: Number(max) || undefined,
      },
    })

    props.setVisible(false)
  }

  let additional = ''

  if (props.filter?.area?.min && props.filter?.area?.max) {
    additional = ` zwischen ${AreaFormatter(props.filter?.area?.min)} und ${AreaFormatter(
      props.filter?.area?.max
    )}`
  } else if (props.filter?.area?.min) {
    additional = ` mehr als ${AreaFormatter(props.filter?.area?.min)}`
  } else if (props.filter?.area?.max) {
    additional = ` weniger als ${AreaFormatter(props.filter?.area?.max)}`
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
              onChange={(value) => setMin(Number(value))}
            />
            -
            <InputNumber
              prefix={'€'}
              placeholder={'Max'}
              value={max}
              onChange={(value) => setMax(Number(value))}
            />
            <Button onClick={apply}>Anwenden</Button>
          </Space>
        </div>
      }
    >
      <Button onClick={() => props.setVisible(!props.visible)}>Fläche{additional}</Button>
    </Dropdown>
  )
}
