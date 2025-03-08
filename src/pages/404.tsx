import { Layout } from 'antd'
import { NextPage } from 'next'
import React from 'react'

const Custom404: NextPage = () => {
  return (
    <Layout>
      <Layout.Content
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 120px)',
        }}
      >
        <h1 style={{ marginBottom: 10 }}>404</h1>
        <p style={{ marginBottom: 90 }}>Not found</p>
      </Layout.Content>
    </Layout>
  )
}

export default Custom404
