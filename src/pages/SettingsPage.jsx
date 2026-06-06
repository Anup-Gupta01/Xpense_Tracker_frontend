import { useState } from 'react'
import {
  User, Settings2, Bell, Shield, Trash2,
  Eye, EyeOff, Check, AlertTriangle, Save,
  ChevronDown, Moon, Sun,
} from 'lucide-react'
import PageShell from '../components/Dashboard/PageShell/PageShell'
import './SettingsPage.css'

// ── Toggle switch component ────────────────────────────────────────────────────
function Toggle({ id, checked, onChange, label }) {
  return (
    <label className="stg-toggle" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        onChange={onChange}
        aria-label={label}
      />
      <span className="stg-toggle-track" aria-hidden="true">
        <span className="stg-toggle-thumb" />
      </span>
    </label>
  )
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({ icon: Icon, title, subtitle, color, children }) {
  return (
    <div className="stg-section card">
      <div className="stg-section-header">
        <div className={`stg-section-icon stg-icon-${color}`}>
          <Icon size={18} />
        </div>
        <div>
          <h2 className="stg-section-title">{title}</h2>
          <p className="stg-section-sub">{subtitle}</p>
        </div>
      </div>
      <div className="stg-section-body">{children}</div>
    </div>
  )
}

// ── Row in a settings section ─────────────────────────────────────────────────
function SettingRow({ label, description, children }) {
  return (
    <div className="stg-row">
      <div className="stg-row-label">
        <div className="stg-row-name">{label}</div>
        {description && <div className="stg-row-desc">{description}</div>}
      </div>
      <div className="stg-row-control">{children}</div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function SettingsPage() {
  // Profile
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName:  'Doe',
    email:     'john@example.com',
    phone:     '+1 (555) 123-4567',
  })
  const [profileSaved, setProfileSaved] = useState(false)

  function saveProfile() {
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  // Preferences
  const [theme, setTheme]         = useState('light')
  const [currency, setCurrency]   = useState('USD - US Dollar')
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY')
  const [language, setLanguage]   = useState('English (US)')

  // Notifications
  const [notifs, setNotifs] = useState({
    email:         true,
    push:          true,
    budgetAlerts:  true,
    weeklyReport:  false,
    transactionUpdates: true,
  })

  function toggleNotif(key) {
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  // Security
  const [pwForm, setPwForm]       = useState({ current: '', newPw: '', confirm: '' })
  const [showPw, setShowPw]       = useState({ current: false, newPw: false, confirm: false })
  const [pwErrors, setPwErrors]   = useState({})
  const [pwSuccess, setPwSuccess] = useState(false)
  const [twoFA, setTwoFA]         = useState(false)

  function toggleShow(field) {
    setShowPw(prev => ({ ...prev, [field]: !prev[field] }))
  }

  function validatePw() {
    const e = {}
    if (!pwForm.current)          e.current = 'Enter your current password'
    if (pwForm.newPw.length < 8)  e.newPw   = 'Password must be at least 8 characters'
    if (pwForm.newPw !== pwForm.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  function handlePwUpdate() {
    const e = validatePw()
    if (Object.keys(e).length) { setPwErrors(e); return }
    setPwErrors({})
    setPwSuccess(true)
    setPwForm({ current: '', newPw: '', confirm: '' })
    setTimeout(() => setPwSuccess(false), 3000)
  }

  // Delete account confirm
  const [showDelete, setShowDelete] = useState(false)

  const CURRENCIES = [
    'USD - US Dollar', 'EUR - Euro', 'GBP - British Pound',
    'JPY - Japanese Yen', 'CAD - Canadian Dollar', 'AUD - Australian Dollar', 'INR - Indian Rupee',
  ]

  const DATE_FORMATS  = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']
  const LANGUAGES     = ['English (US)', 'English (UK)', 'Spanish', 'French', 'German', 'Japanese']

  return (
    <PageShell
      title="Settings"
      subtitle="Manage your account and preferences"
    >
      {/* ── Profile Settings ── */}
      <Section icon={User} title="Profile Settings" subtitle="Update your personal information" color="teal">
        <div className="stg-form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="stg-first-name">First Name</label>
            <input
              id="stg-first-name"
              className="form-input"
              value={profile.firstName}
              onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))}
              placeholder="John"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="stg-last-name">Last Name</label>
            <input
              id="stg-last-name"
              className="form-input"
              value={profile.lastName}
              onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))}
              placeholder="Doe"
            />
          </div>
          <div className="form-group stg-full">
            <label className="form-label" htmlFor="stg-email">Email Address</label>
            <input
              id="stg-email"
              type="email"
              className="form-input"
              value={profile.email}
              onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group stg-full">
            <label className="form-label" htmlFor="stg-phone">Phone Number</label>
            <input
              id="stg-phone"
              type="tel"
              className="form-input"
              value={profile.phone}
              onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
        <div className="stg-form-actions">
          <button className="btn btn-teal" onClick={saveProfile} id="profile-save-btn">
            {profileSaved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
          </button>
        </div>
      </Section>

      {/* ── Preferences ── */}
      <Section icon={Settings2} title="Preferences" subtitle="Customize your experience" color="indigo">
        {/* Theme */}
        <SettingRow label="Theme" description="Choose your display theme">
          <div className="stg-theme-btns">
            <button
              id="theme-light-btn"
              className={`stg-theme-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
            >
              <Sun size={14} /> Light
            </button>
            <button
              id="theme-dark-btn"
              className={`stg-theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
            >
              <Moon size={14} /> Dark
            </button>
          </div>
        </SettingRow>

        <div className="stg-divider" />

        {/* Currency */}
        <SettingRow label="Currency" description="Set your preferred currency for display">
          <div className="form-select-wrap stg-select-wrap">
            <select
              id="stg-currency"
              className="form-input form-select"
              value={currency}
              onChange={e => setCurrency(e.target.value)}
            >
              {CURRENCIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={14} className="form-select-icon" />
          </div>
        </SettingRow>

        <div className="stg-divider" />

        {/* Date format */}
        <SettingRow label="Date Format" description="Choose how dates are displayed">
          <div className="form-select-wrap stg-select-wrap">
            <select
              id="stg-date-format"
              className="form-input form-select"
              value={dateFormat}
              onChange={e => setDateFormat(e.target.value)}
            >
              {DATE_FORMATS.map(d => <option key={d}>{d}</option>)}
            </select>
            <ChevronDown size={14} className="form-select-icon" />
          </div>
        </SettingRow>

        <div className="stg-divider" />

        {/* Language */}
        <SettingRow label="Language" description="Select your preferred language">
          <div className="form-select-wrap stg-select-wrap">
            <select
              id="stg-language"
              className="form-input form-select"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              {LANGUAGES.map(l => <option key={l}>{l}</option>)}
            </select>
            <ChevronDown size={14} className="form-select-icon" />
          </div>
        </SettingRow>
      </Section>

      {/* ── Notifications ── */}
      <Section icon={Bell} title="Notifications" subtitle="Manage how you receive alerts" color="warning">
        <SettingRow label="Email Notifications" description="Receive updates via email">
          <Toggle
            id="notif-email"
            checked={notifs.email}
            onChange={() => toggleNotif('email')}
            label="Email Notifications"
          />
        </SettingRow>

        <div className="stg-divider" />

        <SettingRow label="Push Notifications" description="Get notified on your devices">
          <Toggle
            id="notif-push"
            checked={notifs.push}
            onChange={() => toggleNotif('push')}
            label="Push Notifications"
          />
        </SettingRow>

        <div className="stg-divider" />

        <SettingRow label="Budget Alerts" description="Send alerts when approaching budget limits">
          <Toggle
            id="notif-budget"
            checked={notifs.budgetAlerts}
            onChange={() => toggleNotif('budgetAlerts')}
            label="Budget Alerts"
          />
        </SettingRow>

        <div className="stg-divider" />

        <SettingRow label="Weekly Report" description="Receive a weekly spending summary">
          <Toggle
            id="notif-weekly"
            checked={notifs.weeklyReport}
            onChange={() => toggleNotif('weeklyReport')}
            label="Weekly Report"
          />
        </SettingRow>

        <div className="stg-divider" />

        <SettingRow label="Transaction Updates" description="Get notified for new transactions">
          <Toggle
            id="notif-transactions"
            checked={notifs.transactionUpdates}
            onChange={() => toggleNotif('transactionUpdates')}
            label="Transaction Updates"
          />
        </SettingRow>
      </Section>

      {/* ── Security ── */}
      <Section icon={Shield} title="Security" subtitle="Manage your account security" color="red">
        {/* Password fields */}
        <div className="stg-form-grid stg-form-grid-1col">
          {[
            { key: 'current', label: 'Current Password', placeholder: 'Enter current password' },
            { key: 'newPw',   label: 'New Password',     placeholder: 'Enter new password (min. 8 chars)' },
            { key: 'confirm', label: 'Confirm New Password', placeholder: 'Confirm new password' },
          ].map(({ key, label, placeholder }) => (
            <div className="form-group" key={key}>
              <label className="form-label" htmlFor={`stg-pw-${key}`}>{label}</label>
              <div className="form-input-wrapper">
                <input
                  id={`stg-pw-${key}`}
                  type={showPw[key] ? 'text' : 'password'}
                  className={`form-input form-input-with-icon-right${pwErrors[key] ? ' error' : ''}`}
                  placeholder={placeholder}
                  value={pwForm[key]}
                  onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                />
                <button
                  type="button"
                  className="form-input-icon-right"
                  onClick={() => toggleShow(key)}
                  aria-label={showPw[key] ? 'Hide password' : 'Show password'}
                >
                  {showPw[key] ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {pwErrors[key] && <span className="form-error">{pwErrors[key]}</span>}
            </div>
          ))}
        </div>

        {pwSuccess && (
          <div className="stg-pw-success">
            <Check size={14} />
            Password updated successfully!
          </div>
        )}

        <div className="stg-form-actions">
          <button className="btn btn-primary" onClick={handlePwUpdate} id="update-password-btn">
            <Shield size={14} />
            Update Password
          </button>
        </div>

        <div className="stg-divider stg-divider-space" />

        {/* Two-Factor Auth */}
        <SettingRow
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
        >
          <button
            id="enable-2fa-btn"
            className={`btn btn-sm ${twoFA ? 'btn-teal' : 'btn-outline'}`}
            onClick={() => setTwoFA(p => !p)}
          >
            {twoFA ? <><Check size={13} /> Enabled</> : 'Enable'}
          </button>
        </SettingRow>
      </Section>

      {/* ── Danger Zone ── */}
      <div className="stg-danger-zone card" id="danger-zone">
        <div className="stg-section-header">
          <div className="stg-section-icon stg-icon-red">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h2 className="stg-section-title stg-title-danger">Danger Zone</h2>
            <p className="stg-section-sub">Irreversible actions</p>
          </div>
        </div>
        <div className="stg-section-body">
          <SettingRow
            label="Delete Account"
            description="Permanently delete your account and all data"
          >
            <button
              className="btn btn-sm btn-danger"
              onClick={() => setShowDelete(true)}
              id="delete-account-btn"
            >
              <Trash2 size={13} />
              Delete Account
            </button>
          </SettingRow>
        </div>
      </div>

      {/* ── Delete Account Confirm Modal ── */}
      {showDelete && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Confirm account deletion">
          <div className="modal-box modal-sm" id="delete-account-modal">
            <div className="modal-header">
              <h2 className="modal-title">Delete Account</h2>
              <button className="modal-close" onClick={() => setShowDelete(false)} id="delete-account-close">
                <span style={{ fontSize: 18, lineHeight: 1 }}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-confirm-text">
                This action is <strong>permanent</strong> and cannot be undone. All your data, including
                expenses, budgets, and reports, will be permanently deleted.
              </p>
              <p className="modal-confirm-text" style={{ marginTop: 8, color: 'var(--error)' }}>
                Are you absolutely sure?
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowDelete(false)} id="delete-account-cancel">Cancel</button>
              <button className="btn btn-danger" id="delete-account-confirm">
                <Trash2 size={14} />
                Yes, Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
