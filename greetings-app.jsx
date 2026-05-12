import { useState, useRef, useEffect } from "react";

const CATEGORIES = ["All", "Shayari", "Birthday", "Anniversary", "Festival", "Joke"];

const TEMPLATES = [
  {
    id: 1, category: "Shayari", premium: false,
    bg: "linear-gradient(160deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
    quote: "तू पास हो या दूर, फर्क नहीं पड़ता,\nतेरा ख्याल ही मेरे चेहरे पर मुस्कान ला देता है।",
    accent: "#e94560", tag: "❤️ Love"
  },
  {
    id: 2, category: "Birthday", premium: false,
    bg: "linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",
    quote: "May your birthday be as bright\nas the smile you bring to everyone around you.",
    accent: "#fff", tag: "🎂 Birthday"
  },
  {
    id: 3, category: "Shayari", premium: true,
    bg: "linear-gradient(160deg,#0d0d0d 0%,#1a0a00 60%,#2d1200 100%)",
    quote: "क्या हिसाब दूँ तुम्हें अपनी चाहत का\nआज टटोला अपनी साँसों को\nतो हर साँस के फासलों में तुम्हें पाया",
    accent: "#ff6b35", tag: "🔥 Trending"
  },
  {
    id: 4, category: "Anniversary", premium: false,
    bg: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
    quote: "Every love story is beautiful,\nbut ours is my favorite.",
    accent: "#ffd700", tag: "💍 Anniversary"
  },
  {
    id: 5, category: "Festival", premium: true,
    bg: "linear-gradient(135deg,#f7971e 0%,#ffd200 100%)",
    quote: "दीपों की रोशनी से जगमगाए आपका घर,\nखुशियों की बहार आए हर पल हर पहर।",
    accent: "#8b0000", tag: "🪔 Diwali"
  },
  {
    id: 6, category: "Joke", premium: false,
    bg: "linear-gradient(135deg,#11998e 0%,#38ef7d 100%)",
    quote: "Life is short. Smile while you still have teeth! 😄",
    accent: "#fff", tag: "😂 Funny"
  },
  {
    id: 7, category: "Birthday", premium: true,
    bg: "linear-gradient(135deg,#fc4a1a 0%,#f7b733 100%)",
    quote: "Another year older,\nanother year more awesome.\nHappy Birthday, Legend!",
    accent: "#fff", tag: "🎉 Celebration"
  },
  {
    id: 8, category: "Festival", premium: false,
    bg: "linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)",
    quote: "Wishing you a Holi\nfilled with vibrant colors,\njoyful moments & sweet memories.",
    accent: "#7c3aed", tag: "🎨 Holi"
  },
];

// ─── Screens ───────────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }) {
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

function PremiumPopup({ onClose, onSubscribe }) {
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.popup} onClick={e => e.stopPropagation()}>
        <div style={styles.popupGlow} />
        <div style={{fontSize:48, marginBottom:8}}>👑</div>
        <h2 style={styles.popupTitle}>Go Premium</h2>
        <p style={styles.popupDesc}>Unlock all exclusive templates, remove watermarks, and share in HD quality.</p>
        <div style={styles.planRow}>
          <div style={styles.planCard}>
            <div style={styles.planName}>Monthly</div>
            <div style={styles.planPrice}>₹49<span style={{fontSize:12}}>/mo</span></div>
          </div>
          <div style={{...styles.planCard, border:"2px solid #f7b733", background:"#1a1200"}}>
            <div style={{...styles.planName, color:"#f7b733"}}>Yearly ⭐</div>
            <div style={styles.planPrice}>₹399<span style={{fontSize:12}}>/yr</span></div>
            <div style={{fontSize:10, color:"#f7b733", marginTop:2}}>Save 32%</div>
          </div>
        </div>
        <button style={styles.premiumBtn} onClick={onSubscribe}>Subscribe Now</button>
        <button style={styles.closeLink} onClick={onClose}>Maybe later</button>
      </div>
    </div>
  );
}

