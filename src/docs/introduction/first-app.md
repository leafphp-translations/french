# Votre première application

::: tip Prérequis

- Connaissances de base en PHP

:::

Il s'agit d'un tutoriel interactif pour vous aider à démarrer, de l'installation à la création de votre première application Leaf 3. Ce tutoriel nécessite des connaissances de base en PHP et, en option, des connaissances sur les APIs.

## Pour démarrer

::: tip Leaf CLI
Nous vous recommandons d'utiliser [Leaf CLI] (https://cli.leafphp.dev) pour créer et gérer vos projets Leaf.
:::

Pour commencer, nous devons générer une application Leaf. Nous pouvons le faire simplement via Leaf CLI :

```sh
leaf create <your-project-name> --basic --v3
```

<!-- ```sh
$ leaf init

✔ Project name: … <your-project-name>
✔ Select a preset … MVC, API, Skeleton, Basic
✔ Add Leaf Auth for authentication? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Generate sample tests? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
``` -->

Ou avec Composer :

```sh
composer require leafs/leaf
```

Après cela, vous devrez créer un fichier `index.php`. *Ceci est déjà fait pour vous si vous avez utilisé Leaf CLI.*

## Le démarreur de votre application

Maintenant que Leaf est installé, vous aurez besoin d'un fichier qui servira de racine à votre projet. Leaf utilise un seul fichier racine, vers lequel toutes les routes sont envoyées. Leaf prend alors la route et appelle le gestionnaire correspondant. Vous pouvez en lire plus dans la [doc sur le routage](/docs/routing/).

Votre fichier de démarrage importera Leaf et contiendra vos routes.

```php
<?php

require __DIR__ . '/vendor/autoload.php';
```

Ce qui précède importe en quelque sorte nos dépendances installées et nous permet de les utiliser sans les `require` ou les `include` une par une.

A partir d'ici, nous pouvons commencer à construire notre application.

<div class="class-mode">

Définissons une route pour essayer.

```php{3-5}
$app = new Leaf\App();

$app->get('/', function () {
  echo 'Un petit message';
});

// n'oubliez pas d'appeler la méthode `run`
$app->run();
```

</div>

<div class="functional-mode">

Normalement, nous devrions initialiser Leaf, cependant, avec l'arrivée du mode Fonctionnel, nous n'avons pas besoin de le faire. Nous pouvons passer directement à la construction de notre application.

Définissons une route pour essayer.

```php{1-3}
app()->get('/', function () {
  echo 'Un petit message';
});

// n'oubliez pas d'appeler la méthode `run`
app()->run();
```

</div>

Définir une route est aussi simple que cela avec Leaf. Ici, nous avons juste défini la route `GET /`. Nous pouvons maintenant exécuter notre application avec `leaf serve` si vous utilisez Leaf CLI,  ou bien avec le serveur intégré `php -S localhost:[PORT]`.

## Notre application

Maintenant que nous avons terminé la configuration de notre "Hello world", nous pouvons commencer notre application. Nous allons construire une application simple de prise de notes qui nous permettra de créer et de récupérer des notes depuis une base de données.

## Modules

Les modules sont des morceaux de fonctionnalités de Leaf qui sont proposés comme des plugins installables. Ils ont été créés dans le but d'empêcher Leaf de s'encrasser comme d'autres frameworks. Cela signifie que vous pouvez avoir seulement ce dont vous avez besoin dans votre application, et toujours étendre la puissance de Leaf en fonction de ce que vous voulez faire.

Comme vous le verrez, les modules sont installés à l'aide de Leaf CLI ou de Composer. Pour cette application, nous allons utiliser le module `db` pour accéder à notre base de données.

## Récupérer nos notes

### Création de notre route

Pour commencer cette étape, nous devons créer une route en GET qui renverra toutes les notes de notre base de données. Comme nous savons déjà comment créer des routes comme celle de l'exemple ci-dessus, cette étape est assez simple.

<div class="class-mode">

```php
$app->get('/notes', function () {
  // récupère toutes les notes de la base
  // renvoie les notes en JSON
  echo 'Toutes les notes';
});
```

</div>

<div class="functional-mode">

