export default function ServiceCard({ icon, title, description, image, index = 0 }) {
  return (
    <div className="card card-accent animate-fadeInUp" style={{ animationDelay: `${index * 0.08}s`, padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg,var(--bg-raised) 0%,var(--bg-surface) 100%)', flexShrink: 0 }}>
        {image ? (
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4rem', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%,rgba(214,40,40,0.08) 0%,transparent 70%)' }} />
            <span style={{ position: 'relative', zIndex: 1 }}>{icon}</span>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(to top,rgba(26,26,32,0.8),transparent)' }} />
      </div>
      <div style={{ padding: '22px 24px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>{title}</div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>{description}</p>
      </div>
    </div>
  );
}