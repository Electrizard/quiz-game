import "./ResultPopup.css";
function ResultPopup({children, onClose}){
    return(
        <div className ="popup-backdrop" onClick={onClose}>
            <div className = "popup-content" onClick={(e) => e.stopPropagation()}>
                {children}
                <button className="popup-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ResultPopup;