import { useState } from "preact/hooks";

/** Props for Grid component */
interface GridProps {
    /** The size of the grid */
    size: number;
    /** The grid */
    grid: string[];
    /** Function to set the grid */
    setGrid: (grid: string[]) => void;
}

/** Component for displaying a card with the grid */
export function Grid({ grid, size, setGrid }: GridProps) {
    const [autoMove, setAutoMove] = useState(true);

    return (
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-1">Grid</h5>
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="autoMove"
                        checked={autoMove}
                        onChange={(e) =>
                            setAutoMove((e.target as HTMLInputElement).checked)
                        }
                    />
                    <label class="form-check-label" for="autoMove">
                        Auto Move
                        <i
                            class="bi-question-circle ms-2 text-info"
                            title="When enabled, typing a character will automatically move to the next cell, and arrow keys can be used to move around the grid."
                        />
                    </label>
                </div>
            </div>
            <div class="card-body">
                {Array.from({ length: size }).map((_, i) => (
                    <div
                        class="d-flex align-items-center justify-content-center mb-1"
                        key={i}
                    >
                        {Array.from({ length: size }).map((_, j) => (
                            <input
                                key={j}
                                type="text"
                                class="form-control text-center gridCell me-1"
                                maxLength={1}
                                data-index={i * size + j}
                                value={grid[i * size + j]}
                                onInput={(e) => {
                                    const newGrid = [...grid];
                                    newGrid[i * size + j] = (
                                        e.target as HTMLInputElement
                                    ).value;
                                    setGrid(newGrid);
                                }}
                                onKeyUp={(e) => {
                                    if (!autoMove) return;
                                    const idx = i * size + j;
                                    switch (e.key) {
                                        case "ArrowUp":
                                            // Focus the cell above
                                            if (i > 0) {
                                                const cell =
                                                    document.querySelector(
                                                        `.gridCell[data-index="${Math.max(
                                                            0,
                                                            idx - size
                                                        )}"]`
                                                    ) as HTMLInputElement;
                                                cell.focus();
                                            }
                                            e.preventDefault();
                                            break;
                                        case "ArrowDown":
                                            // Focus the cell below
                                            if (i < size - 1) {
                                                const cell =
                                                    document.querySelector(
                                                        `.gridCell[data-index="${Math.min(
                                                            size * size - 1,
                                                            idx + size
                                                        )}"]`
                                                    ) as HTMLInputElement;
                                                cell.focus();
                                            }
                                            e.preventDefault();
                                            break;
                                        case "ArrowLeft":
                                            // Focus the cell to the left
                                            if (idx > 0) {
                                                const cell =
                                                    document.querySelector(
                                                        `.gridCell[data-index="${
                                                            idx - 1
                                                        }"]`
                                                    ) as HTMLInputElement;
                                                cell.focus();
                                            }
                                            e.preventDefault();
                                            break;
                                        case "ArrowRight":
                                            // Focus the cell to the right
                                            if (idx < size * size - 1) {
                                                const cell =
                                                    document.querySelector(
                                                        `.gridCell[data-index="${
                                                            idx + 1
                                                        }"]`
                                                    ) as HTMLInputElement;
                                                cell.focus();
                                            }
                                            e.preventDefault();
                                            break;
                                        default:
                                            // If it's an alphanumeric character, focus the next cell
                                            if (
                                                /^[a-zA-Z0-9]$/.test(e.key) &&
                                                idx < size * size - 1
                                            ) {
                                                const cell =
                                                    document.querySelector(
                                                        `.gridCell[data-index="${
                                                            idx + 1
                                                        }"]`
                                                    ) as HTMLInputElement;
                                                cell.focus();
                                            }
                                    }
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
