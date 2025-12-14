import type { Dispatch, SetStateAction } from "react";

import { tipOptions } from "../data/tips";

type TipFormProps = {
    tip: number;
    setTip: Dispatch<SetStateAction<number>>;
}

export default function TipForm({ tip, setTip }: TipFormProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Propinas</h2>

            <div className="grid grid-cols-3">
                {tipOptions.map((option) => (
                    <div key={option}>
                        <label className="space-x-2">
                            <input onChange={(e) => setTip(parseFloat(e.target.value))} id={`tip-${option}`} value={option} type="radio" name="tip-radio" checked={tip === option} />
                            <span>{option}%</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}
