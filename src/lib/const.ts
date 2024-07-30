export const getPromptAnalyze = (info: String) =>
  `
Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Este JSON se usará como base para crear un documento estructurado en formato Markdown, que luego se convertirá en un archivo Word bien formateado. El documento Word final será utilizado por el usuario para entregar un informe académico a su universidad o escuela, asegurando que el contenido esté organizado, claro y semiformal.

Debes utilizar un lenguaje natural y fluido, no repetir lo que mismo que dice el título. Enfócate en explicar las ideas de manera clara y concisa, como si estuvieras redactando un documento real. Además, el documento debe incluir al menos 7 puntos y una sección adicional de bibliografía, donde deberás citar las fuentes utilizadas.

Debe de tener al menos 7 puntos y más uno extra que es una bibliografía donde deberas poner las URLS de los sitios o recursos que usaste para la información del documento.

El JSON debe incluir los siguientes campos:

- "status": Indica "analizando" si algún punto contiene preguntas y "completo" si no hay preguntas.
- "pointers": Un arreglo de objetos, donde cada objeto representa un punto del texto con la siguiente estructura:
  - "id": Un identificador único para cada punto.
  - "title": Un título descriptivo que resuma el punto.
  - "descripcion": Una descripción detallada y completa del punto, de al menos 800 caracteres, utilizando un lenguaje natural y evitando la repetición del título.

Aquí está el texto:

${info}

Ejemplo de salida deseada basado en un texto orientado a la programación web:

{
  "status": "analizando",
  "pointers": [
    {
      "id": 1,
      "title": "Introducción",
      "descripcion": "La programación web ha evolucionado significativamente, permitiendo la creación de sitios y aplicaciones más dinámicas y funcionales. En esta sección se explorarán los conceptos básicos y la importancia de entender la estructura y el funcionamiento de las tecnologías web."
    },
    {
      "id": 2,
      "title": "Herramientas y frameworks",
      "descripcion": "Existen diversas herramientas y frameworks que facilitan el desarrollo web. Entre los más populares se encuentran React, Angular y Vue.js, cada uno con sus propias ventajas y casos de uso específicos. Esta sección analizará sus características principales y cómo pueden optimizar el proceso de desarrollo."
    },
    {
      "id": 3,
      "title": "Buenas prácticas",
      "descripcion": "Adoptar buenas prácticas en programación web es esencial para mantener el código organizado y eficiente. Esto incluye el uso de control de versiones, la adherencia a estándares de codificación y la implementación de pruebas automatizadas. Estas prácticas no solo mejoran la calidad del código, sino que también facilitan su mantenimiento y escalabilidad."
    }
  ]
}

Recuerda, la salida debe ser únicamente el objeto JSON sin ningún texto adicional.
` as const

export const getPromptContext = (
  info: String,
  purpose: String,
  lenguaje: String
) =>
  `
    Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Analiza el texto proporcionado para entender y definir el contexto en el cual el usuario desea aplicar el documento. El propósito del usuario es '${purpose}', y el documento debe ser escrito en lenguaje '${lenguaje}'. Basado en este análisis, genera un objeto JSON que incluya un atributo 'context'. Este 'context' debe ser un texto detallado con un mínimo de 800 caracteres, formulado en una sola línea que puede contener puntos y seguidos, que refleje el enfoque y las principales consideraciones que el usuario tiene en mente para su documento. Asegúrate explícitamente de cumplir con el mínimo de caracteres requerido.

    Además, genera al menos tres preguntas críticas relacionadas con el contenido para asegurar que el contexto sea lo más preciso posible. Estas preguntas deben ayudar a clarificar cualquier aspecto que podría necesitar más detalles o una perspectiva específica del usuario.

    Texto a analizar:
    ${info}

    Ejemplo de salida deseada:
    {
      "context": "Un informe detallado sobre las últimas tendencias en desarrollo web, presentado de manera técnica y educativa para un público de profesores universitarios especializados en ciencias de la computación.",
      "asks": [
        {
          "id": 1,
          "ask": "¿Cuáles son las tecnologías que quieres destacar en el documento?"
        },
        {
          "id": 2,
          "ask": "¿Quieres destacar tecnologías de frontend, backend o ambas?"
        }
      ]
    }

    Recuerda, la salida debe ser únicamente el objeto JSON sin ningún texto adicional y el contexto debe tener un mínimo de 800 caracteres.
  ` as const

export const refineContextPrompt = (
  originalContext: String,
  ask: String,
  response: String
) =>
  `
      Utiliza esta información para analizar y generar exclusivamente un objeto JSON. Que refine el contexto original basado en la interacción específica con el usuario. La tarea implica comprender y ajustar el contexto para alinearlo mejor con las necesidades y respuestas del usuario, lo que resulta en una presentación más precisa y personalizada del documento.
      
      Contexto original: ${originalContext}
      ----
      Pregunta realizada: ${ask}
      ----
      Respuesta del usuario: ${response}

      Basado en este diálogo, genera un contexto refinado que integre de manera coherente y detallada las preferencias y especificaciones expresadas por el usuario. El contexto refinado debe ser sustancial y desarrollado, con un mínimo de 1000 caracteres para asegurar una cobertura completa y detallada.
      
      Ejemplo de salida deseada:
      {
      "context": "este atributo debe tener un de MINIMO 1000 caracteres y siempre que te llegue uno el que vos devuevlas debe ser igual o mayor de cantidad de caracteres."
      }

      La salida final debe ser un objeto JSON que contenga exclusivamente el contexto refinado, sin texto adicional. Asegúrate de que el contexto cumpla con el mínimo de caracteres requerido y refleje un entendimiento profundo del propósito del usuario.
      ` as const

export const expandPoint = (
  title: String,
  descripcion: String,
  language: String
) =>
  `
        Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Este JSON se usará como base para crear un documento estructurado en formato Markdown. Considerando que estás ayudando a preparar un documento Word para un informe de tarea, necesitamos estructurar la información.
      
        **Idioma:** Debes generar el contenido en "${language}", teniendo en cuenta las normas ortográficas y gramaticales de dicho idioma. Utiliza un lenguaje natural y fluido, evitando repetir lo que ya dice el título. Tampoco vuelvas a hablar de lo mismo que hablaste en el anterior. Enfócate en explicar las ideas de manera clara y concisa, como si estuvieras redactando un documento real y no repitas contenido.
      
        **Instrucciones para el JSON:**
        - "id": Debe ser un identificador único para cada punto.
        - "title": Un título descriptivo que resuma el punto.
        - "descripcion": Una descripción detallada y completa del punto, de al menos 800 caracteres, utilizando un lenguaje natural y evitando la repetición del título.
      
        Título inicial: "${title}"
        Descripción inicial: "${descripcion}"
      
        Ejemplo de salida deseada basado en un texto orientado a la programación web, considerando el idioma "${language}":
       
        {
          "id": 1,
          "title": "Introducción",
          "descripcion": "La programación web ha evolucionado significativamente, permitiendo la creación de sitios y aplicaciones más dinámicas y funcionales. En esta sección se explorarán los conceptos básicos y la importancia de entender la estructura y el funcionamiento de las tecnologías web."
        },
    
         Recuerda, la salida debe ser únicamente el objeto JSON sin ningún texto adicional.
        ` as const
