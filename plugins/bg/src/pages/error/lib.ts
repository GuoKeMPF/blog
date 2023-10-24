/** @format */

import { ReactNode } from "react";

// General
var screen, game;

// Assets
var invaderCanvas,
	invaderMultiplier,
	invaderSize = 20,
	invaderAttackRate: number = 0,
	invaderSpeed: number,
	invaderSpawnDelay = 250;

// Counter
var i = 0,
	kills = 0,
	spawnDelayCounter = invaderSpawnDelay;

// Text
var blocks = [
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

interface GamePropsType {
	element: String | HTMLCanvasElement;
}

export class Game {
	invaderShots: never[];
	level: number;
	lost: boolean;
	player: any;
	invaders: Invader[];
	screen: CanvasRenderingContext2D;
	invaderMultiplier: number = 1;
	constructor({ element }: GamePropsType) {
		this.level = -1;
		this.lost = false;
		this.invaders = [];
		this.invaderShots = [];
		let node: HTMLCanvasElement;
		if (typeof element === "string") {
			node = document.querySelector(element) as HTMLCanvasElement;
		} else {
			node = element as HTMLCanvasElement;
		}

		// Game Creation
		const canvas = node;
		if (!canvas) {
			throw new Error("未找到画布元素");
		}
		const screen = canvas.getContext("2d") as CanvasRenderingContext2D;
		this.screen = screen;
		this.player = new Player({ screen });
		var invaderAsset = new Image();
		invaderAsset.onload = () => {
			invaderCanvas = document.createElement("canvas");
			invaderCanvas.width = invaderSize;
			invaderCanvas.height = invaderSize;
			invaderCanvas?.getContext("2d").drawImage(invaderAsset, 0, 0);
			this.initGameStart();
		};
		invaderAsset.src = "//stillh.art/project/spaceInvaders/invader.gif";
	}
	initGameStart = () => {
		let invaderMultiplier: number;
		if (window.innerWidth > 1200) {
			gameSize = {
				width: 1200,
				height: 500,
			};
			invaderMultiplier = 3;
		} else if (window.innerWidth > 800) {
			gameSize = {
				width: 900,
				height: 600,
			};
			invaderMultiplier = 2;
		} else {
			gameSize = {
				width: 600,
				height: 300,
			};
			invaderMultiplier = 1;
		}

		this.screen.canvas.width = gameSize.width;
		this.screen.canvas.height = gameSize.height;
		this.invaderMultiplier = invaderMultiplier;
		kills = 0;
		invaderAttackRate = 0.999;
		invaderSpeed = 20;
		spawnDelayCounter = invaderSpawnDelay;

  update = () => {
    // Next level
    if (this.invaders.length === 0) {
      spawnDelayCounter += 1;
      if (spawnDelayCounter < invaderSpawnDelay) return;

	update = () => {
		// Next level
		if (this.invaders.length === 0) {
			spawnDelayCounter += 1;
			if (spawnDelayCounter < invaderSpawnDelay) return;

      invaderAttackRate -= 0.002;
      invaderSpeed += 10;

      this.invaders = createInvaders();

      spawnDelayCounter = 0;
    }

    if (!this.lost) {
      // Collision
      this.player.projectile.forEach((projectile) => {
        this.invaders.forEach((invader) => {
          if (collides(projectile, invader)) {
            invader.destroy();
            projectile.active = false;
          }
        });
      });

      this.invaderShots.forEach((invaderShots) => {
        if (collides(invaderShots, this.player)) {
          this.player.destroy();
        }
      });

      for (i = 0; i < this.invaders.length; i++) {
        this.invaders[i].update();
      }
    }

    // Don't stop player & projectiles.. they look nice
    this.player.update();
    for (i = 0; i < game.invaderShots.length; i++) {
      this.invaderShots[i].update();
    }

		// Don't stop player & projectiles.. they look nice
		this.player.update();
		for (i = 0; i < this.invaderShots.length; i++) {
			this.invaderShots[i].update();
		}

  draw = () => {
    if (this.lost) {
      screen.fillStyle = "rgba(0, 0, 0, 0.03)";
      screen.fillRect(0, 0, gameSize.width, gameSize.height);

	draw = () => {
		if (this.lost) {
			this.screen.fillStyle = "rgba(0, 0, 0, 0.03)";
			this.screen.fillRect(0, 0, gameSize.width, gameSize.height);

			this.screen.font = "55px Lucida Console";
			this.screen.textAlign = "center";
			this.screen.fillStyle = "white";
			this.screen.fillText("You lost", gameSize.width / 2, gameSize.height / 2);
			this.screen.fillText(
				"Points: " + kills,
				gameSize.width / 2,
				gameSize.height / 2 + 30
			);
		} else {
			this.screen.clearRect(0, 0, gameSize.width, gameSize.height);

			this.screen.font = "10px Lucida Console";
			this.screen.textAlign = "right";
			this.screen.fillText(
				"Points: " + kills,
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

interface InvaderType {
  active: boolean;
  coordinates: any;
  size: { width: number; height: number };
  patrolX: number;
  speedX: any;
}

class Invader implements InvaderType {
	active: boolean;
	coordinates: any;
	size: { width: number; height: number };
	patrolX: number;
	speedX: any;
	constructor({ coordinates, invaderSpeed }) {
		this.active = true;
		this.coordinates = coordinates;
		this.size = {
			width: invaderSize,
			height: invaderSize,
		};

    this.patrolX = 0;
    this.speedX = invaderSpeed;
  }

	draw = () => {
		if (this.active)
			screen.drawImage(invaderCanvas, this.coordinates.x, this.coordinates.y);
	};
	move = () => {
		if (this.patrolX < 0 || this.patrolX > 100) {
			this.speedX = -this.speedX;
			this.patrolX += this.speedX;
			this.coordinates.y += this.size.height;

      if (this.coordinates.y + this.size.height * 2 > gameSize.height)
        game.lost = true;
    } else {
      this.coordinates.x += this.speedX;
      this.patrolX += this.speedX;
    }
  };
  destroy = () => {
    this.active = false;
    kills += 1;
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

	screen: CanvasRenderingContext2D;
	constructor({ screen }) {
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
		this.screen = screen;
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
			this.screen.rect(
				this.coordinates.x,
				this.coordinates.y,
				this.size.width,
				this.size.height
			);
			this.screen.rect(this.coordinates.x - 2, this.coordinates.y + 2, 20, 6);
			this.screen.rect(this.coordinates.x + 6, this.coordinates.y - 4, 4, 4);
		}

    for (var i = 0; i < this.projectile.length; i++) this.projectile[i].draw();
  };
  destroy = () => {
    this.active = false;
    game.lost = true;
  };
}

interface ProjectileType {
  active: boolean;
  coordinates: any;
  size: { width: number; height: number };
  velocity: any;
}

class Projectile implements ProjectileType {
  active: boolean;
  coordinates: any;
  size: { width: number; height: number };
  velocity: any;
  constructor(
    coordinates: { x: number; y: number },
    velocity: { x: number; y: number }
  ) {
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
  };
  draw = () => {
    if (this.active)
      screen.rect(
        this.coordinates.x,
        this.coordinates.y,
        this.size.width,
        this.size.height
      );
  };
}

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

const getPixelRow = (rowRaw) => {
  var textRow = [],
    placer = 0,
    row = Math.floor(rowRaw / invaderMultiplier);
  if (row >= blocks.length) return [];
  for (var i = 0; i < blocks[row].length; i++) {
    var tmpContent = blocks[row][i] * invaderMultiplier;
    for (var j = 0; j < invaderMultiplier; j++)
      textRow[placer + j] = tmpContent + j;
    placer += invaderMultiplier;
  }
  return textRow;
};

// Write Text
// -----------
const createInvaders = () => {
  var invaders = [];

  var i = blocks.length * invaderMultiplier;
  while (i--) {
    var j = getPixelRow(i);
    for (var k = 0; k < j.length; k++) {
      invaders.push(
        new Invader({
          x: j[k] * invaderSize,
          y: i * invaderSize,
        })
      );
    }
  }
  return invaders;
};
