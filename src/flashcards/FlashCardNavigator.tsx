import React, {useState} from "react";
import FlashCardsScreen from "./FlashCardsScreen";
import FlashCardBrowser from "./FlashCardBrowser";

const FlashCardNavigator: React.FC = () => {
    const [packId, setPackId] = useState<string | undefined>()
    localStorage.removeItem("flashcards")
    return (
        <>
            {packId !== undefined ?
                <FlashCardsScreen presetPackId={packId}
                                  callbackFunction={() => setPackId(undefined)}/>
                :
                <FlashCardBrowser onSelect={setPackId}/>
            }
        </>
    )
}

export default FlashCardNavigator
