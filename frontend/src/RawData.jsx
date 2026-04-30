export default function RawData() {
  return (
    <div className="p-6 bg-white rounded-xl border border-[#dbe4ed] shadow-sm font-mono text-xs text-[#424752]">
      <h2 className="text-2xl font-black text-[#141d23] mb-6 font-sans">Raw Data Stream</h2>
      <div className="bg-[#141d23] text-[#00ff41] p-4 rounded-lg overflow-auto h-96">
        <p>[15:35:01] SYS: Connected to PLC_Main_Controller</p>
        <p>[15:35:02] DATA: Batch_ID: HERC-9921 updated</p>
        <p>[15:35:03] WARN: Moisture sensor drift detected +0.02%</p>
        <p>[15:35:04] DATA: Throughput stabilized at 12400 kg/h</p>
      </div>
    </div>
  );
}