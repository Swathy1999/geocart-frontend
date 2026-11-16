import React from 'react'
function Footer() {
  return (
    <>
    <footer className="footer">
      <div className="container d-flex flex-wrap justify-content-between gap-3">
        <div>
          <div className="brand text-white mb-2">GeoCart</div>
          <div className="small">Good finds. Close to home.</div>
        </div>
        <div className="small align-self-end">
          &copy;{new Date().getFullYear()} GeoCart · Supporting neighbourhood
          businesses
        </div>
      </div>
    </footer>
    </>
  )
}
export default Footer
