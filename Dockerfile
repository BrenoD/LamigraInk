FROM golang:1.21-alpine

WORKDIR /app

# Copiar os arquivos go.mod e go.sum
COPY go.mod go.sum ./

# Baixar dependências
RUN go mod download

# Copiar o código fonte
COPY . .

# Compilar a aplicação
RUN go build -o main ./backend/cmd/main.go

# Expor a porta
EXPOSE 8080

# Comando para executar a aplicação
CMD ["./main"] 