function ShareSheet({ imageUrl, quote, onClose }) {
  const [copied, setCopied] = useState(false);
  const encodedText = encodeURIComponent(quote + "\n\nShared via WishCraft ✨");

  const options = [
    {
      label: "WhatsApp",
      icon: "💬",
      color: "#25D366",
      action: () => window.open(`https://wa.me/?text=${encodedText}`, "_blank"),
    },
    {
      label: "Instagram",
      icon: "📸",
      color: "#E1306C",
      action: () => alert("Save the image first (Download), then upload it to Instagram Stories or Feed."),
    },
    {
      label: "Twitter / X",
      icon: "🐦",
      color: "#1DA1F2",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, "_blank"),
    },
    {
      label: "Email",
      icon: "📧",
      color: "#EA4335",
      action: () => window.open(`mailto:?subject=A greeting for you!&body=${encodedText}`, "_blank"),
    },
    {
      label: copied ? "Copied! ✅" : "Copy Text",
      icon: "📋",
      color: "#6366f1",
      action: async () => {
        try {
          await navigator.clipboard.writeText(quote + "\n\nShared via WishCraft ✨");
        } catch {
          const ta = document.createElement("textarea");
          ta.value = quote + "\n\nShared via WishCraft ✨";
          document.body.appendChild(ta); ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      label: "Open Image",
      icon: "🖼️",
      color: "#f59e0b",
      action: () => window.open(imageUrl, "_blank"),
    },
  ];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={{ ...styles.popup, padding: "24px 20px 28px" }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 40, height: 4, background: "#374151", borderRadius: 4, margin: "0 auto 20px" }} />
        <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", margin: "0 0 6px", textAlign: "center" }}>Share this card</h3>
        <p style={{ color: "#6b7280", fontSize: 12, textAlign: "center", margin: "0 0 20px" }}>Choose how you want to share</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {options.map(opt => (
            <button key={opt.label} onClick={opt.action} style={{
              background: opt.color + "18", border: `1px solid ${opt.color}40`,
              borderRadius: 14, padding: "14px 8px", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 24 }}>{opt.icon}</span>
              <span style={{ color: "#e5e7eb", fontSize: 11, fontWeight: 600 }}>{opt.label}</span>
            </button>
          ))}
        </div>
        <button style={{ ...styles.closeLink, marginTop: 20 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function CardPreview({ template, user, onClose }) {
  const canvasRef = useRef();
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const parseGradientStops = (gradStr) => {
    const colorStops = gradStr.match(/#[0-9a-f]{3,6}/gi) || [];
    if (colorStops.length >= 2)
      return [[0, colorStops[0]], [1, colorStops[colorStops.length - 1]]];
    return [[0, "#1a1a2e"], [1, "#0f3460"]];
  };

  // Fully async render — waits for profile image before resolving
  const renderCanvas = () => new Promise((resolve) => {
    const canvas = canvasRef.current;
    if (!canvas) return resolve();
    const ctx = canvas.getContext("2d");
    const W = 400, H = 500;
    canvas.width = W;
    canvas.height = H;

    const drawBase = () => {
      // Background
      const stops = parseGradientStops(template.bg);
      const grad = ctx.createLinearGradient(0, 0, W, H);
      stops.forEach(([s, c]) => grad.addColorStop(s, c));
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Top dark bar
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, W, 72);

      // Name (offset right to leave room for avatar)
      ctx.fillStyle = "#fff";
      ctx.font = "bold 24px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText(user.name, W / 2 + 36, 45);

      // Tag
      ctx.fillStyle = template.accent;
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(template.tag, 16, 96);

      // Quote lines
      const lines = template.quote.split("\n");
      ctx.fillStyle = "#fff";
      ctx.font = "italic 17px Georgia, serif";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 8;
      const startY = H / 2 + 10 - ((lines.length - 1) * 28) / 2;
      lines.forEach((line, i) => ctx.fillText(line, W / 2, startY + i * 30));
      ctx.shadowBlur = 0;

      // Watermark
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("WishCraft ✨", W - 10, H - 10);
    };

    const drawAvatar = (imgEl) => {
      // Clipped circle
      ctx.save();
      ctx.beginPath();
      ctx.arc(52, 52, 36, 0, Math.PI * 2);
      ctx.clip();
      if (imgEl) {
        ctx.drawImage(imgEl, 16, 16, 72, 72);
      } else {
        ctx.fillStyle = "#374151";
        ctx.fill();
        ctx.font = "22px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("👤", 52, 60);
      }
      ctx.restore();
      // Green ring
      ctx.beginPath();
      ctx.arc(52, 52, 38, 0, Math.PI * 2);
      ctx.strokeStyle = "#22c55e";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    drawBase();

    if (user.photo) {
      const img = new Image();
      img.onload = () => {
        drawAvatar(img);
        resolve();
      };
      img.onerror = () => {
        drawAvatar(null);
        resolve();
      };
      img.src = user.photo;
    } else {
      drawAvatar(null);
      resolve();
    }
  });

  // Render on mount and wait until done before enabling buttons
  useEffect(() => {
    setReady(false);
    renderCanvas().then(() => setReady(true));
  }, [template, user]);

  // Returns a Blob from the canvas — used by both download and share
  const getCanvasBlob = () => new Promise((resolve) => {
    canvasRef.current.toBlob((blob) => resolve(blob), "image/png");
  });

  const handleDownload = async () => {
    if (!ready) return;
    setDownloading(true);
    try {
      const blob = await getCanvasBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wishcraft-${user.name.replace(/\s+/g, "_")}-${template.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Revoke after a tick so browser has time to start the download
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setTimeout(() => setDownloading(false), 1200);
    }
  };

  const handleShare = async () => {
    if (!ready) return;
    // Generate a blob URL for the image so ShareSheet can open it
    const blob = await getCanvasBlob();
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
    setShowShareSheet(true);
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose}>
        <div
          style={{ ...styles.popup, maxWidth: 440, padding: "20px 20px 24px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", marginBottom: 12, textAlign: "center" }}>
            Your Personalized Card
          </h3>

          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#1f2937" }}>
            <canvas
              ref={canvasRef}
              style={{ width: "100%", display: "block", opacity: ready ? 1 : 0, transition: "opacity 0.3s" }}
            />
            {!ready && (
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#9ca3af", fontSize: 13,
              }}>
                Rendering…
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button
              style={{ ...styles.primaryBtn, flex: 1, background: "#16a34a", opacity: ready ? 1 : 0.5 }}
              onClick={handleDownload}
              disabled={!ready || downloading}
            >
              {downloading ? "Saving…" : "⬇ Download"}
            </button>
            <button
              style={{ ...styles.primaryBtn, flex: 1, background: "#2563eb", opacity: ready ? 1 : 0.5 }}
              onClick={handleShare}
              disabled={!ready}
            >
              📤 Share
            </button>
          </div>

          <button style={styles.closeLink} onClick={onClose}>← Back</button>
        </div>
      </div>

      {showShareSheet && (
        <ShareSheet
          imageUrl={imageUrl}
          quote={template.quote}
          onClose={() => {
            setShowShareSheet(false);
            if (imageUrl) { URL.revokeObjectURL(imageUrl); setImageUrl(null); }
          }}
        />
      )}
    </>
  );
}

function HomeScreen({ user, onLogout }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showPremium, setShowPremium] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  

  const filtered = activeCategory === "All"
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory);

  const handleTemplateClick = (t) => {
    if (t.premium && !subscribed) {
      setSelectedTemplate(t);
      setShowPremium(true);
    } else {
      setSelectedTemplate(t);
      setShowPreview(true);
    }
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    setShowPremium(false);
    setShowPreview(true);
  };

  

  return (
    <div style={styles.homeWrap}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={styles.headerAvatar}>
            {user.photo
              ? <img src={user.photo} style={styles.headerAvatarImg} alt="avatar" />
              : <span style={{fontSize:18}}>👤</span>
            }
          </div>
          <div>
            <div style={{fontSize:12, color:"#9ca3af"}}>Good morning,</div>
            <div style={{fontSize:16, fontWeight:700, color:"#fff", fontFamily:"Georgia, serif"}}>{user.name}</div>
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:8}}>
          {subscribed && <span style={styles.premiumBadge}>👑 Pro</span>}
          <button style={styles.logoutBtn} onClick={onLogout}>↩</button>
        </div>
      </div>

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroText}>
          <div style={{fontSize:12, color:"#f7b733", letterSpacing:2, textTransform:"uppercase", marginBottom:4}}>✨ Trending Today</div>
          <div style={{fontSize:22, fontFamily:"Georgia, serif", color:"#fff", lineHeight:1.4}}>Express yourself<br/>beautifully.</div>
        </div>
        <div style={styles.heroDecor}>🎨</div>
      </div>

      {/* Categories */}
      <div style={styles.catRow}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            style={{
              ...styles.catBtn,
              ...(activeCategory === cat ? styles.catBtnActive : {})
            }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={styles.grid}>
        {filtered.map(t => (
          <div key={t.id} style={styles.card} onClick={() => handleTemplateClick(t)}>
            {/* Card Background */}
            <div style={{...styles.cardBg, background: t.bg}}>
              {/* Top bar */}
              <div style={styles.cardTop}>
                {/* Avatar */}
                <div style={styles.cardAvatar}>
                  {user.photo
                    ? <img src={user.photo} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="u" />
                    : <span style={{fontSize:16}}>👤</span>
                  }
                </div>
                <span style={{fontSize:11, fontWeight:700, color:"#fff", fontFamily:"Georgia, serif"}}>{user.name}</span>
              </div>
              {/* Quote */}
              <div style={styles.cardQuote}>{t.quote.split("\n")[0]}{t.quote.includes("\n") ? "..." : ""}</div>
              {/* Tag */}
              <div style={{...styles.cardTag, color: t.accent}}>{t.tag}</div>
            </div>
            {/* Premium lock */}
            {t.premium && !subscribed && (
              <div style={styles.premiumLock}>
                <span style={{fontSize:18}}>👑</span>
                <span style={{fontSize:10, color:"#f7b733", fontWeight:700}}>PREMIUM</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Popups */}
      {showPremium && (
        <PremiumPopup
          onClose={() => setShowPremium(false)}
          onSubscribe={handleSubscribe}
        />
      )}
      {showPreview && selectedTemplate && (
        <CardPreview
          template={selectedTemplate}
          user={user}
          onClose={() => setShowPreview(false)}
        />
      )}

    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div style={styles.root}>
      {user
        ? <HomeScreen user={user} onLogout={() => setUser(null)} />
        : <LoginScreen onLogin={setUser} />
      }
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0f",
    fontFamily: "system-ui, sans-serif",
    color: "#fff",
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
  },

  // Login
  loginWrap: {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#0a0a0f 0%,#12071a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loginCard: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: "40px 28px",
    width: "100%",
    maxWidth: 360,
    textAlign: "center",
    backdropFilter: "blur(12px)",
  },
  loginLogo: { fontSize: 48, marginBottom: 8 },
  loginTitle: {
    fontSize: 32,
    fontFamily: "Georgia, serif",
    margin: "0 0 6px",
    background: "linear-gradient(90deg,#f7b733,#fc4a1a)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  loginSub: { color: "#9ca3af", fontSize: 14, margin: "0 0 28px" },
  loginLabel: { color: "#6b7280", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 },
  socialBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    padding: "12px 20px",
    borderRadius: 12,
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
  },
  avatarPicker: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.06)",
    border: "2px dashed #374151",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative",
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  avatarHint: { fontSize: 9, color: "#6b7280", marginTop: 4, position: "absolute", bottom: 6 },
  nameInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 14,
  },
  primaryBtn: {
    width: "100%",
    padding: "13px",
    borderRadius: 12,
    background: "linear-gradient(90deg,#f7b733,#fc4a1a)",
    border: "none",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
  },

  // Home
  homeWrap: {
    minHeight: "100vh",
    background: "#0a0a0f",
    paddingBottom: 40,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 16px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  headerAvatar: {
    width: 40, height: 40, borderRadius: "50%",
    background: "#1f2937",
    overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "2px solid #22c55e",
  },
  headerAvatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  premiumBadge: {
    background: "linear-gradient(90deg,#f7b733,#fc4a1a)",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
  },
  logoutBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "none",
    color: "#9ca3af",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
  },

  hero: {
    margin: "16px 16px 0",
    background: "linear-gradient(135deg,rgba(247,183,51,0.12),rgba(252,74,26,0.08))",
    border: "1px solid rgba(247,183,51,0.15)",
    borderRadius: 16,
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroText: {},
  heroDecor: { fontSize: 48, opacity: 0.6 },

  catRow: {
    display: "flex",
    gap: 8,
    padding: "14px 16px 4px",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  catBtn: {
    padding: "7px 16px",
    borderRadius: 20,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#9ca3af",
    fontSize: 13,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  catBtnActive: {
    background: "linear-gradient(90deg,#f7b733,#fc4a1a)",
    border: "none",
    color: "#fff",
    fontWeight: 700,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    padding: "16px 16px",
  },
  card: {
    borderRadius: 14,
    overflow: "hidden",
    cursor: "pointer",
    position: "relative",
    aspectRatio: "3/4",
    transition: "transform 0.15s",
  },
  cardBg: {
    width: "100%", height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    boxSizing: "border-box",
  },
  cardTop: {
    background: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: "6px 8px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardAvatar: {
    width: 28, height: 28, borderRadius: "50%",
    overflow: "hidden",
    background: "#374151",
    flexShrink: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "1.5px solid #22c55e",
  },
  cardQuote: {
    color: "#fff",
    fontSize: 11,
    lineHeight: 1.5,
    textShadow: "0 1px 4px rgba(0,0,0,0.8)",
    fontFamily: "Georgia, serif",
    padding: "4px 0",
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  cardTag: {
    fontSize: 10,
    fontWeight: 700,
  },
  premiumLock: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backdropFilter: "blur(2px)",
  },

  // Overlay & Popup
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 100,
    backdropFilter: "blur(4px)",
  },
  popup: {
    background: "#111827",
    borderRadius: "20px 20px 0 0",
    padding: "28px 24px 32px",
    width: "100%",
    maxWidth: 480,
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },
  popupGlow: {
    position: "absolute",
    top: -60, left: "50%",
    transform: "translateX(-50%)",
    width: 200, height: 200,
    background: "radial-gradient(circle,rgba(247,183,51,0.2),transparent 70%)",
    pointerEvents: "none",
  },
  popupTitle: {
    fontSize: 24,
    fontFamily: "Georgia, serif",
    margin: "0 0 8px",
  },
  popupDesc: { color: "#9ca3af", fontSize: 14, margin: "0 0 20px" },
  planRow: { display: "flex", gap: 12, marginBottom: 18 },
  planCard: {
    flex: 1,
    background: "#1f2937",
    borderRadius: 12,
    padding: "14px 10px",
    border: "1px solid #374151",
  },
  planName: { fontSize: 12, color: "#9ca3af", marginBottom: 4 },
  planPrice: { fontSize: 22, fontWeight: 800, color: "#fff" },
  premiumBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    background: "linear-gradient(90deg,#f7b733,#fc4a1a)",
    border: "none",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 12,
  },
  closeLink: {
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: 13,
    padding: 8,
    display: "block",
    margin: "0 auto",
  },

  toast: {
    position: "fixed",
    bottom: 30,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#22c55e",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: 30,
    fontSize: 14,
    fontWeight: 600,
    zIndex: 200,
    whiteSpace: "nowrap",
  },
};
