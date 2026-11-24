# Fundamenta Acesso — App de Controle de Acesso

Trabalho prático em grupo da disciplina **Mobile Applications** (MBA ES_31 — Faculdade Impacta), **Opção 2**:
app mobile de controle de acesso com 3 telas e armazenamento local.

## Integrantes

- Vinicius Franco dos Santos Moreira
- Limber Jhonathan Mamani Zarate

## Funcionalidades

| Tela | O que faz |
|---|---|
| **Acesso** (login) | Login e senha, validação dos campos e mensagem para credenciais inválidas. A sessão fica salva: ao reabrir o app, o usuário continua conectado. |
| **Criar conta** | Acessada pelo link "Criar conta" do login. Mesmos campos e regras do cadastro; ao concluir, já entra no app com a nova conta. |
| **Usuários** (listagem) | Lista nome e login de cada usuário. No cabeçalho: **sair** (com confirmação) e **adicionar usuário**. Toque em um item para **editar**; toque e segure para **excluir**. Puxe para baixo para atualizar. |
| **Novo / Editar Usuário** | Nome, login, senha e confirmação. Valida campos obrigatórios, tamanho mínimo, login único e senhas iguais. Na edição, senha em branco mantém a atual. |

### Acesso inicial

No primeiro uso o app cria automaticamente um usuário administrador:

| Login | Senha |
|---|---|
| `admin` | `admin123` |

## Tecnologias

- **React Native + Expo SDK 58**, em **TypeScript** (modo `strict`)
- **Expo Router** (navegação em pilha baseada em arquivos, construída sobre o React Navigation)
- **AsyncStorage** (`@react-native-async-storage/async-storage`) para armazenamento local
- **expo-crypto** para gerar o hash das senhas (SHA-256 com salt por usuário — a senha nunca é salva em texto puro)
- **Zustand** para o estado global da sessão e das notificações (toast)
- **React Native Reanimated** para as animações (rodando na thread de UI, a 60 fps)
- **react-native-svg** para o logo vetorial, **expo-linear-gradient**, **expo-image** e **expo-haptics**
- Fontes **Inter** e **Space Grotesk** (`@expo-google-fonts`)

App **somente mobile** (Android e iOS) — sem versão web.

## Identidade visual

O app segue a identidade do **Fundamenta**:

- Paleta oficial: verde-escuro `#14231F`, verde `#16A878`, lima `#B8F36B` e gelo `#F3F7F4`.
- Logo (símbolo + palavra FUNDAMENTA) desenhado em SVG a partir dos arquivos oficiais.
- Ícone do app, ícone adaptativo do Android e splash screen gerados com a marca.
- Arte de formas verdes da marca no login e nos cabeçalhos.

### Animações

Movimento discreto e funcional, só para indicar mudança de estado: transições curtas (150–300 ms),
sem efeitos elásticos nem animações contínuas. Os presets ficam centralizados em `shared/animations`.

- Telas e seções surgem com um fade suave; a borda do campo muda de cor ao focar.
- Botões reduzem levemente ao toque, com vibração leve.
- Item excluído some com fade e a lista se reorganiza suavemente.
- Skeleton enquanto a lista carrega; toast de sucesso/erro no topo.
- Erros aparecem em aviso vermelho com vibração de erro (sem balançar a tela).

## Arquitetura

Organização **por funcionalidade (feature-based)**, com camadas separadas:

```
src/
├── app/                          # Rotas (Expo Router) — arquivos finos que apenas apontam para as telas
│   ├── _layout.tsx               # Fontes, splash, sessão, proteção das rotas e toast global
│   ├── login.tsx                 # Tela 1 — Acesso
│   ├── register.tsx              # Criar conta (a partir do login)
│   └── (app)/                    # Área autenticada
│       ├── _layout.tsx
│       ├── index.tsx             # Tela 2 — Usuários
│       └── user-form.tsx         # Tela 3 — Novo / Editar Usuário
├── features/
│   ├── auth/
│   │   ├── data/                 # Persistência da sessão (AsyncStorage)
│   │   ├── services/             # Regras de login/logout/restauração
│   │   ├── store/                # Estado global da sessão (Zustand)
│   │   ├── hooks/                # Lógica da tela de login
│   │   ├── components/           # LoginHero, LoginForm
│   │   └── screens/              # Telas de login e criar conta
│   └── users/
│       ├── domain/               # Entidades, contrato do repositório e busca
│       ├── data/                 # Implementação do repositório com AsyncStorage
│       ├── validation/           # Validação do formulário e força da senha (funções puras)
│       ├── services/             # Regras de negócio (login único, hash, exclusão)
│       ├── hooks/                # Lógica das telas (lista e formulário)
│       ├── components/           # UserFormFields (compartilhado), UserCard, busca, skeleton, prévia, medidor de senha
│       └── screens/              # Composição das telas
└── shared/
    ├── brand/                    # Logo, símbolo, palavra, logo animado e fundo da marca
    ├── ui/                       # Design system: AppText, Button, TextField, Avatar, ScreenHeader…
    ├── theme/                    # Tokens: cores, tipografia, espaçamentos, sombras e movimento
    ├── animations/               # Presets de animação e feedback de toque
    ├── feedback/                 # Toast global
    ├── navigation/               # Opções das pilhas de navegação
    ├── errors/                   # Erro de negócio com mensagem para o usuário
    └── lib/                      # Storage tipado, criptografia e vibração
```


**Fluxo de dependências:** `screens → hooks → services → repository (interface) ← AsyncStorage`.
As telas não acessam o AsyncStorage diretamente; as regras de negócio dependem apenas do contrato
`UserRepository`, o que permite trocar o armazenamento sem alterar telas ou regras.

### Princípios SOLID aplicados

- **S — Responsabilidade única:** cada camada tem um papel (tela compõe, hook guarda estado, service aplica regras,
  repository persiste); componentes visuais pequenos e focados (ex.: `PasswordStrengthMeter`, `UserCard`).
- **O — Aberto/fechado:** variantes de `Button`, `Chip` e `Banner` são mapas de estilo — novas variantes não exigem
  alterar a lógica do componente.
- **L — Substituição de Liskov:** qualquer implementação de `UserRepository` (AsyncStorage, memória, API) funciona
  no `userService` sem mudanças.
- **I — Segregação de interfaces:** componentes recebem apenas as props de que precisam; `PublicUser` expõe às telas
  só os dados seguros (sem hash/salt).
- **D — Inversão de dependência:** `createUserService(repository)` e `createAuthService(repository)` recebem a
  dependência por parâmetro; telas dependem de hooks, não de bibliotecas de armazenamento.

## Como executar

Pré-requisitos: **Node.js 20+** e o app **Expo Go** no celular (ou um emulador Android / simulador iOS).

```bash
npm install
npx expo start
```

Escaneie o QR code com o Expo Go (Android) ou com a câmera (iOS). O celular e o computador precisam
estar na mesma rede Wi-Fi. Para abrir direto no emulador Android: `npm run android`.

### Verificação de tipos

```bash
npm run typecheck
```
