// Types for dashboard data
export interface PipelineStage {
  name: string;
  total: number;
  weighted: number;
  probability: number;
  duration: number;
  totalDeals: number;
  totalLeases: number;
}

export interface Dealer {
  name: string;
  totalGLA: number;
  dealsCount: number;
  avgDealSize: number;
  conversionRate: number;
  avgDealDuration: number;
}

export interface Brand {
  name: string;
  gla: number;
  stage: string;
  probability: number;
  daysToSign?: number;
}

export interface MonthlyDataPoint {
  month: string;
  target: number;
  actual: number | null;
  forecast: number | null;
  pipelineData: {
    [key: string]: {
      total: number;
      weighted: number;
    };
  };
  glaStarted: number;
  glaClosed: number;
  conversionRate: number;
  avgDealDuration: number;
  avgDealSize: number;
  expiredGLA?: number;
  updatedTarget?: number;
  terminations?: number;
  signedDeals?: number;
}

// Pipeline stages configuration
export const PIPELINE_STAGES: PipelineStage[] = [
  { name: 'Planned', total: 14000, weighted: 700, probability: 0.05, duration: 9, totalDeals: 23, totalLeases: 28 },
  { name: 'Discussion initiated', total: 13000, weighted: 650, probability: 0.05, duration: 7, totalDeals: 21, totalLeases: 25 },
  { name: 'Location agreed', total: 12000, weighted: 2400, probability: 0.20, duration: 11, totalDeals: 19, totalLeases: 23 },
  { name: 'Terms Agreed', total: 11000, weighted: 2000, probability: 0.00, duration: 7, totalDeals: 17, totalLeases: 20 },
  { name: 'Proposal issued', total: 9000, weighted: 2250, probability: 0.25, duration: 9, totalDeals: 16, totalLeases: 19 },
  { name: 'Proposal signed', total: 8000, weighted: 4000, probability: 0.50, duration: 13, totalDeals: 15, totalLeases: 18 },
  { name: 'AMC initiated', total: 7000, weighted: 3500, probability: 0.50, duration: 9, totalDeals: 13, totalLeases: 16 },
  { name: 'AMC approved', total: 6000, weighted: 4800, probability: 0.80, duration: 13, totalDeals: 11, totalLeases: 14 },
  { name: 'Contract issued', total: 5000, weighted: 4000, probability: 0.80, duration: 7, totalDeals: 9, totalLeases: 12 },
  { name: 'Contract signed', total: 3000, weighted: 3000, probability: 1.00, duration: 9, totalDeals: 7, totalLeases: 10 },
  { name: 'Ejar issued', total: 2000, weighted: 2000, probability: 1.00, duration: 5, totalDeals: 5, totalLeases: 7 },
  { name: 'Ejar signed', total: 1500, weighted: 1500, probability: 1.00, duration: 5, totalDeals: 4, totalLeases: 6 },
];

export const PIPELINE_STAGE_PROBABILITIES = [
  { name: 'Planned', high: 0.05, medium: 0.00, low: 0.00 },
  { name: 'Discussion initiated', high: 0.05, medium: 0.00, low: 0.00 },
  { name: 'Location agreed', high: 0.20, medium: 0.10, low: 0.05 },
  { name: 'Terms Agreed', high: 0.00, medium: 0.00, low: 0.00 },
  { name: 'Proposal issued', high: 0.25, medium: 0.15, low: 0.10 },
  { name: 'Proposal signed', high: 0.50, medium: 0.35, low: 0.20 },
  { name: 'AMC initiated', high: 0.50, medium: 0.35, low: 0.20 },
  { name: 'AMC approved', high: 0.80, medium: 0.65, low: 0.50 },
  { name: 'Contract issued', high: 0.80, medium: 0.65, low: 0.50 },
  { name: 'Contract signed', high: 1.00, medium: 0.95, low: 0.90 },
  { name: 'Ejar issued', high: 1.00, medium: 0.95, low: 0.90 },
  { name: 'Ejar signed', high: 1.00, medium: 1.00, low: 1.00 },
];

