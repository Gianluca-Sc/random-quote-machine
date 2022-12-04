import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { colorArray } from "./colorArray";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [color, setColor] = useState([colorArray[0]]);
  const textRef = useRef();
  const authorRef = useRef();

  useEffect(() => {
    document.body.style.color = color;
    document.body.style.background = color;
    textRef.current.animate(
      {
        opacity: [0, 0, 1],
      },
      1000
    );
    authorRef.current.animate(
      {
        opacity: [0, 0, 1],
      },
      1000
    );
  }, [color]);

  useEffect(() => {
    setIsloading(true);
    const getQuotes = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data.slice(0, 99));
        setQuote(data[0]);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getQuotes();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomIndexColor = Math.floor(Math.random() * colorArray.length);
    setQuote(quotes[randomIndex]);
    setColor(colorArray[randomIndexColor]);
  };

  if (isLoading) return <div className="loading">Loading</div>;
  return (
    <div className="App">
      <div id="quote-box">
        <p id="text" ref={textRef}>
          {quote.text}
        </p>
        <h4 id="author" ref={authorRef}>
          - {quote.author || "Unknown"}
        </h4>
        <div className="buttons">
          <a
            className="btn"
            href={`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`}
            id="tweet-quote"
            target="_blank"
            rel="noreferrer"
            style={{ backgroundColor: color }}
          >
            <i class="fa-brands fa-twitter"></i>
          </a>
          <button
            style={{ backgroundColor: color }}
            className="btn"
            onClick={getRandomQuote}
            id="new-quote"
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
