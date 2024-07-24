const agentlist = document.getElementById("agentlist");
const lnamehead = document.getElementById("lnamehead");
const fnamehead = document.getElementById("fnamehead");
const feehead = document.getElementById("feehead");
const ratinghead = document.getElementById("ratinghead");
const regionDropdown = document.getElementById("regionDropdown")

// Currency formatting
const formatCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

// Function to create table rows
const maketable = (data) => {
    let agents = '';
    data.forEach((e) => {
        const row = agentlist.insertRow();
        const first_name = e.first_name;
        const last_name = e.last_name;
        const fee = e.fee;
        const rating = e.rating;
        const dollarfee = formatCurrency.format(fee);


        // Determine the class based on rating
        let background_color = '';
        if (rating == 100) {
            background_color = "#1ceb0a"; /* bright green */
        } else if (rating >= 90) {
            background_color = "#42b1f1"; /* blue */        } 
            else if (rating<90) {
                background_color = "#A020F0"; /* purple  */        }


        const rowdata = `
        <tbody >
            <tr style="background-color: ${background_color}">
                <td><output readonly></output>${first_name}</td>
                <td><output readonly></output>${last_name}</td>
                <td><output readonly></output>${dollarfee}</td>
                <td><output readonly></output>${rating}</td>
            </tr>
        </tbody>`;
        agents += rowdata;

        agentlist.innerHTML = agents;
    });
};

// Fetch and filter agents data
async function agentdata1() {
    try {
        const fetchreturn = await fetch('http://localhost:3004/topagents'); // Change to your backend URL
        const fetchjson = await fetchreturn.json();
        
        maketable(fetchjson);
      
        return fetchjson;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Event listeners for sorting
lnamehead.addEventListener("click", async function() {
    const allagents = await agentdata1();
    allagents.sort((a, b) => a.last_name.localeCompare(b.last_name));
    maketable(allagents);
});

fnamehead.addEventListener("click", async function() {
    const allagents = await agentdata1();
    allagents.sort((a, b) => a.first_name.localeCompare(b.first_name));
    maketable(allagents);
});

feehead.addEventListener("click", async function() {
    const allagents = await agentdata1();
    allagents.sort((a, b) => a.fee - b.fee);
    maketable(allagents);
});

ratinghead.addEventListener("click", async function() {
    const allagents = await agentdata1();
    allagents.sort((a, b) => a.rating - b.rating);
    maketable(allagents);
});


regionDropdown.addEventListener("change", function() {
    console.log(regionDropdown.value);
    const allAgents = agentdata1();
    const filteredAgents = allAgents.filter(agent => regionDropdown.value === 'all' || agent.region === regionDropdown.value);
    displayAgents(filteredAgents);
});


// Initial data fetch
agentdata1();