```php
app()->get('/notes', function () {
  // récupère toutes les notes de la base
  // renvoie les notes en JSON
  echo 'Toutes les notes';
});
```

</div>

### Récupération des notes

Comme mentionné ci-dessus, nous allons utiliser le module **db** pour accéder à notre base de données. Leaf DB a rendu les opérations de base de données vraiment simples et accessibles à tous. Vous n'avez même pas besoin de connaissances en SQL pour l'utiliser.

#### Installation du module **db**

Pour installer le module **db**, nous allons utiliser Leaf CLI

```sh
leaf install db
```

Vous pouvez aussi le faire via Composer :

```sh
composer require leafs/db
```

#### Connexion à notre base de données

Une fois le module installé, nous pouvons retourner dans notre application et nous connecter à notre base de données.

<div class="class-mode">

```php
$db = new Leaf\Db;
$db->connect('127.0.0.1', 'dbname', 'username', 'password');
```

</div>

<div class="functional-mode">

```php
db()->connect('127.0.0.1', 'dbname', 'username', 'password');
```

</div>

Nous pouvons placer ce code avant nos routes, afin de pouvoir utiliser la variable `$db` partout.

#### Utilisation du module **db**

<div class="class-mode">De retour dans notre route, nous pouvons passer la variable `$db` et commencer à l'utiliser. Vous pouvez consulter la [doc du module db](/modules/db/) pour plus d'informations.</div>

Ce que nous voulons faire ici est de récupérer toutes les données de notre table notes, nous pouvons le faire simplement en utilisant `select`. C'est une méthode fournie par leaf db qui nous permet d'exécuter la commande SQL `SELECT`.

<div class="class-mode">

```php
$app = new Leaf\App;
$db = new Leaf\Db;

$db->connect('127.0.0.1', 'dbname', 'username', 'password');

// on passe la variable $db en callback avec `use`
$app->get('/notes', function () use($db) {
  
  // on récupère toutes les notes de la base
  $notes = $db->select('notes')->all();

  // on renvoie les notes sous forme de JSON
  echo 'Toutes les notes';
});
```

</div>

<div class="functional-mode">

```php
db()->connect('127.0.0.1', 'dbname', 'username', 'password');

app()->get('/notes', function () {

  // on récupère toutes les notes de la base
  $notes = db()->select('notes')->all();

  // on renvoie les notes sous forme de JSON
  echo 'Toutes les notes';
});
```

</div>

Maintenant que nous avons été en mesure de récupérer nos données dans la base de données, voyons comment nous pouvons afficher ces données.

### L'objet Response

L'objet Response est une librairie permettant de gérer la manière dont les données sortent de votre application. Son interface est simple et facile d'utilisation<span class="functional-mode">, et avec le mode Fonctionnel, il peut être utilisé n'importe où dans votre application, sans avoir à l'initialiser</span>.

Dans les lignes ci-dessus, nous avons récupéré nos données depuis la base de données. Maintenant, tout ce qui nous reste à faire est de renvoyer ces données en JSON. Nous pouvons le faire simplement en appelant la méthode `json` sur l'objet Response.

<div class="class-mode">

```php
$app->get('/notes', function () use($app, $db) {
  $notes = $db->select('notes')->all();

  $app->response()->json([
    'status' => 'success',
    'data' => $notes,
  ]);
});
```

</div>
<div class="functional-mode">

```php
app()->get('/notes', function () {
  $notes = db()->select('notes')->all();

  response()->json([
    'status' => 'success',
    'data' => $notes,
  ]);
});
```

</div>

Ce qui produira le retour d'un JSON :

```json
{
  "status": "success",
  "data": [...]
}
```

## Sauvegarder nos notes

Nous devons créer une autre route pour gérer l'ajout de nouvelles notes dans la base de données. Dans ce cas, nous allons créer une route accessible en POST, ce qui signifie que vous devrez créer une requête POST pour y accéder. Cela peut être fait en utilisant un client HTTP quelconque.

Cette nouvelle route prendra certaines données de notre application, puis sélectionnera uniquement ce qui doit être sauvegardé dans la base de données, et enfin renverra un message.

<div class="class-mode">

