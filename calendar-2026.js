(function (root, factory) {
    const calendar = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = calendar;
    }

    root.F1Calendar2026 = calendar;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    const CHAMPIONSHIP_YEAR = 2026;

    const races = [
        { id: '2026-r01-australia', round: 1, name: 'Australian Grand Prix' },
        { id: '2026-r02-china', round: 2, name: 'Chinese Grand Prix' },
        { id: '2026-r03-japan', round: 3, name: 'Japanese Grand Prix' },
        { id: '2026-r04-miami', round: 4, name: 'Miami Grand Prix' },
        { id: '2026-r05-canada', round: 5, name: 'Canadian Grand Prix' },
        { id: '2026-r06-monaco', round: 6, name: 'Monaco Grand Prix', aliases: ['Grand Prix de Monaco'] },
        { id: '2026-r07-barcelona', round: 7, name: 'Barcelona-Catalunya Grand Prix', aliases: ['Gran Premio de Barcelona-Catalunya'] },
        { id: '2026-r08-austria', round: 8, name: 'Austrian Grand Prix' },
        { id: '2026-r09-great-britain', round: 9, name: 'British Grand Prix' },
        { id: '2026-r10-belgium', round: 10, name: 'Belgian Grand Prix' },
        { id: '2026-r11-hungary', round: 11, name: 'Hungarian Grand Prix' },
        { id: '2026-r12-netherlands', round: 12, name: 'Dutch Grand Prix' },
        { id: '2026-r13-italy', round: 13, name: 'Italian Grand Prix', aliases: ["Gran Premio d'Italia"] },
        { id: '2026-r14-spain', round: 14, name: 'Spanish Grand Prix', aliases: ['Gran Premio de Espana', 'Gran Premio de España'] },
        { id: '2026-r15-azerbaijan', round: 15, name: 'Azerbaijan Grand Prix' },
        {
            id: '2026-r16-bahrain-sepang',
            round: 16,
            name: 'Bahrain Grand Prix in Malaysia',
            officialName: 'FORMULA 1 GULF AIR BAHRAIN GRAND PRIX IN MALAYSIA 2026',
            aliases: ['Bahrain Grand Prix', 'Gulf Air Bahrain Grand Prix in Malaysia'],
            eventCountryCode: 'BRN',
            venueCountry: 'Malaysia',
            circuit: 'Sepang International Circuit',
            startDate: '2026-10-02',
            endDate: '2026-10-04',
            timezone: 'Asia/Kuala_Lumpur'
        },
        { id: '2026-r17-singapore', round: 17, name: 'Singapore Grand Prix' },
        { id: '2026-r18-united-states', round: 18, name: 'United States Grand Prix' },
        { id: '2026-r19-mexico', round: 19, name: 'Mexico City Grand Prix', aliases: ['Gran Premio de la Ciudad de Mexico', 'Gran Premio de la Ciudad de México'] },
        { id: '2026-r20-sao-paulo', round: 20, name: 'Sao Paulo Grand Prix', aliases: ['São Paulo Grand Prix', 'Grande Premio de Sao Paulo', 'Grande Prêmio de São Paulo'] },
        { id: '2026-r21-las-vegas', round: 21, name: 'Las Vegas Grand Prix' },
        { id: '2026-r22-qatar', round: 22, name: 'Qatar Grand Prix' },
        { id: '2026-r23-abu-dhabi', round: 23, name: 'Abu Dhabi Grand Prix' }
    ].map(race => Object.freeze({ ...race }));

    function normalizeRaceName(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
            .replace(/\bFORMULA\s*1\b/g, ' ')
            .replace(new RegExp(`\\b${CHAMPIONSHIP_YEAR}\\b`, 'g'), ' ')
            .replace(/[^A-Z0-9]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    function getRaceById(id) {
        const cleanId = String(id || '').trim();
        return races.find(race => race.id === cleanId) || null;
    }

    function resolveRace(value) {
        const byId = getRaceById(value);
        if (byId) return byId;

        const normalized = normalizeRaceName(value);
        if (!normalized) return null;

        return races.find(race => {
            const names = [race.name, race.officialName, ...(race.aliases || [])].filter(Boolean);
            return names.some(name => normalized.includes(normalizeRaceName(name)));
        }) || null;
    }

    return Object.freeze({
        CHAMPIONSHIP_YEAR,
        races: Object.freeze(races),
        getRaceById,
        normalizeRaceName,
        resolveRace
    });
}));
