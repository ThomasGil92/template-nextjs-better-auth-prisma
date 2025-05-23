# Template Next.js avec Better Auth et Prisma

Ce projet est un template [Next.js](https://nextjs.org) intégrant [Better Auth](https://www.npmjs.com/package/better-auth) pour l'authentification et [Prisma](https://www.prisma.io/) pour la gestion de base de données. Il a été initialement bootstrappé avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Fonctionnalités

- **Next.js 15.3.2** avec App Router et Turbopack
- **Better Auth** pour l'authentification avancée
- **Prisma** pour la gestion de base de données
- **Authentification GitHub** intégrée
- **UI Components** avec Radix UI
- **Styling** avec TailwindCSS 4
- **TypeScript** pour le typage statique

## Prérequis

- Node.js 18+ et npm/yarn/pnpm
- Base de données PostgreSQL (ou autre compatible avec Prisma)

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configurez les variables d'environnement en copiant le fichier `.env.model` vers `.env` et en ajustant les valeurs selon votre environnement.

4. Initialisez Prisma et générez le client :

```bash
npx prisma generate
```

## Démarrage

Lancez le serveur de développement :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

Vous pouvez commencer à éditer les pages en modifiant les fichiers dans le dossier `src/app`. Les pages se mettent à jour automatiquement lorsque vous modifiez les fichiers.

Ce projet utilise [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) pour optimiser et charger automatiquement [Geist](https://vercel.com/font), une nouvelle famille de polices pour Vercel.

## Structure du projet

```
/src
  /app - Pages et routes de l'application
  /components - Composants UI réutilisables
  /lib - Utilitaires et configuration
```

## Authentification

Ce template utilise Better Auth pour l'authentification, configuré dans `src/lib/auth-client.ts`. L'authentification GitHub est également intégrée.

Pour configurer d'autres fournisseurs d'authentification, modifiez les variables d'environnement appropriées dans le fichier `.env`.

## Base de données

Ce template est configuré pour utiliser Prisma avec une base de données PostgreSQL. Vous devez configurer votre propre base de données et mettre à jour la variable `DATABASE_URL` dans le fichier `.env`.

## Ressources

- [Next.js Documentation](https://nextjs.org/docs) - Documentation de Next.js
- [Better Auth Documentation](https://www.npmjs.com/package/better-auth) - Documentation de Better Auth
- [Prisma Documentation](https://www.prisma.io/docs) - Documentation de Prisma
- [Radix UI](https://www.radix-ui.com/docs/primitives/overview/introduction) - Composants UI utilisés dans ce template

## Déploiement

La façon la plus simple de déployer votre application Next.js est d'utiliser la [Plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), créée par les développeurs de Next.js.

Avant le déploiement, assurez-vous de configurer correctement les variables d'environnement sur votre plateforme de déploiement.

Consultez la [documentation de déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying) pour plus de détails.
