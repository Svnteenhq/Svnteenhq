import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateLandlordBrochure } from "./landlordBrochure";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get('/api/landlords/brochure', async (req, res) => {
    try {
      await generateLandlordBrochure(res);
    } catch (error) {
      console.error('Brochure generation error:', error);
      res.status(500).json({ error: 'Brochure generation failed' });
    }
  });

  app.post('/api/analytics/landlord-page-visit', async (req, res) => {
    console.log('Landlord page visit:', req.body);
    return res.json({ ok: true });
  });

  return httpServer;
}
