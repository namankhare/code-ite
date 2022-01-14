import { Convergence } from "@convergence/convergence";
const CONVERGENCE_URL =
    "ws://localhost:8000/api/realtime/convergence/default";

export const initiateConvergenceConnection = async (room, username) => {


    let connectToConvergence = new Promise((resolve) => {
        Convergence.connectAnonymously(CONVERGENCE_URL, username)
            .then((domain) => {
                console.log("Connection success");
                return domain.models().openAutoCreate({
                    collection: "codeEditor",
                    id: room,
                    data: { text: "text" },
                });
            })
            .then((model) => {
                resolve(model)
            })
            .catch((error) => {
                console.error("Could not open model ", error);
            });

    });
    return await connectToConvergence;

}