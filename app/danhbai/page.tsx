"use client";

import { useEffect, useState } from "react";

type Player = {
  name: string;
  score: number;
  inputScore: string;
};

const DanhBaiPage = () => {
  const [playerCount, setPlayerCount] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [leader, setLeader] = useState<string>("");

  const handleCreatePlayers = () => {
    const count = Number(playerCount);
    if (count <= 0) return;

    const list: Player[] = Array.from({ length: count }).map((_, i) => ({
      name: `Người chơi ${i + 1}`,
      score: 0,
      inputScore: "",
    }));

    setPlayers(list);
  };

  const handleChangeName = (index: number, name: string) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, name } : p)),
    );
  };

  const handleUpdateScore = (index: number, type: "add" | "subtract") => {
    const value = Number(players[index].inputScore);
    if (isNaN(value)) return;

    setPlayers((prev) =>
      prev.map((p, i) =>
        i === index
          ? {
              ...p,
              score: type === "add" ? p.score + value : p.score - value,
              inputScore: "",
            }
          : p,
      ),
    );
  };

  useEffect(() => {
    if (players.length === 0) {
      setSum(0);
      setLeader("");
      return;
    }

    const topPlayer = players.reduce((max, p) =>
      p.score > max.score ? p : max,
    );

    setSum(topPlayer.score);
    setLeader(topPlayer.name);
  }, [players]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "24px",
        background: "linear-gradient(135deg, #0f2027, #203a43)",
        color: "#fff",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        🃏 TÍNH ĐIỂM ĐÁNH BÀI
      </h1>

      {/* Nhập số người chơi */}
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto 24px",
          display: "flex",
          gap: "8px",
        }}
      >
        <input
          type="number"
          placeholder="Số người chơi"
          value={playerCount}
          onChange={(e) => setPlayerCount(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />
        <button
          onClick={handleCreatePlayers}
          style={{
            padding: "10px 16px",
            fontWeight: "bold",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background: "#ff9800",
            color: "#fff",
          }}
        >
          TẠO
        </button>
      </div>

      {/* Bảng điểm */}
      {players.length > 0 && (
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "#1f2937",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px" }}>Tên</th>
                <th style={{ padding: "8px" }}>Nhập điểm</th>
                <th style={{ padding: "8px" }}>Tổng điểm</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px" }}>
                    <input
                      value={player.name}
                      onChange={(e) => handleChangeName(index, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "6px",
                        borderRadius: "6px",
                        border: "none",
                      }}
                    />
                  </td>

                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <input
                      type="number"
                      value={player.inputScore}
                      onChange={(e) =>
                        setPlayers((prev) =>
                          prev.map((p, i) =>
                            i === index
                              ? { ...p, inputScore: e.target.value }
                              : p,
                          ),
                        )
                      }
                      style={{
                        width: "80px",
                        padding: "6px",
                        borderRadius: "6px",
                        border: "none",
                        textAlign: "center",
                      }}
                    />
                  </td>

                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {player.score}
                  </td>

                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={() => handleUpdateScore(index, "add")}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          background: "#4caf50",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </button>

                      <button
                        onClick={() => handleUpdateScore(index, "subtract")}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "6px",
                          border: "none",
                          cursor: "pointer",
                          background: "#f44336",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        −
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {leader && (
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto 16px",
            padding: "12px",
            borderRadius: "10px",
            background: "#2e7d32",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          🏆 DẪN ĐẦU: {leader} — {sum} điểm
        </div>
      )}
    </div>
  );
};

export default DanhBaiPage;
