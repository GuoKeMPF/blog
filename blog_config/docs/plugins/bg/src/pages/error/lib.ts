/** @format */

import { ReactNode } from "react";

import RequestAnimation from "@/utils/requestAnimation";

type GameSize = {
  width: number;
  height: number;
};

type BlocksType = number[][];

interface Coordinates {
  x: number;
  y: number;
}

interface GameProps {
  element: string | ReactNode;
  onReady?: Function;
  onFailed?: Function;
  blocks: BlocksType;
}

const theme = {
  backgroundColor: "#000000",
  elementColor: "#fff",
};

// Assets
const invaderSize = 20;
const invaderAttackRate = 0.996;

const invaderSpeed = 1000;

const invaderPath = {
  body: [
    {
      x: 0,
      y: 5,
    },
    {
      x: 0,
      y: 6,
    },
    {
      x: 0,
      y: 7,
    },
    {
      x: 1,
      y: 7,
    },
    {
      x: 1,
      y: 6,
    },
    {
      x: 1,
      y: 5,
    },
    {
      x: 2,
      y: 5,
    },
    {
      x: 2,
      y: 6,
    },
    {
      x: 2,
      y: 7,
    },
    {
      x: 3,
      y: 7,
    },
    {
      x: 3,
      y: 8,
    },
    {
      x: 2,
      y: 8,
    },
    {
      x: 2,
      y: 9,
    },
    {
      x: 2,
      y: 10,
    },
    {
      x: 2,
      y: 11,
    },
    {
      x: 3,
      y: 11,
    },
    {
      x: 4,
      y: 11,
    },
    {
      x: 4,
      y: 10,
    },
    {
      x: 4,
      y: 9,
    },
    {
      x: 4,
      y: 8,
    },
    {
      x: 5,
      y: 8,
    },
    {
      x: 5,
      y: 7,
    },
    {
      x: 6,
      y: 7,
    },
    {
      x: 6,
      y: 8,
    },
    {
      x: 7,
      y: 8,
    },
    {
      x: 7,
      y: 9,
    },
    {
      x: 7,
      y: 10,
    },
    {
      x: 7,
      y: 11,
    },
    {
      x: 8,
      y: 11,
    },
    {
      x: 9,
      y: 11,
    },
    {
      x: 9,
      y: 10,
    },
    {
      x: 9,
      y: 9,
    },
    {
      x: 9,
      y: 8,
    },
    {
      x: 8,
      y: 8,
    },
    {
      x: 8,
      y: 7,
    },
    {
      x: 9,
      y: 7,
    },
    {
      x: 9,
      y: 6,
    },
    {
      x: 9,
      y: 5,
    },
    {
      x: 10,
      y: 5,
    },
    {
      x: 10,
      y: 6,
    },
    {
      x: 10,
      y: 7,
    },
    {
      x: 11,
      y: 7,
    },
    {
      x: 11,
      y: 6,
    },
    {
      x: 11,
      y: 5,
    },
    {
      x: 10,
      y: 5,
    },
    {
      x: 10,
      y: 4,
    },
    {
      x: 9,
      y: 4,
    },
    {
      x: 9,
      y: 3,
    },
    {
      x: 8,
      y: 3,
    },
    {
      x: 8,
      y: 2,
    },
    {
      x: 9,
      y: 2,
    },
    {
      x: 9,
      y: 1,
    },
    {
      x: 10,
      y: 1,
    },
    {
      x: 10,
      y: 0,
    },
    {
      x: 9,
      y: 0,
    },
    {
      x: 9,
      y: 1,
    },
    {
      x: 8,
      y: 1,
    },
    {
      x: 8,
      y: 2,
    },
    {
      x: 7,
      y: 2,
    },
    {
      x: 7,
      y: 3,
    },
    {
      x: 6,
      y: 3,
    },
    {
      x: 5,
      y: 3,
    },
    {
      x: 4,
      y: 3,
    },
    {
      x: 4,
      y: 2,
    },
    {
      x: 3,
      y: 2,
    },
    {
      x: 3,
      y: 1,
    },
    {
      x: 2,
      y: 1,
    },
    {
      x: 2,
      y: 0,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: 1,
      y: 1,
    },
    {
      x: 2,
      y: 1,
    },
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 2,
    },
    {
      x: 3,
      y: 3,
    },
    {
      x: 2,
      y: 3,
    },
    {
      x: 2,
      y: 4,
    },
    {
      x: 1,
      y: 4,
    },
    {
      x: 1,
      y: 5,
    },
  ],
  eye: [
    [
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 3, y: 5 },
      { x: 4, y: 5 },
    ],
    [
      { x: 8, y: 4 },
      { x: 7, y: 4 },
      { x: 7, y: 5 },
      { x: 8, y: 5 },
    ],
  ],
};

