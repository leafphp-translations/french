# Guide de migration

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

<!-- <VideoDocs
  subject="Watch the migration guide on youtube"
  description="[@mychidarko](https://github.com/mychidarko) gives a walkthrough on migrating a leaf 2 app to use leaf 3 and modules."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

Ce guide s'adresse principalement aux utilisateurs ayant déjà une expérience de Leaf 2 et qui souhaitent se familiariser avec les nouvelles fonctionnalités et les changements de Leaf 3. **Il ne s'agit pas d'un document que vous devez lire de bout en bout avant d'essayer Leaf 3**. Bien que beaucoup de choses semblent avoir changé, une grande partie de ce que vous connaissez et aimez dans Leaf est toujours la même. Nous avons voulu être aussi complets que possible et fournir des explications détaillées et des exemples pour chacun des changements.

::: warning Je viens d'un autre framework
Migration à partir d'un autre framework ? [LISEZ CECI](/docs/migration/other) pour démarrer.
:::

- [Démarrage rapide](#quickstart)
- [Changements](#breaking-changes)
- [Nouvelles fonctionnalités importantes](#notable-new-features)
<!-- - [Supporting Libraries](#supporting-libraries) -->

<!-- ## Overview

<br>
<iframe src="https://player.vimeo.com/video/440868720" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

Start learning Leaf 3 at [Leaf Mastery](https://www.Leafmastery.com/courses-path/Leaf3). -->

## Démarrage rapide

Si vous voulez rapidement créer uun nouveau projet avec Leaf 3, créez un dossier et exécutez :

```sh
composer require leafs/leaf
```

Cela permettra de configurer rapidement Leaf 3 avec les modules par défaut. A partir de là, créez votre fichier `index.php` et ajoutez ce code.

<div class="functional-mode">

En utilisant le mode Fonctionnel :

```php
<?php

require __DIR__ . "/vendor/autoload.php";

app()->get("/", function () {
  response()->json(["name" => "Leaf"]);
});

app()->run();
```

</div>
<div class="class-mode">

En utilisant le mode Classe :

```php
<?php

require __DIR__ . "/vendor/autoload.php";

$app = new \Leaf\App();

$app->get("/", function () use($app) {
  $app->response()->json(["name" => "Leaf"]);
});

$app->run();
```

</div>

Vous pouvez ensuite le serveur PHP intégré

```sh
php -S localhost:5500
```

Vous pouvez aussi utiliser Leaf CLI:

```sh
leaf create <app-name> --v3
```

Et lancez votre application avec :

```sh
leaf serve
```

### Migration depuis Leaf 2

Comme nous l'avons déjà mentionné, nous avons rendu Leaf 3 aussi rétrocompatible que possible avec Leaf 2.5+. Cela signifie que le passage de la v2 à la v3 sera un jeu d'enfant, ou presque.

- Installez Leaf 3

```sh
composer require leafs/leaf
```

Ou avec Leaf CLI

```sh
leaf install leaf
```

::: tip Attention
Vous devriez probablement supprimer votre dossier `vendor` et `package-lock.json` avant d'exécuter la commande ci-dessus pour vous assurer que toutes les dépendances sont correctement réinstallées.
:::

- Après cela, il s'agit juste d'installer les modules requis dans votre projet.
Par exemple, si vous utilisez `Leaf\Auth`, vous devrez installer le module **auth**.

Cela peut être fait avec :

```sh
leaf install auth
```

Ou avec Composer:

```sh
composer require leafs/auth
```

Faites de même pour tous les autres modules de votre projet. Votre application devrait être de nouveau sur pied et fonctionner encore plus rapidement qu'avant.

## Changements

Ce qui suit consiste en une liste de changements par rapport à la version 2.x :

### Modules

Leaf 3 ne conserve que le noyau du framework avec quelques utilitaires, toutes les autres fonctionnalités ont été empaquetées comme des modules. Cela signifie que vous aurez des erreurs si vous essayez d'utiliser certains paquets comme `Leaf\Auth` ou `Leaf\Flash` sans les avoir installés au préalable.

Ce n'est pas vraiment un problème puisque l'installation dudit module résout automatiquement tous les problèmes liés à son absence.

### CORS

Dans la v2, une configuration de base du CORS était disponible sur l'objet Leaf, mais elle a été abandonnée et remplacée par le module **cors**. Ce module contient des configurations CORS de base et avancées et s'inspire du package cors d'ExpressJS. Ainsi, si vous avez de l'expérience avec cette bibliothèque, vous n'aurez aucun problème à utiliser le module cors de Leaf.

Pour résoudre les problèmes de cors dans votre application Leaf 2, suivez ces étapes :

- Installez le module **cors**

```sh
composer require leafs/cors
```

Remplacez la configuration originale de cors par le module cors. (Ceci est fait sous le capot pour vous, tout ce que vous avez à faire maintenant est d'appeler la méthode cors dans votre application Leaf).

<div class="class-mode">

Remplacez ceci :

```php
$app = new Leaf\App;

$app->evadeCors(true);

// ...
```

par...

```php
$app = new Leaf\App;

$app->cors();

// ...
```

</div>
<div class="functional-mode">

Remplacez ceci :

```php
app()->evadeCors(true);

// ...
```

par...

```php
app()->cors();

// ...
```

</div>

La méthode cors est automatiquement liée au module cors par Leaf et donc, aucune configuration supplémentaire n'est nécessaire pour la faire fonctionner. Cors prend en compte certaines configurations optionnelles, consultez la [doc du module cors](/modules/cors/). De plus, cors n'est plus disponible sur l'objet Response.

### Routeur

`Leaf\Router::getRequestMethod` a été déplacé vers `Leaf\Http\Request::getMethod`. Cette fonction est utilisée dans le noyau de Leaf et ne devrait pas poser de problème. Cependant, si vous avez des références à cette fonction et l'utilisez dans votre application, changer vos références avec `Leaf\Http\Request::getMethod` corrigera toute erreur.

## Nouvelles fonctionnalités importantes

Voici quelques-unes des nouvelles fonctionnalités de Leaf 3 sur lesquelles garder un œil :

- [Fonctions globales](/docs/tooling/functions)
- [Module CORS](/modules/cors/)
