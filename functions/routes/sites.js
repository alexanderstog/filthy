const router = require('express').Router();

const authMiddleware = require('../authMiddleware');

// in memory site for a sec then we will stick this in a db
const sites = [
    {
        id: 1,
        url: 'https://www.example.com',
        customer_id: 1,
        hacks: [
            {
                title: 'Hack 1',
                description: 'This is a hack',
                javascript: 'console.log("hello")',
                css: 'body { background-color: red; }',
                route: '/example',
            },
            {
                title: 'Hack 2',
                javascript: 'console.log("hello")',
                css: 'body { background-color: red; }',
                route: '/example',
            }
        ]
    },
    {
        id: 2,
        url: 'https://www.example2.com',
        customer_id: 1,
        hacks: [
            {
                id: 3,
                title: 'Hack 3',
                description: 'This is a hack',
                javascript: 'console.log("hello")',
                css: 'body { background-color: red; }',
                route: '/example',
            },
            {
                id: 4,
                title: 'Hack 4',
                description: 'This is a hack',
                javascript: 'console.log("hello")',
                css: 'body { background-color: red; }',
                route: '/example',
            }
        ]
    }
];

router.get('/', authMiddleware, (req, res) => {
    return res.status(200).json(sites);
});

// Create a new site
router.post('/', authMiddleware, (req, res) => {
    const { url, customer_id, hacks } = req.body;

    const newSite = {
        id: sites.length + 1, // do a proper thing
        url,
        customer_id, // will need to sort this out
        hacks // an array of hack objects 
    };

    sites.push(newSite);
    res.status(201).json(newSite);
});

// Get a specific site by ID
router.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const site = sites.find(s => s.id === parseInt(id));

    if (!site) {
        functions.logger.error(`Site with ID ${id} not found`);
        return res.status(404).json({ message: 'Site not found' });
    }

    res.status(200).json(site);
});

// Update a specific site by ID
router.put('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { url, customer_id, hacks } = req.body;

    const siteIndex = sites.findIndex(s => s.id === parseInt(id));

    if (siteIndex === -1) {
        functions.logger.error(`Site with ID ${id} not found`);
        return res.status(404).json({ message: 'Site not found' });
    }

    sites[siteIndex] = {
        id: parseInt(id),
        url: url || sites[siteIndex].url,
        customer_id: customer_id || sites[siteIndex].customer_id,
        hacks: hacks || sites[siteIndex].hacks
    };

    res.json(sites[siteIndex]);
});

// Delete a specific site by ID
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;

//     const siteIndex = sites.findIndex(s => s.id === parseInt(id));

//     if (siteIndex === -1) {
//         functions.logger.error(`Site with ID ${id} not found`);
//         return res.status(404).json({ message: 'Site not found' });
//     }

//     sites.splice(siteIndex, 1);
//     res.status(204).send();
// });

module.exports = router;