import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@mui/material';
// import { LocalizationProvider, DatePicker} from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns'; // Choose the appropriate adapter
// import { format } from 'date-fns'; // Import format function

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { format } from 'date-fns'; // Import format function

const AddPropertyForm = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    address: '',
    rentalCost: null,
    propertyName: '',
    tag: '',
    city: '',
    contractStartDate: null,
    contractEndDate: null,
    directCost: null,
    group: 'Full Property List', // Default group
    fixedCost: 0,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewProperty({ ...newProperty, [name]: value }); // Update state property dynamically
  };

  // const handleDateChange = (newValue, propertyName) => {
  //   setNewProperty({ ...newProperty, [propertyName]: newValue });
  // };

  // const handleDateChange = (newValue, propertyName) => {
  //   setNewProperty({ ...newProperty, [propertyName]: newValue.getTime() }); // Convert Date to Unix timestamp
  // };

  // // Custom input format function
  // const customInputFormat = (date) => {
  //   return format(date, 'yyyy-MM-dd');
  // };

  const handleSubmit = () => {
    onSubmit(newProperty);
    setNewProperty({
      address: '',
      rentalCost: null,
      propertyName: '',
      tag: '',
      city: '',
      contractStartDate: null,
      contractEndDate: null,
      directCost: null,
      group: 'Full Property List', // Default group
      fixedCost: 0,
    }) ;
    setOpen(false);
  };

  return (
    // <LocalizationProvider dateAdapter={AdapterDateFns}>
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Property
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Property</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter property details</DialogContentText>
          <TextField autoFocus margin="dense" label="Address" type="text" fullWidth value={newProperty.address} onChange={handleChange} name="address" />
          <TextField margin="dense" label="Property Name" type="text" fullWidth value={newProperty.propertyName} onChange={handleChange} name="propertyName" />
          <TextField margin="dense" label="Tag" type="text" fullWidth value={newProperty.tag} onChange={handleChange} name="tag" />
          <TextField margin="dense" label="City" type="text" fullWidth value={newProperty.city} onChange={handleChange} name="city" />
          {/* <TextField margin="dense" label="Rental Cost" type="number" fullWidth value={newProperty.rentalCost} onChange={handleChange} name="rentalCost" /> */}
          {/* <TextField margin="dense" label="Direct Cost" type="number" fullWidth value={newProperty.directCost} onChange={handleChange} name="directCost" /> */}
          {/* <DatePicker
            label="Contract Start Date"
            value={newProperty.contractStartDate ? new Date(newProperty.contractStartDate) : null} // Convert timestamp back to Date object for display
            onChange={(newValue) => handleDateChange(newValue, 'contractStartDate')}
            renderInput={(params) => (
              <TextField {...params} inputFormat={customInputFormat} placeholder="YYYY-MM-DD"/>
            )}
          /> */}
          {/* <DatePicker
            label="Contract End Date"
            value={newProperty.contractEndDate}
            onChange={(newValue) => handleDateChange(newValue, 'contractEndDate')}
            renderInput={(params) => <TextField {...params} />}
          /> */}
          {/* No need to add a field for fixedCost as it has a default value of 0 */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>      
    // </LocalizationProvider>
  );
};

export default AddPropertyForm;
