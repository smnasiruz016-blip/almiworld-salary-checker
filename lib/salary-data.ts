/**
 * Salary calculator data.
 *
 * Verbatim port of the inline `<script>` data tables in the legacy
 * `docs/legacy-index.html`. No values changed — only typed and
 * structured. Phase 2 follow-ups (live currency rates, expanded role
 * data) belong elsewhere.
 *
 * Naming map vs. legacy:
 *   D  → SALARY_DATA       P  → ROLE_ALIASES
 *   CN → COUNTRY_NAMES     FL → COUNTRY_FLAGS
 *   RN → ROLE_DISPLAY      R  → CURRENCY_RATES
 *   S  → CURRENCY_SYMBOLS  DM → DEMAND
 *   TR → TREND             EM → EXPERIENCE_MODIFIERS
 *   CL → COMPARE_LIST
 */

export type Currency = "USD" | "GBP" | "EUR" | "AUD" | "CAD" | "AED" | "SGD" | "ISK";

export type Experience = "entry" | "mid" | "senior";

export type Country =
  | "uk" | "usa" | "canada" | "australia" | "germany" | "france"
  | "netherlands" | "sweden" | "norway" | "denmark" | "switzerland"
  | "ireland" | "uae" | "saudi" | "qatar" | "singapore" | "japan"
  | "south_korea" | "india" | "south_africa" | "nigeria" | "kenya"
  | "egypt" | "brazil" | "mexico" | "iceland" | "new_zealand"
  | "poland" | "spain" | "italy" | "portugal" | "pakistan"
  | "philippines" | "malaysia";

export type BaseRole =
  | "nurse" | "software_engineer" | "doctor" | "teacher" | "accountant"
  | "electrician" | "chef" | "data_scientist" | "marketing_manager" | "driver";

export type AliasRole =
  | "pharmacist" | "dentist" | "physiotherapist" | "product_manager"
  | "ux_designer" | "devops" | "cybersecurity" | "financial_analyst"
  | "hr_manager" | "sales_manager" | "project_manager" | "university_lecturer"
  | "plumber" | "warehouse" | "graphic_designer" | "journalist" | "architect";

export type Role = BaseRole | AliasRole;

/** [low, mid, high] in USD. Modifiers and currency rates apply downstream. */
export type SalaryRange = readonly [low: number, mid: number, high: number];

