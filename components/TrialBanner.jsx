'use client'

export default function TrialBanner({ daysLeft, trialEndDate }) {
  const expired = daysLeft <= 0

  return (
    <div
      style={{
        background: expired ? '#fee2e2' : '#dbeafe',
        border: expired ? '1px solid #fca5a5' : '1px solid #93c5fd',
        color: expired ? '#991b1b' : '#1e3a8a',
        borderRadius: '18px',
        padding: '16px 18px',
        marginBottom: '20px',
        fontWeight: '700',
      }}
    >
      {expired
        ? 'Your trial has expired. Upgrade required to continue using JobFlow.'
        : `Your free trial is active. ${daysLeft} day(s) left. Trial ends on ${trialEndDate}.`}
    </div>
  )
}
