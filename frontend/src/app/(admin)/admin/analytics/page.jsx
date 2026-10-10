'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Faking backend request for the initial UI mockup 
// Later, this connects to the FastAPI backend `/api/admin/search-stats`
const mockAnalyticsData = {
  totalSearches: 4192,
  uniqueQueries: 843,
  conversionRate: '12.4%',
  avgTimeSpent: '04m 12s',
  repeatVisitors: '42%',
  deviceDistribution: [
    { type: 'Mobile', per: 65 },
    { type: 'Desktop', per: 28 },
    { type: 'Tablet', per: 7 },
  ],
  topCities: [
    { city: 'Kolkata', traffic: '45%' },
    { city: 'Mumbai', traffic: '18%' },
    { city: 'London', traffic: '12%' },
    { city: 'New York', traffic: '8%' },
    { city: 'Dubai', traffic: '6%' },
  ],
  mostViewedProducts: [
    { name: 'Jumbo Tiger Prawns', views: 1845 },
    { name: 'Fresh Salmon Fillet', views: 1432 },
    { name: 'Mud Crab', views: 980 },
    { name: 'Squid Rings', views: 765 },
    { name: 'Lobster Tails', views: 512 },
  ],
  topQueries: [
    { query: 'Tiger Prawns', count: 1204, conversions: 180 },
    { query: 'Crab Meat', count: 856, conversions: 110 },
    { query: 'Salmon fillet', count: 642, conversions: 85 },
    { query: 'Jumbo Shrimp', count: 421, conversions: 40 },
    { query: 'Lobster tails', count: 310, conversions: 25 },
  ],
  trends: [
    { day: 'Mon', searches: 400 },
    { day: 'Tue', searches: 520 },
    { day: 'Wed', searches: 480 },
    { day: 'Thu', searches: 610 },
    { day: 'Fri', searches: 800 },
    { day: 'Sat', searches: 950 },
    { day: 'Sun', searches: 432 },
  ]
};

