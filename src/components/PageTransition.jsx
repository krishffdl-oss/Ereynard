export default function PageTransition({ state }) {
  if (!state) return null;
  return (
    <div className={`pt-overlay ${state}`}>
      <div className="pt-panel" />
      <div className="pt-panel" />
      <div className="pt-panel" />
    </div>
  );
}