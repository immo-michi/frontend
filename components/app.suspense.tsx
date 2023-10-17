import React, { ReactNode, Suspense } from 'react'

interface Props {
  children: ReactNode
}

const AppSuspense: React.FC<Props> = (props) => {
  /*
  if (!process.browser) {
    return <>{props.children}</>
  }
  */

  return (
    <Suspense
      fallback={<div>Please wait</div>}
    >
      {props.children}
    </Suspense>
  )
}

export default AppSuspense
