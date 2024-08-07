import type { Ask } from './types'

export const getPromptAnalyze = (info: String) =>
  `
Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Este JSON se usará para crear un documento estructurado en formato Markdown, que luego se convertirá en un archivo Word bien formateado. El documento Word final será utilizado por el usuario para entregar un informe académico a su universidad o escuela, asegurando que el contenido esté organizado, claro y semiformal.

**Instrucciones para el JSON:**

- **status:** Indica "analizando" si alguno de los puntos contiene preguntas y "completo" si no hay preguntas.
- **pointers:** Un arreglo de objetos, donde cada objeto representa un punto del texto con la siguiente estructura:
  - **id:** Un identificador único para cada punto.
  - **title:** Un título descriptivo que resuma el punto.
  - **description:** Una descripción detallada y completa del punto, de al menos 800 caracteres, utilizando un lenguaje natural y evitando la repetición del título.

Además, el JSON debe incluir una sección de bibliografía con enlaces reales a fuentes que validen algunos o todos los puntos mencionados. La bibliografía debe tener al menos tres referencias y estar en el siguiente formato:

- **Bibliografía:** Un objeto dentro del arreglo 'pointers' con:
  - **title:** "Bibliografía".
  - **description:** Una lista de enlaces válidos y accesibles, citando las fuentes utilizadas.

**Requisitos adicionales:**

- El JSON debe tener al menos 8 puntos de información.
- Asegúrate de que cada punto esté bien documentado y que la bibliografía contenga enlaces que validen la información.

Aquí está el texto para analizar:

${info}

**Ejemplo de salida deseada basado en un texto orientado a la programación web:**

{
  "status": "analizando",
  "pointers": [
    {
      "id": 1,
      "title": "Introducción",
      "description": "La programación web ha evolucionado significativamente, permitiendo la creación de sitios y aplicaciones más dinámicas y funcionales. En esta sección se explorarán los conceptos básicos y la importancia de entender la estructura y el funcionamiento de las tecnologías web."
    },
    {
      "id": 2,
      "title": "Herramientas y frameworks",
      "description": "Existen diversas herramientas y frameworks que facilitan el desarrollo web. Entre los más populares se encuentran React, Angular y Vue.js, cada uno con sus propias ventajas y casos de uso específicos. Esta sección analizará sus características principales y cómo pueden optimizar el proceso de desarrollo."
    },
    {
      "id": 3,
      "title": "Buenas prácticas",
      "description": "Adoptar buenas prácticas en programación web es esencial para mantener el código organizado y eficiente. Esto incluye el uso de control de versiones, la adherencia a estándares de codificación y la implementación de pruebas automatizadas. Estas prácticas no solo mejoran la calidad del código, sino que también facilitan su mantenimiento y escalabilidad."
    },
    {
      "id": 4,
      "title": "Bibliografía",
      "description": "- [Artículo de revista especializada](https://example.com/articulo1) - [Libro de texto](https://example.com/libro1) - [Sitio web confiable](https://example.com/sitio1)"
    }
  ]
}

**Nota:** La salida debe ser únicamente el objeto JSON en el formato especificado, sin ningún texto adicional. Asegúrate de que todos los puntos sean detallados y que la bibliografía contenga enlaces válidos.

Recuerda, los links de la fuente de donde lo sacaste y ponerlo en bibliografia y cualquier texto adicional fuera del objeto JSON debe ser evitado.
` as const

