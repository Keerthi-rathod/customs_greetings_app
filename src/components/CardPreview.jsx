import { useState, useRef, useEffect } from "react";
import { styles } from "../styles/styles";
import { ShareSheet } from "./ShareSheet";

export function CardPreview({ template, user, onClose }) {
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
