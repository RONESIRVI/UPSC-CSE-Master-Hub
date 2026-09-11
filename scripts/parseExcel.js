import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Parsing Excel Data...');

try {
  const excelPath = path.join(__dirname, '../upsc_toppers_data.xlsx');
  
  if (!fs.existsSync(excelPath)) {
    console.log('No upsc_toppers_data.xlsx found. Skipping parsing and using default data.');
    process.exit(0);
  }

  const fileData = fs.readFileSync(excelPath);
  const wb = XLSX.read(fileData, { type: 'buffer' });
  
  // 1. Strategy
  const strategySheet = wb.Sheets['Strategy'];
  const strategyData = strategySheet ? XLSX.utils.sheet_to_json(strategySheet) : [];
  
  // 2. Books
  const booksSheet = wb.Sheets['Books'];
  const booksData = booksSheet ? XLSX.utils.sheet_to_json(booksSheet) : [];
  
  // 3. Routines
  const routinesSheet = wb.Sheets['Routines'];
  const routinesDataRaw = routinesSheet ? XLSX.utils.sheet_to_json(routinesSheet) : [];
  
  // Convert flat routines to nested structure
  const routinesMap = new Map();
  routinesDataRaw.forEach((r) => {
    if (!routinesMap.has(r.routineId)) {
      routinesMap.set(r.routineId, {
        id: r.routineId,
        title: `Routine for ${r.topperName}`,
        type: r.profileType,
        topperRef: r.topperName,
        totalStudyHours: 0, // Simplified
        wakeUpTime: '06:00 AM',
        sleepTime: '11:00 PM',
        schedule: []
      });
    }
    const routine = routinesMap.get(r.routineId);
    routine.schedule.push({
      time: r.time,
      activity: r.activity,
      category: r.category,
      description: ''
    });
  });
  const routinesData = Array.from(routinesMap.values());

  // 4. Interviews
  const interviewsSheet = wb.Sheets['Interviews'];
  const interviewsDataRaw = interviewsSheet ? XLSX.utils.sheet_to_json(interviewsSheet) : [];
  const interviewsData = interviewsDataRaw;

  // Format Profiles
  const formattedProfiles = strategyData.map(t => ({
    id: t.id,
    name: t.name,
    rank: t.rank,
    year: t.year,
    optional: t.optional,
    attempt: t.attempt,
    background: t.background,
    avatar: t.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: t.quote,
    keyStrategy: t.keyStrategy,
    gsStrategy: {
      gs1: t.gs1 || '',
      gs2: t.gs2 || '',
      gs3: t.gs3 || '',
      gs4: t.gs4 || ''
    },
    essayStrategy: t.essayStrategy,
    optionalStrategy: t.optionalStrategy,
    prelimsStrategy: t.prelimsStrategy,
    csatStrategy: t.csatStrategy,
    interviewScore: t.interviewScore,
    mainsScore: t.mainsScore,
    goldenRules: typeof t.goldenRules === 'string' ? t.goldenRules.split('|').map(r => r.trim()) : []
  }));

  const finalData = {
    TOPPERS_PROFILES: formattedProfiles,
    TOPPER_BOOKS: booksData,
    TOPPER_ROUTINES: routinesData,
    INTERVIEW_TRANSCRIPTS: interviewsData
  };

  const outputPath = path.join(__dirname, '../src/data/generatedToppersData.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2));
  console.log('Successfully generated src/data/generatedToppersData.json from Excel!');

} catch (error) {
  console.error('Error parsing Excel:', error);
  process.exit(1);
}
