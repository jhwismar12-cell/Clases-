// Speech utility functions for Web Speech API and Aquila's academic voice

/**
 * Prepares scientific and university text for natural, smooth Spanish text-to-speech.
 * Expands formulas, units, abbreviations, and symbols so Web Speech API doesn't stumble,
 * pause abruptly, or abort mid-sentence.
 */
export function prepareTextForSpeech(text: string): string {
  if (!text) return '';

  return text
    // Remove emojis or special action markers if any
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    // Replace em-dashes and long dashes with clean commas so TTS doesn't stumble
    .replace(/[—–]/g, ', ')
    // LaTeX and mathematical expressions cleanup
    .replace(/\\\(\s*4\\text\{\s*kcal\/g\s*\}\s*\\\)/gi, 'cuatro kilocalorías por gramo')
    .replace(/\\\(\s*17\\text\{\s*kJ\/g\s*\}\s*\\\)/gi, 'diecisiete kilojulios por gramo')
    .replace(/\\\(\s*9\\text\{\s*kcal\/g\s*\}\s*\\\)/gi, 'nueve kilocalorías por gramo')
    .replace(/\\\(\s*38\\text\{\s*kJ\/g\s*\}\s*\\\)/gi, 'treinta y ocho kilojulios por gramo')
    .replace(/\\\(\s*C\s*\\\)/g, 'carbono')
    .replace(/\\\(\s*H\s*\\\)/g, 'hidrógeno')
    .replace(/\\\(\s*O\s*\\\)/g, 'oxígeno')
    .replace(/\\\(\s*C=O\s*\\\)/g, 'carbono doble enlace oxígeno')
    .replace(/\\\(\s*\\beta\s*\\\)/g, 'beta')
    .replace(/\\beta/g, 'beta')
    .replace(/\\\(/g, '')
    .replace(/\\\)/g, '')
    // Clinical laboratory units & abbreviations
    .replace(/\bmOsm\/L\b/gi, 'miliosmoles por litro')
    .replace(/\bmEq\/L\b/gi, 'miliequivalentes por litro')
    .replace(/\bmg\/dL\b/gi, 'miligramos por decilitro')
    .replace(/\bg\/dL\b/gi, 'gramos por decilitro')
    .replace(/\bmL\b/g, 'mililitros')
    .replace(/\bs\.n\.m\.\b/gi, 'sobre el nivel del mar')
    .replace(/\bUCI\b/g, 'unidad de cuidados intensivos')
    .replace(/\bUCACUE\b/g, 'Universidad Católica de Cuenca')
    .replace(/\bpH\b/g, 'p H')
    // Biochemistry units & caloric values
    .replace(/\b4\s*kcal\/g\b/gi, 'cuatro kilocalorías por gramo')
    .replace(/\b17\s*kJ\/g\b/gi, 'diecisiete kilojulios por gramo')
    .replace(/\b9\s*kcal\/g\b/gi, 'nueve kilocalorías por gramo')
    .replace(/\b38\s*kJ\/g\b/gi, 'treinta y ocho kilojulios por gramo')
    .replace(/\bkcal\/g\b/gi, 'kilocalorías por gramo')
    .replace(/\bkJ\/g\b/gi, 'kilojulios por gramo')
    // Biochemistry terminology & names
    .replace(/\bWöhler\b/gi, 'Vóler')
    .replace(/\bsp³\b/gi, 's p tres')
    .replace(/\bsp3\b/gi, 's p tres')
    .replace(/\b109\.5°\b/g, 'ciento nueve punto cinco grados')
    .replace(/\b109\.5\b/g, 'ciento nueve punto cinco')
    .replace(/\bbeta-1,4-glicosídico\b/gi, 'beta uno cuatro glicosídico')
    .replace(/\bβ-1,4-glicosídico\b/gi, 'beta uno cuatro glicosídico')
    .replace(/\bβ-1,4\b/gi, 'beta uno cuatro')
    .replace(/\balfa-1,4\b/gi, 'alfa uno cuatro')
    .replace(/\balfa-1,6\b/gi, 'alfa uno seis')
    .replace(/\bα-1,4\b/gi, 'alfa uno cuatro')
    .replace(/\bα-1,6\b/gi, 'alfa uno seis')
    .replace(/\bD-glucosa\b/gi, 'D glucosa')
    .replace(/\bD-galactosa\b/gi, 'D galactosa')
    .replace(/\bD-fructosa\b/gi, 'D fructosa')
    .replace(/\bD-ribosa\b/gi, 'D ribosa')
    .replace(/\bL-glucosa\b/gi, 'L glucosa')
    .replace(/\b—CHO\b/g, 'grupo aldehído')
    .replace(/\b—OH\b/g, 'grupo hidroxilo')
    .replace(/\b-OH\b/g, 'grupo hidroxilo')
    .replace(/\bGALT\b/g, 'G A L T')
    // Medical & chemical partial pressures and gases
    .replace(/\bPO2\b/g, 'P O dos')
    .replace(/\bPCO2\b/g, 'P C O dos')
    .replace(/\bPH2O\b/g, 'P H dos O')
    .replace(/\bPN2\b/g, 'P N dos')
    .replace(/\bO2\b/g, 'oxígeno')
    .replace(/\bCO2\b/g, 'dióxido de carbono')
    .replace(/\bHCO3-\b/g, 'ion bicarbonato')
    .replace(/\bH2CO3\b/g, 'ácido carbónico')
    .replace(/\bHb\b/g, 'hemoglobina')
    // Units and clinical measurements
    .replace(/\bmmHg\b/g, 'milímetros de mercurio')
    .replace(/\btorr\b/g, 'torr')
    .replace(/\bkPa\b/g, 'kilopascales')
    .replace(/\bpsi\b/g, 'libras por pulgada cuadrada')
    .replace(/\bCNPT\b/g, 'condiciones normales de presión y temperatura')
    .replace(/\b0\s*K\b/g, 'cero Kelvin')
    .replace(/\b0\s*°C\b/g, 'cero grados Celsius')
    .replace(/\b37\s*°C\b/g, 'treinta y siete grados Celsius')
    // Numbers and decimals
    .replace(/\b22\.4\b/g, 'veintidós punto cuatro')
    .replace(/\b0\.082\b/g, 'cero punto cero ochenta y dos')
    .replace(/\b273\.15\b/g, 'doscientos setenta y tres punto quince')
    .replace(/\b101,325\b/g, 'ciento un mil trescientos veinticinco')
    .replace(/\b101\.325\b/g, 'ciento un mil trescientos veinticinco')
    .replace(/\b6\.022\s*×\s*10\^?23\b/g, 'seis punto cero veintidós por diez a la veintitrés')
    // Gas law variables and equations
    .replace(/P1\s*por\s*V1\s*es\s*igual\s*a\s*P2\s*por\s*V2/gi, 'P uno por V uno es igual a P dos por V dos')
    .replace(/P1\s*V1\s*sobre\s*T1\s*igual\s*a\s*P2\s*V2\s*sobre\s*T2/gi, 'P uno por V uno sobre T uno igual a P dos por V dos sobre T dos')
    .replace(/P1\s*sobre\s*T1\s*es\s*igual\s*a\s*P2\s*sobre\s*T2/gi, 'P uno sobre T uno es igual a P dos sobre T dos')
    .replace(/V1\s*sobre\s*T1\s*es\s*igual\s*a\s*V2\s*sobre\s*T2/gi, 'V uno sobre T uno es igual a V dos sobre T dos')
    .replace(/\bP1\b/g, 'P uno')
    .replace(/\bV1\b/g, 'V uno')
    .replace(/\bT1\b/g, 'T uno')
    .replace(/\bn1\b/g, 'n uno')
    .replace(/\bP2\b/g, 'P dos')
    .replace(/\bV2\b/g, 'V dos')
    .replace(/\bT2\b/g, 'T dos')
    .replace(/\bn2\b/g, 'n dos')
    .replace(/\bPV\s*=\s*nRT\b/g, 'P por V igual a n por R por T')
    // Hashtags and institution phrases
    .replace(/#SomosÁguilasRojas/gi, 'Somos Águilas Rojas')
    .replace(/#SOMOSÁGUILASROJAS/gi, 'Somos Águilas Rojas')
    // Symbols
    .replace(/Δ\s*60/g, 'delta de sesenta')
    .replace(/Δ\s*6/g, 'delta de seis')
    .replace(/Δ/g, 'delta ')
    .replace(/±/g, ' más o menos ')
    .replace(/·/g, ' por ')
    .replace(/×/g, ' por ')
    .replace(/%/g, ' por ciento')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Splits formatted speech text into natural, digestible sentence or clause chunks (~15-25 words)
 * so that Web Speech API never exceeds browser internal timeouts (such as the 15-second Chrome cutoff bug)
 * and flows continuously without abrupt pauses, stutters, or clipped words.
 */
export function splitTextIntoSpeechChunks(text: string): string[] {
  if (!text) return [];
  const clean = text.trim();
  if (!clean) return [];

  // Split on sentence terminators (. ! ?) followed by whitespace or end of string
  const rawSentences = clean.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];

  for (const raw of rawSentences) {
    const s = raw.trim();
    if (!s) continue;

    // If already reasonably sized (<= 160 chars), keep intact
    if (s.length <= 160) {
      chunks.push(s);
    } else {
      // For longer sentences, split at colons, semicolons, or natural conjunctions
      const subParts = s.split(/(?<=[;:])\s+|(?<=,\s+(?:donde|cuando|la cual|el cual|los cuales|las cuales|mientras|debido a que|por lo tanto|lo que))\s*/i);
      let buffer = '';
      for (const part of subParts) {
        const trimmed = part.trim();
        if (!trimmed) continue;
        if ((buffer + ' ' + trimmed).trim().length <= 160) {
          buffer = (buffer + ' ' + trimmed).trim();
        } else {
          if (buffer) chunks.push(buffer);
          buffer = trimmed;
        }
      }
      if (buffer) chunks.push(buffer);
    }
  }

  return chunks.length > 0 ? chunks : [clean];
}

