# Estágio de compilação
FROM golang:1.22.6-alpine AS builder

WORKDIR /app

# Instala dependências necessárias para compilação, incluindo git
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    postgresql-client \
    gcc \
    musl-dev \
    postgresql-dev \
    git  # Adiciona o git aqui

# Força o uso da versão local do Go e desabilita a atualização automática
ENV GOTOOLCHAIN=local
ENV GO111MODULE=on
ENV GOPROXY=direct

# Copia apenas os arquivos necessários primeiro
COPY go.mod go.sum ./

# Verifica e baixa as dependências
RUN go mod verify && \
    go mod tidy && \
    go mod download

# Copia o código fonte
COPY . .

# Compila o aplicativo com suporte a CGO para PostgreSQL
RUN CGO_ENABLED=1 GOOS=linux GOARCH=amd64 go build \
    -ldflags="-w -s" \
    -o main ./backend/cmd/main.go

# Estágio final
FROM alpine:3.19

# Instala dependências necessárias
RUN apk add --no-cache \
    ca-certificates \
    tzdata \
    postgresql-client

WORKDIR /app

# Copia arquivos necessários do estágio builder
COPY --from=builder /app/main .
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo

# Cria usuário não-root
RUN adduser -D -u 1000 appuser && \
    chown -R appuser:appuser /app

# Define o usuário para executar o processo
USER appuser

# Expõe a porta
EXPOSE 8080

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Comando para executar
CMD ["./main"]