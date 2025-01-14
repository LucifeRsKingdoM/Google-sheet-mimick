# Assignment 1: Web Application Mimicking Google Sheets

## **Objective**
The goal of this project is to develop a web application that mimics the user interface and core functionalities of Google Sheets. The application focuses on implementing features such as mathematical and data quality functions, along with a user-friendly spreadsheet-like experience.

---

## **Features Implemented**

### **1. Spreadsheet Interface**
- Mimics the Google Sheets UI, including the toolbar, formula bar, and cell grid structure.
- Supports drag functionality for copying cell content, formulas, and selections.
- Allows users to add, delete, and resize rows and columns.
- Supports basic cell formatting (e.g., bold, italics, font size, and color).

### **2. Mathematical Functions**
The following mathematical functions are implemented:
- **SUM**: Calculates the sum of a range of cells.
- **AVERAGE**: Computes the average of a range of cells.
- **MAX**: Returns the maximum value from a range of cells.
- **MIN**: Returns the minimum value from a range of cells.
- **COUNT**: Counts the number of numerical values in a range.

### **3. Data Quality Functions**
The following data quality functions are available:
- **TRIM**: Removes leading and trailing whitespace from cell values.
- **UPPER**: Converts text in a cell to uppercase.
- **LOWER**: Converts text in a cell to lowercase.
- **REMOVE_DUPLICATES**: Removes duplicate rows from the selected range.
- **FIND_AND_REPLACE**: Allows users to find and replace specific text in a range of cells.

### **4. Data Entry and Validation**
- Supports input of various data types (numbers, text, dates).
- Implements basic data validation checks (e.g., ensuring numeric cells contain only numbers).

---

## **How It Works**

1. **User Interaction**:
   - Users can click on cells to input data or formulas.
   - Drag functionality allows copying content or formulas across cells.

2. **Formulas and Dependencies**:
   - Cell dependencies are maintained to ensure that formulas dynamically update when related cells change.

3. **Function Execution**:
   - Users can apply mathematical or data quality functions via the toolbar or formula bar.
   - Results are displayed directly in the relevant cells.

4. **Testing Features**:
   - Users can input test data to explore and verify the implemented functionalities.

---

## **Bonus Features**
- **Save/Load Functionality**:
  - Users can save their spreadsheets locally and reload them later.
- **Data Visualization**:
  - Basic charting capabilities for visualizing data (e.g., bar charts, pie charts).
- **Advanced Formulas**:
  - Added support for relative and absolute cell references.

---

## **Instructions for Running**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Steps to Run**

1. Clone the repository:
   ```bash
   git clone https://github.com/LucifeRsKingdoM/Google-sheet-mimick.git
   cd google-sheets-mimic
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## **Screenshots**


### **Spreadsheet Interface**
 Live Priview : 

### **Toolbar and Functions**
React - Frontend
Python - Backend
Flask - API
Json - Local Storage

---

## **GitHub Repository**
The source code for this project is available at:
[GitHub Repository Link](https://github.com/your-username/google-sheets-mimic)

---

## **Conclusion**
This project successfully mimics the core functionalities and user experience of Google Sheets. It provides robust support for data entry, mathematical calculations, and data quality functions. Additional bonus features enhance usability and interactivity, making it a comprehensive solution for spreadsheet-based tasks.

Feel free to explore the application and provide feedback. 🚀

