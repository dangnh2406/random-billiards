"use client";

import { useState } from "react";

const parseNames = (text: string) =>
  text
    .split(/[\n,]+/)
    .map((name) => name.trim())
    .filter(Boolean);

const QuaySoPage = () => {
  const [input, setInput] = useState("");
  const [names, setNames] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

  const handleRoll = () => {
    const list = names.length > 0 ? names : parseNames(input);

    if (list.length === 0) {
      alert("Vui lòng nhập danh sách tên!");
      return;
    }

    setNames(list);
    setIsRolling(true);

    setTimeout(() => {
      const index = Math.floor(Math.random() * list.length);
      setWinner(list[index]);
      setShowPopup(true);
      setIsRolling(false);
    }, 1200);
  };

  const handleConfirmWinner = () => {
    setNames((prev) => prev.filter((name) => name !== winner));
    setWinner(null);
    setShowPopup(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e1e2f, #2c2c44)",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "24px",
          borderRadius: "16px",
          background: "#1f1f33",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "16px" }}>
          🎉 QUAY SỐ TRÚNG THƯỞNG
        </h1>

        <textarea
          placeholder="Nhập tên (dấu phẩy hoặc xuống dòng)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "100%",
            height: "120px",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            resize: "none",
            marginBottom: "16px",
          }}
        />

        <button
          onClick={handleRoll}
          disabled={isRolling}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            background: isRolling
              ? "#555"
              : "linear-gradient(135deg, #ff9800, #ff5722)",
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            cursor: isRolling ? "not-allowed" : "pointer",
          }}
        >
          🎰 {isRolling ? "ĐANG QUAY..." : "QUAY NGAY"}
        </button>

        {names.length > 0 && (
          <p
            style={{
              marginTop: "10px",
              fontSize: "13px",
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            👥 Còn lại: {names.length} người
          </p>
        )}
      </div>

      {showPopup && winner && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: "360px",
              padding: "24px",
              borderRadius: "16px",
              background: "#fff",
              color: "#333",
              textAlign: "center",
            }}
          >
            <h2>🏆 CHÚC MỪNG</h2>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                margin: "16px 0",
                color: "#ff5722",
              }}
            >
              {winner}
            </p>

            <button
              onClick={handleConfirmWinner}
              style={{
                width: "100%",
                padding: "12px",
                fontWeight: "bold",
                background: "linear-gradient(135deg, #4caf50, #2e7d32)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              ✅ XÁC NHẬN & XÓA TÊN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuaySoPage;