export const PIPELINE_STAGE_CONFIDENCE_LEVELS = [
  { stage: 'Planned', confidence: 'high', percentage: 0.05 },
  { stage: 'Planned', confidence: 'medium', percentage: 0.00 },
  { stage: 'Planned', confidence: 'low', percentage: 0.00 },
  { stage: 'Discussion initiated', confidence: 'high', percentage: 0.05 },
  { stage: 'Discussion initiated', confidence: 'medium', percentage: 0.00 },
  { stage: 'Discussion initiated', confidence: 'low', percentage: 0.00 },
  { stage: 'Location agreed', confidence: 'high', percentage: 0.20 },
  { stage: 'Location agreed', confidence: 'medium', percentage: 0.10 },
  { stage: 'Location agreed', confidence: 'low', percentage: 0.05 },
  { stage: 'Terms Agreed', confidence: 'high', percentage: 0.00 },
  { stage: 'Terms Agreed', confidence: 'medium', percentage: 0.00 },
  { stage: 'Terms Agreed', confidence: 'low', percentage: 0.00 },
  { stage: 'Proposal issued', confidence: 'high', percentage: 0.25 },
  { stage: 'Proposal issued', confidence: 'medium', percentage: 0.15 },
  { stage: 'Proposal issued', confidence: 'low', percentage: 0.10 },
  { stage: 'Proposal signed', confidence: 'high', percentage: 0.50 },
  { stage: 'Proposal signed', confidence: 'medium', percentage: 0.35 },
  { stage: 'Proposal signed', confidence: 'low', percentage: 0.20 },
  { stage: 'AMC initiated', confidence: 'high', percentage: 0.50 },
  { stage: 'AMC initiated', confidence: 'medium', percentage: 0.35 },
  { stage: 'AMC initiated', confidence: 'low', percentage: 0.20 },
  { stage: 'AMC approved', confidence: 'high', percentage: 0.80 },
  { stage: 'AMC approved', confidence: 'medium', percentage: 0.65 },
  { stage: 'AMC approved', confidence: 'low', percentage: 0.50 },
  { stage: 'Contract issued', confidence: 'high', percentage: 0.80 },
  { stage: 'Contract issued', confidence: 'medium', percentage: 0.65 },
  { stage: 'Contract issued', confidence: 'low', percentage: 0.50 },
  { stage: 'Contract signed', confidence: 'high', percentage: 1.00 },
  { stage: 'Contract signed', confidence: 'medium', percentage: 0.95 },
  { stage: 'Contract signed', confidence: 'low', percentage: 0.90 },
  { stage: 'Ejar issued', confidence: 'high', percentage: 1.00 },
  { stage: 'Ejar issued', confidence: 'medium', percentage: 0.95 },
  { stage: 'Ejar issued', confidence: 'low', percentage: 0.90 },
  { stage: 'Ejar signed', confidence: 'high', percentage: 1.00 },
  { stage: 'Ejar signed', confidence: 'medium', percentage: 1.00 },
  { stage: 'Ejar signed', confidence: 'low', percentage: 1.00 },
];

// Helper functions
export const formatGLA = (value: number | null | undefined) => {
  if (value === null || value === undefined || isNaN(value)) return '-';
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value.toString();
};

// Constants
export const TOTAL_GLA_TARGET = 92000; // 92,000 sqm
export const CURRENT_GLA_LEASED = 45000; // 45,000 sqm
export const GLA_IN_PIPELINE = 35000; // 35,000 sqm
export const GLA_REMAINING = TOTAL_GLA_TARGET - CURRENT_GLA_LEASED - GLA_IN_PIPELINE;

