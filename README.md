# 🛒 বাজার দর (BazarDor)

**প্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a small web app that shows the daily prices of everyday groceries in Bangladesh, such as rice, lentils, onions, fish, eggs and oil. I built it because checking the market price of something should take a few seconds, not a few phone calls. Everything is in Bangla, including the digits.

🔗 **Live site:** https://bazar-dor-ir-obot.vercel.app

---

## ✨ Key Features

1. **Live price ticker.** A scrolling strip under the navbar shows each product's emoji, name, price and ▲/▼ change, so you can see the market moving at a glance.
2. **Risers and fallers.** The home page lists the top 6 products whose price went up today and the top 6 whose price went down, followed by every product in one responsive grid.
3. **Category pages with sorting.** Browse by category and sort by default, price low to high, or price high to low. Sorting works on the real numeric value, so Bengali digits like ১৪৮ and ১,৮৫০ are ordered correctly.
4. **Product details across markets.** Each product has its own page with the minimum, maximum and average price, plus today's price in different bazaars. These pages are for logged-in users only.
5. **Sign in your way.** Email and password, Google, or GitHub, powered by Better Auth. Logged-in users can open their profile and update their name.

A few smaller things that make it nicer to use: skeleton loaders while data loads, toast messages for every login, logout and error, a friendly 404 page with a way back home, and a layout that works on mobile, tablet and desktop.

---

## 🧰 Technologies Used

| What | Why |
|---|---|
| [Next.js](https://nextjs.org/) (App Router) | Pages, routing and the API |
| TypeScript | Safer code |
| [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) | Styling and ready-made components |
| [Better Auth](https://www.better-auth.com/) | Email, Google and GitHub login |
| MongoDB Atlas | Stores users and sessions |
| react-hot-toast | Toast notifications |
| react-icons | Icons |
| Vercel | Hosting |

---

## 🚀 Run It Locally

You'll need Node.js and a MongoDB database (a free Atlas cluster is fine).

```bash
# 1. Clone the project
git clone https://github.com/<your-username>/bazar-dor.git
cd bazar-dor

# 2. Install dependencies
npm install

# 3. Add your environment variables (see below)

# 4. Start the dev server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env` file in the project root:

```env
MONGODB_URL=your_mongodb_connection_string
BETTER_AUTH_SECRET=any_long_random_string
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

When you deploy, set the same variables on your host and change `BETTER_AUTH_URL` to your live domain. Also add `/api/auth/callback/google` and `/api/auth/callback/github` under your live domain as redirect URLs in the Google and GitHub consoles.

---

## 📁 Pages

| Route | What it does |
|---|---|
| `/` | Home: hero, risers, fallers, all products |
| `/category/[slug]` | Products in one category, with sorting |
| `/product/[slug]` | Product details (login required) |
| `/signin`, `/signup` | Authentication |
| `/profile` | Your account info |
| `/profile/update` | Change your name |

---

## 🙌 Thanks for stopping by

If you spot a bug or have an idea, feel free to open an issue.
