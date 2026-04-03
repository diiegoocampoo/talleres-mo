import { useEffect, useRef, useState } from 'react';
export default function LazyImage({ src, alt, style={} }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if(e.isIntersecting){setInView(true);o.disconnect();} }, { rootMargin:'100px' });
    if(ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ ...style, overflow:'hidden', background:'var(--bg-raised)' }}>
      {inView && <img src={src} alt={alt} onLoad={()=>setLoaded(true)} className={`img-lazy ${loaded?'loaded':''}`} style={{ width:'100%', height:'100%', objectFit:'cover' }} />}
    </div>
  );
}
