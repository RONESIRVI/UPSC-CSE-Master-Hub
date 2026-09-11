import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Parsing Excel Data...');

try {
  const excelPath = path.join(__dirname, '../Update_App_Data/upsc_toppers_data.xlsx');
  
  if (!fs.existsSync(excelPath)) {
    console.log('No upsc_toppers_data.xlsx found. Skipping parsing and using default data.');
    process.exit(0);
  }

  const fileData = fs.readFileSync(excelPath);
  const wb = XLSX.read(fileData, { type: 'buffer' });

  function parseTransposedSheet(sheet) {
    if (!sheet) return [];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    if (rows.length === 0) return [];
    
    const numCols = rows[0].length;
    const result = [];
    
    for (let col = 1; col < numCols; col++) {
      const obj = {};
      const extraData = {};
      const coreKeys = ['id', 'name', 'rank', 'year', 'optional', 'attempt', 'background', 'avatar', 'quote', 'keyStrategy', 'gs1', 'gs2', 'gs3', 'gs4', 'essayStrategy', 'optionalStrategy', 'prelimsStrategy', 'csatStrategy', 'interviewScore', 'mainsScore', 'goldenRules', 'title', 'authorOrPublication', 'subject', 'paper', 'priority', 'recommendedBy', 'keyChapters', 'tipsForReading', 'status', 'routineId', 'topperName', 'profileType', 'totalStudyHours', 'wakeUpTime', 'sleepTime', 'time', 'activity', 'category', 'description', 'tips', 'candidate', 'board', 'score', 'duration', 'dafHighlights', 'question', 'askedBy', 'answer', 'analysis', 'keyTakeaways'];
      
      for (let row = 0; row < rows.length; row++) {
        const key = rows[row][0];
        let val = rows[row][col];
        
        if (!key) continue;
        if (val === undefined) val = '';
        
        if (coreKeys.includes(key)) {
          obj[key] = val;
        } else {
          if (val !== '') {
            extraData[key] = val;
          }
        }
      }
      
      if (Object.keys(obj).length > 0 || Object.keys(extraData).length > 0) {
        obj.extraData = extraData;
        result.push(obj);
      }
    }
    return result;
  }
  
  // 1. Strategy & Blueprints (TopperProfiles)
  const strategySheet = wb.Sheets['TopperProfiles'];
  const strategyData = strategySheet ? parseTransposedSheet(strategySheet) : [];
  
  // 2. Strategy Setup (replaces Books)
  const strategySetupSheet = wb.Sheets['Strategy'];
  const strategySetupDataRaw = strategySetupSheet ? parseTransposedSheet(strategySetupSheet) : [];
  const strategySetupData = strategySetupDataRaw.map(s => ({
    id: s.id || `strategy-${Date.now()}-${Math.random()}`,
    title: s.title || 'Aditya\'s Plan',
    content: s.content || '',
    extraData: s.extraData
  }));

  // 3. Routines
  const routinesSheet = wb.Sheets['Routines'];
  const routinesDataRaw = routinesSheet ? parseTransposedSheet(routinesSheet) : [];
  
  // Convert flat routines to nested structure
  const routinesMap = new Map();
  routinesDataRaw.forEach((r) => {
    if (!routinesMap.has(r.routineId)) {
      routinesMap.set(r.routineId, {
        id: r.routineId || `routine-${Date.now()}`,
        title: `Routine for ${r.topperName || 'Working Professional'}`,
        type: r.profileType || 'Working Professional (5-6h)',
        topperRef: r.topperName || 'Various',
        totalStudyHours: parseInt(r.totalStudyHours) || 6,
        wakeUpTime: r.wakeUpTime || '06:00 AM',
        sleepTime: r.sleepTime || '11:00 PM',
        schedule: [],
        tips: typeof r.tips === 'string' ? r.tips.split('|').map(t => t.trim()) : []
      });
    }
    const routine = routinesMap.get(r.routineId);
    routine.schedule.push({
      time: r.time || '00:00',
      activity: r.activity || 'Study',
      category: r.category || 'GS',
      description: r.description || ''
    });
  });
  const routinesData = Array.from(routinesMap.values());

  // 4. Interviews
  const interviewsSheet = wb.Sheets['Interviews'];
  const interviewsDataRaw = interviewsSheet ? parseTransposedSheet(interviewsSheet) : [];
  
  const interviewsMap = new Map();
  interviewsDataRaw.forEach((row) => {
    const candidateName = row.candidate || 'Unknown';
    if (!interviewsMap.has(candidateName)) {
      interviewsMap.set(candidateName, {
        id: `interview-${candidateName.toLowerCase().replace(/\\s+/g, '-')}`,
        candidateName: candidateName,
        year: parseInt(row.year) || 2023,
        rank: parseInt(row.rank) || 1,
        boardChairperson: row.board || 'UPSC Board',
        score: parseInt(row.score) || 200,
        durationMinutes: parseInt(row.duration) || 30,
        background: row.background || '',
        dafHighlights: typeof row.dafHighlights === 'string' ? row.dafHighlights.split('|').map(s => s.trim()) : [],
        qaExcerpts: [],
        keyTakeaways: typeof row.keyTakeaways === 'string' ? row.keyTakeaways.split('|').map(s => s.trim()) : []
      });
    }
    const transcript = interviewsMap.get(candidateName);
    if (row.question || row.answer) {
      transcript.qaExcerpts.push({
        question: row.question || '',
        askedBy: row.askedBy || 'Member',
        answer: row.answer || '',
        analysis: row.analysis || ''
      });
    }
  });
  const interviewsData = Array.from(interviewsMap.values());

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
    goldenRules: typeof t.goldenRules === 'string' ? t.goldenRules.split('|').map(r => r.trim()) : [],
    extraData: t.extraData
  }));

  const finalData = {
    TOPPERS_PROFILES: formattedProfiles,
    STRATEGY_SETUP: strategySetupData,
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
