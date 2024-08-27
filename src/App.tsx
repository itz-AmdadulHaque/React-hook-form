import "./App.css";
import YouTubeFrom from "./components/YouTubeFrom";
import YouTubeFrom2 from "./components/YouTubeFrom2";

function App() {
  return (
    <>
      <h1>React hook form</h1>
      <p>
        When building forms manually and tracking input fields using controlled
        components with useState, components often re-render on every input
        change. This can lead to performance issues, especially in complex
        forms. React Hook Form, on the other hand, uses an uncontrolled
        approach, managing form state internally and minimising unnecessary
        re-renders, resulting in a more efficient and performant form experience. 
        <span style={{backgroundColor: "green"}}> Check the console to see the output after submit.</span>
      </p>

      <YouTubeFrom />
      <YouTubeFrom2 />
    </>
  );
}

export default App;
