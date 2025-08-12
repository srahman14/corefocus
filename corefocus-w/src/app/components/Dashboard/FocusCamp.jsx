import PomdoroTimer from "../Pomdoro/PomdoroTimer";
export default function FocusCamp() {
  return (
    <div className="bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#13153F] dark:via-[#110E2D] dark:to-[#070C2F] rounded-xl shadow-md transition p-6 text-white min-h-[200px]">
      <h2 className="text-xl font-semibold mb-2">Focus Camp</h2>
      <PomdoroTimer />
    </div>
  );
}
