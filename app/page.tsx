"use client";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          style={{
            padding: "16px 32px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            background: "linear-gradient(135deg, #ff9800, #ff5722)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(255, 87, 34, 0.4)",
            transition: "all 0.3s ease",
          }}
          onClick={() => router.push("/quayso")}
        >
          🎉 QUAY SÔ TRÚNG THƯỞNG
        </button>
        <button
          style={{
            padding: "16px 32px",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            background: "linear-gradient(135deg, #ff9800, #ff5722)",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(255, 87, 34, 0.4)",
            transition: "all 0.3s ease",
          }}
          onClick={() => router.push("/danhbai")}
        >
          ♠️ TẠO ROOM ĐÁNH BÀI
        </button>
      </div>
    </div>
  );
}
