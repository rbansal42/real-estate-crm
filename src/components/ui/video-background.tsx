"use client"

interface VideoBackgroundProps {
  src: string
  poster?: string
  overlay?: boolean
  overlayClassName?: string
}

export function VideoBackground({ src, poster = "/video-poster.png", overlay = true, overlayClassName = "bg-black/50" }: VideoBackgroundProps) {
  return (
    <div className="absolute inset-0 z-[1]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-50 transition-opacity duration-1000"
        poster={poster}
        onLoadedData={(e) => {
          const target = e.target as HTMLVideoElement
          target.classList.remove('opacity-50')
          target.classList.add('opacity-100')
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {overlay && <div className={`absolute inset-0 ${overlayClassName}`} />}
    </div>
  )
} 