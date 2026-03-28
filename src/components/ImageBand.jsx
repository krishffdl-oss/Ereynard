const items = [
  { url: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&auto=format&fit=crop&q=80', tag: 'Social Media' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80', tag: 'Analytics' },
  { url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&auto=format&fit=crop&q=80', tag: 'SEO' },
  { url: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=400&auto=format&fit=crop&q=80', tag: 'Strategy' },
  { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=80', tag: 'Web Design' },
  { url: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=400&auto=format&fit=crop&q=80', tag: 'Branding' },
  { url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop&q=80', tag: 'Content' },
  { url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&auto=format&fit=crop&q=80', tag: 'Paid Ads' },
];

export default function ImageBand() {
  return (
    <div className="imgband">
      <div className="ibt">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="ib-item">
            <img src={item.url} alt={item.tag} />
            <span className="ib-tag">{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}