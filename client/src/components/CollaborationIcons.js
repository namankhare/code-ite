import React, { useContext } from "react";
import { editorDetailsContext } from "../context/GlobalContext";

const CollaborationIcons = () => {
    const { collabIcons } = useContext(editorDetailsContext);
    const returnCollabs = () => {
        var total = []
        if ((collabIcons !== null) && (collabIcons !== undefined)) {
            for (var i of collabIcons) {
                if (localStorage.getItem('Username') !== i.user && sessionStorage.getItem('name') !== i.user) {
                    total.push(<span key={i.user} className="btn rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title={i.user} style={{ "backgroundColor": i.color, "display": "inline" }}>{(i.user).length > 9 ? (i.user).substring(9, 10) : (i.user).substring(0, 1)}</span>)
                }
            }
            return (total)
        }
    }

    return (
        <div className="m-2">
            {returnCollabs()}
        </div>
    )
}

export default CollaborationIcons
