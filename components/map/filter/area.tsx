import { Button, Dropdown, InputNumber, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { PropertySearchFilterInput } from '../../../../backend/src/model/property/property.search.filter.input'
import { AreaFormatter } from '../../format'

interface Props {
  filter: PropertySearchFilterInput
  onChange: (next: PropertySearchFilterInput) => any
}

export const MapFilterArea: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false)
  const [min, setMin] = useState<number>()
  const [max, setMax] = useState<number>()

  useEffect(() => {
    setMax(props.filter?.area?.max)
    setMin(props.filter?.area?.min)
  }, [props.filter, visible])

  const apply = () => {
    props.onChange({
      ...props.filter,
      area: {
        ...props.filter.area,
        min: Number(min) || undefined,
        max: Number(max) || undefined,
      },
    })

    setVisible(false)
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
              value={max}
              onChange={(value) => setMax(Number(value))}
            />
            <Button onClick={apply}>Anwenden</Button>
          </Space>
        </div>
      }
    >
      <Button onClick={() => setVisible(!visible)}>Fläche{additional}</Button>
    </Dropdown>
  )
}
