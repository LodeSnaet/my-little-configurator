import {useNavigate} from "react-router-dom";

function PrevPage() {
    const navigate = useNavigate();

    return (
        <button className={"c-prev"} onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i>
        </button>
    )
}

export default PrevPage