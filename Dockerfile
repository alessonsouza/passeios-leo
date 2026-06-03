# ===== Build stage =====
FROM oven/bun:1 AS builder

WORKDIR /app

# Instala dependências (camada cacheável)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copia o restante e builda
COPY . .

# URL pública da API — precisa estar disponível em BUILD-TIME (Vite embute no bundle).
# No Coolify, defina como Build Variable / Build Arg.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build direto pelo Vite (pula o tsc -b para não travar o deploy por type-check)
RUN bunx vite build

# ===== Serve stage (nginx) =====
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