// Calculate projected GLA (current + stepwise forecast based on expected lease signings)
const calculateProjectedGLA = () => {
  // Start from current leased GLA
  let projectedGLA = CURRENT_GLA_LEASED;
  
  // Add stepwise increases based on expected lease signings
  // This is a simplified example - in real implementation, this would be based on actual pipeline data
  // For demonstration, we'll add expected signings in specific months
  
  // Expected lease signings by month (example data)
  const expectedSignings = {
    'Jul': 2000,  // 2,000 sqm expected in July
    'Sep': 3000,  // 3,000 sqm expected in September  
    'Nov': 2500,  // 2,500 sqm expected in November
    'Dec': 1800   // 1,800 sqm expected in December
  };
  
  // Calculate total expected signings
  const totalExpectedSignings = Object.values(expectedSignings).reduce((sum, value) => sum + value, 0);
  
  return projectedGLA + totalExpectedSignings;
};

export const PROJECTED_GLA = calculateProjectedGLA();

// Top performing dealers
export const TOP_DEALERS: Dealer[] = [
  { 
    name: 'Sarah Johnson',
    totalGLA: 12500,
    dealsCount: 15,
    avgDealSize: 833,
    conversionRate: 0.75,
    avgDealDuration: 45
  },
  { 
    name: 'Michael Chen',
    totalGLA: 11800,
    dealsCount: 12,
    avgDealSize: 983,
    conversionRate: 0.80,
    avgDealDuration: 40
  },
  { 
    name: 'Emma Davis',
    totalGLA: 10500,
    dealsCount: 14,
    avgDealSize: 750,
    conversionRate: 0.70,
    avgDealDuration: 50
  },
  { 
    name: 'Lisa Anderson',
    totalGLA: 9200,
    dealsCount: 10,
    avgDealSize: 920,
    conversionRate: 0.72,
    avgDealDuration: 48
  }
];

// Bottom performing dealers
export const BOTTOM_DEALERS: Dealer[] = [
  { 
    name: 'Robert Brown',
    totalGLA: 3200,
    dealsCount: 5,
    avgDealSize: 640,
    conversionRate: 0.35,
    avgDealDuration: 75
  },
  { 
    name: 'Amanda White',
    totalGLA: 3800,
    dealsCount: 6,
    avgDealSize: 633,
    conversionRate: 0.40,
    avgDealDuration: 70
  },
  { 
    name: 'David Lee',
    totalGLA: 4200,
    dealsCount: 7,
    avgDealSize: 600,
    conversionRate: 0.45,
    avgDealDuration: 65
  }
];

// Top brands in pipeline
export const TOP_BRANDS: Brand[] = [
  { name: 'Zara', gla: 2500, stage: 'Final Approval', probability: 0.95 },
  { name: 'H&M', gla: 2000, stage: 'Legal/Contract', probability: 0.80 },
  { name: 'Nike', gla: 1500, stage: 'Negotiation', probability: 0.60 },
  { name: 'Uniqlo', gla: 1800, stage: 'Proposal Sent', probability: 0.40 },
  { name: 'Adidas', gla: 1200, stage: 'Initial Contact', probability: 0.20 }
];

// Top signed groups
export const TOP_SIGNED_GROUPS: Brand[] = [
  { name: 'Zara', gla: 1200, stage: 'Contract signed', probability: 1.00, daysToSign: 32 },
  { name: 'H&M', gla: 1000, stage: 'Contract signed', probability: 1.00, daysToSign: 45 },
  { name: 'Nike', gla: 900, stage: 'Ejar signed', probability: 1.00, daysToSign: 28 },
  { name: 'Uniqlo', gla: 800, stage: 'Ejar signed', probability: 1.00, daysToSign: 60 },
  { name: 'Adidas', gla: 700, stage: 'Ejar signed', probability: 1.00, daysToSign: 38 },
  { name: 'Puma', gla: 650, stage: 'Contract signed', probability: 1.00, daysToSign: 41 },
  { name: 'Under Armour', gla: 600, stage: 'Contract signed', probability: 1.00, daysToSign: 36 },
  { name: 'Reebok', gla: 550, stage: 'Ejar signed', probability: 1.00, daysToSign: 52 },
  { name: 'New Balance', gla: 500, stage: 'Ejar signed', probability: 1.00, daysToSign: 47 },
  { name: 'Skechers', gla: 450, stage: 'Contract signed', probability: 1.00, daysToSign: 29 }
];

