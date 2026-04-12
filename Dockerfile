# Menggunakan Node.js versi ringan
FROM node:18-alpine

# Set folder kerja di dalam kontainer
WORKDIR /app

# Copy file konfigurasi npm dan install dependency
COPY package*.json ./
RUN npm install

# Copy seluruh kode React
COPY . .

# Buka port Vite
EXPOSE 5173

# Jalankan server Vite agar bisa diakses dari luar kontainer (--host)
CMD ["npm", "run", "dev", "--", "--host"]
