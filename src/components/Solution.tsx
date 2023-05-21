/** Props for the Solution component */
interface SolutionProps {
    /** The path through the grid */
    path: [x: number, y: number][];
    /** The size of the grid */
    size: number;
    /** The targets */
    targets: string[];
    /** The targets that were obtained */
    targetsHit: boolean[];
}

/** Component for displaying a card with the solution as a path through the
 * grid, and a list of targets that were hit. */
export function Solution({ path, size, targets, targetsHit }: SolutionProps) {
    return (
        <div class="card">
            <div class="card-header">
                <h5 class="mb-1">Solution</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-6">
                        {Array.from({ length: size }).map((_, y) => (
                            <div
                                class="d-flex align-items-center justify-content-center mb-1"
                                key={y}
                            >
                                {Array.from({ length: size }).map((_, x) => {
                                    const pos = path.findIndex(
                                        ([px, py]) => px === x && py === y
                                    );
                                    return (
                                        <div
                                            class="gridCell me-1 border d-flex justify-content-center align-items-center text-dark"
                                            key={x}
                                            style={{
                                                backgroundColor:
                                                    pos === -1
                                                        ? undefined
                                                        : `hsl(${
                                                              (pos * 280) /
                                                              path.length
                                                          }, 70%, 50%)`,
                                            }}
                                        >
                                            <span class="h4 mb-0">
                                                {pos === -1 ? "" : pos + 1}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                    <div class="col-lg-6">
                        <h4 class="mb-3">Targets Obtained</h4>
                        <div class="list-group">
                            {targets.map((target, i) => (
                                <div
                                    class={`list-group-item list-group-item-action ${
                                        targetsHit[i] ? "active" : ""
                                    }`}
                                    key={i}
                                >
                                    <i
                                        class={`bi me-2 ${
                                            targetsHit[i] ? "bi-check" : "bi-x"
                                        }`}
                                    ></i>
                                    {target}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
