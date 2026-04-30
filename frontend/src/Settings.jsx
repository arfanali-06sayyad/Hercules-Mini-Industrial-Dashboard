export default function Settings() {
  return (
    <div className="p-6 bg-white rounded-xl border border-[#dbe4ed] shadow-sm">
      <h2 className="text-2xl font-black text-[#141d23] mb-6">System Settings</h2>
      <div className="space-y-6">
        <div className="flex justify-between items-center py-4 border-b border-[#dbe4ed]">
          <span className="font-bold">Unit Preference</span>
          <select className="bg-[#f6faff] p-2 rounded border border-[#dbe4ed] font-bold text-[#003f87]">
            <option>Metric (kg)</option>
            <option>Imperial (lbs)</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold">Dark Mode</span>
          <input type="checkbox" className="w-6 h-6 rounded bg-[#ecf5fe] border-[#bbd0ff]" />
        </div>
      </div>
    </div>
  );
}