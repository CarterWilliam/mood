# MOOD
MOOD is an HTML5 game inspired by DOOM and built using [Phaser]. It is a work in progress.

## Developing

### Software Dependencies
- [`nodejs`]
- [Tiled] (Only necessary for creating maps)

### Quick Start
1. Checkout the code:
```
git clone git@github.com:CarterWilliam/mood.git
```
2. Install dependencies:
```
npm install
```
3. Run webpack dev server:
```
npm start
```
Hit http://localhost:8080 to play the game. Game will automatically reload when changes to src files are detected.

### Tool descriptions

#### NodeJS
[`nodejs`] runs javascript outside of a web browser. It's used in this project for managing dependencies with [`npm`] and running build tasks like [`webpack`].

The node build description is [package.json]. This file contains:
- general metadata about the project e.g. `description`
- dependencies for both the deployed application and the build (`dependencies` and `devDependencies`)
- build tasks (`scripts`) (Ignore the deploy task. Only I can do that. Ignore the test task. You don't need to test if you don't make mistakes...)

After retrieving all dependencies with `npm install`, a new directory called `node_modules` will appear with ~a billion js dependencies. This contains all application dependencies _and_ all build dependencies which is a bit of a mess. How do we make sure we only deploy our application with the necessary JS files? [`webpack`].

#### Webpack
[`webpack`] uses es6 javascript modules to create a dependency tree. It then bundles up all the JS files into one or two bundles so the deployed application can minimize the amount of network requests necessary to fetch all sources.

We also use the [`webpack-dev-server`] to run the application locally. After running `npm start`, webpack will do it's dependency tree magic and copy all necessary files to a new `dist` directory and start a web server accessible at [http://localhost:8080] serving these files. As long as this task is left running, webpack will monitor changes to all files in the dependency tree and update [dist/bundle.js] when changes are saved.

#### Phaser
[Phaser] is the fantastic set of game libraries which MOOD is built with. We use Phaser 3. [API Documentation][phaser-docs]. [Examples][phaser3-examples]

#### Tiled
[Tiled] is like MS Paint with tiles. It can be used to edit tilesheets and tilemaps. A tilesheet is just an image with all the different tiles that can be used to build your world. It also contains metadata like tile size and individual properties on each tile (e.g. does player collide with tile. Player should be able to walk over tiles representing a floor but not over a tile representing part of a wall). A tilemap is an arrangement of the tiles in 1 or more tilesets which creates the world.

Download the application and open [raw-assets/maps/futuristic.tmx] in it. The file already has an embedded tilesheet but it will need the source image file in order to work so point it at [src/assets/maps/futuristic.png].

When you want to test out the editted tilemap, export the tilemap as a JSON file to [src/assets/maps/futuristic.json] and run the dev server with `npm start`.

##### Layers and Obstructions in MOOD
TODO


## Credits
- Thank you to ID software for creating DOOM which MOOD is loosely based on.
- Thank you to Richard Davey and team for creating the [Phaser] game engine.

[`nodejs`]: https://nodejs.org/
[`npm`]: https://www.npmjs.com/
[Phaser]: https://github.com/photonstorm/phaser
[phaser-docs]: https://photonstorm.github.io/phaser3-docs/
[phaser-examples]: http://labs.phaser.io/
[Tiled]: https://www.mapeditor.org/
[`webpack`]: https://webpack.js.org/
[`webpack-dev-server`]: https://webpack.js.org/configuration/dev-server/
