import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post('/api/analytics/landlord-page-visit', async (req, res) => {
    console.log('Landlord page visit:', req.body);
    return res.json({ ok: true });
  });

  return httpServer;
}
