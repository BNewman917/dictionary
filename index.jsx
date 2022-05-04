function App() {
    const { useState, useEffect } = React;
    const { Container } = ReactBootstrap;
    const [data, setData] = useState([]);
    const [url, setUrl] = useState(
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
    );
    const [query, setQuery] = useState("");
    const [show, setShow] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const result = await fetch(url);
            let data = await result.json();
            setData(data[0]);
        };

        getData();
    }, [url]);

    if (data === undefined) {
        return (
            <Container>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search for a word..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={handleKeypress}
                    />
                    <button
                        className="button"
                        type="submit"
                        value={query}
                        onClick={handleSubmit}
                    >
                        Search
                    </button>
                </div>
                <h3>Sorry, we couldn't find that word.</h3>
            </Container>
        );
    }

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
        const i = phonetics.findIndex((item) => item.audio.length > 0);
        const clip = phonetics[i].audio;
        console.log(clip);
        new Audio(clip).play();
    }

    function handleSubmit(e) {
        console.log(e.target.value);
        if (e.target.value.length === 0) {
            return;
        } else {
            e.preventDefault();
            setUrl(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
        }
    }

    function handleKeypress(e) {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit(e);
        }
    }

    console.log(phonetics);

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
                    value={query}
                    onClick={handleSubmit}
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
