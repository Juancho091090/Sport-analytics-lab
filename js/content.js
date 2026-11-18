/* =====================================================================
   SPORT ANALYTICS LAB · CONTENIDO DEL ODC
   Todos los textos del recurso viven en este archivo.
   Para corregir un texto, edítelo aquí: no hace falta tocar app.js.
   Audios: coloque los MP3 en assets/audio/ con el nombre indicado en "audio".
   ===================================================================== */
window.ODC = {
  titulo: "Sport Analytics Lab",
  subtitulo: "Decisiones estratégicas basadas en datos",
  institucion: "Universidad de Cundinamarca · ODC",
  autores: "Juan Carlos Soto Méndez y Diego Alejandro Puentes Ramírez",
  aprobacion: 80,

  modulos: [
    { id: "M1", nombre: "El problema", icono: "circle-help" },
    { id: "M2", nombre: "Conceptos clave", icono: "book-open" },
    { id: "M3", nombre: "Revisión PRISMA", icono: "filter" },
    { id: "M4", nombre: "Decisiones estratégicas", icono: "target" },
    { id: "M5", nombre: "Transformación digital", icono: "rocket" },
    { id: "M6", nombre: "Business Intelligence", icono: "layout-dashboard" },
    { id: "M7", nombre: "Analítica predictiva", icono: "trending-up",
      sub: ["7.1 Variables predictoras", "7.2 Entrenar y validar", "7.3 Interpretar resultados"] },
    { id: "M8", nombre: "Marketing deportivo", icono: "users" },
    { id: "M9", nombre: "Simulador", icono: "gamepad-2" },
    { id: "M10", nombre: "Evaluación final", icono: "trophy" },
  ],

  pantallas: [
    /* ---------------------------------------------------------------- P1 */
    { id: "p1", n: "1", tipo: "portada", audio: "p01.mp3",
      burbuja: "¡Hola! Seré tu guía en este laboratorio de datos deportivos.",
      voz: "¡Hola! Soy el Coach Kai, y seré tu guía en este laboratorio. Aquí vamos a descubrir cómo los clubes, ligas y academias están usando los datos y la inteligencia artificial para decidir mejor, desde fichar un jugador hasta llenar un estadio. Todo lo que verás sale de una revisión sistemática de 30 estudios científicos. Puedes avanzar con las flechas, volver al menú cuando quieras y repasar cada módulo las veces que necesites. ¿Listo para entrar a la cancha de los datos? ¡Presiona Comenzar!",
      texto: ["Objeto Digital de Conocimiento sobre analítica de datos, Business Intelligence e inteligencia artificial aplicados a la gestión estratégica de organizaciones deportivas."],
      pie: "Autores: Juan Carlos Soto Méndez y Diego Alejandro Puentes Ramírez · Especialización en Analítica y Ciencia de Datos · CAI Ciencia, Tecnología e Innovación · Versión final · Noviembre de 2026 · CC BY-NC-SA" },

    /* ---------------------------------------------------------------- P2 */
    { id: "p2", n: "2", tipo: "bienvenida", chip: "Bienvenida", kicker: "Antes de empezar", titulo: "Tu meta en este laboratorio", audio: "p02.mp3",
      burbuja: "Primero aclaremos a dónde vamos a llegar y para quién es este recurso.",
      voz: "Antes de saltar al campo, aclaremos la meta. Al terminar este recurso podrás explicar cómo la analítica y la inteligencia artificial ayudan a tomar decisiones estratégicas en una organización deportiva, y lo vas a demostrar en la evaluación final. Este laboratorio está pensado para ti si estudias analítica de datos y eres apasionado por el deporte, si trabajas o quieres trabajar en la gestión de un club, una liga o una empresa del deporte. No necesitas saber programar, lo importante es entender qué preguntas responden los datos.",
      rea: "Al finalizar el recurso, podrás analizar cómo estas herramientas nos apoyan en la toma de decisiones a nivel deportivo, a partir de la evidencia científica reciente, resolviendo correctamente al menos el 80 % de la evaluación final.",
      poblacion: ["Estudiantes de posgrado en analítica y ciencia de datos", "Directivos y profesionales de clubes, ligas y academias", "Profesionales de empresas del sector deportivo"] },

    /* ---------------------------------------------------------------- P3 */
    { id: "p3", n: "3", tipo: "menu", chip: "Menú principal", kicker: "Tablero táctico", titulo: "Elige tu jugada", audio: "p03.mp3",
      burbuja: "Los módulos 4 a 8 son el corazón: los cinco hallazgos de la revisión.",
      voz: "Este es tu tablero táctico. Te sugiero seguir el orden de los niveles, del uno al diez, porque cada módulo prepara el siguiente, pero puedes entrar a cualquiera cuando quieras. Cuando completes un módulo, aparecerá un check que confirma que has superado el módulo. Los módulos cuatro al ocho son el corazón del recurso: allí están los cinco grandes hallazgos de la revisión. Y en el nueve te espera un reto, dirigir un club tomando decisiones con datos.",
      texto: ["Recorrido sugerido de M1 a M10. Puedes entrar a cualquier módulo cuando quieras."] },

    /* ---------------------------------------------------------------- P4 · M1 */
    { id: "p4", n: "4", mod: 0, kicker: "Módulo 1 · El problema", titulo: "¿Intuición o datos?", audio: "p04.mp3",
      burbuja: "Dos clubes, mismo presupuesto. ¿Cuál se equivoca menos?",
      voz: "Imagina dos clubes con el mismo presupuesto. Uno decide a quién fichar, cuánto cobrar la boleta y dónde invertir según la experiencia de su directivo. El otro combina esa experiencia con datos. ¿Cuál crees que se equivoca menos? Un estudio con más de quinientas organizaciones deportivas europeas encontró que casi la mitad no usa ninguna tecnología de análisis de datos. Ese es el problema que vamos a explorar. Responde el reto de falso o verdadero para calentar motores.",
      texto: [
        "El deporte dejó de ser solo competencia, hoy es una industria que gestiona patrocinios, taquilla, derechos de transmisión, talento y aficionados. Aun así, muchas organizaciones siguen decidiendo por intuición: el 43,2 % de 569 organizaciones deportivas europeas no usa tecnologías de análisis de datos (Magaz-González et al., 2024).",
        "Las organizaciones deportivas deben liderar su propia transformación digital para seguir siendo competitivas (Gallardo-Guerrero y Maciá-Andreu, 2024).",
        "Si esto lo vemos en Europa, ¿cómo consideras que esta misma situación se enfrenta en nuestro continente?"],
      actividad: { tipo: "vf", titulo: "Reto · Falso o verdadero", items: [
        { q: "Usar datos elimina la necesidad del criterio humano.", r: false,
          fb: "Falso. La analítica apoya la decisión, pero el criterio de quienes dirigen sigue siendo clave. Lo verás en el Hallazgo 1." },
        { q: "La brecha entre clubes con alta y baja madurez digital es recurrente en la literatura.", r: true,
          fb: "Verdadero. El 43,2 % de 569 organizaciones deportivas europeas aún no usa tecnologías de análisis de datos (Magaz-González et al., 2024)." },
        { q: "La analítica solo sirve para el rendimiento en cancha.", r: false,
          fb: "Falso. También apoya la gestión: patrocinio, taquilla, socios y marketing, como verás en los módulos 4 a 8." } ] } },

    /* ---------------------------------------------------------------- P5 · M2 */
    { id: "p5", n: "5", mod: 1, kicker: "Módulo 2 · Conceptos clave", titulo: "El vocabulario del dato", audio: "p05.mp3",
      burbuja: "Gira cada tarjeta y descubre cómo se ve cada concepto en el deporte.",
      voz: "Antes de jugar hay que conocer el reglamento. Estos cinco términos aparecen una y otra vez en los estudios que revisamos, y muchas veces se confunden. Gira cada tarjeta para descubrir qué significa y cómo se ve en el deporte. Un truco: el Business Intelligence te cuenta qué pasó y qué está pasando; la analítica y el machine learning te ayudan a entender por qué pasó y qué podría pasar. Luego, arrastra cada concepto a su ejemplo.",
      texto: ["Estos cinco conceptos aparecen en toda la revisión (Barón Ramírez et al., 2021; García-Jiménez et al., 2021; Yaranga Vite y Olórtiga Cóndor, 2025). Toca cada tarjeta para girarla."],
      tarjetas: [
        { t: "Business Analytics", i: "chart-pie", d: "Uso de datos y métodos estadísticos para explicar y anticipar resultados del negocio.", e: "Analizar por qué cayó la renovación de abonos." },
        { t: "Business Intelligence", i: "layout-dashboard", d: "Sistemas y tableros que convierten datos en información para decidir.", e: "Tablero de ventas de boletería." },
        { t: "Big Data", i: "database", d: "Volúmenes de datos grandes, variados y veloces (tracking, redes, taquilla).", e: "Millones de datos GPS por partido." },
        { t: "Inteligencia Artificial", i: "brain", d: "Sistemas que realizan tareas que requieren razonamiento.", e: "Chatbot para socios." },
        { t: "Machine Learning", i: "cpu", d: "Rama de la IA que aprende patrones a partir de datos.", e: "Predecir la asistencia al estadio." } ],
      actividad: { tipo: "clasificar", titulo: "Arrastra cada ejemplo a su concepto",
        categorias: ["Business Analytics", "Business Intelligence", "Big Data", "Inteligencia Artificial", "Machine Learning"],
        items: [
          { t: "Tablero de ventas de boletería", c: 1, fb: "BI: muestra qué está pasando con las ventas." },
          { t: "Predecir la asistencia al estadio", c: 4, fb: "ML: aprende de partidos pasados para anticipar." },
          { t: "Millones de datos GPS por partido", c: 2, fb: "Big Data: volumen y velocidad enormes." },
          { t: "Chatbot para socios", c: 3, fb: "IA: responde preguntas como lo haría una persona." },
          { t: "Analizar por qué cayó la renovación de abonos", c: 0, fb: "BA: explica el porqué. El BI te dice que cayó; la analítica te ayuda a entender por qué." } ] } },

    /* ---------------------------------------------------------------- P6 · M3 */
    { id: "p6", n: "6", mod: 2, kicker: "Módulo 3 · Metodología", titulo: "Así filtramos la evidencia: PRISMA 2020", audio: "p06.mp3",
      burbuja: "PRISMA es como el VAR de la ciencia: deja registro de cada decisión.",
      voz: "Todo lo que vas a aprender aquí no es opinión: viene de un proceso riguroso. Usamos la metodología PRISMA, que es como el VAR de las revisiones científicas, porque deja registro de cada decisión. Empezamos con setenta y cuatro registros de bases académicas como SciELO, Redalyc y Dialnet, quitamos duplicados, revisamos títulos, resúmenes y textos completos, y al final quedaron treinta estudios de calidad. Con ellos construimos los cinco grandes hallazgos que verás en los próximos módulos. Ahora, pon las fases en orden.",
      texto: [
        "Este recurso se basa en una revisión sistemática con la metodología PRISMA 2020 (Page et al., 2021). La revisión buscó responder cómo se relaciona la adopción de herramientas de análisis de datos e IA con la toma de decisiones en las empresas que gestionan el tema deportivo.",
        "Búsqueda en bases académicas (SciELO, Redalyc, Dialnet, Retos, Cultura Ciencia y Deporte y repositorios), 2015–2026: 74 registros · 14 duplicados · 60 cribados · 18 excluidos (fuentes no académicas) · 42 a texto completo · 12 excluidos (6 solo rendimiento en cancha, 3 literatura gris, 2 sin texto completo, 1 fuera de rango) · 30 incluidos."],
      actividad: { tipo: "ordenar", titulo: "Reto · Ordena las fases",
        correcto: ["Identificación", "Eliminación de duplicados", "Cribado", "Evaluación a texto completo", "Inclusión"],
        fb: "En PRISMA primero se identifican los registros, luego se quitan duplicados, se criban por título y resumen, se evalúa el texto completo y solo entonces se incluyen. Ese orden hace que la revisión sea transparente y reproducible." } },

    /* ---------------------------------------------------------------- P7 · M4 */
    { id: "p7", n: "7", mod: 3, kicker: "Módulo 4 · Hallazgo 1", titulo: "Analítica e IA para decisiones estratégicas", audio: "p07.mp3",
      burbuja: "La analítica no es una bola de cristal: es una herramienta para decidir mejor.",
      voz: "Primer hallazgo. En los estudios revisados, la analítica y la inteligencia artificial no aparecen como bolas de cristal, sino como herramientas para decidir mejor. Ayudan a planificar la temporada, repartir el presupuesto, ajustar la estrategia comercial y encontrar ventajas frente a la competencia. La clave está en el ciclo: el dato se analiza, se decide, se mide el resultado y ese resultado se vuelve un dato nuevo. Pon a prueba lo que aprendiste con la siguiente pregunta.",
      texto: ["Hallazgo 1: las herramientas de Business Analytics, Big Data e IA apoyan decisiones estratégicas en organizaciones deportivas. Los estudios reportan mejoras en planificación, asignación de recursos, gestión comercial y generación de ventajas competitivas mediante decisiones basadas en datos (Niebles Núñez et al., 2023; Sanabria Navarro, Cortina Núñez et al., 2023; Treviño-Reyes et al., 2020; Yaranga Vite y Olórtiga Cóndor, 2025)."],
      actividad: { tipo: "seleccion", titulo: "Selección múltiple",
        q: "Un club debe decidir en qué invertir su presupuesto de la próxima temporada. ¿Qué aporte de la analítica describe mejor la evidencia?",
        ops: [
          { t: "Reemplazar al comité directivo", ok: false, fb: "No. La analítica apoya a quienes deciden; no los reemplaza." },
          { t: "Comparar escenarios y priorizar recursos con base en datos", ok: true, fb: "¡Correcto! Los estudios reportan mejoras en planificación y asignación de recursos." },
          { t: "Garantizar que el equipo gane", ok: false, fb: "No. Los datos reducen la incertidumbre, pero ningún estudio promete resultados deportivos." },
          { t: "Eliminar el riesgo financiero", ok: false, fb: "No. El riesgo se gestiona mejor con datos, pero no desaparece." } ] } },

    /* ---------------------------------------------------------------- P8 · M5 */
    { id: "p8", n: "8", mod: 4, kicker: "Módulo 5 · Hallazgo 2", titulo: "Transformación digital de la gestión deportiva", audio: "p08.mp3",
      burbuja: "Transformarse no es comprar software: es cambiar la forma de trabajar.",
      voz: "Segundo hallazgo. Muchos clubes creen que transformarse digitalmente es comprar un software. La evidencia dice otra cosa: la transformación real ocurre cuando cambian la forma de trabajar y la mentalidad del club. Mira esta escala de madurez: en el primer nivel todo vive en papel y hojas de cálculo sueltas; en el último, las decisiones se apoyan en datos de manera natural. ¿En qué nivel crees que está el club de tu ciudad? Completa la frase para cerrar este módulo.",
      texto: ["Hallazgo 2: la digitalización de procesos, la adopción de plataformas tecnológicas y de soluciones digitales fortalece la eficiencia organizacional y favorece nuevos modelos de gestión, más adecuados para entornos dinámicos (Quishpe Veloz et al., 2024; Rodríguez Chinchilla et al., 2025). La literatura muestra una brecha digital en el sector (Magaz-González et al., 2024)."],
      actividad: { tipo: "completar", titulo: "Completa la frase",
        partes: ["La transformación digital no es solo comprar ", " , sino cambiar ", " y ", " para decidir con datos."],
        correctas: ["tecnología", "procesos", "cultura"], banco: ["tecnología", "procesos", "cultura", "jugadores", "trofeos"],
        fb: "La tecnología sin cambio organizacional no genera valor: hay que cambiar procesos y cultura." } },

    /* ---------------------------------------------------------------- P9 · M6 */
    { id: "p9", n: "9", mod: 5, kicker: "Módulo 6 · Hallazgo 3", titulo: "Business Intelligence: el marcador de la gestión", audio: "p09.mp3",
      burbuja: "Pocos indicadores, bien elegidos, valen más que cincuenta gráficos.",
      voz: "Tercer hallazgo: el Business Intelligence. Piensa en él como el marcador del estadio, pero para la gestión: en una sola pantalla te dice cómo va el partido del negocio. Los estudios coinciden en que su valor está en reunir información que antes estaba dispersa y convertirla en conocimiento para quienes dirigen. Pero ojo: un tablero con cincuenta gráficos no ayuda a nadie. Elige pocos indicadores que respondan buenas preguntas. Practícalo en la actividad.",
      texto: ["Hallazgo 3: el Business Intelligence (tableros de mando, sistemas de información y gestión del conocimiento) convierte información dispersa en conocimiento estratégico para la dirección; los tableros con KPI apoyan los objetivos estratégicos y Power BI es la herramienta más usada en América Latina (Cordero Guzmán y Rodríguez López, 2017; Alvarado-Apodaca et al., 2023; Fasanando-Trigoso y Ramírez-Pezo, 2025)."],
      actividad: { tipo: "clasificar", titulo: "Arrastra cada KPI a la pregunta que responde",
        categorias: ["¿Llenamos el estadio?", "¿Cuánto vale cada hincha?", "¿Los socios vuelven?"],
        items: [
          { t: "Tasa de ocupación del estadio", c: 0, fb: "Permite decidir precios y promociones por partido." },
          { t: "Ingreso por aficionado", c: 1, fb: "Permite decidir dónde invertir para aumentar el valor de cada hincha." },
          { t: "Tasa de renovación de abonos", c: 2, fb: "Permite decidir campañas de fidelización a tiempo." } ] } },

    /* ---------------------------------------------------------------- P10 · M7 */
    { id: "p10", n: "10", mod: 6, sub: -1, kicker: "Módulo 7 · Hallazgo 4", titulo: "Machine learning y analítica predictiva", audio: "p10.mp3",
      burbuja: "Un modelo predice probabilidades, no certezas. La decisión sigue siendo humana.",
      voz: "Cuarto hallazgo: llegamos a la parte predictiva. Aquí el machine learning aprende de los datos del pasado para anticipar lo que viene: cuántas personas irán al estadio, qué socio está a punto de no renovar o cómo se moverán las ventas en la temporada. La literatura muestra usos tanto en la cancha como en las oficinas. Recuerda que un modelo predice probabilidades, no certezas, y que la decisión final sigue siendo humana. Clasifica los casos para comprobarlo.",
      texto: ["Hallazgo 4: el machine learning y la analítica predictiva se aplican tanto al análisis competitivo como a la gestión estratégica: pronóstico de demanda, evaluación de desempeño y optimización organizacional (Bustamante y Burillo, 2016; Malagón-Selma, 2023; Sanabria Navarro et al., 2024; Pelayo Zavalza et al., 2026)."],
      actividad: { tipo: "clasificar", titulo: "Clasifica el caso según el tipo de modelo",
        categorias: ["Clasificación", "Regresión", "Series de tiempo"],
        items: [
          { t: "¿Este socio renovará su abono?", c: 0, fb: "Clasificación: la respuesta es una categoría (sí o no)." },
          { t: "¿Cuántos aficionados asistirán el domingo?", c: 1, fb: "Regresión: la respuesta es un número." },
          { t: "¿Cómo evolucionarán las ventas de camisetas en la temporada?", c: 2, fb: "Series de tiempo: la respuesta depende del orden en el tiempo." } ] } },

    /* ---------------------------------------------------------------- P10.1 */
    { id: "p10_1", n: "10.1", mod: 6, sub: 0, kicker: "Módulo 7 · Machine learning paso a paso", titulo: "¿Con qué datos predice un modelo?", audio: "p10_1.mp3",
      burbuja: "Antes de predecir, hay que elegir bien qué datos le damos al modelo.",
      voz: "¿Qué mirarías tú antes de adivinar si un socio va a volver el próximo año? Seguramente si va a los partidos, cuánto tiempo lleva con el club o si usa la app. Eso es justo lo que hace un modelo, aprende de lo que ya sabemos para anticipar lo que todavía no sabemos. Es como un técnico que arma la alineación mirando el rendimiento de cada jugador. Ahora te toca a ti. Clasifica cada dato y descubre cuáles le sirven al modelo y cuáles no.",
      texto: [
        "Un modelo de machine learning aprende a partir de dos tipos de datos. Las variables predictoras (X) son la información que el club conoce antes del resultado: la asistencia a partidos, la antigüedad del socio, su gasto anual o el uso de la app.",
        "Una buena predictora tiene una relación lógica con el resultado y está disponible en el momento de decidir. En el fútbol, estos modelos ya se usan para anticipar el rendimiento y apoyar decisiones económicas (Malagón-Selma, 2023). Los datos de la tabla son ficticios."],
      actividad: { tipo: "clasificar", titulo: "¿Predictora, objetivo o no sirve?",
        categorias: ["Predictora", "Objetivo", "No sirve"],
        items: [
          { t: "Asistencia a partidos", c: 0, fb: "¡Bien! Es información que el club conoce y que se relaciona con el compromiso del socio." },
          { t: "¿Renovó el abono?", c: 1, fb: "¡Exacto! Es lo que queremos predecir." },
          { t: "Uso de la app del club", c: 0, fb: "¡Bien! Es información que el club conoce y que se relaciona con el compromiso del socio." },
          { t: "Número de cédula", c: 2, fb: "Correcto. Identifica al socio, pero no dice nada sobre su comportamiento, así que no le aporta al modelo." } ] } },

    /* ---------------------------------------------------------------- P10.2 */
    { id: "p10_2", n: "10.2", mod: 6, sub: 1, kicker: "Módulo 7 · Machine learning paso a paso", titulo: "Entrenar, validar y evitar el sobreajuste", audio: "p10_2.mp3",
      burbuja: "Un modelo que memoriza no sirve: tiene que acertar con socios que nunca ha visto.",
      voz: "Imagina un equipo que solo entrena contra sus propios suplentes. Se sabe todas las jugadas de memoria y gana siempre… hasta que llega un rival de verdad y pierde. A los modelos les pasa lo mismo. Por eso los ponemos a prueba con datos que nunca han visto. Si acierta en el entrenamiento, pero falla con socios nuevos, no aprendió: memorizó. A eso se le llama sobreajuste. Mira los tres modelos de la derecha y elige el que tú usarías en el club.",
      texto: [
        "Para saber si un modelo funciona, los datos se dividen en dos partes. Con la primera, cerca del 70 %, el modelo se entrena. Con la segunda, que nunca ha visto, se valida. También se puede usar validación cruzada, que repite esta prueba varias veces con distintas divisiones (James et al., 2021).",
        "Cuando un modelo acierta casi todo en entrenamiento, pero falla con datos nuevos, hay sobreajuste: memorizó en lugar de aprender. Si falla en ambos, hay subajuste, es demasiado simple. Para evitarlo se usan más datos, modelos más sencillos y validación cruzada. Gráfica ilustrativa."],
      actividad: { tipo: "seleccion", titulo: "Reto · ¿Qué modelo elegirías?", q: "",
        ops: [
          { t: "Modelo A · Entrenamiento 76 % · Validación 74 %", ok: true, fb: "¡Buena elección! Su acierto se mantiene con datos nuevos: aprendió a generalizar." },
          { t: "Modelo B · Entrenamiento 99 % · Validación 61 %", ok: false, fb: "Cuidado. Ese 99 % engaña: el modelo memorizó los datos de entrenamiento y falla con socios nuevos. Es sobreajuste." },
          { t: "Modelo C · Entrenamiento 62 % · Validación 60 %", ok: false, fb: "Es estable, pero acierta poco en ambos casos: es demasiado simple (subajuste)." } ] } },

    /* ---------------------------------------------------------------- P10.3 */
    { id: "p10_3", n: "10.3", mod: 6, sub: 2, kicker: "Módulo 7 · Machine learning paso a paso", titulo: "¿Cómo leer lo que dice el modelo?", audio: "p10_3.mp3",
      burbuja: "Un 72 % no es una sentencia: es una alerta para actuar a tiempo.",
      voz: "Si el pronóstico dice setenta por ciento de lluvia, no sabes si va a llover, pero igual sales con sombrilla. Con los modelos pasa igual. Este socio tiene un 72 % de probabilidad de no renovar, no significa que se vaya a ir, significa que hay un riesgo alto y que vale la pena llamarlo antes de que sea tarde. Y ojo, que la asistencia pese mucho no quiere decir que sea la causa. El modelo alerta; las personas deciden. ¿Cuál crees que es la lectura correcta?",
      texto: [
        "El modelo no dice “este socio no va a renovar”. Entrega una probabilidad entre 0 y 1 para cada socio. El club decide desde qué valor actúa (el umbral), según lo que cuesta contactar a un socio frente a lo que cuesta perderlo.",
        "La importancia de las variables muestra qué datos pesan más en la predicción, pero no prueba que los causen. Por eso la última palabra la tiene el equipo de gestión, como se vio en el Hallazgo 1 (James et al., 2021; Malagón-Selma, 2023). Valores ficticios."],
      actividad: { tipo: "seleccion", titulo: "¿Cuál es la lectura correcta?", q: "El socio #2045 tiene 0,72 de probabilidad de no renovar.",
        ops: [
          { t: "El socio #2045 no va a renovar", ok: false, fb: "No exactamente. El modelo da una probabilidad, no una certeza." },
          { t: "Tiene riesgo alto: conviene priorizar el contacto", ok: true, fb: "¡Correcto! El 0,72 es una alerta para actuar a tiempo." },
          { t: "El 72 % de los socios no renovará", ok: false, fb: "No. El valor es de este socio, no un porcentaje de todos los socios." } ] } },

    /* ---------------------------------------------------------------- P11 · M8 */
    { id: "p11", n: "11", mod: 7, kicker: "Módulo 8 · Hallazgo 5", titulo: "Marketing deportivo basado en datos", audio: "p11.mp3",
      burbuja: "No todos los hinchas son iguales. Cada segmento necesita su estrategia.",
      voz: "Quinto hallazgo: los aficionados. Cada vez que un hincha compra una boleta, sigue al club en redes o compra una camiseta, deja datos. La evidencia muestra que, bien usados y con respeto por su privacidad, esos datos permiten conocer mejor a los distintos públicos y ofrecerles lo que realmente valoran. No todos los hinchas son iguales: el fiel, el ocasional, el digital y el familiar necesitan estrategias distintas. Resuelve el caso como si fueras el gerente de mercadeo.",
      texto: ["Hallazgo 5: la analítica aplicada al marketing deportivo permite analizar a los aficionados, segmentar públicos y monetizar datos, fortaleciendo el relacionamiento, la fidelización y nuevos modelos de negocio (Pasquín Llorente, 2020; Pachau Torres et al., 2026)."],
      actividad: { tipo: "seleccion", titulo: "Caso breve",
        q: "La asistencia de familias bajó. Con los datos de segmentos, ¿qué acción tiene más sustento?",
        ops: [
          { t: "Subir todos los precios", ok: false, fb: "No. Una medida general afecta a todos los segmentos y puede empeorar la caída." },
          { t: "Diseñar un paquete familiar dirigido al segmento y medir su efecto", ok: true, fb: "¡Correcto! Segmentar, actuar sobre el grupo afectado y medir el resultado: esa es la lógica del marketing con datos." },
          { t: "Hacer más publicidad general", ok: false, fb: "No. Sin segmentar, el mensaje no llega a quien realmente dejó de ir." } ] } },

    /* ---------------------------------------------------------------- P12 · M9 */
    { id: "p12", n: "12", mod: 8, kicker: "Módulo 9 · Simulador", titulo: "Gerente por un día: Club Deportivo Andes", audio: "p12.mp3",
      burbuja: "¡Llegó tu turno de dirigir! Cada decisión tiene consecuencias.",
      voz: "¡Llegó tu turno de dirigir! Desde hoy eres el gerente del Club Deportivo Andes, un club con mucha historia pero poca tecnología. Vas a tomar tres decisiones, y cada una tendrá consecuencias. No hay trampa: usa lo que aprendiste en los módulos anteriores. Al final verás cómo quedó tu club comparado con una organización de alta madurez digital. Si no te gusta el resultado, puedes volver a intentarlo. ¡Mucha suerte, gerente!",
      texto: ["Eres el nuevo gerente del «Club Deportivo Andes» (ficticio), de baja madurez digital. Cada camino muestra consecuencias y una retroalimentación basada en los hallazgos M4–M8. El puntaje final compara tu club con uno de alta madurez digital, tal como recomienda la literatura revisada."],
      simulador: {
        inicial: { madurez: 35, finanzas: 60, socios: 50 }, referencia: 90,
        decisiones: [
          { q: "La junta te pide «modernizar» el club. ¿Por dónde empiezas?", contexto: "Club de baja madurez digital · presupuesto limitado",
            ops: [
              { t: "Comprar una plataforma costosa", d: "Licencia anual, implementación externa.", i: "shopping-cart", ef: { madurez: 5, finanzas: -25 }, fb: "La tecnología sin cambio de procesos no genera valor (M5)." },
              { t: "Organizar e integrar los datos que ya existen", d: "Taquilla, socios y redes en un solo lugar.", i: "database-zap", ef: { madurez: 20, finanzas: -5 }, fb: "La brecha digital empieza por no usar los datos disponibles (Magaz-González et al., 2024)." } ] },
          { q: "Ya tienes los datos en orden. ¿Qué tablero construyes primero?", contexto: "La junta quiere seguir la gestión cada mes",
            ops: [
              { t: "Un tablero con 40 indicadores de todo", d: "Todas las áreas, todos los datos.", i: "layout-grid", ef: { madurez: 0, socios: -5 }, fb: "Demasiados gráficos confunden a la dirección (M6)." },
              { t: "4 KPI: ocupación, ingreso por aficionado, renovación y seguidores", d: "Pocos indicadores que responden preguntas clave.", i: "layout-dashboard", ef: { madurez: 15, socios: 10 }, fb: "Los tableros con KPI apoyan los objetivos estratégicos (Cordero Guzmán y Rodríguez López, 2017)." } ] },
          { q: "Un modelo marca 300 socios con riesgo alto de no renovar. ¿Qué haces?", contexto: "Faltan seis semanas para la renovación de abonos",
            ops: [
              { t: "Aplicar descuentos automáticos a todos los socios en riesgo", d: "Sin revisar caso por caso.", i: "ticket", ef: { finanzas: -15, socios: 5 }, fb: "Un modelo da probabilidades, no certezas (M7)." },
              { t: "Priorizar contacto con socios en riesgo y medir el resultado", d: "El equipo llama primero a los de mayor riesgo.", i: "phone", ef: { madurez: 15, socios: 15 }, fb: "La analítica apoya la decisión; el criterio humano la completa (M4)." } ] } ],
        niveles: [
          { min: 80, t: "Club guiado por datos", d: "Tomaste decisiones apoyadas en evidencia, como las organizaciones de alta madurez digital." },
          { min: 50, t: "Club en transición", d: "Vas por buen camino, pero algunas decisiones no aprovecharon los datos. Revisa la retroalimentación." },
          { min: 0, t: "Decisiones por intuición", d: "Tu club sigue lejos de una gestión basada en datos. Repasa los módulos 4 a 8 e inténtalo de nuevo." } ] } },

    /* ---------------------------------------------------------------- P13 · M10 */
    { id: "p13", n: "13", mod: 9, kicker: "Módulo 10 · Evaluación final", titulo: "El partido final", audio: "p13.mp3",
      burbuja: "Ahora no se trata de recordar: decide como lo haría un gerente con datos.",
      voz: "Llegó el partido final, y aquí no gana el que más memorizó, sino el que mejor decide. En este espacio vas a encontrar cinco situaciones reales del club, como un modelo “casi perfecto” o una caída en los abonos, y tendrás que escoger qué harías como gerente. Lee con calma y apóyate en los datos. Necesitas acertar ocho de diez. Si no lo logras a la primera, revisa la retroalimentación y vuelve a intentarlo. ¡A la cancha!",
      texto: ["La evaluación tiene 10 preguntas. Cinco son casos del Club Deportivo Andes (ficticio), donde tendrás que analizar datos y elegir la mejor decisión. Cinco son de conceptos clave del laboratorio. Cada respuesta te explica por qué está bien o mal y te indica qué módulo repasar. Para lograr el objetivo necesitas 8 de 10 (80 %). Puedes intentarlo las veces que quieras."],
      preguntas: [
        { tipo: "Caso", q: "Un club guarda la taquilla en papel y los socios en hojas de Excel sueltas. ¿Cuál es el primer paso más sólido?", ops: ["Comprar una plataforma de IA", "Organizar e integrar los datos existentes", "Contratar más personal"], ok: 1, rep: "M5", exp: "Sin datos organizados, ninguna herramienta genera valor: el primer paso es integrar lo que ya existe." },
        { tipo: "Caso", q: "La junta debe decidir si renueva el patrocinio principal. ¿Qué indicadores pondrías en el tablero?", ops: ["40 indicadores de todas las áreas", "Ingreso por patrocinio, alcance digital y asistencia", "Solo resultados deportivos"], ok: 1, rep: "M6", exp: "Un buen tablero usa pocos indicadores que responden la pregunta de la decisión." },
        { tipo: "Caso", q: "Un modelo acierta 99 % en entrenamiento y 60 % con socios nuevos. ¿Qué le dices al analista?", ops: ["Es excelente", "Hay sobreajuste: memorizó", "El modelo es muy simple"], ok: 1, rep: "M7.2", exp: "La gran diferencia entre entrenamiento y validación es la señal del sobreajuste." },
        { tipo: "Caso", q: "El socio #2045 tiene 0,72 de probabilidad de no renovar. ¿Qué haces?", ops: ["Darlo por perdido", "Priorizar el contacto y medir el resultado", "Bajar el precio a todos"], ok: 1, rep: "M7.3", exp: "La probabilidad es una alerta para actuar a tiempo, no una certeza." },
        { tipo: "Caso", q: "Cayeron 20 % los abonos familiares y creció el segmento digital. ¿Qué acción tiene más sustento?", ops: ["Subir precios", "Campaña al segmento familiar y medir efecto", "Eliminar el abono familiar"], ok: 1, rep: "M8", exp: "Se actúa sobre el segmento afectado y se mide el resultado." },
        { tipo: "Concepto", q: "¿Qué ocurre en la fase de cribado de PRISMA?", ops: ["Se buscan registros", "Se revisan títulos y resúmenes", "Se redactan conclusiones"], ok: 1, rep: "M3", exp: "En el cribado se descartan registros por título y resumen antes de leer el texto completo." },
        { tipo: "Concepto", q: "Predecir si un socio renovará su abono es un problema de…", ops: ["Clasificación", "Regresión", "Series de tiempo"], ok: 0, rep: "M7", exp: "La respuesta es una categoría (sí o no): es clasificación." },
        { tipo: "Concepto", q: "¿Cuál de estas NO es una variable predictora útil?", ops: ["Asistencia", "Uso de la app", "Número de cédula"], ok: 2, rep: "M7.1", exp: "Un identificador no dice nada sobre el comportamiento del socio." },
        { tipo: "Concepto", q: "¿Qué diferencia al BI de la analítica predictiva?", ops: ["Ninguna", "El BI describe; la predictiva estima", "El BI solo usa IA"], ok: 1, rep: "M6 · M7", exp: "El BI muestra qué pasó y qué está pasando; la analítica predictiva estima qué podría pasar." },
        { tipo: "Concepto", q: "¿Qué vacío identificó la revisión?", ops: ["Ya no hay nada por investigar", "Falta evidencia en clubes latinoamericanos", "Solo se estudia el fútbol"], ok: 1, rep: "Zona de oportunidad", exp: "Apenas un estudio analiza organizaciones deportivas de Latinoamérica." } ] },

    /* ---------------------------------------------------------------- P14 */
    { id: "p14", n: "14", tipo: "cierre", chip: "Cierre", kicker: "Cierre", titulo: "Conclusiones y tendencias", audio: "p14.mp3",
      burbuja: "¡Terminaste el laboratorio! Ojalá tú seas parte de este cambio.",
      voz: "¡Terminaste el laboratorio! Repasemos: la analítica y la inteligencia artificial apoyan las decisiones estratégicas, digitalizarse no es solo comprar tecnología; el BI convierte datos dispersos en conocimiento; el machine learning anticipa escenarios, y los datos de los aficionados abren nuevas oportunidades de negocio. Todavía falta mucho por investigar: la mayoría de estudios viene de empresas de otros sectores, y casi no hay evidencia en clubes latinoamericanos. Ojalá tú seas parte de ese cambio. ¡Gracias por jugar en el Sport Analytics Lab!",
      texto: [
        "La evidencia revisada muestra que combinar analítica de datos, inteligencia artificial, gestión del conocimiento y transformación digital es una de las estrategias más prometedoras para hacer más competitivas a las empresas deportivas.",
        "Aporte translocal: este recurso responde al problema del uso insuficiente de datos, analítica e IA para la toma de decisiones."],
      tendencias: "Integración de IA y big data en decisiones estratégicas (Yaranga Vite y Olórtiga Cóndor, 2025) · predominio de Power BI en Latinoamérica (Fasanando-Trigoso y Ramírez-Pezo, 2025) · marketing basado en datos como eje del negocio (Pachau Torres et al., 2026).",
      vacios: "16 de los 30 estudios abordan BI en empresas no deportivas; faltan estudios en organizaciones deportivas latinoamericanas." },

    /* ---------------------------------------------------------------- P14.1 */
    { id: "p14_1", n: "14.1", tipo: "oportunidad", chip: "Zona de oportunidad", kicker: "Cierre · Hallazgo para la región", titulo: "La cancha que falta investigar", audio: "p14_1.mp3",
      burbuja: "Aquí hay una oportunidad: casi no hay estudios en clubes como los nuestros.",
      voz: "Después de revisar treinta estudios, nos llevamos una sorpresa, más de la mitad no hablan de deporte, sino de empresas de otros sectores. Y si buscamos estudios en clubes de nuestra región, casi no hay. ¿Cómo usan los datos los clubes del fútbol colombiano? ¿Qué le impide a una liga regional tener un tablero de gestión? Nadie lo ha respondido todavía. Esa cancha está libre, y tú puedes ser quien la juegue.",
      texto: [
        "De los 30 estudios de la revisión, 16 analizan empresas de otros sectores y solo 14 se centran en el deporte. De estos, apenas uno estudia clubes u organizaciones deportivas de Latinoamérica.",
        "Esto revela un vacío: hay poca evidencia sobre cómo usan los datos los clubes, ligas y escuelas de nuestra región. Es una oportunidad para nuevas investigaciones que ayuden a resolver el uso insuficiente de datos, analítica e IA en la toma de decisiones."],
      categorias: [["C3 · BI y analítica para decisiones", 16, false], ["C4 · ML y ciencia de datos en el deporte", 6, true], ["C2 · Transformación digital en el deporte", 4, true], ["C1 · Analítica / IA en organizaciones deportivas", 2, true], ["C5 · Marketing deportivo y aficionados", 2, true]],
      preguntasAbiertas: ["¿Qué nivel de madurez analítica tienen los clubes del fútbol profesional colombiano?", "¿Qué barreras frenan el uso de BI en ligas y escuelas deportivas regionales?", "¿Cómo cambia la renovación de abonos cuando un club usa modelos predictivos?"],
      reflexion: { q: "Escribe una pregunta de investigación sobre analítica en un club o liga de tu región.",
        fb: "¡Gracias por tu pregunta! Compárala con este ejemplo: “¿Qué relación existe entre el uso de tableros de BI y la tasa de renovación de abonos en clubes de fútbol profesional de Colombia entre 2022 y 2025?” Fíjate en que define población (clubes de fútbol profesional), variables (uso de BI y renovación) y contexto (Colombia, 2022–2025)." } },

    /* ---------------------------------------------------------------- P15 */
    { id: "p15", n: "15", tipo: "creditos", chip: "Créditos", kicker: "Créditos", titulo: "Metadatos y licencia",
      metadatos: [
        ["Área de conocimiento", "Analítica y Ciencia de Datos · Gestión deportiva"],
        ["Nombre del material", "Sport Analytics Lab: decisiones estratégicas basadas en datos"],
        ["Autor", "Juan Carlos Soto Méndez y Diego Alejandro Puentes Ramírez"],
        ["Diseño y desarrollo", "Juan Carlos Soto Méndez y Diego Alejandro Puentes Ramírez"],
        ["Imágenes", "Elaboración propia con apoyo de herramientas de IA (interfaces, infografías, gráficos y avatar «Coach Kai»). Íconos: Lucide Icons, licencia ISC. Tipografía: Poppins, licencia SIL Open Font License."],
        ["Sonidos y voces", "Voces: Juan Carlos Soto Méndez y Diego Alejandro Puentes Ramírez (grabación propia)."],
        ["Fecha de creación", "06/10/2026"],
        ["Nivel educativo", "Intermedio"] ] },

    /* ---------------------------------------------------------------- P16 */
    { id: "p16", n: "16", tipo: "referencias", chip: "Referencias", kicker: "Referencias", titulo: "Referencias (APA 7)",
      referencias: [
        "Ahumada Tello, E., & Perusquia Velasco, J. M. A. (2016). Inteligencia de negocios: estrategia para el desarrollo de competitividad en empresas de base tecnológica. Contaduría y Administración, 61(1), 127-158.",
        "Alvarado-Apodaca, J., Ramírez-Noriega, A., Tripp-Barba, C., Martínez-Ramírez, Y., & Álvarez Sánchez, I. N. (2023). Inteligencia de negocios en América Latina: una revisión sistemática de literatura. Revista de Investigación en Tecnologías de la Información (RITI), 11(24), 76-89.",
        "Barón Ramírez, E., García Estrella, C. W., & Sánchez Gárate, S. K. (2021). La inteligencia de negocios y la analítica de datos en los procesos empresariales. Revista Científica de Sistemas e Informática, 1(2), 37-53.",
        "Bustamante, Á., & Burillo, P. (2016). Gestión y evaluación del rendimiento en baloncesto: una revisión sistemática del software. Retos, 29, 72-78.",
        "Bustamante, A., Galvis, E., & Gómez, L. C. (2016). Perfil de la investigación sobre inteligencia de negocios en América Latina. Revista UIS Ingenierías, 15(1).",
        "Cordero Guzmán, D. M., & Rodríguez López, G. (2017). La inteligencia de negocios: una estrategia para la gestión de las empresas productivas. Revista Ciencia UNEMI, 10(23), 40-48.",
        "Cordero-Naspud, E. I., Erazo-Álvarez, J. C., Narváez-Zurita, C. I., & Cordero-Guzmán, D. M. (2020). Soluciones corporativas de inteligencia de negocios en las pequeñas y medianas empresas. Revista Arbitrada Interdisciplinaria Koinonía, 5(10).",
        "Córdova-Aponte, M. F., Valarezo-Ávila, B. M., & Serrano-Orellana, B. J. (2021). La inteligencia de negocios como herramienta clave en el desempeño empresarial. 593 Digital Publisher CEIT, 6(6), 306-325.",
        "Creative Commons Colombia. (2019). ¿Qué es Creative Commons? https://co.creativecommons.net/quienes-somos/",
        "Fandiño Pérez, Y., & Fernández Cobas, L. C. (2023). Sistema de inteligencia de mercadotecnia empresarial. Opuntia Brava, 15(3).",
        "Fasanando-Trigoso, D. C., & Ramírez-Pezo, Y. E. (2025). Impacto de la inteligencia de negocios en la mejora de la toma de decisiones: una revisión sistemática de la literatura. Revista Amazonía Digital, 4(2), e370.",
        "Gallardo-Guerrero, A. M., & Maciá-Andreu, M. J. (2024). Transformación digital: retos y oportunidades en la gestión del deporte. Cultura, Ciencia y Deporte, 19(60).",
        "García Hernández, S., & Calderón Martínez, M. G. (2019). Inteligencia de negocios para la competitividad: startups en InnovaUNAM. Universidad Nacional Autónoma de México.",
        "García-Jiménez, A. de J., Aguilar-Morales, N., Hernández-Triano, L., & Lancaster-Díaz, E. (2021). La inteligencia de negocios: herramienta clave para el uso de la información y la toma de decisiones empresariales. Revista de Investigaciones Universidad del Quindío, 33(1), 132-139.",
        "James, G., Witten, D., Hastie, T., & Tibshirani, R. (2021). An introduction to statistical learning: With applications in R (2nd ed.). Springer. https://doi.org/10.1007/978-1-0716-1418-1",
        "Magaz-González, A. M., Gallardo, L., Marín-Farrona, M., Sánchez-Sánchez, J., Lorenzo, A., López-Fernández, J., Duclos-Bastías, D., & García-Unanue, J. (2024). Estructura tecnológica y configuración del uso de la tecnología en organizaciones deportivas europeas. Cultura, Ciencia y Deporte, 19(60).",
        "Malagón-Selma, M. del P. (2023). Machine Learning and Multivariate Statistical Tools for Football Analytics [Tesis doctoral, Universitat Politècnica de València].",
        "Martínez Soplapuco, L. J. A. (2023). La inteligencia de negocios en las pymes: una revisión sistemática de la literatura [Trabajo de investigación, Universidad Católica Santo Toribio de Mogrovejo].",
        "Martínez Zabaleta, M. E., & Rodríguez Luna, R. E. (2023). Inteligencia empresarial y su rol en la generación de valor en los procesos de negocios. Tendencias, 23(1), 226-251.",
        "Niebles Núñez, W. A., Sanabria Navarro, J. R., & Silveira Pérez, Y. (2023). Análisis sistémico del contexto mundial de gestión deportiva: aportes significativos de la revista Retos. Retos, 48, 631-643.",
        "Pachau Torres, W. A., Alvarado Figueroa, M. A., & Romero Echevarria, L. M. (2026). Marketing deportivo: claves y perspectivas globales desde una revisión sistemática. Revista InveCom, 6(1), 1-12.",
        "Page, M. J., McKenzie, J. E., Bossuyt, P. M., Boutron, I., Hoffmann, T. C., Mulrow, C. D., … Moher, D. (2021). The PRISMA 2020 statement: An updated guideline for reporting systematic reviews. BMJ, 372, n71. https://doi.org/10.1136/bmj.n71",
        "Pasquín Llorente, Í. (2020). Impacto del Big Data en el deporte y en el fútbol [Trabajo Fin de Grado, Universidad Pontificia Comillas].",
        "Pelayo Zavalza, A. R., González Díaz, Q., López Haro, J., Gómez Chávez, L. F. J., & Del Río González, U. G. (2026). Inteligencia Artificial (IA) y básquetbol: análisis cienciométrico y revisión narrativa de los principales hallazgos. Revista de Ciencias del Ejercicio FOD, 21(2), 13-21.",
        "Quishpe Veloz, K. A., Caiza Llumiquinga, C. I., & Toapanta Iza, E. R. (2024). La transformación digital en el deporte: el impacto de las TIC en la mejora del rendimiento deportivo y la experiencia del usuario. LATAM Revista Latinoamericana de Ciencias Sociales y Humanidades, 5(4).",
        "Ramos-Álvarez, O., García-Romero, C., & Arufe-Giráldez, V. (2024). 20 años de investigación científica de la revista Retos, nuevas tendencias en Educación Física, Deportes y Recreación: análisis bibliométrico. Retos, 54, 355-361.",
        "Rodríguez Chinchilla, J. L., Morales Sevilla, C. N., Rosales Andrade, C. S., Andrade Álvarez, B. S., De la Cruz Cushcagua, S. G., & Meneses Fuentes, F. S. (2025). Transformación digital en clubes deportivos: un sistema web integral para la gestión de cobros, inventario y fichas de atletas. Revista Científica Dejando Huellas, 4(2), 96-111.",
        "Sanabria Navarro, J. R., Cortina Núñez, M. J., et al. (2023). Gestión organizacional deportiva: revisiones sistemáticas [Libro].",
        "Sanabria Navarro, J. R., Niebles Núñez, W. A., & Silveira Pérez, Y. (2024). Análisis bibliométrico de la inteligencia artificial en el deporte. Retos, 54, 312-319.",
        "Segarra-Saavedra, J., Cristòfol, F. J., & Martínez-Sala, A. M. (2019). Inteligencia artificial (IA) aplicada a la documentación informativa y redacción periodística deportiva: el caso de BeSoccer. Doxa Comunicación, 29, 275-286.",
        "Silva Idrovo, R. R., Pino Morán, F. N., & Alejo Machado, O. J. (2018). Influencia de la inteligencia de negocio en el marketing turístico. Universidad y Sociedad, 10(1), 326-330.",
        "Treviño-Reyes, R., Rivera-Rodríguez, F. S., & Garza-Alonso, J. A. (2020). La analítica de datos como ventaja competitiva en las organizaciones. Vinculatégica EFAN, 6(2).",
        "Yaranga Vite, I. P., & Olórtiga Cóndor, L. W. (2025). Integración de la inteligencia artificial con big data para la toma de decisiones en las empresas: un estudio bibliométrico. Revista InveCom, 5(4)." ] },
  ],
};