export const SALARY_DATA: Record<BaseRole, Record<Country, SalaryRange>> = {
  nurse: {
    uk: [32000, 42000, 56000], usa: [55000, 77000, 100000], canada: [50000, 68000, 88000],
    australia: [55000, 72000, 95000], germany: [36000, 48000, 62000], france: [28000, 38000, 50000],
    netherlands: [38000, 50000, 64000], sweden: [36000, 47000, 60000], norway: [48000, 62000, 80000],
    denmark: [44000, 58000, 74000], switzerland: [68000, 88000, 110000], ireland: [40000, 52000, 68000],
    uae: [28000, 40000, 55000], saudi: [22000, 34000, 48000], qatar: [30000, 44000, 60000],
    singapore: [32000, 44000, 58000], japan: [28000, 38000, 50000], south_korea: [26000, 36000, 48000],
    india: [5000, 9000, 15000], south_africa: [9000, 14000, 20000], nigeria: [3000, 6000, 10000],
    kenya: [3500, 6500, 11000], egypt: [4000, 7000, 12000], brazil: [8000, 14000, 22000],
    mexico: [7000, 12000, 18000], iceland: [50000, 65000, 82000], new_zealand: [46000, 60000, 78000],
    poland: [18000, 26000, 36000], spain: [24000, 32000, 44000], italy: [24000, 33000, 46000],
    portugal: [18000, 26000, 36000], pakistan: [3000, 5500, 9000], philippines: [4000, 7000, 12000],
    malaysia: [8000, 13000, 20000],
  },
  software_engineer: {
    uk: [45000, 70000, 100000], usa: [85000, 120000, 170000], canada: [70000, 95000, 130000],
    australia: [72000, 100000, 140000], germany: [52000, 72000, 100000], france: [42000, 58000, 80000],
    netherlands: [52000, 72000, 98000], sweden: [46000, 64000, 88000], norway: [56000, 76000, 104000],
    denmark: [52000, 70000, 96000], switzerland: [88000, 118000, 155000], ireland: [55000, 78000, 108000],
    uae: [38000, 58000, 82000], saudi: [32000, 50000, 72000], qatar: [36000, 56000, 80000],
    singapore: [50000, 72000, 100000], japan: [40000, 56000, 78000], south_korea: [36000, 52000, 74000],
    india: [8000, 16000, 32000], south_africa: [14000, 22000, 35000], nigeria: [5000, 10000, 18000],
    kenya: [5000, 9000, 16000], egypt: [5000, 9000, 16000], brazil: [12000, 22000, 38000],
    mexico: [10000, 18000, 30000], iceland: [52000, 72000, 98000], new_zealand: [58000, 82000, 112000],
    poland: [24000, 38000, 58000], spain: [28000, 40000, 58000], italy: [28000, 40000, 58000],
    portugal: [22000, 34000, 52000], pakistan: [5000, 10000, 20000], philippines: [6000, 12000, 22000],
    malaysia: [12000, 20000, 34000],
  },
  doctor: {
    uk: [60000, 95000, 140000], usa: [150000, 220000, 320000], canada: [120000, 175000, 250000],
    australia: [100000, 160000, 240000], germany: [65000, 100000, 150000], france: [55000, 85000, 130000],
    netherlands: [68000, 105000, 158000], sweden: [62000, 95000, 140000], norway: [72000, 110000, 165000],
    denmark: [68000, 104000, 156000], switzerland: [120000, 175000, 250000], ireland: [72000, 110000, 165000],
    uae: [60000, 95000, 140000], saudi: [55000, 88000, 130000], qatar: [65000, 100000, 150000],
    singapore: [70000, 110000, 165000], japan: [55000, 85000, 125000], south_korea: [50000, 80000, 120000],
    india: [10000, 20000, 40000], south_africa: [20000, 35000, 60000], nigeria: [8000, 16000, 28000],
    kenya: [8000, 16000, 28000], egypt: [8000, 15000, 26000], brazil: [20000, 36000, 60000],
    mexico: [16000, 28000, 48000], iceland: [72000, 108000, 160000], new_zealand: [80000, 125000, 185000],
    poland: [30000, 50000, 80000], spain: [40000, 65000, 100000], italy: [40000, 65000, 100000],
    portugal: [32000, 52000, 82000], pakistan: [6000, 12000, 22000], philippines: [8000, 14000, 25000],
    malaysia: [16000, 28000, 48000],
  },
  teacher: {
    uk: [28000, 38000, 52000], usa: [38000, 52000, 70000], canada: [44000, 60000, 80000],
    australia: [50000, 68000, 90000], germany: [38000, 52000, 68000], france: [28000, 38000, 52000],
    netherlands: [36000, 50000, 66000], sweden: [32000, 44000, 58000], norway: [40000, 55000, 72000],
    denmark: [38000, 52000, 68000], switzerland: [60000, 80000, 105000], ireland: [38000, 52000, 68000],
    uae: [22000, 35000, 50000], saudi: [20000, 32000, 46000], qatar: [24000, 38000, 55000],
    singapore: [30000, 42000, 58000], japan: [26000, 36000, 50000], south_korea: [24000, 34000, 48000],
    india: [3500, 6500, 12000], south_africa: [8000, 12000, 18000], nigeria: [2500, 5000, 9000],
    kenya: [2500, 5000, 9000], egypt: [3000, 5500, 10000], brazil: [7000, 12000, 19000],
    mexico: [6000, 10000, 16000], iceland: [36000, 50000, 66000], new_zealand: [42000, 58000, 76000],
    poland: [14000, 20000, 30000], spain: [22000, 30000, 42000], italy: [22000, 30000, 42000],
    portugal: [16000, 24000, 34000], pakistan: [2500, 4500, 8000], philippines: [3500, 6000, 10000],
    malaysia: [7000, 11000, 17000],
  },
  accountant: {
    uk: [32000, 46000, 65000], usa: [48000, 68000, 95000], canada: [42000, 58000, 80000],
    australia: [48000, 66000, 90000], germany: [38000, 52000, 72000], france: [32000, 44000, 62000],
    netherlands: [38000, 52000, 72000], sweden: [34000, 48000, 66000], norway: [42000, 58000, 78000],
    denmark: [40000, 56000, 76000], switzerland: [65000, 88000, 118000], ireland: [36000, 50000, 70000],
    uae: [24000, 38000, 55000], saudi: [20000, 32000, 48000], qatar: [24000, 38000, 56000],
    singapore: [32000, 46000, 64000], japan: [28000, 40000, 56000], south_korea: [24000, 36000, 52000],
    india: [5000, 9000, 16000], south_africa: [9000, 14000, 22000], nigeria: [3500, 7000, 12000],
    kenya: [3500, 7000, 12000], egypt: [4000, 7500, 13000], brazil: [9000, 16000, 26000],
    mexico: [7000, 12000, 20000], iceland: [38000, 54000, 72000], new_zealand: [42000, 58000, 78000],
    poland: [16000, 24000, 36000], spain: [22000, 32000, 46000], italy: [22000, 32000, 46000],
    portugal: [16000, 24000, 36000], pakistan: [3000, 6000, 11000], philippines: [4000, 7000, 12000],
    malaysia: [8000, 13000, 21000],
  },
  electrician: {
    uk: [28000, 40000, 56000], usa: [42000, 60000, 82000], canada: [44000, 62000, 84000],
    australia: [52000, 72000, 96000], germany: [30000, 42000, 58000], france: [26000, 36000, 50000],
    netherlands: [32000, 44000, 60000], sweden: [30000, 42000, 58000], norway: [42000, 58000, 78000],
    denmark: [38000, 54000, 72000], switzerland: [52000, 70000, 92000], ireland: [32000, 45000, 62000],
    uae: [14000, 22000, 34000], saudi: [12000, 20000, 30000], qatar: [14000, 24000, 36000],
    singapore: [18000, 28000, 42000], japan: [22000, 32000, 46000], south_korea: [20000, 30000, 44000],
    india: [3000, 5500, 10000], south_africa: [8000, 12000, 18000], nigeria: [2500, 5000, 9000],
    kenya: [2500, 5000, 9000], egypt: [3000, 5500, 10000], brazil: [7000, 12000, 20000],
    mexico: [5000, 9000, 16000], iceland: [40000, 55000, 72000], new_zealand: [44000, 62000, 82000],
    poland: [14000, 20000, 30000], spain: [20000, 28000, 40000], italy: [20000, 28000, 40000],
    portugal: [14000, 22000, 32000], pakistan: [2500, 4500, 8000], philippines: [3000, 5500, 10000],
    malaysia: [6000, 10000, 16000],
  },
  chef: {
    uk: [22000, 30000, 44000], usa: [28000, 40000, 58000], canada: [26000, 36000, 52000],
    australia: [36000, 50000, 68000], germany: [22000, 30000, 44000], france: [22000, 30000, 44000],
    netherlands: [24000, 33000, 48000], sweden: [22000, 30000, 44000], norway: [28000, 40000, 55000],
    denmark: [26000, 38000, 52000], switzerland: [42000, 58000, 78000], ireland: [24000, 34000, 48000],
    uae: [14000, 22000, 34000], saudi: [10000, 18000, 28000], qatar: [12000, 20000, 32000],
    singapore: [16000, 24000, 36000], japan: [18000, 26000, 38000], south_korea: [14000, 22000, 32000],
    india: [3000, 5000, 9000], south_africa: [6000, 10000, 16000], nigeria: [2000, 4000, 7000],
    kenya: [2000, 4000, 7000], egypt: [2500, 4500, 8000], brazil: [5000, 9000, 15000],
    mexico: [4000, 7000, 12000], iceland: [26000, 38000, 52000], new_zealand: [30000, 42000, 58000],
    poland: [10000, 16000, 24000], spain: [16000, 22000, 32000], italy: [16000, 23000, 34000],
    portugal: [10000, 16000, 24000], pakistan: [2000, 3500, 6500], philippines: [2500, 4500, 8000],
    malaysia: [4000, 7000, 12000],
  },
  data_scientist: {
    uk: [48000, 72000, 100000], usa: [88000, 125000, 175000], canada: [72000, 98000, 135000],
    australia: [72000, 100000, 138000], germany: [54000, 74000, 100000], france: [44000, 60000, 84000],
    netherlands: [52000, 72000, 100000], sweden: [48000, 66000, 92000], norway: [56000, 78000, 108000],
    denmark: [52000, 72000, 100000], switzerland: [90000, 120000, 158000], ireland: [55000, 78000, 108000],
    uae: [40000, 60000, 85000], saudi: [34000, 52000, 75000], qatar: [38000, 58000, 82000],
    singapore: [52000, 74000, 104000], japan: [42000, 60000, 84000], south_korea: [38000, 56000, 80000],
    india: [8000, 16000, 30000], south_africa: [14000, 22000, 35000], nigeria: [5000, 10000, 18000],
    kenya: [5000, 9000, 16000], egypt: [5000, 9000, 16000], brazil: [12000, 22000, 38000],
    mexico: [10000, 18000, 30000], iceland: [52000, 74000, 100000], new_zealand: [58000, 82000, 114000],
    poland: [24000, 38000, 58000], spain: [28000, 42000, 62000], italy: [28000, 42000, 62000],
    portugal: [22000, 36000, 54000], pakistan: [5000, 10000, 20000], philippines: [6000, 12000, 22000],
    malaysia: [12000, 20000, 34000],
  },
  marketing_manager: {
    uk: [36000, 52000, 75000], usa: [58000, 82000, 120000], canada: [52000, 72000, 102000],
    australia: [58000, 80000, 112000], germany: [42000, 58000, 82000], france: [36000, 50000, 72000],
    netherlands: [42000, 58000, 82000], sweden: [38000, 54000, 76000], norway: [44000, 62000, 88000],
    denmark: [42000, 60000, 86000], switzerland: [70000, 95000, 128000], ireland: [42000, 58000, 82000],
    uae: [30000, 48000, 70000], saudi: [26000, 42000, 62000], qatar: [30000, 48000, 70000],
    singapore: [38000, 56000, 80000], japan: [32000, 46000, 66000], south_korea: [28000, 42000, 62000],
    india: [6000, 11000, 20000], south_africa: [10000, 16000, 26000], nigeria: [4000, 8000, 14000],
    kenya: [4000, 8000, 14000], egypt: [4000, 8000, 14000], brazil: [10000, 18000, 30000],
    mexico: [8000, 14000, 24000], iceland: [40000, 58000, 80000], new_zealand: [48000, 68000, 94000],
    poland: [18000, 28000, 44000], spain: [24000, 36000, 54000], italy: [24000, 36000, 54000],
    portugal: [18000, 28000, 44000], pakistan: [4000, 7500, 13000], philippines: [5000, 9000, 16000],
    malaysia: [9000, 15000, 24000],
  },
  driver: {
    uk: [24000, 32000, 44000], usa: [38000, 52000, 70000], canada: [36000, 50000, 68000],
    australia: [44000, 60000, 80000], germany: [26000, 36000, 50000], france: [24000, 33000, 46000],
    netherlands: [28000, 38000, 52000], sweden: [26000, 36000, 50000], norway: [34000, 48000, 66000],
    denmark: [30000, 44000, 60000], switzerland: [44000, 60000, 80000], ireland: [26000, 36000, 50000],
    uae: [10000, 16000, 25000], saudi: [9000, 15000, 24000], qatar: [10000, 17000, 27000],
    singapore: [16000, 24000, 36000], japan: [20000, 28000, 40000], south_korea: [16000, 24000, 36000],
    india: [3000, 5000, 9000], south_africa: [5000, 8000, 13000], nigeria: [2000, 4000, 7000],
    kenya: [2000, 4000, 7000], egypt: [2500, 4500, 8000], brazil: [6000, 10000, 16000],
    mexico: [4500, 8000, 13000], iceland: [30000, 44000, 60000], new_zealand: [36000, 50000, 68000],
    poland: [12000, 18000, 28000], spain: [18000, 25000, 36000], italy: [18000, 26000, 38000],
    portugal: [12000, 18000, 28000], pakistan: [2000, 3500, 6500], philippines: [2500, 4500, 8000],
    malaysia: [4000, 7000, 12000],
  },
};