// New data structure for individual deals
export interface Deal {
  id: string;
  name: string;
  gla: number;
  stage: string;
  expectedSigningMonth: string;
}

// Mock data for deals in the pipeline
export const DEALS_DATA: Deal[] = [
  { id: 'deal-a', name: 'Deal A', gla: 668, stage: 'Location agreed', expectedSigningMonth: 'Jul' }, // 20% prob -> 134 weighted
  { id: 'deal-b', name: 'Deal B', gla: 6680, stage: 'Contract signed', expectedSigningMonth: 'Sep' }, // 100% prob -> 6680 weighted
  { id: 'deal-c', name: 'Deal C', gla: 3340, stage: 'AMC approved', expectedSigningMonth: 'Sep' },      // 80% prob -> 2672 weighted
  { id: 'deal-e', name: 'Deal E', gla: 2004, stage: 'Ejar signed', expectedSigningMonth: 'Dec' },       // 100% prob -> 2004 weighted
  { id: 'deal-f', name: 'Deal F', gla: 1002, stage: 'Location agreed', expectedSigningMonth: 'Dec' },    // 20% prob -> 200 weighted
  { id: 'deal-g', name: 'Deal G', gla: 6680, stage: 'Contract signed', expectedSigningMonth: 'Jul' },   // 100% prob -> 6680 weighted
  { id: 'deal-h', name: 'Deal H', gla: 8020, stage: 'Ejar signed', expectedSigningMonth: 'Sep' },       // 100% prob -> 8020 weighted
  { id: 'deal-i', name: 'Deal I', gla: 5344, stage: 'AMC approved', expectedSigningMonth: 'Nov' },       // 80% prob -> 4275 weighted
  { id: 'deal-j', name: 'Deal J', gla: 6000, stage: 'Contract signed', expectedSigningMonth: 'Nov' },    // 100% prob -> 6000 weighted
  { id: 'deal-k', name: 'Deal K', gla: 668, stage: 'Ejar signed', expectedSigningMonth: 'Dec' },        // 100% prob -> 668 weighted
  { id: 'deal-l', name: 'Deal L', gla: 4676, stage: 'Contract signed', expectedSigningMonth: 'Aug' },    // 100% prob -> 4676 weighted
  { id: 'deal-m', name: 'Deal M', gla: 4008, stage: 'Ejar signed', expectedSigningMonth: 'Oct' },        // 100% prob -> 4008 weighted
  { id: 'deal-n', name: 'Deal N', gla: 3340, stage: 'AMC approved', expectedSigningMonth: 'Aug' },       // 80% prob -> 2672 weighted
  { id: 'deal-o', name: 'Deal O', gla: 2672, stage: 'Contract signed', expectedSigningMonth: 'Oct' },    // 100% prob -> 2672 weighted
];

