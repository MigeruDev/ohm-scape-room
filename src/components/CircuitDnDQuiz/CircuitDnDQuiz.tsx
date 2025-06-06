"use client";

import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';

// Define types for items and slots
interface CircuitComponent {
  id: string;
  name: string;
  type: 'battery' | 'resistor' | 'wire';
}

interface DropZoneSlot {
  id: string;
  accepts: CircuitComponent['type'][]; // Types of components it can accept
  placedComponent: CircuitComponent | null;
  requiredType?: CircuitComponent['type']; // For validation: which type is actually required
}

const initialComponents: CircuitComponent[] = [
  { id: 'comp-1', name: 'Battery (9V)', type: 'battery' },
  { id: 'comp-2', name: 'Resistor (1kΩ)', type: 'resistor' },
  { id: 'comp-3', name: 'Wire Segment A', type: 'wire' },
  { id: 'comp-4', name: 'Wire Segment B', type: 'wire' },
];

const initialSlots: DropZoneSlot[] = [
  { id: 'slot-battery', accepts: ['battery'], placedComponent: null, requiredType: 'battery' },
  { id: 'slot-wire1', accepts: ['wire'], placedComponent: null, requiredType: 'wire' },
  { id: 'slot-resistor', accepts: ['resistor'], placedComponent: null, requiredType: 'resistor' },
  { id: 'slot-wire2', accepts: ['wire'], placedComponent: null, requiredType: 'wire' },
];

interface CircuitDnDQuizProps {
  onSolve: (isCorrect: boolean) => void;
}

const CircuitDnDQuiz: React.FC<CircuitDnDQuizProps> = ({ onSolve }) => {
  const [availableComponents, setAvailableComponents] = useState<CircuitComponent[]>(initialComponents);
  const [circuitSlots, setCircuitSlots] = useState<DropZoneSlot[]>(initialSlots);

  const checkCircuitCorrectness = (updatedSlots: DropZoneSlot[]): boolean => {
    return updatedSlots.every(slot => slot.placedComponent !== null && slot.placedComponent.type === slot.requiredType);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return; // Dropped outside a droppable

    const componentId = source.droppableId;
    const slotId = destination.droppableId;

    if (componentId === 'componentsList' && slotId.startsWith('slot-')) {
      // Moving from available components list to a circuit slot
      const componentDragged = availableComponents.find(c => c.id === result.draggableId);
      if (!componentDragged) return;

      const targetSlotIndex = circuitSlots.findIndex(s => s.id === slotId);
      if (targetSlotIndex === -1) return;

      const targetSlot = circuitSlots[targetSlotIndex];

      // Check if slot accepts this type and is empty
      if (targetSlot.accepts.includes(componentDragged.type) && !targetSlot.placedComponent) {
        const newSlots = [...circuitSlots];
        newSlots[targetSlotIndex] = { ...targetSlot, placedComponent: componentDragged };

        const newAvailableComponents = availableComponents.filter(c => c.id !== componentDragged.id);

        setCircuitSlots(newSlots);
        setAvailableComponents(newAvailableComponents);

        if (checkCircuitCorrectness(newSlots)) {
          onSolve(true);
        } else {
          onSolve(false); // Keep calling onSolve to update parent state if needed
        }
      }
    } else if (source.droppableId.startsWith('slot-') && destination.droppableId === 'componentsList') {
      // Moving from a circuit slot back to the available components list
      const sourceSlot = circuitSlots.find(s => s.id === source.droppableId);
      if (!sourceSlot || !sourceSlot.placedComponent) return;

      const componentToReturn = sourceSlot.placedComponent;

      const newSlots = circuitSlots.map(s =>
        s.id === source.droppableId ? { ...s, placedComponent: null } : s
      );
      const newAvailableComponents = [...availableComponents, componentToReturn];

      setCircuitSlots(newSlots);
      setAvailableComponents(newAvailableComponents);
      onSolve(false); // Circuit is no longer complete
    }
    // Add logic for reordering within slots if needed, or moving between slots
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="p-3 sm:p-4 border border-gray-300 rounded-lg shadow-md">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-indigo-700">Build the Circuit</h3>
        <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">Drag the components to their correct places in the circuit diagram.</p>

        {/* Drop Zones for the circuit */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6 p-2 sm:p-4 bg-gray-100 rounded border border-dashed">
          {circuitSlots.map((slot, index) => (
            <Droppable key={slot.id} droppableId={slot.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-2 sm:p-3 min-h-[60px] sm:min-h-[80px] border-2 rounded
                              ${snapshot.isDraggingOver ? 'border-blue-500 bg-blue-100' : 'border-gray-400'}
                              ${slot.placedComponent ? 'bg-green-100 border-green-500' : 'bg-gray-50'}`}
                >
                  <p className="text-[10px] sm:text-xs text-gray-500 capitalize mb-1">{slot.requiredType} Slot</p>
                  {slot.placedComponent ? (
                    <Draggable draggableId={slot.placedComponent.id} index={index} key={slot.placedComponent.id}>
                      {(dragProvided) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className="p-1 sm:p-2 bg-white rounded shadow border border-gray-300 text-xs sm:text-sm"
                        >
                          {slot.placedComponent.name}
                        </div>
                      )}
                    </Draggable>
                  ) : (
                    <span className="text-[10px] sm:text-xs text-gray-400">Empty</span>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>

        {/* Draggable Components List */}
        <p className="w-full text-xs sm:text-sm font-medium text-gray-700 mb-2">Available Components:</p>
        <Droppable droppableId="componentsList" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`flex flex-row sm:flex-wrap gap-2 sm:gap-3 p-2 sm:p-4 border rounded-lg overflow-x-auto sm:overflow-x-visible
                          ${snapshot.isDraggingOver ? 'bg-indigo-50' : 'bg-white'}`}
            >
              {availableComponents.map((component, index) => (
                <Draggable key={component.id} draggableId={component.id} index={index}>
                  {(dragProvided, dragSnapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      className={`p-1.5 sm:p-2 rounded shadow border cursor-grab whitespace-nowrap
                                  ${dragSnapshot.isDragging ? 'bg-indigo-200 ring-2 ring-indigo-500' : 'bg-indigo-100 border-indigo-300'}
                                  text-[10px] sm:text-sm text-indigo-800`}
                    >
                      {component.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {availableComponents.length === 0 && <p className="text-xs text-gray-400 p-2">All components placed.</p>}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default CircuitDnDQuiz;
