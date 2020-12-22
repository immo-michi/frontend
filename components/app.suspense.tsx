import React, { Suspense } from 'react'

const AppSuspense: React.FC = (props) => {
  if (!process.browser) {
    return <>{props.children}</>
  }

  return <Suspense fallback={<div>Please wait</div>}>{props.children}</Suspense>
}

export default AppSuspense
