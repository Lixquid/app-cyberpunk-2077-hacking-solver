/** Props for the HelpDialog component */
interface HelpDialogProps {
    /** Callback to close the dialog */
    close: () => void;
}

const gameScreenshot = new URL("../assets/gameScreenshot.png", import.meta.url);
const uiScreenshot = new URL("../assets/uiScreenshot.png", import.meta.url);

/** Help dialog component */
export function HelpDialog(props: HelpDialogProps) {
    return (
        <>
            <div class="modal modal-xl d-block" role="dialog">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title">Help</h3>
                            <button
                                type="button"
                                class="btn-close"
                                aria-label="Close"
                                onClick={props.close}
                            />
                        </div>
                        <div class="modal-body">
                            <p>
                                This app helps you solve the hacking mini-game
                                in Cyberpunk 2077.
                            </p>
                            <h2 id="how-to-use">How to use</h2>
                            <ol>
                                <li>
                                    Enter your buffer size in the{" "}
                                    <em>Buffer Size</em> field.
                                </li>
                                <li>
                                    Enter the width / height of the grid in the{" "}
                                    <em>Grid Size</em> field.
                                </li>
                                <li>
                                    Click the{" "}
                                    <span class="badge bg-primary">
                                        Apply and Reset
                                    </span>{" "}
                                    button.
                                </li>
                                <li>
                                    Enter the <em>first</em> letter of each cell
                                    in the corresponding spot in the{" "}
                                    <em>Grid</em> section.
                                    <ul>
                                        <li>
                                            For example, if the first row of the
                                            grid is{" "}
                                            <code>1C 55 55 BD E9 7A</code>, you
                                            would enter 1, 5, 5, B, E, 7 in the
                                            first row of the <em>Grid</em>{" "}
                                            section.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Enter each available target by only taking
                                    the <em>first</em> letter of each part of
                                    the target in the <em>Targets</em> section.
                                    <ul>
                                        <li>
                                            For example, if the target is{" "}
                                            <code>E9 1C E9</code>, you would
                                            enter E1E in the textbox.
                                        </li>
                                        <li>
                                            You can add more targets by clicking
                                            the <em>Add Target</em> button.
                                        </li>
                                        <li>
                                            You can remove targets by clicking
                                            the <i class="bi-trash" /> button to
                                            the right of the textbox.
                                        </li>
                                        <li>
                                            If you don't want a target to be
                                            included in the calculation, you can
                                            uncheck the checkbox to the left of
                                            the textbox.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    Click the{" "}
                                    <span class="badge bg-primary">Solve</span>{" "}
                                    button.
                                </li>
                            </ol>
                            <h2 id="reading-the-solution">
                                Reading the Solution
                            </h2>
                            <ul>
                                <li>
                                    The grid on the left contains order of cells
                                    to click, in ascending order.
                                </li>
                                <li>
                                    The <em>Targets Obtained</em> section
                                    details which targets were obtained by
                                    clicking the cells in the grid; if it&#39;s
                                    not possible to obtain every target, targets
                                    will be left out starting from the top of
                                    the list.
                                </li>
                            </ul>
                            <h2 id="an-example">An Example</h2>
                            <p>For this game:</p>
                            <p>
                                <img
                                    src={gameScreenshot.toString()}
                                    alt="Example Game"
                                    class="img-fluid border rounded"
                                />
                            </p>
                            <p>We would enter the following information:</p>
                            <p>
                                <img
                                    src={uiScreenshot.toString()}
                                    alt="Example Input"
                                    class="img-fluid border rounded"
                                />
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                onClick={props.close}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" />
        </>
    );
}
