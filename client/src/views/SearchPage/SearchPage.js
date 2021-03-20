import {useState} from 'react';
import {Grid, makeStyles, Link} from "@material-ui/core";
import Announcement from "../../components/Announcement/Announcement";
import FilterDrawer from "../../components/FilterDrawer/FilterDrawer";

const useStyles = makeStyles((theme) => ({
    root:{
        [theme.breakpoints.down('sm')]:{
            height: 'calc(100vh - 56px)',
            marginTop: 56
        },
        height: 'calc(100vh - 64px)',
        marginTop:64,
        backgroundColor:theme.palette.background.default,
        overflow: "auto"
    },
    announcementsContainer:{
        paddingTop:theme.spacing(3),
        // paddingBottom:theme.spacing(3),

    },
    filterButtonWrapper:{
        marginTop:theme.spacing(3)
    },
    filterButton:{
        paddingTop:theme.spacing(2),
        paddingBottom:theme.spacing(2),
    },
    iconButton:{
        '& svg': {
            fontSize: 32
        }
    }
}));

function SearchPage(){
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    const filterDrawerHandler = (open) => () => {
        setIsDrawerOpen(open);
    }
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
                alignItems="center"
                justify="center"
                spacing={3}
                className={classes.filterButtonWrapper}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    lg={4}

                >
                    <Link
                        variant="body1"
                        color="secondary"
                        onClick={filterDrawerHandler(true)}
                        className={classes.filterButton}
                        href="#">
                        Filtruj/Sortuj
                    </Link>
                </Grid>
            </Grid>
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
            <FilterDrawer
                isDrawerOpen={isDrawerOpen}
                filterDrawerHandler={filterDrawerHandler}/>
        </Grid>
    );
}

export default SearchPage;