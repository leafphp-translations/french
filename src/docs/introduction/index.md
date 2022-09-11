<!-- markdownlint-disable no-inline-html -->
# Introduction

::: tip ⚡️ Publication officielle
Vous consultez la documentation de Leaf v3.0.

- [**Documentation de Leaf 2**](https://archive.leafphp.dev)
- [**Documentation de Leaf 1**](https://v1.leafphp.dev)
:::

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

## Leaf PHP, c'est quoi ?

Leaf est un framework PHP minimal et léger qui permet de démarrer rapidement et facilement des applications web et des API propres, simples, mais puissantes. Au fil des années, nous nous sommes attachés à fournir un code plus simple et plus performant, qui peut être utilisé dans toutes vos applications PHP.

La version 3 de Leaf apporte un thème centré sur l'expérience des développeurs et l'ergonomie, mais avec plein de fonctionnalités tout en veillant à ce que les utilisateurs bénéficient également de la meilleure expérience possible.

[→ Découvrez les fonctionnalités de Leaf 3](/docs/introduction/features)

## Pour commencer

Ce guide nécessite un niveau **basique** de PHP.

::: warning 😵‍💫 Vous ne connaissez pas PHP ?
Si vous n'êtes pas familier avec PHP, nous vous recommandons de consulter le site web [W3Schools PHP Tutorial](https://www.w3schools.com/php/default.asp) avant de continuer. En effet, en utilisant Leaf (ou n'importe quel autre framework), vous écrirez essentiellement du code PHP.
:::

### Installation

<VideoDocs
  subject="Regardez la démo de l'installation de Leaf 3"
  description="Tout au long de la documentation sur Leaf, vous verrez des liens vidéo comme celui qui figure ci-dessous. Si vous êtes un apprenant visuel, cela vous donne un autre moyen de suivre notre documentation. Nous les appelons les VideoDocs."
  link="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

Pour démarrer rapidement avec Leaf, consultez notre [guide d'installation](/docs/introduction/installation.html). Vous y trouverez une explication approfondie pour configurer Leaf à l'aide de différentes méthodes.

::: tip Migration
Vous connaissez déjà Leaf 2 et vous voulez juste vous rencarder sur les nouveautés de Leaf 3 ? Regardez le [guide de migration](/docs/migration/introduction.html) !
:::

Ci-dessous, un exemple de type "hello world" qui vous permettra de découvrir le cœur de Leaf. Les autres parties de la documentation couvrent des exemples plus approfondis. Vous pouvez également consulter nos [expériences codelab](https://codelabs.leafphp.dev) pour des exemples réels et des cas d'utilisation.

## Exemple avec "Hello world"

Au cœur de Leaf PHP se trouve un système qui nous permet de définir des applications de manière déclarative en utilisant une syntaxe agréable et simple :

**index.php:**

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () {
  echo 'Hello world';
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  echo 'Hello world';
});

app()->run();
```

</div>

Nous avons déjà créé notre toute première application Leaf ! C'est aussi simple que ça.

En outre, nous pouvons afficher des données avec la réponse de Leaf. Il s'agit d'un module qui nous permet d'afficher des données de différents types sans aucun souci.

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () use($app) {
  $app->response()->markup('Hello world');
});

$app->run();
```

Alors, vous vous demandez peut-être pourquoi nous devons passer par tout cela juste pour retourner du HTML, tandis que nous pouvons simplement utiliser echo. La raison est simple. `Response` s'occupe de beaucoup de choses pour nous sous le capot et renvoie exactement ce que nous attendons. Regardons un exemple ci-dessous.

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->markup('Hello world');
});

app()->run();
```

Ici, nous utilisons `response` au lieu de `echo` car il s'occupe de beaucoup de choses pour nous sous le capot et renvoie exactement ce que nous attendons. Regardons un exemple ci-dessous.

</div>

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;

$app->get('/', function () {
  // set content-type to json
  Leaf\Http\Headers::contentJSON();

  echo '<b>Hello world</b>';
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  // set content-type to json
  Leaf\Http\Headers::contentJSON();

  echo '<b>Hello world</b>';
});

app()->run();
```

</div>

Lorsque nous exécutons cette commande, nous obtenons "\<b>Hello world\</b>" au lieu de **Hello World**.

