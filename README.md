# PCMS-FE

### 기술 스택

- build = vite

- pm = npm

- state = zustand

- fetch = axios

- router = React Router

- css = styled-component

- UI framework = Material UI(MUI)

- code - eslint + prettier



폴더구조

```
PCMS-FE
├─ .eslintrc.cjs
├─ .gitignore
├─ .prettierrc
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  └─ images
│  │     ├─ displayMain.png
│  │     └─ loginMain.png
│  ├─ components
│  │  ├─ common
│  │  │  ├─ Button
│  │  │  │  ├─ Button.styles.js
│  │  │  │  └─ index.jsx
│  │  │  ├─ CalenderPicker
│  │  │  │  ├─ CalenderPicker.styles.js
│  │  │  │  └─ index.jsx
│  │  │  ├─ CheckBox
│  │  │  │  ├─ CheckBox.styles.js
│  │  │  │  └─ index.jsx
│  │  │  ├─ Filterling.jsx
│  │  │  ├─ Icon
│  │  │  │  ├─ Icon.styles.js
│  │  │  │  ├─ index.jsx
│  │  │  │  ├─ MoveIcon
│  │  │  │  │  ├─ index.jsx
│  │  │  │  │  └─ MoveIcon.stlyes.js
│  │  │  │  ├─ SearchOffIcon.jsx
│  │  │  │  └─ SearchOnIcon.jsx
│  │  │  ├─ Loading.jsx
│  │  │  ├─ Modal
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ Modal.styles.jsx
│  │  │  ├─ ProtectedRoute.jsx
│  │  │  ├─ RoleRedirect.jsx
│  │  │  ├─ SearchInput
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ SearchInput.styles.js
│  │  │  ├─ SectionDivider
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ SectionDivider.styles.js
│  │  │  ├─ Select
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ Select.styles.js
│  │  │  ├─ StatusBox
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ StatusBox.styles.js
│  │  │  ├─ Switch
│  │  │  │  ├─ index.jsx
│  │  │  │  └─ Switch.styles.js
│  │  │  └─ Table
│  │  │     ├─ index.jsx
│  │  │     └─ Table.styles.js
│  │  └─ layout
│  │     ├─ Header
│  │     │  ├─ Header.jsx
│  │     │  └─ Header.styles.js
│  │     ├─ Layout.jsx
│  │     ├─ Layout.styles.js
│  │     ├─ Main
│  │     │  ├─ Main.jsx
│  │     │  └─ Main.styles.js
│  │     ├─ ModalSection.jsx
│  │     └─ Sidebar
│  │        ├─ Sidebar.jsx
│  │        └─ Sidebar.styles.js
│  ├─ constants
│  │  ├─ links.jsx
│  │  ├─ message.jsx
│  │  ├─ selectOptions.jsx
│  │  └─ text.jsx
│  ├─ contexts
│  │  ├─ useModalStore.jsx
│  │  └─ useUserStore.jsx
│  ├─ hooks
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ admin
│  │  │  ├─ AdminCollectionInventory
│  │  │  │  └─ index.jsx
│  │  │  ├─ AdminCollectionRound
│  │  │  │  └─ index.jsx
│  │  │  ├─ AdminDeliveryDriver
│  │  │  │  └─ index.jsx
│  │  │  ├─ AdminDeliveryRound
│  │  │  │  └─ index.jsx
│  │  │  ├─ AdminRecoveryRound
│  │  │  │  └─ index.jsx
│  │  │  ├─ AdminRouting
│  │  │  │  └─ index.jsx
│  │  │  ├─ AdminShipper
│  │  │  │  └─ index.jsx
│  │  │  └─ AdminUser
│  │  │     └─ index.jsx
│  │  ├─ Login.jsx
│  │  ├─ Login.styles.jsx
│  │  └─ user
│  │     ├─ CollectionRound
│  │     │  └─ index.jsx
│  │     ├─ DeliveryRound
│  │     │  └─ index.jsx
│  │     └─ RecoveryRound
│  │        └─ index.jsx
│  ├─ routes
│  │  └─ router.jsx
│  ├─ services
│  │  └─ authService.jsx
│  ├─ style
│  │  ├─ common.jsx
│  │  ├─ global.jsx
│  │  └─ theme.jsx
│  └─ utils
│     └─ mockData.jsx
└─ vite.config.js

```
