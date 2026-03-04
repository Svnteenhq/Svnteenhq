import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ROBOTS_TXT, SITEMAP_XML } from "./seo";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get('/robots.txt', (_req, res) => {
    res.type('text/plain').send(ROBOTS_TXT);
  });

  app.get('/sitemap.xml', (_req, res) => {
    res.type('application/xml').send(SITEMAP_XML);
  });

  app.post('/api/analytics/landlord-page-visit', async (req, res) => {
    console.log('Landlord page visit:', req.body);
    return res.json({ ok: true });
  });

  return httpServer;
}
