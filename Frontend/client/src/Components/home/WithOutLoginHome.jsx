
import { Grid } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories1';
import Posts from './post/Posts';
import Header1 from '../header/Header1';

const WithOutLoginHome = () => {

    return (
        <>
        <Header1/>
            <Banner />
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    <Posts />
                </Grid>
            </Grid>
        </>
    )
}

export default WithOutLoginHome;