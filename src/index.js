document.addEventListener('DOMContentLoaded', () => {
    const dogForm = document.getElementById('dog-form');
    const dogTableBody = document.querySelector('#dogs-table tbody');
    const nameInput = document.getElementById('name');
    const breedInput = document.getElementById('breed');
    const sexInput = document.getElementById('sex');
    const dogIdInput = document.getElementById('dog-id');
  
    // Fetch and display dogs
    function fetchDogs() {
      fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => {
          dogTableBody.innerHTML = '';
          dogs.forEach(dog => renderDog(dog));
        });
    }
  
    // Render a dog in the table
    function renderDog(dog) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}">Edit</button></td>
      `;
      tr.querySelector('button').addEventListener('click', () => populateForm(dog));
      dogTableBody.appendChild(tr);
    }
  
    // Populate the form with dog details
    function populateForm(dog) {
      nameInput.value = dog.name;
      breedInput.value = dog.breed;
      sexInput.value = dog.sex;
      dogIdInput.value = dog.id;
    }
  
    // Handle form submission
    dogForm.addEventListener('submit', event => {
      event.preventDefault();
      const id = dogIdInput.value;
      const updatedDog = {
        name: nameInput.value,
        breed: breedInput.value,
        sex: sexInput.value
      };
  
      fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedDog)
      })
        .then(response => response.json())
        .then(() => {
          fetchDogs();
          dogForm.reset();
        });
    });
  
    // Initial fetch of dogs
    fetchDogs();
  });
  