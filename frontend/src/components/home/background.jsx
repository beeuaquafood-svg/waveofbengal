export default function Background() {
    return (
        <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            >
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
            {/* Adding an overlay to ensure text readability */}
            <div className="absolute inset-0 bg-sky-light/85"></div>
        </div>
    );
}
