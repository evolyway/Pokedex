FROM node:22-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

FROM base AS app
# Copy application source code
COPY package.json pnpm-lock.yaml ./
COPY angular.json ./
COPY tsconfig.json tsconfig.app.json tsconfig.spec.json ./

FROM app AS dep
RUN pnpm install --frozen-lockfile

FROM app AS app-files
COPY src ./src
COPY public ./public

FROM app-files AS builder
COPY --from=dep /app/node_modules ./node_modules
RUN pnpm build --configuration=production

# Test stage
FROM base AS test-nx
COPY --from=dep /app/node_modules ./node_modules
COPY vitest.config.ts ./
COPY --from=app-files /app .
RUN ["pnpm", "test:coverage", "--watch=false"]
RUN touch all-tests-passed

# Combine test results
FROM base AS test
COPY --from=test-nx /app/all-tests-passed /app/all-tests-passed

# Production stage
FROM base AS prod
# Ensure the test stage has passed
COPY --from=test /app/all-tests-passed /app/all-tests-passed
RUN rm /app/all-tests-passed
# Copy built application from builder stage
COPY --from=builder /app/dist/Pokedex/browser .
RUN cp index.html 404.html
EXPOSE 8080
ENTRYPOINT ["npx", "http-server"]
