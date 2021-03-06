import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import FlashCard from "./FlashCard";
import {
    Add,
    Cancel,
    DeleteForever, DiscFull,
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

interface FlashCardProperties{
    question: string,
    answer: string,
    rating: number
}
export type {FlashCardProperties}
const FlashCardsScreen: React.FC = () => {
    const presetFlashcards:FlashCardProperties[] = [
        {question: "What is a PPF?", answer: "The maximum output of two goods if all resources are used and all are used efficiently", rating: 0},
        {question: "What causes an outward shift of a PPF?", answer: "An increase in the quantity of quality of the factors of production", rating: 0},
        {question: "What are the factors of production?", answer: "Land, labour, capital, entreprenuership or enterprise", rating: 0},
        {question: "What are the rewards of the factors of production?", answer: "Rents, royalties, wages, interest and profit", rating: 0},
        {question: "What is opportunity cost?", answer: "The benefit lost of the next best alternative forgone", rating: 0}
    ]
    const [flashCards, setFlashCards] = useState(JSON.parse(localStorage.getItem("flashcards")||JSON.stringify(presetFlashcards)))
    const [isCreatingNew, setCreatingNew] = useState(false)
    const [newFlashCard, setNewFlashCard] = useState({question: "", answer: "", rating: 0})
    const questionRef = React.createRef<HTMLDivElement>()
    const addNewFlashCard = (flashcard: FlashCardProperties) =>{
        setNewFlashCard({question: "", answer: "", rating: 0})
        setFlashCards((prevState:FlashCardProperties[]) => [...prevState, flashcard])
        saveLocally()
    }
    const updateRating = (index:number, rating:number) => {
        setFlashCards((prevState:FlashCardProperties[]) => {
            let tempFlashCardsClone:FlashCardProperties[] = prevState
            tempFlashCardsClone[index].rating = rating

            return(tempFlashCardsClone)
        })

        saveLocally()
    }
    const saveLocally = () => {
        let numberOfCards = flashCards.length
        localStorage.setItem("flashcards", JSON.stringify(flashCards))
        console.log("Saved "+numberOfCards+" cards to localStorage")
    }
    const saveToServer = () => {
        console.log("Saving to server")
    }
    const [importDialogShowing, setImportDialogShowing] = useState(false)
    const importJSON = (json: string) => {
        hideImportDialog()
        try{
            const importedCards = JSON.parse(json)
        for (const importedCardsKey in importedCards) {
            addNewFlashCard({question: "", answer: "", rating: 0,
                ...importedCards[importedCardsKey]})
        }
        console.log("Importing: "+json)
        }catch (e) {
            alert("Could not read. Please check JSON format")
        }
    }
    const hideImportDialog = () => {
        setImportJsonField("")
        setImportDialogShowing(false)
    }
    const [detectImportPaste, setDetectImportPaste] = useState(true)
    const [importJsonTextField, setImportJsonField] = useState("")
    return (
            <>
                <Paper elevation={3}
                       style={{margin: "10px", padding: "0 10px 10px 10px",textAlign: "center"}}>
                    <Typography variant={"h4"} display={"inline"} color={"primary"} gutterBottom>
                        Flash Cards
                    </Typography>
                    <Typography variant={"body2"} display={"inline"} color={"secondary"} gutterBottom component={"sup"}>
                       [ v1 ]
                    </Typography>
                </Paper>

            <Grid container spacing={2} alignItems={"stretch"} justify={"center"} direction={"row"}>
                <Grid item xs>
                    {isCreatingNew?
                        <Paper elevation={3} style={{padding: 10, margin: 10}}>
                            <TextField label={"Question"} fullWidth
                                       variant={"outlined"} style={{margin: "5px 0"}}
                                       onChange={(event => {
                                           let newQuestion = event.target.value
                                           setNewFlashCard(prevState =>
                                           ({...prevState, question: newQuestion})
                                       )})}
                                       value={newFlashCard.question}
                                       ref={questionRef} autoFocus
                            />
                            <TextField label={"Answer"} fullWidth multiline
                                       rows={4} variant={"outlined"} style={{margin: "5px 0"}}
                                       onChange={(event => {
                                           let newAnswer = event.target.value
                                           setNewFlashCard(prevState =>
                                           ({...prevState, answer: newAnswer})
                                       )})}
                                       value={newFlashCard.answer}
                            />
                            <Fab  color={"primary"} variant={"round"}
                                 onClick={()=>{
                                     addNewFlashCard(newFlashCard)
                                     setCreatingNew(false)
                                 }}
                                  disabled={!newFlashCard.question.length}
                            ><Save/></Fab>
                            <Fab  color={"secondary"} variant={"round"} style={{float: "right"}}
                                 onClick={()=>{setCreatingNew(false)}}
                            ><Cancel/></Fab>
                        </Paper>
                        :
                        <>
                            <Fab variant={"extended"} color={"primary"}
                                 onClick={()=>{setCreatingNew(true)}} style={{margin: 5}}
                            >
                                create new<Add/>
                            </Fab>
                            <Fab variant={"extended"} color={"primary"}
                                 onClick={()=>{saveToServer()}} style={{margin: 5}}
                            >
                                save<Dns/>
                            </Fab>
                            <Fab variant={"extended"} color={"primary"}
                                 onClick={()=>{setImportDialogShowing(true)}} style={{margin: 5}}
                            >
                                import<PlayForWork/>
                            </Fab>
                            <Fab variant={"extended"} color={"secondary"}
                                 onClick={()=>{
                                     setFlashCards((prevState:FlashCardProperties[]) =>[])
                                     localStorage.removeItem("flashcards")
                                 }} style={{margin: 5}}
                            >
                                delete all<DeleteForever/>
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
                                                                  onChange={()=>
                                                                      setDetectImportPaste(
                                                                          prevState => !prevState)
                                                                  }
                                                          />}/>
                                    <TextField
                                        label={"JSON list of flashcards"}
                                        fullWidth autoFocus rows={10} multiline
                                        onPaste={event => {
                                            if(detectImportPaste)
                                                importJSON(event.clipboardData.getData("Text"))
                                        }}
                                        value={importJsonTextField}
                                        onChange={event => setImportJsonField(event.target.value)}
                                        />
                                </DialogContent>
                                <div>
                                    <Button onClick={()=>importJSON(importJsonTextField)}
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

            {flashCards.map((flashCardDetails:FlashCardProperties, index:number) => (
                <FlashCard question={flashCardDetails.question}
                           answer={flashCardDetails.answer} key={index}
                           ratingCallback={(rating)=>{updateRating(index, rating)}}
                           rating={flashCardDetails.rating}
                />
            ))}
            </Grid>
                <Typography variant={"h4"} color={"primary"}>Dev stats</Typography>
                <Accordion>
                    <AccordionSummary expandIcon={<Save/>}><Typography variant={"h5"}>State</Typography></AccordionSummary>
                    <AccordionDetails><Typography>{JSON.stringify(flashCards)}</Typography></AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<DiscFull/>}><Typography variant={"h5"}>Local storage</Typography></AccordionSummary>
                    <AccordionDetails><Typography>{JSON.stringify(localStorage.getItem("flashcards"))}</Typography></AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary expandIcon={<Dns/>}><Typography variant={"h5"}>Server storage</Typography></AccordionSummary>
                    <AccordionDetails><Typography>{JSON.stringify(["Not yet functional"])}</Typography></AccordionDetails>
                </Accordion>
        </>

    )
}

export default FlashCardsScreen
