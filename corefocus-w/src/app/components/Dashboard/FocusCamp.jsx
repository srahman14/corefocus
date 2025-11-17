import PomdoroTimer from "../Pomdoro/PomdoroTimer";
export default function FocusCamp() {
  return (
    <div className="bg-gradient-to-br from-[#C0AFE2] via-[#CEC2EB] to-[#C0AFE2] dark:from-[#13153F] dark:via-[#110E2D] dark:to-[#070C2F] rounded-xl shadow-md transition p-2 sm:p-3 md:p-4 text-white w-full min-h-[150px] sm:min-h-[180px] md:min-h-[200px]">
      <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3">Focus Camp</h2>
      <PomdoroTimer />
    </div>
  );
}
