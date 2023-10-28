/** @format */

import { ReactNode } from "react";

import RequestAnimation from "@/utils/requestAnimation";

const theme = {
	backgroundColor: "#fff",
	elementColor: "#000",
};

// Assets
var invaderCanvas,
	invaderSize = 20,
	invaderAttackRate = 0;

// Text
const blocks = [
	[3, 4, 8, 9, 10, 15, 16],
	[2, 4, 7, 11, 14, 16],
	[1, 4, 7, 11, 13, 16],
	[1, 2, 3, 4, 5, 7, 11, 13, 14, 15, 16, 17],
	[4, 7, 11, 16],
	[4, 8, 9, 10, 16],
];

let gameSize = {
	width: 1200,
	height: 500,
};

export class Game {
	constructor({ element, onReady }) {
		this.level = -1;
		this.lost = false;
		this.invaders = [];
		this.invaderShots = [];
		this.invaderSpeed = 20;
		this.onReady = onReady;
		let node;
		if (typeof element === "string") {
			node = document.querySelector(element);
		} else {
			node = element;
		}
		// Game Creation
		const canvas = node;
		if (!canvas) {
			throw new Error("未找到画布元素");
		}
		const screen = canvas.getContext("2d");
		this.screen = screen;

		let invaderMultiplier;
		if (window.innerWidth > 1200) {
			gameSize = {
				width: 1200,
				height: 600,
			};
			invaderMultiplier = 3;
		} else if (window.innerWidth > 800) {
			gameSize = {
				width: 900,
				height: 500,
			};
			invaderMultiplier = 2;
		} else {
			gameSize = {
				width: 600,
				height: 400,
			};
			invaderMultiplier = 1;
		}

		this.screen.canvas.width = gameSize.width;
		this.screen.canvas.height = gameSize.height;
		this.invaderMultiplier = invaderMultiplier;
		this.gameSize = gameSize;
		this.kills = 0;
		invaderAttackRate = 0.999;
		const context = this;
		this.player = new Player({ screen, gameSize, game: context });
		const invaderAsset = new Image();

		invaderAsset.onload = () => {
			invaderCanvas = document.createElement("canvas");
			invaderCanvas.width = invaderSize;
			invaderCanvas.height = invaderSize;
			invaderCanvas?.getContext("2d").drawImage(invaderAsset, 0, 0);
			this.invaders = this.createInvaders();
			console.log("invaderAsset.onload");
			this.initGameStart();
			this.ready();
		};

		this.requestAnimation = new RequestAnimation({
			callback: this.initGameStart,
		});
		invaderAsset.src = "//stillh.art/project/spaceInvaders/invader.gif";
	}

	initGameStart = () => {
		this.draw();
		this.update();
	};

	ready = () => {
		this.onReady(this);
	};

	start = () => {
		this.requestAnimation.start();
	};

	onFailed = () => {
		this.requestAnimation.stop();
	};

	createInvaders = () => {
		const invaders = [];
		let i = blocks.length * this.invaderMultiplier;
		while (i--) {
			var j = this.getPixelRow(i, this.invaderMultiplier);
			for (var k = 0; k < j.length; k++) {
				invaders.push(
					new Invader({
						coordinates: {
							x: j[k] * invaderSize,
							y: i * invaderSize,
						},
						game: this,
						speedX: this.invaderSpeed,
						screen: this.screen,
						gameSize: this.gameSize,
					})
				);
			}
		}
		return invaders;
	};

	getPixelRow = (rowRaw, invaderMultiplier) => {
		var textRow = [],
			placer = 0,
			row = Math.floor(rowRaw / invaderMultiplier);
		if (row >= blocks.length) return [];
		for (var i = 0; i < blocks[row].length; i++) {
			var tmpContent = blocks[row][i] * invaderMultiplier;
			for (var j = 0; j < invaderMultiplier; j++) {
				textRow[placer + j] = tmpContent + j;
			}
			placer += invaderMultiplier;
		}
		return textRow;
	};

