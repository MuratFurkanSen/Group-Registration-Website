// Load JSON data from file (simulated as a constant here)
const data = {
    "topics": ["Technology", "Science", "Art", "Business"],
    "dates": ["October", "November", "December"],
    "members": ["Fixie", "Fifty Fifty", "TYU", "Altundal", "Memir"],
    "teams": []
};

const teamTableBody = document.getElementById('team-table-body');
const minMemberAmount = 3;

// Populate data lists
function refreshDataLists(dataLists) {
    const topicDatalist = document.getElementById('topics');
    const optionsDatalist = document.getElementById('dates');
    const membersDatalist = document.getElementById('names');
    // Refresh topics
    if (dataLists.includes("topics")) {
        topicDatalist.innerHTML = '';
        data.topics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            topicDatalist.appendChild(option);
        });
    }

    // Refresh other options
    if (dataLists.includes("dates")) {
        optionsDatalist.innerHTML = '';
        data.dates.forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText;
            optionsDatalist.appendChild(option);
        });
    }


    // Populate members
    if (dataLists.includes("members")) {
        membersDatalist.innerHTML = '';
        data.members.forEach(member => {
            const option = document.createElement('option');
            option.value = member;
            membersDatalist.appendChild(option);
        });
    }
}

// Call the function to fill lists initially
refreshDataLists(["topics", "dates", "members"]);

// Add team member
function addMember() {
    const memberName = document.getElementById('team-member').value;
    const emptySlot = teamTableBody.querySelector('.empty-slot');

    if (emptySlot && memberName) {
        // Fill empty slot with member name
        emptySlot.textContent = memberName;
        emptySlot.classList.remove('empty-slot');
        emptySlot.classList.add('filled-slot');

        // Add remove button
        const actionCell = emptySlot.nextElementSibling;
        actionCell.innerHTML = `<button class="remove-btn" onclick="removeMember(this)">Remove</button>`;


        // Remove selected member from the JSON and data list
        data.members = data.members.filter(m => m !== memberName);
        refreshDataLists(["members"]);

        // Clear input fields
        document.getElementById('team-member').value = '';


    } else if (!emptySlot) {
        alert("The team is full!");
    }
}

// Remove team member
function removeMember(button) {
    const row = button.parentNode.parentNode;
    const memberCell = row.children[1];
    const memberName = memberCell.textContent;

    // Clear the member name and revert to empty slot
    memberCell.textContent = 'Empty';
    memberCell.classList.remove('filled-slot');
    memberCell.classList.add('empty-slot');
    data.members.push(memberName);
    refreshDataLists(["members"]);

    // Remove the remove button
    button.parentNode.innerHTML = '';
}

// Save Team
function saveTeam() {
    const topic = document.getElementById('topic').value;
    const date = document.getElementById('date').value;
    let slots = teamTableBody.querySelectorAll('.filled-slot');
    if (!topic){
        alert("You need to select a topic!")
        return;
    }
    else if (!date){
        alert("You need to select a date!")
        return;
    }
    else if (slots.length< minMemberAmount){
        alert("You need to add more members to your team!")
        return;
    }
    // Fill Members
    const members = []
    slots.forEach((slot) => {
        members.push(slot.innerHTML);
    })
    // Create Team
    let team = { topic: topic, date: date, members: members };
    data.teams.push(team);


}

