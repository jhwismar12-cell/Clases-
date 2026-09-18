export interface GlossaryTerm {
  id: string;
  term: string;
  aliases: string[]; // Terms and variations to detect in the script text
  category:
    | 'Fisiología Respiratoria'
    | 'Leyes de Gases'
    | 'Fisicoquímica'
    | 'Parámetros Clínicos'
    | 'Biomoléculas'
    | 'Lípidos & Membranas';
  shortDef: string;
  fullDefinition: string;
  formulaOrValue?: string;
  clinicalRelevance: string;
  relatedTermIds: string[];
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'hematosis',
    term: 'Hematosis Pulmonar',
    aliases: ['hematosis', 'intercambio gaseoso', 'intercambio gaseoso pulmonar'],
    category: 'Fisiología Respiratoria',
    shortDef: 'Intercambio gaseoso pasivo entre el alvéolo pulmonar y la sangre capilar venosa.',
    fullDefinition:
      'Proceso biológico y fisicoquímico mediante el cual la sangre venosa desoxigenada procedente del ventrículo derecho se transforma en sangre arterial ricamente oxigenada a nivel de los alvéolos pulmonares. Se produce por difusión simple a través de la membrana alvéolo-capilar, gobernada por gradientes de presión parcial.',
    formulaOrValue: 'ΔPO₂ neto = 100 mmHg - 40 mmHg = 60 mmHg',
    clinicalRelevance:
      'Cualquier alteración en la ventilación/perfusión (V/Q) o engrosamiento de la membrana (fibrosis, edema alveolar) deteriora la hematosis, produciendo hipoxemia e insuficiencia respiratoria aguda.',
    relatedTermIds: ['membrana-alveolo-capilar', 'gradiente-presion', 'oxihemoglobina', 'po2-alveolar'],
  },
  {
    id: 'membrana-alveolo-capilar',
    term: 'Membrana Alvéolo-Capilar',
    aliases: ['membrana alvéolo-capilar', 'membrana alveolo-capilar', 'membrana alveolar'],
    category: 'Fisiología Respiratoria',
    shortDef: 'Barrera tisular ultrafina que separa el aire alveolar de los eritrocitos capilares.',
    fullDefinition:
      'Estructura anatómica de difusión de apenas 0.2 a 0.5 micrómetros de espesor. Está conformada por: 1) Capa de surfactante pulmonar, 2) Neumocito tipo I, 3) Membrana basal epitelial y endotelial fusionadas, y 4) Endotelio del capilar pulmonar. Ofrece un área de superficie estimada de 70 a 100 m².',
    formulaOrValue: 'Espesor: 0.2 - 0.5 µm | Superficie: ~80 m²',
    clinicalRelevance:
      'Según la Ley de Fick, la tasa de difusión es inversamente proporcional al espesor de la membrana. En el edema agudo de pulmón o la neumonitis, el líquido intersticial engrosa la barrera, reduciendo drásticamente la difusión del oxígeno.',
    relatedTermIds: ['hematosis', 'ley-graham', 'gradiente-presion'],
  },
  {
    id: 'gradiente-presion',
    term: 'Gradiente de Presión Parcial',
    aliases: ['gradientes de presión', 'gradiente de presión parcial', 'gradientes de presión parcial pasivos', 'gradiente de solo 6 mmHg', 'gradiente neto de 60 mmHg'],
    category: 'Fisiología Respiratoria',
    shortDef: 'Diferencia de presión parcial entre dos compartimentos que impulsa el flujo neto de gas.',
    fullDefinition:
      'Magnitud vectorial fisicoquímica que cuantifica la caída de presión de un gas determinado entre dos fases o puntos contiguos. En la respiración celular y pulmonar, el transporte de gases es puramente pasivo y no consume ATP celular: las moléculas migran a favor de su propio gradiente de presión parcial.',
    formulaOrValue: 'Gradiente O₂: 100 → 40 mmHg (Δ60 mmHg) | Gradiente CO₂: 46 → 40 mmHg (Δ6 mmHg)',
    clinicalRelevance:
      'Aunque el gradiente del CO₂ es solo de 6 mmHg (frente a 60 mmHg del O₂), el CO₂ difunde casi 20 veces más rápido gracias a su alta solubilidad plasmática calculada por la constante de Bunsen.',
    relatedTermIds: ['hematosis', 'ley-dalton', 'po2-alveolar', 'pco2-venosa'],
  },
  {
    id: 'po2-alveolar',
    term: 'PO₂ Alveolar (Presión Parcial de O₂)',
    aliases: ['PO2', 'PO₂', 'PO2 alveolar', 'PO₂ alveolar', 'presión parcial del oxígeno', 'presión parcial de oxígeno'],
    category: 'Parámetros Clínicos',
    shortDef: 'Presión que ejerce el oxígeno molecular libre en el espacio alveolar.',
    fullDefinition:
      'Corresponde a la presión parcial del oxígeno inspirado una vez acondicionado, humidificado y mezclado con el aire residual funcional alveolar. A nivel del mar bajo respiración en aire ambiente (FiO₂ = 21%), su valor normal promedio es de 100 a 104 mmHg.',
    formulaOrValue: 'PAO₂ = (PB - PH₂O) × FiO₂ - (PaCO₂ / R) ≈ 100 mmHg a nivel del mar',
    clinicalRelevance:
      'En ascensos a grandes alturas (como los Andes o la sierra ecuatoriana), la presión barométrica disminuye, reduciendo la PO₂ alveolar e induciendo el mal agudo de montaña o hipoxia hipobárica.',
    relatedTermIds: ['gradiente-presion', 'oxihemoglobina', 'ley-dalton'],
  },
  {
    id: 'pco2-venosa',
    term: 'PCO₂ (Presión Parcial de CO₂)',
    aliases: ['PCO2', 'PCO₂', 'PCO2 venosa', 'PCO₂ venosa', 'presión parcial de dióxido de carbono'],
    category: 'Parámetros Clínicos',
    shortDef: 'Presión ejercida por el dióxido de carbono libre en sangre o aire alveolar.',
    fullDefinition:
      'Parámetro fundamental en gasometría que refleja el equilibrio entre la producción metabólica de CO₂ en los tejidos y su eliminación alveolar mediante la ventilación por minuto. La PCO₂ normal en sangre venosa mixta es de 45-46 mmHg, mientras que en el alvéolo y sangre arterial es de 40 mmHg.',
    formulaOrValue: 'PCO₂ venosa: 46 mmHg | PCO₂ alveolar/arterial: 40 mmHg',
    clinicalRelevance:
      'Regula el centro respiratorio bulbar mediante quimiorreceptores centrales sensibles al pH del líquido cefalorraquídeo. Es el marcador primario de los trastornos ácido-base respiratorios (acidosis y alcalosis).',
    relatedTermIds: ['ion-bicarbonato', 'gasometria-arterial', 'hiperventilacion'],
  },
  {
    id: 'oxihemoglobina',
    term: 'Oxihemoglobina (HbO₂)',
    aliases: ['oxihemoglobina', 'hemoglobina', 'grupos hemo'],
    category: 'Fisiología Respiratoria',
    shortDef: 'Hemoglobina combinada reversiblemente con cuatro moléculas de oxígeno.',
    fullDefinition:
      'Metaloproteína tetramérica globular presente en los glóbulos rojos (eritrocitos). Posee cuatro grupos hemo con átomos de hierro ferroso (Fe²⁺) que pueden ligar hasta 4 moléculas de O₂ (1.34 ml O₂ por gramo de Hb). Transporta el 98.5% del oxígeno total contenido en la sangre arterial.',
    formulaOrValue: 'Hb + 4 O₂ ⇌ Hb(O₂)₄ | Capacidad: 1.34 ml O₂ / g Hb',
    clinicalRelevance:
      'La curva de disociación de la hemoglobina describe su afinidad por el oxígeno. Se desplaza a la derecha (efecto Bohr) por acidosis, hipercapnia, fiebre o aumento de 2,3-DPG, facilitando la entrega de O₂ a los tejidos metabólicamente activos.',
    relatedTermIds: ['hematosis', 'po2-alveolar', 'ion-bicarbonato'],
  },
  {
    id: 'ion-bicarbonato',
    term: 'Ion Bicarbonato (HCO₃⁻)',
    aliases: ['ion bicarbonato', 'bicarbonato', 'ácido carbónico', 'H2CO3', 'HCO3-'],
    category: 'Fisiología Respiratoria',
    shortDef: 'Principal vehículo de transporte de CO₂ y amortiguador químico del pH sanguíneo.',
    fullDefinition:
      'Aproximadamente el 70% del CO₂ generado por el metabolismo tisular es transportado en forma de ion bicarbonato en el plasma. En el interior del glóbulo rojo, la enzima anhidrasa carbónica cataliza la hidratación reversible de CO₂ en ácido carbónico, que rápidamente se disocia en H⁺ y HCO₃⁻.',
    formulaOrValue: 'CO₂ + H₂O ⇄ H₂CO₃ ⇄ H⁺ + HCO₃⁻ (Valor plasmático: 22 - 26 mEq/L)',
    clinicalRelevance:
      'Es el componente metabólico del sistema amortiguador más importante del organismo, evaluado en la Ecuación de Henderson-Hasselbalch para calcular el pH arterial.',
    relatedTermIds: ['pco2-venosa', 'gasometria-arterial'],
  },
  {
    id: 'ley-boyle',
    term: 'Ley de Boyle-Mariotte',
    aliases: ['Ley de Boyle', 'Boyle', 'proceso isotérmico', 'P1 por V1 es igual a P2 por V2', 'P1·V1 = P2·V2'],
    category: 'Leyes de Gases',
    shortDef: 'A temperatura constante, el volumen de un gas es inversamente proporcional a la presión.',
    fullDefinition:
      'Formulada independientemente por Robert Boyle (1662) y Edme Mariotte (1676). Establece que para una cantidad fija de gas ideal mantenida a temperatura constante (condición isotérmica), el producto de su presión absoluta y su volumen permanece constante.',
    formulaOrValue: 'P₁ · V₁ = P₂ · V₂ (con T y n constantes)',
    clinicalRelevance:
      'Es el principio rector de la mecánica ventilatoria humana: durante la inspiración, el diafragma desciende y los músculos intercostales expanden la caja torácica (aumenta el volumen pulmonar), lo que disminuye la presión intrapulmonar por debajo de la atmosférica (-1 mmHg), succionando aire hacia los pulmones.',
    relatedTermIds: ['teoria-cinetico-molecular', 'ley-charles', 'ley-gay-lussac'],
  },
  {
    id: 'ley-charles',
    term: 'Ley de Charles',
    aliases: ['Ley de Charles', 'Charles', 'proceso isobárico', 'V1 sobre T1 es igual a V2 sobre T2', 'V1/T1 = V2/T2'],
    category: 'Leyes de Gases',
    shortDef: 'A presión constante, el volumen es directamente proporcional a la temperatura absoluta.',
    fullDefinition:
      'Descubierta por Jacques Charles en 1787. Dictamina que el volumen ocupado por una masa determinada de gas a presión constante (isobárico) varía de forma directamente proporcional a su temperatura termodinámica expresada en grados Kelvin.',
    formulaOrValue: 'V₁ / T₁ = V₂ / T₂ (con P y n constantes)',
    clinicalRelevance:
      'Cuando el aire frío ambiental (por ejemplo a 15 °C) ingresa a las vías respiratorias superiores, es calentado por la mucosa nasal y faríngea hasta los 37 °C corporales, expandiendo su volumen antes de alcanzar los alvéolos.',
    relatedTermIds: ['cero-absoluto', 'ley-boyle', 'ley-gay-lussac'],
  },
  {
    id: 'ley-gay-lussac',
    term: 'Ley de Gay-Lussac',
    aliases: ['Ley de Gay-Lussac', 'Gay-Lussac', 'proceso isovolumétrico', 'P1 sobre T1 es igual a P2 sobre T2', 'P1/T1 = P2/T2'],
    category: 'Leyes de Gases',
    shortDef: 'A volumen constante, la presión de un gas es directamente proporcional a la temperatura Kelvin.',
    fullDefinition:
      'Enunciada por Joseph Louis Gay-Lussac en 1802. Indica que para una masa de gas confinada en un recipiente rígido de volumen invariable (isocórico o isovolumétrico), la presión absoluta ejercida sobre las paredes es directamente proporcional a su temperatura absoluta.',
    formulaOrValue: 'P₁ / T₁ = P₂ / T₂ (con V y n constantes)',
    clinicalRelevance:
      'Es crucial para la seguridad de los cilindros y tanques metálicos de oxígeno medicinal en ambulancias y hospitales: exponerlos a fuentes de calor eleva drásticamente la presión interna con riesgo de explosión.',
    relatedTermIds: ['teoria-cinetico-molecular', 'ley-charles', 'ley-boyle'],
  },
  {
    id: 'ley-dalton',
    term: 'Ley de Dalton de las Presiones Parciales',
    aliases: ['Ley de Dalton', 'Dalton', 'presiones parciales', 'presión total es la suma'],
    category: 'Leyes de Gases',
    shortDef: 'La presión total de una mezcla gaseosa es igual a la suma de las presiones parciales.',
    fullDefinition:
      'Formulada por John Dalton en 1801. Establece que cada gas de una mezcla ejerce una presión parcial independiente idéntica a la que ejercería si ocupase él solo la totalidad del volumen a la misma temperatura. La presión total es la suma aritmética de todas las presiones parciales individuales.',
    formulaOrValue: 'P_total = P₁ + P₂ + P₃ + ... + Pₙ = ∑ Pᵢ = ∑ (Xᵢ × P_total)',
    clinicalRelevance:
      'Permite calcular la fracción inspirada de oxígeno (FiO₂) y la composición del aire inspirado húmedo: P_atm (760 mmHg) = PN₂ (597) + PO₂ (159) + PCO₂ (0.3) + otros gases.',
    relatedTermIds: ['gradiente-presion', 'po2-alveolar', 'pco2-venosa'],
  },
  {
    id: 'ley-graham',
    term: 'Ley de Graham de Difusión',
    aliases: ['Ley de Graham', 'Graham', 'difusión y efusión', 'difusión', 'velocidad de difusión'],
    category: 'Leyes de Gases',
    shortDef: 'La velocidad de difusión de un gas es inversamente proporcional a la raíz cuadrada de su masa molar.',
    fullDefinition:
      'Formulada por Thomas Graham en 1829. Demuestra que bajo idénticas condiciones de presión y temperatura, las tasas o velocidades a las que se difunden o efunden los gases guardan una relación inversa a la raíz cuadrada de sus respectivas densidades o masas moleculares.',
    formulaOrValue: 'v₁ / v₂ = √(M₂ / M₁)',
    clinicalRelevance:
      'Explica por qué mezclas de helio y oxígeno (Heliox, de muy baja densidad molecular) reducen el trabajo respiratorio en pacientes con obstrucción severa de la vía aérea superior o crisis asmáticas refractarias.',
    relatedTermIds: ['membrana-alveolo-capilar', 'hematosis', 'teoria-cinetico-molecular'],
  },
  {
    id: 'volumen-molar',
    term: 'Volumen Molar Estándar (22.4 L)',
    aliases: ['22.4 litros', '22.4', 'volumen molar estándar', 'volumen molar', 'CNPT', 'Condiciones Normales de Presión y Temperatura'],
    category: 'Fisicoquímica',
    shortDef: 'Volumen ocupado por exactamente un mol de cualquier gas ideal en CNPT.',
    fullDefinition:
      'Bajo Condiciones Normales de Presión y Temperatura (0 °C / 273.15 K y 1 atm / 760 mmHg), un mol de cualquier gas que se comporte idealmente ocupa un volumen idéntico de 22.414 litros, derivado de la Ley de Avogadro y la constante universal R.',
    formulaOrValue: 'V_m = 22.414 L/mol (a P = 1 atm, T = 273.15 K)',
    clinicalRelevance:
      'Permite convertir directamente cantidades volumétricas de gas consumido (VO₂ en pruebas de esfuerzo) en moles de sustrato metabólico utilizado por los tejidos.',
    relatedTermIds: ['ecuacion-gas-ideal', 'cero-absoluto'],
  },
  {
    id: 'ecuacion-gas-ideal',
    term: 'Ecuación de Estado de los Gases Ideales',
    aliases: ['PV = nRT', 'P por V igual a n por R por T', 'ecuación general de estado', 'Ecuación General de Estado', 'constante R'],
    category: 'Fisicoquímica',
    shortDef: 'Ecuación termodinámica que describe el estado de un gas ideal: PV = nRT.',
    fullDefinition:
      'Relación matemática unificada que combina las leyes de Boyle, Charles, Gay-Lussac y Avogadro en una única ecuación fundamental de estado. La constante R de los gases ideales sintetiza el producto de la constante de Boltzmann y el número de Avogadro.',
    formulaOrValue: 'P · V = n · R · T (R = 0.082057 L·atm/(mol·K) = 8.314 J/(mol·K))',
    clinicalRelevance:
      'Fundamento para la calibración de espirómetros computarizados, ventiladores mecánicos y vaporizadores de agentes anestésicos volátiles como sevoflurano o isoflurano.',
    relatedTermIds: ['ley-boyle', 'ley-charles', 'volumen-molar', 'cero-absoluto'],
  },
  {
    id: 'cero-absoluto',
    term: 'Cero Absoluto (0 Kelvin)',
    aliases: ['cero absoluto', '0 K', 'escala Kelvin', 'temperatura absoluta'],
    category: 'Fisicoquímica',
    shortDef: 'Límite térmico inferior donde la energía cinética molecular es mínima (-273.15 °C).',
    fullDefinition:
      'Punto cero de la escala de temperatura termodinámica propuesto por Lord Kelvin. Corresponde a 0 K (-273.15 °C o -459.67 °F). A este nivel, el movimiento térmico clásico de las partículas cesa por completo, quedando solo la energía del punto cero mecánico-cuántica.',
    formulaOrValue: '0 K = -273.15 °C | T(K) = T(°C) + 273.15',
    clinicalRelevance:
      'En termodinámica y fisiología física, todas las relaciones gaseosas requieren obligatoriamente el uso de la escala absoluta Kelvin. Utilizar grados Celsius en las ecuaciones altera catastróficamente los cálculos de dosificación y presión.',
    relatedTermIds: ['teoria-cinetico-molecular', 'ley-charles', 'ecuacion-gas-ideal'],
  },
  {
    id: 'teoria-cinetico-molecular',
    term: 'Teoría Cinético-Molecular',
    aliases: ['Teoría Cinético-Molecular', 'teoría cinético-molecular', 'gases ideales', 'gas ideal'],
    category: 'Fisicoquímica',
    shortDef: 'Modelo físico que explica las propiedades macroscópicas de los gases mediante mecánica de partículas.',
    fullDefinition:
      'Marco teórico desarrollado por Clausius, Maxwell y Boltzmann. Concibe al gas como una multitud de partículas puntuales en movimiento caótico incesante, con colisiones elásticas continuas y sin interacciones atractivas ni repulsivas a distancia.',
    formulaOrValue: 'Ec = (3/2) · k_B · T = (1/2) · m · v_rms²',
    clinicalRelevance:
      'Proporciona la base física para comprender cómo la temperatura corporal interna (37 °C) acelera la velocidad cinética de las moléculas de oxígeno aumentando su frecuencia de impacto contra la membrana alveolar.',
    relatedTermIds: ['cero-absoluto', 'ley-boyle', 'ecuacion-gas-ideal'],
  },
  {
    id: 'gasometria-arterial',
    term: 'Gasometría Arterial',
    aliases: ['gasometría arterial', 'gasometría', 'gasometria arterial'],
    category: 'Parámetros Clínicos',
    shortDef: 'Prueba diagnóstica invasiva para evaluar oxigenación, ventilación y pH sanguíneo.',
    fullDefinition:
      'Procedimiento diagnóstico mediante punción de una arteria periférica (típicamente arteria radial o femoral) para cuantificar directamente PaO₂, PaCO₂, pH, saturación de oxihemoglobina (SaO₂) y concentración de bicarbonato (HCO₃⁻).',
    formulaOrValue: 'Valores normales: pH 7.35-7.45 | PaO₂ 80-100 mmHg | PaCO₂ 35-45 mmHg | HCO₃⁻ 22-26 mEq/L',
    clinicalRelevance:
      'Estándar de oro para monitorizar pacientes críticos en Unidades de Cuidados Intensivos (UCI), shock séptico, cetoacidosis diabética o durante soporte ventilatorio invasivo.',
    relatedTermIds: ['po2-alveolar', 'pco2-venosa', 'ion-bicarbonato', 'hiperventilacion'],
  },
  {
    id: 'hiperventilacion',
    term: 'Hiperventilación y Alcalosis',
    aliases: ['hiperventila', 'hiperventilación', 'alcalosis respiratoria'],
    category: 'Parámetros Clínicos',
    shortDef: 'Ventilación alveolar en exceso que reduce la PCO₂ plasmática elevando el pH sanguíneo.',
    fullDefinition:
      'Aumento de la ventilación alveolar por encima de las necesidades de producción metabólica de CO₂. Al excretar CO₂ en exceso a través de los alvéolos, la PCO₂ arterial desciende por debajo de 35 mmHg, desplazando el equilibrio de la anhidrasa carbónica hacia la izquierda y consumiendo protones (alcalosis respiratoria).',
    formulaOrValue: 'PCO₂ < 35 mmHg → pH > 7.45 (Alcalosis Respiratoria)',
    clinicalRelevance:
      'Ocurre fisiológicamente como respuesta compensatoria inmediata ante la hipoxia de grandes altitudes mediante la estimulación de los cuerpos carotídeos, o patológicamente en crisis de pánico y dolor severo.',
    relatedTermIds: ['pco2-venosa', 'ion-bicarbonato', 'gasometria-arterial'],
  },
  // BIOMOLÉCULAS Y MEMBRANAS BIOLÓGICAS (CÁTEDRA 2)
  {
    id: 'sintesis-wohler',
    term: 'Síntesis de Wöhler (1828)',
    aliases: ['Síntesis de Wöhler', 'Friedrich Wöhler', 'Wöhler', 'cianato de amonio', 'urea'],
    category: 'Biomoléculas',
    shortDef: 'Primera síntesis de un compuesto orgánico a partir de un precursor inorgánico.',
    fullDefinition:
      'Reacción histórica lograda por el químico alemán Friedrich Wöhler en 1828 al calentar cianato de amonio (inorgánico) y obtener urea (orgánica, producto del catabolismo de aminoácidos). Este hallazgo refutó la teoría del vitalismo, demostrando que las leyes físicas y químicas rigen por igual a la materia viva e inerte.',
    formulaOrValue: 'NH₄OCN (Cianato de amonio) + Calor → CO(NH₂)₂ (Urea)',
    clinicalRelevance:
      'La urea es el principal metabolito nitrogenado excretado por el riñón. Su elevación en sangre (uremia/BUN) es marcador cardinal de insuficiencia renal aguda o crónica.',
    relatedTermIds: ['atomo-carbono'],
  },
  {
    id: 'atomo-carbono',
    term: 'Átomo de Carbono y Tetravalencia',
    aliases: ['átomo de carbono', 'compuestos carbonados', 'disposición tetraédrica', 'tetraédrica', 'tetraédrico'],
    category: 'Biomoléculas',
    shortDef: 'Elemento base de la química orgánica con 4 orbitales híbridos sp³ estables.',
    fullDefinition:
      'Elemento químico con número atómico 6 (configuración 1s² 2s² 2p²). En compuestos biológicos experimenta hibridación sp³, originando cuatro orbitales equivalentes orientados hacia los vértices de un tetraedro regular con ángulos de 109.5°. Su capacidad de concatenación permite formar cadenas lineales, ramificadas y anillos estables.',
    formulaOrValue: 'Geometría sp³: 4 enlaces covalentes • Ángulo: 109.5°',
    clinicalRelevance:
      'La estabilidad y geometría tridimensional de los enlaces C—C y C—H es la base de la estereoquímica de fármacos, receptores celulares y sitios activos enzimáticos.',
    relatedTermIds: ['sintesis-wohler', 'proyecciones-fischer'],
  },
  {
    id: 'proyecciones-fischer',
    term: 'Proyecciones de Fischer e Isomería D/L',
    aliases: ['Proyecciones de Fischer', 'fórmulas de Fischer', 'isómero D', 'isómero L', 'carbono asimétrico'],
    category: 'Biomoléculas',
    shortDef: 'Representación planar bidimensional de carbohidratos para definir su configuración quiral.',
    fullDefinition:
      'Convención desarrollada por Hermann Emil Fischer en la que la cadena carbonada se dibuja verticalmente con el carbono más oxidado arriba. La designación D o L se asigna observando la orientación del grupo hidroxilo (-OH) en el carbono asimétrico o estereocentro más alejado del grupo carbonilo (C-5 en hexosas). Si el -OH está a la derecha es isómero D; a la izquierda, isómero L.',
    formulaOrValue: 'Hexosas humanas: Serie D casi exclusiva en el metabolismo energético',
    clinicalRelevance:
      'Los transportadores GLUT humanos y enzimas como la hexoquinasa son estrictamente estereoespecíficos para D-glucosa, siendo biológicamente inertes ante la L-glucosa.',
    relatedTermIds: ['galactosemia', 'formulas-haworth'],
  },
  {
    id: 'galactosemia',
    term: 'Galactosemia Congénita (Déficit de GALT)',
    aliases: ['galactosemia', 'D-galactosa', 'galactosa'],
    category: 'Parámetros Clínicos',
    shortDef: 'Trastorno genético del metabolismo de la galactosa con toxicidad multiorgánica neonatal.',
    fullDefinition:
      'Error innato del metabolismo autosómico recesivo causado principalmente por mutaciones en la enzima Galactosa-1-fosfato uridiltransferasa (GALT). Al no poder metabolizarse, la galactosa se acumula y es desviada hacia la vía de la aldosa reductasa, generando galactitol (agente osmótico inductor de cataratas precoces) y galactosa-1-fosfato tóxica hepática y cerebral.',
    formulaOrValue: 'Defecto: Gen GALT (Cromosoma 9p13) → Acumulación de Galactosa-1-P y Galactitol',
    clinicalRelevance:
      'Produce ictericia, hepatomegalia, cirrosis, cataratas y sepsis por E. coli en neonatos amamantados. Requiere diagnóstico precoz y supresión inmediata de lactosa y galactosa de por vida.',
    relatedTermIds: ['enlace-glicosidico', 'intolerancia-lactosa'],
  },
  {
    id: 'formulas-haworth',
    term: 'Fórmulas de Haworth y Formas Cíclicas',
    aliases: ['fórmulas de Haworth', 'formas cíclicas', 'Haworth'],
    category: 'Biomoléculas',
    shortDef: 'Representación tridimensional anular de monosacáridos en solución acuosa.',
    fullDefinition:
      'Estructuras anulares que adoptan los monosacáridos en disolución por reacción hemiacetálica o hemicetálica intramolecular. En aldohexosas como la glucosa, el grupo hidroxilo del C-5 ataca al carbonilo del C-1, generando un anillo de piranosa de 6 miembros y un nuevo centro quiral llamado carbono anomérico (generando anómeros α y β).',
    formulaOrValue: 'Ciclación Hemiacetálica: Aldehído (C1) + Alcohol (C5) ⇌ Anillo de Piranosa',
    clinicalRelevance:
      'La posición del -OH anomérico (α o β) determina la digestibilidad: los enlaces α son hidrolizables por amilasas humanas, mientras los β-glicosídicos de la celulosa son indigeribles.',
    relatedTermIds: ['enlace-glicosidico', 'proyecciones-fischer'],
  },
  {
    id: 'enlace-glicosidico',
    term: 'Enlace Glicosídico',
    aliases: ['enlace glicosídico', 'enlace β-1,4-glicosídico', 'enlace beta-1,4-glicosídico', 'enlaces glicosídicos'],
    category: 'Biomoléculas',
    shortDef: 'Enlace covalente éter que une dos monosacáridos mediante pérdida de agua.',
    fullDefinition:
      'Enlace formado entre el grupo hidroxilo anomérico de un monosacárido y cualquier grupo hidroxilo de otro monosacárido, condensándose con pérdida de una molécula de H₂O. Si el -OH anomérico precursor estaba en posición beta, el enlace resultante es de tipo beta-glicosídico (como en la lactosa β(1→4) y celulosa β(1→4)).',
    formulaOrValue: 'R-OH + HO-R\' → R-O-R\' + H₂O',
    clinicalRelevance:
      'Determina la arquitectura de disacáridos y polisacáridos. La escisión enzimática selectiva por disacaridasas intestinales (lactasa, sacarasa, maltasa) es obligatoria para la absorción de nutrientes.',
    relatedTermIds: ['formulas-haworth', 'intolerancia-lactosa', 'glucogeno-almidon'],
  },
  {
    id: 'intolerancia-lactosa',
    term: 'Intolerancia a la Lactosa (Déficit de Lactasa)',
    aliases: ['lactasa', 'lactosa', 'sacarosa'],
    category: 'Parámetros Clínicos',
    shortDef: 'Síndrome malabsortivo digestivo por deficiencia de la disacaridasa lactasa en el borde en cepillo.',
    fullDefinition:
      'Incapacidad de hidrolizar la lactosa (disacárido de la leche compuesto por D-galactosa y D-glucosa) en sus monosacáridos absorbibles debido a hipolactasia primaria o secundaria del enterocito. La lactosa retenida en el lumen ejerce un efecto osmótico que atrae agua (diarrea) y es fermentada por la microbiota colónica en H₂, CH₄ y ácidos grasos volátiles.',
    formulaOrValue: 'Lactosa + H₂O --(Lactasa)--> D-Galactosa + D-Glucosa',
    clinicalRelevance:
      'Ocasiona meteorismo, dolor cólico y diarrea osmótica ácida tras ingesta de lácteos. Se diagnostica mediante el test de hidrógeno espirado o prueba de tolerancia a la lactosa.',
    relatedTermIds: ['enlace-glicosidico', 'galactosemia'],
  },
  {
    id: 'glucogeno-almidon',
    term: 'Polisacáridos: Glucógeno, Almidón y Celulosa',
    aliases: ['Polisacáridos', 'Glucógeno', 'Almidón', 'Celulosa'],
    category: 'Biomoléculas',
    shortDef: 'Homopolisacáridos de reserva energética y estructural compuestos por polímeros de glucosa.',
    fullDefinition:
      'Polímeros de alta masa molecular. El almidón (amilosa lineal α-1,4 y amilopectina ramificada α-1,6) es la reserva de los vegetales. El glucógeno es la reserva animal altamente ramificada (cada 8-12 residuos) en hígado y músculo estriado, optimizada para liberación rápida de glucosa. La celulosa posee enlaces β-1,4 lineales estabilizados por puentes de hidrógeno insolubles.',
    formulaOrValue: 'Glucógeno hepático: ~100 g (mantiene glucemia) • Muscular: ~400 g (fuente para contracción)',
    clinicalRelevance:
      'Las glucogenosis (como la enfermedad de von Gierke por déficit de glucosa-6-fosfatasa) causan hepatomegalia masiva e hipoglucemia en ayuno.',
    relatedTermIds: ['enlace-glicosidico', 'formulas-haworth'],
  },
  {
    id: 'acidos-grasos',
    term: 'Ácidos Grasos y Configuración Cis',
    aliases: ['Ácidos Grasos', 'ácidos grasos', 'saturados', 'insaturados', 'dobles enlaces cis', 'configuración cis'],
    category: 'Lípidos & Membranas',
    shortDef: 'Ácidos carboxílicos alifáticos de cadena larga, base de lípidos saponificables.',
    fullDefinition:
      'Cadenas hidrocarbonadas apolares no ramificadas que terminan en un carboxilo hidrofílico (—COOH). Los ácidos grasos saturados poseen solo enlaces sencillos C—C y adoptan conformaciones lineales de alto punto de fusión. Los insaturados poseen uno o más dobles enlaces en configuración cis, lo cual genera un acodamiento rígido de ~30° en la cadena que disminuye el punto de fusión.',
    formulaOrValue: 'Saturados: CH₃(CH₂)ₙCOOH • Insaturados Cis: Acodamiento angular de 30° en cada doble enlace',
    clinicalRelevance:
      'Los dobles enlaces cis son esenciales para mantener la fluidez de las membranas celulares a 37°C. Los ácidos grasos trans (generados por hidrogenación industrial) aumentan el colesterol LDL aterogénico.',
    relatedTermIds: ['triacilgliceroles', 'mosaico-fluido'],
  },
  {
    id: 'triacilgliceroles',
    term: 'Triacilgliceroles (Triglicéridos) y 9 kcal/g',
    aliases: ['Triacilgliceroles', 'Triglicéridos', 'triglicéridos', 'triglicérido'],
    category: 'Lípidos & Membranas',
    shortDef: 'Triésteres de glicerol y tres ácidos grasos: principal depósito de energía del organismo.',
    fullDefinition:
      'Moléculas lipídicas neutras formadas por esterificación de una molécula de glicerol con tres cadenas de ácidos grasos. Almacenadas en gotas lipídicas citoplasmáticas anhidras en los adipocitos. Aportan 9 kcal/g (38 kJ/g), más del doble que los glúcidos (4 kcal/g), debido a su estado químico mucho más reducido y a su almacenamiento sin agua de hidratación.',
    formulaOrValue: 'Densidad Energética: 9 kcal/g (38 kJ/g) vs 4 kcal/g (17 kJ/g) en glúcidos',
    clinicalRelevance:
      'La hipertrigliceridemia (>150 mg/dL) es factor de riesgo cardiovascular independiente, y niveles superiores a 500-1000 mg/dL conllevan riesgo inminente de pancreatitis aguda.',
    relatedTermIds: ['acidos-grasos', 'lipasa-saponificacion', 'lipoproteinas'],
  },
  {
    id: 'lipasa-saponificacion',
    term: 'Lipólisis, Lipasa y Saponificación',
    aliases: ['lipasa', 'Saponificación', 'saponificación', 'Hidrólisis'],
    category: 'Lípidos & Membranas',
    shortDef: 'Reacciones de hidrólisis química y enzimática de los enlaces éster de los triglicéridos.',
    fullDefinition:
      'La hidrólisis enzimática fisiológica es catalizada por la lipasa pancreática en la luz intestinal (ayudada por sales biliares) y por la lipasa sensible a hormonas en el tejido adiposo. La saponificación es la hidrólisis básica con hidróxido de sodio o potasio (NaOH o KOH), que rinde glicerol libre y sales sódicas de ácidos grasos (jabones amfipáticos).',
    formulaOrValue: 'TAG + 3 NaOH → Glicerol + 3 R-COO⁻ Na⁺ (Jabón)',
    clinicalRelevance:
      'El orlistat es un fármaco contra la obesidad que inhibe selectivamente la lipasa gástrica y pancreática, reduciendo en un 30% la absorción de grasas de la dieta.',
    relatedTermIds: ['triacilgliceroles', 'fosfogliceridos'],
  },
  {
    id: 'prostaglandinas',
    term: 'Prostaglandinas y Eicosanoides',
    aliases: ['Prostaglandinas', 'prostaglandinas', 'Eicosanoides', 'ácido araquidónico'],
    category: 'Lípidos & Membranas',
    shortDef: 'Mediadores lipídicos derivados de 20 carbonos reguladores de inflamación y dolor.',
    fullDefinition:
      'Lípidos biológicamente activos derivados de ácidos grasos poliinsaturados de 20 carbonos, primariamente el ácido araquidónico (20:4 ω-6), liberado de fosfolípidos de membrana por la fosfolipasa A2. La enzima ciclooxigenasa (COX-1 y COX-2) los transforma en PGG2 y PGH2, precursores de PGE2 (fiebre, dolor e hiperemia), tromboxano A2 (proagregante) y prostaciclina (antiagregante y vasodilatadora).',
    formulaOrValue: 'Ácido Araquidónico --(COX-1 / COX-2)--> Prostaglandinas (PGE₂, PGF₂α, PGI₂) + TxA₂',
    clinicalRelevance:
      'Los AINEs (aspirina, ibuprofeno) inhiben a las ciclooxigenasas suprimiendo la síntesis de prostaglandinas, aliviando el dolor, la inflamación y la fiebre.',
    relatedTermIds: ['fosfogliceridos', 'acidos-grasos'],
  },
  {
    id: 'fosfogliceridos',
    term: 'Fosfoglicéridos (Lecitina y Cefalina)',
    aliases: ['Fosfoglicéridos', 'fosfoglicéridos', 'lecitina', 'cefalina', 'fosfatidilcolina'],
    category: 'Lípidos & Membranas',
    shortDef: 'Lípidos estructurales anfipáticos con cabeza fosfatada polar y dos colas apolares.',
    fullDefinition:
      'Componentes lipídicos primordiales de las membranas biológicas. Constan de un esqueleto de glicerol esterificado en C-1 y C-2 por dos ácidos grasos (colas hidrofóbicas), y en C-3 por un grupo fosfato unido a un aminoalcohol polar. Con colina forman fosfatidilcolina (lecitina); con etanolamina o serina forman fosfatidiletanolamina o fosfatidilserina (cefalinas).',
    formulaOrValue: 'Estructura: Cabeza polar hidrofílica (fosfato + aminoalcohol) + 2 colas apolares de acil-CoA',
    clinicalRelevance:
      'La dipalmitoilfosfatidilcolina (DPPC o lecitina) es el componente tensoactivo principal del surfactante pulmonar sintetizado por neumocitos tipo II que evita el colapso alveolar.',
    relatedTermIds: ['mosaico-fluido', 'glucocalix'],
  },
  {
    id: 'nucleo-esterano',
    term: 'Núcleo de Esterano y Colesterol',
    aliases: ['Esteroides', 'núcleo de esterano', 'colesterol', 'esterano'],
    category: 'Lípidos & Membranas',
    shortDef: 'Estructura tetracíclica rígida base de esteroles, hormonas esteroideas y sales biliares.',
    fullDefinition:
      'Lípidos no saponificables caracterizados por el núcleo de ciclopentanoperhidrofenantreno: tres anillos de ciclohexano de 6 carbonos (A, B, C) fusionados a un anillo de ciclopentano de 5 carbonos (D). El colesterol posee 27 carbonos con un grupo -OH en C-3 y una cadena alifática en C-17. Es el lípido modulador de fluidez membranal por excelencia.',
    formulaOrValue: 'Ciclopentanoperhidrofenantreno (Anillos A+B+C [fenantreno hidrogenado] + D [ciclopentano])',
    clinicalRelevance:
      'Precursor obligatorio del cortisol, aldosterona, estrógenos, testosterona y ácidos biliares. En exceso plasmático, se deposita en la túnica íntima arterial formando placas de ateroma.',
    relatedTermIds: ['lipoproteinas', 'mosaico-fluido'],
  },
  {
    id: 'mosaico-fluido',
    term: 'Modelo de Mosaico Fluido (Singer y Nicolson)',
    aliases: ['mosaico fluido', 'modelo de mosaico fluido', 'membrana celular', 'membrana plasmática', 'bicapa lipídica'],
    category: 'Lípidos & Membranas',
    shortDef: 'Bicapa lipídica anfipática fluida con proteínas integrales y periféricas móviles.',
    fullDefinition:
      'Modelo propuesto en 1972 por S. Jonathan Singer y Garth L. Nicolson para describir la arquitectura de la membrana plasmática. Postula que los fosfolípidos forman una matriz bidimensional fluida en estado líquido-cristalino, con sus cabezas polares hacia el agua y sus colas hidrofóbicas enfrentadas. Las proteínas integrales atraviesan la bicapa mientras las periféricas se asocian electrostáticamente.',
    formulaOrValue: 'Bicapa lipídica: Espesor ~7.5 a 10 nm • Colesterol animal: 20-25% de los lípidos',
    clinicalRelevance:
      'La fluidez óptima a 37°C permite el correcto funcionamiento de bombas iónicas (Na⁺/K⁺-ATPasa), canales de compuerta y la fusión de vesículas en exocitosis sinaptica.',
    relatedTermIds: ['fosfogliceridos', 'glucocalix', 'nucleo-esterano'],
  },
  {
    id: 'glucocalix',
    term: 'Glucocálix y Reconocimiento Celular',
    aliases: ['glucocálix', 'glucocalix', 'reconocimiento celular'],
    category: 'Biomoléculas',
    shortDef: 'Cubierta glucídica periférica externa de glicoproteínas y glicolípidos.',
    fullDefinition:
      'Zona rica en cadenas de oligosacáridos ramificados covalentemente unidos a proteínas (glicoproteínas) o a lípidos (glicolípidos) situados exclusivamente en la hemicapa externa de la membrana plasmática. Confiere una carga neta negativa, protege a la célula frente a lesiones mecánicas y químicas, y actúa como sistema de reconocimiento celular.',
    formulaOrValue: 'Localización: Hemicapa externa de la membrana celular (Asimetría de membrana)',
    clinicalRelevance:
      'Los antígenos del sistema de grupos sanguíneos ABO son oligosacáridos del glucocálix eritrocitario. Determina el rechazo o tolerancia en trasplante de órganos.',
    relatedTermIds: ['mosaico-fluido', 'formulas-haworth'],
  },
  {
    id: 'lipoproteinas',
    term: 'Lipoproteínas Plasmáticas',
    aliases: ['lipoproteínas', 'lipoproteinas', 'LDL', 'HDL', 'quilomicrones'],
    category: 'Lípidos & Membranas',
    shortDef: 'Complejos macromoleculares hidrosolubles para el transporte intravascular de lípidos apolares.',
    fullDefinition:
      'Partículas esféricas micelares formadas por un núcleo hidrofóbico central de triglicéridos y ésteres de colesterol, rodeado por una monocapa anfipática externa de fosfolípidos, colesterol no esterificado y apolipoproteínas específicas. Se clasifican por densidad: Quilomicrones (exógenos), VLDL (endógenos), IDL, LDL ("colesterol malo") y HDL ("colesterol bueno").',
    formulaOrValue: 'Densidad y tamaño: Quilomicrones > VLDL > IDL > LDL > HDL',
    clinicalRelevance:
      'La acumulación y oxidación de LDL en el endotelio inicia la aterogénesis, elevando el riesgo de infarto agudo de miocardio y accidente cerebrovascular.',
    relatedTermIds: ['triacilgliceroles', 'nucleo-esterano'],
  },
];

