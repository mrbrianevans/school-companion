import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import FlashCard from "./FlashCard";
import {
    Add,
    ArrowBack,
    Cancel,
    DeleteForever,
    DiscFull,
    Dns,
    PlayForWork,
    Save
} from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import CircularProgress from "@material-ui/core/CircularProgress";

interface FlashCardProperties {
    question: string,
    answer: string,
    rating?: number
}

interface PackMetadata {
    id: string,
    created: number,
    modified: number,
    accessed: number,
    name: string,
    description: string,
    count: number
}

export type {PackMetadata}
export type {FlashCardProperties}
const FlashCardsScreen: React.FC<{ presetPackId?: string, callbackFunction: () => void }> = (props) => {
    const presetFlashcards: FlashCardProperties[] = [
        {
            question: "What is a PPF?",
            answer: "The maximum output of two goods if all resources are used and all are used efficiently",
            rating: 0
        },
        {
            question: "What causes an outward shift of a PPF?",
            answer: "An increase in the quantity of quality of the factors of production",
            rating: 0
        },
        {
            question: "What are the factors of production?",
            answer: "Land, labour, capital, entreprenuership or enterprise",
            rating: 0
        },
        {
            question: "What are the rewards of the factors of production?",
            answer: "Rents, royalties, wages, interest and profit",
            rating: 0
        },
        {
            question: "What is opportunity cost?",
            answer: "The benefit lost of the next best alternative forgone",
            rating: 0
        }
    ]
    const [flashCards, setFlashCards] = useState(JSON.parse(localStorage.getItem("flashcards") || JSON.stringify(presetFlashcards)))
    const [metadata, setMetadata] = useState<PackMetadata | undefined>(undefined)
    const [isCreatingNew, setCreatingNew] = useState(false)
    const [newFlashCard, setNewFlashCard] = useState({question: "", answer: "", rating: 0})
    const [packId, setPackId] = useState(props.presetPackId || "")
    const questionRef = React.createRef<HTMLDivElement>()
    const addNewFlashCard = (flashcard: FlashCardProperties) => {
        console.log("Adding new flashcard")
        setNewFlashCard({question: "", answer: "", rating: 0})
        setFlashCards((prevState: FlashCardProperties[]) => [...prevState, flashcard])
        saveLocally()
    }
    const updateRating = (index: number, rating: number) => {
        console.log("Updating rating to " + rating)
        setFlashCards((prevState: FlashCardProperties[]) => {
            let tempFlashCardsClone: FlashCardProperties[] = prevState
            tempFlashCardsClone[index].rating = rating

            return (tempFlashCardsClone)
        })

        saveLocally()
    }
    const saveLocally = () => {
        let numberOfCards = flashCards.length
        localStorage.setItem("flashcards", JSON.stringify(flashCards))
        console.log("Saved " + numberOfCards + " cards to localStorage")
    }
    const saveToServer = () => {
        console.log("Requesting with PUT")
        fetch("https://brianevans.tech/projects/school-companion/api.php", {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({flashcards: flashCards, metadata: {id: packId}})
        })
            .then(r => r.json())
            .then(response => {
                if (response.status) {
                    console.log("Saved successfully")
                } else console.log("Failed to save")
            })
    }
    const createOnServer = () => {
        console.log("Requesting with POST")
        fetch("https://brianevans.tech/projects/school-companion/api.php", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(flashCards)
        })
            .then(r => r.json())
            .then(response => {
                if (response.status) {
                    console.log("New ID is " + response.id)
                    setPackId(response.id)
                } else console.log("Failed to save")
            })
    }
    const [hasRequestedFromServer, setRequestedFromServer] = useState(!packId)
    const [hasLoadedFromServer, setLoadedFromServer] = useState(false)
    const fetchFromServer = () => {
        console.log("Fetching " + packId + " from server")
        fetch("https://brianevans.tech/projects/school-companion/api.php?packId=" + packId)
            .then(r => r.json())
            .then(data => {
                if (data.status) {
                    // console.log(JSON.stringify(data.metadata))
                    console.log(data.metadata.id + " received from server")
                    // console.log(JSON.stringify(data.flashcards))
                    setFlashCards(data.flashcards)
                    setMetadata(data.metadata)
                } else {
                    console.log("Did not receive the flashcards. Error with PackId")
                }
                setLoadedFromServer(true)
            })
    }
    if (!hasRequestedFromServer) {
        setRequestedFromServer(true)
        fetchFromServer()
    }
    const deleteFromServer = () => {
        fetch("https://brianevans.tech/projects/school-companion/api.php?packId=" + packId, {
            method: "DELETE"
        })
            .then(r => console.log(r))
    }
    const [importDialogShowing, setImportDialogShowing] = useState(false)
    const importJSON = (json: string) => {
        hideImportDialog()
        try {
            const importedCards = JSON.parse(json)
            for (const importedCardsKey in importedCards) {
                addNewFlashCard({
                    question: "", answer: "", rating: 0,
                    ...importedCards[importedCardsKey]
                })
            }
            console.log("Importing: " + json)
        } catch (e) {
            alert("Could not read. Please check JSON format")
        }
    }
    const hideImportDialog = () => {
        setImportJsonField("")
        setImportDialogShowing(false)
    }
    const [detectImportPaste, setDetectImportPaste] = useState(true)
    const [importJsonTextField, setImportJsonField] = useState("")
    const formatDate = (seconds: number | undefined) => {
        if (seconds === undefined) return ""
        let dateObject = new Date(seconds * 1000)
        console.log(dateObject)
        return dateObject.toDateString()
    }
    return (
        <>
            <Paper elevation={3}
                   style={{margin: "10px", padding: "0 10px 10px 10px", textAlign: "center"}}>
                <Typography variant={"h4"} display={"inline"} color={"primary"} gutterBottom>
                    Flash Cards
                </Typography>
                <Typography variant={"body2"} display={"inline"} color={"secondary"} gutterBottom
                            component={"sup"}>
                    [ v1 ]
                </Typography>
            </Paper>

            <Grid container spacing={2} alignItems={"stretch"} justify={"center"} direction={"row"}>
                <Grid item xs={6}>
                    {isCreatingNew ?
                        <Paper elevation={3} style={{padding: 10, margin: 10}}>
                            <TextField label={"Question"} fullWidth
                                       variant={"outlined"} style={{margin: "5px 0"}}
                                       onChange={(event => {
                                           let newQuestion = event.target.value
                                           console.log("Updating name to " + newQuestion)
                                           setNewFlashCard(prevState =>
                                               ({...prevState, question: newQuestion})
                                           )
                                       })}
                                       value={newFlashCard.question}
                                       ref={questionRef} autoFocus
                            />
                            <TextField label={"Answer"} fullWidth multiline
                                       rows={4} variant={"outlined"} style={{margin: "5px 0"}}
                                       onChange={(event => {
                                           let newAnswer = event.target.value
                                           console.log("Updating desc to " + newAnswer)
                                           setNewFlashCard(prevState =>
                                               ({...prevState, answer: newAnswer})
                                           )
                                       })}
                                       value={newFlashCard.answer}
                            />
                            <Fab color={"primary"} variant={"round"}
                                 onClick={() => {
                                     addNewFlashCard(newFlashCard)
                                     setCreatingNew(false)
                                 }}
                                 disabled={!newFlashCard.question.length}
                            ><Save/></Fab>
                            <Fab color={"secondary"} variant={"round"} style={{float: "right"}}
                                 onClick={() => {
                                     setCreatingNew(false)
                                 }}
                            ><Cancel/></Fab>
                        </Paper>
                        :
                        <>
                            <Fab variant={"extended"} color={"primary"}
                                 onClick={() => {
                                     setCreatingNew(true)
                                 }} style={{margin: 5}}
                            >
                                create new<Add/>
                            </Fab>
                            <Fab variant={"extended"} color={"primary"}
                                 onClick={() => {
                                     packId.length ? saveToServer() : createOnServer()
                                 }}
                                 style={{margin: 5}}
                            >
                                save<Dns/>
                            </Fab>
                            <Fab variant={"extended"} color={"primary"}
                                 onClick={() => {
                                     setImportDialogShowing(true)
                                 }} style={{margin: 5}}
                            >
                                import<PlayForWork/>
                            </Fab>
                            <Fab variant={"extended"} color={"primary"}
                                 onClick={props.callbackFunction} style={{margin: 5}}
                            >
                                Back to browser<ArrowBack/>
                            </Fab>
                            <Fab variant={"extended"} color={"secondary"}
                                 onClick={() => {
                                     deleteFromServer()
                                     setFlashCards((prevState: FlashCardProperties[]) => [])
                                     localStorage.removeItem("flashcards")
                                     props.callbackFunction()
                                 }} style={{margin: 5}}
                            >
                                delete pack<DeleteForever/>
                            </Fab>
                            <Dialog open={importDialogShowing} onClose={hideImportDialog}>
                                <DialogTitle>Import</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Use the tool on my website to convert your CSV file to JSON,
                                        and then paste it into this box.

                                        Heads up: An API is in the works
                                    </DialogContentText>
                                    <FormControlLabel label={"Auto detect paste"}
                                                      control={
                                                          <Switch checked={detectImportPaste}
                                                                  onChange={() =>
                                                                      setDetectImportPaste(
                                                                          prevState => !prevState)
                                                                  }
                                                          />}/>
                                    <TextField
                                        label={"JSON list of flashcards"}
                                        fullWidth autoFocus rows={10} multiline
                                        onPaste={event => {
                                            if (detectImportPaste)
                                                importJSON(event.clipboardData.getData("Text"))
                                        }}
                                        value={importJsonTextField}
                                        onChange={event => setImportJsonField(event.target.value)}
                                    />
                                </DialogContent>
                                <div>
                                    <Button onClick={() => importJSON(importJsonTextField)}
                                            color={"primary"} variant={"text"}
                                            style={{width: "50%"}}>
                                        <PlayForWork/>Import
                                    </Button>

                                    <Button onClick={hideImportDialog} color={"secondary"}
                                            variant={"text"} style={{width: "50%"}}>
                                        <Cancel/>Close
                                    </Button>
                                </div>
                            </Dialog>
                        </>
                    }

                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} style={{padding: 10, margin: 10}}>
                        {hasLoadedFromServer ? <>
                            <Typography>ID: {metadata?.id}</Typography>
                            <Typography>Created: {formatDate(metadata?.created)}</Typography>
                            <Typography>Modified: {formatDate(metadata?.modified)}</Typography>
                            <Typography>Accessed: {formatDate(metadata?.accessed)}</Typography>
                        </> : <CircularProgress/>
                        }
                    </Paper>
                </Grid>
                {hasLoadedFromServer ? flashCards.map((flashCardDetails: FlashCardProperties, index: number) => (
                    <FlashCard question={flashCardDetails.question}
                               answer={flashCardDetails.answer} key={index}
                               ratingCallback={(rating) => {
                                   updateRating(index, rating)
                               }}
                               rating={flashCardDetails.rating}
                    />
                )) : <CircularProgress/>}
            </Grid>
            <Typography variant={"h4"} color={"primary"}>Dev stats</Typography>
            <Accordion>
                <AccordionSummary expandIcon={<Save/>}><Typography variant={"h5"}>State</Typography></AccordionSummary>
                <AccordionDetails><Typography>{JSON.stringify(flashCards)}</Typography></AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<DiscFull/>}><Typography variant={"h5"}>Local
                    storage</Typography></AccordionSummary>
                <AccordionDetails><Typography>{JSON.stringify(localStorage.getItem("flashcards"))}</Typography></AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<Dns/>}><Typography variant={"h5"}>Server
                    storage</Typography></AccordionSummary>
                <AccordionDetails><Typography>{JSON.stringify(["Not yet functional"])}</Typography></AccordionDetails>
            </Accordion>
        </>

    )
}

export default FlashCardsScreen
