import {Grid, makeStyles,} from "@material-ui/core";
import Announcement from "../../components/Announcement/Announcement";

const useStyles = makeStyles((theme) => ({
    root:{
        height: 'calc(100vh - 64px)',
        marginTop:64,
        backgroundColor:theme.palette.background.default,
        overflow: "auto"
    },
    announcementsContainer:{
        paddingTop:theme.spacing(3),
        // paddingBottom:theme.spacing(3),

    }
}));

function SearchPage(){
    const classes = useStyles();
    const anns = [
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            date: "18.03.2021",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Dis morbi at facilisis cursus. Dignissim ipsum mattis aliquet ultrices. " +
                "Tortor elementum amet, sagittis, fermentum amet at."
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            date: "18.03.2021",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Dis morbi at facilisis cursus. Dignissim ipsum mattis aliquet ultrices. " +
                "Tortor elementum amet, sagittis, fermentum amet at."
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            date: "18.03.2021",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Dis morbi at facilisis cursus. Dignissim ipsum mattis aliquet ultrices. " +
                "Tortor elementum amet, sagittis, fermentum amet at."
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            date: "18.03.2021",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Dis morbi at facilisis cursus. Dignissim ipsum mattis aliquet ultrices. " +
                "Tortor elementum amet, sagittis, fermentum amet at."
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
            date: "18.03.2021",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
                "Dis morbi at facilisis cursus. Dignissim ipsum mattis aliquet ultrices. " +
                "Tortor elementum amet, sagittis, fermentum amet at."
        }
    ]
    return(
        <Grid
            container
            component="main"
            className={classes.root}
            alignItems="center"
            justify="center"
        >
            <Grid
                container
                item
                xs={12}
                sm={8}
                md={5}
                lg={4}
                className={classes.announcementsContainer}
                spacing={3}
            >
                {anns.map((ann, key) => {
                    return(
                        <Grid
                            key={key}
                            item
                        >
                            <Announcement
                                title={ann.title}
                                date={ann.date}
                                description={ann.description}
                            />
                        </Grid>
                    )
                })}
            </Grid>

        </Grid>
    );
}

export default SearchPage;