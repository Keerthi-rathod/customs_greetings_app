import { styles } from "../styles/styles";

export function PremiumPopup({ onClose, onSubscribe }) {
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
