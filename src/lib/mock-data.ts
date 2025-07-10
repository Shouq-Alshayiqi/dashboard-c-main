import { addMonths, format } from 'date-fns'

export const TOTAL_GLA_TARGET = 92000 // 92,000 sqm
export const CURRENT_GLA_LEASED = 45000 // 45,000 sqm
export const GLA_IN_PIPELINE = 35000 // 35,000 sqm

export const pipelineStages = [
  { name: 'Initial Contact', value: 15000, probability: 0.2 },
  { name: 'Proposal Sent', value: 8000, probability: 0.4 },
  { name: 'Negotiation', value: 6000, probability: 0.6 },
  { name: 'Legal/Contract', value: 4000, probability: 0.8 },
  { name: 'Final Approval', value: 2000, probability: 0.9 },
]

export const generateMonthlyData = (currentDate = new Date(2024, 2, 15)) => {
  const startDate = new Date(2024, 0, 1) // January 1, 2024
  const monthlyData = []
  const monthlyIncrease = 8000 // Fixed monthly increase
  let cumulativeActual = 0

  for (let i = 0; i < 12; i++) {
    const date = addMonths(startDate, i)
    const targetValue = (TOTAL_GLA_TARGET / 12) * (i + 1)
    
    if (i < currentDate.getMonth() + 1) {
      // Past months: actual data with fixed increase
      cumulativeActual += monthlyIncrease
      monthlyData.push({
        month: format(date, 'MMM'),
        target: Math.round(targetValue),
        actual: Math.round(cumulativeActual),
        forecast: null,
      })
    } else {
      // Future months: forecast data with fixed increase
      const forecast = cumulativeActual + (monthlyIncrease * (i + 1 - currentDate.getMonth()))
      monthlyData.push({
        month: format(date, 'MMM'),
        target: Math.round(targetValue),
        actual: null,
        forecast: Math.round(forecast),
      })
    }
  }

  return monthlyData
}

export const monthlyConversionData = [
  { month: 'Jan', "Deals Started": 12000, "Deals Closed": 8000, "Deals Dropped": 3000, "Net GLA": 5000 },
  { month: 'Feb', "Deals Started": 15000, "Deals Closed": 10000, "Deals Dropped": 4000, "Net GLA": 6000 },
  { month: 'Mar', "Deals Started": 18000, "Deals Closed": 12000, "Deals Dropped": 5000, "Net GLA": 7000 },
  { month: 'Apr', "Deals Started": 14000, "Deals Closed": 9000, "Deals Dropped": 4000, "Net GLA": 5000 },
  { month: 'May', "Deals Started": 16000, "Deals Closed": 11000, "Deals Dropped": 4000, "Net GLA": 7000 },
  { month: 'Jun', "Deals Started": 20000, "Deals Closed": 13000, "Deals Dropped": 6000, "Net GLA": 7000 },
]

export const leaseExpiryData = [
  { month: 'Jan', expiredGLA: 5000, updatedTarget: 105000 },
  { month: 'Feb', expiredGLA: 7500, updatedTarget: 112500 },
  { month: 'Mar', expiredGLA: 3000, updatedTarget: 115500 },
  { month: 'Apr', expiredGLA: 8000, updatedTarget: 123500 },
  { month: 'May', expiredGLA: 4500, updatedTarget: 128000 },
  { month: 'Jun', expiredGLA: 6000, updatedTarget: 134000 },
]

export const topBrandsInPipeline = [
  { name: 'Zara', gla: 2500, stage: 'Final Approval', probability: 0.95 },
  { name: 'H&M', gla: 2000, stage: 'Legal/Contract', probability: 0.80 },
  { name: 'Nike', gla: 1500, stage: 'Negotiation', probability: 0.60 },
  { name: 'Uniqlo', gla: 1800, stage: 'Proposal Sent', probability: 0.40 },
  { name: 'Adidas', gla: 1200, stage: 'Initial Contact', probability: 0.20 },
  { name: 'Puma', gla: 1100, stage: 'Negotiation', probability: 0.55 },
  { name: 'Gap', gla: 1050, stage: 'Proposal Sent', probability: 0.35 },
  { name: "Levi's", gla: 950, stage: 'Legal/Contract', probability: 0.50 },
  { name: 'Bershka', gla: 900, stage: 'Initial Contact', probability: 0.25 },
  { name: 'Pull&Bear', gla: 850, stage: 'Final Approval', probability: 0.30 }
]