export const getPromptBibliografia = (info: String) =>
  `
Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Este JSON debe tener bibliografías reales y accesibles sobre las fuentes. Será utilizado por el usuario para entregar un informe académico a su universidad o escuela.

**Instrucciones para el JSON:**
  - **title:** "Bibliografía".
  - **description:** Una descripción con fuentes reales y accesibles.

Recuerda, el JSON debe incluir bibliografía con enlaces reales a fuentes que validen algunos o todos los puntos mencionados. La bibliografía debe tener al menos tres referencias y estar en el siguiente formato:

**Formato JSON requerido:**
{
  "id": 9,
  "title": "Bibliografía",
  "description": "Esta sección ofrece una visión general de los recursos bibliográficos utilizados para comprender el impacto de la tecnología en la sociedad y la economía. El artículo de revista especializada 'The Future of Work' de Wired proporciona una visión profunda de cómo la tecnología está cambiando el panorama laboral y educativo. Por otro lado, el libro de texto 'Inteligencia Artificial: una Introducción' de J.P. Ortiz ofrece una introducción exhaustiva a los conceptos y aplicaciones de la inteligencia artificial. Además, el sitio web confiable 'The Future of Work' de Pew Research ofrece análisis y recomendaciones valiosas para entender el impacto de la tecnología en la sociedad y la economía. Estos recursos ofrecen una visión completa y actualizada de los cambios que se están produciendo en el mundo laboral, educativo y social, y cómo podemos prepararnos para estos cambios."
}

**Requisitos adicionales:**
- Asegúrate de que la bibliografía contenga enlaces que validen la información.
- Utiliza fuentes académicas y confiables como Google Scholar, JSTOR, PubMed, y otros repositorios académicos.
- La salida debe ser únicamente el objeto JSON en el formato especificado, sin ningún texto adicional.

----------------------------------------
Aquí está la información para analizar:

${info}

---------------------------------------

SOLO QUIERO QUE ME DEVUELVAS UN OBJETO COMO EL EJEMPLO DADO EN FORMATO JSON. ESTO ES UN EJEMPLO, NO DEBE USARSE:
{
  "id": 4,
  "title": "Bibliografía",
  "description": "Esta sección ofrece una visión general de los recursos bibliográficos utilizados para comprender el impacto de la tecnología en la sociedad y la economía. El artículo de revista especializada 'The Future of Work' de Wired proporciona una visión profunda de cómo la tecnología está cambiando el panorama laboral y educativo. Por otro lado, el libro de texto 'Inteligencia Artificial: una Introducción' de J.P. Ortiz ofrece una introducción exhaustiva a los conceptos y aplicaciones de la inteligencia artificial. Además, el sitio web confiable 'The Future of Work' de Pew Research ofrece análisis y recomendaciones valiosas para entender el impacto de la tecnología en la sociedad y la economía. Estos recursos ofrecen una visión completa y actualizada de los cambios que se están produciendo en el mundo laboral, educativo y social, y cómo podemos prepararnos para estos cambios."
}

**IMPORTANTE:** La salida debe ser únicamente el objeto JSON en el formato especificado, sin ningún texto adicional. Asegúrate de que la bibliografía contenga enlaces válidos.
` as const

