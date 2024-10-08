
# Doc AI

Aplicación web que **genera documentos** académicos. **Analiza un contexto específico**, hace preguntas para refinarlo, mejora el contexto con las respuestas. Luego, busca información y **genera una plantilla en Word** para tareas universitarias o de secundaria.

![Doc AI - Web](https://res.cloudinary.com/djslvlh8h/image/upload/f_auto,q_auto/v1/doc-ai/sbemclgomhexu7neyama)

![Doc AI - Movil](https://res.cloudinary.com/djslvlh8h/image/upload/f_auto,q_auto/v1/doc-ai/elezbi2kztl81arstkdb)

## Características principales 

- **Análisis de contexto:** Analiza un contexto específico para generar preguntas clave.
- **Generación de preguntas:** Crea preguntas que ayudan al usuario a refinar el enfoque del tema.
- **Mejora del contexto:** Usa las respuestas del usuario para mejorar y precisar el contexto inicial.
- **Creación de documento Word:** Genera un documento Word con cada punto del esquema explayado, proporcionando una plantilla base para el usuario.

## Para empezar

### Prerequisitos

- NVM (recomendado para asegurar versión de Node) ver [documentación oficial](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

  ```sh
  nvm use
  # o
  nvm use <version>
  ```

- PNPM (recomendado por su eficiencia y rapidez)

  ```sh
  npm install -g pnpm
  ```

- NPM

  ```sh
  npm install npm@latest -g
  ```

### Configuración del Proyecto

Para iniciar el proyecto, necesitas crear un archivo `.env` en el directorio raíz del proyecto con la siguiente variable:
  
  - PERPLEXITY_API_KEY = tu_clave_aquí

  
### Iniciar el Proyecto

Una vez que hayas configurado tu archivo `.env`, puedes iniciar el proyecto usando uno de los siguientes comandos:

### Ejecutar el proyecto:

  ```sh
  pnpm run dev
  ```

  O

  ```sh
  npm run dev
  ```

## Stack
- [![Astro](https://img.shields.io/badge/Astro-0C1222?style=for-the-badge&logo=astro&logoColor=FDFDFE)](https://astro.build/) - Framework de aplicaciones web de código abierto.

- [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://astro.build/) - Framework de aplicaciones web de código abierto.

- [![Perplexity](https://img.shields.io/badge/Perplexity_AI-20808d?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMjIuMzk4IDcuMDloLTIuMzFWLjA2OGwtNy41MSA2LjM1NFYuMTU4aC0xLjE1NnY2LjE5Nkw0LjQ5IDB2Ny4wOUgxLjYwMnYxMC4zOTdINC40OVYyNGw2LjkzMy02LjM2djYuMjAxaDEuMTU1di02LjA0N2w2LjkzMiA2LjE4MXYtNi40ODhoMi44ODh6bS0zLjQ2Ni00LjUzMXY0LjUzaC01LjM1NXptLTEzLjI4Ni4wNjdsNC44NjkgNC40NjRoLTQuODd6TTIuNzU4IDE2LjMzMlY4LjI0NWg3Ljg0N0w0LjQ5IDE0LjM2djEuOTcyem0yLjg4OCA1LjA0di02LjUzNGw1Ljc3Ni01Ljc3NnY3LjAxMXptMTIuNzA4LjAyNWwtNS43NzYtNS4xNVY5LjA2MWw1Ljc3NiA1Ljc3NnptMi44ODktNS4wNjVIMTkuNTFWMTQuMzZsLTYuMTE1LTYuMTE1aDcuODQ4eiIvPjwvc3ZnPg==)](https://www.perplexity.ai/) - Es un motor de búsqueda conversacional, con un motor de respuestas.

- [![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-030203?style=for-the-badge&logo=data:image/svg%2Bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMjEuNzM4IDE2LjEzYTEgMSAwIDAgMS0uMTkuNjFhMSAxIDAgMCAxLS41Mi4zOGwtMS43MS41N2EzLjU3IDMuNTcgMCAwIDAtMS40Ljg2YTMuNSAzLjUgMCAwIDAtLjg2IDEuNGwtLjYgMS43YTEgMSAwIDAgMS0uMzYuNTFhMS4wOCAxLjA4IDAgMCAxLS42Mi4xOWExIDEgMCAwIDEtMS0uNzFsLS41Ny0xLjcxYTMuNSAzLjUgMCAwIDAtLjg2LTEuNGEzLjc4OSAzLjc4OSAwIDAgMC0xLjQtLjg3bC0xLjcxLS41NmExLjExIDEuMTEgMCAwIDEtLjUxLS4zN2ExLjA4IDEuMDggMCAwIDEtLjIxLS42MmExIDEgMCAwIDEgLjcxLTFsMS43Mi0uNTdhMy41NCAzLjU0IDAgMCAwIDIuMjgtMi4yOGwuNTctMS42OWExIDEgMCAwIDEgLjk1LS43M2MuMjE1IDAgLjQyNi4wNTkuNjEuMTdjLjE4Mi4xMjUuMzIyLjMwMy40LjUxbC41OCAxLjc0YTMuNTQgMy41NCAwIDAgMCAyLjI4IDIuMjhsMS43LjZhMSAxIDAgMCAxIC41MS4zOGExIDEgMCAwIDEgLjIxLjYxbS05Ljk5OS02LjM2YTEgMSAwIDAgMS0uMTcuNTVhMSAxIDAgMCAxLS40Ny4zNWwtMS4yNi40MmMtLjM1My4xMjItLjY3My4zMi0uOTQuNThhMi40OCAyLjQ4IDAgMCAwLS41OC45NGwtLjQzIDEuMjRhLjg5Ljg5IDAgMCAxLS4zNS40N2ExIDEgMCAwIDEtLjU2LjE4YTEgMSAwIDAgMS0uNTctLjE5YTEgMSAwIDAgMS0uMzQtLjQ3bC0uNDEtMS4yNWEyLjQ0IDIuNDQgMCAwIDAtLjU4LS45M2EyLjIyIDIuMjIgMCAwIDAtLjkzLS41OGwtMS4yNS0uNDJhLjkzLjkzIDAgMCAxLS40OC0uMzVhMSAxIDAgMCAxIC40OC0xLjQ3bDEuMjUtLjQxYTIuNDkgMi40OSAwIDAgMCAxLjUzLTEuNTNsLjQxLTEuMjNhMSAxIDAgMCAxIC4zMi0uNDdhMSAxIDAgMCAxIC41NS0uMmExIDEgMCAwIDEgLjU3LjE2YTEgMSAwIDAgMSAuMzcuNDZsLjQyIDEuMjhhMi40OSAyLjQ5IDAgMCAwIDEuNTMgMS41M2wxLjI1LjQzYS45Mi45MiAwIDAgMSAuNDYuMzVhLjk0Ljk0IDAgMCAxIC4xOC41Nm01Ljc4OS01LjM2YTEgMSAwIDAgMS0uMTcuNTFhLjgyLjgyIDAgMCAxLS40Mi4zbC0uNjIuMjFhLjg0Ljg0IDAgMCAwLS41Mi41MmwtLjIyLjYzYS45MjkuOTI5IDAgMCAxLS4yOS4zOWEuODIuODIgMCAwIDEtLjUyLjE4YTEuMDggMS4wOCAwIDAgMS0uNDktLjE1YS45Mi45MiAwIDAgMS0uMzItLjQ0bC0uMjEtLjYyYS43MTkuNzE5IDAgMCAwLS4yLS4zMmEuNzYuNzYgMCAwIDAtLjMyLS4ybC0uNjItLjJhMSAxIDAgMCAxLS40Mi0uMzFhLjg4Ljg4IDAgMCAxLS4xNi0uNTFhLjk0Ljk0IDAgMCAxIC4xNy0uNTFhLjg4Ljg4IDAgMCAxIC40Mi0uM2wuNjEtLjJhLjkxLjkxIDAgMCAwIC4zMy0uMmEuOTM5LjkzOSAwIDAgMCAuMi0uMzNsLjIxLS42MmMuMDYtLjE1NS4xNTUtLjI5Mi4yOC0uNGExIDEgMCAwIDEgLjQ5LS4xOWEuOTQuOTQgMCAwIDEgLjUzLjE2YTEgMSAwIDAgMSAuMzIuNDFsLjIxLjY0YS45NDIuOTQyIDAgMCAwIC4yLjMzYTEgMSAwIDAgMCAuMzIuMmwuNjMuMjFhMSAxIDAgMCAxIC40MS4zYS44Ny44NyAwIDAgMSAuMTcuNTEiLz48L3N2Zz4=)](https://sdk.vercel.ai/) - Es un conjunto de herramientas diseñadas para crear aplicaciones basadas en IA.

- [![Zustand](https://img.shields.io/badge/Zustand-433f39?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDEyOCAxMjgiPjxwYXRoIGZpbGw9IiM4NTVjNTIiIGQ9Ik0xMjcuNTUgNjYuMDJjLS41MS04LjctMi45Ny0xNy41My03LjAxLTI1LjU1Yy4xNC0uMTguMjctLjM3LjQtLjU2bC4zOS0uNTZjLjktMS40MiAxLjYxLTIuOTUgMi4yNC00LjVjMi44OC03LjIxIDIuOTQtMTUuMjctLjY5LTIxLjE2Yy0yLjU2LTQuMTctMTIuNzMtMTQuOTgtMjguNzctNS44NWMtMy43OCAyLjE2LTcuMjkgMi4zLTkuMjkgMi4xNGMtNi42OC0yLjAzLTEzLjc5LTMuMDctMjAuODQtMy4wNmMtNy42OC0uMDItMTUuNDMgMS4yMS0yMi42MyAzLjYyYy0yLjAyLjE0LTUuNDctLjA1LTkuMTUtMi4xNUMxNi4xNi0uNzUgNiAxMC4wNyAzLjQyIDE0LjI0Yy0xLjExIDEuOC0xLjk0IDQtMi4zNyA2LjA3Yy0uNzkgMy45NS0uNDUgOC4zNC43IDEyLjE5Yy42MiAyLjA1IDEuNTMgMy45OCAyLjQ5IDUuOWMuNjIgMS4yNyAxLjI3IDIuNTMgMi4wNiAzLjY5Yy4wOC4xMy4xNC4yNS4yMS4zN0MzLjA1IDQ5Ljk0LjkgNTguMDMuNDQgNjYuMDJjLS45NSAxNi4yNyAxLjkgMzIuNjUgMTUuMDYgNDMuOTdjNy4yOSA2LjI2IDE2LjM1IDEwLjUyIDI1LjcgMTIuODFjMy41NS44OCAxMi43MiAyLjkyIDIyLjM1IDIuOTJjOS42MSAwIDE5LjY5LTIuMDQgMjMuMjQtMi45MmM5LjM0LTIuMjkgMTguNDEtNi41NCAyNS43LTEyLjgxYzEzLjE2LTExLjMxIDE2LjAzLTI3LjcgMTUuMDYtNDMuOTciLz48ZWxsaXBzZSBjeD0iMjguMjUiIGN5PSI3MC44IiBmaWxsPSIjMmYyZjJmIiByeD0iNi43NiIgcnk9IjguMSIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik02My42OCAxMDkuMTJjLTEzLjQxIDAtMjQuMjYtNC44NS0yNC4yNi0xOS43NmMwLTE0LjkyIDEwLjg1LTI3LjAxIDI0LjI2LTI3LjAxYzEzLjQgMCAyNC4yOCAxMi4wOSAyNC4yOCAyNy4wMWMwIDE0LjkxLTEwLjg4IDE5Ljc2LTI0LjI4IDE5Ljc2Ii8+PHBhdGggZmlsbD0iIzJmMmYyZiIgZD0iTTk5LjAzIDc4LjljLTMuNzIgMC02Ljc2LTMuNjItNi43Ni04LjA5YzAtNC40OCAzLjA0LTguMSA2Ljc2LTguMWMzLjc0IDAgNi43NyAzLjYzIDYuNzcgOC4xcy0zLjAzIDguMDktNi43NyA4LjA5TTYzLjY4IDg5LjA0YzYuMzYgMCAxMS41Mi00LjE1IDExLjUyLTkuMjdjMC01LjEzLTUuMTYtOS4yNy0xMS41Mi05LjI3cy0xMS41IDQuMTUtMTEuNSA5LjI3YzAgNS4xMiA1LjE0IDkuMjcgMTEuNSA5LjI3bTEwLjI2IDUuODNjLS4xMy4xOC0zLjE1IDQuMzQtMTAuMjYgNC4zNGMtNy4wNiAwLTEwLjA5LTQuMTMtMTAuMjMtNC4zNGMtLjctMS0yLjA3LTEuMjctMy4wOS0uNThhMi4yMjIgMi4yMjIgMCAwIDAtLjU5IDMuMDljLjE3LjI2IDQuMzYgNi4yNyAxMy45MSA2LjI3YzkuNTYgMCAxMy43NS02LjAyIDEzLjkzLTYuMjdjLjY4LTEuMDEuNDMtMi4zNy0uNTgtMy4wN2MtMS0uNjktMi4zOS0uNDMtMy4wOS41NiIvPjxwYXRoIGZpbGw9IiNiODkyNzgiIGQ9Ik0yOS42MiAyMS4yYy0xLjI3IDEuMzQtMy4yMiAyLjU0LTQuMTUgMy4zOGMtMi4wOCAxLjg4LTMuNjUgNC4zNS01LjEyIDYuNzFjLTIuMTMgMy40MS00Ljg0IDEuMzItNi4zLTEuMzRjLS4xNy0uMy0uMzItLjYxLS40Ni0uOTJjLS41NC0xLjI5LS44My0yLjctLjgzLTQuMWMwLTUuNjkgNC41NS0xMC4yOSAxMC4xNS0xMC4yOWMxLjkyIDAgNC4yMS43NSA1LjkxIDEuNzdjLjE3LjEuMzguMTkuNTMuM2MyLjIxIDEuNDggMS42MyAzLjA2LjI3IDQuNDltODQuMDkgNy44M2MtLjA1LjEyLS4xMS4yNS0uMTguMzhjLTEuMzggMi45LTQuMzEgNS41Mi02LjU4IDEuODljLTEuNDgtMi4zNi0zLjA0LTQuODMtNS4xMi02LjcxYy0uOTMtLjg0LTIuODktMi4wNC00LjE2LTMuMzhjLTEuMzUtMS40My0xLjkzLTMuMDEuMjgtNC40OWMuMjctLjE4LjU4LS4zNC45LS41MWMxLjY3LS45MSAzLjc2LTEuNTYgNS41NC0xLjU2YzUuNjEgMCAxMC4xNSA0LjYgMTAuMTUgMTAuMjljLS4wMSAxLjQtLjI4IDIuOC0uODMgNC4wOSIvPjwvc3ZnPg==)](https://zustand-demo.pmnd.rs/) - Biblioteca de gestión de estado que ofrece una forma sencilla y eficiente de administrar el estado.

- [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) - Lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft.

- [![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://developer.mozilla.org/es/docs/Web/JavaScript) - Lenguaje de programación interpretado, dialecto del estándar ECMAScript. 

- [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) - Framework de CSS de código abierto​ para el diseño de páginas web.

## Sobre mí

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nicolas-melendez/)