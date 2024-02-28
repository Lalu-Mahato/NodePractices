const csv = require('csv-parser');
const fs = require('fs');
const data = [];

fs.createReadStream('./branchmanagers.csv')
    .pipe(csv())
    .on('data', (response) => data.push(response))
    .on('end', () => {
        const updatedData = data.map(item => {
            let name = null;
            if (item.bmName) {
                name = item.bmName.substring(0, 2);
            }
            const newPassword = `${name}@${item.bmId}`;
            return { ...item, newPassword };
        });

        console.log(updatedData);
    });