export const dealerPerformanceData = [
  { name: 'Sarah Johnson', totalGLA: 13200, dealsCount: 16, avgDealSize: 825, conversionRate: 0.78, avgDealDuration: 39, month: 'Jan', team: 'Central' },
  { name: 'Michael Chen', totalGLA: 11000, dealsCount: 13, avgDealSize: 846, conversionRate: 0.76, avgDealDuration: 42, month: 'Feb', team: 'Western' },
  { name: 'Emma Davis', totalGLA: 9900, dealsCount: 12, avgDealSize: 825, conversionRate: 0.68, avgDealDuration: 48, month: 'Mar', team: 'Eastern' },
  { name: 'Lisa Anderson', totalGLA: 9500, dealsCount: 11, avgDealSize: 864, conversionRate: 0.74, avgDealDuration: 54, month: 'May', team: 'Central' },
  { name: 'James Wilson', totalGLA: 8700, dealsCount: 10, avgDealSize: 870, conversionRate: 0.62, avgDealDuration: 53, month: 'Apr', team: 'Entertainment' },
  { name: 'Olivia Martin', totalGLA: 8700, dealsCount: 10, avgDealSize: 870, conversionRate: 0.65, avgDealDuration: 51, month: 'Jun', team: 'Central' },
  { name: 'Noah Carter', totalGLA: 7800, dealsCount: 9, avgDealSize: 867, conversionRate: 0.60, avgDealDuration: 49, month: 'Jul', team: 'Western' },
  { name: 'Sophia Turner', totalGLA: 7200, dealsCount: 8, avgDealSize: 900, conversionRate: 0.58, avgDealDuration: 55, month: 'Aug', team: 'Eastern' },
]

export const dealerBottomPerformers = [
  { name: 'David Lee', totalGLA: 4600, dealsCount: 8, avgDealSize: 575, conversionRate: 0.48, avgDealDuration: 62, month: 'Apr', team: 'Entertainment' },
  { name: 'Robert Brown', totalGLA: 3500, dealsCount: 6, avgDealSize: 583, conversionRate: 0.38, avgDealDuration: 72, month: 'Feb', team: 'Western' },
  { name: 'Amanda White', totalGLA: 4100, dealsCount: 7, avgDealSize: 586, conversionRate: 0.42, avgDealDuration: 68, month: 'Mar', team: 'Eastern' },
  { name: 'Ethan Scott', totalGLA: 3900, dealsCount: 6, avgDealSize: 650, conversionRate: 0.40, avgDealDuration: 75, month: 'May', team: 'Central' },
  { name: 'Mia Clark', totalGLA: 3700, dealsCount: 5, avgDealSize: 740, conversionRate: 0.36, avgDealDuration: 80, month: 'Jun', team: 'Western' },
]

export const dealerMetricsByMonth = [
  { month: 'Jan', "Avg Deal Duration": 55, "Conversion Rate": 0.65, "Avg Deal Size": 750 },
  { month: 'Feb', "Avg Deal Duration": 52, "Conversion Rate": 0.68, "Avg Deal Size": 780 },
  { month: 'Mar', "Avg Deal Duration": 48, "Conversion Rate": 0.70, "Avg Deal Size": 800 },
  { month: 'Apr', "Avg Deal Duration": 45, "Conversion Rate": 0.72, "Avg Deal Size": 820 },
  { month: 'May', "Avg Deal Duration": 42, "Conversion Rate": 0.75, "Avg Deal Size": 850 },
  { month: 'Jun', "Avg Deal Duration": 40, "Conversion Rate": 0.78, "Avg Deal Size": 880 }
]

export interface DealStage {
  name: string;
  duration: number;
  totalDeals: number;
}

export const dealStagesData: DealStage[] = [
  { name: 'Initial Contact', duration: 15, totalDeals: 25 },
  { name: 'Proposal Sent', duration: 21, totalDeals: 18 },
  { name: 'Negotiation', duration: 30, totalDeals: 12 },
  { name: 'Legal/Contract', duration: 25, totalDeals: 8 },
  { name: 'Final Approval', duration: 14, totalDeals: 5 }
]

