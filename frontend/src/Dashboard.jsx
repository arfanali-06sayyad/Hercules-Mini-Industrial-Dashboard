import { useState, useEffect } from 'react';
import { Activity, Zap, Droplets, Gauge, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

export default function Dashboard() {
  const [currentKpi, setCurrentKpi] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/kpis');
        if (response.ok) {
          const rawData = await response.json();
          
          if (rawData.length > 0) {
            // Grab the absolute latest row of data for the KPI cards
            const latest = rawData[rawData.length - 1];
            setCurrentKpi(latest);
            
            // Grab the last 24 hours for the chart, force to Number to prevent crashing
            const last24h = rawData.slice(-24).map(item => ({
              time: String(item.timestamp).split(' ')[1].substring(0, 5),
              throughput: Number(item.throughput_kgph) || 0,
              target: 15000
            }));
            setChartData(last24h);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []); // Removed dateRange dependency so it just flows the raw data

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-700 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Plant Performance Analytics</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Live Operational State & 24-Hour Trends</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border shadow-sm bg-emerald-50 border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-bold tracking-wider text-emerald-700">SYNCED</span>
        </div>
      </div>

      {currentKpi ? (
        <div className="flex flex-col gap-6">
          
          {/* TOP ROW: 4 Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Yield */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-40 transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Extraction Yield</span>
                <div className="p-2 bg-blue-50 rounded-xl"><Activity size={16} className="text-blue-600" /></div>
              </div>
              <div className="text-4xl font-black text-slate-800 tracking-tighter">
                {(Number(currentKpi.extraction_yield_pct) || 0).toFixed(1)}<span className="text-2xl text-slate-400 font-medium">%</span>
              </div>
            </div>

            {/* Throughput */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-40 transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Throughput</span>
                <div className="p-2 bg-indigo-50 rounded-xl"><Gauge size={16} className="text-indigo-600" /></div>
              </div>
              <div className="text-4xl font-black text-slate-800 tracking-tighter">
                {(Number(currentKpi.throughput_kgph) || 0).toFixed(0)}<span className="text-2xl text-slate-400 font-medium"> kg/h</span>
              </div>
            </div>

            {/* Moisture */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-40 transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Moisture Level</span>
                <div className="p-2 bg-cyan-50 rounded-xl"><Droplets size={16} className="text-cyan-600" /></div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-4xl font-black text-slate-800 tracking-tighter">
                  {(Number(currentKpi.moisture_pct) || 0).toFixed(2)}<span className="text-2xl text-slate-400 font-medium">%</span>
                </div>
                {(Number(currentKpi.moisture_pct) || 0) > 13.0 ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md"><AlertTriangle size={12}/> HIGH</span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md"><CheckCircle2 size={12}/> OK</span>
                )}
              </div>
            </div>

            {/* Energy */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-40 transition-transform hover:-translate-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Energy Intensity</span>
                <div className="p-2 bg-purple-50 rounded-xl"><Zap size={16} className="text-purple-600" /></div>
              </div>
              <div className="text-4xl font-black text-slate-800 tracking-tighter">
                {(Number(currentKpi.energy_intensity_proxy) || 0).toFixed(2)}<span className="text-2xl text-slate-400 font-medium"> kWh/t</span>
              </div>
            </div>

          </div>

          {/* MIDDLE ROW: 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* The Main Chart */}
            <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="mb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-slate-800">24-Hour Production Trend</h3>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">Output vs. Capacity Limit</p>
                </div>
              </div>
              
              <div className="w-full h-[300px]">
                <LineChart width={750} height={300} data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} minTickGap={30} />
                  {/* FORCED DOMAIN SO CHART ALWAYS RENDERS EVEN WITH 0s */}
                  <YAxis domain={[0, 18000]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <ReferenceLine y={15000} stroke="#94a3b8" strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="throughput" stroke="#0ea5e9" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </div>
            </div>

            {/* Shift Analytics (Restored Visuals) */}
            <div className="lg:col-span-4 bg-[#0f172a] p-6 rounded-2xl shadow-lg flex flex-col justify-between text-white relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
              
              <div className="z-10">
                <h3 className="text-lg font-black text-white">Shift Efficiency</h3>
                <p className="text-xs font-medium text-slate-400 mt-1">Current operational shift performance</p>
              </div>
              
              <div className="mt-8 space-y-6 z-10">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-300">Target Attainment</span>
                    <span className="text-emerald-400">92%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-300">OEE Score (Est.)</span>
                    <span className="text-blue-400">78%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 z-10">
                <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">AI INSIGHT</p>
                <p className="text-sm font-medium text-slate-200">
                  Throughput is stabilizing. If current parameters hold, shift target will be met 45 minutes early.
                </p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 font-bold tracking-widest text-xs uppercase flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full animate-spin"></span>
            Syncing Historian Database...
          </div>
        </div>
      )}
    </div>
  );
}