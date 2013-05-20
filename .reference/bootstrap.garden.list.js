Garden =  new Meteor.Collection("garden");
Meteor.startup(function () {
    if (Garden.find().count() === 0) {

        Garden.insert({
            name: 'Garlic',
            latin: 'Allium tuberosum',
            zone: '4-8',
            shade: 'Sunny',
            soil: '',
            water: '',
            seasonal: 'Perrennial',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Chamomile',
            latin: 'Chamaemelum nobile',
            zone: '4-9',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: 'Annual,Perennial',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Lavender',
            latin: 'Lavandula angustifolia ',
            zone: '5-10',
            shade: 'Sunny',
            soil: '',
            water: '',
            seasonal: 'Perrennial',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Motherwort',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Stinging Nettles',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Echinacea',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Valerian',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'St. Johns Wort',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Elder Tree',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Mashmellow',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: 'yes',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Basil',
            latin: 'Ocimum basilicum',
            zone: '',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: 'Annual',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Bay Laurel',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Cilantro',
            latin: 'Coriandrum sativum',
            zone: '',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: 'Annual',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Dill',
            latin: 'Anethum graveolens',
            zone: '',
            shade: 'Sunny',
            soil: '',
            water: '',
            seasonal: 'Annual',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Lemon Balm',
            latin: 'Melissa officinalis',
            zone: '4-11',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: 'Perennial',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Lemon Verbena',
            latin: 'Aloysia triphylla',
            zone: '9-10',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Lemongrass',
            latin: 'Cymbopogon citratus',
            zone: '9-11',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Oregano',
            latin: 'Origanum vulgare',
            zone: '5-11',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: 'Perennial',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Parsely',
            latin: 'Petroselinum ...',
            zone: '5-11',
            shade: 'Sunny',
            soil: '',
            water: '',
            seasonal: 'Annual',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Mint',
            latin: 'Mentha ...',
            zone: '3-10',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: 'Perennial',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Rosemary',
            latin: 'Rosmarinus officinalis',
            zone: '6-10',
            shade: 'Sunny',
            soil: '',
            water: '',
            seasonal: 'Perennial',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Sage',
            latin: 'Salvia officinalis',
            zone: '4-10',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: 'Perennial',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Thyme',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Mustard',
            latin: '',
            zone: '',
            shade: '',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Catnip',
            latin: 'Nepeta cataria',
            zone: '3-9',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Chives',
            latin: 'Allium schoenoprasum',
            zone: '3-10',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: 'Perennial',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Marjoram',
            latin: 'Origanum majorana',
            zone: '8-11',
            shade: 'Sunny, Partially Sunny',
            soil: '',
            water: '',
            seasonal: 'Annual, Perennial',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
        Garden.insert({
            name: 'Patchoili',
            latin: 'Pogostemon cablin',
            zone: '10-11',
            shade: 'Partially Sunny',
            soil: '',
            water: '',
            seasonal: '',
            medicinal: '',
            uses: '',
            recipes: '',
            notes: ''
        });
    }
});