export const ROLE_ALIASES: Record<AliasRole, BaseRole> = {
  pharmacist: "accountant",
  dentist: "doctor",
  physiotherapist: "nurse",
  product_manager: "marketing_manager",
  ux_designer: "marketing_manager",
  devops: "software_engineer",
  cybersecurity: "software_engineer",
  financial_analyst: "accountant",
  hr_manager: "marketing_manager",
  sales_manager: "marketing_manager",
  project_manager: "marketing_manager",
  university_lecturer: "teacher",
  plumber: "electrician",
  warehouse: "driver",
  graphic_designer: "marketing_manager",
  journalist: "teacher",
  architect: "data_scientist",
};

export const COUNTRY_NAMES: Record<Country, string> = {
  uk: "United Kingdom", usa: "United States", canada: "Canada", australia: "Australia",
  germany: "Germany", france: "France", netherlands: "Netherlands", sweden: "Sweden",
  norway: "Norway", denmark: "Denmark", switzerland: "Switzerland", ireland: "Ireland",
  uae: "UAE / Dubai", saudi: "Saudi Arabia", qatar: "Qatar", singapore: "Singapore",
  japan: "Japan", south_korea: "South Korea", india: "India", south_africa: "South Africa",
  nigeria: "Nigeria", kenya: "Kenya", egypt: "Egypt", brazil: "Brazil", mexico: "Mexico",
  iceland: "Iceland", new_zealand: "New Zealand", poland: "Poland", spain: "Spain",
  italy: "Italy", portugal: "Portugal", pakistan: "Pakistan", philippines: "Philippines",
  malaysia: "Malaysia",
};

