export const STANDARD_CATEGORIES: Record<string, string[]> = {
  'Development': ['development', 'web', 'python', 'system', 'programming'],
  'CTF/Wargame': ['ctf/wargame', 'ctf-wargame', 'ctf', 'pwn', 'web', 'reverse', 'crypto', 'wargame'],
  'BugBounty': ['bugbounty', 'bug bounty', 'security', 'research', 'vulnerability'],
  'Technical Document': ['technical document', 'technicaldocument', 'document', 'guide', 'tutorial'],
  'Paper/Conference': ['paper/conference', 'paper-conference', 'paper', 'conference', 'academic', 'publication'],
  'Contest/Certification': ['contest/certification', 'contest-certification', 'contest', 'certification', 'award']
};

export const CATEGORY_ICONS: Record<string, string> = {
  'Development': '💻',
  'CTF/Wargame': '🏁',
  'BugBounty': '🛡️',
  'Technical Document': '📄',
  'Paper/Conference': '📚',
  'Contest/Certification': '🏆',
  'Etc': '⚓'
};
