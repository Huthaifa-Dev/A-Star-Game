import 'phaser';

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

    const grid = [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 0, 2],
        [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2],
        [2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 0, 2, 0, 0, 2],
        [2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2],
        [2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 0, 2],
        [2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 2, 2],
        [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2],
        [2, 0, 0, 0, 0, 2, 0, 2, 1, 1, 2, 0, 2, 0, 0, 0, 0, 2, 0, 2, 1, 2, 0, 0, 2],
        [2, 0, 2, 2, 0, 2, 0, 2, 1, 1, 2, 0, 2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 0, 2, 2],
        [2, 0, 2, 2, 0, 2, 0, 2, 1, 1, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2, 2, 2, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 2],
        [2, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 2, 0, 2],
        [2, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
    ]

    var start = grid[1][1];


    // var graph = new Graph();
    // var start = graph.grid[0][0];
    // var end = graph.grid[1][2];
    // var result = astar.search(graph, start, end);
}

function create() {
    var map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    var tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);
    var layer = map.createLayer(0, tileset, 0, 0);

    var player = this.add.image(32 + 16, 32 + 16, 'car');

    //  Left
    this.input.keyboard.on('keydown-A', function (event) {

        var tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

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