export const COUNTRY_FLAGS: Record<Country, string> = {
  uk: "🇬🇧", usa: "🇺🇸", canada: "🇨🇦", australia: "🇦🇺", germany: "🇩🇪", france: "🇫🇷",
  netherlands: "🇳🇱", sweden: "🇸🇪", norway: "🇳🇴", denmark: "🇩🇰", switzerland: "🇨🇭",
  ireland: "🇮🇪", uae: "🇦🇪", saudi: "🇸🇦", qatar: "🇶🇦", singapore: "🇸🇬", japan: "🇯🇵",
  south_korea: "🇰🇷", india: "🇮🇳", south_africa: "🇿🇦", nigeria: "🇳🇬", kenya: "🇰🇪",
  egypt: "🇪🇬", brazil: "🇧🇷", mexico: "🇲🇽", iceland: "🇮🇸", new_zealand: "🇳🇿",
  poland: "🇵🇱", spain: "🇪🇸", italy: "🇮🇹", portugal: "🇵🇹", pakistan: "🇵🇰",
  philippines: "🇵🇭", malaysia: "🇲🇾",
};

export const ROLE_DISPLAY: Record<Role, string> = {
  nurse: "Nurse (RN)",
  software_engineer: "Software Engineer",
  doctor: "Doctor / Physician",
  teacher: "Teacher",
  accountant: "Accountant",
  electrician: "Electrician",
  chef: "Chef",
  data_scientist: "Data Scientist",
  marketing_manager: "Marketing Manager",
  driver: "Truck Driver",
  pharmacist: "Pharmacist",
  dentist: "Dentist",
  physiotherapist: "Physiotherapist",
  product_manager: "Product Manager",
  ux_designer: "UX Designer",
  devops: "DevOps Engineer",
  cybersecurity: "Cybersecurity Analyst",
  financial_analyst: "Financial Analyst",
  hr_manager: "HR Manager",
  sales_manager: "Sales Manager",
  project_manager: "Project Manager",
  university_lecturer: "University Lecturer",
  plumber: "Plumber",
  warehouse: "Warehouse Operative",
  graphic_designer: "Graphic Designer",
  journalist: "Journalist",
  architect: "Architect",
};

