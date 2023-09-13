import { writable, type Writable } from "svelte/store";

export enum PixelType {
	"None",
	"White",
	"Yellow",
	"Green",
	"Purple",
}

export class Pixels {
	//Rows > Columns
	map: Array<Array<PixelType>>;
	score: Writable<number> = writable(0);

	constructor(init?: Array<Array<PixelType>>) {
		if (!init) {
			this.map = Array(11);
			for (let row = 0; row < this.map.length; row++) {
				console.log(this.map[row]);
				this.map[row] = Array(6 + (row % 2));
				this.map[row].fill(PixelType.None);
			}
		} else {
			this.map = init
		}
	}

	isValid(row: number, column: number): boolean {
		return (
			row >= 0 &&
			row < this.map.length &&
			column >= 0 &&
			column < this.map[row].length
		);
	}

	isColored(x: number, y: number, color: PixelType): boolean {
		return this.get(x, y) === color;
	}

	isAdjacent(x1: number, y1: number, x2: number, y2: number): boolean {
		return Math.abs(x1 - x2) <= 1 && Math.abs(y1 - y2) <= 1;
	}

	countAdjacentColored(x: number, y: number, color: PixelType): number {
		let count = 0;
		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				if (dx === 0 && dy === 0) continue;
				const newX = x + dx;
				const newY = y + dy;
				if (this.isColored(newX, newY, color)) {
					count++;
				}
			}
		}
		return count;
	}

	dfs(
		x: number,
		y: number,
		group: PixelType[][],
		groups: PixelType[][][]
	): void {
		const currentColor = this.get(x, y);
		if (group.length === 3) {
			const uniqueColors = new Set(group.flat());
			if (uniqueColors.size >= 2) {
				groups.push([...group]);
			}
			return;
		}

		for (let dx = -1; dx <= 1; dx++) {
			for (let dy = -1; dy <= 1; dy++) {
				const newX = x + dx;
				const newY = y + dy;
				if (
					this.isValid(newX, newY) &&
					this.isColored(newX, newY, currentColor) &&
					this.countAdjacentColored(newX, newY, currentColor) >= 2
				) {
					group.push([currentColor, this.get(newX, newY)]);
					this.dfs(newX, newY, group, groups);
					group.pop();
				}
			}
		}
	}

	calculate() {
		const groups = [[[]]];
		for (let x = 0; x < this.map.length; x++) {
			for (let y = 0; y < this.map[x].length; y++) {
				const currentColor = this.get(x, y);
				if (
					currentColor !== PixelType.None &&
					currentColor !== PixelType.White
				) {
					this.dfs(x, y, [[currentColor]], groups);
				}
			}
		}

		console.log(groups);
		// this.score.set(groups.length * 3);
	}

	get(row: number, column: number): PixelType {
		const r = this.map[row];
		return r ? r[column] : PixelType.None;
	}

	set(row: number, column: number, value: PixelType) {
		this.map[row][column] = value;
		this.map = this.map;
		// this.calculate();
	}

	tob64(): string {
		return btoa(JSON.stringify(this.map));
	}
}
