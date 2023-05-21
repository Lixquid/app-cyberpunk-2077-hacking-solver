import { useState } from "preact/hooks";

/** Props for the Targets component */
interface TargetsProps {
    /** Function to set the targets */
    setTargets: (targets: string[]) => void;
}

/** Component for displaying a card with the targets */
export function Targets(props: TargetsProps) {
    const [targets, setTargets] = useState([""]);
    const [targetsEnabled, setTargetsEnabled] = useState([true]);

    return (
        <div class="card">
            <div class="card-header">
                <h5 class="mb-1">Targets</h5>
            </div>
            <div class="card-body">
                <div class="card">
                    <ul class="list-group list-group-flush">
                        {targets.map((target, i) => (
                            <li class="list-group-item" key={i}>
                                <div class="input-group">
                                    <div class="input-group-text">
                                        <input
                                            type="checkbox"
                                            checked={targetsEnabled[i]}
                                            onChange={(e) => {
                                                const newTargetsEnabled = [
                                                    ...targetsEnabled,
                                                ];
                                                newTargetsEnabled[i] = (
                                                    e.target as HTMLInputElement
                                                ).checked;
                                                setTargetsEnabled(
                                                    newTargetsEnabled
                                                );
                                                props.setTargets(
                                                    targets.filter(
                                                        (_, j) =>
                                                            newTargetsEnabled[j]
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        class="form-control"
                                        value={target}
                                        onInput={(e) => {
                                            const newTargets = [...targets];
                                            newTargets[i] = (
                                                e.target as HTMLInputElement
                                            ).value;
                                            setTargets(newTargets);
                                            props.setTargets(
                                                newTargets.filter(
                                                    (_, j) => targetsEnabled[j]
                                                )
                                            );
                                        }}
                                    />
                                    <button
                                        class="btn btn-outline-danger"
                                        type="button"
                                        onClick={() => {
                                            const newTargets = targets.filter(
                                                (_, j) => j !== i
                                            );
                                            setTargets(newTargets);
                                            props.setTargets(
                                                newTargets.filter(
                                                    (_, j) => targetsEnabled[j]
                                                )
                                            );
                                        }}
                                        title="Remove Target"
                                    >
                                        <i class="bi-trash"></i>
                                    </button>
                                </div>
                            </li>
                        ))}
                        <li class="list-group-item">
                            <button
                                type="button"
                                class="btn btn-outline-success w-100"
                                onClick={() => {
                                    const newTargets = [...targets, ""];
                                    setTargets(newTargets);
                                    setTargetsEnabled([
                                        ...targetsEnabled,
                                        true,
                                    ]);
                                    props.setTargets(
                                        newTargets.filter(
                                            (_, j) => targetsEnabled[j] ?? true
                                        )
                                    );
                                }}
                            >
                                <i class="bi-plus me-1"></i>
                                Add Target
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
