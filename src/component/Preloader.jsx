import React from 'react'

function Preloader({ label = "Loading GeoCart…" }) {
  return (
   <div className="text-center py-5 muted">
      <span
        className="spinner-border spinner-border-sm text-success me-2"
        role="status"
      />
      {label}
    </div>
  )
}

export default Preloader