Contrairement à la confusion ci-dessus entre le type de contenu et echo, la `response` de Leaf s'assure que peu importe le contenu que nous essayons d'afficher, il est reflété dans le type de contenu. Ce n'est qu'une des nombreuses choses dont la `response` s'occupe automatiquement.

## Mode Fonctionnel

Nous avons surtout parlé des caractéristiques générales qui sont les mêmes que dans Leaf 2, parlons maintenant de quelques nouveautés de Leaf 3.

::: tip
Ceci est seulement une introduction au mode fonctionnel. Lisez la [documentation du mode fonctionnel](/docs/tooling/functions.html) pour en savoir plus.
:::

En fait, Leaf 3 est livré avec des fonctions d'aide globales qui suppriment la seule difficulté que l'on ait jamais rencontrée dans l'utilisation de Leaf, c'est-à-dire les longs espaces de noms et les initialiseurs de classes. Réécrivons le premier exemple "Hello world" en mode fonctionnel.

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  response()->markup('Hello world');
});

app()->run();
```

Vous remarquerez que l'on s'est débarrassé du long `use Leaf\Http\Response;` et même de l'initialiseur de Leaf. Leaf 3 vous aide à vous concentrer sur ce qui est important : votre application. Tout est fait pour vous sous le capot, ou bien mis à votre disposition dans des outils faciles à utiliser.

### Manipuler les entrées utilisateur

Une partie très importante de la construction d'applications web ou API est l'entrée des utilisateurs. Les utilisateurs peuvent transmettre des données à votre application par le biais de formulaires, de requêtes HTTP, d'URL, etc.

Vous devez lire ces données et vous assurer qu'elles ne peuvent pas nuire à votre système avant d'effectuer toute opération sur ces dernières. Cette opération peut être très délicate lorsqu'elle est effectuée avec du PHP brut, surtout lorsque les données arrivent par plusieurs canaux. Leaf a cependant préparé un gestionnaire simple pour cela : `Leaf\Http\Request`. Puisque nous utilisons le mode fonctionnel, nous allons simplement employer la méthode `request` au lieu de cette longue classe.

L'utilisateur navigue à l'adresse **/?greeting=hello%20world**

```php
<?php

require __DIR__ . '/vendor/autoload.php';

app()->get('/', function () {
  // nous obtenons comme ceci les données de la requête en GET depuis l'URL
  $greeting = request()->get('greeting'); // hello world

  // données encodées en json
  response()->json([
    'greeting' => $greeting
  ]);
});

app()->run();
```

Ce qui est magnifique avec l'objet `request`, c'est que toutes les données transmises à votre application sont automatiquement nettoyées pour éviter les attaques (telles que les attaques XSS). Vous avez un code simple et sûr qui travaille pour vous.

## Mode Classe vs Mode Fonctionnel

Leaf vous autorise à écrire votre code de deux manières différentes :

- Utiliser le mode fonctionnel, comme vous avez pu voir juste au-dessus
- Utiliser le mode classe, qui est utilisé depuis la première version de Leaf

### Mode Classe

C'est le mode par défaut pour la plupart des frameworks. Étant donné que Leaf est livré avec des classes, vous pouvez tout à fait construire votre application en utilisant ces classes. Comme la classe `Leaf\Http\Response`, par exemple.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App;

$app->get("/", function () {
  echo "Hello world";
});

$app->run();
```

### Mode Fonctionnel

Il est assez ennuyeux d'utiliser des classes, et de se répéter, principalement à cause des espaces de noms. Vous avez aussi parfois besoin de mettre l'instance d'une classe dans la portée d'une fonction avec `use`. Obtenir l'instance particulière d'une classe peut être difficile, ce qui conduit parfois à réinitialiser la classe. Pour ces raisons (et d'autres), nous avons créé des fonctions sans portée qui vous permettent de construire rapidement vos applications. Ces fonctions renvoient des instances des classes appartenant à Leaf afin que vous n'ayez pas besoin d'utiliser ces classes vous-même.

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  echo "Hello world";
});

