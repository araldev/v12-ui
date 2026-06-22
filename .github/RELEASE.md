# 📦 Release & Commit Workflow

Tutorial completo del flujo de releases automatizados de **v12-ui** con `semantic-release` + `commitizen` + `cz-conventional-changelog`.

---

## 🎯 ¿Qué hace este setup?

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  git commit │ ──▶ │    GitHub     │ ──▶ │  semantic-   │ ──▶ │   Publica a   │
│  (con cz)   │     │   Actions     │     │   release     │     │   npm + tag   │
└─────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                                            │
                                            ├─▶ CHANGELOG.md
                                            ├─▶ GitHub Release page
                                            └─▶ Storybook deploy
```

**Total automation**: vos solo hacés `git push`. Todo lo demás es automático.

---

## 📚 Stack de herramientas

| Herramienta | Rol |
|-------------|-----|
| **`commitizen`** | CLI interactivo para hacer commits guiados |
| **`cz-conventional-changelog`** | Adapter de Conventional Commits |
| **`semantic-release`** | Motor que analiza commits y publica |
| **`@semantic-release/commit-analyzer`** | Detecta el tipo de bump (major/minor/patch) |
| **`@semantic-release/release-notes-generator`** | Genera release notes markdown |
| **`@semantic-release/changelog`** | Actualiza `CHANGELOG.md` |
| **`@semantic-release/npm`** | Publica el paquete a npm |
| **`@semantic-release/github`** | Crea GitHub Release + tag |
| **`@semantic-release/git`** | Commitea package.json + changelog |

---

## 🔑 Configuración inicial (una sola vez)

### 1. Token de npm

```bash
# Andá a https://www.npmjs.com/settings/your-user/tokens
# Click "Generate New Token" → Type: "Automation"
# Copialo — no lo vas a ver de nuevo
```

### 2. Secret en GitHub

```
GitHub repo → Settings → Secrets and variables → Actions → New repository secret

Name:  NPM_TOKEN
Value: <el token que generaste>
```

`GITHUB_TOKEN` se crea solo.

### 3. Tag inicial (solo para el primer release)

```bash
git tag v0.1.0
git push origin v0.1.0
```

Esto le dice a semantic-release "desde acá empezás".

---

## 🌿 Branching model

Configurado en `package.json`:

```json
"branches": [
  "main",
  "next",
  { "name": "beta",  "prerelease": true },
  { "name": "alpha", "prerelease": true }
]
```

| Branch | Versión que genera | Cuándo usar |
|--------|-------------------|-------------|
| `main` | `0.1.0`, `0.2.0`, `1.0.0` | Releases estables |
| `next` | `1.0.0` (next major) | Pre-release de la próxima major |
| `beta` | `0.2.0-beta.1` | Beta testing |
| `alpha` | `0.2.0-alpha.1` | Alpha testing |

---

## 🚀 Workflow diario

### Paso 1: Hacés cambios en código

```bash
git checkout main
git pull
# editás archivos...
git add .
```

### Paso 2: Commit con wizard (OBLIGATORIO usar esto)

```bash
npm run commit
# O equivalentemente:
npx cz
```

Esto te abre un wizard interactivo:

```
? Select the type of change that you're committing: (Use arrow keys)
❯ feat:        A new feature
  fix:         A bug fix
  docs:        Documentation only changes
  style:       Changes that do not affect the meaning of the code
              (white-space, formatting, missing semi-colons, etc)
  refactor:    A code change that neither fixes a bug nor adds a feature
  perf:        A code change that improves performance
  test:        Adding missing tests or correcting existing tests
  build:       Changes that affect the build system or external dependencies
  ci:          Changes to our CI configuration files and scripts
  chore:       Other changes that don't modify src or test files

? What is the scope of this change (e.g. component or file name): (press enter to skip)
 button

? Write a short, imperative tense description of the change (max 94 chars):
 add as="a" variant with required href

? Provide a longer description of the change: (press enter to skip)

? Are there any breaking changes? (y/N)
 N

? Does this change affect any open issues? (y/N)
 N

# Genera el commit:
# feat(button): add as="a" variant with required href
```

### Paso 3: Push

```bash
git push origin main
```

### Paso 4: Magia (automático)

GitHub Actions corre el workflow `.github/workflows/release.yml` que ejecuta `npx semantic-release`.

---

## 📊 Cómo decide semantic-release la versión

`semantic-release` analiza tus commits desde el último tag y decide el bump:

| Commits desde último tag | Bump | Ejemplo |
|--------------------------|------|---------|
| Contiene `BREAKING CHANGE:` o `feat!:` | **Major** | `1.2.3 → 2.0.0` |
| Contiene `feat:` | **Minor** | `1.2.3 → 1.3.0` |
| Contiene `fix:` o `perf:` | **Patch** | `1.2.3 → 1.2.4` |
| Solo `docs:`, `chore:`, `style:`, `test:`, `ci:`, `build:` | **Sin release** | `🔹 No release published` |

---

## 📝 Convención de commits

### Formato

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos válidos

| Tipo | Cuándo | Bump | Ejemplo |
|------|--------|------|---------|
| `feat` | Nueva funcionalidad | minor | `feat(button): add icon position prop` |
| `fix` | Bug fix | patch | `fix(storybook): sync iframe bg with theme` |
| `perf` | Mejora de performance | patch | `perf(list): memoize rows` |
| `docs` | Solo documentación | — | `docs(readme): update install steps` |
| `style` | Formato (no lógica) | — | `style(button): fix indentation` |
| `refactor` | Cambio de código (ni fix ni feat) | — | `refactor(hooks): rename Hooks to hooks` |
| `test` | Tests | — | `test(button): add aria-label tests` |
| `build` | Build system/deps | — | `build(deps): upgrade react to 19` |
| `ci` | CI/CD | — | `ci(release): pine semantic-release version` |
| `chore` | Mantenimiento | — | `chore(gitignore): exclude local artifacts` |

### Breaking changes

Para forzar **major bump**:

```bash
# Opción 1: footer BREAKING CHANGE
feat(api)!: redesign auth flow

