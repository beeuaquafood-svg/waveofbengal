export default function StatCard({ title, value, trend, trendUp, icon }) {
    return (
        <div className="p-6 rounded-2xl-3xl bg-black/40 backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-white/60 text-xs font-semibold tracking-wider mb-1 uppercase">{title}</p>
                    <h3 className="text-3xl font-playfair font-medium tracking-wide text-white">{value}</h3>
                </div>
                <div className="p-3 text-white/80">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
                    </svg>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm">
                <span className={`font-semibold px-2.5 py-1 rounded-2xl flex items-center gap-1.5 ${trendUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={trendUp ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                    </svg>
                    {trend}
                </span>
                <span className="text-white/40 tracking-wide">vs last month</span>
            </div>
        </div>
    )
}
