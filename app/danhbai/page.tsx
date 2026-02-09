"use client";

import { useEffect, useState } from "react";

type Player = {
  name: string;
  score: number;
  inputScore: string;
  lostThisRound: boolean;
};

const STORAGE_KEY = "danh-bai-data";

const DanhBaiPage = () => {
  const [playerCount, setPlayerCount] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [roundPot, setRoundPot] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // ===== LOAD DATA =====
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setLoaded(true);
      return;
    }

    try {
      const data = JSON.parse(raw);
      setPlayers(data.players ?? []);
      setRoundPot(data.roundPot ?? 0);
      setPlayerCount(data.playerCount ?? "");
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    setLoaded(true);
  }, []);

  // ===== SAVE DATA =====
  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        players,
        roundPot,
        playerCount,
      }),
    );
  }, [players, roundPot, playerCount, loaded]);

  // ===== CREATE PLAYERS =====
  const handleCreatePlayers = () => {
    const count = Number(playerCount);
    if (count <= 1) return;

    const list: Player[] = Array.from({ length: count }).map((_, i) => ({
      name: `Người chơi ${i + 1}`,
      score: 0,
      inputScore: "",
      lostThisRound: false,
    }));

    setPlayers(list);
    setRoundPot(0);
  };

  // ===== CHANGE NAME =====
  const handleChangeName = (index: number, name: string) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, name } : p)),
    );
  };

  // ===== LOSE =====
  const handleLose = (index: number) => {
    const value = Number(players[index].inputScore);
    if (isNaN(value) || value <= 0) return;

    let nextPlayers = players.map((p, i) =>
      i === index
        ? {
            ...p,
            score: p.score - value,
            lostThisRound: true,
            inputScore: "",
          }
        : p,
    );

    const nextRoundPot = roundPot + value;
    const notLost = nextPlayers.filter((p) => !p.lostThisRound);

    // Có người ăn
    if (notLost.length === 1) {
      const winnerIndex = nextPlayers.findIndex((p) => !p.lostThisRound);

      nextPlayers = nextPlayers.map((p, i) =>
        i === winnerIndex
          ? { ...p, score: p.score + nextRoundPot }
          : { ...p, lostThisRound: false },
      );

      setPlayers(nextPlayers);
      setRoundPot(0);
      return;
    }

    setPlayers(nextPlayers);
    setRoundPot(nextRoundPot);
  };

  // ===== RESET =====
  const handleResetAll = () => {
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        score: 0,
        inputScore: "",
        lostThisRound: false,
      })),
    );
    setRoundPot(0);
  };

  if (!loaded) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "linear-gradient(135deg, #0f2027, #203a43)",
        color: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>
        🃏 TÍNH ĐIỂM ĐÁNH BÀI
      </h1>

      {/* INPUT */}
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto 24px",
          display: "flex",
          gap: 8,
        }}
      >
        <input
          type="number"
          placeholder="Số người chơi"
          value={playerCount}
          onChange={(e) => setPlayerCount(e.target.value)}
          style={{ flex: 1, padding: 10, borderRadius: 8, border: "none" }}
        />
        <button
          onClick={handleCreatePlayers}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: "#ff9800",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          TẠO
        </button>
      </div>

      {players.length > 0 && (
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "rgba(31,41,55,0.95)",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 10px",
            }}
          >
            <thead>
              <tr style={{ color: "#9ca3af", fontSize: 14 }}>
                <th align="left">Người chơi</th>
                <th align="center">Điểm ván</th>
                <th align="center">Tổng</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {players.map((p, i) => (
                <tr
                  key={i}
                  style={{
                    background: p.lostThisRound
                      ? "#111827"
                      : "linear-gradient(135deg, #1e3a8a, #2563eb)",
                    color: "#fff",
                    borderRadius: 12,
                  }}
                >
                  {/* NAME */}
                  <td style={{ padding: "12px 10px" }}>
                    <input
                      value={p.name}
                      onChange={(e) => handleChangeName(i, e.target.value)}
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 15,
                      }}
                    />
                  </td>

                  {/* INPUT SCORE */}
                  <td align="center">
                    <input
                      type="number"
                      value={p.inputScore}
                      onChange={(e) =>
                        setPlayers((prev) =>
                          prev.map((pl, idx) =>
                            idx === i
                              ? { ...pl, inputScore: e.target.value }
                              : pl,
                          ),
                        )
                      }
                      style={{
                        width: 70,
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: "none",
                        textAlign: "center",
                        fontWeight: 600,
                        background: "#111827",
                        color: "#fff",
                      }}
                    />
                  </td>

                  {/* TOTAL SCORE */}
                  <td
                    align="center"
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: p.score >= 0 ? "#4ade80" : "#f87171",
                    }}
                  >
                    {p.score}
                  </td>

                  {/* ACTION */}
                  <td align="center">
                    <button
                      onClick={() => handleLose(i)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        border: "none",
                        background: "#ef4444",
                        color: "#fff",
                        fontSize: 18,
                        fontWeight: "bold",
                        cursor: "pointer",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                      }}
                    >
                      −
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* FOOTER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <div style={{ fontWeight: 600 }}>
              🎲 Điểm trong ván:{" "}
              <span style={{ color: "#facc15" }}>{roundPot}</span>
            </div>

            <button
              onClick={handleResetAll}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                border: "none",
                background: "#374151",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DanhBaiPage;
