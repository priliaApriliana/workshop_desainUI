
  
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    function toggleMenu() {
      const links = document.querySelector('.nav-links');
      const btn = document.querySelector('.btn-nav');
      if (!links) return;
      const open = links.style.display === 'flex';
      if (open) {
        links.style.cssText = '';
        btn.style.display = '';
      } else {
        links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:57px;left:0;right:0;background:var(--white);padding:24px;gap:20px;border-bottom:1px solid rgba(0,0,0,0.08);z-index:99;';
        btn.style.cssText = 'display:block;margin:0 24px 12px;';
      }
    }
  