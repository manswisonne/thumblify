import type { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import { createCanvas } from 'canvas';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (if you want to upload, otherwise save locally)
if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

const colorSchemes: Record<string, { bg: string; accent: string; text: string }> = {
    vibrant: { bg: '#FF1744', accent: '#00E5FF', text: '#FFFFFF' },
    sunset: { bg: '#FF6F00', accent: '#FF4081', text: '#FFFFFF' },
    forest: { bg: '#1B5E20', accent: '#76FF03', text: '#FFFFFF' },
    neon: { bg: '#1A1A2E', accent: '#00FFF0', text: '#FF00FF' },
    purple: { bg: '#4A148C', accent: '#E040FB', text: '#FFFFFF' },
    monochrome: { bg: '#000000', accent: '#FFFFFF', text: '#FFFFFF' },
    ocean: { bg: '#006064', accent: '#00E5FF', text: '#FFFFFF' },
    pastel: { bg: '#FFE0F7', accent: '#B39DDB', text: '#5E35B1' }
};

const wrapText = (ctx: any, text: string, maxWidth: number) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
            currentLine += ' ' + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
};

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please login first.' });
        }

        const { title, prompt: user_prompt, style, aspect_ratio, color_scheme } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const thumbnail = new Thumbnail({
            userId,
            title,
            user_prompt,
            style: style || 'Bold & Graphic',
            aspect_ratio: aspect_ratio || '16:9',
            color_scheme: color_scheme || 'vibrant',
            isGenerating: true
        });

        await thumbnail.save();

        // Determine dimensions
        const dimensions: Record<string, { width: number; height: number }> = {
            '16:9': { width: 1280, height: 720 },
            '9:16': { width: 720, height: 1280 },
            '1:1': { width: 1024, height: 1024 },
            '4:5': { width: 1080, height: 1350 }
        };
        
        const { width, height } = dimensions[aspect_ratio] || dimensions['16:9'];

        // Get color scheme
        const colors = colorSchemes[color_scheme] || colorSchemes.vibrant;

        console.log('🎨 Generating Canvas thumbnail...');
        console.log('📝 Title:', title);
        console.log('🎨 Colors:', colors);

        // Create canvas
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');

        // Background gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, colors.bg);
        gradient.addColorStop(1, colors.accent + '80'); // Add transparency
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Add decorative elements based on style
        if (style === 'Bold & Graphic' || style === 'Tech/Futuristic') {
            // Geometric shapes
            ctx.fillStyle = colors.accent + '40';
            ctx.fillRect(width * 0.7, 0, width * 0.3, height * 0.3);
            ctx.fillRect(0, height * 0.7, width * 0.3, height * 0.3);
        }

        if (style === 'Minimalist') {
            // Clean line
            ctx.strokeStyle = colors.accent;
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(width * 0.1, height * 0.8);
            ctx.lineTo(width * 0.9, height * 0.8);
            ctx.stroke();
        }

        // Add title text
        const fontSize = width > 1000 ? 80 : 60;
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        ctx.fillStyle = colors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Text shadow for better readability
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetX = 4;
        ctx.shadowOffsetY = 4;

        // Wrap and draw text
        const lines = wrapText(ctx, title.toUpperCase(), width * 0.8);
        const lineHeight = fontSize * 1.2;
        const startY = (height / 2) - ((lines.length - 1) * lineHeight / 2);

        lines.forEach((line, i) => {
            ctx.fillText(line, width / 2, startY + (i * lineHeight));
        });

        // Add user prompt as subtitle if provided
        if (user_prompt && user_prompt.trim()) {
            ctx.font = `${fontSize * 0.4}px Arial`;
            ctx.fillStyle = colors.accent;
            ctx.fillText(user_prompt.toUpperCase(), width / 2, startY + (lines.length * lineHeight) + 40);
        }

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Add accent bar
        ctx.fillStyle = colors.accent;
        ctx.fillRect(0, height - 20, width, 20);

        // Convert to buffer
        const buffer = canvas.toBuffer('image/png');

        // Save options:
        // Option 1: Upload to Cloudinary (if configured)
        let imageUrl: string;
        
        if (process.env.CLOUDINARY_CLOUD_NAME) {
            // Save to temp file first
            const tempPath = path.join('uploads', `thumb-${Date.now()}.png`);
            fs.mkdirSync('uploads', { recursive: true });
            fs.writeFileSync(tempPath, buffer);

            // Upload to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(tempPath, {
                resource_type: 'image',
                folder: 'thumbnails'
            });

            imageUrl = uploadResult.secure_url;

            // Clean up temp file
            fs.unlinkSync(tempPath);
        } else {
            // Option 2: Save locally and serve
            const filename = `thumb-${Date.now()}.png`;
            const uploadsDir = path.join('uploads');
            fs.mkdirSync(uploadsDir, { recursive: true });
            
            const filePath = path.join(uploadsDir, filename);
            fs.writeFileSync(filePath, buffer);

            imageUrl = `/uploads/${filename}`;
        }

        // Update thumbnail
        thumbnail.image_url = imageUrl;
        thumbnail.prompt_used = `Canvas-generated: ${title}`;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        console.log('✅ Canvas thumbnail generated!');
        console.log('🔗 Image URL:', imageUrl);

        res.status(200).json({ 
            thumbnail,
            message: 'Thumbnail generated successfully!'
        });

    } catch (error: any) {
        console.error('❌ Error generating thumbnail:', error);
        res.status(500).json({ 
            message: error.message || 'Failed to generate thumbnail' 
        });
    }
};

export const deleteThumbnail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.session.userId;
        
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        const deleted = await Thumbnail.findOneAndDelete({ _id: id, userId });
        
        if (!deleted) {
            return res.status(404).json({ message: 'Thumbnail not found' });
        }
        
        res.status(200).json({ message: 'Thumbnail deleted successfully' });
    } catch (error: any) {
        console.error('❌ Error deleting thumbnail:', error);
        res.status(500).json({ message: error.message });
    }
};