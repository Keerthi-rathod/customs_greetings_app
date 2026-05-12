import { useState, useRef } from "react";
import { styles } from "../styles/styles";

export function LoginScreen({ onLogin }) {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [step, setStep] = useState(1); // 1=choose method, 2=profile setup
  const fileRef = useRef();

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const proceed = () => {
    if (step === 1) { setStep(2); return; }
    if (!name.trim()) return;
    onLogin({ name: name.trim(), photo });
  };

  return (
    <div style={styles.loginWrap}>
      <div style={styles.loginCard}>
        <div style={styles.loginLogo}>✨</div>
        <h1 style={styles.loginTitle}>WishCraft</h1>
        <p style={styles.loginSub}>Personalized greetings, made beautiful.</p>

        {step === 1 ? (
          <>
            <p style={styles.loginLabel}>Sign in with</p>
            <button style={{...styles.socialBtn, background:"#fff", color:"#333"}} onClick={() => setStep(2)}>
              <span style={{fontSize:18}}>G</span> Continue with Google
            </button>
            <button style={{...styles.socialBtn, background:"#1877f2", color:"#fff"}} onClick={() => setStep(2)}>
              <span style={{fontSize:18}}>f</span> Continue with Facebook
            </button>
            <button style={{...styles.socialBtn, background:"transparent", color:"#aaa", border:"1px solid #333"}} onClick={() => setStep(2)}>
              👤 Continue as Guest
            </button>
          </>
        ) : (
          <>
            <p style={styles.loginLabel}>Set up your profile</p>
            <div style={styles.avatarPicker} onClick={() => fileRef.current.click()}>
              {photo
                ? <img src={photo} alt="avatar" style={styles.avatarImg} />
                : <span style={{fontSize:36, color:"#555"}}>📷</span>
              }
              <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}} onChange={handlePhoto} />
              <div style={styles.avatarHint}>Tap to upload photo</div>
            </div>
            <input
              style={styles.nameInput}
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && proceed()}
            />
            <button
              style={{...styles.primaryBtn, opacity: name.trim() ? 1 : 0.4}}
              onClick={proceed}
              disabled={!name.trim()}
            >
              Let's Go →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
