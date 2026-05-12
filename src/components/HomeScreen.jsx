import { useState } from "react";
import { styles } from "../styles/styles";
import { CATEGORIES, TEMPLATES } from "../data/templates";
import { PremiumPopup } from "./PremiumPopup";
import { CardPreview } from "./CardPreview";

export function HomeScreen({ user, onLogout }) {
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
