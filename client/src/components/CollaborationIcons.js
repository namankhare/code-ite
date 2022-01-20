import React, { useContext } from "react";
import { editorDetailsContext } from "../context/GlobalContext";

const CollaborationIcons = () => {
    const { collabIcons } = useContext(editorDetailsContext);
    // const { myUsername } = useContext(editorDetailsContext); //using localstorage instead
    const returnCollabs = () => {
        var total = []
        if ((collabIcons !== null) && (collabIcons !== undefined) && (collabIcons.length > 1)) {
            for (var i of collabIcons) {
                if (localStorage.getItem('Username') !== i.user) {
                    total.push(<span key={i.user} className="btn rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title={i.user} style={{ "height": "28px", "width": "28px", "backgroundColor": i.color }}></span>)
                }
            }
            return (total)
        }
    }

    return (
        <div>
            {returnCollabs()}
        </div>
    )
}

export default CollaborationIcons