export const CURRENCY_RATES: Record<Currency, number> = {
  USD: 1, GBP: 0.79, EUR: 0.92, AUD: 1.53, CAD: 1.36, AED: 3.67, SGD: 1.34, ISK: 138,
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$", GBP: "£", EUR: "€", AUD: "A$", CAD: "C$", AED: "AED ", SGD: "S$", ISK: "kr ",
};

export const DEMAND: Record<BaseRole, string> = {
  nurse: "Very High ↑",
  software_engineer: "Very High ↑",
  doctor: "Very High ↑",
  teacher: "High ↑",
  accountant: "Stable →",
  electrician: "High ↑",
  chef: "Moderate →",
  data_scientist: "Very High ↑",
  marketing_manager: "Moderate →",
  driver: "High ↑",
};

export const TREND: Record<BaseRole, string> = {
  nurse: "+12%",
  software_engineer: "+18%",
  doctor: "+9%",
  teacher: "+6%",
  accountant: "+5%",
  electrician: "+11%",
  chef: "+4%",
  data_scientist: "+22%",
  marketing_manager: "+8%",
  driver: "+7%",
};

export const EXPERIENCE_MODIFIERS: Record<Experience, number> = {
  entry: 0.78,
  mid: 1.0,
  senior: 1.35,
};

