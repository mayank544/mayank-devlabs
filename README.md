# Mayank DevLabs Portfolio

Interactive full-stack developer portfolio for Mayank Kumar, built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- Cyberpunk-inspired responsive portfolio UI
- Interactive project cards with real project imagery
- Animated mini robot companion
- Contact form powered by Netlify Forms
- Recruiter-focused sections for projects, stack, experience, certifications, and contact

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS
- Framer Motion
- Netlify Forms

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

For mobile testing on the same Wi-Fi:

```bash
npm run dev -- --hostname 0.0.0.0
```

Then open your PC IPv4 address on port `3000`.

## Contact Form

The contact form uses Netlify Forms.

After deploying to Netlify:

1. Open the Netlify site dashboard.
2. Go to Forms and confirm the `contact` form is detected.
3. Go to Project configuration > Notifications.
4. Add an email notification for form submissions to your email address.

The hidden form detector lives at:

```text
public/__forms.html
```

## Build

```bash
npm run build
```

## Deploy To Netlify

Preview deploy:

```bash
npx netlify deploy
```

Production deploy:

```bash
npx netlify deploy --prod
```

When linking, choose the existing portfolio site if you want to replace the old live portfolio while keeping the same Netlify site URL/domain.
