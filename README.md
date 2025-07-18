# Koxland Ecommerce

A modern, responsive **Ecommerce Storefront** built with:

- **Next.js 15** (App Router)
- **Tailwind CSS v4** for styling
- **Framer Motion** (optional animations)
- **Shopify Storefront Faceless API** integration
- **Fully responsive** across desktop, tablet, and mobile

🚀 **Live demo:** [https://www.fitworldshop.com/](https://www.fitworldshop.com/)

## Features

✅ Modern, fast, clean ecommerce frontend  
✅ Product listing and detail views  
✅ Dynamic shopping cart with persistent local storage  
✅ Checkout process integration ready  
✅ Product filtering and color/size selection  
✅ Wishlist functionality (local persistence)  
✅ Internationalization-ready  
✅ Page transitions and optional animations  
✅ Fully responsive with mobile-first design

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **State Management:** Context API
- **Animations:** Framer Motion (optional)
- **API:** Shopify Storefront Faceless API
- **Deployment:** Vercel

## Setup

1️⃣ Clone the repository:

```bash
git clone https://github.com/Koxone/FitWorldShop-Next-Tailwind-Shopify-API.git
cd Ecommerce-Next-Tailwind
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Configure environment variables in `.env.local`:

```env
SHOPIFY_STORE_DOMAIN=your-shopify-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

4️⃣ Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

5️⃣ Build for production:

```bash
npm run build
npm start
```

## Folder Structure

- `src/app/` - Next.js App Router structure
- `src/components/` - Reusable components
- `src/context/` - Global state management (MainContext, PurchaseContext)
- `src/data/` - Static product data (can be replaced by API)
- `src/styles/` - Global styles

## Contributing

PRs and issues are welcome! Please open an issue first to discuss proposed changes.

## License

MIT License © 2025 [Kox](https://github.com/Koxone)

---

**Enjoy building scalable ecommerce experiences with this modern Next.js stack!**
