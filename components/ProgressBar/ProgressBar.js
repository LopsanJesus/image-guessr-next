const ProgressBar = ({ score, total = 12, unlockAt = 10 }) => {
  const pct = Math.min((score / total) * 100, 100);
  const unlockPct = (unlockAt / total) * 100;

  return (
    <div className="relative h-2 rounded-full bg-white/20 overflow-visible">
      {/* Unlock threshold marker */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-secondary/80 rounded-full z-10"
        style={{ left: `${unlockPct}%` }}
      />
      {/* Fill */}
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{
          width: `${pct}%`,
          backgroundColor:
            score >= unlockAt ? "var(--color-bgGreen)" : "var(--color-secondary)",
        }}
      />
    </div>
  );
};

export default ProgressBar;
