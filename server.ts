import express, { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

// Lazy initialization for Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Generate Image Endpoint with Gemini 3 Pro / 3.1 Flash image models
app.post("/api/gemini/generate-image", async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      prompt,
      model = "gemini-3-pro-image-preview",
      aspectRatio = "16:9",
      imageSize = "1K",
    } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "El prompt es obligatorio" });
      return;
    }

    const ai = getGeminiClient();

    // Validate supported aspect ratios: 1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9
    const validAspectRatios = ["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9", "1:4", "1:8", "4:1", "8:1"];
    const chosenRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : "16:9";

    // Validate supported image sizes: 1K, 2K, 4K, 512px
    const validSizes = ["512px", "1K", "2K", "4K"];
    const chosenSize = validSizes.includes(imageSize) ? imageSize : "1K";

    // Choose target model, allowing fallback
    const targetModel = model || "gemini-3-pro-image-preview";

    // Construct augmented prompt for Aquila / university character if relevant
    const response = await ai.models.generateContent({
      model: targetModel,
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: chosenRatio,
          imageSize: chosenSize,
        },
      },
    });

    let imageUrl: string | null = null;
    let descriptionText = "";

    const candidates = response.candidates;
    if (candidates && candidates.length > 0 && candidates[0].content?.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || "image/png";
          imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
          break;
        } else if (part.text) {
          descriptionText += part.text;
        }
      }
    }

    if (!imageUrl) {
      res.status(422).json({
        error: "El modelo no devolvió datos de imagen directamente. Descripción: " + (descriptionText || "Sin datos"),
        text: descriptionText,
      });
      return;
    }

    res.json({
      success: true,
      imageUrl,
      modelUsed: targetModel,
      aspectRatio: chosenRatio,
      imageSize: chosenSize,
      description: descriptionText,
    });
  } catch (error: any) {
    console.error("Error al generar imagen con Gemini:", error);
    res.status(500).json({
      error: error?.message || "Error al generar la imagen con el modelo Gemini",
    });
  }
});

// Evaluate Scene 7 challenge solution with Aquila
app.post("/api/gemini/solve-challenge", async (req: Request, res: Response): Promise<void> => {
  try {
    const { studentCalculation, studentExplanation } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `Eres el Profesor Aguilar, la mascota docente universitaria de la Universidad Católica de Cuenca (#SomosÁguilasRojas). Tu nombre oficial es Profesor Aguilar (ya no te llamas Aquila; si te presentas o firmas, usa siempre Profesor Aguilar o Prof. Aguilar). Eres catedrático de Físico-Química y Medicina.
Tienes una personalidad académica rigurosa, motivadora, enérgica y científica.
El desafío de la Escena 7 plantea:
"Un paciente hiperventila en altitud. Si su PO2 alveolar cae a 70 mmHg y su PCO2 a 25 mmHg, calculen la presión parcial total de la mezcla de gases alveolares sabiendo que la PH2O se mantiene constante a 47 mmHg y apliquen la Ley de Dalton para justificar la alteración del equilibrio ácido-base."

Evalúa la respuesta del estudiante. Da:
1. Veredicto: "¡Excelente razonamiento!", "Buen intento con detalles a corregir" o "Requiere revisión".
2. Corrección matemática paso a paso de las presiones parciales con la Ley de Dalton.
3. Explicación fisiológica de la alcalosis respiratoria por hiperventilación (lavado de CO2, disminución de H+ y aumento del pH).
4. Mensaje motivador final en tu estilo característico del Profesor Aguilar con el lema universitario.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Respuesta del estudiante:
Cálculo: ${studentCalculation || "No especificado"}
Explicación clínica: ${studentExplanation || "No especificada"}`,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    res.json({
      feedback: response.text,
    });
  } catch (error: any) {
    console.error("Error en evaluación de desafío:", error);
    res.status(500).json({ error: error?.message || "Error evaluando el desafío clínico" });
  }
});

// Ask Aquila tutor endpoint
app.post("/api/gemini/ask-aquila", async (req: Request, res: Response): Promise<void> => {
  try {
    const { question, currentScene, currentCourse } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `Eres el Profesor Aguilar, águila antropomórfica y catedrático universitario de la Universidad Católica de Cuenca (#SomosÁguilasRojas). Tu nombre oficial es Profesor Aguilar (ya no te llamas Aquila; si te presentas o saludas di 'Soy el profesor Aguilar' o firma como Prof. Aguilar).
Vistes bata médica de laboratorio, estetoscopio, gafas modernas y puntero analítico.
Impartes cátedras magistrales universitarias de Medicina y Ciencias de la Salud:
1. "Materia y Energía en el Organismo Humano"
2. "Físico-Química de los Gases Ideales y Fisiología Respiratoria Humana"
3. "Química Orgánica, Estructura de Biomoléculas y Membranas Biológicas" (Carbohidratos, Lípidos, Esteroides, Mosaico Fluido y Galactosemia).
Cátedra activa: "${currentCourse || "Biomoléculas & Fisiología"}".
Bloque actual: "${currentScene || "General"}".
Responde la duda del estudiante de medicina con precisión académica, pasión científica, rigor bioquímico/fisiológico y un tono cordial y motivador de mentor universitario. Mantén la respuesta concisa y de alto valor (máximo 160 palabras).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: question,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    res.json({ answer: response.text });
  } catch (error: any) {
    console.error("Error consultando a Aquila:", error);
    res.status(500).json({ error: error?.message || "Error consultando al profesor Aquila" });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Prof. Aquila Video Lecture Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
