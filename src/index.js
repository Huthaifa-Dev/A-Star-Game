import 'phaser';
// import { PythonShell } from 'python-shell';
import object from './data.json';
// import { PythonShell } from 'python-shell';
// let { PythonShell } = require('python-shell')
// PythonShell

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    backgroundColor: '#1a1a2d',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('tiles', '../assets/drawtiles-spaced.png');
    this.load.image('car', '../assets/car90.png');
    this.load.tilemapCSV('map', '../assets/grid.csv');

}

function create() {
    var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);
    var layer = map.createLayer(0, tileset, 0, 0);

    var player = this.add.image(32 + 16, 32 + 16, 'car');
    var solution = object.solution;

    for (let square in solution) {
        let index = square[0] * 25 + square[1];
        setTimeout(() => {
            console.log(index)
        }, 1000)
    }


    //  Left
    this.input.keyboard.on('keydown-Space', function (event) {

        var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);
        console.log('space clicked')
        if (tile.index === 2) {
            //  Blocked, we can't move
        }
        else {
            player.x -= 32;
            player.angle = 180;
        }

    });

    //  Right
    this.input.keyboard.on('keydown-D', function (event) {

        var tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

        if (tile.index === 2) {
            //  Blocked, we can't move
        }
        else {
            player.x += 32;
            player.angle = 0;
        }

    });

    //  Up
    this.input.keyboard.on('keydown-W', function (event) {

        var tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

        if (tile.index === 2) {
            //  Blocked, we can't move
        }
        else {
            player.y -= 32;
            player.angle = -90;
        }

    });

    //  Down
    this.input.keyboard.on('keydown-S', function (event) {

        var tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

        if (tile.index === 2) {
            //  Blocked, we can't move
        }
        else {
            player.y += 32;
            player.angle = 90;
        }

    });

}
