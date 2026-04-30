export default function HistoricalReports() {
  return (
    <div className="p-6 bg-white rounded-xl border border-[#dbe4ed] shadow-sm">
      <h2 className="text-2xl font-black text-[#141d23] mb-6">Historical Data Reports</h2>
      <div className="space-y-4">
        <button className="w-full text-left p-4 border border-[#dbe4ed] rounded-lg hover:bg-[#ecf5fe] font-bold">Q1 2026 Performance Summary</button>
        <button className="w-full text-left p-4 border border-[#dbe4ed] rounded-lg hover:bg-[#ecf5fe] font-bold">Energy Intensity Audit - March</button>
        <button className="w-full text-left p-4 border border-[#dbe4ed] rounded-lg hover:bg-[#ecf5fe] font-bold">Moisture Trend Analysis</button>
      </div>
    </div>
  );
}