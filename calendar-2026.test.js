const test = require('node:test');
const assert = require('node:assert/strict');

const calendar = require('./calendar-2026.js');

test('2026 calendar has 23 contiguous rounds', () => {
    assert.equal(calendar.races.length, 23);
    assert.deepEqual(calendar.races.map(race => race.round), Array.from({ length: 23 }, (_, index) => index + 1));
    assert.equal(new Set(calendar.races.map(race => race.id)).size, 23);
});

test('round 16 is the Bahrain Grand Prix at Sepang', () => {
    const race = calendar.races.find(entry => entry.round === 16);

    assert.equal(race.id, '2026-r16-bahrain-sepang');
    assert.equal(race.name, 'Bahrain Grand Prix in Malaysia');
    assert.equal(race.eventCountryCode, 'BRN');
    assert.equal(race.venueCountry, 'Malaysia');
    assert.equal(race.circuit, 'Sepang International Circuit');
    assert.equal(race.startDate, '2026-10-02');
    assert.equal(race.endDate, '2026-10-04');
});

test('cancelled April races are not separate calendar entries', () => {
    assert.equal(calendar.races.some(race => race.name === 'Saudi Arabian Grand Prix'), false);
    assert.equal(calendar.races.filter(race => race.name.includes('Bahrain Grand Prix')).length, 1);
});

test('official and legacy Bahrain names resolve to the canonical round', () => {
    const names = [
        'FORMULA 1 GULF AIR BAHRAIN GRAND PRIX IN MALAYSIA 2026',
        'GULF AIR BAHRAIN GRAND PRIX IN MALAYSIA',
        'Bahrain Grand Prix'
    ];

    names.forEach(name => {
        const race = calendar.resolveRace(name);
        assert.equal(race?.id, '2026-r16-bahrain-sepang');
        assert.equal(race?.round, 16);
    });
});

test('sponsored and localized names resolve without affecting round order', () => {
    assert.equal(calendar.resolveRace("FORMULA 1 PIRELLI GRAN PREMIO D'ITALIA 2026")?.round, 13);
    assert.equal(calendar.resolveRace('FORMULA 1 GRANDE PREMIO DE SAO PAULO 2026')?.round, 20);
});
