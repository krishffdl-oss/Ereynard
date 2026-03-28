export default function PageHero({ label, title, strokeWord, sub }) {
  const titleParts = strokeWord ? title.split(strokeWord) : [title];
  return (
    <div className="page-hero">
      <div className="ph-orb ph-orb1" />
      <div className="ph-orb ph-orb2" />
      <div className="page-hero-content">
        <div className="page-hero-label">{label}</div>
        <div className="page-hero-title">
          {strokeWord ? (
            <>{titleParts[0]}<span className="stroke">{strokeWord}</span>{titleParts[1]}</>
          ) : (
            <span className="solid">{title}</span>
          )}
        </div>
        {sub && <p className="page-hero-sub">{sub}</p>}
      </div>
    </div>
  );
}