FROM node:22.13.0-bookworm-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV npm_config_loglevel=warn

RUN node -v && npm -v

COPY package*.json ./

RUN npm install --include=dev --include=optional --no-audit --no-fund

COPY . .

# Refuerzo para dependencias nativas Linux usadas por Tailwind/lightningcss.
# Usar --no-save para no modificar package.json ni lockfile.
RUN npm install --no-save lightningcss-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu --include=optional --no-audit --no-fund || true

RUN node -e "require('lightningcss'); console.log('lightningcss ok')"

RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["npm", "run", "start"]
