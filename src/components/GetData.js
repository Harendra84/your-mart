import { onValue, ref, set, } from "firebase/database";
import { db } from "./FirebaseConfig";
import { Component } from "react";

export class GetData extends Component {

    componentDidMount() {
        let references = ref(db, 'mynode/');
        onValue(references, (snapshort) => {
            const data = snapshort.val();
            console.log(data);
        });

        let id = 2;
        references = ref(db, 'mynode/' + id);
        set(references, {
            examplekey1: "examplecalue1",
            examplekey2: "examplevalue2"
        });
    }
    render() {
        return

    }
}