// Helper to generate stepwise forecast data
const generateStepwiseForecast = (monthlyData: Omit<MonthlyDataPoint, 'forecast'>[]): (number | null)[] => {
  const stageProbabilities = new Map(PIPELINE_STAGES.map(s => [s.name, s.probability]));

  const monthlyAdditions: Record<string, number> = {};
  DEALS_DATA.forEach(deal => {
    const probability = stageProbabilities.get(deal.stage) ?? 0;
    const weightedGla = deal.gla * probability;
    const month = deal.expectedSigningMonth;
    if (!monthlyAdditions[month]) {
      monthlyAdditions[month] = 0;
    }
    monthlyAdditions[month] += weightedGla;
  });

  let lastActualValue = CURRENT_GLA_LEASED;
  let lastActualIndex = -1;

  for (let i = monthlyData.length - 1; i >= 0; i--) {
    if (monthlyData[i].actual !== null) {
      lastActualValue = monthlyData[i].actual as number;
      lastActualIndex = i;
      break;
    }
  }

  const forecasts: (number | null)[] = Array(monthlyData.length).fill(null);
  let cumulativeForecast = lastActualValue;

  for (let i = 0; i < monthlyData.length; i++) {
    if (i >= lastActualIndex) {
      if (i > lastActualIndex) {
        const monthName = monthlyData[i].month;
        const addition = monthlyAdditions[monthName] ?? 0;
        cumulativeForecast += addition;
      }
      forecasts[i] = cumulativeForecast;
    }
  }

  return forecasts;
};

// Move this to the top of the file, before any code that uses it
const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// Generate signedDeals and terminations arrays first
const signedDealsArr = months.map((_m: string, _i: number) => 5 + Math.floor(Math.random() * 16));
const terminationsArr = months.map((_m: string, _i: number) => Math.floor(Math.random() * 6));
// For demonstration, ensure August (index 7) has more terminations than signed deals
if (terminationsArr[7] <= signedDealsArr[7]) {
  terminationsArr[7] = signedDealsArr[7] + 2;
}
// Target: starts at 91%, ends at 92%, dip in the middle
const targetCurve = months.map((_m: string, i: number) => {
  const t = i / (months.length - 1);
  const base = 0.91 + t * (0.92 - 0.91);
  const dip = 1 - 4 * Math.pow(t - 0.5, 2);
  const gap = 0.015 + Math.random() * 0.02;
  return base - dip * gap;
});
// Actual: starts at 91%, ends at 92%, but now follows signedDeals/terminations logic for Jan-Jul
const actualCurve: (number|null)[] = [];
for (let i = 0; i < months.length; i++) {
  if (i === 0) {
    actualCurve.push(0.90 * TOTAL_GLA_TARGET); // Jan: 90% (90k sqm)
  } else if (i <= 6) { // Jan-Jul
    // Make actual close to target with small random deviation
    const deviation = (Math.random() - 0.5) * 0.02 * TOTAL_GLA_TARGET; // ±1%
    actualCurve.push(targetCurve[i] * TOTAL_GLA_TARGET + deviation);
  } else {
    actualCurve.push(null);
  }
}
// Forecast: starts at 91%, ends at 92%, dip in the middle, only Aug-Dec
const forecastCurve = months.map((_m: string, i: number) => {
  const t = i / (months.length - 1);
  const base = 0.91 + t * (0.92 - 0.91);
  const dip = 1 - 4 * Math.pow(t - 0.5, 2);
  const gap = 0.02 + Math.random() * 0.025;
  return i >= 7 ? base - dip * gap : null;
});
const initialMonthlyData: Omit<MonthlyDataPoint, 'forecast'>[] = months.map((month: string, i: number) => ({
  month,
  target: Math.round(targetCurve[i] * TOTAL_GLA_TARGET),
  actual: i === 0 ? Math.round(0.90 * TOTAL_GLA_TARGET) : (actualCurve[i] !== null ? Math.round(actualCurve[i] as number) : null),
  pipelineData: {},
  glaStarted: 0,
  glaClosed: 0,
  conversionRate: 0,
  avgDealDuration: 0,
  avgDealSize: 0,
  terminations: terminationsArr[i],
  signedDeals: signedDealsArr[i],
}));
// Forecast values: use forecastCurve
const forecastValuesWithAugStart = forecastCurve.map((val, idx) => val !== null ? Math.round(val * TOTAL_GLA_TARGET) : null);
export const MONTHLY_DATA: MonthlyDataPoint[] = initialMonthlyData.map((data, index) => {
  // Inverted bell shape for target:
  // Jan = 91% (91k), June = 84% (84k, lowest), Dec = 92% (92k)
  let target = data.target;
  let actual = data.actual;
  if (index === 0) {
    target = Math.round(0.91 * TOTAL_GLA_TARGET); // Jan
    actual = Math.round(0.90 * TOTAL_GLA_TARGET); // Force Jan actual to 90k
  } else if (index === 5) {
    target = Math.round(0.84 * TOTAL_GLA_TARGET); // June (lowest)
  } else if (index === 11) {
    target = TOTAL_GLA_TARGET; // Dec (92k)
  } else if (index < 5) {
    // Jan to June: interpolate from 91% to 84%
    const t = index / 5;
    target = Math.round((0.91 * (1 - t) + 0.84 * t) * TOTAL_GLA_TARGET);
    if (target < Math.round(0.84 * TOTAL_GLA_TARGET)) target = Math.round(0.84 * TOTAL_GLA_TARGET);
  } else if (index > 5 && index < 11) {
    // June to Dec: interpolate from 84% to 92%
    const t = (index - 5) / 6;
    target = Math.round((0.84 * (1 - t) + 0.92 * t) * TOTAL_GLA_TARGET);
    if (target < Math.round(0.84 * TOTAL_GLA_TARGET)) target = Math.round(0.84 * TOTAL_GLA_TARGET);
  }
  return {
  ...data,
    target,
    actual,
    forecast: index === 11 ? TOTAL_GLA_TARGET : forecastValuesWithAugStart[index],
  };
});
// Force January actual to 90,000 after all mapping
if (MONTHLY_DATA && MONTHLY_DATA[0]) {
  MONTHLY_DATA[0].actual = 90000; MONTHLY_DATA[0].target = 90000; // Jan 90%
  MONTHLY_DATA[1].actual = 89000; MONTHLY_DATA[1].target = 89000; // Feb 89%
  MONTHLY_DATA[2].actual = 87000; MONTHLY_DATA[2].target = 87000; // Mar 87%
  MONTHLY_DATA[3].actual = 86000; MONTHLY_DATA[3].target = 86000; // Apr 86%
  MONTHLY_DATA[4].actual = 85000; MONTHLY_DATA[4].target = 85000; // May 85%
  MONTHLY_DATA[5].actual = 84000; MONTHLY_DATA[5].target = 84000; // Jun 84%
}

