import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const width = 200;
const height = 200;

const units = [
  { unit: "$", phrase: "The red circle represents $VALUE - how much money does the blue circle represent?" },
  { unit: "€", phrase: "The red circle represents €VALUE - how much money does the blue circle represent?" },
  { unit: "puppies", phrase: "The red circle represents VALUE puppies - how many puppies does the blue circle represent?" },
  { unit: "apples", phrase: "The red circle represents VALUE apples - how many apples does the blue circle represent?" },
  { unit: "cars", phrase: "The red circle represents VALUE cars - how many cars does the blue circle represent?" },
  { unit: "houses", phrase: "The red circle represents VALUE houses - how many houses does the blue circle represent?" },
  { unit: "pounds of sugar", phrase: "The red circle represents VALUE pounds of sugar - how many pounds of sugar does the blue circle represent?" },
  { unit: "liters of vinegar", phrase: "The red circle represents VALUE liters of vinegar - how many liters of vinegar does the blue circle represent?" },
  { unit: "books", phrase: "The red circle represents VALUE books - how many books does the blue circle represent?" },
  { unit: "dogs", phrase: "The red circle represents VALUE dogs - how many dogs does the blue circle represent?" }
];

// Function to generate random circles ensuring they do not overlap
const generateRandomCircles = () => {
  const radius1 = Math.random() * 30 + 20; // Radius between 20 and 50
  const radius2 = Math.random() * 30 + 20;
  let x1;
  let y1;
  let x2;
  let y2;

  do {
    x1 = Math.random() * (width - 2 * radius1) + radius1;
    y1 = Math.random() * (height - 2 * radius1) + radius1;
    x2 = Math.random() * (width - 2 * radius2) + radius2;
    y2 = Math.random() * (height - 2 * radius2) + radius2;
  } while (Math.hypot(x2 - x1, y2 - y1) < radius1 + radius2);

  return [
    { x: x1, y: y1, r: radius1, color: 'red' },
    { x: x2, y: y2, r: radius2, color: 'blue' }
  ];
};

const createChart = (svg, circles) => {
  svg.attr('width', width)
    .attr('height', height)
    .style('background-color', '#f0f0f0');

  svg.selectAll('circle')
    .data(circles)
    .join('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', d => d.r)
    .attr('fill', d => d.color);
};

const getUnit = (phrase) => {
  const unitObj = units.find(unit => phrase.includes(unit.unit));
  return unitObj ? unitObj.unit : "";
};

const InteractiveD3 = () => {
  const svgRef = useRef();
  const resultRefs = [useRef(), useRef(), useRef()];
  const [currentChart, setCurrentChart] = useState(0);
  const [guesses, setGuesses] = useState(['', '', '']);
  const [showResults, setShowResults] = useState(false);
  const [circleData, setCircleData] = useState([generateRandomCircles()]);
  const [redCircleValues, setRedCircleValues] = useState([Math.floor(Math.random() * 90) + 10]); // Random values between 10 and 100
  const [randomPhrases] = useState([
    units[Math.floor(Math.random() * units.length)].phrase,
    units[Math.floor(Math.random() * units.length)].phrase,
    units[Math.floor(Math.random() * units.length)].phrase
  ]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    createChart(svg, circleData[currentChart]);
  }, [circleData, currentChart]);

  const handleGuessChange = (value) => {
    const newGuesses = [...guesses];
    newGuesses[currentChart] = value;
    setGuesses(newGuesses);
  };

  const handleNext = () => {
    if (currentChart < 2) {
      const newCircleData = [...circleData, generateRandomCircles()];
      const newRedCircleValues = [...redCircleValues, Math.floor(Math.random() * 90) + 10];
      setCircleData(newCircleData);
      setRedCircleValues(newRedCircleValues);
      setCurrentChart(currentChart + 1);
    } else {
      setShowResults(true);
    }
  };

  useEffect(() => {
    if (showResults) {
      resultRefs.forEach((ref, index) => {
        const svg = d3.select(ref.current);
        createChart(svg, circleData[index]);
      });
    }
  }, [showResults]);

  if (showResults) {
    return (
      <div>
        <h2>Results</h2>
        {circleData.map((circles, index) => {
          const redArea = Math.PI * (circles[0].r ** 2);
          const blueArea = Math.PI * (circles[1].r ** 2);
          const relativeBlueValue = Math.round((blueArea / redArea) * redCircleValues[index]);
          const unit = getUnit(randomPhrases[index]);
          return (
            <div key={`result-${circles[0].x}-${circles[0].y}`}>
              <svg ref={resultRefs[index]} />
              <p>{randomPhrases[index].replace("VALUE", redCircleValues[index])}</p>
              <p>Your guess: {unit === "$" || unit === "€" ? `${unit}${guesses[index]}` : `${guesses[index]} ${unit}`}</p>
              <p>Correct size of blue circle: {unit === "$" || unit === "€" ? `${unit}${relativeBlueValue}` : `${relativeBlueValue} ${unit}`}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <div>
        <svg ref={svgRef} />
        <p>{randomPhrases[currentChart].replace("VALUE", redCircleValues[currentChart])}</p>
        <input
          type="number"
          value={guesses[currentChart]}
          onChange={(e) => handleGuessChange(e.target.value)}
          placeholder="Enter your guess"
        />
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default InteractiveD3;