// 404
export const blocks404: BlocksType = [
  [3, 4, 8, 9, 10, 15, 16],
  [2, 4, 7, 11, 14, 16],
  [1, 4, 7, 11, 13, 16],
  [1, 2, 3, 4, 5, 7, 11, 13, 14, 15, 16, 17],
  [4, 7, 11, 16],
  [4, 8, 9, 10, 16],
];

export const blocks500: BlocksType = [
  [0, 1, 2, 3, 4, 7, 8, 9, 12, 13, 14, 15, 16],
  [0, 6, 10, 12],
  [0, 1, 2, 3, 6, 10, 12, 13, 14, 15],
  [4, 6, 10, 16],
  [0, 4, 6, 10, 12, 16],
  [1, 2, 3, 7, 8, 9, 13, 14, 15],
];

const createInvaderUnit = (): HTMLCanvasElement => {
  const invaderCanvas = window.document.createElement("canvas");
  const ctx = invaderCanvas.getContext("2d") as CanvasRenderingContext2D;

  const unit = 32;
  const num = 11;
  invaderCanvas.width = unit * num;
  invaderCanvas.height = unit * num;

  ctx.clearRect(0, 0, invaderCanvas.width, invaderCanvas.height);
  ctx.beginPath();

  // body
  const { body, eye } = invaderPath;
  ctx.fillStyle = theme.elementColor;
  ctx.strokeStyle = theme.elementColor;
  body.forEach((item, index, arr) => {
    if (index === 0) {
      ctx.moveTo(item.x * unit, item.y * unit);
    } else {
      ctx.lineTo(item.x * unit, item.y * unit);
    }
  });
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = theme.backgroundColor;
  ctx.strokeStyle = theme.backgroundColor;

  eye.forEach((e) => {
    const eyePath = e;
    ctx.beginPath();
    eyePath.forEach((item, index, arr) => {
      if (index === 0) {
        ctx.moveTo(item.x * unit, item.y * unit);
      } else {
        ctx.lineTo(item.x * unit, item.y * unit);
      }
    });
    ctx.stroke();
    ctx.fill();
  });

  return invaderCanvas;
};

type GameStatus = "init" | "running" | "lost" | "win" | "finish";

export class Game {
  level: number;
  invaders: Invader[];
  invaderShots: Projectile[];
  invaderSpeed: number;
  onReady?: Function;
  onFailed?: Function;
  invaderDownTimer: undefined | number | NodeJS.Timeout;
  blocks: BlocksType;
  screen: CanvasRenderingContext2D;
  invaderMultiplier: number = 0;
  gameSize: GameSize = {
    width: 0,
    height: 0,
  };
  kills: number = 0;
  player: Player;
  requestAnimation: RequestAnimation;
  status: GameStatus;
  constructor({ element, onReady, blocks, onFailed }: GameProps) {
    this.level = -1;
    this.status = "init";
    this.invaders = [];
    this.invaderShots = [];
    this.invaderSpeed = 20;
    this.onReady = onReady;
    this.onFailed = onFailed;
    this.invaderDownTimer = undefined;
    this.blocks = blocks;
    let node;
    if (typeof element === "string") {
      node = document.querySelector(element);
    } else {
      node = element;
    }
    // Game Creation
    const canvas = node as HTMLCanvasElement;
    if (!canvas) {
      throw new Error("未找到画布元素");
    }
    const screen = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.screen = screen;

    const containerW = (canvas.parentElement?.clientWidth ||
      window.innerWidth) as number;

    let gameSize: GameSize = {
      width: 1200,
      height: 500,
    };
    let invaderMultiplier = 0;
    if (containerW >= 1600) {
      gameSize = {
        width: 1600,
        height: 700,
      };
      invaderMultiplier = 3;
    } else if (containerW > 900) {
      gameSize = {
        width: 900,
        height: 560,
      };
      invaderMultiplier = 2;
    } else {
      gameSize = {
        width: 600,
        height: 500,
      };
      invaderMultiplier = 1;
    }

    this.screen.canvas.width = gameSize.width;
    this.screen.canvas.height = gameSize.height;
    this.invaderMultiplier = invaderMultiplier;
    this.gameSize = gameSize;
    this.player = new Player({ screen: this.screen, gameSize, game: this });
    this.requestAnimation = new RequestAnimation({
      callback: this.updateGame,
    });
    this.init();
  }

  init = () => {
    this.kills = 0;
    this.player.projectile = [];
    this.invaderShots = [];
    this.player = new Player({
      screen: this.screen,
      gameSize: this.gameSize,
      game: this,
    });
    this.status = "init";
    this.invaders = this.createInvaders();
    this.updateGame();
    this.ready();
  };