```php
$app->post('/notes/new', function () use($db) {
  // obtenir les données à partir de la requête
  // sauvegarder les données dans la base
  // renvoyer un message de succès
});
```

</div>
<div class="functional-mode">

```php
app()->post('/notes/new', function () {
  // obtenir les données à partir de la requête
  // sauvegarder les données dans la base
  // renvoyer un message de succès
});
```

</div>

### L'objet Request

Comme nous l'avons vu avec l'objet Response, Leaf fournit également un objet Request qui nous permet d'obtenir rapidement et en toute sécurité les données qui entrent dans notre application.

<div class="class-mode">

```php
$item = $app->request()->get('item');
```

</div>
<div class="functional-mode">

```php
$item = request()->get('item');
```

</div>

Cette ligne va récupérer des données avec la clé `item` passée dans l'application depuis un formulaire, une url ou toute autre donnée et les sauvegarder dans la variable `$item`. Dans ce cas, notre application va accepter `title`, `body` et `date` que nous allons sauvegarder dans la base de données.

Pour ce faire, nous pouvons les récupérer un par un comme nous l'avons fait ci-dessus, mais Leaf propose une méthode plus simple.

<div class="class-mode">

```php
$data = $app->request()->get(['title', 'body', 'date']);
```

</div>
<div class="functional-mode">

```php
$data = request()->get(['title', 'body', 'date']);
```

</div>

Ainsi, toutes les autres données transmises dans notre application seront ignorées, mais resteront disponibles pour être utilisées.

### Sauvegarde des données dans la base

Pour sauvegarder les données dans la base de données, nous allons utiliser le module **db** comme nous l'avons fait ci-dessus. Cette fois, nous utiliserons la méthode `insert` à la place.

<div class="class-mode">

```php
$db->insert('notes')->params($data)->execute();
```

</div>
<div class="functional-mode">

```php
db()->insert('notes')->params($data)->execute();
```

</div>

`execute` est utilisé pour les commandes qui ne retournent aucune valeur comme `insert` et `update`.

Si nous récapitulons, nous avons :

<div class="class-mode">

```php
$app->post('/notes/new', function () use($app, $db) {
  // obtenir les données à partir de la requête
  $data = $app->request()->get(['title', 'body', 'date']);

  // sauvegarder les données dans la base
  $db->insert('notes')->params($data)->execute();

  // renvoyer un message de succès
  $app->response()->json([
    'status' => 'success',
    'message' => 'Notes saved'
  ]);
});
```

</div>
<div class="functional-mode">

```php
app()->post('/notes/new', function () {
  // obtenir les données à partir de la requête
  $data = request()->get(['title', 'body', 'date']);

  // sauvegarder les données dans la base
  db()->insert('notes')->params($data)->execute();

  // renvoyer un message de succès
  response()->json([
    'status' => 'success',
    'message' => 'Notes saved'
  ]);
});
```

</div>

## Mise en place globale

<div class="class-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

$app = new Leaf\App;
$db = new Leaf\Db;

$db->connect('127.0.0.1', 'dbname', 'username', 'password');

$app->get('/notes', function () use($app, $db) {
  $notes = $db->select('notes')->all();

  $app->response()->json([
    'status' => 'success',
    'data' => $notes,
  ]);
});

$app->post('/notes/new', function () use($app, $db) {
  $data = $app->request()->get(['title', 'body', 'date']);

  $db->insert('notes')->params($data)->execute();

  $app->response()->json([
    'status' => 'success',
    'message' => 'Notes saved'
  ]);
});

$app->run();
```

</div>
<div class="functional-mode">

```php
<?php

require __DIR__ . '/vendor/autoload.php';

db()->connect('127.0.0.1', 'dbname', 'username', 'password');

app()->get('/notes', function () {
  $notes = db()->select('notes')->all();

  response()->json([
    'status' => 'success',
    'data' => $notes,
  ]);
});

app()->post('/notes/new', function () {
  $data = request()->get(['title', 'body', 'date']);

  db()->insert('notes')->params($data)->execute();

  response()->json([
    'status' => 'success',
    'message' => 'Notes saved'
  ]);
});

app()->run();
```

</div>

Comme vous pouvez le constater, nous avons créé une application de prise de notes en moins de 30 lignes de code avec Leaf !
