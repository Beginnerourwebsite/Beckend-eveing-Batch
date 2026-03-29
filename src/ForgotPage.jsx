import React from 'react'

export default function ForgotPage({ onBack }) {
  const [step, setStep] = useState(0); // 0=email, 1=otp, 2=new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [pass, setPass] = useState({ newPass: "", confirm: "" });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = (msg, icon) => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 3000);
  };

  const sendOtp = async () => {
    setLoading(true);
    await api.forgotPassword({ email });
    setLoading(false);
    showToast("OTP sent to " + email, "📧");
    setStep(1);
  };

  const verifyOtp = () => {
    const code = otp.join("");
    if (code.length < 4) return;
    showToast("OTP verified!", "✓");
    setStep(2);
  };

  const resetPassword = () => {
    if (pass.newPass !== pass.confirm) { showToast("Passwords don't match", "⚠"); return; }
    showToast("Password reset! Redirecting…", "✓");
    setTimeout(onBack, 2000);
  };

  const otpChange = (i, val) => {
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
  };

  return (
    <>
      {toast && <Toast {...toast} />}
      <div className="card">
        <div className="logo">
          <div className="logo-mark">A</div>
          <div className="logo-text">AuthKit</div>
        </div>

        <div className="step-dots">
          {[0, 1, 2].map((s) => (
            <div key={s} className={`dot ${step >= s ? "active" : ""}`} />
          ))}
        </div>

        {step === 0 && (
          <>
            <h1>Reset Password</h1>
            <p className="subtitle">We'll send an OTP to your email</p>
            <div className="field">
              <label>Email Address</label>
              <div className="input-wrap">
                <span className="input-icon">✉</span>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-ghost" onClick={onBack}>← Back</button>
              <button className="btn btn-primary" onClick={sendOtp} disabled={loading}>
                {loading ? "Sending…" : "Send OTP"}
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1>Enter OTP</h1>
            <p className="subtitle">Sent to {email}</p>
            <div className="field">
              <label>4-digit code</label>
              <div className="otp-row">
                {otp.map((v, i) => (
                  <input
                    key={i} id={`otp-${i}`}
                    type="text" inputMode="numeric" maxLength={1}
                    value={v} onChange={(e) => otpChange(i, e.target.value)}
                  />
                ))}
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
              <button className="btn btn-primary" onClick={verifyOtp}>Verify →</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1>New Password</h1>
            <p className="subtitle">Create a strong password</p>
            <div className="field">
              <label>New Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔑</span>
                <input type="password" placeholder="••••••••" value={pass.newPass}
                  onChange={(e) => setPass((p) => ({ ...p, newPass: e.target.value }))} />
              </div>
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input type="password" placeholder="••••••••" value={pass.confirm}
                  onChange={(e) => setPass((p) => ({ ...p, confirm: e.target.value }))} />
              </div>
            </div>
            <div className="btn-row">
              <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" onClick={resetPassword}>Reset →</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

