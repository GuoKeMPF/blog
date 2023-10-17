/** @format */

const gameSize = {
	width: 1200,
	height: 500,
};

interface KeyControllerType {
	KEYS: { LEFT: KEYTypes; RIGHT: KEYTypes; Space: KEYTypes };
	keyCode: KEYTypes[];
	keyState: Record<string, boolean>;
}

type KEYTypes = "37" | "39" | "32";

class KeyController {
	KEYS: { LEFT: KEYTypes; RIGHT: KEYTypes; Space: KEYTypes };
	keyCode: KEYTypes[];
	keyState: Record<string, boolean>;
	constructor() {
		this.KEYS = {
			LEFT: "37",
			RIGHT: "39",
			Space: "32",
		};
		this.keyCode = ["37", "39", "32"];
		this.keyState = {};
	}

	init = () => {
		window.addEventListener("keydown", this.keyDown);
		window.addEventListener("keyup", this.keyUp);
	};

	distory = () => {
		window.removeEventListener("keydown", this.keyDown);
		window.removeEventListener("keyup", this.keyUp);
	};

	keyDown = (e: KeyboardEvent) => {
		e.preventDefault();
		for (let counter = 0; counter < this.keyCode.length; counter++)
			if (this.keyCode[counter] == e.code) {
				this.keyState[e.code] = true;
			}
	};

	keyUp = (e: KeyboardEvent) => {
		e.preventDefault();
		for (let counter = 0; counter < this.keyCode.length; counter++)
			if (this.keyCode[counter] === e.code) {
				this.keyState[e.code] = false;
			}
	};

	isDown = (keyCode: KEYTypes) => {
		return this.keyState[keyCode] === true;
	};
}

interface PlayerType {
	active: boolean;
	size: { width: number; height: number };
	shooterHeat: number;
	coordinates: { x: number; y: number };
	projectile: never[];
	keyboarder: any;
}

class Player implements PlayerType {
	active: boolean;
	size: { width: number; height: number };
	shooterHeat: number;
	coordinates: { x: number; y: number };
	projectile: never[];
	keyboarder: any;
	constructor() {
		this.active = true;
		this.size = {
			width: 16,
			height: 8,
		};
		this.shooterHeat = -3;
		this.coordinates = {
			x: (gameSize.width / 2 - this.size.width / 2) | 0,
			y: gameSize.height - this.size.height * 2,
		};

		this.projectile = [];
		this.keyboarder = new KeyController();
	}

	update = () => {
		for (var i = 0; i < this.projectile.length; i++)
			this.projectile[i].update();

		this.projectile = this.projectile.filter(function (projectile) {
			return projectile.active;
		});

		if (!this.active) return;

		if (
			this.keyboarder.isDown(this.keyboarder.KEYS.LEFT) &&
			this.coordinates.x > 0
		)
			this.coordinates.x -= 2;
		else if (
			this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT) &&
			this.coordinates.x < gameSize.width - this.size.width
		)
			this.coordinates.x += 2;

		if (this.keyboarder.isDown(this.keyboarder.KEYS.Space)) {
			this.shooterHeat += 1;
			if (this.shooterHeat < 0) {
				var projectile = new Projectile(
					{
						x: this.coordinates.x + this.size.width / 2 - 1,
						y: this.coordinates.y - 1,
					},
					{
						x: 0,
						y: -7,
					}
				);
				this.projectile.push(projectile);
			} else if (this.shooterHeat > 12) this.shooterHeat = -3;
		} else {
			this.shooterHeat = -3;
		}
	};

	draw = () => {
		if (this.active) {
			screen.rect(
				this.coordinates.x,
				this.coordinates.y,
				this.size.width,
				this.size.height
			);
			screen.rect(this.coordinates.x - 2, this.coordinates.y + 2, 20, 6);
			screen.rect(this.coordinates.x + 6, this.coordinates.y - 4, 4, 4);
		}

		for (var i = 0; i < this.projectile.length; i++) this.projectile[i].draw();
	};
	destroy = () => {
		this.active = false;
		game.lost = true;
	};
}

interface GameType {
	invaderShots: never[];
	level: number;
	lost: boolean;
	player: any;
	invaders: never[];
}

class Game {
	invaderShots: never[];
	level: number;
	lost: boolean;
	player: any;
	invaders: never[];
	constructor() {
		this.level = -1;
		this.lost = false;
		this.player = new Player();
		this.invaders = [];
		this.invaderShots = [];
	}
}



interface ProjectileType {
	active: boolean;
	coordinates: any;
	size: { width: number; height: number; };
	velocity: any;
}

class Projectile implements ProjectileType {
	active: boolean;
	coordinates: any;
	size: { width: number; height: number; };
	velocity: any;
	constructor(coordinates: { x: number; y: number; }, velocity: { x: number; y: number; }) {
		this.active = true;
		this.coordinates = coordinates;
		this.size = {
			width: 3,
			height: 3,
		};
		this.velocity = velocity;
	}
	update = () => {
		this.coordinates.x += this.velocity.x;
		this.coordinates.y += this.velocity.y;

		if (this.coordinates.y > gameSize.height || this.coordinates.y < 0)
			this.active = false;
	}
	draw = () => {
		if (this.active)
			screen.rect(
				this.coordinates.x,
				this.coordinates.y,
				this.size.width,
				this.size.height
			);
	},
}