export const dealerPipelineTableData = [
  { name: 'Michael Chen', totalGLA: 12500, dealsCount: 15, avgDealSize: 950, conversionRate: 0.81, avgDealDuration: 38, month: 'Feb', team: 'Western' },
  { name: 'James Wilson', totalGLA: 12000, dealsCount: 14, avgDealSize: 930, conversionRate: 0.78, avgDealDuration: 40, month: 'Apr', team: 'Entertainment' },
  { name: 'Sarah Johnson', totalGLA: 11500, dealsCount: 13, avgDealSize: 885, conversionRate: 0.75, avgDealDuration: 50, month: 'Jan', team: 'Central' },
  { name: 'Emma Davis', totalGLA: 11000, dealsCount: 12, avgDealSize: 860, conversionRate: 0.72, avgDealDuration: 45, month: 'Mar', team: 'Eastern' },
  { name: 'Lisa Anderson', totalGLA: 10500, dealsCount: 11, avgDealSize: 850, conversionRate: 0.70, avgDealDuration: 47, month: 'May', team: 'Central' },
  { name: 'Olivia Martin', totalGLA: 9000, dealsCount: 10, avgDealSize: 900, conversionRate: 0.68, avgDealDuration: 48, month: 'Jun', team: 'Central' },
  { name: 'Noah Carter', totalGLA: 8500, dealsCount: 9, avgDealSize: 944, conversionRate: 0.62, avgDealDuration: 52, month: 'Jul', team: 'Western' },
  { name: 'Sophia Turner', totalGLA: 8000, dealsCount: 8, avgDealSize: 1000, conversionRate: 0.60, avgDealDuration: 57, month: 'Aug', team: 'Eastern' },
  { name: 'David Lee', totalGLA: 5000, dealsCount: 8, avgDealSize: 625, conversionRate: 0.55, avgDealDuration: 60, month: 'Apr', team: 'Entertainment' },
  { name: 'Amanda White', totalGLA: 4500, dealsCount: 7, avgDealSize: 643, conversionRate: 0.50, avgDealDuration: 65, month: 'Mar', team: 'Eastern' },
  { name: 'Robert Brown', totalGLA: 4000, dealsCount: 6, avgDealSize: 667, conversionRate: 0.45, avgDealDuration: 70, month: 'Feb', team: 'Western' },
  { name: 'Ethan Scott', totalGLA: 3900, dealsCount: 6, avgDealSize: 650, conversionRate: 0.40, avgDealDuration: 75, month: 'May', team: 'Central' },
  { name: 'Mia Clark', totalGLA: 3700, dealsCount: 5, avgDealSize: 740, conversionRate: 0.36, avgDealDuration: 80, month: 'Jun', team: 'Western' },
] 

export type Deal = {
  name: string;
  brandName: string;
  groupName: string;
  stores: number;
  stage: string;
  leaseManager: string;
  createdOn: string;
};

// Helper to generate a random 5-digit number as a string
const getRandomDealName = (() => {
  const used = new Set();
  return () => {
    let num;
    do {
      num = Math.floor(10000 + Math.random() * 90000);
    } while (used.has(num));
    used.add(num);
    return `#${num}`;
  };
})();

const createdOnDates = [
  '01/01/2025',
  '01/02/2025',
  '01/03/2025',
  '01/04/2025',
  '01/05/2025',
  '01/06/2025',
  '01/07/2025',
];

