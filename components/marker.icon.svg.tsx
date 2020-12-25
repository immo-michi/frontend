/*
export const markerIconSvg = (price, rate) => `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="40" viewBox="0, 0, 300, 40">
  <g>
    <path d="M12,0 L160.659,0 C167.286,0 172.659,5.373 172.659,12 L172.659,28 C172.659,34.627 167.286,40 160.659,40 L12,40 C5.373,40 0,34.627 0,28 L0,12 C0,5.373 5.373,0 12,0 z" fill="#FFFFFF"/>
    <path d="M157.499,0 L288,0 C294.627,0 300,5.373 300,12 L300,28 C300,34.627 294.627,40 288,40 L157.499,40 C150.872,40 145.499,34.627 145.499,28 L145.499,12 C145.499,5.373 150.872,0 157.499,0 z" fill="#333333"/>
    <path d="M145.499,0 L181.253,0 L181.253,40 L145.499,40 L145.499,0 z" fill="#333333"/>
    <text transform="matrix(1, 0, 0, 1, 220.257, 20)">
      <tspan x="-12.672" y="8" font-family="HelveticaNeue-Bold" font-size="24" fill="#82D797">${price}</tspan>
    </text>
    <text transform="matrix(1, 0, 0, 1, 73.456, 20)">
      <tspan x="-21.78" y="8" font-family="HelveticaNeue-Bold" font-size="24" fill="#333333">${rate}</tspan>
    </text>
  </g>
</svg>`
*/

export const markerIconSvg = (price: number, area: number) => {
  // return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGhlaWdodD0iMTAwcHgiIHdpZHRoPSIxMDBweCI+CjxnPgoJPHBhdGggZD0iTTI4LjEsMzYuNmM0LjYsMS45LDEyLjIsMS42LDIwLjksMS4xYzguOS0wLjQsMTktMC45LDI4LjksMC45YzYuMywxLjIsMTEuOSwzLjEsMTYuOCw2Yy0xLjUtMTIuMi03LjktMjMuNy0xOC42LTMxLjMgICBjLTQuOS0wLjItOS45LDAuMy0xNC44LDEuNEM0Ny44LDE3LjksMzYuMiwyNS42LDI4LjEsMzYuNnoiLz4KCTxwYXRoIGQ9Ik03MC4zLDkuOEM1Ny41LDMuNCw0Mi44LDMuNiwzMC41LDkuNWMtMyw2LTguNCwxOS42LTUuMywyNC45YzguNi0xMS43LDIwLjktMTkuOCwzNS4yLTIzLjFDNjMuNywxMC41LDY3LDEwLDcwLjMsOS44eiIvPgoJPHBhdGggZD0iTTE2LjUsNTEuM2MwLjYtMS43LDEuMi0zLjQsMi01LjFjLTMuOC0zLjQtNy41LTctMTEtMTAuOGMtMi4xLDYuMS0yLjgsMTIuNS0yLjMsMTguN0M5LjYsNTEuMSwxMy40LDUwLjIsMTYuNSw1MS4zeiIvPgoJPHBhdGggZD0iTTksMzEuNmMzLjUsMy45LDcuMiw3LjYsMTEuMSwxMS4xYzAuOC0xLjYsMS43LTMuMSwyLjYtNC42YzAuMS0wLjIsMC4zLTAuNCwwLjQtMC42Yy0yLjktMy4zLTMuMS05LjItMC42LTE3LjYgICBjMC44LTIuNywxLjgtNS4zLDIuNy03LjRjLTUuMiwzLjQtOS44LDgtMTMuMywxMy43QzEwLjgsMjcuOSw5LjgsMjkuNyw5LDMxLjZ6Ii8+Cgk8cGF0aCBkPSJNMTUuNCw1NC43Yy0yLjYtMS02LjEsMC43LTkuNywzLjRjMS4yLDYuNiwzLjksMTMsOCwxOC41QzEzLDY5LjMsMTMuNSw2MS44LDE1LjQsNTQuN3oiLz4KCTxwYXRoIGQ9Ik0zOS44LDU3LjZDNTQuMyw2Ni43LDcwLDczLDg2LjUsNzYuNGMwLjYtMC44LDEuMS0xLjYsMS43LTIuNWM0LjgtNy43LDctMTYuMyw2LjgtMjQuOGMtMTMuOC05LjMtMzEuMy04LjQtNDUuOC03LjcgICBjLTkuNSwwLjUtMTcuOCwwLjktMjMuMi0xLjdjLTAuMSwwLjEtMC4yLDAuMy0wLjMsMC40Yy0xLDEuNy0yLDMuNC0yLjksNS4xQzI4LjIsNDkuNywzMy44LDUzLjksMzkuOCw1Ny42eiIvPgoJPHBhdGggZD0iTTI2LjIsODguMmMzLjMsMiw2LjcsMy42LDEwLjIsNC43Yy0zLjUtNi4yLTYuMy0xMi42LTguOC0xOC41Yy0zLjEtNy4yLTUuOC0xMy41LTktMTcuMmMtMS45LDgtMiwxNi40LTAuMywyNC43ICAgQzIwLjYsODQuMiwyMy4yLDg2LjMsMjYuMiw4OC4yeiIvPgoJPHBhdGggZD0iTTMwLjksNzNjMi45LDYuOCw2LjEsMTQuNCwxMC41LDIxLjJjMTUuNiwzLDMyLTIuMyw0Mi42LTE0LjZDNjcuNyw3Niw1Mi4yLDY5LjYsMzcuOSw2MC43QzMyLDU3LDI2LjUsNTMsMjEuMyw0OC42ICAgYy0wLjYsMS41LTEuMiwzLTEuNyw0LjZDMjQuMSw1Ny4xLDI3LjMsNjQuNSwzMC45LDczeiIvPgo8L2c+Cjwvc3ZnPg=='

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="40" viewBox="0, 0, 300, 40">
  <g>
    <path d="M12,0 L160.659,0 C167.286,0 172.659,5.373 172.659,12 L172.659,28 C172.659,34.627 167.286,40 160.659,40 L12,40 C5.373,40 0,34.627 0,28 L0,12 C0,5.373 5.373,0 12,0 z" fill="#FFFFFF"/>
    <path d="M157.499,0 L288,0 C294.627,0 300,5.373 300,12 L300,28 C300,34.627 294.627,40 288,40 L157.499,40 C150.872,40 145.499,34.627 145.499,28 L145.499,12 C145.499,5.373 150.872,0 157.499,0 z" fill="#333333"/>
    <path d="M145.499,0 L181.253,0 L181.253,40 L145.499,40 L145.499,0 z" fill="#333333"/>
    
    
    <text x="280" y="28" text-anchor="end">
      <tspan font-family="HelveticaNeue-Bold" font-size="24" fill="#82D797">
        ${Math.floor(price / 1000)}k €
      </tspan>
    </text>
    <text x="135" y="28" text-anchor="end">
      <tspan font-family="HelveticaNeue-Bold" font-size="24" fill="#333333">
        ${area} 
        m<tspan baseline-shift="super" font-size="18">2</tspan>
      </tspan>
    </text>
  </g>
</svg>`

  const buffer = new Buffer(svg)

  return buffer.toString('base64')
}