// Set explicit values for Feb-May
MONTHLY_DATA[1].actual = 81880; MONTHLY_DATA[1].target = 81880; // Feb 89%
MONTHLY_DATA[2].actual = 80040; MONTHLY_DATA[2].target = 80040; // Mar 87%
MONTHLY_DATA[3].actual = 79040; MONTHLY_DATA[3].target = 79040; // Apr 86%
MONTHLY_DATA[4].actual = 78200; MONTHLY_DATA[4].target = 78200; // May 85%

export const LEASE_EXPIRY_DATA = [
  { name: 'Within 1 Year', value: 15000, color: '#4B2D84' },
  { name: '1-2 Years', value: 20000, color: '#6B4D9C' },
  { name: '2-3 Years', value: 18000, color: '#8C6EBA' },
  { name: '3-4 Years', value: 12000, color: '#AE8FC8' },
  { name: '4-5 Years', value: 10000, color: '#D0B0D5' },
  { name: 'Over 5 Years', value: 30000, color: '#E0E7FF' },
];

export const TOP_BRANDS_PIPELINE = [
  { name: 'Zara', gla: 2500, stage: 'Final Approval', probability: 0.95 },
  { name: 'H&M', gla: 2000, stage: 'Legal/Contract', probability: 0.80 },
  { name: 'Nike', gla: 1500, stage: 'Negotiation', probability: 0.60 },
  { name: 'Uniqlo', gla: 1800, stage: 'Proposal Sent', probability: 0.40 },
  { name: 'Adidas', gla: 1200, stage: 'Initial Contact', probability: 0.20 }
];