const StatCard = ({ title, value, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="bg-[#0a1f2e]/30 backdrop-blur-[24px] border border-white/10 hover:border-white/30 hover:bg-[#0a1f2e]/40 rounded-2xl-3xl p-7 shadow-[0_16px_40px_rgba(0,0,0,0.6)] relative overflow-hidden group transition-all duration-500"
  >
    <div className="absolute top-0 right-0 p-5 opacity-10 group-hover:opacity-30 transition-opacity duration-500 text-[#c9a962]">
      {icon}
    </div>
    <h3 className="text-[#8a9bae] font-body text-xs uppercase tracking-[0.15em] font-semibold mb-3">{title}</h3>
    <p className="text-4xl text-[#f0ead6] font-heading font-medium tracking-wide drop-shadow-md">
      {value}
    </p>
    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#c9a962]/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
  </motion.div>
);

export default function SearchAnalyticsAdmin() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch live crunched tracking data from Python Backend
    const fetchRealAnalytics = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/analytics/admin/overview");
        if (response.ok) {
          const liveData = await response.json();
          setData(liveData);
          return;
        }
      } catch (err) {
        console.warn("Backend analytics API unreachable. Falling back to mock data.", err);
      }
      
      // Fallback to beautiful mock data if backend isn't running so UI doesn't break
      setData(mockAnalyticsData);
    };

    fetchRealAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a1f2e] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#c9a962]/20 border-t-[#c9a962] rounded-full animate-spin mb-4" />
        <p className="text-[#8a9bae] font-body text-sm tracking-widest uppercase animate-pulse">Loading Analytics Matrix...</p>
      </div>
    );
  }

  // Find max searches for chart scaling
  const maxDaySearches = Math.max(...data.trends.map(t => t.searches));

  const exportToCSV = () => {
    if (!data) return;
    
    // Create CSV content from data
    const headers = ['Metric', 'Value'];
    const summaryData = [
      ['Total Searches', data.totalSearches],
      ['Unique Queries', data.uniqueQueries],
      ['Conversion Rate', data.conversionRate]
    ];
    
    const queryHeaders = ['\nKeyword', 'Search Volume', 'Conversions'];
    const queryData = data.topQueries.map(q => [q.query, q.count, q.conversions]);
    
    const trendHeaders = ['\nDay', 'Search Volume'];
    const trendData = data.trends.map(t => [t.day, t.searches]);
    
    // Combine everything
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += headers.join(",") + "\n";
    summaryData.forEach(row => csvContent += row.join(",") + "\n");
    csvContent += queryHeaders.join(",") + "\n";
    queryData.forEach(row => csvContent += row.join(",") + "\n");
    csvContent += trendHeaders.join(",") + "\n";
    trendData.forEach(row => csvContent += row.join(",") + "\n");
    
    // Download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `WaveOfBengal_SearchAnalytics_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen text-[#f0ead6] font-body overflow-hidden">
      
      {/* Immersive Ocean Background Architecture */}
      <div className="absolute inset-0 z-0 bg-[#02070e] overflow-hidden">
        
        {/* 1. Base Image - Kept intact and visible but naturally blended into the depth */}
        <div className="absolute inset-0 opacity-85">
          <Image
            src="/images/bg/Underwater Image 4.jpeg"
            alt="Underwater Ocean Background"
            fill
            className="object-cover object-center scale-105"
            priority
            unoptimized
          />
        </div>

        {/* 2. Deep Ocean Gradient Overlay (Navy -> Teal -> Aqua) to provide luxurious oceanic color parity */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06111f]/80 via-[#0a2333]/40 to-[#184454]/30" />

        {/* 3. Extremely Slow Ambient Movement (Calm majestic sunset shimmer & deep current) */}
        <motion.div 
          animate={{ opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          className="absolute -top-20 -right-20 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#e5d099]/15 via-[#c9a962]/5 to-transparent pointer-events-none"
        />
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 opacity-40 bg-gradient-to-tr from-transparent via-[#1d4659]/30 to-transparent pointer-events-none"
          style={{ backgroundSize: '150% 150%' }}
        />

        {/* 4. Subtle Glassmorphism Layer Effect in sections (Backdrop Blur + Transparency on the edges) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(6,17,31,0.5)_110%)] backdrop-blur-[4px] pointer-events-none" />

        {/* 5. Depth Zones & Vignette for absolute foreground readability */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#020b14] to-transparent opacity-95 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#020b14]/70 to-transparent pointer-events-none" />
      </div>

      {/* Main Content Pane */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto p-4 md:p-10">
      
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-[#c9a962]/15 pb-6"
        >
          <div>
            <h1 className="text-4xl text-[#c9a962] font-heading font-light tracking-wide mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">Search Analytics</h1>
            <div className="inline-flex items-center bg-gradient-to-r from-white/10 to-[#0a1f2e]/40 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#c9a962] animate-pulse mr-3"></span>
              <p className="text-[#f0ead6] text-sm tracking-wider font-medium drop-shadow-md">Monitor customer intent and discover real-time seafood demand.</p>
            </div>
          </div>
          <button 
            onClick={exportToCSV}
            className="mt-6 md:mt-0 font-body text-xs uppercase tracking-[0.15em] font-bold py-3 px-8 rounded-2xl border border-[#c9a962]/30 text-[#c9a962] bg-black/20 hover:bg-[#c9a962]/20 backdrop-blur-md transition-all shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_25px_rgba(201,169,98,0.2)]"
          >
            Export CSV
          </button>
        </motion.div>

      {/* Top Level Metric Cards */}
      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard delay={0.1} title="Global Traffic" value={parseInt(data.totalSearches).toLocaleString()} icon={
          <svg className="w-24 h-24 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        } />
        <StatCard delay={0.2} title="Avg Time Spent" value={data.avgTimeSpent} icon={
          <svg className="w-24 h-24 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        } />
        <StatCard delay={0.3} title="Repeat Visitors" value={data.repeatVisitors} icon={
          <svg className="w-24 h-24 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        } />
        <StatCard delay={0.4} title="Avg. Conversion" value={data.conversionRate} icon={
          <svg className="w-24 h-24 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        } />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart (CSS Bar Chart using Framer Motion) */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="lg:col-span-2 bg-[#0a1f2e]/30 backdrop-blur-[24px] border border-white/10 rounded-2xl-3xl p-8 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
        >
          <h3 className="text-[#f0ead6] font-heading text-2xl font-medium tracking-wide mb-8 drop-shadow-sm">Weekly Search Velocity</h3>
          
          <div className="flex justify-between items-end h-[280px] pb-4 border-b border-[#c9a962]/10 gap-2">
            {data.trends.map((trend, i) => {
              const heightPercent = (trend.searches / maxDaySearches) * 100;
              return (
                <div key={trend.day} className="flex flex-col items-center justify-end h-full w-full group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0a1f2e] border border-[#c9a962]/20 text-[#c9a962] text-xs py-1 px-3 rounded-2xl shadow-lg pointer-events-none">
                    {trend.searches}
                  </div>
                  {/* Bar */}
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, type: "spring" }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-[#c9a962]/20 to-[#c9a962]/80 hover:to-[#d4b978] rounded-t- transition-colors cursor-pointer"
                  />
                  {/* Label */}
                  <span className="text-[#8a9bae] text-xs font-medium tracking-wider mt-4">{trend.day}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Keywords Table */}
        <motion.div 
           initial={{ opacity: 0, x: 20, y: 20 }}
           animate={{ opacity: 1, x: 0, y: 0 }}
           transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="bg-[#0a1f2e]/30 backdrop-blur-[24px] border border-white/10 rounded-2xl-3xl p-8 shadow-[0_16px_40px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[#f0ead6] font-heading text-2xl font-medium tracking-wide mb-6 drop-shadow-sm">Top Sea Queries</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between text-[#8a9bae] text-xs uppercase tracking-widest font-semibold pb-2 border-b border-[#c9a962]/10">
              <span>Keyword</span>
              <span className="text-right">Vol</span>
            </div>
            
            {data.topQueries.map((item, index) => (
              <motion.div 
                key={item.query}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1) }}
                className="group relative"
              >
                <div className="flex justify-between items-center py-2 relative z-10 transition-colors duration-300 group-hover:text-[#c9a962]">
                  <span className="text-[#f0ead6] group-hover:text-[#c9a962] text-[15px] tracking-wide font-medium transition-colors">{item.query}</span>
                  <span className="text-[#c9a962] font-semibold tracking-wider drop-shadow-md">{item.count.toLocaleString()}</span>
                </div>
                {/* Horizontal Progress Bar Background */}
                <div className="absolute bottom-0 left-0 h-full bg-[#c9a962]/10 rounded-2xl z-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
          </div>
          
          <button className="w-full mt-6 font-body text-xs uppercase tracking-[0.2em] font-bold py-3.5 border border-[#c9a962]/30 text-[#c9a962] bg-[#c9a962]/5 hover:bg-[#c9a962]/20 hover:border-[#c9a962]/80 transition-all rounded-2xl shadow-[0_0_15px_rgba(201,169,98,0.1)] hover:shadow-[0_0_20px_rgba(201,169,98,0.3)]">
            View Expanded Report
          </button>
        </motion.div>
      </div>
      
      {/* Product & User Demographics Data Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pb-12">
        
        {/* Most Viewed Products */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="bg-[#0a1f2e]/30 backdrop-blur-[24px] border border-white/10 rounded-2xl-3xl p-8 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
        >
          <h3 className="text-[#f0ead6] font-heading text-xl font-medium tracking-wide mb-6 drop-shadow-sm flex items-center gap-3">
            <svg className="w-5 h-5 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Most Viewed Products
          </h3>
          <div className="space-y-4">
            {data.mostViewedProducts.map((p, i) => (
              <div key={p.name} className="flex justify-between items-center group relative border-b border-white/5 pb-3">
                <span className="text-[#8a9bae] group-hover:text-[#f0ead6] transition-colors">{i+1}. {p.name}</span>
                <span className="text-[#c9a962] font-semibold">{p.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* City Leaderboard */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="bg-[#0a1f2e]/30 backdrop-blur-[24px] border border-white/10 rounded-2xl-3xl p-8 shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
        >
          <h3 className="text-[#f0ead6] font-heading text-xl font-medium tracking-wide mb-6 drop-shadow-sm flex items-center gap-3">
             <svg className="w-5 h-5 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Traffic by Location
          </h3>
          <div className="space-y-3">
            {data.topCities.map((c, i) => (
              <div key={c.city} className="flex justify-between items-center bg-white/5 rounded-2xl px-4 py-3 border border-white/5 hover:bg-white/10 transition-colors">
                <span className="text-[#f0ead6] tracking-wide">{c.city}</span>
                <span className="text-[#c9a962] font-semibold">{c.traffic}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Device Matrix */}
        <motion.div 
           initial={{ opacity: 0, x: 20, y: 20 }}
           animate={{ opacity: 1, x: 0, y: 0 }}
           transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
           className="bg-[#0a1f2e]/30 backdrop-blur-[24px] border border-white/10 rounded-2xl-3xl p-8 shadow-[0_16px_40px_rgba(0,0,0,0.6)] flex flex-col justify-start"
        >
          <div>
            <h3 className="text-[#f0ead6] font-heading text-xl font-medium tracking-wide mb-8 drop-shadow-sm flex items-center gap-3">
               <svg className="w-5 h-5 text-[#c9a962]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              Device Breakdown
            </h3>
            <div className="space-y-7">
              {data.deviceDistribution.map((d, i) => (
                <div key={d.type}>
                  <div className="flex justify-between text-xs tracking-wider mb-2">
                    <span className="text-[#8a9bae] uppercase font-bold">{d.type}</span>
                    <span className="text-[#c9a962] font-bold">{d.per}%</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${d.per}%` }}
                      transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#c9a962]/50 to-[#c9a962] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
      
      </div>
    </div>
  );
}