	update = () => {
		if (!this.lost) {
			// Collision
			this.player.projectile.forEach((projectile) => {
				this.invaders.forEach((invader) => {
					const ifShotInvader = collides(projectile, invader);
					if (ifShotInvader) {
						invader.destroy();
						console.log("projectile", projectile.destroy);
						projectile.destroy();
					}
				});
			});

			this.invaders = this.invaders.filter((item) => item.active);

			this.invaderShots.forEach((invaderShots) => {
				if (collides(invaderShots, this.player)) {
					this.player.destroy();
				}
			});
			this.invaders.forEach((invader) => invader.update());
		} else {
			this.onFailed();
		}

		// Don't stop player & projectiles.. they look nice
		this.player.update();
		this.invaderShots.forEach((invaderShot) => invaderShot.update());
	};

	draw = () => {
		if (this.lost) {
			this.screen.fillStyle = "rgba(0, 0, 0, 0.03)";
			this.screen.fillRect(0, 0, gameSize.width, gameSize.height);

			this.screen.font = "55px Lucida Console";
			this.screen.textAlign = "center";
			this.screen.fillStyle = "white";
			this.screen.fillText("You lost", gameSize.width / 2, gameSize.height / 2);
			this.screen.fillText(
				"Points: " + this.kills,
				gameSize.width / 2,
				gameSize.height / 2 + 30
			);
		} else {
			this.screen.clearRect(0, 0, gameSize.width, gameSize.height);

			this.screen.font = "10px Lucida Console";
			this.screen.textAlign = "right";
			this.screen.fillText(
				"Points: " + this.kills,
				gameSize.width,
				gameSize.height - 12
			);
		}

		this.screen.beginPath();

		this.player.draw();
		if (!this.lost) {
			for (let i = 0; i < this.invaders.length; i++) {
				this.invaders[i].draw();
			}
		}
		for (let i = 0; i < this.invaderShots.length; i++) {
			this.invaderShots[i].draw();
		}

		this.screen.fill();
	};

	invadersBelow = (invader) => {
		return (
			this.invaders.filter((b) => {
				return (
					Math.abs(invader.coordinates.x - b.coordinates.x) === 0 &&
					b.coordinates.y > invader.coordinates.y
				);
			}).length > 0
		);
	};
}

class Invader {
	constructor({ coordinates, speedX, screen, game, gameSize }) {
		this.active = true;
		this.coordinates = coordinates;
		this.size = {
			width: invaderSize,
			height: invaderSize,
		};
		this.screen = screen;
		this.game = game;
		this.patrolX = 0;
		this.speedX = speedX;
		this.gameSize = gameSize;
	}
	update = () => {
		if (
			this.active &&
			Math.random() > invaderAttackRate &&
			!this.game.invadersBelow(this)
		) {
			const params = {
				coordinates: {
					x: this.coordinates.x + this.size.width / 2,
					y: this.coordinates.y + this.size.height - 5,
				},
				velocity: {
					x: 0,
					y: 2,
				},
				screen: this.screen,
				gameSize: this.gameSize,
			};
			const projectile = new Projectile(params);
			this.game.invaderShots.push(projectile);
		}
	};

	draw = () => {
		if (this.active) {
			this.screen.drawImage(
				invaderCanvas,
				this.coordinates.x,
				this.coordinates.y
			);
		}
	};
	move = () => {
		if (this.patrolX < 0 || this.patrolX > 100) {
			this.speedX = -this.speedX;
			this.patrolX += this.speedX;
			this.coordinates.y += this.size.height;

			if (this.coordinates.y + this.size.height * 2 > gameSize.height) {
				this.game.lost = true;
			}
		} else {
			this.coordinates.x += this.speedX;
			this.patrolX += this.speedX;
		}
	};
	destroy = () => {
		if (this.active === true) {
			this.game.kills += 1;
			this.active = false;
		}
	};
}

