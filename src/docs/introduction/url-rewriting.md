<!-- markdownlint-disable no-inline-html -->

# Réécriture d'URL

<script setup>
import VideoDocs from '/@theme/components/VideoDocs.vue'
</script>

En gros, nous essayons de pousser toutes les requêtes faites au serveur vers un seul fichier racine, donc une requête faite à `/home.php` sera dirigée vers le fichier racine de notre choix.... habituellement `index.php`.

Cette fonction qui semble complexe peut être réalisée en configurant le serveur web de votre choix.

<!-- <VideoDocs
  subject="Watch URL rewriting explained on youtube"
  description="Watch URL rewriting explained."
  link="https://www.youtube.com/embed/BTcUgeOZLyM"
/> -->

## Apache - .htaccess

Voici un exemple de base d'un fichier htaccess. Pour résumer, il redirige toutes les requêtes vers notre fichier `index.php`.

```htaccess
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule . index.php [L]
```

Sauvegardez le fichier `.htaccess` dans le même répertoire que votre "fichier racine".

## Nginx - nginx.conf

Un exemple de base avec un serveur web nginx :

```nginx
try_files $uri /index.php;
```

Vous pouvez accéder via les liens ci-dessous à un aperçu de la réécriture d'url.

- [Introduction à la réécriture d'URL](https://www.smashingmagazine.com/2011/11/introduction-to-url-rewriting/)
- [Variations entre .htaccess et nginx.conf](https://gist.github.com/bramus/5332525)
