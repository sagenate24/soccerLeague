// Commands to run the program.
// pipe - cat sample-input.txt | node soccerLeague.js
// redirect - node soccerLeague.js < sample-input.txt
// Testing npx jest --watchAll

process.stdin.on('data', (data) => {
  logExpectedOutPut(data.toString().split('\n'));
});

// Formats sample text file into a more readable data structure.
const formatData = (data) => {
  // Removes empty strings from the extra line in the sample text file.
  const arrayOfMatches = data.filter(n => n !== '');
  const array = [];

  for (let i = 0; i < arrayOfMatches.length; i += 1) {
    const myKey = arrayOfMatches[i];
    const index = myKey.indexOf(',');
    const teamOneName = myKey.substr(0, index).replace(/\d+/g, '').trim();
    const teamTwoName = myKey.substr(index + 1).replace(/\d+/g, '').trim();
    const teamOneScore = myKey.substr(0, index).match(/\d+/g);
    const teamTwoScore = myKey.substr(index + 1).match(/\d+/g);

    array.push({
      teamOne: {
        name: teamOneName,
        score: parseInt(teamOneScore, 10),
      },
      teamTwo: {
        name: teamTwoName,
        score: parseInt(teamTwoScore, 10),
      },
    });
  }

  return array;
};

const logExpectedOutPut = (data) => {
  const leagueMatches = formatData(data);
  const listOfTeamNames = getListOfTeamNames(leagueMatches);
  const matchResults = {};

  listOfTeamNames.forEach((team) => {
    matchResults[team.trim()] = {
      points: getTotalTeamPoints(team, leagueMatches),
    };
  });

  const teamListSortedByScore = sortResults(matchResults);
  const rankingTable = formatOutput(matchResults, teamListSortedByScore);

  // Logs the expected output.
  console.log(rankingTable);
};

// Returns an array of team names
const getListOfTeamNames = (leagueMatches) => {
  const wins = [];
  leagueMatches.map(match => wins.push(match.teamOne.name, match.teamTwo.name));
  const teamList = wins.filter((currentValue, i, arr) => i === arr.indexOf(currentValue));

  return teamList;
};

// Takes in each team name and an object containg all matches.
// Returns the total points for each team.
const getTotalTeamPoints = (teamName, leagueMatches) => {
  let score = 0;

  leagueMatches.forEach((match) => {
    const winnerOrTie = retrieveWinnerOrTie(match, teamName);

    if (winnerOrTie === teamName) {
      score += 3;
    } else if (winnerOrTie === 'tie') {
      score += 1;
    }
  });

  return score;
};

// Takes in a team name and a match.
// Returns the team name if the specified team won the match.
// OR
// Returns a string 'tie' if each team in the match had the same score.
const retrieveWinnerOrTie = (match, teamName) => {
  const teamOneScore = match.teamOne.score;
  const teamTwoScore = match.teamTwo.score;

  if (match.teamOne.name === teamName) {
    if (teamOneScore > teamTwoScore) {
      return match.teamOne.name;
    }
    if (teamOneScore === teamTwoScore) {
      return 'tie';
    }
  } else if (match.teamTwo.name === teamName) {
    if (teamOneScore < teamTwoScore) {
      return match.teamTwo.name;
    }
    if (teamOneScore === teamTwoScore) {
      return 'tie';
    }
  }
  return null;
};

// Takes in object of teams with their total points.
// Returns array of team names sorted by their total points.
// AND
// if teams have the same number of points they are sorted in alphabetical order.
const sortResults = (gameStats) => {
  const keysSorted = Object.keys(gameStats).sort((a, b) => {
    if (gameStats[b].points > gameStats[a].points) {
      return 1;
    }
    if (gameStats[b].points === gameStats[a].points) {
      return 1;
    }
    return 0;
  });

  return keysSorted;
};

// Takes in object of teams with their total points and an array of sorted team names.
// Returns a list of teams each fromatted to meet the expected criteria.
const formatOutput = (matchResults, teamListSortedByScore) => {
  const stats = teamListSortedByScore.map((teamName) => {
    const { points } = matchResults[teamName];
    if (points === 1) {
      return `${3}. ${teamName}, ${points} pt`;
    }
    return `${teamListSortedByScore.indexOf(teamName) + 1}. ${teamName}, ${points} pts`;
  });

  // expected-output.txt file contains an extra line at the end.
  stats.push('');
  return stats.join('\n');
};

module.exports = {
  formatData,
  logExpectedOutPut,
  getListOfTeamNames,
  getTotalTeamPoints,
  retrieveWinnerOrTie,
  formatOutput,
  sortResults,
};
