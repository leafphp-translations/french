<!-- markdownlint-disable no-inline-html -->

# Installation

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

::: tip Lancement de Leaf 3 🎊
La version officielle de Leaf 3 release candidate est sortie
:::

Leaf 3 a été conçu pour être adopté de manière incrémentielle. Cela signifie qu'il peut être intégré dans un projet de plusieurs façons, en fonction des besoins.

Il y a quatre façons principales d'ajouter le Leaf PHP à un projet :

1. Utiliser [Leaf CLI](https://cli.leafphp.dev/) pour monter un projet **[RECOMMANDÉ]**.
2. Télécharger Leaf via Composer
3. Utiliser [Leaf skeleton](https://leafphp.netlify.app/#/skeleton/v/2.0/) pour démarrer rapidement un projet
4. Télécharger le dépôt Leaf

::: tip Migration
Si vous voulez migrer un projet Leaf 2 existant, allez directement au [Guide de migration](/docs/migration/introduction.html)
:::

## Notes de version

Dernière version de Leaf 3 : ![Version stable la plus récente](https://poser.pugx.org/leafs/leaf/v/stable)

Notes détaillées à propos de cette version disponibles sur [GitHub](https://github.com/leafsphp/leaf/releases/tag/v3.0).

## Leaf CLI

<VideoDocs
  subject="Regardez la procédure d'installation de Leaf 3"
  description="Vous pouvez jeter un coup d'œil à l'installation d'un projet via Leaf CLI sur YouTube"
  link="https://www.youtube.com/embed/PuOk5xqTIsA"
/>

Leaf fournit une [CLI officielle](https://github.com/leafsphp/cli) pour créer et gérer rapidement vos applications Leaf. Il suffit de quelques secondes pour être opérationnel avec votre application. Consultez la [documentation sur le CLI de Leaf](https://cli.leafphp.dev) pour plus de détails.

```sh
leaf create <project-name> --v3
```

Pour installer des modules, utilisez cette syntaxe :

```sh
leaf install cors
```

Et pour lancer votre application Leaf :

```sh
leaf serve
```

## Composer

<!-- <VideoDocs
  subject="Regardez l'installation via Composer sur YouTube"
  description="Apprenez à installer Leaf 3 avec Composer"
  link="https://www.youtube.com/watch?v=t-pNURSTOKw"
/> -->

Vous pouvez également créer un nouveau projet Leaf 3 en utilisant Composer :

```sh
# Dernière version stable (v3)
$ composer require leafs/leaf

# Version 3 dev
$ composer require leafs/leaf dev-v3.x-dev
```

Après l'installation de Leaf, you allez devoir créer le fichier `index.php`, qui sera le point d'entrée de votre application.

<div class="class-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new Leaf\App;

$app->get("/", function () use($app) {
  $app->response()->json(["message" => "Hello World!"]);
});

$app->run();
```

</div>

<div class="functional-mode">

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  response()->json(["message" => "Hello World!"]);
});

app()->run();
```

</div>

Vous pourriez avoir envie de lire la partie concernant la [réécriture d'URL](/docs/introduction/url-rewriting.html).

## GitHub

<!-- <VideoDocs
  subject="Regardez l'installation via le dépôt GitHub"
  description="Apprenez à configurer une application Leaf à partir de GitHub."
  link="https://www.youtube.com/watch?v=t-pNURSTOKw"
/> -->

Vous pouvez aussi cloner le dépôt de Leaf 3.

::: tip Installation
Obtenez la version v3.x-dev ici.

<div style="margin-bottom: 30px;">
  <a href="https://github.com/leafsphp/leaf/releases/latest">Télécharger le dépôt</a>
</div>
:::

Après avoir téléchargé le dépôt, vous devez créer un autoloader.

**Exemple : `autoloader.php`**

```php
<?php
spl_autoload_register(function ($class) {
  $file = str_replace('\\', '/', $class);

  if (!file_exists("leaf/src/$file.php")) return;

  require "leaf/src/$file.php";
});
```

L'autoloader vous permettra d'utiliser les fichiers Leaf sans avoir à les `require` ou les `include` au préalable. Ainsi, l'utilisation de `Leaf\App` chargera `leaf\src\App.php`.

**Cette opération est requise seulement si vous téléchargez le dépôt.**

Maintenant, tout ce que vous avez à faire est de créer votre fichier `index.php`, d'installer les dépendances de Leaf (modules de base) et d'inclure votre autoloader comme ceci :

```php
<?php

require __DIR__ . "leaf/vendor/autoload.php";
require __DIR__ . "autoloader.php";
```

::: warning Notez ceci
Le mode fonctionnel n'est pas automatiquement disponible si vous suivez cette méthode d'installation. Pour se faire, vous devrez ajouter manuellement le fichier de fonctions Leaf dans votre application ou dans l'autoloader.
:::

```php{5}
<?php

require __DIR__ . "leaf/vendor/autoload.php";
require __DIR__ . "autoloader.php";
require __DIR__ . "leaf/src/functions.php";
```

Bien que cette méthode soit un peu plus compliquée, elle vous donne un contrôle total sur Leaf et son fonctionnement puisque vous aurez l'accès au code source. Vous pouvez directement modifier Leaf pour qu'il se comporte comme bon vous semble. Ceci dit, si ce n'est pas utile pour vous, nous vous recommandons d'installer Leaf avec Composer, ou si vous souhaitez une installation de base, vous pouvez suivre l'une des méthodes ci-dessous.

## Leaf Skeleton

Leaf Skeleton est un boilerplate officiel de Leaf qui contient une installation par défaut avec une configuration et une installation MVC optionnelles.

::: warning Note
Skeleton avec Leaf 3 est aussi disponible via Leaf CLI. Vous pouvez rapidement créer un projet Leaf Skeleton avec :

```sh
leaf create <project-name> --skeleton --v3
```

:::

La principale installation de Leaf Skeleton se fait via Composer :

```sh
composer create-project leafs/skeleton <project-name>
```
