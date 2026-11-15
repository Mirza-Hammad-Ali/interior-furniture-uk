# Interior Furniture UK

Full-stack furniture shop: `backend/` (Node + Express) and `frontend/` (React + Tailwind + Vite).

## Run (two terminals)
    cd backend  && npm install && npm start      # API on http://localhost:5000
    cd frontend && npm install && npm run dev    # site on http://localhost:5173

Open http://localhost:5173. Register, add furniture to the bag (choose colour + size), check out, then see it under Orders.

## Where things are
- `backend/data/products.js` – all categories, types, products, colours, sizes and prices. Add `image: "url"` to a product to use a photo.
- `backend/server.js` – products, sign up / sign in (JWT), orders. Users and orders are saved in `backend/data/db.json`.
- `frontend/src/App.jsx` – all pages. `frontend/src/store.jsx` – cart + login state.

Prices are always recalculated on the server when an order is placed. Delivery is free over £500, otherwise £49.
Set `JWT_SECRET` as an environment variable before going live. No payment is taken yet (orders are "Pending – pay on delivery").