BREAKING CHANGE: `login()` now returns a Promise instead of accepting callback

# Opción 2: bang en el tipo
feat(api)!: redesign auth flow
```

### Ejemplos completos

```bash
# Feature simple
feat(button): add loading state with spinner
# → Bump: minor (1.2.3 → 1.3.0)

# Bug fix con issue
fix(input): resolve focus loss on validation error

Closes #42
# → Bump: patch (1.2.3 → 1.2.4)

# Refactor sin bump
refactor(button): extract variant logic to helper
# → Sin bump (cz no procesa este tipo)

# Breaking change
feat(button)!: rename onClick to onActivate

BREAKING CHANGE: Button now uses onActivate instead of onClick
# → Bump: MAJOR (1.2.3 → 2.0.0)
```

---

## 🔄 El pipeline completo (qué pasa después del push)

```bash
git push origin main
```

1. **GitHub Actions** detecta el push
2. **Job `release`** arranca:
   - `actions/checkout@v4` (con `fetch-depth: 0` ← crítico)
   - `npm clean-install`
   - `npx semantic-release`
3. **semantic-release** ejecuta 6 plugins en orden:

   ```
   1. commit-analyzer       → "minor" (encontró feat:)
   2. release-notes-gen     → genera markdown
   3. changelog             → actualiza CHANGELOG.md
   4. npm                   → npm publish (con NPM_TOKEN)
   5. github                → crea tag v0.3.0 + GitHub Release
   6. git                   → commit "chore(release): 0.3.0 [skip ci]"
   ```
4. **Job `build-and-deploy-storybook`** arranca:
   - `npm run build-storybook`
   - Deploy a `gh-pages` branch
5. **Listo**: tu release está en npm, GitHub, y la doc está actualizada

---

## 🔍 Debugging

```bash
# Ver qué release haría sin publicar nada
npx semantic-release --dry-run

# Ver los commits desde el último tag
git log $(git describe --tags --abbrev=0)..HEAD --oneline

# Modo verbose
DEBUG=semantic-release:* npx semantic-release --dry-run

# Ver todos los tags
git tag --list
```

---

## ⚠️ Errores comunes

| Error | Causa | Fix |
|-------|-------|-----|
| `Not found: npm token` | `NPM_TOKEN` no está en GitHub Secrets | Agregalo en Settings → Secrets |
| `403 Forbidden` en npm | Token sin permisos de publish | Regenerá con tipo "Automation" |
| `Not found: github token` | Permisos mal configurados | `permissions: contents: write` en workflow |
| `No release published` | Solo commits `docs:` o `chore:` | Hacé un `feat:` o `fix:` |
| `ENOTFOUND github.com` | Sin red en CI | Revisa la config de Actions |
| `Working dir has uncommitted changes` | El commit previo dejó cosas sucias | `git status` local |
| **Primer release falla** | No hay tag inicial | `git tag v0.1.0 && git push origin v0.1.0` |

---

## 🛠️ Setup completo desde cero en otro proyecto

### 1. Instalar dependencias

```bash
npm install --save-dev commitizen cz-conventional-changelog
npm install --save-dev semantic-release \
  @semantic-release/commit-analyzer \
  @semantic-release/release-notes-generator \
  @semantic-release/changelog \
  @semantic-release/npm \
  @semantic-release/github \
  @semantic-release/git
```

### 2. Agregar a `package.json`

```json
{
  "scripts": {
    "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "release": {
    "branches": ["main"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      "@semantic-release/npm",
      "@semantic-release/github",
      ["@semantic-release/git", {
        "assets": ["package.json", "package-lock.json", "CHANGELOG.md"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }]
    ]
  }
}
```

### 3. Crear `.github/workflows/release.yml`

```yaml
name: Release
on:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: "lts/*"
      - run: npm ci
      - run: npx semantic-release@24
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 4. Configurar secrets y tag inicial

```bash
# Secret en GitHub repo → Settings → Secrets
NPM_TOKEN=<token>

# Primer tag
git tag v0.1.0
git push origin v0.1.0

# Listo — el próximo push a main con feat: publica automáticamente
```

---

## 📚 Referencias oficiales

| Recurso | URL |
|---------|-----|
| **semantic-release (oficial)** | https://semantic-release.org/ |
| **Conventional Commits** | https://www.conventionalcommits.org/ |
| **commitizen** | https://github.com/commitizen/cz-cli |
| **cz-conventional-changelog** | https://github.com/commitizen/cz-conventional-changelog |
| **GitHub Actions recipes** | https://semantic-release.org/recipes/ci-configurations/github-actions/ |
| **Lista de plugins** | https://semantic-release.org/extending/plugins-list/ |

---

## 🎓 TL;DR

```bash
# Workflow del día a día
git add .
npm run commit              # wizard interactivo
git push origin main         # triggerea release automático

# Inspeccionar
npx semantic-release --dry-run

# Emergency: rollback de un release
npm dist-tag add @v12-ui@X.Y.Z broken
# Luego investigar qué commit causó el problema
```

**Tu único trabajo es escribir bien el mensaje del commit. Todo lo demás es automático.**