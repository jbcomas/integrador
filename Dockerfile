# Usa la imagen oficial de Node.js
FROM node:22

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package.json package-lock.json /app/

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . /app

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
CMD ["node", "workers/consumerWorker.js"]
