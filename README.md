# 🎬 Monorepo Cineconnect

Afin d'utiliser cette application dans de bonnes conditions, merci de respecter les règles et étapes suivantes.

---

## ✅ Prérequis

Assurez-vous d'avoir installé les outils suivants sur votre machine :

- **Docker**
- **pnpm**

---

## 🚀 Installation et lancement du projet

### 1. Installer les dépendances du projet

À la racine du monorepo, exécutez :

```bash
pnpm install
```

ou

```bash
pnpm i
```

### 2. Lancer la base de données PostgreSQL

Via Docker :

```bash
docker compose up -d
```

> 💡 Vous pouvez également utiliser une base de données PostgreSQL existante si vous le souhaitez.

### 3. Configurer les variables d'environnement

- Dupliquez le fichier `.env.example`
- Renommez-le en `.env`
- Renseignez les informations demandées (base de données, ports, etc.)

---

## 📜 Scripts utiles

### 🔹 À la racine du projet

- `pnpm dev` — Lance simultanément le frontend et le backend
- `pnpm install` ou `pnpm i` — Installe toutes les dépendances du projet

### 🔹 Server (Backend)

- `pnpm watch` — Surveille les changements dans le code TypeScript et le recompile automatiquement
- `pnpm start` — Compile le code TypeScript et le lance une seule fois  
  ⚠️ En cas de modification du code TypeScript, la commande doit être relancée
- `pnpm build` — Compile le code TypeScript
- `pnpm dev` — Lance le code JavaScript  
  ⚠️ Le code TypeScript doit être compilé au préalable pour que les changements soient pris en compte

### 🔹 Client (Frontend)

- `pnpm build` — Génère un dossier `dist` pour le déploiement
- `pnpm dev` — Lance le frontend en mode développement

---

## 💡 Conseil de développement

Pour un workflow plus fluide :

1. Dans le dossier `server`, lancez :

```bash
pnpm watch
```

2. Puis, à la racine du projet, lancez :

```bash
pnpm dev
```

👉 Cela permet d'éviter de recompiler manuellement le backend à chaque modification.