export const getPromptContext = (info: String, lenguaje: String) =>
  `
    Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Analiza el texto proporcionado para entender y definir el contexto en el cual el usuario desea crear un documento de informe para entregar a su universidad o secundaria. El propósito del usuario es generar un documento que debe ser escrito en lenguaje ${lenguaje}. Basado en este análisis, genera un objeto JSON que incluya un atributo 'context'. Este 'context' debe ser un texto detallado con un mínimo de 800 caracteres, formulado en una sola línea que puede contener puntos y seguidos, que refleje el enfoque y las principales consideraciones que el usuario tiene en mente para su documento. Asegúrate explícitamente de cumplir con el mínimo de caracteres requerido.

    Además, genera al menos tres preguntas o más, críticas relacionadas con el contenido para asegurar que el contexto sea lo más preciso posible. Estas preguntas deben ayudar a clarificar cualquier aspecto que podría necesitar más detalles o una perspectiva específica del usuario. Deben de tener enfoques diferentes cada pregunta, así las respuestas nos dan el enfoque especifico.

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
  responses: Ask[]
) =>
  `
      Utiliza esta información para analizar y generar exclusivamente un objeto JSON. La tarea implica comprender y ajustar el contexto para alinearlo mejor con las necesidades y respuestas del usuario, lo que resulta en una presentación más precisa del enfoque deseado del usuario.
      
      SI TE TOCA EL PUNTO DE BIBLIOGRAFIA PONE LOS LINK QUE TIENE
      Contexto original: ${originalContext}

      ----
      ${responses.map((item: Ask) => {
        return `Pregunta número ${item.id} realizada: ${item.ask} / Respuesta de la pregunta número ${item.id}: ${item.response}`
      })}
      ----

      Genera un contexto más enfocado de la manera más coherente y detallada con un mínimo de 1000 caracteres para asegurar una cobertura completa y detallada.
      
      Ejemplo de salida deseada:
      {
      "context": "este atributo debe tener un de MINIMO 1000 caracteres y siempre que te llegue uno el que vos devuevlas debe ser igual o mayor de cantidad de caracteres."
      }

      La salida final debe ser un objeto JSON que contenga exclusivamente el contexto refinado, sin texto adicional. Asegúrate de que el contexto cumpla con el mínimo de caracteres requerido y refleje un entendimiento profundo del propósito del usuario.
      ` as const

export const expandPoint = (
  title: String,
  description: String,
  language: String,
  id: String
) =>
  `
      Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Este JSON se usará para estructurar un documento en formato Markdown, como si estuvieras redactando un informe de tarea.

      **Idioma:** Genera el contenido en "${language}", respetando las normas ortográficas y gramaticales del idioma. Usa un lenguaje natural y fluido. Evita repetir información del título o de la descripción inicial y no repitas contenido ya mencionado.

      **Instrucciones para el JSON:**
      - "id": Debe ser el mismo que estan en este ejemplo.
      - "title": Un título descriptivo que resuma el punto.
      - "description": Una descripción detallada del punto, de al menos 800 caracteres, usando un lenguaje natural y evitando la repetición del título.

      Título inicial: "${title}"
      Descripción inicial: "${description}"

      **Ejemplo de salida deseada en "${language}":**

      {
        "id": ${id},
        "title": "Introducción",
        "description": "La programación web ha evolucionado significativamente, permitiendo la creación de sitios y aplicaciones más dinámicas y funcionales. En esta sección se explorarán los conceptos básicos y la importancia de entender la estructura y el funcionamiento de las tecnologías web."
      }

      **Nota:** La salida debe ser exclusivamente el objeto JSON en el formato especificado, sin ningún texto adicional.

      **Recuerda:** Cualquier texto adicional fuera del objeto JSON debe ser evitado. Asegúrate de que el JSON generado cumpla con los requisitos mencionados.
  ` as const

export const expandPointAll = (objeto: String) =>
  `
  Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Este JSON se usará para estructurar un documento Word, ten en cuenta que debes hacerlo como si estuvieras redactando un informe de tarea.
  
  **Idioma:** Genera el contenido en Español, respetando las normas ortográficas y gramaticales del idioma. Usa un lenguaje natural y fluido. Evita repetir información del título o de la descripción inicial y no repitas contenido ya mencionado.
  
  --------------------
  En base al siguiente objeto con la información:
  ${objeto}
  
  ------------------------------
  
  **Instrucciones para el JSON:**
    - **id:** Un identificador único para cada punto.
    - **title:** El título del punto.
    - **description:** Una descripción detallada que incluya aspectos diversos del tema, incluyendo beneficios, desventajas, ejemplos concretos y cualquier otro punto relevante que enriquezca el contenido.
  
  **Formato JSON requerido:**

  [
    {
      "id": 1,
      "title": "Título del Punto 1",
      "description": "Descripción detallada del Punto 1, abordando diferentes aspectos del tema."
    },
    {
      "id": 2,
      "title": "Título del Punto 2",
      "description": "Descripción detallada del Punto 2, abordando diferentes aspectos del tema."
    }
    // Otros puntos adicionales...
  ]

  
  **Nota:** La salida debe ser exclusivamente el objeto JSON con el mismo formato del objeto anterior, sin ningún texto adicional.
  
  **Recuerda:**
  - Cada punto debe abordar aspectos diferentes y variados del tema, evitando comenzar con las mismas palabras en cada punto.
  - Incluye tanto beneficios como desventajas y otros puntos relevantes.
  - Evita cualquier repetición de contenido ya mencionado.
  - Cualquier texto adicional fuera del objeto JSON debe ser evitado.
  - Asegúrate de que el JSON generado cumpla con los requisitos mencionados.
  
  ` as const

export const translateEnglish = (objeto: String) =>
  `
  You are being used to translate the following JSON object exclusively. The output should be exactly the same JSON translated into English, without any additional text.

  Based on the following object with the information:
  ${objeto}
  Note: The output should be exclusively the JSON object in the same format as provided, translated into English, without any additional text.
  ` as const
