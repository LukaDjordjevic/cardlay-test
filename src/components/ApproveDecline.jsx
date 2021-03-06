import React from 'react'
import PropTypes from 'prop-types'

function ApproveDecline({ approved, id, updateRecord }) {
  const approveText = approved === true ? 'Approved' : 'Approve'
  const declineText = approved === false ? 'Declined' : 'Decline'
  const approveBgdColor = approved === true ? '#6ADDB4' : '#F3F4F4'
  const declineBgdColor = approved === false ? '#D7525C' : '#F3F4F4'
  const approveColor = approved === true ? 'white' : 'black'
  const declineColor = approved === false ? 'white' : 'black'
  const approveCursor = approved === true ? 'default' : 'pointer'
  const declineCursor = approved === false ? 'default' : 'pointer'
  return (
    <div className="ApproveDecline">
      <button
        type="button"
        className="round-button"
        onClick={() => updateRecord('approved', true, id)}
        style={{
          backgroundColor: approveBgdColor,
          color: approveColor,
          cursor: approveCursor,
          padding: '0 7px',
        }}
      >
        {approveText}
      </button>
      <button
        type="button"
        className="round-button"
        onClick={() => updateRecord('approved', false, id)}
        style={{
          backgroundColor: declineBgdColor,
          color: declineColor,
          cursor: declineCursor,
          padding: '0 7px',
        }}
      >
        {declineText}
      </button>
    </div>
  )
}

ApproveDecline.defaultProps = {
  approved: null,
}

ApproveDecline.propTypes = {
  id: PropTypes.string.isRequired,
  approved: PropTypes.bool,
  updateRecord: PropTypes.func.isRequired,
}

export default ApproveDecline
