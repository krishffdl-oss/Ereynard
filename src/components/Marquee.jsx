export default function Marquee() {
  const items = ['SEO', 'Social Media', 'Performance Ads', 'Branding', 'Content Strategy', 'Web Design', 'Email Marketing', 'Analytics', 'Influencer Marketing', 'Video Production'];
  return (
    <div className="mq">
      <div className="mq-t">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="mq-item">
            <span>{item}</span>
            <span className="mq-dot" />
          </div>
        ))}
      </div>
    </div>
  );
}