app()->run();
```

## Modes dans la documentation

Tout comme Leaf vous permet d'écrire votre code de 2 façons, avec le mode fonctionnel ou le mode classe, les exemples de la documentation peuvent être affichés pour ces deux modes.

Vous pouvez cliquer sur les liens dans la barre latérale pour basculer les exemples de la documentation d'un mode à l'autre.

![Switcher](https://user-images.githubusercontent.com/26604242/178108346-c9c22a19-6a82-4786-ac3e-00cbfe69cba8.png)

## Installer des modules

Les modules sont des packages de fonctionnalité qui ont été créé séparément du noyau de Leaf. Les modules sont utilisés pour étendre les possibilités de Leaf, permettant des opérations non possibles avec Leaf "de base". Les modules ont fait leur apparition avec Leaf 3, mais certains d'entre eux peuvent être utilisés sur d'anciennes versions de Leaf. Ces modules peuvent très bien être utilisés pour des librairies ou sur des frameworks externes. Pour installer un module, exécutez son script d'installation avec Composer, ou bien utilisez Leaf CLI.

Pour vous le montrer, nous allons faire en sorte que l'application retourne un template et plus des données JSON comme précédemment. Pour cela, nous allons avoir besoin d'un module de template. Leaf en possède 3.

- BareUI : très léger, templating engine hyper rapide avec aucune compilation
- Blade : tiré du templating engine du célèbre framework Laravel
- Leaf Veins : templating engine léger mais puissant

Pour cette démo, nous allons utiliser BareUI que nous installerons avec Leaf CLI.

```sh
leaf install bareui
```

Ou avec Composer:

```sh
composer require leafs/bareui
```

Après cela, Leaf va **automatiquement** relier pour vous les classes propres à BareUI et les rendre disponibles en tant que `template`. Maintenant, nous pouvons créer notre template. Appelons-le `index.view.php` (les templates BareUI se terminent par `.view.php`)

```php
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h2><?php echo $greeting; ?></h2>
</body>
</html>
```

La prochaine chose à faire est de dire à BareUI où sont stockés nos templates, puis enfin retourner `index.view.php`.

<div class="class-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App();

// définissons le chemin d'accès aux templates
$app->template->config("path", "./");

$app->get("/", function () use($app) {
  // nous obtenons comme ceci les données de la requête en GET depuis l'URL
  $greeting = $app->request()->get("greeting"); // hello world

  // renvoyons notre template
  echo $app->template->render("index", [
    "greeting" => $greeting,
  ]);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

// définissons le chemin d'accès aux templates
app()->template->config("path", "./");

app()->get("/", function () {
  // nous obtenons comme ceci les données de la requête en GET depuis l'URL
  $greeting = request()->get("greeting"); // hello world

  // renvoyons notre template
  echo app()->template->render("index", [
    "greeting" => $greeting,
  ]);
});

app()->run();
```

</div>

Comme vous pouvez le voir ci-dessus, la plupart des modules Leaf ne nécessitent absolument aucune configuration pour fonctionner avec le noyau Leaf. Ils s'intègrent, tout simplement.

## Vous en voulez plus ?

Nous avons brièvement présenté les fonctions les plus basiques de Leaf 3 - le reste de ce guide les reprendra, ainsi que d'autres fonctions plus avancées, de manière beaucoup plus détaillée, alors, assurez-vous d'en faire connaissance !

## Prochaines étapes

Si vous avez sauté [l'introduction](/guide/introduction), nous vous recommandons fortement de la lire avant de passer à la suite.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/docs/introduction/installation">
    <h3 class="next-steps-link">Continuer le Guide</h3>
    <small class="next-steps-caption">Le guide vous accompagnera à travers tous les aspects du framework, dans tous les détails.</small>
  </a>
  <a class="vt-box" href="/docs/introduction/first-app">
    <h3 class="next-steps-link">Suivre le tutoriel</h3>
    <small class="next-steps-caption">Pour ceux qui préfèrent apprendre les choses par la pratique. Construisez quelque chose de réel !</small>
  </a>
  <a class="vt-box" href="https://codelabs.leafphp.dev" target="_blank">
    <h3 class="next-steps-link">Découvrez CodeLabs</h3>
    <small class="next-steps-caption">Codelabs fournit des didacticiels interactifs avec des explications approfondies.</small>
  </a>
</div>
