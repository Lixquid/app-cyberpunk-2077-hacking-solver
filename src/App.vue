<template>
    <div class="container my-5 mx-auto">
        <h1 class="mb-5">
            Cyberpunk 2077 Hacking Solver
            <a
                href="https://lixquid.com"
                class="float-end btn btn-outline-primary"
            >
                lixquid.com
            </a>
        </h1>

        <div class="row">
            <label for="size" class="col-sm-4 col-form-label">Size</label>
            <div class="col-sm">
                <input
                    type="number"
                    class="form-control"
                    id="size"
                    min="4"
                    max="10"
                    step="1"
                    :value="size"
                    @input="setSize"
                />
            </div>
        </div>
        <div class="row">
            <label for="buffer" class="col-sm-4 col-form-label"
                >Buffer Size</label
            >
            <div class="col-sm">
                <input
                    type="number"
                    min="4"
                    max="20"
                    step="1"
                    v-model.number="buffer"
                    class="form-control"
                    id="buffer"
                />
            </div>
        </div>

        <div class="row">
            <div class="col-lg">
                <div v-for="y in size" :key="y">
                    <input
                        v-for="x in size"
                        :key="x"
                        v-model="grid[x - 1][y - 1]"
                        style="width: 3em"
                    />
                </div>
            </div>
            <div class="col">
                <ul>
                    <li v-for="(_, i) in sequences" :key="i">
                        <input v-model="sequences[i]" />
                        <button
                            class="btn btn-outline-danger"
                            @click.passive="sequences.splice(i, i)"
                        >
                            &times;
                        </button>
                    </li>
                    <li>
                        <button
                            class="btn btn-success"
                            @click.passive="sequences.push('')"
                        >
                            Add
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <button class="btn btn-primary" @click.passive="solve">Solve</button>
        <pre>
            {{ output }}
            </pre
        >
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { solveSequences } from "./lib/util";

export default defineComponent({
    setup() {
        const size = ref(5);
        const clean = ref(true);
        const buffer = ref(4);
        const grid = ref<string[][]>([
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""]
        ]);
        const sequences = ref([""]);
        const output = ref("");

        function setSize(ev: InputEvent) {
            if (
                clean.value ||
                confirm("Changing size will reset inputs! Are you sure?")
            ) {
                size.value = parseInt((ev.target as HTMLInputElement).value);
                clean.value = true;
                grid.value = [];
                for (let x = 0; x < size.value; x++) {
                    grid.value[x] = [];
                    for (let y = 0; y < size.value; y++) {
                        grid.value[x][y] = "";
                    }
                }
            }
        }

        function solve() {
            const solution = solveSequences(
                grid.value,
                sequences.value,
                buffer.value
            );
            output.value = JSON.stringify(solution);
        }

        return { size, setSize, grid, buffer, sequences, solve, output };
    }
});
</script>
