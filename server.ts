import express from 'express';
import path from 'path';
import { Readable } from 'stream';
import { google } from 'googleapis';
import { createServer as createViteServer } from 'vite';
import { generateDocxBuffer } from './src/lib/docxGenerator';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // API Route: Generate downloadable .docx file
  app.post('/api/generate-docx', async (req, res) => {
    try {
      const { weeks, options } = req.body;
      if (!weeks || !Array.isArray(weeks)) {
        return res.status(400).json({ error: 'Missing or invalid schedule weeks array' });
      }

      const buffer = await generateDocxBuffer(weeks, options);
      const fileName = options?.title ? `${options.title.replace(/[^a-zA-Z0-9_\- ]/g, '_')}.docx` : 'Sagantaa_Hifzii_Guutuu.docx';

      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      return res.send(buffer);
    } catch (error: any) {
      console.error('Error generating DOCX:', error);
      return res.status(500).json({ error: error.message || 'Failed to generate DOCX document' });
    }
  });

  // API Route: Export schedule to Google Docs in user's Google Drive
  app.post('/api/export-docs', async (req, res) => {
    try {
      const { accessToken, title, weeks, options } = req.body;
      if (!accessToken) {
        return res.status(401).json({ error: 'Missing Google OAuth Access Token. Please sign in.' });
      }
      if (!weeks || !Array.isArray(weeks)) {
        return res.status(400).json({ error: 'Missing schedule weeks data.' });
      }

      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: accessToken });

      const drive = google.drive({ version: 'v3', auth: oauth2Client });
      const docBuffer = await generateDocxBuffer(weeks, { ...options, title });

      const media = {
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        body: Readable.from(docBuffer),
      };

      const docTitle = title || "SAGANTAA HIFZII FI MURAJA'AA QUR'AANA BARATTOOTAA";

      const file = await drive.files.create({
        requestBody: {
          name: docTitle,
          mimeType: 'application/vnd.google-apps.document',
        },
        media,
        fields: 'id, name, webViewLink',
      });

      const documentId = file.data.id;
      const webViewLink = file.data.webViewLink || `https://docs.google.com/document/d/${documentId}/edit`;

      return res.json({
        success: true,
        documentId,
        title: file.data.name,
        webViewLink,
      });
    } catch (error: any) {
      console.error('Error exporting to Google Docs:', error);
      return res.status(500).json({
        error: error.message || 'Failed to create Google Doc. Please verify permissions.',
      });
    }
  });

  // Vite middleware for dev / static for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
