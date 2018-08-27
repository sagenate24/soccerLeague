const soccerTest = require('../soccerLeague');

const leagueMatchesMock = [
  {
    teamOne: {
      name: 'Lions',
      score: 3,
    },
    teamTwo: {
      name: 'Snakes',
      score: 3,
    },
  },
  {
    teamOne: {
      name: 'Tarantulas',
      score: 1,
    },
    teamTwo: {
      name: 'FC Awesome',
      score: 0,
    },
  },
  {
    teamOne: {
      name: 'Lions',
      score: 1,
    },
    teamTwo: {
      name: 'FC Awesome',
      score: 1,
    },
  },
  {
    teamOne: {
      name: 'Tarantulas',
      score: 3,
    },
    teamTwo: {
      name: 'Snakes',
      score: 1,
    },
  },
  {
    teamOne: {
      name: 'Lions',
      score: 4,
    },
    teamTwo: {
      name: 'Grouches',
      score: 0,
    },
  },
];

const fileDataMock = [
  'Lions 3, Snakes 3',
  'Tarantulas 1, FC Awesome 0',
  'Lions 1, FC Awesome 1',
  'Tarantulas 3, Snakes 1',
  'Lions 4, Grouches 0',
  '',
];

const teamListMock = ['Lions', 'Snakes', 'Tarantulas', 'FC Awesome', 'Grouches'];

it('should create a readable data structure', () => {
  expect(soccerTest.formatData(fileDataMock)).toEqual(leagueMatchesMock);
});


it('should return an array of team names', () => {
  expect(soccerTest.getListOfTeamNames(leagueMatchesMock)).toEqual(teamListMock);
});

it('should return total points for each team', () => {
  expect(soccerTest.getTotalTeamPoints('Lions', leagueMatchesMock)).toEqual(5);
  expect(soccerTest.getTotalTeamPoints('Snakes', leagueMatchesMock)).toEqual(1);
  expect(soccerTest.getTotalTeamPoints('Tarantulas', leagueMatchesMock)).toEqual(6);
  expect(soccerTest.getTotalTeamPoints('FC Awesome', leagueMatchesMock)).toEqual(1);
  expect(soccerTest.getTotalTeamPoints('Grouches', leagueMatchesMock)).toEqual(0);
});

it('should return team name if winner or tie if the match is a tie', () => {
  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[0], 'Lions')).toEqual('tie');
  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[2], 'Lions')).toEqual('tie');
  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[4], 'Lions')).toEqual('Lions');

  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[0], 'Snakes')).toEqual('tie');
  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[2], 'Snakes')).toEqual(null);

  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[1], 'Tarantulas')).toEqual('Tarantulas');
  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[3], 'Tarantulas')).toEqual('Tarantulas');

  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[1], 'FC Awesome')).toEqual(null);
  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[2], 'FC Awesome')).toEqual('tie');

  expect(soccerTest.retrieveWinnerOrTie(leagueMatchesMock[4], 'Grouches')).toEqual(null);
});

const matchResultsMock = {
  Lions: {
    points: 5,
  },
  Snakes: {
    points: 1,
  },
  Tarantulas: {
    points: 6,
  },
  'FC Awesome': {
    points: 1,
  },
  Grouches: {
    points: 0,
  },
};

const sortedTeamListMock = ['Tarantulas', 'Lions', 'FC Awesome', 'Snakes', 'Grouches'];

it('should returns an array of team names sorted by their total points.', () => {
  expect(soccerTest.sortResults(matchResultsMock)).toEqual(sortedTeamListMock);
});

const expectedOutPutMock = [
  '1. Tarantulas, 6 pts',
  '2. Lions, 5 pts',
  '3. FC Awesome, 1 pt',
  '3. Snakes, 1 pt',
  '5. Grouches, 0 pts',
  '',
];

const matchResultsAndRankMock = {
  Lions: {
    points: 5,
    rank: 2,
  },
  Snakes: {
    points: 1,
    rank: 3,
  },
  Tarantulas: {
    points: 6,
    rank: 1,
  },
  'FC Awesome': {
    points: 1,
    rank: 3,
  },
  Grouches: {
    points: 0,
    rank: 5,
  },
};

it('should add a ranking property to matchResults', () => {
  expect(soccerTest.createRank(matchResultsMock, sortedTeamListMock)).toEqual(matchResultsAndRankMock);
});

it('should return the correct output format', () => {
  expect(soccerTest.formatOutput(matchResultsAndRankMock, sortedTeamListMock)).toEqual(expectedOutPutMock.join('\n'));
});
