import { Button, Checkbox, Dropdown, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { SearchPropertyFilter } from '../../../graphql/query/search.property.query'

interface Props {
  visible: boolean
  setVisible: (next: boolean) => any
  filter: SearchPropertyFilter
  onChange: (next: SearchPropertyFilter) => any
}

export const MapFilterType: React.FC<Props> = (props) => {
  const [type, setType] = useState<string[]>()
  const [rental, setRental] = useState(false)

  useEffect(() => {
    setType(props.filter?.type)
  }, [props.filter, props.visible])

  const apply = () => {
    props.onChange({
      ...props.filter,
      type: type && type.length > 0 ? type : undefined,
      rental,
    })

    props.setVisible(false)
  }

  let additional = ''

  if (props.filter?.type) {
    additional = `: ${props.filter?.type.map((type) => type.toUpperCase()).join(', ')}`

    if (props.filter.rental) {
      additional+= ' (Miete)'
    } else {
      additional+= ' (Kauf)'
    }
    // <HomeOutlined />
  } else {
    if (props.filter.rental) {
      additional = ': Miete'
    } else {
      additional = ': Kauf'
    }
  }

  return (
    <Dropdown
      arrow
      open={props.visible}
      overlay={
        <Space style={{ background: '#FFF', padding: 16, borderRadius: 8 }}>
          <Checkbox.Group value={type} onChange={(value) => setType(value as string[])}>
            <Space>
              <Checkbox value={'grund'}>Grundstück</Checkbox>
              <Checkbox value={'haus'}>Haus</Checkbox>
              <Checkbox value={'wohnung'}>Wohnung</Checkbox>
            </Space>
          </Checkbox.Group>
          <Checkbox checked={rental} onChange={e => setRental(e.target.checked)}>Miete</Checkbox>
          <Button onClick={apply}>Anwenden</Button>
        </Space>
      }
    >
      <Button onClick={() => props.setVisible(!props.visible)}>Typ{additional}</Button>
    </Dropdown>
  )
}
