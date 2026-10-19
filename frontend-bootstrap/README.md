# Website BDS - Bootstrap

Phiên bản React + TypeScript + Vite của website BDS, được chuyển từ Material UI sang Bootstrap 5 và SCSS Modules.

## Quy ước mã nguồn

- Tên file và thư mục dùng kebab-case; tên React component dùng PascalCase.
- Mỗi component có thư mục riêng gồm `index.tsx` và `style.module.scss`.
- `components/core`, `components/layouts` và `components/composites` đều có `index.ts` export toàn bộ component trong nhóm.
- Mỗi page nằm trong `pages/<ten-trang>/index.tsx` và đặt stylesheet cùng thư mục.
- Dùng `type` cho kiểu dữ liệu và props.
- Import router trực tiếp từ `react-router`.

## Chạy dự án

```bash
npm install
npm run dev
```

Trang dự án: `http://127.0.0.1:4174/du-an/vinhomes-ocean-park-3`

## Công nghệ

- React 19 + TypeScript
- Vite
- Bootstrap 5 và Bootstrap Icons
- SCSS Modules cho toàn bộ giao diện tùy biến