export const dealsData: Deal[] = [
  {
    name: getRandomDealName(),
    brandName: "Nike",
    groupName: "Athletics Group",
    stores: 3,
    stage: "Contract signed",
    leaseManager: "Sarah Johnson",
    createdOn: createdOnDates[0],
  },
  {
    name: getRandomDealName(),
    brandName: "Zara",
    groupName: "Fashion Group",
    stores: 2,
    stage: "Proposal signed",
    leaseManager: "Michael Chen",
    createdOn: createdOnDates[1],
  },
  {
    name: getRandomDealName(),
    brandName: "Apple",
    groupName: "Tech Group",
    stores: 1,
    stage: "Ejar issued",
    leaseManager: "Emma Davis",
    createdOn: createdOnDates[2],
  },
  {
    name: getRandomDealName(),
    brandName: "Adidas",
    groupName: "Athletics Group",
    stores: 1,
    stage: "AMC approved",
    leaseManager: "Lisa Anderson",
    createdOn: createdOnDates[3],
  },
  {
    name: getRandomDealName(),
    brandName: "Gucci",
    groupName: "Luxury Group",
    stores: 1,
    stage: "Location agreed",
    leaseManager: "Robert Brown",
    createdOn: createdOnDates[4],
  },
  {
    name: getRandomDealName(),
    brandName: "Starbucks",
    groupName: "F&B Group",
    stores: 4,
    stage: "Proposal issued",
    leaseManager: "Olivia Wilson",
    createdOn: createdOnDates[5],
  },
  {
    name: getRandomDealName(),
    brandName: "H&M",
    groupName: "Fashion Group",
    stores: 2,
    stage: "Discussion initiated",
    leaseManager: "David Lee",
    createdOn: createdOnDates[6],
  },
  {
    name: getRandomDealName(),
    brandName: "Samsung",
    groupName: "Tech Group",
    stores: 5,
    stage: "Planned",
    leaseManager: "Sophia Martinez",
    createdOn: createdOnDates[0],
  },
  {
    name: getRandomDealName(),
    brandName: "Carrefour",
    groupName: "Retail Group",
    stores: 1,
    stage: "Terms Agreed",
    leaseManager: "James Smith",
    createdOn: createdOnDates[1],
  },
  {
    name: getRandomDealName(),
    brandName: "Chanel",
    groupName: "Luxury Group",
    stores: 1,
    stage: "Proposal signed",
    leaseManager: "Emily Clark",
    createdOn: createdOnDates[2],
  },
  {
    name: getRandomDealName(),
    brandName: "Sony",
    groupName: "Tech Group",
    stores: 2,
    stage: "Proposal issued",
    leaseManager: "Daniel Kim",
    createdOn: createdOnDates[3],
  },
  {
    name: getRandomDealName(),
    brandName: "KFC",
    groupName: "F&B Group",
    stores: 3,
    stage: "AMC initiated",
    leaseManager: "Grace Lee",
    createdOn: createdOnDates[4],
  },
  {
    name: getRandomDealName(),
    brandName: "VOX Cinemas",
    groupName: "Entertainment Group",
    stores: 1,
    stage: "Contract issued",
    leaseManager: "William Turner",
    createdOn: createdOnDates[5],
  },
  {
    name: getRandomDealName(),
    brandName: "Pull&Bear",
    groupName: "Fashion Group",
    stores: 2,
    stage: "Proposal signed",
    leaseManager: "Ava Scott",
    createdOn: createdOnDates[6],
  },
  {
    name: getRandomDealName(),
    brandName: "Huawei",
    groupName: "Tech Group",
    stores: 1,
    stage: "AMC approved",
    leaseManager: "Benjamin Hall",
    createdOn: createdOnDates[0],
  },
  {
    name: getRandomDealName(),
    brandName: "Rolex",
    groupName: "Luxury Group",
    stores: 1,
    stage: "Location agreed",
    leaseManager: "Mia Walker",
    createdOn: createdOnDates[1],
  },
  {
    name: getRandomDealName(),
    brandName: "Toys R Us",
    groupName: "Retail Group",
    stores: 2,
    stage: "Planned",
    leaseManager: "Lucas Young",
    createdOn: createdOnDates[2],
  },
  {
    name: getRandomDealName(),
    brandName: "Fitness Time",
    groupName: "Health Group",
    stores: 1,
    stage: "Terms Agreed",
    leaseManager: "Charlotte King",
    createdOn: createdOnDates[3],
  },
  {
    name: getRandomDealName(),
    brandName: "Jarir Bookstore",
    groupName: "Retail Group",
    stores: 1,
    stage: "Discussion initiated",
    leaseManager: "Henry Adams",
    createdOn: createdOnDates[4],
  },
  {
    name: getRandomDealName(),
    brandName: "McDonald's",
    groupName: "F&B Group",
    stores: 3,
    stage: "Proposal signed",
    leaseManager: "Ella Perez",
    createdOn: createdOnDates[5],
  },
]; 