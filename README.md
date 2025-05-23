# boilerplate-webpack-gulp-html-scss-js-components

It's a boilerplate for usage of `webpack 5+`, `gulp 5+`, `html`, `scss/css`, `js`. (everything of that is meant to be `components` and `webpack` + `gulp` are for bundling and connecting parts together) in a future project. Check out the docs below to be in `actual tune`!

---

### !Important

- While using modules always set an extension to the imported file's path! Even for `*.js` files! Or you'll get an exception and `webpack` will crash. Otherwise add the `resolve.extensions` to the `webpack.config.js` to solve this:

```js
export default {
  resolve: {
    extensions: [".jsx", ".js"],
  },
};
```

<br>

- Before usage - update packages and dependency versions (instruction below), than run script for build (to test for errors) (e,g, `npm run build`). Otherwise cure the exceptions(((
- don't forget to rename all the `<project_name>` or `projectName` names to desired one! Also check the following list of files, folders and linked things, to insure about the replacement:
  - `./projectName`;
  - `gulpfile.js` all the `src` and `dest` etc (path: `./configs/gulp/gulpfile.js`);
  - `webpack.config.js` all the occurrences of `projectName` in the `entry`, `output` etc (path: `./configs/webpack/webpack.config.js`);
  - `index.js` all the occurrences of `projectName` (path: `projectName/src/index.js`);
  - `projectNameSelfCheck` and all subfolders and files inside (path: `projectName/src/shared/projectNameSelfCheck/index.js`);
  - `_head.html` project `title` and `meta.content` (path: `projectName/src/widgets/head/_head.html`)
- files with extension `.gitkeep` are only for adding `empty folders` to the staging area and for continious committing. Since the folder turn to be not empty you can for sure delete this files (they are for nothing but only for saving folder structure (check the link for more [what is .gitkeep for?](https://stackoverflow.com/questions/115983/how-do-i-add-an-empty-directory-to-a-git-repository)));
- check `./configs/webpack/webpack.config.js` before usage using CLI command for no errors:
  `npx webpack configtest [config-path]` so currently => `npx webpack configtest ./configs/webpack/webpack.config.js`

---

### How to check for npm packages update and update them

[Pay attention to this answers at stackoverflow.com](https://stackoverflow.com/questions/16525430/npm-check-and-update-package-if-needed)

To check the outdated packages:  
`npm outdated`

To update all the outdated packages (**note**: this command do not update devDependencies in the package.json!):  
`npm update`

To update one `package` (**note**: this command do not update devDependency in the package.json!):  
`npm update <package_name>`

To update all the outdated packages and refresh all devDependencies in the package.json:  
`npm update --save`

**!important**: never use the `npm-check-updates` in a way as below in a prodaction, this one is only for updating to the latest packages' versions of the boilerplate:

```bash
npx npm-check-updates -u
npm install
```

The `npx npm-check-updates -u` command will **overwrite** the versions of **all** the project packages to the latest ones,
than will install them. (check the [How can I update each dependency in package.json to the latest version?](https://stackoverflow.com/questions/16073603/how-can-i-update-each-dependency-in-package-json-to-the-latest-version) for details).

To delete an unnecessary `package` use the following command ([official npm Docs](https://docs.npmjs.com/uninstalling-packages-and-dependencies)):  
`npm uninstall <package_name>`  
**note**: don't forget to check `scripts` in the `package.json` to delete unnecessary one.

The boilerplate is set to use ECMAScript modules (ESM) (see the `package.json` => `{"type": "module"}`);

#### gulp

`gulp` is turned to bundle multiple html components into the one `index_gulp_include.html` (path: `<project_name>/src/pages/index_gulp_include.html`).
Also `gulp` replace html chunkes' inner assets' pathes to be valid to output `index_gulp_include.html` file and then copy and rename it to `index.html` (output `index.html` file path: `<project_name>/src/pages/index.html`).
(check out the `./configs/gulp/gulpfile.js` file for details);

`gulp` uses:

- `gulp-file-include` package to include (using keyword `@@include("path/to/file.html")`) html parts from other html files. Indents are matter! Check the `indent: true` property in the `./configs/gulp/gulpfile.js`;
- `gulp-rename` package to copy `index_gulp_include.html` and rename it to `index.html`;
- `gulp-replace` package to change assets pathes inside html parts to be relative to `index_gulp_include.html`.

#### webpack

`webpack` is turned to bundle all assets and reduce final bundle (for example: images are minimized as possible) to have as result `main.js`, `index.html`, `main.css` and `src/assets` (file structure is save as is! check my custom made function in the `output.assetModuleFilename`. It was made relying on this [webpack 5 assetModuleFilename stackoverflow.com](https://stackoverflow.com/questions/68814833/webpack-5-assets-module-how-to-keep-the-folder-structure-in-the-output-folder)).

Also there's a helper functions to deal with files when they are renamed with additional hash and to import all the assets to the bundle (to use them in future, e.g. not currently desired image, and next one too) (check the `projectName/src/shared/utilities/handleFilesWithDynamicHash/index.js` file for `getCashedFilename` and `importAll` functions)
(check this [webpack official docs link about the dealing with files' hash](https://webpack.js.org/guides/dependency-management/#context-module-api) and [How to copy all images to dist folder instead of only used with webpack 5 stackoverflow.com](https://stackoverflow.com/questions/69120556/how-to-copy-all-images-to-dist-folder-instead-of-only-used-with-webpack-5)).

`webpack` uses:

- `html-loader` for ability to load `.html` files into `*.js` one;
- `html-webpack-plugin` to nest final `script.js` file (currently to the `head` of html file. Check `inject: 'head'` option in the `./configs/webpack/webpack.config.js` HtmlWebpackPlugin options) and final `main.css` styles file to the final html template.
- `image-minimizer-webpack-plugin`, `imagemin`, `imagemin-gifsicle`, `imagemin-jpegtran`, `imagemin-optipng`, `imagemin-svgo` - a fable things to reduce size of the image resources with lossless quality optimization (can be changed, use offical docs for more);
- `mini-css-extract-plugin` - to bundle final external css file;
- `resolve-url-loader` - loader for Sass to ease assets pathes' setting relying on current file but not to the output one (**note**: `sourceMap: true` in the `sass-loader` options is lifeworth required for working the plugin!!!);
- `sass` - for using all SCSS / Sass features;
- `sass-loader` - loader for ability to read and use `.scss` / `.sass` files inside `*.js` one;

#### SCSS / Sass

`Sass` is turned to use all the benefits of the Block Element Modifier (BEM) metodology. There's a commonly using BEM features like reusing as much as possible classes, that are stand for only few goals: mockup forming, styling, coloring, text-style-changing (the most behavior is like Bootstrap for it's classnames usage) and combining classes to implement desired looks without creating a ton of repeated and only for once classes.

`Sass` includes `abstracts` parts that are used in the entire boilerplate. It's an

- `animations` (path: `projectName/src/shared/ui/common styles/abstracts/_animations.scss`),
- `constants` (path: `projectName/src/shared/ui/common styles/abstracts/_constants.scss`),
- `mixins` (path: `projectName/src/shared/ui/common styles/abstracts/_mixins.scss`),
- `placeholders` (path: `projectName/src/shared/ui/common styles/abstracts/_placeholders.scss`).
  You can check them for benefits or delete otherwise (also check `index.scss` file `projectName/src/app/index.scss` to delete unused anymore scss files!).

Also there's `base` folder with styles or classes that impact on entire boilerplate layout view and includes `Blocks` (BEM methodology). There're

- `_normalize.scss` (path: `projectName/src/shared/ui/common styles/base/_normalize.scss`) (to lead the browser styles to be browser independent, to ease crossbrowser app development),
- `_typography.scss` (path: `projectName/src/shared/ui/common styles/base/_typography.scss`) containing all the text heights variables,
- `_common.scss` (path: `projectName/src/shared/ui/common styles/base/_common.scss`) one of the most important files that introduce basic classes for `body`, `containers`, `links`, `text elements` (color-modificators, letter - spacing modificators). This classes will be fundamental for elements in the `app` or `site page` that with usage of a few of their own classes help to reach desire result with minimum efforts.

`layout` folder includes classes that forming `flex` or `grid` layout.

**Caution!** Do not use `css-variables` in the `@mixins` with `@media`! It won't work! Use `SCSS/Sass` variables or `Absolute length units` like `px`. `@media` requires definitely set values, but `css-variables` are computed at the moment of applying to the HTML element.

> Note: Variables do not work inside media queries and container queries. You can use the var() function in any part of a value in any property on an element. You cannot use var() for property names, selectors, or anything aside from property values, which means you can't use it in a media query or container query. [Using CSS custom properties (variables) / MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

`index.scss` entire project styles bundle (details below).

Also it's possible to use `css-modules` via the `css-loader` (check the [css-loader](https://github.com/webpack-contrib/css-loader?tab=readme-ov-file#modules) for details). Read more about the `css-modules` usage at [css-modules](https://github.com/css-modules/css-modules?tab=readme-ov-file) and then just turn the `.(css|sass|scss)` extension of the file with styles into `.module.(css|scss|sass)`.

Since `@import` and global scope styles were officially deprecated by `Sass team`, one should use `@forward` and `@use` instead. Check the [Official Sass docs: breaking changes - @use instead of @import](https://sass-lang.com/documentation/at-rules/use/) and [Official Sass docs: breaking changes - @forward instead of @import](https://sass-lang.com/documentation/at-rules/forward/) for details.

The boilerplate's styles guide is build on `@forward` usage for creating `entire project styles bundle` in the `index.scss` (`projectName/src/shared/ui/common styles/index.scss`) and `@use` for importing `styles bundle` to the necessary `.(css|scss|sass)` files.

So, there're possible usage of the `entire project styles bundle` (common ui styles to prevent unnecessary classes multiplications) and locally scoped `*.module.(css|sass|scss)` styles for `segments`, `slices` or `layers` that contain component's unique data and are small and potentially can have classNames similarity problems all over the project.

Long story short say `index.scss` (`projectName/src/shared/ui/common styles/index.scss`) file is handled as `entire project use bundle` to reduce repetative styles and to feat `DRY principle`, and `.module.(css|scss|sass)` are `css-modules` with `local` scope for `components styling` and avoiding classnames similarity problems.

As for `index.scss` in the `app layer` (`projectName/src/app/styles/index.scss`) it contains `bundles of entire project styles` (the entire project styles for creating the one `*.css` file as result).

---

**note**: pay attention to order of the imported (e.g. via `@forward` and `@use`) files in the `index.scss`! The last imports will override previous one if there's matches in classnames or ids or tags!

---

#### JavaScript / Component approach

`JS` rules all the things inside the boilerplate. The only and one. Entire boilerplate structure is made for only the goal - turn everything into the hierarchical components (React one and other Frameworks like), where every component is as much as possible unconnected and incapsulated unit for maximum reusage by higher ordered ones in a project (it's must be the only strict linear connection from higher standing components to lower one due to Feature-Sliced Design(FSD) architecture principle!).

There're chunks like `_<component_filename>.html`, `_<component_filename>.scss` and optional `_<component_filename>.js` It's possible to include them into upper - standing `index.js` using `webpack` features of loaders and some utilities for creating `html templates`. The `index.js` plays a role of `public api` for other components to import and usage.

There's a `htmlCreateComponentHelper` custom made by myself simple utility (commonly used pattern like factory), that gives an oportunity to create `html templates` to use in a Single Page Aplication (SPA) (nest `html template` on demand with JS usage, React style like) (check for more about the component approach implementation [the Rolling Scopes School lecture (RU) by mentor Viktar Kovalev](https://www.youtube.com/watch?v=Edue1LmnZqo));

But the best possible way for nowdays is to use appropriate to your goals architecture (MVC, MVP, MVVM, Module Architecture, Atomic Design, Feature-Sliced Design(FSD) etc). The boilerplate structure is turned to use FSD architecture (to learn more about FSD check the [FSD official docs](https://feature-sliced.design/docs/get-started)).

### The boilerplate structure and brief descriptions:

- `configs/` - the folder includes config files for: gulp, webpack packages. It's possible to add prettier/eslint/husky to the boilerplate from [boilerplate-eslint-prettier-husky](https://github.com/Dmitriy-Frostoff/boilerplate-eslint-prettier-husky);

**[FSD structure](https://feature-sliced.design/docs/get-started/overview "FSD structure official docs")**  
<a href="https://feature-sliced.design/docs/get-started/overview" target="_blank">  
 <img width="50%" height="50%" src="https://feature-sliced.design/assets/images/visual_schema-e826067f573946613dcdc76e3f585082.jpg" alt="Feature-Sliced Design Basics"/>
</a>

- `projectName/src/` - source folder for `layers` of a future project:

  - `projectName/src/index.js` - the top - level high - ordered `Public API file` to load implemented business logic of `layers` (to render up ready app, in React like way say);

  1. `projectName/src/shared` - `layer`, there're reusable functionality, detached from the specifics of the project/business. (e.g. UIKit, libs, API).

     **Take a notice: `shared` slice doesn't have it's main `Public API file` `index.js`! Instead the `Public API file` is only inside the ready - to - use `segment`!!!**

  - `projectName/src/shared/api` - `slice`, all the APIs for usage all over the app / project from the backend;
  - `projectName/src/shared/assets` - `slice`, there're all the images, icons, fonts, music, video etc sources of a future project as is (includes `segements` in other words);
  - `projectName/src/shared/lib` - `slice`, the libraries commonly used by high - ordered `layers`;
  - `projectName/src/shared/pixel perfect drafts` - `slice`, drafts for desktop, tablet and mobile for usage in the pixel perfect extension in the web browser to check the draft matching (delete it if unnecessary);
  - `projectName/src/shared/projectNameSelfCheck` - `slice`, there's a template function for logging self - check of the task (the Rolling Scopes School for only. Can be deleted easily and don't forget to delete the file's import from `projectName/src/index.js`!);
  - `projectName/src/shared/ui` - `slice`, there're commonly used by high-ordered `slices` UI parts:

    - `projectName/src/shared/ui/common styles`, `segment`: - commonly used styles

      - `projectName/src/components/abstracts` - `segment`, contains parts that are used in a entire future project. There's animations, constants, mixins (like simple functions but in Sass/SCSS), placeholders (behaves a bit like variables in Sass but more powerfull. Check the official docs for more).
        Take a notice: `projectName/src/shared/ui/common styles/abstracts/_constants.scss` turn to use `CSS variables`! It's far convenient for the result css file (`DRY` principle as is);

      - `projectName/src/components/base` - `segment`, there're Blocks (in BEM terminology). For now there're
        `_normalize.scss` (to softly set your browser default styles to be more 'average' with others one to ease the process of crossbrowsers development, based on [`modern-normalize`](https://github.com/sindresorhus/modern-normalize) package),  
        `_typography.scss` - this file includes font data and variables (`CSS variables` to be precise) of font size as for example,  
        `_common.scss` - this file contains the most basic classes of a project perfomance like titles properties, containers properties, modificators for text classes etc;

      - `projectName/src/components/layout` - `segment`, includes `_content-structure.scss` file with basic layouts to use in a future project (one column or multiple columns as basic (or foundation as you wish) and they can be easily added with the necessary property modificators of new styling classes (e.g. for current paragraph or section to align everything to the center etc as BEM recommends, behaves like `CSS frameworks'` classes do)) (`_content-structure.scss` rely on `flex` or `grid` basics, also depend on mixins in the `projectName/src/shared/ui/common styles/abstracts/_mixins.scss` file so check it out or modify for your needs);

  - `projectName/src/shared/utilities` - `segment`, contains utilities and helpers commonly used in the entire app:

    - `projectName/src/shared/utilities/handleFilesWithDynamicHash` - `segment`, the utility to handle appropriately with the files with dynamically generated name hashes. Check the example and docs inside the `projectName/src/shared/utilities/handleFilesWithDynamicHash/getCashedFilename.js` for more;

    - `projectName/src/shared/utilities/handleFilesWithDynamicHash` - `segment`, the utility to improt all files from folder (to nest it to the bundle). Check the example and docs inside the `projectName/src/shared/utilities/handleFilesWithDynamicHash/importAllfromFolder.js` for more;

    - `projectName/src/shared/utilities/htmlCreateComponent` - `segment`, as described above it's an utility to turn your `*.html` chunk file improted to the `*.js` code into the `html template` to use it in your app (e.g. in a `SPA`). Check the example and docs inside the `projectName/src/shared/utilities/htmlCreateComponent/htmlCreateComponentHelper.js` for more;

  **all the next (or higher - ordered `slices`) include Public API `index.js` directly inside the slice (folder) to interract with higher - ordered slices or head - chief over the slices `index.js` file. Use them only to import necessary parts / functionality and to keep `slices` encapsulation**

  2. `projectName/src/entities` — business entities. (e.g., User, Product, Order).  
     More descriptions: Contains the shell of the card with slots for content and the interactive elements. The tile representing the post author is also here, but in a different slice. Simple words say: the product of your internet market, a song of your audioplayer;
  3. `projectName/src/features` — user interactions, actions that bring business value to the user. (e.g. SendComment, AddToCart, UsersSearch, or in simple case - like button in the post, button for share post etc);
     More descriptions: contains the interactivity of the card (e.g., like button) and the logic of processing those interactions. Simple words say: it's an actions over the `entities`;
  4. `projectName/src/widgets` — compositional layer to combine entities and features into meaningful blocks. (e.g. IssuesList, UserProfile).
     More descriptions: contains the "assembled" post card, with content and interactive buttons that are wired up to the relevant calls on the back-end. Simple words say: it's a bunch of `entities` and `features` over them;
  5. `projectName/src/pages` — compositional layer to construct full pages from entities, features and widgets.
     More descriptions: contains the route components for each page in the app, mostly composition, hardly any logic.
     Within that application, let's consider a post card in a news feed. Simple words say: it's an entire ready page that contain `widgets` or `layers` below it in the hierarchy (**strictly** below ones!!!);

     - `projectName/src/pages/index_gulp_include.html` - file that includes `@@include("path/to/html/file")` to be bundled than to a enormous `html bedsheet` => `index.html` (it lays next to `index_gulp_include.html` file). It's far sweet to edit chunks of html files (in `components`) than 'wade through the jungle' of `html bedsheet` as for me;

  - `projectName/src/pages/index.html` - described right above;

  6. `projectName/src/processes` (deprecated) — complex inter-page scenarios. (e.g., authentication);
  7. `projectName/src/app` — app-wide settings, styles and providers.
     More descriptions: contains setup of routing, store and global styles;

  - `projectName/src/app/index.scss` - file with Sass styles that persue the same goal as `index.html` above - bundle global styles;

- `projectName/dist/` - output bundle of a project;
- `.browserslistrc` - file with settings for webpack about prior browsers to traspile app data in order with the settings;
- `.editorconfig` - the project common settings (as for now it's as in RSSchool recommended check the [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) for more.  
  **notice**: `EditorConfig` IDE extension required!);
- .`gitignore` - exlude node_modules from git watching and more settings (check out the file);
- `LICENSE` - license file;
- `package.json` - the heart of all.
  Check the scripts (especially, the pathes for webpack and gulp configs. Currently: './configs/...'). Scripts already have CLI prefixes to link with config and ignore files;

[Also useful link(RU) about the FSD architecture with clear definition and examples by @IrkaTyman](https://habr.com/ru/articles/795823/);

**Important!** If you tend only to transfer module to upper hierarchy one (e.g. `index.scss` from the `app` layer to the main `index.js`) do the following steps:

```js
// projectName/src/app/index.js
import "./index.scss";
```

than

```js
// projectName/src/index.js
import "./app/index.js";
```

to clarify the `Webpack` to handle it correctly.

If there's a need to use imported as a data (e.g. import `.html` file to handle it as a string) step the following:

```js
// projectName/src/app/index.js
import anyNameYouWish from "../pages/index.html";
export { anyNameYouWish };
```

than

```js
// projectName/src/index.js
import "./app/index.js"; /*e.g. to import index.scss from example above (to demand Webpack load global styles)
this is only to show, that it possible to use import 'entireModule' and import {something} from 'entireModule'
*/
import { anyNameYouWish } from "./app/index.js";
```

If there're files like `chunk.abc5d.(css|js|anyExt)` in the `dist` folder so take care of correctness of usage
dynamic `import()`s because exactly it usage (that is `async` naturally) trigger Webpack to emit `fileChunks` [read more here](https://github.com/webpack/webpack/issues/12464).

### Integration with [`Connections`](#Connections) links:

To integrate the boilerplate do the following steps (**note**: copy the project structure as is!!!):

- add the following lines to the `package.json`:

```json
...
"type": "module",
"scripts": {
  "html+dev": "gulp --gulpfile ./configs/gulp/gulpfile.js html && webpack --config ./configs/webpack/webpack.config.js --progress",
  "html": "gulp --gulpfile ./configs/gulp/gulpfile.js html --progress",
  "start": "webpack-dev-server --config ./configs/webpack/webpack.config.js --progress",
  "dev": "webpack --config ./configs/webpack/webpack.config.js --node-env=development --progress",
  "build": "webpack --config ./configs/webpack/webpack.config.js --node-env=production --progress"
},
...
```

- copy the `configs`, `projectName`, `.browserslistrc`, `.editorconfig`, `.gitignore` (optionally);

- install current packages as `devDependencies` via bash command below:

```bash
npm i -D css-loader gulp gulp-cli gulp-file-include gulp-rename gulp-replace html-loader html-webpack-plugin image-minimizer-webpack-plugin imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo mini-css-extract-plugin resolve-url-loader sass sass-loader webpack webpack-cli webpack-dev-server
```

- install current packages as `dependencies` via bash command below:

```bash
npm i modern-normalize
```

- do all the steps from the top of the document's [# !Important](#!Important) (i.e. rename `projectName`, delete unnecessary files);

With the new `packages` releases, the ones above can turn to pumpkin, so check'em out with official docs!!!

### Links:

---

#### Architecture

- [MVC: Model, View, Controller](https://www.codecademy.com/article/mvc);
- [The official docs of Atomic design architecture](https://atomicdesign.bradfrost.com/);
- [The official docs of FSD architecture](https://feature-sliced.design/);
- [The official docs of The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html);
- [Clean Architecture on Frontend by Alex Bespoyasov](https://bespoyasov.me/blog/clean-architecture-on-frontend/);
- [Architecture of modern FRONTEND applications. 5 types. Advantages and disadvantages by `Ulbi TV`(RU)](https://www.youtube.com/watch?v=c3JGBdxfYcU&t=3s);

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
  (**note**: a little bit outdated. There's a CMJ webpack config was used, but never the less is far usefull!!!);
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
- [Webpack 5 creates chunks even though maxChunks set to 1 only with 2 JS entry points](https://github.com/webpack/webpack/issues/12464#issuecomment-766727668);

---

#### Browserslist

- [Official Browserslist docs](https://browsersl.ist/);
- [Official github repo of Browserslist](https://github.com/browserslist/browserslist);

---

#### Modern-normalize

- [Official github repo of Modern-normalize](https://github.com/sindresorhus/modern-normalize);

---

#### Sass / SCSS

- [Official Sass docs](https://sass-lang.com/);
- [Official Sass docs: breaking changes - @use instead of @import](https://sass-lang.com/documentation/at-rules/use/);
- [Official Sass docs: breaking changes - @forward instead of @import](https://sass-lang.com/documentation/at-rules/forward/);
- [Issue with @extend, placeholders and @use](https://github.com/sass/dart-sass/issues/1042);
- [Variables do not work inside media queries and container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties);

---

#### BEM

- [Official BEM docs: Quick start](https://en.bem.info/methodology/quick-start/);

---

#### Node.js

- [Official node.js docs](https://nodejs.org/docs/latest/api/globals.html);
- [Official node.js docs: \_\_dirname](https://nodejs.org/docs/latest/api/modules.html#__dirname);
- [Official node.js docs: \_\_filename](https://nodejs.org/docs/latest/api/modules.html#__filename);

#### Connections:

- [boilerplate-eslint-prettier-husky](https://github.com/Dmitriy-Frostoff/boilerplate-eslint-prettier-husky);
- [boilerplate-jest](https://github.com/Dmitriy-Frostoff/boilerplate-jest);

#### done: December 23, 2024
