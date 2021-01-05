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

  useEffect(() => {
    setType(props.filter?.type)
  }, [props.filter, props.visible])

  const apply = () => {
    props.onChange({
      ...props.filter,
      type: type && type.length > 0 ? type : undefined,
    })

    props.setVisible(false)
  }

  let additional = ''

  if (props.filter?.type) {
    additional = `: ${props.filter?.type.map((type) => type.toUpperCase()).join(', ')}`

    // <HomeOutlined />
  }

  return (
    <Dropdown
      arrow
      visible={props.visible}
      overlay={
        <div style={{ background: '#FFF', padding: 16, borderRadius: 8 }}>
          <Checkbox.Group value={type} onChange={(value) => setType(value as string[])}>
            <Space>
              <Checkbox value={'grund'}>Grundstück</Checkbox>
              <Checkbox value={'haus'}>Haus</Checkbox>
              <Checkbox value={'wohnung'}>Wohnung</Checkbox>
              <Button onClick={apply}>Anwenden</Button>
            </Space>
          </Checkbox.Group>
        </div>
      }
    >
      <Button onClick={() => props.setVisible(!props.visible)}>Typ{additional}</Button>
    </Dropdown>
  )
}
