function App() {
    const { useState, useEffect } = React;
    const { Container } = ReactBootstrap;
    const [data, setData] = useState([]);
    const [url, setUrl] = useState(
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
    );
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [audio, setAudio] = useState("");

    console.log("Rendering App");

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            const result = await fetch(url);
            let data = await result.json();
            setData(data[0]);
            setIsLoading(false);
        };

        getData();
    }, [url]);

    const { word, meanings, phonetics } = data;

    const wordMeanings = meanings?.map((item) => {
        const { partOfSpeech, definitions } = item;
        const definition = definitions?.map((item, i) => {
            return (
                <li key={i}>
                    <span>{item.definition}</span>
                </li>
            );
        });
        return (
            <li key={partOfSpeech} className="partOfSpeech">
                <strong>{partOfSpeech}</strong>
                <ul className="definition">{definition}</ul>
            </li>
        );
    });

    function hearIt() {
        const audio = phonetics[0].audio;
        new Audio(audio).play();
    }

    console.log("phonetics: ", phonetics);

    return (
        <Container>
            <input
                className="searchBar"
                type="text"
                placeholder="Search for a word..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <button
                className="searchButton"
                type="button"
                onClick={() =>
                    setUrl(
                        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
                    )
                }
            >
                Search
            </button>
            <button onClick={hearIt}>Hear It</button>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h2 className="word">Definition of "{word}"</h2>
                    <ul className="definitionList">{wordMeanings}</ul>
                </div>
            )}
        </Container>
    );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

//  // "https://hn.algolia.com/api/v1/search?query=redux"
