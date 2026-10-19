# Website BDS — Frontend

## Quy ước mã nguồn

- Tên file và thư mục dùng kebab-case; tên React component vẫn dùng PascalCase.
- Mỗi component có thư mục riêng, đặt phần triển khai tại `index.tsx`.
- `components/core/`: các component cơ bản, tái sử dụng như logo, breadcrumb và tiêu đề trang; `index.ts` export toàn bộ component trong nhóm.
- `components/layouts/`: header, footer và khung bố cục trang; `index.ts` export toàn bộ component trong nhóm.
- `components/composites/`: các component nội dung dự án như tab và thẻ phân khu; `index.ts` export toàn bộ component trong nhóm.
- Mỗi page nằm trong `pages/<ten-trang>/index.tsx`; stylesheet riêng đặt cùng thư mục với tên `style.module.scss`.
- Style toàn cục nằm trong `src/index.scss`; Sass được cài trong devDependencies.
- Dùng `type` cho các kiểu dữ liệu và props; ESLint kiểm tra quy ước này.
- Import các API router trực tiếp từ `react-router` theo phiên bản 7 đang sử dụng.

```text
src/
├── app/index.tsx
├── api/
│   ├── http-client.ts
│   └── phase-api.ts
├── components/
│   ├── core/<ten-component>/index.tsx
│   ├── layouts/<ten-component>/index.tsx
│   └── composites/<ten-component>/index.tsx
├── pages/
│   └── project-detail/
│       ├── index.tsx
│       └── style.module.scss
└── types/project.ts
```

Chạy `npm install` để cài dependencies, `npm run dev` để phát triển,
`npm run build` để kiểm tra TypeScript và tạo bản production, `npm run lint` để kiểm tra quy ước mã nguồn.

## Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