  updateGame = () => {
    this.draw();
    this.update();
  };
  reset = () => {
    this.init();
  };

  ready = () => {
    this.onReady && this.onReady(this);
  };

  start = () => {
    this.requestAnimation.start();
    clearInterval(this.invaderDownTimer);
    this.invaderDownTimer = setInterval(() => {
      for (let i = 0; i < this.invaders.length; i++) {
        this.invaders[i].move();
      }
    }, invaderSpeed);
  };
  failed = () => {
    this.onFailed && this.onFailed(this);
  };
  setFinish = () => {
    if (this.status !== "init" && this.status !== "running") {
      this.status = "init";
      clearInterval(this.invaderDownTimer);
      this.invaderDownTimer = undefined;
      this.requestAnimation.stop();
    }
  };

  destroy = () => {
    clearInterval(this.invaderDownTimer);
    this.requestAnimation.stop();
  };

  createInvaders = () => {
    const invaders = [];
    let i = this.blocks.length * this.invaderMultiplier;
    const invaderUnit: HTMLCanvasElement = createInvaderUnit();
    while (i--) {
      var j = this.getPixelRow(i, this.invaderMultiplier);
      for (var k = 0; k < j.length; k++) {
        invaders.push(
          new Invader({
            coordinates: {
              x: j[k] * invaderSize,
              y: i * invaderSize,
            },
            invaderUnit,
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

  getPixelRow = (rowRaw: number, invaderMultiplier: number) => {
    var textRow = [],
      placer = 0,
      row = Math.floor(rowRaw / invaderMultiplier);
    if (row >= this.blocks.length) {
      return [];
    }
    for (var i = 0; i < this.blocks[row].length; i++) {
      var tmpContent = this.blocks[row][i] * invaderMultiplier;
      for (var j = 0; j < invaderMultiplier; j++) {
        textRow[placer + j] = tmpContent + j;
      }
      placer += invaderMultiplier;
    }
    return textRow;
  };

  setStatus = (status: GameStatus) => {
    switch (status) {
      case "finish":
        setTimeout(() => {
          this.status = status;
        }, 5000);
        break;
      case "lost":
      case "win":
      case "running":
      case "init":
        this.status = status;
        break;
      default:
        const _exhaustiveCheck: never = status;
        return _exhaustiveCheck;
    }
  };

  update = () => {
    if (this.status === "running" || this.status === "init") {
      // Collision
      this.player.projectile.forEach((projectile) => {
        this.invaders.forEach((invader) => {
          const ifShotInvader = collides(projectile, invader);
          if (ifShotInvader) {
            invader.destroy();
            projectile.destroy();
          }
        });
      });

      this.invaders = this.invaders.reduce((pre, cur) => {
        if (cur.active) {
          cur.update();
          pre.push(cur);
        }
        return pre;
      }, [] as Invader[]);
      if (this.invaders.length === 0) {
        this.setStatus("win");
      }

      this.invaderShots.forEach((invaderShots) => {
        if (collides(invaderShots, this.player)) {
          this.player.destroy();
          this.failed();
        }
      });
    }

    // Don't stop player & projectiles.. they look nice
    this.player.update();
    this.invaderShots.forEach((invaderShot) => invaderShot.update());
  };

  draw = () => {
    this.screen.fillStyle = "rgba(0, 0, 0, 0.3)";
    this.screen.fillRect(0, 0, this.gameSize.width, this.gameSize.height);
    this.screen.fill();
    if (this.status === "win") {
      this.screen.font = "55px inherit inherit";
      this.screen.textAlign = "center";
      this.screen.fillStyle = theme.elementColor;
      this.screen.fillText(
        "胜利",
        this.gameSize.width / 2,
        this.gameSize.height / 2
      );
      this.screen.fillText(
        "得分" + this.kills,
        this.gameSize.width / 2,
        this.gameSize.height + 100
      );
      this.screen.fill();
    } else if (this.status === "lost") {
      this.screen.font = "55px inherit inherit";
      this.screen.textAlign = "center";
      this.screen.fillStyle = theme.elementColor;
      this.screen.fillText(
        "失败",
        this.gameSize.width / 2,
        this.gameSize.height / 2
      );
      this.screen.fillText(
        "得分" + this.kills,
        this.gameSize.width / 2,
        this.gameSize.height / 2 + 100
      );
      this.screen.fill();
    } else {
      this.screen.font = "16px inherit inherit";
      this.screen.fillStyle = theme.elementColor;
      this.screen.fillText("得分" + this.kills, 60, this.gameSize.height - 20);
    }
    if (this.status === "win" || this.status === "lost") {
      this.player.draw();
      this.player.destroy();
    }
    if (this.status === "finish") {
      this.setFinish();
    }

    this.screen.fill();
    this.screen.beginPath();

    this.player.draw();
    if (this.status === "running" || this.status === "init") {
      for (let i = 0; i < this.invaders.length; i++) {
        this.invaders[i].draw();
      }
    }
    for (let i = 0; i < this.invaderShots.length; i++) {
      this.invaderShots[i].draw();
    }

    this.screen.fill();
  };

  invadersBelow = (invader: Invader) => {
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

interface InvaderProps {
  coordinates: Coordinates;
  speedX: number;
  screen: CanvasRenderingContext2D;
  game: Game;
  gameSize: GameSize;
  invaderUnit: HTMLCanvasElement;
}

class Invader {
  active: boolean;
  coordinates: Coordinates;
  size: { width: number; height: number };
  screen: CanvasRenderingContext2D;
  game: Game;
  patrolX: number;
  speedX: number;
  gameSize: GameSize;
  invaderUnit: HTMLCanvasElement;
  constructor({
    coordinates,
    speedX,
    screen,
    game,
    gameSize,
    invaderUnit,
  }: InvaderProps) {
    this.active = true;
    this.coordinates = coordinates;
    this.size = {
      width: invaderSize,
      height: invaderSize,
    };
    this.invaderUnit = invaderUnit;
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
        this.invaderUnit,
        0,
        0,
        this.invaderUnit.width,
        this.invaderUnit.height,
        this.coordinates.x,
        this.coordinates.y,
        invaderSize,
        invaderSize
      );
    }
  };
  move = () => {
    if (this.patrolX < 0 || this.patrolX > 100) {
      this.speedX = -this.speedX;
      this.patrolX += this.speedX;
      this.coordinates.y += this.size.height;

      if (this.coordinates.y + this.size.height * 2 > this.gameSize.height) {
        this.game.setStatus("lost");
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

interface PlayerProps {
  game: Game;
  gameSize: GameSize;
  screen: CanvasRenderingContext2D;
}

class Player {
  active: boolean;
  size: { width: number; height: number };
  gameSize: GameSize;
  game: Game;
  shooterHeat: number;
  coordinates: Coordinates;
  screen: CanvasRenderingContext2D;
  projectile: Projectile[];
  keyboarder: KeyController;
  constructor({ screen, gameSize, game }: PlayerProps) {
    this.active = true;
    this.size = {
      width: 16,
      height: 8,
    };
    this.gameSize = gameSize;
    this.game = game;
    this.shooterHeat = -1;
    this.coordinates = {
      x: (gameSize.width / 2 - this.size.width / 2) | 0,
      y: gameSize.height - this.size.height * 2 - 32,
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
      this.coordinates.x -= 3;
    } else if (
      this.keyboarder.keyStates.has(this.keyboarder.KEYS.RIGHT) &&
      this.coordinates.x < this.gameSize.width - this.size.width
    ) {
      this.coordinates.x += 3;
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
      } else if (this.shooterHeat > 5) {
        this.shooterHeat = -1;
      }
    } else {
      this.shooterHeat = -1;
    }
  };

  draw = () => {
    if (this.active) {
      this.screen.fillStyle = theme.elementColor;
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
    this.game.status = "lost";
    this.keyboarder.destroy();
  };
}
interface ProjectileProps {
  coordinates: Coordinates;
  velocity: Coordinates;
  screen: CanvasRenderingContext2D;
  gameSize: GameSize;
}

class Projectile {
  active: boolean;
  coordinates: Coordinates;
  size: { width: number; height: number };
  gameSize: GameSize;
  velocity: Coordinates;
  screen: CanvasRenderingContext2D;
  constructor({ coordinates, velocity, screen, gameSize }: ProjectileProps) {
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
  KEYS: { LEFT: "ArrowLeft"; RIGHT: "ArrowRight"; Space: "Space" };
  KeySet: Set<string>;
  keyStates: Set<string>;
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

  destroy = () => {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
  };

  keyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (this.KeySet.has(e.code)) {
      this.keyStates.add(e.code);
    }
  };

  keyUp = (e: KeyboardEvent) => {
    e.preventDefault();
    if (this.KeySet.has(e.code)) {
      this.keyStates.delete(e.code);
    }
  };
}

// Other functions
// ---------------
const collides = (a: Projectile, b: Player | Invader) => {
  return (
    a.coordinates.x < b.coordinates.x + b.size.width &&
    a.coordinates.x + a.size.width > b.coordinates.x &&
    a.coordinates.y < b.coordinates.y + b.size.height &&
    a.coordinates.y + a.size.height > b.coordinates.y
  );
};
