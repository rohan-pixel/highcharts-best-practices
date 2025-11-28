import React, { memo, useEffect, useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import genrateChartData from "../utils/generateChartData";
import Loading from "./Loading";
import ErrorBoundary from "./ErrorBoundary";
import SomethingWentWrong from "./SomethingWentWrong";

const Chart = lazy(() => import("./Chart"));

const StaticCharts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchChartDetails() {
      try {
        setIsLoading(true);
        const cachedData = sessionStorage.getItem("@chartData");
        const data = cachedData
          ? JSON.parse(cachedData)
          : await genrateChartData();

        if (!cachedData)
          sessionStorage.setItem("@chartData", JSON.stringify(data));

        setChartData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChartDetails();
  }, []);

  const generateError = () => {
    throw new Error("New Custom Error!!!");
  };

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* ---------------------- FUTURISTIC GLASS HEADER ---------------------- */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 28px",
          margin: "0 0 22px 0",
          borderRadius: "20px",
          backdropFilter: "blur(16px)",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "0.3s ease",
        }}
        className="glass-header"
      >
        <h1
          style={{
            fontSize: "34px",
            margin: 0,
            color: "#0174f0ff",
            letterSpacing: "1.2px",
            fontWeight: "600",
            textShadow: "0 0 12px rgba(255,255,255,0.5)",
          }}
        >
          Static Charts
        </h1>

        <Link
          to="/dynamic"
          style={{
            padding: "10px 24px",
            background: "linear-gradient(135deg, #00F260, #0575E6)",
            color: "#ffffff",
            borderRadius: "50px",
            fontWeight: "600",
            fontSize: "14px",
            letterSpacing: "0.5px",
            textDecoration: "none",
            boxShadow: "0 0 15px rgba(0, 255, 150, 0.35)",
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
            e.target.style.boxShadow = "0 0 22px rgba(0, 255, 150, 0.55)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 0 15px rgba(0, 255, 150, 0.35)";
          }}
        >
          Dynamic Charts →
        </Link>
      </div>
      {/* -------------------------------------------------------------------- */}

      <hr style={{ margin: "20px 0", borderColor: "#eee" }} />

      {/* Loading */}
      {isLoading ? (
        <Loading size={100} />
      ) : chartData.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
            gap: "20px",
          }}
        >
          {chartData.map((chartOptions, idx) => (
            <ErrorBoundary key={idx} fallback={<SomethingWentWrong />}>
              <Suspense fallback={<Loading size={50} />}>

                <div
                  style={{
                    borderRadius: "14px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    padding: "12px",
                    background: "#fff",
                    transition: "transform 0.3s, box-shadow 0.3s",
                  }}
                  className="chart-card"
                >
                  <Chart options={chartOptions} />
                </div>

              </Suspense>
            </ErrorBoundary>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: 50 }}>No data found</div>
      )}
    </div>
  );
};

export default memo(StaticCharts);
