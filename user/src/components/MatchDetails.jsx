const MatchDetails = (props) => {
    return (
        <div>
            <p>Umpires: {props.match.umpires.onField}</p>
            <p>Third Umpire: {props.match.umpires.third}</p>
            <p>TV Umpire: {props.match.umpires.tv}</p>
            <p>Match Refree: {props.match.matchRefree}</p>
        </div>
    );
}

export default MatchDetails;