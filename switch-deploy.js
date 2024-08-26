const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length !== 1) {
    console.error('Usage: node script.js <new-default-project-id>');
    process.exit(1);
}

const newDefaultProjectId = args[0];

// Define the path to the .firebaserc file
const firebasercPath = path.join(__dirname, '.firebaserc');

// Read the .firebaserc file
fs.readFile(firebasercPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading .firebaserc file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const firebaserc = JSON.parse(data);

        // Update the default project ID
        firebaserc.projects.default = newDefaultProjectId;

        // Convert back to JSON string
        const updatedData = JSON.stringify(firebaserc, null, 2);

        // Write the updated JSON back to the .firebaserc file
        fs.writeFile(firebasercPath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to .firebaserc file:', err);
                return;
            }

            console.log(`Default project ID updated to: ${newDefaultProjectId}`);
        });

    } catch (err) {
        console.error('Error parsing .firebaserc JSON:', err);
    }
});
