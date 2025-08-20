// Placeholder for sleep shift generation logic.
// In a real implementation, this module would contain functions to:
// - Generate a weekly rota based on parent preferences.
// - Handle exceptions (e.g., exclusively breastfeeding parent).
// - Suggest nap windows based on baby's age.

export const generateSleepRota = (partner1Name: string, partner2Name: string) => {
  return [
    { day: 'Monday', onDuty: partner1Name, offDuty: partner2Name, notes: 'Protected night for ' + partner2Name },
    { day: 'Wednesday', onDuty: partner2Name, offDuty: partner1Name, notes: 'Protected night for ' + partner1Name },
    { day: 'Friday', onDuty: partner1Name, offDuty: partner2Name, notes: 'Protected night for ' + partner2Name },
  ];
};
