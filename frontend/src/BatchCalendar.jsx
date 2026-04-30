export default function BatchCalendar() {
  return (
    <div className="p-6 bg-white rounded-xl border border-[#dbe4ed] shadow-sm">
      <h2 className="text-2xl font-black text-[#141d23] mb-6">Batch Calendar</h2>
      <div className="grid grid-cols-7 gap-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="text-center font-bold text-[#727784] text-xs uppercase p-2">{day}</div>
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="h-24 bg-[#f6faff] border border-[#dbe4ed] rounded-lg p-2 text-xs font-bold text-[#003f87]">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}