class Player {
	constructor({ screen, gameSize, game }) {
		this.active = true;
		this.size = {
			width: 16,
			height: 8,
		};
		this.gameSize = gameSize;
		this.game = game;
		this.shooterHeat = -3;
		this.coordinates = {
			x: (gameSize.width / 2 - this.size.width / 2) | 0,
			y: gameSize.height - this.size.height * 2,
		};
		this.screen = screen;
		this.projectile = [];
		this.keyboarder = new KeyController();
		this.keyboarder.init();
	}
	update = () => {
		for (var i = 0; i < this.projectile.length; i++) {
			this.projectile[i].update();
		}

		this.projectile = this.projectile.filter(function (projectile) {
			return projectile.active;
		});

		if (!this.active) {
			return;
		}
		if (
			this.keyboarder.keyStates.has(this.keyboarder.KEYS.LEFT) &&
			this.coordinates.x > 0
		) {
			this.coordinates.x -= 2;
		} else if (
			this.keyboarder.keyStates.has(this.keyboarder.KEYS.RIGHT) &&
			this.coordinates.x < this.gameSize.width - this.size.width
		) {
			this.coordinates.x += 2;
		}

		if (this.keyboarder.keyStates.has(this.keyboarder.KEYS.Space)) {
			this.shooterHeat += 1;
			if (this.shooterHeat <= 0) {
				const params = {
					coordinates: {
						x: this.coordinates.x + this.size.width / 2 - 1,
						y: this.coordinates.y - 1,
					},
					velocity: {
						x: 0,
						y: -7,
					},
					screen: this.screen,
					gameSize: this.gameSize,
				};
				this.projectile.push(new Projectile(params));
			} else if (this.shooterHeat > 6) {
				this.shooterHeat = -3;
			}
		} else {
			this.shooterHeat = -3;
		}
	};

	draw = () => {
		if (this.active) {
			this.screen.rect(
				this.coordinates.x,
				this.coordinates.y,
				this.size.width,
				this.size.height
			);
			this.screen.rect(this.coordinates.x - 2, this.coordinates.y + 2, 20, 6);
			this.screen.rect(this.coordinates.x + 6, this.coordinates.y - 4, 4, 4);
		}

		for (var i = 0; i < this.projectile.length; i++) {
			this.projectile[i].draw();
		}
	};
	destroy = () => {
		this.active = false;
		this.game.lost = true;
		this.keyboarder.destory();
	};
}

class Projectile {
	constructor({ coordinates, velocity, screen, gameSize }) {
		this.active = true;
		this.coordinates = coordinates;
		this.size = {
			width: 3,
			height: 3,
		};
		this.gameSize = gameSize;
		this.velocity = velocity;
		this.screen = screen;
	}
	update = () => {
		this.coordinates.x += this.velocity.x;
		this.coordinates.y += this.velocity.y;
		if (this.coordinates.y > this.gameSize.height || this.coordinates.y < 0) {
			this.active = false;
		}
	};
	draw = () => {
		if (this.active) {
			this.screen.rect(
				this.coordinates.x,
				this.coordinates.y,
				this.size.width,
				this.size.height
			);
		}
	};
	destroy = () => {
		this.active = false;
	};
}

// type KEYTypes = "ArrowLeft" | "Space" | "ArrowRight" | "";
class KeyController {
	constructor() {
		this.KEYS = {
			LEFT: "ArrowLeft",
			RIGHT: "ArrowRight",
			Space: "Space",
		};
		this.KeySet = new Set(Object.values(this.KEYS));
		this.keyStates = new Set();
	}

	init = () => {
		window.addEventListener("keydown", this.keyDown);
		window.addEventListener("keyup", this.keyUp);
	};

	destory = () => {
		window.removeEventListener("keydown", this.keyDown);
		window.removeEventListener("keyup", this.keyUp);
	};

	keyDown = (e) => {
		e.preventDefault();
		if (this.KeySet.has(e.code)) {
			this.keyStates.add(e.code);
		}
	};

	keyUp = (e) => {
		e.preventDefault();
		if (this.KeySet.has(e.code)) {
			this.keyStates.delete(e.code);
		}
	};
}

// Other functions
// ---------------
const collides = (a, b) => {
	return (
		a.coordinates.x < b.coordinates.x + b.size.width &&
		a.coordinates.x + a.size.width > b.coordinates.x &&
		a.coordinates.y < b.coordinates.y + b.size.height &&
		a.coordinates.y + a.size.height > b.coordinates.y
	);
};
