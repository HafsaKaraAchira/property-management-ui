import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import AddPropertyForm from './components/AddPropertyForm';
import KanbanBoard from './components/KanbanBoard';

const apiUrl = "http://localhost:3033" ;

function App() {
  const [properties, setProperties] = useState([]);
  // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(apiUrl + '/properties/groups')
      .then(response => {
        console.log(response); // Inspect the response here
        return response.json();
        }
    )
      .then(data => {
        console.log(`The length of the array is ${data.length}.`);
        console.log(data);
        setProperties(data) ;
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  ;

  const handlePropertiesFilter = (searchTerm) =>{
    // setProperties(
    //     properties.filter((property) => {
    //     const searchText = searchTerm.toLowerCase();
    //     return Object.values(property).some((value) =>
    //       typeof value === 'string' && value.toLowerCase().includes(searchText)
    //     );
    //   })
    // ) ;
  }

  const handleGroupUpdate = (updatedProperty) => {
    fetch(apiUrl + `/properties/${updatedProperty.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ group: updatedProperty.group })
    })
      .then(response => {
        if (response.ok) {
          // Update properties state locally after successful update
          const updatedProperties = properties.map(prop => (prop.id === updatedProperty.id ? updatedProperty : prop));
          setProperties(updatedProperties);
        } else {
          console.error('Error updating property group');
        }
      })
      .catch(err => console.error('Error fetching properties:', err));
  };

  const handleAddProperty = (newProperty) => {
    fetch(apiUrl + '/properties',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProperty)
    })
      .then(response => response.json())
      .then(data => {
        setProperties({...properties,
          'Full Property List': [...properties['Full Property List'], newProperty], // Add to "Full Property List" directly
        });
      })
      .catch(err => console.error('Error adding property:', err));
  };

  return (
    <div className="App">
      <SearchBar onSearchChange={handlePropertiesFilter} />
      <AddPropertyForm onSubmit={handleAddProperty} />
      <KanbanBoard properties={properties} onGroupUpdate={handleGroupUpdate} />
    </div>
  );
}

export default App;
