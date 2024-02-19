# boilerplate-webpack-gulp-html-scss-js-components

It's a boilerplate for usage of `webpack 5+`, `gulp 4+`, `html`, `scss/css` and `js`. (everything of that is meant to be `components` and `webpack` + `gulp` are for bundling and connecting parts together) in a future project. Check out the docs below to be in `actual tune`!

---

### !Important

- While using modules always set an extension to the imported file's path! Even for `*.js` files! Or you'll get an exception and `webpack` will crash.
- Before usage - update packages and dependency versions (instruction below), than run script for build (to test for errors) (e,g, `npm run build`). Otherwise cure the exceptions(((
- don't forget to rename all the `<project_name>` or `projectName` names to desired one! Also check the following list of files, folders and linked things, to insure about the replacement:
  - `./projectName`;
  - `projectName.scss` (path: `projectName/src/components/projectName.scss`);
  - `gulpfile.js` all the `src` and `dest` etc (path: `./configs/gulp/gulpfile.js`);
  - `webpack.config.js` all the occurrences of `projectName` in the `entry`, `output` etc (path: `./configs/webpack/webpack.config.js`);
  - `index.js` all the occurrences of `projectName` (path: `./projectName/src/components/index.js`);
  - `projectNameSelfCheck` and all subfolders and files inside (path: `./projectName/src/components/projectNameSelfCheck`);
  - `_head.html` project `title` and `meta.content` (path: `./projectName/src/components/components/head/_head.html`)
- files with extension `.gitkeep` are only for adding `empty folders` to the staging area and for continious committing. Since the folder turn to be not empty you can for sure delete this files (they are for nothing but only for saving folder structure (check the link for more [what is .gitkeep for?](https://stackoverflow.com/questions/115983/how-do-i-add-an-empty-directory-to-a-git-repository)));
- check `./configs/webpack/webpack.config.js` before usage using CLI command for no errors:
  `npx webpack configtest [config-path]` so currently => `npx webpack configtest ./configs/webpack/webpack.config.js`

---

### How to check for npm packages update and update them

[Pay attention to this answers at stackoverflow.com](https://stackoverflow.com/questions/16525430/npm-check-and-update-package-if-needed)

To check the outdated packages:  
`npm outdated`

To update all the outdated packages (note: this command do not update devDependencies in the package.json!):  
`npm update`

To update one `package` (note: this command do not update devDependency in the package.json!):  
`npm update <package_name>`

To update all the outdated packages and refresh all devDependencies in the package.json:  
`npm update --save`

To delete an unnecessary `package` use following command ([official npm Docs](https://docs.npmjs.com/uninstalling-packages-and-dependencies)):  
`npm uninstall <package_name>`  
Note: don't forget to check `scripts` in the `package.json` to delete unnecessary one.

---

The boilerplate is set to use ECMAScript modules (ESM) (see the `package.json` => `{"type": "module"}`);

#### gulp

`gulp` is turned to bundle multiple html components into the one `index_gulp_include.html` (path: `<project_name>/src/components/index_gulp_include.html`)).  
Also `gulp` replace html chunkes' inner assets' pathes to be valid to output `index_gulp_include.html` file and then copy and rename it to `index.html` (output `index.html` file path: `<project_name>/src/components/index.html`).  
(check out the `./configs/gulp/gulpfile.js` file for details);

`gulp` uses:

- `gulp-file-include` package to include (using keyword `@@include("path/to/file.html")`) html parts from other html files. Indents are matter! Check the `indent: true` property in the `./configs/gulp/gulpfile.js`;
- `gulp-rename` package to copy `index_gulp_include.html` and rename it to `index.html`;
- `gulp-replace` package to change assets pathes inside html parts to be relative to `index_gulp_include.html`.

#### webpack

`webpack` is turned to bundle all assets and reduce final bundle (for example: images are minimized as possible) to have as result `main.js`, `index.html`, `main.css` and `src/assets` (file structure is save as is! check my custom made function in the `output.assetModuleFilename`. It was made relying on this [webpack 5 assetModuleFilename stackoverflow.com](https://stackoverflow.com/questions/68814833/webpack-5-assets-module-how-to-keep-the-folder-structure-in-the-output-folder)).

Also there's a helper functions to deal with files when they are renamed with additional hash and to import all the assets to the bundle (to use them in future, e.g. not currently desired image, and next one too) (check the `projectName/src/components/base/favorities-slider/_favoritiesSlider.js` file for `getCashedFilename` and `importAll` functions)  
(check this [webpack official docs link about the dealing with files' hash](https://webpack.js.org/guides/dependency-management/#context-module-api) and [How to copy all images to dist folder instead of only used with webpack 5 stackoverflow.com](https://stackoverflow.com/questions/69120556/how-to-copy-all-images-to-dist-folder-instead-of-only-used-with-webpack-5)).

`webpack` uses:

- `html-loader` for ability to load `.html` files into `*.js` one;
- `html-webpack-plugin` to nest final `script.js` file (currently to the `head` of html file. Check `inject: 'head'` option in the `./configs/webpack/webpack.config.js` HtmlWebpackPlugin options) and final `main.css` styles file to the final html template.
- `image-minimizer-webpack-plugin`, `imagemin`, `imagemin-gifsicle`, `imagemin-jpegtran`, `imagemin-optipng`, `imagemin-svgo` - a fable things to reduce size of the image resources with lossless quality optimization (can be changed, use offical docs for more);
- `mini-css-extract-plugin` - to bundle final external css file;
- `resolve-url-loader` - loader for Sass to ease assets pathes' setting relying on current file but not to the output one (note: `sourceMap: true` in the `sass-loader` options is lifeworth required for working the plugin!!!);
- `sass` - for using all SCSS / Sass features;
- `sass-loader` - loader for ability to read and use `.scss` / `.sass` files inside `*.js` one;

#### SCSS / Sass

`Sass` is turned to use all the benefits of the Block Element Modifier (BEM) metodology. There's a commonly using BEM features like reusing as much as possible classes, that are stand for only few goals: mockup forming, styling, coloring, text-style-changing (the most behavior is like Bootstrap for it's classnames usage) and combining classes to implement desired looks without creating a ton of repeated and only for once classes.

`Sass` includes `abstracts` parts that are used in the entire boilerplate. It's an

- `animations` (path: `./projectName/src/components/abstracts/_animations.scss`),
- `constants` (path: `./projectName/src/components/abstracts/_constants.scss`),
- `mixins` (path: `./projectName/src/components/abstracts/_mixins.scss`),
- `placeholders` (path: `./projectName/src/components/abstracts/_placeholders.scss`).
  You can check them for benefits or delete otherwise (also check `projectName.scss` file `./projectName/src/components/projectName.scss` to delete unused anymore scss files!).

Also there's `base` folder with styles or classes that impact on entire boilerplate layout view and includes `Blocks` (BEM methodology). There're

- `_normalize.scss` (path: `./projectName/src/components/base/_normalize.scss`) (to lead the browser styles to be browser independent, to ease crossbrowser app development),
- `_typography.scss` (path: `./projectName/src/components/base/_typography.scss`) containing all the text heights variables,
- `_common.scss` (path: `./projectName/src/components/base/_common.scss`) one of the most important files that introduce basic classes for `body`, `containers`, `links`, `text elements` (color-modificators, letter - spacing modificators). This classes will be fundamental for elements in the `app` or `site page` that with usage of a few of their own classes help to reach desire result with minimum efforts.

`layout` folder includes classes that forming `flex` or `grid` layout.

---

note: pay attention to order of the imported files in the `projectName.scss`! The last improts will override previous one if there's matches in classnames or ids or tags!

---

#### JavaScript / Component approach

`JS` rules all the things inside the boilerplate. The only and one. Entire boilerplate structure is made for only the goal - turn everything into the components (React one and other Frameworks like), where every component is as much as possible unconnected unit for maximum reusage in a project and not only one (with few tiny modifications). It includes `_<component_filename>.html`, `_<component_filename>.scss` and optional `_<component_filename>.js` (it's possible to include component parts into it using `webpack` features of loaders and some utilities for creating `html templates`), that implements the logic of the component. The `components` are at (path: `./projectName/src/components`).

There's a `htmlCreateComponentHelper` custom made by myself simple utility (commonly used pattern), that gives an oportunity to create `html templates` to use in Single Page Aplication (SPA) (load `html template` on demand using JS like in React) (check for more about the component approach implementation [the Rolling Scopes School lecture (RU) by mentor Viktar Kovalev](https://www.youtube.com/watch?v=Edue1LmnZqo));

### The boilerplate structure and brief descriptions:

- `configs/` - the folder includes config files for: gulp, webpack packages. It's possible to add prettier/eslint/husky to the boilerplate from [boilerplate-eslint-prettier-husky](https://github.com/Dmitriy-Frostoff/boilerplate-eslint-prettier-husky);

- `projectName/src/` - source folder for assets, components, pixel perfect drafts of a future project:
  - `./projectName/src/assets` - all the images, icons, fonts, music, video etc sources of a future project as is;
  - `./projectName/src/components` - all the structural and meaningful parts of a project:
    - `./projectName/src/components/abstracts` - contains parts that are used in a entire future project. There's animations, constants, mixins (like simple functions but in Sass), placeholders (behaves a bit like variables in Sass but more powerfull. Check the official docs for more);
    - `./projectName/src/components/base` - there're Blocks (in BEM terminology). For now there're  
      `_normalize.scss` (to softly set your browser default styles to be more 'average' with others one to ease the process of crossbrowsers development),
      `_typography.scss` - this file includes font data and variables of font size as for example,
      `_common.scss` - this file contains the most basic classes of a project perfomance like titles properties, containers properties, modificators for text classes;
    - `./projectName/src/components/components` - components are particularly independent parts of a app. They generally consist of `*.html` + `*.scss` | `*.css` + `*.js` files and can be used again and again in a future project or even far another project (with a few modifications of a required files);
    - `./projectName/src/components/layout` - include `_content-structure.scss` file with basic layouts to use in a future project (one column or multiple columns as basic (or foundation as you wish) and they can be easily added with the necessary property modificators of new styling classes (e.g. for current paragraph or section to align everything to the center etc as BEM recommends)) (`_content-structure.scss` rely on `flex` or `grid` basics, also depend on mixins in the `projectName\src\components\abstracts\_mixins.scss` file so check it out or modify for your needs);
    - `./projectName/src/components/projectNameSelfCheck` - there's a tempalte for logging self - check of the task (the Rolling Scopes School for only. Can be deleted easily and don't forget to delete the file's import from `projectName\src\components\index.js`!);
    - `projectName\src\components\utilities` - as described above it's an utility to turn your `*.html` file improted to the `*.js` code into the `html template` to use it in your app (e.g. in a `SPA`);
    - `projectName\src\components\index_gulp_include.html` - file that includes `@@include("path/to/html/file")` to be bundled than to a enormous `html bedsheet` => `index.html` (it lye next to `index_gulp_include.html` file). It's far sweet to edit chunks of html files (in `components`) than 'wade through the jungle' of `html bedsheet` as for me;
    - `./projectName/src/components/index.html` - described right above;
    - `./projectName/src/components/projectName.scss` - file with Sass styles that persue the same goal as `index.html` above - bundle styles;
    - `./projectName/src/components/index.js` - the magic box of wonder to turn styles and html struture into one alife thing; Remember about cautions above (especially about strictly required file extensions, `.js` too!!!);
  - `./projectName/src/pixel perfect drafts` - drafts for desktop, tablet and mobile for usage in the pixel perfect extension (delete it if unnecessary);
- `projectName/dist/` - output bundle of a project;
- `.browserslistrc` - file with settings for webpack about prior browsers to traspile app data in order with the settings;
- .`gitignore` - exlude node_modules from git watching and more settings (check out the file);
- `LICENSE` - license file;
- `package.json` - the heart of all.
  Check the scripts (especially, the pathes for webpack and gulp configs. Currently: './configs/...'). Scripts already have CLI prefixes to link with config and ignore files;

  With the new packages releases, the ones above can turn to pumpkin, so check'em out with official docs!!!

### Links:

---

#### Gulp

- [The official docs of Gulp](https://gulpjs.com/);
- [Official github repo of Gulp](https://github.com/gulpjs/gulp);
- [Official github repo of Gulp - cli](https://github.com/gulpjs/gulp-cli);
- [Official github repo of gulp-file-include package](https://github.com/haoxins/gulp-file-include);
- [Official github repo of gulp-rename package](https://github.com/hparra/gulp-rename);
- [Official github repo of gulp-replace package](https://github.com/lazd/gulp-replace);

---

#### Webpack

- [The official docs of Webpack](https://webpack.js.org/api/);
- [Official github repo of webpack](https://github.com/webpack/webpack);
- [The official docs of Webpack: Concepts](https://webpack.js.org/concepts/);
- [The official docs of Webpack: Command Line Interface](https://webpack.js.org/api/cli);
- [A mostly complete guide to webpack 5 (2020) by Valentino Gagliardi](https://www.valentinog.com/blog/webpack/)  
   (note: a little bit outdated. There's a CMJ webpack config was used, but never the less is far usefull!!!);
- [How to transpile ES modules with webpack and Node.js, Dec 15, 2021 by Alexander Nnakwue](https://blog.logrocket.com/transpile-es-modules-with-webpack-node-js/);
- [Stackoverflow.com answers about dealling with ES modules and '\_\_dirname' in node.js](https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules);
- [Official github repo of webpack-cli](https://github.com/webpack/webpack-cli);
- [Official github repo of webpack-dev-server](https://github.com/webpack/webpack-dev-server);
- [The official awesome webpack resources, libraries, tools and applications](https://webpack.js.org/awesome-webpack/#utility);
- [Official webpack docs: html-loader](https://webpack.js.org/loaders/html-loader/#root);
- [Official github repo of html-loader](https://github.com/webpack-contrib/html-loader);
- [Official webpack docs: html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/#root);
- [Official github repo of html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin);
- [Official webpack docs: css-loader](https://webpack.js.org/loaders/css-loader/#root);
- [Official github repo of css-loader](https://github.com/webpack-contrib/css-loader);
- [Official Sass docs](https://sass-lang.com/documentation/);
- [Official Sass Basics](https://sass-lang.com/guide/);
- [Official webpack docs: sass-loader](https://webpack.js.org/loaders/sass-loader/#root);
- [Official github repo of sass-loader](https://github.com/webpack-contrib/sass-loader);
- [Official github repo of resolve-url-loader](https://github.com/bholloway/resolve-url-loader);
- [Official github repo of resolve-url-loader docs](https://github.com/bholloway/resolve-url-loader/blob/v5/packages/resolve-url-loader/README.md);
- [Official webpack docs: mini-css-extract-plugin](https://webpack.js.org/plugins/mini-css-extract-plugin/#root);
- [Official github repo of mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin);
- [Official webpack docs: ImageMinimizerWebpackPlugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/);
- [Official github repo of image-minimizer-webpack-plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin);
- [Official github repo of imagemin](https://github.com/imagemin/imagemin);
- [Official github repo of imagemin-gifsicle](https://github.com/imagemin/imagemin-gifsicle);
- [Official github repo of imagemin-jpegtran](https://github.com/imagemin/imagemin-jpegtran);
- [Official github repo of imagemin-optipng](https://github.com/imagemin/imagemin-optipng);
- [Official github repo of imagemin-svgo](https://github.com/imagemin/imagemin-svgo);

---

#### Browserslist

- [Official Browserslist docs](https://browsersl.ist/);
- [Official github repo of Browserslist](https://github.com/browserslist/browserslist);

---

#### BEM

- [Official BEM docs: Quick start](https://en.bem.info/methodology/quick-start/);

---

#### Node.js

- [Official node.js docs](https://nodejs.org/docs/latest/api/globals.html);
- [Official node.js docs: \_\_dirname](https://nodejs.org/docs/latest/api/modules.html#__dirname);
- [Official node.js docs: \_\_filename](https://nodejs.org/docs/latest/api/modules.html#__filename);

#### done: February 20, 2024