export const COMPARE_LIST: Record<BaseRole, readonly Country[]> = {
  nurse: ["norway", "australia", "switzerland", "uk", "usa", "uae", "india"],
  software_engineer: ["usa", "switzerland", "australia", "uk", "germany", "india"],
  doctor: ["usa", "switzerland", "australia", "norway", "uk", "uae"],
  teacher: ["switzerland", "australia", "norway", "uk", "usa", "uae"],
  accountant: ["switzerland", "usa", "australia", "uk", "germany", "india"],
  electrician: ["australia", "norway", "switzerland", "usa", "uk", "germany"],
  chef: ["switzerland", "australia", "norway", "usa", "uk", "uae"],
  data_scientist: ["usa", "switzerland", "australia", "uk", "germany", "india"],
  marketing_manager: ["usa", "switzerland", "australia", "uk", "germany", "india"],
  driver: ["australia", "norway", "switzerland", "usa", "uk", "germany"],
};

/** Typeahead label + keyword index. Order matters — `findRoleMatch`
 *  uses `ROLE_LABELS[0]` as the ultimate fallback. */
export interface RoleLabel {
  key: Role;
  label: string;
  keywords: readonly string[];
}

export const ROLE_LABELS: readonly RoleLabel[] = [
  { key: "nurse", label: "Nurse (RN)", keywords: ["nurse", "rn", "nursing", "medical assistant", "caregiver"] },
  { key: "doctor", label: "Doctor / Physician", keywords: ["doctor", "physician", "medic", "md", "gp", "surgeon"] },
  { key: "pharmacist", label: "Pharmacist", keywords: ["pharmacist", "pharmacy", "chemist"] },
  { key: "dentist", label: "Dentist", keywords: ["dentist", "dental", "orthodontist"] },
  { key: "physiotherapist", label: "Physiotherapist", keywords: ["physiotherapist", "physio", "physical therapist", "therapist"] },
  { key: "software_engineer", label: "Software Engineer", keywords: ["software engineer", "developer", "programmer", "coder", "full stack", "frontend", "backend", "web developer", "mobile developer", "android", "ios", "swe"] },
  { key: "data_scientist", label: "Data Scientist", keywords: ["data scientist", "data science", "ml engineer", "machine learning", "ai engineer", "data analyst"] },
  { key: "product_manager", label: "Product Manager", keywords: ["product manager", "pm", "product owner", "product lead"] },
  { key: "ux_designer", label: "UX Designer", keywords: ["ux", "ui", "designer", "user experience", "user interface", "product designer", "interaction designer"] },
  { key: "devops", label: "DevOps Engineer", keywords: ["devops", "sre", "site reliability", "cloud engineer", "infrastructure", "platform engineer"] },
  { key: "cybersecurity", label: "Cybersecurity Analyst", keywords: ["cybersecurity", "security", "infosec", "penetration tester", "pentest", "soc analyst", "security analyst"] },
  { key: "accountant", label: "Accountant", keywords: ["accountant", "accounting", "bookkeeper", "cpa", "auditor"] },
  { key: "financial_analyst", label: "Financial Analyst", keywords: ["financial analyst", "finance", "investment", "banker", "analyst"] },
  { key: "marketing_manager", label: "Marketing Manager", keywords: ["marketing", "digital marketing", "content marketing", "seo", "social media manager", "brand manager"] },
  { key: "hr_manager", label: "HR Manager", keywords: ["hr", "human resources", "recruiter", "talent", "people operations"] },
  { key: "sales_manager", label: "Sales Manager", keywords: ["sales", "account executive", "business development", "sales rep", "bdr", "sdr"] },
  { key: "project_manager", label: "Project Manager", keywords: ["project manager", "program manager", "scrum master", "agile coach"] },
  { key: "teacher", label: "Teacher", keywords: ["teacher", "tutor", "educator", "instructor", "school teacher", "english teacher", "math teacher"] },
  { key: "university_lecturer", label: "University Lecturer", keywords: ["lecturer", "professor", "academic", "researcher", "phd", "postdoc"] },
  { key: "electrician", label: "Electrician", keywords: ["electrician", "electrical", "wiring"] },
  { key: "plumber", label: "Plumber", keywords: ["plumber", "plumbing", "pipefitter"] },
  { key: "chef", label: "Chef / Cook", keywords: ["chef", "cook", "culinary", "baker", "pastry", "kitchen", "line cook"] },
  { key: "driver", label: "Truck / HGV Driver", keywords: ["driver", "truck driver", "hgv", "lorry", "delivery driver", "uber driver", "taxi", "chauffeur"] },
  { key: "warehouse", label: "Warehouse Operative", keywords: ["warehouse", "forklift", "picker", "packer", "logistics worker"] },
  { key: "graphic_designer", label: "Graphic Designer", keywords: ["graphic designer", "illustrator", "visual designer", "print designer", "brand designer"] },
  { key: "journalist", label: "Journalist / Writer", keywords: ["journalist", "writer", "reporter", "editor", "copywriter", "content writer", "blogger"] },
  { key: "architect", label: "Architect", keywords: ["architect", "architectural", "designer building"] },
];

