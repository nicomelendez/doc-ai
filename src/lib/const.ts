export const getPromptAnalyze = (info: String) =>
  `Estas siendo usado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Con esto vamos a generar un documento de markdown el cual utilizaremos para generar un word que sera utilizado para entregar un informe a la universidad o escuela del usuario.
 
El JSON debe incluir los siguientes campos:

- "status": Indica "analizando" si algún punto contiene preguntas y "completo" si no hay preguntas.
- "pointers": Un arreglo de objetos, donde cada objeto representa un punto del texto con la siguiente estructura:
  - "id": Un identificador único para cada punto.
  - "title": Un título descriptivo que resuma el punto.
  - "descripcion": Una descripción detallada y completa del punto minimo 150 caracteres.
  - "ask":  Genera una pregunta que creas necesaria para que este punto sea más claro y ajustado a lo que busca el usuario.

Aquí está el texto:

${info}

Ejemplo de salida deseada basado en un texto orientado a la programación web:

{
  "status": "analizando",
  "pointers": [
    {
      "id": 1,
      "title": "Introducción",
      "descripcion": "Breve descripción del tema tratado en la introducción sobre programación web.",
      "ask": "¿Cuál es el tipo de lenguaje que vas a utilizar?",
    },
    {
      "id": 2,
      "title": "Herramientas y Frameworks",
      "descripcion": "Explicación detallada de las herramientas y frameworks disponibles para la programación web.",
      "ask": "¿Puedes mencionar el frameworks del que quieres hablar?",
    },
    {
      "id": 3,
      "title": "Buenas Prácticas",
      "descripcion": "Descripción de las mejores prácticas en programación web, incluyendo la estructura del código y la gestión de proyectos.",
      "ask": "¿Qué buenas prácticas consideras esenciales?",
    }
  ]
}

  Recuerda, la salida debe ser únicamente el objeto JSON sin ningún texto adicional.
}` as const
