import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out rounded-full hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '40px' : '16px',
          height: isHovered ? '40px' : '16px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.25)' : 'rgba(37, 99, 235, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(2px)',
        }}
      />
      <div
        className="fixed pointer-events-none z-40 transition-transform duration-300 ease-out rounded-full blur-2xl hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '240px',
          height: '240px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.06) 50%, transparent 80%)',
        }}
      />
    </>
  );
}
