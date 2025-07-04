# --- Etapa de Construcción (Build Stage) ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Instala las dependencias
RUN npm install
# Copia todo el código fuente
COPY . .
# Compila la aplicación. Asegúrate que tu script 'build' genere los archivos estáticos en /app/dist
RUN npm run build

# --- Etapa de Producción (Production Stage) ---
FROM nginx:alpine
# Copia los archivos estáticos compilados desde la etapa 'build' al directorio de Nginx
# Ajusta /app/dist si tu comando 'npm run build' genera los archivos en una carpeta diferente (ej. /app/build)
COPY --from=build /app/dist/miniYT/browser /usr/share/nginx/html

# Copia tu archivo de configuración de Nginx personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 del contenedor
EXPOSE 80

# Comando para iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
