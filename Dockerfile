FROM node:18-alpine

# Crea directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json (mejor para cache)
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo lo demás
COPY . .

# Expone el puerto de la app
EXPOSE 3000

# Comando por defecto
CMD ["npm", "run", "dev"]
