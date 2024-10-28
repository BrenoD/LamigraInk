'use client';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-16 h-16">
        {/* Anel externo (Saturno) */}
        <div className="absolute inset-0 border-4 border-orange-300 rounded-full animate-spin-slow"></div>
        
        {/* Planeta central */}
        <div className="absolute inset-4 bg-black rounded-full"></div>
      </div>
    </div>
  );
}