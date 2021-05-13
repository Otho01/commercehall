import React from 'react'

export const Checkbox = function({ categories, isSelected, onCheckboxChange}) {
    return(
      <div>
        {categories.map((cat, i) => (
          <div>
            <label htmlFor={cat}>{cat}</label>
            <input 
              type='checkbox'
              key={`chk-${i}`}
              name={cat}
              value={cat}
            />
          </div>
        ))}
      </div>
    )
  }
