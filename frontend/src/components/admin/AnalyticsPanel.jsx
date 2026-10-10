const MOCK_SEARCHES = [
    { term: 'Ilish', count: 428, trend: '+12%' },
    { term: 'Prawns', count: 356, trend: '+8%' },
    { term: 'Rui', count: 284, trend: '-3%' },
    { term: 'Bhetki', count: 215, trend: '+15%' },
    { term: 'Crab', count: 189, trend: '+2%' },
]

export default function AnalyticsPanel() {
    return (
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl-3xl p-6 h-full shadow-2xl">
            <h2 className="text-xl font-fraunces font-medium tracking-wide text-white mb-6">Top Search Queries</h2>

            <div className="space-y-4">
                {MOCK_SEARCHES.map((search, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/80 font-semibold text-sm border border-white/10">
                                #{index + 1}
                            </div>
                            <div>
                                <p className="font-medium text-white/90">{search.term}</p>
                                <p className="text-[10px] text-white/50 font-bold tracking-wider uppercase mt-1">{search.count} searches</p>
                            </div>
                        </div>
                        <div className={`text-sm tracking-wide font-bold ${search.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {search.trend}
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-3.5 rounded-2xl border border-white/10 text-white/70 font-semibold tracking-wide hover:bg-white/10 hover:text-white transition-colors shadow-sm">
                Export Full Report
            </button>
        </div>
    )
}
