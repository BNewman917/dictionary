function App() {
    const { useState, useEffect } = React;
    const { Container } = ReactBootstrap;
    const [data, setData] = useState([]);
    const [url, setUrl] = useState(
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
    );
    const [query, setQuery] = useState("");

    console.log("Rendering App");

    useEffect(() => {
        const getData = async () => {
            const result = await fetch(url);
            let data = await result.json();
            setData(data[0]);
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
        const clip = phonetics[0].audio;
        new Audio(clip).play();
    }

    console.log("phonetics: ", phonetics);

    const handleSubmit = (e) => {
        if (e.target.value === "") {
            e.preventDefault();
            return;
        } else {
            e.preventDefault();
            setUrl(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
        }
    };

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    };

    return (
        <Container>
            <div className="search">
                <input
                    className="searchBar"
                    type="text"
                    placeholder="Search for a word..."
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleKeypress}
                />
                <button
                    className="button"
                    type="submit"
                    onSubmit={handleSubmit}
                >
                    Search
                </button>
                <button className="button" onClick={hearIt}>
                    Hear It
                </button>
            </div>
            <div>
                <h2 className="word">Definition of "{word}"</h2>
                <ul className="pos">{wordMeanings}</ul>
            </div>
        </Container>
    );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
