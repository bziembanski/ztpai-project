import {useEffect, useState} from 'react';
import {
    Grid,
    makeStyles,
    Button,
    Typography,
    withStyles
} from "@material-ui/core";
import Announcement from "../../components/Announcement/Announcement";
import FilterDrawer from "../../components/FilterDrawer/FilterDrawer";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            marginTop: 56
        },
        marginTop: 64,
        backgroundColor: theme.palette.background.default
    },
    announcementsContainer: {
        paddingTop: theme.spacing(3),
        // paddingBottom:theme.spacing(3),

    },
    filterButtonWrapper: {
        marginTop: theme.spacing(3)
    },
    filterButton: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    iconButton: {
        '& svg': {
            fontSize: 32
        }
    },
    progress: {
        width: '95%',
        margin: "auto",
        marginTop: theme.spacing(2)
    }
}));

const LinkButton = withStyles({
    root: {
        textTransform: "none"
    }
})(Button);

function SearchPage() {
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAnnouncementsLoading, setIsAnnouncementsLoading] = useState(true);
    const [announcements, setAnnouncements] = useState([]);
    const [isFiltersLoading, setIsFiltersLoading] = useState(true);
    const [filters, setFilters] = useState();
    const filterDrawerHandler = (open, form) => () => {
        setIsDrawerOpen(open);
    }

    useEffect(() => {
        axios.get(`/api/announcements`)
            .then(_announcements => {
                setAnnouncements(_announcements.data);

            })
            .finally(() => {
                setTimeout(() => {
                    setIsAnnouncementsLoading(false);
                }, 500);
            });
        axios.get('/api/filters')
            .then(_filters => {
                setFilters(_filters.data);
            })
            .finally(() => {
                setIsFiltersLoading(false);
            });
        return () => {
            setAnnouncements([]);
        };
    }, []);

    return (
        <Grid
            container
            component="main"
            className={classes.root}
            alignItems="flex-start"
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
                    <LinkButton
                        onClick={filterDrawerHandler(true)}
                        className={classes.filterButton}
                        href="#"
                        disableElevation
                        size="small"
                    >
                        <Typography
                            variant="body1"
                            color="secondary"
                        >
                            Filtruj/Sortuj
                        </Typography>

                    </LinkButton>
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
                {
                    isAnnouncementsLoading
                        ? (
                            [1,2,3,4].map(key => {
                                return (
                                    <Grid
                                        key={key}
                                        item
                                        xs={12}
                                    >
                                        <Announcement
                                            loading
                                        />
                                    </Grid>
                                );
                            })
                        ) : (
                            announcements.map((ann, key) => {
                                return (
                                    <Grid
                                        key={key}
                                        item
                                        xs={12}
                                    >
                                        <Announcement
                                            user={ann.user}
                                            title={ann.title}
                                            date={ann.date}
                                            description={ann.description}
                                        />
                                    </Grid>
                                );
                            })
                        )}
            </Grid>
            {
                isFiltersLoading ?
                    ""
                    :
                    <FilterDrawer
                        filters={filters}
                        isDrawerOpen={isDrawerOpen}
                        filterDrawerHandler={filterDrawerHandler}/>
            }

        </Grid>
    );
}

export default SearchPage;