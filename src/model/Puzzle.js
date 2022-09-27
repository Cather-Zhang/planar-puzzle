const configuration_1 = {
    "name": "Configuration #1",
    "level": "1",
     "numRows" : "2",
     "numCols" : "4",
     "baseSquares" : [
       { "color" : "red", "row": "0", "column" : "0" , "label" : "R"},
       { "color" : "red", "row": "0", "column" : "2" , "label" : "R" },
       { "color" : "orange", "row": "0", "column" : "3" , "label" : "O"},
       { "color" : "orange", "row": "1", "column" : "2" , "label" : "O"} ],
      "unusedSquares" : []
};


const configuration_2 = {
    "name": "Configuration #2",
    "level": "2",
     "numRows" : "4",
     "numCols" : "8",
     "baseSquares" : [
       { "color" : "red", "row": "0", "column" : "1" , "label" : "R"},
       { "color" : "red", "row": "2", "column" : "4" , "label" : "R" },
       { "color" : "blue", "row": "0", "column" : "2" , "label" : "B"},
       { "color" : "blue", "row": "0", "column" : "5" , "label" : "B"},
       { "color" : "yellow", "row": "1", "column" : "4" , "label" : "Y"},
       { "color" : "yellow", "row": "3", "column" : "4" , "label" : "Y"}  ],
      "unusedSquares" : [
        { "row": "1", "column" : "1" }
      ]
};



const configuration_3 = {
    "name": "Configuration #3",
    "level": "3",
     "numRows" : "8",
     "numCols" : "8",
     "baseSquares" : [
        { "color" : "red", "row": "7", "column" : "0" , "label" : "R"},
        { "color" : "red", "row": "4", "column" : "4" , "label" : "R" },
        { "color" : "blue", "row": "0", "column" : "7" , "label" : "B"},
        { "color" : "blue", "row": "7", "column" : "7" , "label" : "B"},
        { "color" : "yellow", "row": "2", "column" : "4" , "label" : "Y"},
        { "color" : "yellow", "row": "6", "column" : "7" , "label" : "Y"} ],
    "unusedSquares" : []
};

export {configuration_1, configuration_2, configuration_3};
