import React from 'react';
import './leftPane.css';  // Ensure this is the correct path

export default function LeftPane() {
  return (
    <div className="left-pane bg-dark" data-bs-theme="dark">
      <ul className="list-group">
        <li className="list-group-item disabled" aria-disabled="true">A disabled item</li>
        <li className="list-group-item list-group-item-info">A simple info list group item</li>
        <li className="list-group-item list-group-item-info">A simple info list group item</li>
        <li className="list-group-item list-group-item-info">A simple info list group item</li>
        <li className="list-group-item list-group-item-info">A simple info list group item</li>
      </ul>
    </div>
  );
}
