import { CloseOutlined, ExportOutlined, StarOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Carousel,
  Col,
  Descriptions,
  Image,
  message,
  Row,
  Space,
  Tag,
  Tooltip,
} from 'antd'
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
    <div
      style={{
        ...style,
        background: '#FFF',
      }}
    >
      <Row>
        <Col>
          <Image.PreviewGroup>
            <Carousel autoplay>
              {property.images.map((src, index) => (
                <div key={index}>
                  <Image width={200} src={src} />
                </div>
              ))}
            </Carousel>
          </Image.PreviewGroup>
        </Col>
        <Col flex={'1'} style={{ padding: 16 }}>
          <Space direction={'vertical'} style={{ width: '100%', paddingRight: 24 }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  flex: '1',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {property.name}
              </div>
              <Tooltip key="external" title={'Quelle in neuem Fenster öffnen'}>
                <Button
                  size={'small'}
                  target={'_blank'}
                  rel={'noreferrer'}
                  href={property.source.link}
                >
                  auf {property.source.name} öffnen
                </Button>
              </Tooltip>
            </div>
            <div>
              Preis: <Money value={property.price} />, Fläche: {property.area}m<sup>2</sup>
            </div>
            <div>
              {property.tags.map((tag) => (
                <Tag>{tag}</Tag>
              ))}
            </div>
          </Space>
        </Col>
      </Row>
      <CloseOutlined
        onClick={() => onClose()}
        style={{ position: 'absolute', right: 16, top: 16 }}
      />
    </div>
  )

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
