import { useEffect, useState } from "preact/hooks";
import { Grid } from "./components/Grid";
import { HelpDialog } from "./components/HelpDialog";
import { Setup } from "./components/Setup";
import { Solution } from "./components/Solution";
import { Targets } from "./components/Targets";
import "./lib/util";
import { solveBest } from "./lib/util";

/** Toggles bootstrap theme between light and dark */
function toggleDarkMode() {
    const html = document.querySelector("html");
    if (html !== null) {
        html.dataset.bsTheme =
            html.dataset.bsTheme === "dark" ? "light" : "dark";
    }
}

export function App() {
    const [showHelp, setShowHelp] = useState(false);

    const [bufferSize, setBufferSize] = useState(4);
    const [gridSize, setGridSize] = useState(5);
    const [grid, setGrid] = useState<string[]>([]);
    const [targets, setTargets] = useState<string[]>([""]);
    const [solution, setSolution] = useState<{
        path: [x: number, y: number][];
        targetsHit: boolean[];
    } | null>(null);

    // Resize the grid when the gridSize changes
    useEffect(() => {
        setGrid(Array(gridSize * gridSize).fill(""));
    }, [gridSize]);

    return (
        <div class="container mx-auto my-5">
            <div class="d-flex justify-content-between align-items-center mb-5 flex-wrap">
                <h1>Cyberpunk 2077 Hacking Solver</h1>
                <div>
                    <button
                        class="btn btn-outline-secondary me-2"
                        onClick={toggleDarkMode}
                        title="Toggle dark mode"
                    >
                        <i class="bi bi-moon-fill" />
                    </button>
                    <button
                        class="btn btn-info me-2"
                        onClick={() => setShowHelp(true)}
                    >
                        <i class="bi bi-question-circle me-2" />
                        Help
                    </button>
                    <a
                        href="https://lixquid.com"
                        class="btn btn-outline-primary float-end"
                    >
                        <i class="bi bi-box-arrow-up-right me-2" />
                        lixquid.com
                    </a>
                </div>
            </div>
            <Setup
                reset={(b, g) => {
                    setBufferSize(b);
                    setGridSize(g);
                    setSolution(null);
                }}
            />
            <div class="row mb-5">
                <div class="col-lg-6">
                    <Grid grid={grid} setGrid={setGrid} size={gridSize} />
                </div>
                <div class="col-lg-6">
                    <Targets setTargets={setTargets} />
                    <button
                        class="btn btn-primary mt-3"
                        onClick={() => {
                            const solution = solveBest(
                                grid,
                                gridSize,
                                targets,
                                bufferSize
                            );
                            if (!solution) return;
                            setSolution({
                                path: solution.actions,
                                targetsHit: solution.found,
                            });
                        }}
                    >
                        Solve
                    </button>
                </div>
            </div>
            {solution !== null && (
                <Solution
                    path={solution.path}
                    targetsHit={solution.targetsHit}
                    size={gridSize}
                    targets={targets}
                />
            )}
            {showHelp && <HelpDialog close={() => setShowHelp(false)} />}
            <div class="mt-5 text-end">
                <a href="https://github.com/lixquid/app-cyberpunk-2077-hacking-solver">
                    <i class="bi bi-box-arrow-up-right me-2" />
                    Source code
                </a>
            </div>
        </div>
    );
}
