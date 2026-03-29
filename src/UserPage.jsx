import React from 'react'

export default function UserPage({ user, onLogout }) {
  const initial = (user.username?.[0] || user.email?.[0] || "U").toUpperCase();

  return (
    <div className="card profile-card">
      <div className="logo">
        <div className="logo-mark">A</div>
        <div className="logo-text">AuthKit</div>
      </div>

      <div className="profile-header">
        <div className="avatar">{initial}</div>
        <div>
          <div className="profile-name">{user.username || "User"}</div>
          <div className="profile-email">{user.email}</div>
        </div>
      </div>

      <div className="detail-grid">
        {[
          { key: "Email", val: user.email, icon: "✉" },
          { key: "Username", val: user.username, icon: "@" },
          { key: "Account Status", val: <span className="badge">Active</span>, icon: "●" },
          { key: "Member Since", val: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }), icon: "📅" },
          { key: "Last Login", val: "Just now", icon: "🕐" },
        ].map(({ key, val, icon }) => (
          <div className="detail-row" key={key}>
            <span className="detail-key">{icon} &nbsp;{key}</span>
            <span className="detail-val">{val}</span>
          </div>
        ))}
      </div>

      <div className="btn-row" style={{ marginTop: 28 }}>
        <button className="btn btn-ghost" onClick={onLogout} style={{ flex: "none", width: "100%" }}>
          ← Sign Out
        </button>
      </div>
    </div>
  );
}