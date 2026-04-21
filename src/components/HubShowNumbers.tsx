import { Eye, EyeOff } from "lucide-react";

interface HubShowNumbersProps {
    number: string;
    state: boolean;
    changeState: (state: boolean) => void;
    formatNumber: (number: string) => string;
}

export default function HubShowNumbers({number, state, changeState, formatNumber}: HubShowNumbersProps) {
  return (
    <>
      {state ? number : formatNumber(number)}
      <span onClick={() => changeState(!state)}>
        {!state ? (
          <Eye strokeWidth={0.7} className="show"></Eye>
        ) : (
          <EyeOff strokeWidth={0.7} className="show"></EyeOff>
        )}
      </span>
    </>
  );
}
