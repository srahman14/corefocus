import PomdoroTimer from "../Pomdoro/PomdoroTimer";
export default function FocusCamp() {
  return (
    <div className="bg-gradient-to-br from-[#13153F] via-[#110E2D] to-[#070C2F] rounded-xl shadow-md transition p-6 text-white min-h-[200px]">
      <h2 className="text-xl font-semibold mb-2">Focus Camp</h2>
      <PomdoroTimer />
    </div>
  );
}
