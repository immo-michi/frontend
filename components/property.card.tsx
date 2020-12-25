import { CloseOutlined, ExportOutlined, StarOutlined } from '@ant-design/icons'
import { Card, Descriptions, Image, message, Space, Tag, Tooltip } from 'antd'
import React, { CSSProperties } from 'react'
import { PropertyFragment } from '../graphql/fragment/property.fragment'
import { Money } from './money'

interface Props {
  style?: CSSProperties
  property: PropertyFragment
  onClose: () => any
}

export const PropertyCard: React.FC<Props> = ({ property, style, onClose }) => {
  const addToList = () => {
    void message.error('Listen sind in Arbeit!')
  }

  return (
    <Card
      style={style}
      title={property.name}
      extra={<CloseOutlined onClick={() => onClose()} />}
      actions={[
        <StarOutlined key="setting" onClick={() => addToList()} />,
        <Tooltip key="external" title={'Quelle in neuem Fenster öffnen'}>
          <a target={'_blank'} rel={'noreferrer'} href={property.source.link}>
            <ExportOutlined />
          </a>
        </Tooltip>,
      ]}
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label={'Preis'}>
          <Money value={property.price} />
        </Descriptions.Item>
        <Descriptions.Item label={'Fläche'}>
          {property.area}m<sup>2</sup>
        </Descriptions.Item>
        <Descriptions.Item label={'Tags'}>
          {property.tags.map((tag) => (
            <Tag>{tag}</Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label={'Adresse'}>{property.location.address}</Descriptions.Item>
        {property.description && (
          <Descriptions.Item span={2} label={'Beschreibung'}>
            {property.description}
          </Descriptions.Item>
        )}
        <Descriptions.Item label={'Bilder'} span={2}>
          <Image.PreviewGroup>
            <Space>
              {property.images.map((src, index) => (
                <Image width={100} key={index} src={src} />
              ))}
            </Space>
          </Image.PreviewGroup>
        </Descriptions.Item>
        <Descriptions.Item label={'Quelle'}>
          <Tooltip title={`Externe ID: ${property.source.id}`}>{property.source.name}</Tooltip>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}
