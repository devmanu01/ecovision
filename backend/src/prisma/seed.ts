import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.regionSolution.deleteMany();
  await prisma.predictionData.deleteMany();
  await prisma.historicalData.deleteMany();
  await prisma.solution.deleteMany();
  await prisma.dataSource.deleteMany();
  await prisma.region.deleteMany();

  // Insert regions — exact data from database_schema.sql
  const regions = await Promise.all([
    prisma.region.create({
      data: {
        name: 'Amazon Basin',
        type: 'forest',
        latitude: -3.4653,
        longitude: -62.2159,
        areaSqkm: 5500000,
        description: 'Largest rainforest in the world',
      },
    }),
    prisma.region.create({
      data: {
        name: 'Congo Basin',
        type: 'forest',
        latitude: 0.2636,
        longitude: 15.2832,
        areaSqkm: 2200000,
        description: 'Second largest rainforest in the world',
      },
    }),
    prisma.region.create({
      data: {
        name: 'Borneo',
        type: 'forest',
        latitude: 0.9619,
        longitude: 114.5548,
        areaSqkm: 750000,
        description: 'Third largest island in the world with significant rainforest',
      },
    }),
    prisma.region.create({
      data: {
        name: 'Himalayas',
        type: 'glacier',
        latitude: 28.5983,
        longitude: 83.9311,
        areaSqkm: 30000,
        description: 'Mountain range with the highest peaks in the world',
      },
    }),
    prisma.region.create({
      data: {
        name: 'Alps',
        type: 'glacier',
        latitude: 46.4983,
        longitude: 9.8382,
        areaSqkm: 3000,
        description: 'Mountain range in Europe with significant glaciers',
      },
    }),
    prisma.region.create({
      data: {
        name: 'Andes',
        type: 'glacier',
        latitude: -32.6536,
        longitude: -70.0114,
        areaSqkm: 25000,
        description: 'Longest continental mountain range in the world',
      },
    }),
  ]);

  const [amazon, , , himalayas] = regions;

  // Insert historical data — exact data from database_schema.sql
  await prisma.historicalData.createMany({
    data: [
      { regionId: amazon.regionId, year: 2000, forestCoverSqkm: 5500000, temperatureCelsius: 25.8, precipitationMm: 2400 },
      { regionId: amazon.regionId, year: 2005, forestCoverSqkm: 5300000, temperatureCelsius: 26.1, precipitationMm: 2350 },
      { regionId: amazon.regionId, year: 2010, forestCoverSqkm: 5100000, temperatureCelsius: 26.5, precipitationMm: 2300 },
      { regionId: amazon.regionId, year: 2015, forestCoverSqkm: 4900000, temperatureCelsius: 26.9, precipitationMm: 2250 },
      { regionId: amazon.regionId, year: 2020, forestCoverSqkm: 4700000, temperatureCelsius: 27.2, precipitationMm: 2200 },
    ],
  });

  // Insert prediction data — exact data from database_schema.sql
  await prisma.predictionData.createMany({
    data: [
      { regionId: amazon.regionId, year: 2025, forestCoverSqkm: 4500000, temperatureCelsius: 27.5, precipitationMm: 2150, confidenceLevel: 0.95, calculationMethod: 'linear_extrapolation' },
      { regionId: amazon.regionId, year: 2030, forestCoverSqkm: 4300000, temperatureCelsius: 27.8, precipitationMm: 2100, confidenceLevel: 0.90, calculationMethod: 'linear_extrapolation' },
      { regionId: amazon.regionId, year: 2035, forestCoverSqkm: 4100000, temperatureCelsius: 28.1, precipitationMm: 2050, confidenceLevel: 0.85, calculationMethod: 'linear_extrapolation' },
      { regionId: amazon.regionId, year: 2040, forestCoverSqkm: 3900000, temperatureCelsius: 28.4, precipitationMm: 2000, confidenceLevel: 0.80, calculationMethod: 'linear_extrapolation' },
      { regionId: amazon.regionId, year: 2045, forestCoverSqkm: 3700000, temperatureCelsius: 28.7, precipitationMm: 1950, confidenceLevel: 0.75, calculationMethod: 'linear_extrapolation' },
      { regionId: amazon.regionId, year: 2050, forestCoverSqkm: 3500000, temperatureCelsius: 29.0, precipitationMm: 1900, confidenceLevel: 0.70, calculationMethod: 'linear_extrapolation' },
    ],
  });

  // Insert solutions — exact data from database_schema.sql
  const solutions = await Promise.all([
    prisma.solution.create({
      data: {
        name: 'Amazon Reforestation Initiative',
        type: 'afforestation',
        description: 'Comprehensive reforestation program for the Amazon Basin',
        implementationSteps: 'Step 1: Identify priority areas\nStep 2: Engage local communities\nStep 3: Plant native species\nStep 4: Monitor progress',
        expectedImpact: 'Recovery of up to 15% of lost forest cover by 2050',
      },
    }),
    prisma.solution.create({
      data: {
        name: 'Sustainable Urban Development Plan',
        type: 'urban_planning',
        description: 'Green infrastructure integration in expanding urban areas',
        implementationSteps: 'Step 1: Develop green belts\nStep 2: Implement permeable surfaces\nStep 3: Increase urban tree canopy\nStep 4: Create wildlife corridors',
        expectedImpact: 'Reduce urban heat island effect by 2-3°C and decrease stormwater runoff by up to 40%',
      },
    }),
    prisma.solution.create({
      data: {
        name: 'Himalayan Glacier Protection Program',
        type: 'glacier_protection',
        description: 'Conservation approaches for critical Himalayan glaciers',
        implementationSteps: 'Step 1: Identify critical glaciers\nStep 2: Implement pilot projects\nStep 3: Develop early warning systems\nStep 4: Create water storage alternatives',
        expectedImpact: 'Slow glacier retreat by 10-15% in targeted areas and reduce flood risks',
      },
    }),
  ]);

  // Insert region-solution mappings — exact data from database_schema.sql
  await prisma.regionSolution.createMany({
    data: [
      { regionId: amazon.regionId, solutionId: solutions[0].solutionId, priorityLevel: 'critical', estimatedCostUsd: 5000000000, estimatedImpactPercentage: 15.00 },
      { regionId: himalayas.regionId, solutionId: solutions[2].solutionId, priorityLevel: 'high', estimatedCostUsd: 2000000000, estimatedImpactPercentage: 12.50 },
    ],
  });

  // Insert data sources — exact data from database_schema.sql
  await prisma.dataSource.createMany({
    data: [
      { name: 'NASA Earth Observatory', url: 'https://earthobservatory.nasa.gov/', description: 'Satellite imagery and climate data from NASA', dataType: 'satellite' },
      { name: 'IPCC Data Distribution Centre', url: 'https://www.ipcc-data.org/', description: 'Climate data and projections from the IPCC', dataType: 'climate' },
      { name: 'USGS Earth Explorer', url: 'https://earthexplorer.usgs.gov/', description: 'Geological and land cover data from USGS', dataType: 'geological' },
      { name: 'Global Forest Watch', url: 'https://www.globalforestwatch.org/', description: 'Forest monitoring and alerts', dataType: 'satellite' },
    ],
  });

  console.log('Seeding complete!');
  console.log(`  - ${regions.length} regions`);
  console.log(`  - 5 historical data rows`);
  console.log(`  - 6 prediction data rows`);
  console.log(`  - ${solutions.length} solutions`);
  console.log(`  - 2 region-solution mappings`);
  console.log(`  - 4 data sources`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
