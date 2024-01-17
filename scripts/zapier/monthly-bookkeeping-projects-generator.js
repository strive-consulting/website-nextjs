//The Projects API by PipeDrive is not supported by Zapier yet, so this script is required to handle all neccessary steps in one code block.

var PARSED = JSON.parse(inputData.RawJson); //Received via PandaDoc webhook
var DOCUMENT = PARSED[0]; //Note, Zapier seems to parse the object and wrap it in to an array
var orgs = PARSED.data
console.log('Processing orgs', orgs.length)
//output = {orgs};

//Having to do the creation here as the Zapier auth doesn't have the Projects scope yet.
const baseApiUrl = 'https://api.pipedrive.com/v1'
const apiKey = process.env.PIPEDRIVE_API_KEY;


const getCurrentDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
};

const getCurrentMonthYear = () => {
    const currentDate = new Date();
    const options = { month: 'short', year: 'numeric' };
    return currentDate.toLocaleString('en-US', options);
};

var filteredOrganizations = []



for (var i = 0; i < orgs.length; i++) {
    //This person_id will be used to create the project card, and in subsequently
    //in a PipeDrive automation to send emails to the client etc.

    console.log('fetching persons')
    await fetch(`${baseApiUrl}/organizations/${orgs[i].id}/persons?api_token=${apiKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);

        filteredOrganizations.push({ 
            name: orgs[i].name + ' - Bookkeeping - ' + getCurrentMonthYear(),
            id: orgs[i].id,
            person_id: data.data[0].id //Note, only using the first person associated to the organization. This is fine in most cases.
        }) 
    })
    .catch(error => {
        console.error('Error:', error);
    });



    
}

for (var i = 0; i < filteredOrganizations.length; i++) {
    var postData = {
        title: filteredOrganizations[i].name,
        board_id: 3,
        phase_id: 12,
        org_id: filteredOrganizations[i].id,
        template_id: 11,
        start_date: getCurrentDate(),
        labels: [398], //monthly bookkeeping
        person_id: filteredOrganizations[i].person_id
    };


    await fetch(`${baseApiUrl}/projects?api_token=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

output = {filteredOrganizations};