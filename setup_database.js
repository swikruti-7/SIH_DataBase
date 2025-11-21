const { connectToDatabase, closeDatabase } = require('./db/connection');
const { cropsData, diseasesData, solutionsData } = require('./data/sampleData');

async function setupDatabase() {
    try {
        console.log('🔄 Starting SIH_DB database setup...');
        console.log('📁 Project: Smart India Hackathon 2025 - Tech Titan 2.0');
        
        const db = await connectToDatabase();
        
        // Clear existing data
        console.log('🗑️  Clearing existing SIH data...');
        await db.collection('crops').deleteMany({});
        await db.collection('diseases').deleteMany({});
        await db.collection('solutions').deleteMany({});
        
        // Insert new data
        console.log('🌱 Inserting SIH crop data...');
        const cropsResult = await db.collection('crops').insertMany(cropsData);
        console.log(`✅ ${cropsResult.insertedCount} crops inserted`);
        
        console.log('🦠 Inserting SIH disease data...');
        const diseasesResult = await db.collection('diseases').insertMany(diseasesData);
        console.log(`✅ ${diseasesResult.insertedCount} diseases inserted`);
        
        console.log('💊 Inserting SIH solution data...');
        const solutionsResult = await db.collection('solutions').insertMany(solutionsData);
        console.log(`✅ ${solutionsResult.insertedCount} solutions inserted`);
        
        // Create indexes
        console.log('📊 Creating SIH database indexes...');
        await db.collection('crops').createIndex({ "crop_name": 1 });
        await db.collection('diseases').createIndex({ "crop_id": 1 });
        await db.collection('solutions').createIndex({ "disease_id": 1 });
        await db.collection('crops').createIndex({ "suitable_seasons": 1 });
        
        console.log('🎉 SIH_DB database setup completed successfully!');
        console.log('📋 Summary:');
        console.log(`   - Crops: ${cropsResult.insertedCount}`);
        console.log(`   - Diseases: ${diseasesResult.insertedCount}`);
        console.log(`   - Solutions: ${solutionsResult.insertedCount}`);
        
    } catch (error) {
        console.error('💥 Error setting up SIH_DB:', error);
    } finally {
        await closeDatabase();
    }
}

// Run if called directly
if (require.main === module) {
    setupDatabase();
}

module.exports = setupDatabase;