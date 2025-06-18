export function calculateStats(flocks) {
  if (flocks && !Array.isArray(flocks)) {
    return {
      totalFlocks: 0,
      totalProduction: 0,
      totalMortality: 0,
      totalEggs: 0,
      totalFeed: 0,
      remainingFeed: 0,
      totalBirds: 0,
    };
  }
  const stats = flocks.reduce(
    (acc, flock) => {
      acc.totalFlocks += 1;
      acc.totalProduction += flock.flock.percentProduction || 0;
      acc.totalBirds += flock.flock.totalBirds || 0;
      acc.totalFeed += flock.totalFeedStock || 0;
      acc.remainingFeed += flock.remainingFeed || 0;
      acc.totalMortality += flock.flock.mortality || 0;
      return acc;
    },
    {
      totalBirds: 0,
      totalFlocks: 0,
      totalMortality: 0,
      totalProduction: 0,
      totalFeed: 0,
      remainingFeed: 0,
    }
  );
  return stats;
}
