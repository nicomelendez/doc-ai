export const getPromptAnalyze = (info: String) =>
  `Estás siendo utilizado para analizar el siguiente texto y generar exclusivamente un objeto JSON detallado. Este JSON se usará como base para crear un documento estructurado en formato Markdown. Luego, este documento Markdown se convertirá en un archivo Word bien formateado. El documento Word final será utilizado por el usuario para entregar un informe académico a su universidad o escuela, asegurando que el contenido esté organizado, claro y profesional.
 
El JSON debe incluir los siguientes campos:

- "status": Indica "analizando" si algún punto contiene preguntas y "completo" si no hay preguntas.
- "pointers": Un arreglo de objetos, donde cada objeto representa un punto del texto con la siguiente estructura:
  - "id": Un identificador único para cada punto.
  - "title": Un título descriptivo que resuma el punto.
  - "descripcion": Una descripción detallada y completa del punto minimo de 200 caracteres hacia arriba.
  - "ask":  Genera una pregunta que creas necesaria para que este punto sea más claro y ajustado a lo que busca el usuario, no quiero que sea una pregunta muy dificil sino intuitiva para saber el enfoque que el usuario quiere darle.

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
      "context": "La tecnología ha revolucionado profundamente la manera en que vivimos y trabajamos, marcando cada era con descubrimientos e innovaciones significativas. Desde la invención de la rueda, que facilitó el transporte y la logística, hasta los recientes avances en inteligencia artificial y computación cuántica, cada paso adelante ha redefinido los parámetros de nuestra existencia y operaciones. En la actualidad, nuestra dependencia de dispositivos inteligentes es más evidente que nunca; los utilizamos no solo para comunicarnos sino también para educarnos y entretenernos, tejiendo una red de interconexión global que trasciende fronteras geográficas y culturales. En el ámbito empresarial, los sistemas avanzados de gestión y análisis de datos han revolucionado los métodos tradicionales de operación, permitiendo a las empresas optimizar procesos y potenciar la productividad a niveles sin precedentes. La automatización y la robótica han introducido eficiencias operativas que reducen costos y tiempos de producción, mientras que el big data y el análisis predictivo facilitan una toma de decisiones más informada y estratégica. Sin embargo, este progreso no está exento de desafíos. La privacidad y la seguridad de la información se han convertido en preocupaciones centrales, con brechas de datos y ciberataques emergiendo como amenazas serias en un mundo cada vez más digitalizado. Además, la brecha digital sigue siendo un obstáculo significativo, destacando la desigualdad en el acceso a estas tecnologías avanzadas, lo que puede perpetuar o incluso exacerbar las disparidades socioeconómicas existentes. Este contexto demuestra cómo la tecnología, al ser una espada de doble filo, ofrece oportunidades para la innovación y la mejora de la calidad de vida, al tiempo que plantea retos significativos que deben ser abordados para asegurar un futuro equitativo y seguro para todos."
      }

      La salida final debe ser un objeto JSON que contenga exclusivamente el contexto refinado, sin texto adicional. Asegúrate de que el contexto cumpla con el mínimo de caracteres requerido y refleje un entendimiento profundo del propósito del usuario.
      ` as const
