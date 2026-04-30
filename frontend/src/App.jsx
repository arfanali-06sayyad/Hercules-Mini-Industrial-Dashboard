import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import BatchCalendar from './BatchCalendar';
import HistoricalReports from './HistoricalReports';
import RawData from './RawData';
import Settings from './Settings';
import { LayoutDashboard, CalendarDays, LineChart, Database, Settings as SettingsIcon, LogOut } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-[#f6faff] text-[#141d23] font-sans">
        
        {/* Sidebar */}
        <aside className="w-64 bg-[#ecf5fe] border-r border-[#dbe4ed] flex flex-col h-full shrink-0">
          
          {/* Logo Area */}
          <div className="p-6 pb-2">
            <h2 className="text-2xl font-black text-[#003f87] tracking-tight">HERCULES</h2>
            <p className="text-xs font-bold text-[#727784] uppercase tracking-widest mt-1">Milling Facility</p>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            <Link to="/" className="flex items-center gap-3 px-4 py-3 bg-[#bbd0ff] text-[#001736] rounded-lg font-bold shadow-sm">
              <LayoutDashboard size={20} /> Live Dashboard
            </Link>
            <Link to="/calendar" className="flex items-center gap-3 px-4 py-3 text-[#424752] hover:bg-[#dbe4ed] rounded-lg font-medium transition-colors">
              <CalendarDays size={20} /> Batch Calendar
            </Link>
            <Link to="/reports" className="flex items-center gap-3 px-4 py-3 text-[#424752] hover:bg-[#dbe4ed] rounded-lg font-medium transition-colors">
              <LineChart size={20} /> Historical Reports
            </Link>
            <Link to="/data" className="flex items-center gap-3 px-4 py-3 text-[#424752] hover:bg-[#dbe4ed] rounded-lg font-medium transition-colors">
              <Database size={20} /> Raw Data
            </Link>
          </nav>

          {/* VISUAL DATE FILTER (Non-functional Placeholder for Demo) */}
          <div className="p-5 border-t border-[#dbe4ed] bg-[#e1edf9]">
            <p className="text-xs font-bold text-[#003f87] uppercase tracking-widest mb-3">Global Date Filter</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#727784]">Start Date</label>
                <input 
                  type="date" 
                  defaultValue="2026-03-22"
                  className="w-full mt-1 px-3 py-2 bg-white border border-[#dbe4ed] rounded-md text-sm font-bold text-[#141d23] shadow-sm focus:outline-none focus:border-[#003f87]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#727784]">End Date</label>
                <input 
                  type="date" 
                  defaultValue="2026-04-21"
                  className="w-full mt-1 px-3 py-2 bg-white border border-[#dbe4ed] rounded-md text-sm font-bold text-[#141d23] shadow-sm focus:outline-none focus:border-[#003f87]"
                />
              </div>
            </div>
          </div>

          {/* Settings & User Profile */}
          <div className="p-4 border-t border-[#dbe4ed] bg-white">
            <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-[#424752] hover:bg-[#dbe4ed] rounded-lg font-medium transition-colors mb-2">
              <SettingsIcon size={20} /> System Settings
            </Link>
            <div className="flex items-center gap-3 px-4 py-3 bg-[#f6faff] rounded-lg border border-[#dbe4ed]">
              <div className="w-8 h-8 rounded-full bg-[#003f87] text-white flex items-center justify-center font-bold text-sm">
                AE
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#141d23]">A. Engineer</p>
                <p className="text-xs font-medium text-[#727784]">Plant Ops</p>
              </div>
              <LogOut size={16} className="text-[#727784] cursor-pointer hover:text-red-500 transition-colors" />
            </div>
          </div>

        </aside>

        {/* Main Content Router */}
        <main className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calendar" element={<BatchCalendar />} />
            <Route path="/reports" element={<HistoricalReports />} />
            <Route path="/data" element={<RawData />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

export default App;