// Helper function to get current month's data
export const getCurrentMonthData = (): MonthlyDataPoint => {
  // In a real app, this would determine the current month
  // For now, returning March data (index 2)
  return MONTHLY_DATA[2];
};

// Helper function to get pipeline metrics
export const getPipelineMetrics = () => {
  return {
    totalGLA: TOTAL_GLA_TARGET,
    leased: CURRENT_GLA_LEASED,
    inPipeline: GLA_IN_PIPELINE,
    remaining: GLA_REMAINING
  };
};

// Derived data
export const CURRENT_MONTH_PIPELINE = getCurrentMonthData().pipelineData

// Types
export interface MonthlyDataPoint {
  month: string
  target: number
  actual: number | null
  forecast: number | null
  pipelineData: {
    [key: string]: {
      total: number
      weighted: number
    }
  }
  glaStarted: number
  glaClosed: number
  conversionRate: number
  avgDealDuration: number
  avgDealSize: number
  terminations?: number
  signedDeals?: number
}

// For Performance Metrics page (different numbers)
export const PIPELINE_STAGES_PERFORMANCE: PipelineStage[] = [
  { name: 'Planned', total: 14000, weighted: 700, probability: 0.05, duration: 8, totalDeals: 22, totalLeases: 27 },
  { name: 'Discussion initiated', total: 13000, weighted: 650, probability: 0.05, duration: 8, totalDeals: 20, totalLeases: 24 },
  { name: 'Location agreed', total: 12000, weighted: 2400, probability: 0.20, duration: 10, totalDeals: 18, totalLeases: 22 },
  { name: 'Terms Agreed', total: 11000, weighted: 2000, probability: 0.00, duration: 6, totalDeals: 16, totalLeases: 19 },
  { name: 'Proposal issued', total: 9000, weighted: 2250, probability: 0.25, duration: 10, totalDeals: 15, totalLeases: 18 },
  { name: 'Proposal signed', total: 8000, weighted: 4000, probability: 0.50, duration: 12, totalDeals: 14, totalLeases: 17 },
  { name: 'AMC initiated', total: 7000, weighted: 3500, probability: 0.50, duration: 10, totalDeals: 12, totalLeases: 15 },
  { name: 'AMC approved', total: 6000, weighted: 4800, probability: 0.80, duration: 12, totalDeals: 10, totalLeases: 13 },
  { name: 'Contract issued', total: 5000, weighted: 4000, probability: 0.80, duration: 8, totalDeals: 8, totalLeases: 11 },
  { name: 'Contract signed', total: 3000, weighted: 3000, probability: 1.00, duration: 8, totalDeals: 6, totalLeases: 9 },
  { name: 'Ejar issued', total: 2000, weighted: 2000, probability: 1.00, duration: 4, totalDeals: 4, totalLeases: 6 },
  { name: 'Ejar signed', total: 1500, weighted: 1500, probability: 1.00, duration: 4, totalDeals: 3, totalLeases: 5 },
]; 

// Overwrite MONTHLY_DATA for GLA Progress Chart to match 1:1 percent to sqm (e.g., 84% = 84,000 sqm)
const targetPercents = [90, 88, 87, 85, 84, 83, 85, 87, 88, 89, 90, 92];
const actualPercents = [90, 89, 88, 86, 85, 84, null, null, null, null, null, null];
const forecastPercents = [null, null, null, null, null, null, 85, 87, 88, 89, 90, 92];

if (MONTHLY_DATA) {
  for (let i = 0; i < 12; i++) {
    if (MONTHLY_DATA[i]) {
      MONTHLY_DATA[i].target = targetPercents[i] * 1000;
      MONTHLY_DATA[i].actual = (typeof actualPercents[i] === 'number') ? actualPercents[i] * 1000 : null;
      MONTHLY_DATA[i].forecast = (typeof forecastPercents[i] === 'number') ? forecastPercents[i] * 1000 : null;
    }
  }
} 