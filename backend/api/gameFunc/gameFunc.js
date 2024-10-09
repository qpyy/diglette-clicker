// Экспоненциальный рост порога уровня
const levelUpThreshold = level => 100 * Math.pow(1.5, level - 1);

// Рассчитываем уровень по накопленному опыту
const calculateLevel = (experience, currentLevel) => {
  let level = currentLevel;
  let remainingExperience = experience;

  // Проверяем, достаточно ли опыта для текущего уровня
  while (remainingExperience >= levelUpThreshold(level)) {
    remainingExperience -= levelUpThreshold(level);
    level++;
  }

  // Если текущий уровень меньше, чем предоставленный уровень, то возвращаем тот же уровень
  if (level <= currentLevel) {
    return {
      level: currentLevel,
      experienceToNextLevel: levelUpThreshold(currentLevel) - remainingExperience
    };
  }

  return {
    level,
    experienceToNextLevel: levelUpThreshold(level) - remainingExperience
  };
};