import React, { useState } from 'react';
import { User, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ProfileAvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showUploadBadge?: boolean;
  onUploadClick?: () => void;
  onImageSelected?: (dataUrl: string) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  src = '/assets/profile.jpg',
  name = 'Jogu Murali Krishna',
  size = 'hero',
  className = '',
  showUploadBadge = true,
  onUploadClick,
  onImageSelected
}) => {
  const [imageError, setImageError] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleBadgeClick = () => {
    // Always open the real OS file picker for choosing a photo.
    fileInputRef.current?.click();
    // Optional extra behavior (e.g. also opening a settings modal), if provided.
    onUploadClick?.();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file (JPG, PNG, WEBP, etc.).');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImageError(false);
      onImageSelected?.(dataUrl);
    };
    reader.readAsDataURL(file);

    // Reset so selecting the same file again still fires onChange
    e.target.value = '';
  };

  // Extract initials from name (e.g., "Murali Krishna" -> "MK")
  const getInitials = (str: string) => {
    if (!str) return 'AI';
    const parts = str.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  // Size dimensions map
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 text-xl',
    xl: 'w-36 h-36 text-3xl',
    hero: 'w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 text-4xl sm:text-6xl',
  };

  const isPlaceholder = imageError || !src || src.includes('unsplash.com') || src.includes('placeholder');

  return (
    <div className={`relative group flex items-center justify-center ${className}`}>
      
      {/* Container Frame */}
      <div className={`relative rounded-full p-[3px] bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 shadow-2xl shadow-blue-500/20 overflow-hidden ${sizeClasses[size]}`}>
        
        {/* If image loads successfully and isn't placeholder */}
        {!isPlaceholder ? (
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f29] relative">
            <img
              src={src}
              alt={name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover rounded-full filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-40" />
          </div>
        ) : (
          /* High-Tech Stylish Vector Avatar Placeholder */
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0a1128] via-[#080d26] to-[#050816] flex flex-col items-center justify-center relative overflow-hidden border border-cyan-500/30 p-4">
            
            {/* Ambient Animated Glowing Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0,transparent_70%)] animate-pulse" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />
            
            {/* Floating Geometric Lines */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:16px_16px]" />

            {/* Core Animated Icon / Initials */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:scale-110 transition-transform duration-300">
                <span className="font-extrabold tracking-wider bg-gradient-to-r from-blue-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent font-mono">
                  {initials}
                </span>
              </div>

              {size === 'hero' && (
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-cyan-300 text-xs font-mono font-medium">
                    <Sparkles className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                    <span>PROFILE AVATAR</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">Place profile image at <code className="text-cyan-300 bg-white/5 px-1 py-0.5 rounded">assets/profile.jpg</code></p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Upload/Replace Overlay Badge */}
      {showUploadBadge && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleBadgeClick}
            className="absolute -bottom-2 right-4 px-3 py-1.5 rounded-full bg-[#0a1128] border border-cyan-500/50 text-cyan-300 hover:text-white hover:bg-cyan-600 hover:border-cyan-400 text-xs font-mono font-semibold flex items-center gap-1.5 shadow-xl transition-all hover:scale-105 z-20 group/badge"
            title="Replace profile image"
          >
            <Upload className="w-3.5 h-3.5 group-hover/badge:animate-bounce" />
            <span className="hidden sm:inline">Upload Image</span>
          </button>
        </>
      )}

    </div>
  );
};

export default ProfileAvatar;