export const COUNTRY_OPTIONS: ReadonlyArray<{ value: Country; label: string }> = [
  { value: "uk", label: "🇬🇧 United Kingdom" },
  { value: "usa", label: "🇺🇸 United States" },
  { value: "canada", label: "🇨🇦 Canada" },
  { value: "australia", label: "🇦🇺 Australia" },
  { value: "germany", label: "🇩🇪 Germany" },
  { value: "france", label: "🇫🇷 France" },
  { value: "netherlands", label: "🇳🇱 Netherlands" },
  { value: "sweden", label: "🇸🇪 Sweden" },
  { value: "norway", label: "🇳🇴 Norway" },
  { value: "denmark", label: "🇩🇰 Denmark" },
  { value: "switzerland", label: "🇨🇭 Switzerland" },
  { value: "ireland", label: "🇮🇪 Ireland" },
  { value: "uae", label: "🇦🇪 UAE / Dubai" },
  { value: "saudi", label: "🇸🇦 Saudi Arabia" },
  { value: "qatar", label: "🇶🇦 Qatar" },
  { value: "singapore", label: "🇸🇬 Singapore" },
  { value: "japan", label: "🇯🇵 Japan" },
  { value: "south_korea", label: "🇰🇷 South Korea" },
  { value: "india", label: "🇮🇳 India" },
  { value: "south_africa", label: "🇿🇦 South Africa" },
  { value: "nigeria", label: "🇳🇬 Nigeria" },
  { value: "kenya", label: "🇰🇪 Kenya" },
  { value: "egypt", label: "🇪🇬 Egypt" },
  { value: "brazil", label: "🇧🇷 Brazil" },
  { value: "mexico", label: "🇲🇽 Mexico" },
  { value: "iceland", label: "🇮🇸 Iceland" },
  { value: "new_zealand", label: "🇳🇿 New Zealand" },
  { value: "poland", label: "🇵🇱 Poland" },
  { value: "spain", label: "🇪🇸 Spain" },
  { value: "italy", label: "🇮🇹 Italy" },
  { value: "portugal", label: "🇵🇹 Portugal" },
  { value: "pakistan", label: "🇵🇰 Pakistan" },
  { value: "philippines", label: "🇵🇭 Philippines" },
  { value: "malaysia", label: "🇲🇾 Malaysia" },
];

export const CURRENCY_OPTIONS: ReadonlyArray<{ value: Currency; label: string }> = [
  { value: "USD", label: "🇺🇸 USD — US Dollar" },
  { value: "GBP", label: "🇬🇧 GBP — British Pound" },
  { value: "EUR", label: "🇪🇺 EUR — Euro" },
  { value: "AUD", label: "🇦🇺 AUD — Australian Dollar" },
  { value: "CAD", label: "🇨🇦 CAD — Canadian Dollar" },
  { value: "AED", label: "🇦🇪 AED — UAE Dirham" },
  { value: "SGD", label: "🇸🇬 SGD — Singapore Dollar" },
  { value: "ISK", label: "🇮🇸 ISK — Icelandic Króna" },
];

export const EXPERIENCE_OPTIONS: ReadonlyArray<{ value: Experience; label: string }> = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-6 years)" },
  { value: "senior", label: "Senior (7+ years)" },
];

export const EXPERIENCE_LABELS: Record<Experience, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior",
};
