function QuoteBox() {

    const randomColorGenerator = () => {

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        return `rgb(${r},${g},${b})`;

    }

    const [data, setData] = React.useState({});
    const [randomColor, setRandomColor] = React.useState(randomColorGenerator());
    const [randomValue, setRandomValue] = React.useState(0);

    React.useEffect(() => {

        axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
            .then(res => {
                setData(res.data);
            });

        if (typeof (data) != null && data.quotes != null) {
            setRandomValue(Math.floor(Math.random() * (data.quotes.length)));
        }

    }, []);


    const backgroundStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '500px',
        flexWrap: 'wrap',
        padding: '40px',
        backgroundColor: randomColor,
        borderRadius: '2px',
    }

    const handleClick = () => {
        setRandomValue(Math.floor(Math.random() * (data.quotes.length)));
        setRandomColor(randomColorGenerator());
    }

    if (!(typeof (data) != null && data.quotes != null)) {

        return <h1>Loading...</h1>

    }
    return (

        <div 
         id="quote-box"
         style={backgroundStyle}
        >

            <div
             id="text"
             style={{ color: '#F3F3F3', fontSize: '30px' }}
            >
                
                <i 
                 className="fa fa-quote-left" 
                 style={{ backgroundColor: randomColor, color: '#FFFFFF', fontSize: '2rem' }}
                >

                </i>


                 {data.quotes[randomValue].quote}


            </div>

            <div
             id="author"
             style={{ color: '#F3F3F3', display: 'flex', justifyContent: 'flex-end', fontFamily: "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", marginBottom: '20px', fontSize: '16px' }}
            >
                - {data.quotes[randomValue].author}

            </div>

            <div
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >

                <div>

                    <button
                     className="btn btn-primary"
                     id="new-quote"
                     onClick={handleClick}
                     style={{ color: randomColor, height: '42px', backgroundColor: '#ffffff', border: 'none', fontWeight: 500, }}
                    >

                        New quote

                    </button>

                </div>

                <div>

                    <a
                     style={{ color: randomColor }}
                     href="https://twitter.com/intent/tweet" target="_blank" id="tweet-quote">
                        <i
                         className="fa-brands fa-square-twitter fa-3x"
                         style={{ backgroundColor: randomColor, color: '#FFFFFF', fontSize: '48px' }}
                        >

                        </i>

                    </a>

                </div>

            </div>

        </div>
    );
}



ReactDOM.render(<QuoteBox />, document.getElementById("root"));
