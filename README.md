# S-Code Phishing Simulation — Backend

API REST del simulacro educativo de phishing laboral. Construida con **NestJS**, **TypeORM** y **PostgreSQL** / **SQLite**.

## Stack Tecnológico

- **Framework:** NestJS 11
- **ORM:** TypeORM
- **Base de datos:** PostgreSQL (producción) / SQLite (desarrollo local)
- **Lenguaje:** TypeScript

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalación

```bash
npm install
```

## Ejecución

```bash
# desarrollo (con watch)
npm run start:dev

# producción
npm run build
npm run start:prod
```

Por defecto corre en `http://localhost:3000` con prefijo global `/api`.

## API

### `POST /api/access`

Registra un intento de acceso (simulación de phishing).

**Body:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Acceso registrado",
  "id": 1
}
```

---

### `GET /api/dashboard/stats`

Devuelve métricas generales.

**Respuesta:**
```json
{
  "totalParticipants": 42,
  "totalEmails": 40,
  "todayParticipants": 5,
  "lastAccess": "2026-06-17T14:30:00.000Z"
}
```

---

### `GET /api/dashboard/logs`

Devuelve el listado completo de accesos registrados.

**Respuesta:**
```json
[
  {
    "id": 1,
    "date": "17/6/2026",
    "time": "14:30",
    "email": "usuario@gmail.com",
    "domain": "gmail.com",
    "status": "Capturado",
    "createdAt": "2026-06-17T14:30:00.000Z"
  }
]
```

### `POST /api/seed/:count`

Genera datos de prueba. Borra todos los registros existentes y crea `:count` registros aleatorios con fechas, horarios, emails y dominios variados.

**Respuesta:**
```json
{
  "created": 50
}
```

> Usar con cuidado: elimina todos los datos previos.

---

## Entidad

### AccessLog

| Campo            | Tipo           | Descripción                     |
| ---------------- | -------------- | ------------------------------- |
| id               | int (PK)       | ID único                        |
| email            | string         | Correo ingresado                |
| passwordCaptured | string         | Contraseña capturada (demo)     |
| createdAt        | timestamptz    | Fecha y hora (UTC en PostgreSQL)|
| ipAddress        | string?        | Dirección IP del participante   |
| userAgent        | string?        | User-Agent del navegador        |

## Scripts disponibles

| Comando             | Descripción                          |
| ------------------- | ------------------------------------ |
| `npm run build`     | Compila a `dist/`                    |
| `npm run start`     | Inicia la app                        |
| `npm run start:dev` | Inicia en modo desarrollo con watch  |
| `npm run start:prod`| Inicia desde `dist/main.js`          |
| `npm run lint`      | Ejecuta ESLint                       |
| `npm run test`      | Ejecuta tests unitarios              |
| `npm run test:e2e`  | Ejecuta tests end-to-end             |

## Despliegue en Render

1. Subí el repositorio a GitHub.
2. En [Render](https://render.com), creá un **Web Service** conectado al repo.
3. Configuración:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
   - **Plan:** Free
4. Variables de entorno necesarias:
   - `DATABASE_URL`: URL de conexión a PostgreSQL (si no se setea, usa SQLite local)
   - `TZ`: `America/Argentina/Buenos_Aires` (para zona horaria argentina)

> El free tier de Render hiberna tras 15 min de inactividad. Al recibir la primera solicitud tarda ~30s en responder mientras despierta.

## Licencia

Proyecto educativo con fines de concientización en seguridad informática.
