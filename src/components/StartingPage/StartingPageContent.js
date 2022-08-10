import classes from "./StartingPageContent.module.css";

const StartingPageContent = () => {
  return (
    <section className={classes.starting}>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      <h1>Welcome on Board!</h1>
    </section>
  );
};

export default StartingPageContent;
