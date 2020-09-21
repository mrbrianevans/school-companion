import React, {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";
import Block from "../components/Block";
import Container from "@material-ui/core/Container";
import {SubjectChoicePage} from "./SubjectChoicePage";
import Button from "@material-ui/core/Button";
import WelcomePage from "./WelcomePage";
import {SubjectListPage} from "./SubjectListPage";
import SubjectDetailsPage from "./SubjectDetails";
import FlashCardsScreen from "../flashcards/FlashCardsScreen";

const HomePage: React.FC = () => {
    const [currentPage, switchPage] = useState(Number(localStorage.getItem("page"))||0)
    useEffect(()=>{
        localStorage.setItem("page", currentPage.toString())
    }, [currentPage])
    const pages = [
        {title: "Subject Choice", element: <SubjectChoicePage/>},
        {title: "Each Subject", element: <SubjectDetailsPage/>},
        {title: "List of subjects", element: <SubjectListPage/>},
        {title: "Welcome", element: <WelcomePage/>},
        {title: "Flash cards", element: <FlashCardsScreen/>}
    ]
    return(
        <Container>
            <Grid container spacing={2}>
                {pages.map((page: { title: string; element: JSX.Element } , index)=>{
                    console.log("Page: "+page.title)
                    return(
                    <Block width={"quarter"} key={index}>
                        <Button onClick={()=>{switchPage(index||0)}}>
                            View {page.title}
                        </Button>
                    </Block>
                )})}
            </Grid>
            {pages[currentPage].element}
        </Container>

    )
}

export default HomePage
