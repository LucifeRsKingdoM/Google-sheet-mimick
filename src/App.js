import React, { useState, useEffect, useRef } from 'react';
import './index.css'; // Import your Tailwind CSS file

const MenuBar = () => (
  <div>
    <div className="flex items-center p-1 border-b" style={{ height: '60px' }}>
      <img src="/OIP.jpeg" alt="Sheets Icon" className="w-6 h-6 mr-2" />
      <div className="flex flex-col">
        <span className="text-2xl font-bold">Untitled spreadsheet</span>
      </div>
      <button className="text-1xl text-gray-600">★</button>
    </div>
    <div className="flex items-center border-b bg-white" style={{ height: '30px' }}>
      <div className="flex">
        {['File', 'Edit', 'View', 'Insert', 'Format', 'Data', 'Tools', 'Extensions', 'Help'].map((item) => (
          <button
            key={item}
            className="px-3 py-1 text-sm hover:bg-gray-100 border-r border-transparent hover:border-gray-200"
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex items-center ml-auto gap-2 pr-2">
        <button className="ml-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm border border-blue-100">
          Share
        </button>
      </div>
    </div>
  </div>
);

const Toolbar = ({ onApplyFunction, onApplyStyle }) => (
  <div className="flex items-center gap-1 p-1 border-b bg-white text-sm">
    <div className="flex items-center border-r pr-1">
      <button className="p-1 hover:bg-gray-100 rounded">↩</button>
      <button className="p-1 hover:bg-gray-100 rounded">↪</button>
      <button className="p-1 hover:bg-gray-100 rounded">🖨️</button>
      <button className="p-1 hover:bg-gray-100 rounded">✂️</button>
    </div>

    <select
      className="border rounded h-7 px-1"
      onChange={(e) => onApplyFunction(e.target.value)}
    >
      <option value="">Functions</option>
      <option value="SUM">SUM</option>
      <option value="AVERAGE">AVERAGE</option>
      <option value="MAX">MAX</option>
      <option value="MIN">MIN</option>
      <option value="COUNT">COUNT</option>
      <option value="TRIM">TRIM</option>
      <option value="UPPER">UPPER</option>
      <option value="LOWER">LOWER</option>
      <option value="REMOVE_DUPLICATES">REMOVE_DUPLICATES</option>
    </select>

    <div className="flex items-center border-l pl-1">
      <button
        className="h-7 px-2 border rounded"
        onClick={() => onApplyStyle('bold')}
      >
        B
      </button>
      <button
        className="h-7 px-2 border rounded"
        onClick={() => onApplyStyle('italic')}
      >
        I
      </button>
      <button
        className="h-7 px-2 border rounded"
        onClick={() => onApplyStyle('underline')}
      >
        U
      </button>
    </div>
  </div>
);

const FormulaBar = ({ formula, onFormulaChange }) => (
  <div className="flex items-center px-1 py-1 border-b bg-white">
    <div className="w-8 text-sm text-center">fx</div>
    <input
      type="text"
      value={formula}
      onChange={(e) => onFormulaChange(e.target.value)}
      className="flex-1 px-2 h-7 border text-sm"
      placeholder="Enter formula"
    />
  </div>
);

const Cell = ({
  value,
  row,
  col,
  isSelected,
  onSelect,
  onChange,
  onNavigate,
  styles,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSelected]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      inputRef.current.blur();
    } else if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
      e.preventDefault();
      onNavigate(e.key, row, col);
    }
  };

  return (
    <td
      className={`border-r border-b border-gray-300 min-w-[80px] h-6 relative cursor-pointer ${isSelected ? 'bg-blue-50 outline outline-1 outline-blue-500 z-10' : ''} ${styles?.bold ? 'font-bold' : ''} ${styles?.italic ? 'italic' : ''} ${styles?.underline ? 'underline' : ''}`}
      onClick={() => onSelect(row, col)}
    >
      <div className="px-1">
        {isSelected ? (
          <input
            ref={inputRef}
            value={value || ''}
            onChange={(e) => onChange(row, col, e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-full outline-none bg-transparent"
          />
        ) : (
          <div className="truncate">{value || ''}</div>
        )}
      </div>
    </td>
  );
};

const Spreadsheet = () => {
  const [cells, setCells] = useState({});
  const [styles, setStyles] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [formula, setFormula] = useState('');

  // Fetch data from the backend
  useEffect(() => {
    fetch('http://localhost:5000/get_data')
      .then(response => response.json())
      .then(data => setCells(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Update the cell value on the backend
  const updateCell = (row, col, value) => {
    fetch('http://localhost:5000/update_cell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ row, col, value }),
    })
      .then(response => response.json())
      .then(() => setCells((prev) => ({ ...prev, [`${row}-${col}`]: value })))
      .catch(error => console.error("Error updating cell:", error));
  };

  const handleApplyFunction = (func) => {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const cellId = `${row}-${col}`;

    let result;
    if (func === 'SUM') {
      result = Object.values(cells).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    } else if (func === 'AVERAGE') {
      const numbers = Object.values(cells).map((val) => parseFloat(val)).filter((val) => !isNaN(val));
      result = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
    } else if (func === 'MAX') {
      result = Math.max(...Object.values(cells).map((val) => parseFloat(val)).filter((val) => !isNaN(val)));
    } else if (func === 'MIN') {
      result = Math.min(...Object.values(cells).map((val) => parseFloat(val)).filter((val) => !isNaN(val)));
    } else if (func === 'COUNT') {
      result = Object.values(cells).filter((val) => !isNaN(parseFloat(val))).length;
    } else if (func === 'TRIM') {
      result = String(cells[cellId] || '').trim();
    } else if (func === 'UPPER') {
      result = String(cells[cellId] || '').toUpperCase();
    } else if (func === 'LOWER') {
      result = String(cells[cellId] || '').toLowerCase();
    } else if (func === 'REMOVE_DUPLICATES') {
      const values = Object.values(cells).filter((value, index, self) => self.indexOf(value) === index);
      result = values.join(', ');
    }

    updateCell(row, col, result);
  };

  const handleApplyStyle = (styleType) => {
    if (!selectedCell) return;
    const { row, col } = selectedCell;
    const cellId = `${row}-${col}`;

    setStyles((prev) => ({
      ...prev,
      [cellId]: {
        ...prev[cellId],
        [styleType]: !prev[cellId]?.[styleType],
      },
    }));
  };

  const handleCellNavigation = (key, row, col) => {
    if (key === 'ArrowRight') {
      setSelectedCell({ row, col: col + 1 });
    } else if (key === 'ArrowLeft') {
      setSelectedCell({ row, col: col - 1 });
    } else if (key === 'ArrowDown') {
      setSelectedCell({ row: row + 1, col });
    } else if (key === 'ArrowUp') {
      setSelectedCell({ row: row - 1, col });
    }
  };

  const renderColumnHeaders = () => {
    const headers = [];
    for (let i = 0; i < 26; i++) {
      headers.push(
        <th key={i} className="bg-gray-50 px-1 font-normal border-r border-b border-gray-300 sticky top-0 text-sm">
          {String.fromCharCode(65 + i)}
        </th>
      );
    }
    return (
      <tr>
        <th className="w-10 bg-gray-50 border-r border-b border-gray-300 sticky top-0 left-0"></th>
        {headers}
      </tr>
    );
  };

  const renderRowHeader = (rowIndex) => (
    <th className="w-10 bg-gray-50 px-1 font-normal border-r border-b border-gray-300 text-right text-sm sticky left-0">
      {rowIndex + 1}
    </th>
  );

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < 100; i++) {
      const cols = [];
      cols.push(renderRowHeader(i));
      for (let j = 0; j < 26; j++) {
        const cellId = `${i}-${j}`;
        cols.push(
          <Cell
            key={cellId}
            value={cells[cellId] || ''}
            row={i}
            col={j}
            isSelected={selectedCell?.row === i && selectedCell?.col === j}
            onSelect={(row, col) => setSelectedCell({ row, col })}
            onChange={(row, col, value) => updateCell(row, col, value)}
            onNavigate={handleCellNavigation}
            styles={styles[cellId] || {}}
          />
        );
      }
      rows.push(<tr key={i}>{cols}</tr>);
    }
    return rows;
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      <MenuBar />
      <Toolbar onApplyFunction={handleApplyFunction} onApplyStyle={handleApplyStyle} />
      <FormulaBar formula={formula} onFormulaChange={setFormula} />
      <div className="flex-1 overflow-auto">
        <table className="border-collapse w-full table-fixed">
          <thead>{renderColumnHeaders()}</thead>
          <tbody>{renderGrid()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
