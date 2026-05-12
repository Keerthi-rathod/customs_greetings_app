import { useState } from "react";
import { styles } from "../styles/styles";

export function ShareSheet({ imageUrl, quote, onClose }) {
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
