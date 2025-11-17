import {useParams} from "react-router-dom";

function MeshConfigurator() {
    const {meshName} = useParams();

    return (
        <h1>{meshName}</h1>
    )
}

export default MeshConfigurator