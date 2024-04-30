import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Typography,
  Grid,
} from '@mui/material';
import { Visibility } from '@mui/icons-material'; // Import Visibility icon

const KanbanBoard = ({ properties, onGroupUpdate }) => {
  const groupsTitles = {
    "Cleaning Required": "Exited",
    "Cleaning Done": "Full Property List",
    "Cleaning Pending": "Pending",    
  };
  
  const groups = Object.fromEntries(
    Object.entries(groupsTitles).map(([groupTitle, propertyName]) => [
      groupTitle,
      properties[propertyName] || [],
    ])
  );
  

  const [open, setOpen] = useState({}); // State for collapsible items

  const handleOnDragEnd = (result) => {
    console.log(result); 
    if (!result.destination) return;

    const { source, destination } = result;
    console.log("source "+source.droppableId);
    console.log("destination "+destination.droppableId);
    //remove te dragged property from the old group
    const [removedProperty] = properties[source.droppableId].splice(source.index, 1);
    if (source.droppableId !== destination.droppableId) {
      // Update property group in API and update state
      onGroupUpdate({ ...removedProperty, group: groupsTitles[destination.droppableId]  })
        .then(() => {
          // Update state locally after successful update
          properties[destination.droppableId].splice(destination.index, 0, removedProperty);
        })
        .catch(err => console.error('Error updating property group:', err));
    } else {
      properties.splice(destination.index, 0, removedProperty);
    }
  };

  const handleToggle = (propertyId) => {
    setOpen(prevOpen => ({ ...prevOpen, [propertyId]: !prevOpen[propertyId] }));
  };
                      
  
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Grid container spacing={2}>
        {Object.keys(groups).map(groupTitle => (
          <Grid item key={`grid_${groupTitle}`} xs={12} md={4}>
            <div style={{ padding: 10, margin: 10, border: '1px solid #ddd' }}>
              <h2>{groupTitle}</h2>
              <Droppable droppableId={groupsTitles[groupTitle]} key={groupsTitles[groupTitle]}>
                {(provided, snapshot) => (
                  <List dense={true} {...provided.droppableProps} ref={provided.innerRef} >
                    {groups[groupTitle]
                      .map((property, index) => (
                        <Draggable key={`drag_${property._id}`} draggableId={`drag_${property._id}`} index={index}>
                          {/* ... Rest of the Draggable and ListItem code ... */
                            (provided, snapshot) => (
                                  <ListItem
                                    key={property._id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      backgroundColor: snapshot.isDragging ? 'lightblue' : 'inherit',
                                    }}
                                    secondaryAction={
                                      <IconButton aria-label="toggle details" onClick={() => handleToggle(property._id)}>
                                      <Visibility />
                                    </IconButton>
                                    }
                                  >
                                    <ListItemText
                                      primary={property.propertyName}
                                      secondary={`${property.address}, ${property.city}`}
                                    />
                                    <Collapse in={open[property._id]} timeout={'auto'} unmountOnExit>
                                      <Typography variant="body2">
                                        <Grid container spacing={1}>
                                          <Grid item xs={6}>
                                            <Typography>Rental Cost: {property.rentalCost ? JSON.stringify(property.rentalCost) : 'NA'}</Typography>
                                          </Grid>
                                          <Grid item xs={6}>
                                            <Typography>Tag: {property.tag}</Typography>
                                          </Grid>
                                          {/* <Grid item xs={6}>
                                            <Typography>Contract Start Date: {property.contractStartDate ? property.contractStartDate.toLocaleDateString() : 'NA'}</Typography>
                                          </Grid>
                                          <Grid item xs={6}>
                                            <Typography>Contract End Date: {property.contractEndDate ? property.contractEndDate.toLocaleDateString() : 'NA'}</Typography>
                                          </Grid> */}
                                          <Grid item xs={6}>
                                            <Typography>Direct Cost: {property.directCost ? JSON.stringify(property.directCost) : 'NA'}</Typography>
                                          </Grid>
                                          <Grid item xs={6}>
                                            <Typography>Fixed Cost: {property.fixedCost ? property.fixedCost : 'NA'}</Typography>
                                          </Grid>
                                        </Grid> {/* Close the Grid container */}
                                      </Typography>
                                    </Collapse> 
                                  </ListItem>
                                )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </List>
                )}
              </Droppable>
            </div>
            </Grid>
          ))}
          </Grid>
    </DragDropContext>
  );
};

export default KanbanBoard;


// const groups = {  
  //   "Cleaning Required": properties["Exited"] || [],
  //   "Cleaning Done": properties["Full Property List"] || [],
  //   "Cleaning Pending": properties["Pending"] || [],    
  // };