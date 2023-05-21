import { useState } from "preact/hooks";

/** Props for Setup component */
interface SetupProps {
    /** Function to reset the puzzle */
    reset: (bufferSize: number, gridSize: number) => void;
}

/** Component for setting up the puzzle */
export function Setup(props: SetupProps) {
    const [bufferSize, setBufferSize] = useState(4);
    const [gridSize, setGridSize] = useState(5);

    return (
        <div class="card mb-3">
            <div class="card-header">
                <h5 class="mb-1">Set Up</h5>
            </div>
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-4">
                        <label for="bufferSize" class="col-form-label">
                            Buffer Size
                        </label>
                    </div>
                    <div class="col-md-8">
                        <input
                            type="number"
                            class="form-control"
                            id="bufferSize"
                            min="3"
                            max="10"
                            value={bufferSize}
                            onInput={(e) =>
                                setBufferSize(
                                    parseInt(
                                        (e.target as HTMLInputElement).value
                                    )
                                )
                            }
                        />
                        <div class="form-text">
                            The size of your Cyberdeck's buffer. This is the
                            maximum number of characters you can enter to solve
                            the puzzle.
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <label for="gridSize" class="col-form-label">
                            Grid Size
                        </label>
                    </div>
                    <div class="col-md-8">
                        <input
                            type="number"
                            class="form-control"
                            id="gridSize"
                            min="3"
                            max="10"
                            value={gridSize}
                            onInput={(e) =>
                                setGridSize(
                                    parseInt(
                                        (e.target as HTMLInputElement).value
                                    )
                                )
                            }
                        />
                        <div class="form-text">
                            The size of the grid. This is the number of columns
                            and rows in the puzzle.
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end mt-4">
                    <button
                        class="btn btn-primary"
                        onClick={() => props.reset(bufferSize, gridSize)}
                    >
                        Apply and Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
