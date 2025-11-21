const express = require('express');
const { connectToDatabase } = require('./db/connection');
const cropRoutes = require('./routes/cropRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Add to your existing app.js
const apiRoutes = require('./routes/apiRoutes');

// Add this with your other routes
app.use('/api/external', apiRoutes);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', cropRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'SIH 2025 - Smart Crop Advisory System API is running',
        timestamp: new Date().toISOString(),
        team: 'Tech Titan 2.0',
        project: 'AI-Powered Crop Yield Prediction and Optimization'
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Welcome to SIH 2025 - Smart Crop Advisory System API',
        team: 'Tech Titan 2.0',
        problem_statement: 'AI-Powered Crop Yield Prediction and Optimization',
        endpoints: {
            health: '/health',
            allCrops: '/api/crops',
            cropById: '/api/crops/:id',
            cropDiseases: '/api/crops/:id/diseases',
            searchCrops: '/api/search/crops?q=query',
            cropsBySeason: '/api/season/:season'
        },
        database: 'SIH_DB - MongoDB'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'SIH API route not found',
        available_routes: ['/health', '/api/crops', '/api/search/crops']
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('SIH API Error:', error);
    res.status(500).json({
        success: false,
        error: 'SIH Internal server error',
        message: error.message
    });
});

// Start server
async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log('='.repeat(60));
            console.log('🚀 SIH 2025 - Smart Crop Advisory System');
            console.log('👥 Team: Tech Titan 2.0');
            console.log('📊 Database: SIH_DB (MongoDB)');
            console.log('🌐 Server running on port', PORT);
            console.log('='.repeat(60));
            console.log(`📍 Local: http://localhost:${PORT}`);
            console.log(`🌱 API: http://localhost:${PORT}/api/crops`);
            console.log(`❤️  Health: http://localhost:${PORT}/health`);
            console.log('='.repeat(60));
        });
    } catch (error) {
        console.error('💥 Failed to start SIH server:', error.message);
        console.log('💡 Troubleshooting:');
        console.log('   1. Check if MongoDB is running: brew services start mongodb-community');
        console.log('   2. Verify connection string in .env file');
        process.exit(1);
    }
}

startServer();

module.exports = app;